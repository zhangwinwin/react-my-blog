import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  baseURL: 'http://localhost:3030',
  timeout: 20000 // 请求超时时间
})

// 拦截请求
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.common['Authorization'] = 'Bearer' + token
    }
    return config
  },
  error => {
    message.error('bed request')
    Promise.reject(error)
  }
)

// 拦截响应
instance.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      response.data.message && message.warning(response.data.message)
      return Promise.reject(response.data)
    }
    return response.data
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          message.error('错误请求')
          break
        case 401:
          localStorage.clear()
          message.error('登陆信息过期或没授权，请重新登陆')
          break
        case 403:
          message.error('拒绝访问！')
          break
        case 404:
          message.error('请求错误')
          break
        case 500:
          message.error('服务器出问题，请稍后再试')
          break
        default:
          message.error(`连接错误${error.response.status}!`)
      }
    } else {
      message.error('服务器出现问题，请稍后再试')
    }
    return Promise.reject(error)
  }
)

export default instance