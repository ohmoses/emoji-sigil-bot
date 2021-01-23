export function getRandomElement<T>(arr: readonly T[]) {
  if (!arr.length) throw new Error("empty array passed to getRandomElement")
  return arr[Math.floor(Math.random() * arr.length)]
}

const chars = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")

export function generateNonce() {
  let nonce = ""
  for (let i = 0; i < 16; i++) {
    nonce += getRandomElement(chars)
  }
  return nonce
}

export function getWeightedRandom<T>(elements: [T, number][]) {
  if (!elements.length) throw new Error("empty array passed to getWeightedRandom")

  const total = elements.reduce((acc, curr) => acc + curr[1], 0)
  const threshold = Math.random() * total

  let runningTotal = 0
  for (const [value, weight] of elements) {
    runningTotal += weight
    if (runningTotal >= threshold) {
      return value
    }
  }

  return elements[elements.length - 1][0] // it shouldn't come to this
}
