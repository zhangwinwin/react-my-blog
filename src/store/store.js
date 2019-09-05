import thunk from 'redux-thunk'
import { compose, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './rootReducer'
let storeEnchancers = null
if (process.env.NODE_ENV === 'production') {
  storeEnchancers = compose(applyMiddleware(thunk))
} else {
  storeEnchancers = compose(composeWithDevTools(applyMiddleware(thunk)))
}

const configureStore = (initialState = {}) => {
  const store = createStore(reducer, initialState, storeEnchancers)
  if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('./rootReducer', () => {
      console.log('replacing reducer')
      const nextReducer = require('./rootReducer')
      store.replaceReducer(nextReducer)
    })
  }
  return store
}

export default configureStore()