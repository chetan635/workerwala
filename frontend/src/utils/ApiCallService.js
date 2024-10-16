import { authConstants } from "../constants/AuthConstants.jsx";

/**
 * Method to make api request
 *
 * @param {*} requestType type of API request (e.g GET, POST, DELETE, UPDATE etc)
 * @param {*} requestBody requestBody of the API call
 * @param {*} endpoint endpoint for the api call
 */
export async function makeApiCall(requestType, endpoint, requestBody) {
  return await fetch(`${authConstants.dataBaseServer}/${endpoint}`, {
    // Adding method types
    method: requestType,
    mode: "cors",

    // Adding body content to send
    body: JSON.stringify(requestBody),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*",
    },
  });
}

/**
 * Method to make a API call for formData
 *
 * @param {*} requestType type of API request (e.g GET, POST, DELETE, UPDATE etc)
 * @param {*} requestBody requestBody of the API call
 * @param {*} endpoint endpoint for the api call
 */
export async function makeApiCallWithFormData(
  requestType,
  endpoint,
  requestBody
) {
  return await fetch(`${authConstants.dataBaseServer}/${endpoint}`, {
    // Adding method types
    method: requestType,
    mode: "cors",

    // Adding body content to send this is in multipart
    body: requestBody,
  });
}

/**
 * Method to make api request without request body
 *
 * @param {*} requestType type of API request (e.g GET, POST, DELETE, UPDATE etc)
 * @param {*} endpoint endpoint for the api call
 */
export async function makeApiCallWithoutBody(requestType, endpoint) {
  return fetch(`${authConstants.dataBaseServer}/${endpoint}`, {
    // Adding method types
    method: requestType,
    mode: "cors",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "*",
    },
  });
}

export async function makeApiCallWithHeadersWithoutBody(
  requestType,
  endpoint,
  headers
) {
  return fetch(`${authConstants.dataBaseServer}/${endpoint}`, {
    // Adding method types
    method: requestType,
    mode: "cors",

    // Adding headers to the request
    headers: headers,
  });
}
