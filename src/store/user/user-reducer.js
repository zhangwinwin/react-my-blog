import * as types from '@/store/action-types'
import jwtDecode from 'jwt-decode'

let defaultState = {
  userId: 0,
  username: '',
  auth: 0,
  email: '',
  avatarColor: '#52C41A'
}

if (!!localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
  const { userId, username, auth, email } = jwtDecode(localStorage.token)
  defaultState = Object.assign(defaultState, { userId, username, auth, email })
}

export function userReducer (state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case types.USER_LOGIN:
      const { userId, username, auth, email } = jwtDecode(payload.token)
      return { ...state, userId, username, auth, email }
    case types.USER_LOGINOUT:
      return { id: 0, username: '', auth: 0, avatarColor: '#52C41A', email: ''}
    default:
      return state
  }
}