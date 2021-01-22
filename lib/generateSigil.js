"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const emoji_1 = require("./emoji");
const rules_1 = __importDefault(require("./rules"));
const utils_1 = require("./utils");
function generateSigil() {
    const rule = utils_1.getRandomElement(rules_1.default);
    const filteredEmoji = ramda_1.mapObjIndexed((filterRule) => emoji_1.emoji.filter(filterRule), rule.filters ?? {});
    const emojiUsed = Array.from({ length: rule.noOfEmojis }, (_, i) => utils_1.getRandomElement(filteredEmoji?.[i] ?? emoji_1.emoji)).map(ramda_1.prop("emoji"));
    const layout = rule.layout.map((row) => row.map((emojiIndex) => emojiUsed[emojiIndex]));
    return layout.map((row) => row.join("")).join("\n");
}
exports.default = generateSigil;
