import { Filter, subject } from "./filters"

type Rule = {
  name: string
  filters?: { [number: number]: Filter }
  layout: number[][]
}

const rules: Rule[] = [
  {
    name: "basic-1",
    filters: { 5: subject },
    layout: [
      [0, 1, 0, 1, 0],
      [1, 2, 4, 2, 1],
      [0, 4, 5, 4, 0],
      [1, 2, 4, 2, 1],
      [0, 1, 0, 1, 0],
    ],
  },
  {
    name: "basic-2",
    filters: { 5: subject },
    layout: [
      [0, 1, 6, 1, 0],
      [1, 2, 4, 2, 1],
      [6, 4, 5, 4, 6],
      [1, 2, 4, 2, 1],
      [0, 1, 6, 1, 0],
    ],
  },
  {
    name: "basic-3",
    filters: { 5: subject },
    layout: [
      [0, 1, 6, 1, 0],
      [1, 2, 3, 2, 1],
      [6, 4, 5, 4, 6],
      [1, 2, 3, 2, 1],
      [0, 1, 6, 1, 0],
    ],
  },
  {
    name: "maybegray-1",
    filters: { 5: subject },
    layout: [
      [1, 0, 3, 0, 2],
      [0, 6, 4, 6, 0],
      [3, 4, 5, 4, 3],
      [0, 6, 4, 6, 0],
      [2, 0, 3, 0, 1],
    ],
  },
  {
    name: "maybegray-2",
    filters: { 5: subject },
    layout: [
      [1, 7, 3, 7, 2],
      [0, 6, 4, 6, 0],
      [3, 4, 5, 4, 3],
      [0, 6, 4, 6, 0],
      [2, 7, 3, 7, 1],
    ],
  },
]

export default rules
