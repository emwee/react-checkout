import * as types from '../constants/ActionTypes'

export const selectDate = (date) => {
  return {
    type: 'SELECT_DATE',
    date
  }
}