# Usage:
# 1) Create .sonar.env with:
#    SONAR_HOST_URL=http://localhost:9000
#    SONAR_TOKEN=YOUR_TOKEN
# 2) Run: npm run sonar:docker

$envFile = Join-Path $PSScriptRoot "..\.sonar.env"

if (!(Test-Path $envFile)) {
  Write-Host "Missing .sonar.env. Create it with SONAR_HOST_URL and SONAR_TOKEN." -ForegroundColor Red
  exit 1
}

Get-Content $envFile | ForEach-Object {
  $line = $_.Trim()
  if ($line -eq "" -or $line.StartsWith("#")) { return }
  $parts = $line -split "=", 2
  if ($parts.Length -ne 2) { return }
  $key = $parts[0].Trim()
  $value = $parts[1].Trim()
  if ($value.StartsWith('"') -and $value.EndsWith('"')) {
    $value = $value.Substring(1, $value.Length - 2)
  }
  if ($key -ne "") {
    Set-Item -Path "Env:$key" -Value $value
  }
}

if (-not $env:SONAR_HOST_URL -or -not $env:SONAR_TOKEN) {
  Write-Host "Missing SONAR_HOST_URL or SONAR_TOKEN in .sonar.env" -ForegroundColor Red
  exit 1
}

npm run test:coverage

$lcovIn = Join-Path $PSScriptRoot "..\\coverage\\lcov.info"
$lcovOut = Join-Path $PSScriptRoot "..\\coverage\\lcov.docker.info"

if (Test-Path $lcovIn) {
  $lines = Get-Content $lcovIn | ForEach-Object {
    if ($_ -like "SF:*") {
      $path = $_.Substring(3) -replace "\\", "/"
      if ($path -notmatch "^/usr/src/") {
        $path = "/usr/src/" + $path.TrimStart("./")
      }
      "SF:$path"
    } else {
      $_
    }
  }
  $lines | Set-Content $lcovOut
} else {
  Write-Host "Missing coverage/lcov.info. Run test:coverage first." -ForegroundColor Red
  exit 1
}

$sonarHost = $env:SONAR_HOST_URL
if ($sonarHost -match "localhost") {
  $sonarHost = $sonarHost -replace "localhost", "host.docker.internal"
}

docker run --rm `
  -e SONAR_HOST_URL="$sonarHost" `
  -e SONAR_TOKEN="$env:SONAR_TOKEN" `
  -v "${PWD}:/usr/src" `
  sonarsource/sonar-scanner-cli
