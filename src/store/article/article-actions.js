import * as types from '../action-types'
import axios from '@/lib/axios'

export const getTags = () => {
  return dispatch =>
    axios.get('/tags').then(res => {
      dispatch({
        type: types.TAG_GETLIST,
        payload: res.data
      })
    })
}

export const getCategories = () => {
  return dispatch =>
    axios.get('/categories').then(res => {
      dispatch({
        type: types.CATRGORY_GETLIST,
        payload: res.data
      })
    })
}

export const createArticle = (data) => {
  return dispatch => 
    axios.post('/articles/create', data).then(res => {
      dispatch({
        type: types.ARTICLE_CREATE,
        payload: res.data
      })
    })
}