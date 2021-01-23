import { join, map, max, pipe, prop, reduce, __ } from "ramda"
import getRandomEmoji from "./getRandomEmoji"
import rules from "./rules"
import { getRandomElement } from "./utils"

const maxOfGrid = reduce(reduce<number, number>(max), -1)

export default function generateSigil(ruleName?: string) {
  const rule = rules.find(({ name }) => name === ruleName)

  if (ruleName && !rule) throw new Error("there is no rule named " + ruleName)

  const selectedRule = rule ?? getRandomElement(rules)
  const numberOfEmojis = maxOfGrid(selectedRule.layout) + 1
  const emojiUsed = Array.from({ length: numberOfEmojis }, (_, i) =>
    getRandomEmoji(selectedRule.filters?.[i]),
  )
  const populateLayout = map(map(prop(__, emojiUsed)))
  const gridToString = pipe(map(join("")), join("\n"))

  // console.log(selectedRule.name)
  return gridToString(populateLayout(selectedRule.layout))
}
