export function generateShortName(
  prefix: string = 'img',
  length: number = 6,
): string {
  // Generate a random string of the specified length
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomString = ''
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    )
  }

  // Combine prefix and random string, and return the name
  return `${prefix}_${randomString}`
}
