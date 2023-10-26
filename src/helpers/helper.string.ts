export function toTruncate(text: string, length: number = 50) {
  return text.length > length ? text.substring(0, length - 3) + '...' : text
}