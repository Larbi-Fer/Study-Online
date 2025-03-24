export const intToString = (n: number | string) => {
  if (typeof n === 'string') n = parseInt(n)
  if (n < 10) return '0' + n
  return n.toString()
}