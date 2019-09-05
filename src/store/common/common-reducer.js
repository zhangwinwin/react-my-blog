import * as types from '../action-types'
import { groupBy, random } from '@/lib'

const defaultState = {
  colorList: ['magenta', 'blue', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'geekblue', 'purple'], // 标签颜色
  authModalVisible: false,
  authModalType: '',
  windowWidth: 0,
  drawerVisible: false,
  colorMap: {}
}

export const commonReducer = (state = defaultState, action) => {
  const { type, playload } = action
  switch (type) {
    case types.AUTH_OPEN_AUTHMODAL:
      return {
        ...state,
        authModalVisible: true,
        authModalType: playload
      }
    case types.AUTH_CLOSE_AUTHMODEL:
      return {
        ...state,
        authModalVisible: false,
        authModalType: ''
      }
    case types.COMMON_GET_WINDOW_WIDTH:
      return {
        ...state,
        windowWidth: playload
      }
    case types.COMMON_OPEN_DRAWER:
      return {
        ...state,
        drawerVisible: true
      }
    case types.COMMON_CLOSE_DRAWER:
      return {
        ...state,
        drawerVisible: false
      }
    case types.COMMON_COLOR_MAP:
      const list = groupBy(playload, item => item.userId)
      const colorList = state.colorList
      let colorMap = {}
      list.forEact(item => {
        colorMap[item[0].userId] = colorList[random(colorList)]
        item[0]['replies'].forEact(d => {
          if (!colorMap[d.userId]) {
            colorMap[d.userId] = colorList[random(colorList)]
          }
        })
      })
      return {
        ...state,
        colorMap
      }
    default:
      return state
  }
}