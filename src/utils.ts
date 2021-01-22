export const getRandomElement = <T>(arr: Array<T>) => arr[Math.floor(Math.random() * arr.length)]

const chars = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")

export function generateNonce() {
  let nonce = ""
  for (let i = 0; i < 16; i++) {
    nonce += getRandomElement(chars)
  }
  return nonce
}
