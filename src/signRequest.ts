import { AxiosRequestConfig } from "axios"
import oauth from "oauth-signature"
import { generateNonce } from "./utils"

const { API_KEY, API_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET } = process.env

const getFullURL = (cfg: AxiosRequestConfig) => (cfg.baseURL ? cfg.baseURL + cfg.url : cfg.url)

export default function signRequest(cfg: AxiosRequestConfig) {
  if (!API_KEY || !API_SECRET || !OAUTH_TOKEN || !OAUTH_TOKEN_SECRET) {
    throw new Error("missing environment variables")
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
    cfg.method,
    getFullURL(cfg),
    { ...oauthParams, ...cfg.params },
    API_SECRET,
    OAUTH_TOKEN_SECRET,
  )
  const authHeader =
    "OAuth " +
    Object.entries({ ...oauthParams, oauth_signature })
      .map(([k, v]) => `${k}="${v}"`)
      .join(",")

  cfg.headers.Authorization = authHeader

  return cfg
}
