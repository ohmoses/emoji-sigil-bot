"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isPerson = (emoji) => emoji.category < 2;
const rules = [
    {
        name: "Marras",
        noOfEmojis: 6,
        filters: { 5: isPerson },
        layout: [
            [0, 1, 0, 1, 0],
            [1, 2, 3, 2, 1],
            [0, 4, 5, 4, 0],
            [1, 2, 4, 2, 1],
            [0, 1, 0, 1, 0],
        ],
    },
    {
        name: "Harvey",
        noOfEmojis: 9,
        filters: { 6: isPerson },
        layout: [
            [0, 1, 2, 1, 0],
            [1, 3, 4, 3, 1],
            [0, 5, 6, 5, 0],
            [1, 3, 7, 3, 1],
            [0, 1, 8, 1, 0],
        ],
    },
];
exports.default = rules;
