// Higher Order Class to make all network calls
import { Cookies } from "react-cookie"
import axios from "axios"
import { APIWithOfflineRouter, HTTP_METHODS } from "./httpHelper"
import { APIConfig } from "../config/serverConfig"
import { APIError, APIResponse } from "./responseParser"
import { refreshAuthToken } from "./tokenRefresher"
import { APIAborter } from "./abortController"
import offlineManager from "./offlineManager"
import { HTTP_STATUS } from "./statusCode"
import { apiError, offlineNotation } from "./errorParser"

import { CookieKeys } from "@local/constants/cookieKeys"
import { UserState } from "@local/redux/dispatcher/UserState"

// ********************
// Create a new Instance of NetworkManager by passing APIRouter argument
// After creating instance, call `request` method to make network request
// Example:
// const payload = {email: "example@gmail.com", password: "123456"}
// const instance = NetworkManager(API.Auth.Login)
// const result = await instance.request(payload)
// --------------------
// You can also pass some id in the url as parameter
// If params are named params then pass an object, the key name must match the param name
// Eg. If the URL is like "https://example.com/login?type=regular", then request would look like below
// const result = await instance.request(payload, {type: "regular"})
// --------------------
// If the params are not named then pass an array of data
// Eg. If the URL is like "https://example.com/user/1/2", then request would look like below
// const result = await instance.request(payload, ["id1", "id2"])
// ********************

export default function networkManager(router, withFile = false) {
  const { TIMEOUT, API_AUTH_HEADER, AUTH_TYPE, CONTENT_TYPE } = APIConfig
  const REQ_CONTENT_TYPE = withFile ? CONTENT_TYPE.MULTIPART : CONTENT_TYPE.JSON

  axios.defaults.baseURL = router.baseURL
  axios.defaults.timeout = TIMEOUT
  axios.defaults.headers.common["Content-Type"] = REQ_CONTENT_TYPE
  axios.defaults.headers.common["Accept-Language"] = "en"

  const cookie = new Cookies()
  const authToken = cookie.get(CookieKeys.Auth)

  if (authToken && authToken !== "undefined") {
    axios.defaults.headers.common[API_AUTH_HEADER] = `${AUTH_TYPE} ${authToken}`
  }

  const AppEnvIsDev = process.env.NEXT_PUBLIC_ENV === "dev"

  let refreshCount = 0

  async function request(body = {}, params = {} || []) {
    const url = urlBuilder(router, params)
    const getHttpMethod = router.method !== HTTP_METHODS.GET
    const getArrayParams = !Array.isArray(params) && Object.keys(params).length
    const httpBody = httpBodyBuilder(body, withFile)

    try {
      const result = await axios.request({
        signal: APIAborter.initiate().signal,
        url: url,
        method: router.method,
        ...(getHttpMethod && { data: httpBody }),
        ...(getArrayParams && { params: params })
      })
      // If token expired, get it refreshed
      const response = result.data
      return new APIResponse(response.data, response.success, result.status, response.data?.message)
    } catch (err) {
      // Catch all errors
      apiError(err?.response?.data?.error?.message)
      const IsNetworkError = err.code === HTTP_STATUS.NETWORK_ERR
      if (router instanceof APIWithOfflineRouter && AppEnvIsDev && IsNetworkError) {
        offlineNotation()
        return offlineManager(router.offlineJson)
      }
      if (err.response?.status === 401) {
        if (refreshCount < APIConfig.MAX_REFRESH_ATTEMPTS) {
          const refreshToken = cookie.get(CookieKeys.REFRESH_TOKEN)
          await refreshAuthToken(refreshToken)
          refreshCount++
          // pass the control back to network manager
          return await request(body, params)
        } else {
          UserState.observeLogout()
        }
      } else if (err.code === HTTP_STATUS.NETWORK_ERR) {
        apiError("Internal server error!")
      }
      return new APIError(err.message, err.code)
    }
  }
  return {
    request
  }
}

// Prepare endpoint url with params
function urlBuilder(router, params) {
  let uri = ""
  if (typeof router.version === "string") {
    uri = `/${router.version}`
  }
  uri = uri.concat(router.endpoint)
  // all params in form of uri/id1/id2/id3
  if (Array.isArray(params)) {
    for (let key of params) {
      uri = uri.concat("/", key)
    }
  }
  return uri
}

// Prepare endpoint body for no GET requests
function httpBodyBuilder(body, withFile) {
  if (withFile) {
    const formData = new FormData()
    for (let key in body) {
      if (body[key] instanceof FileList) {
        for (let file of body[key]) {
          formData.append(key, file)
        }
      } else {
        formData.append(key, body[key])
      }
    }
    return formData
  } else {
    return body
  }
}
