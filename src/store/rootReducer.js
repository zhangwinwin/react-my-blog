import {commonReducer} from './common/common-reducer'
import { combineReducers } from 'redux'
import {articleReducer} from './article/article-reducer'
import {userReducer} from './user/user-reducer'

export default combineReducers({
  commonReducer,
  articleReducer,
  userReducer
})