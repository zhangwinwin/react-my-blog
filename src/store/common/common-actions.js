import * as types from '../action-types'

export const openAuthModal = payload => {
  return {
    type: types.AUTH_OPEN_AUTHMODAL,
    payload
  }
}

export const closeAuthModal = playload => {
  return {
    type: types.AUTH_CLOSE_AUTHMODAL,
    playload
  }
}

export const getWindowWidth = () => {
  const body = document.getElementsByTagName('body')[0]
  return {
    type: types.COMMON_GET_WINDOW_WIDTH,
    payload: body.clientWidth
  }
}

export const openDrawer = () => (
  {
    type: types.COMMON_OPEN_DRAWER
  }
)

export const closeDrawer = () => (
  {
    type: types.COMMON_CLOSE_DRAWER
  }
)

export const generateColorMap = commentList => ({
  type: types.COMMON_COLOR_MAP,
  payload: commentList
})