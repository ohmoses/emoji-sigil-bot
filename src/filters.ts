import { EmojiObject } from "./emojiData/emojiObject"
import { GroupName } from "./emojiData/groups"

type FilterFn = (emoji: EmojiObject) => boolean

export type Filter = {
  groups?: GroupName[]
  blacklists?: { [K in GroupName]?: string[] }
  whitelists?: { [K in GroupName]?: string[] }
  filter?: FilterFn
}

const faceGroups: GroupName[] = [
  "face-smiling",
  "face-affection",
  "face-tongue",
  "face-hand",
  "face-neutral-skeptical",
  "face-sleepy",
  "face-unwell",
  "face-hat",
  "face-glasses",
  "face-concerned",
  "face-negative",
  "face-costume",
  "person",
  "person-gesture",
  "person-role",
  "person-fantasy",
  "person-resting",
  "family",
]
const animalGroups: GroupName[] = [
  "animal-mammal",
  "animal-bird",
  "animal-amphibian",
  "animal-reptile",
  "animal-marine",
  "animal-bug",
  "cat-face",
  "monkey-face",
]

export const subject: Filter = {
  groups: faceGroups.concat(animalGroups),
  blacklists: { "animal-mammal": ["paw"], "animal-bug": ["web", "microbe"] },
}

const backgroundGroups: GroupName[] = ["emotion", "time", "geometric"]

export const background: Filter = { groups: backgroundGroups }

const activityGroups: GroupName[] = ["person-activity", "person-sport"]

export const activity: Filter = {
  groups: activityGroups,
  blacklists: { "person-activity": ["massage", "haircut", "steamy room"] },
}
