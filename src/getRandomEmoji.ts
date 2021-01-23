import { any, none, T } from "ramda"
import emojiGrouped, { EmojiGrouped } from "./emojiData/emojiGrouped"
import { EmojiObject } from "./emojiData/emojiObject"
import { GroupName } from "./emojiData/groups"
import { Filter } from "./filters"
import { getRandomElement, getWeightedRandom } from "./utils"

const blacklist = (words: string[]) => (emoji: EmojiObject) => none(emoji.name.includes, words)
const whitelist = (words: string[]) => (emoji: EmojiObject) => any(emoji.name.includes, words)

// output of Object.entries<keyof O>()
type Entry<O> = [keyof O, O[keyof O]]
type GroupEntry = Entry<EmojiGrouped>

export default function getRandomEmoji(filter?: Filter) {
  // pick whitelisted groups for this emoji
  const groupFilter = filter?.groups
    ? ([groupName]: GroupEntry) => filter.groups?.includes(groupName)
    : T

  const emojiFilter = ([groupName, emoji]: GroupEntry): GroupEntry => {
    let filteredEmoji = emoji

    // only select emoji whose name includes whitelist terms
    const whitelistedTerms = filter?.whitelists?.[groupName]
    if (whitelistedTerms) {
      filteredEmoji = filteredEmoji.filter(whitelist(whitelistedTerms))
    }
    // exclude emoji whose name includes blacklist terms
    const blacklistedTerms = filter?.blacklists?.[groupName]
    if (blacklistedTerms) {
      filteredEmoji = filteredEmoji.filter(blacklist(blacklistedTerms))
    }
    // apply custom filter
    if (filter?.filter) {
      filteredEmoji = filteredEmoji.filter(filter.filter)
    }
    return [groupName, filteredEmoji]
  }

  // weigh each category by ln(emoji count) so that categories with more emoji have *somewhat*
  // better chance of being picked
  const entryToWeights = ([groupName, emoji]: GroupEntry): [GroupName, number] => [
    groupName,
    Math.log(emoji.length),
  ]

  const groupEntries = Object.entries(emojiGrouped) as GroupEntry[]
  const filteredEntries = groupEntries.filter(groupFilter).map(emojiFilter)
  const selectedGroupName = getWeightedRandom(filteredEntries.map(entryToWeights))
  const emojiList = filteredEntries.find(([groupName]) => groupName === selectedGroupName)
  const { emoji } = getRandomElement(emojiList![1])

  return emoji
}
