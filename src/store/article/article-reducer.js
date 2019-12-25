import * as types from '../action-types'

const defaultState = {
  categoryList: [],
  tagList: [],
  recentList: [],
  response: ''
}

export const articleReducer = (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.CATRGORY_GETLIST:
      return { ...state, categoryList: payload }
    case types.TAG_GETLIST:
      return { ...state, tagList: payload }
    case types.ARTICLE_CREATE:
        return { ...state, response: payload }
    default:
      return state
  }
}