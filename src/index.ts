import axios from "axios"
import dotenv from "dotenv"
import oauth from "oauth-signature"
import { generateNonce } from "./utils"
import generateSigil from "./generateSigil"

dotenv.config()

const { API_KEY, API_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET } = process.env

const method = "POST"
const url = "https://api.twitter.com/1.1/statuses/update.json"
const params = {
  status: generateSigil(),
}
const oauthParams = {
  oauth_consumer_key: API_KEY,
  oauth_token: OAUTH_TOKEN,
  oauth_nonce: generateNonce(),
  oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
  oauth_signature_method: "HMAC-SHA1",
  oauth_version: "1.0",
}
const oauth_signature = oauth.generate(
  method,
  url,
  { ...oauthParams, ...params },
  API_SECRET,
  OAUTH_TOKEN_SECRET,
)
const Authorization =
  "OAuth " +
  Object.entries({ ...oauthParams, oauth_signature })
    .map(([k, v]) => `${k}="${v}"`)
    .join(",")

axios({
  method,
  url,
  params,
  headers: { Authorization },
})
  .then(({ status, statusText }) => console.log(status, statusText))
  .catch(({ response: { status, statusText } }) => console.error(status, statusText))
