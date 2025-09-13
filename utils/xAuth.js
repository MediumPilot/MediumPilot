import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

/**
 * Generate OAuth1.0a Authorization header for X API
 *
 * @param {string} url    Full request URL
 * @param {string} method HTTP method (e.g., 'POST')
 * @param {object} body   Request body object (will be JSON-stringified)
 * @param {object} cfg    User config containing X credentials
 * @returns {string}      Authorization header value
 */
export function createXAuthHeader(url, method, body, cfg) {
  const oauth = OAuth({
    consumer: {
      key: cfg.xConsumerKey,
      secret: cfg.xConsumerSecret
    },
    signature_method: 'HMAC-SHA1',
    hash_function(baseString, key) {
      return CryptoJS.HmacSHA1(baseString, key).toString(CryptoJS.enc.Base64);
    }
  });

  const token = {
    key: cfg.xAccessToken,
    secret: cfg.xAccessTokenSecret
  };

  const requestData = {
    url,
    method,
    data: body || {}
  };

  const authHeader = oauth.toHeader(oauth.authorize(requestData, token));
  return authHeader.Authorization;
}
