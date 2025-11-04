export function flexibleFizzBuzz(n, conditions = []) {
  let result = ''

  for (const { divisor, word } of conditions) {
    if (n % divisor === 0) result += word
  }

  return result || n
}
