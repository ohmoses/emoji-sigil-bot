import { GroupName } from "./groups"

export type EmojiString = string

export type EmojiObject = {
  code: string
  emoji: EmojiString
  name: string
  category: string
  subcategory: GroupName
  newfangled?: boolean
}
