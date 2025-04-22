export const intToString = (n: number | string) => {
  if (typeof n === 'string') n = parseInt(n)
  if (n < 10) return '0' + n
  return n.toString()
}

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
}