import { mapObjIndexed, prop } from "ramda"
import { emoji } from "./emoji"
import rules from "./rules"
import { getRandomElement } from "./utils"

export default function generateSigil() {
  const rule = getRandomElement(rules)
  const filteredEmoji = mapObjIndexed((filterRule) => emoji.filter(filterRule), rule.filters ?? {})
  const emojiUsed = Array.from({ length: rule.noOfEmojis }, (_, i) =>
    getRandomElement(filteredEmoji?.[i] ?? emoji),
  ).map(prop("emoji"))
  const layout = rule.layout.map((row) => row.map((emojiIndex) => emojiUsed[emojiIndex]))

  return layout.map((row) => row.join("")).join("\n")
}
