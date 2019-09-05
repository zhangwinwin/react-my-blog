/**
 * 全局配置文件
 */
let baseURL
if(process.env.NODE_ENV === 'development'){
  baseURL = 'http://localhost:3030/api'
}else{
  baseURL = 'http://localhost:3030'
}


export default baseURL