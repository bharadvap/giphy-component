import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Parses the XML returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed XML from the request
 */
function parseXml(response) {
  return response
    .text()
    .then(str => new DOMParser().parseFromString(str, 'application/xml'));
}

/**
 * Parses the text returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed text from the request
 */
function parseText(response) {
  return response.text();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return { response };
  }
  const error = new Error(response.statusText);
  error.response = response;
  return { error };
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {string} contentType The content type of response header
 *
 * @return {object}           The response data
 */
/* eslint-disable */
const API_URL = 'https://api.giphy.com/v1/gifs';
export default function request(url, options, contentType, xmlResult) {
  const error = null;
  const opts = options || {};
  opts.credentials = 'same-origin';
  return fetch(API_URL + url, opts)
    .then(checkStatus)
    .then(result => {
      const { error } = result;
      if (error && error.response.status === 403) {
        return error;
      }
      if (error && error.response.status === 422) {
        return parseJSON(error.response);
      }
      return result.response;
    })
    .then(response => {
      if (error) {
        error.body = response;
        throw error;
      }
      if (contentType === 'text/plain') {
        return parseText(response);
      }
      // avoid parsing non-json content by mistake
      if (contentType && contentType !== 'text/json') {
        return response;
      }

      if (contentType && contentType === 'image/png') {
        return response;
      }

      if (xmlResult) {
        return parseXml(response);
      }

      return parseJSON(response);
    });
}
/* eslint-enable */

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [object]  The object we want to pass into the body to "fetch"
 *
 * @return {object}           The response data
 */
export function postRequest(url, object) {
  return request(url, getOptions('POST', object));
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [object]  The object we want to pass into the body to "fetch"
 *
 * @return {object}           The response data
 */
export function putRequest(url, object) {
  return request(url, getOptions('PUT', object));
}

function getOptions(method, object) {
  return {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(object),
    method,
  };
}

/* eslint-disable */
export function serialize(params, prefix = '') {
  if (!params) return '';
  const query = Object.keys(params).reduce((accum, key) => {
    const value = params[key];
    if (params.constructor === Array) {
      key = `${prefix}[]`;
    } else if (params.constructor === Object) {
      key = prefix ? `${prefix}[${key}]` : key;
    }

    if (value === undefined) {
      return accum;
    } else if (typeof value === 'object') {
      const moreParams = serialize(value, key);
      if (moreParams) accum.push(moreParams);
    } else {
      accum.push(`${key}=${encodeURIComponent(value)}`);
    }
    return accum;
  }, []);
  return query.join('&');
}
/* eslint-enable */
