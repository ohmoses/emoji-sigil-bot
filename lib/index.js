"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const oauth_signature_1 = __importDefault(require("oauth-signature"));
const utils_1 = require("./utils");
const generateSigil_1 = __importDefault(require("./generateSigil"));
dotenv_1.default.config();
const { API_KEY, API_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET } = process.env;
const method = "POST";
const url = "https://api.twitter.com/1.1/statuses/update.json";
const params = {
    status: generateSigil_1.default(),
};
const oauthParams = {
    oauth_consumer_key: API_KEY,
    oauth_token: OAUTH_TOKEN,
    oauth_nonce: utils_1.generateNonce(),
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_signature_method: "HMAC-SHA1",
    oauth_version: "1.0",
};
const oauth_signature = oauth_signature_1.default.generate(method, url, { ...oauthParams, ...params }, API_SECRET, OAUTH_TOKEN_SECRET);
const Authorization = "OAuth " +
    Object.entries({ ...oauthParams, oauth_signature })
        .map(([k, v]) => `${k}="${v}"`)
        .join(",");
axios_1.default({
    method,
    url,
    params,
    headers: { Authorization },
})
    .then(({ status, statusText }) => console.log(status, statusText))
    .catch(({ response: { status, statusText } }) => console.error(status, statusText));
