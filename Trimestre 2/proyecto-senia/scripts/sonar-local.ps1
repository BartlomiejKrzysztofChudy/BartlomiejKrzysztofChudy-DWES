# Usage:
# 1) Create .sonar.env with:
#    SONAR_HOST_URL=http://localhost:9000
#    SONAR_TOKEN=YOUR_TOKEN
# 2) Run: npm run sonar:local

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

npm run sonar
