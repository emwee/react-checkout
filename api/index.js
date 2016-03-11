/**
 * Mocking client-server processing
 */

import _checkout_details from '../api/checkout_details.json'

const TIMEOUT = 100

export default {
  getCheckoutDetails(cb, timeout) {
    setTimeout(() => cb(_checkout_details), timeout || TIMEOUT)
  }
}
