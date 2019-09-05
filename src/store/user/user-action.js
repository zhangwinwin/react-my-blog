import * as types from '@/store/action-types'
import axios from '@/lib/axios'
import { message } from 'antd'

export function login (params) {
  return dispatch => {
    axios.post('/login', params).then(res => {
      if (res.code === 200) {
        localStorage.setItem('token', res.token)
        dispatch({ type: types.USER_LOGIN, payload: {
          token: res.token
        }})
      } else {
        message.error(res.message)
      }
      return res
    })
  }
}

export function register (params) {
  return dispatch => {
    axios.post('/register', params).then(res => {
      if (res.code === 200) {
        message.success(res.message)
      } else {
        message.error(res.message)
      }
      return res
    })
  }
}

export function updateUser (params) {
  return dispatch => {
    axios.put(`/users/${params.userId}`, params).then(res => {
      if (res.code === 200) {
        message.success(res.message)
        localStorage.setItem('token', res.token)
        dispatch({
          type: types.USER_LOGIN,
          payload: {
            token: res.token
          }
        })
      } else {
        message.error(res.message)
      }
      return res
    })
  }
}

export function logout () {
  localStorage.removeItem('token')
  return {
    type: types.USER_LOGINOUT
  }
}