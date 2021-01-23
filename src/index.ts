import dotenv from "dotenv"
dotenv.config()

import axios from "axios"
import generateSigil from "./generateSigil"
import signRequest from "./signRequest"

const method = "POST"
const url = "https://api.twitter.com/1.1/statuses/update.json"
const status = generateSigil()

axios.interceptors.request.use(signRequest)

axios({ method, url, params: { status } })
  .then(({ status, statusText }) => console.log(status, statusText))
  .catch(({ response: { status, statusText } }) => console.error(status, statusText))
