export function dateCompare(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)


  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new TypeError('Fecha no válida')
  }

  if (d1.getTime() === d2.getTime()) return 0
  return d1.getTime() > d2.getTime() ? 1 : -1
}
