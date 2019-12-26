import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App.jsx';
import { Provider } from 'react-redux'
import axios from '../src/lib/axios'
import store from '@/store/store.js'
import * as serviceWorker from './serviceWorker';

// 样式重置
import '@/style/reset.less'
import '@/assets/iconfont/iconfont.css'
import './style/index.less'

// 绑定全局方法axios
React.Component.prototype.$axios = axios

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}
render(App)
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
serviceWorker.unregister();
