/**
 * Mocking client-server processing
 */
import _checkout_details from './checkout_details.json'

console.log(_checkout_details)

const TIMEOUT = 100

export default {
  getDetails(cb, timeout) {
    setTimeout(() => cb(_checkout_details), timeout || TIMEOUT)
  }
}
