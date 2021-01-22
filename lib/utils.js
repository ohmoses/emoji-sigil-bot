"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNonce = exports.getRandomElement = void 0;
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
exports.getRandomElement = getRandomElement;
const chars = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
function generateNonce() {
    let nonce = "";
    for (let i = 0; i < 16; i++) {
        nonce += exports.getRandomElement(chars);
    }
    return nonce;
}
exports.generateNonce = generateNonce;
