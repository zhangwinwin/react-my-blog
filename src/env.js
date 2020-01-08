/**
 * 全局配置文件
 */
let baseURL
if(process.env.NODE_ENV === 'development'){
  baseURL = 'http://localhost:3030/api'
}else{
  baseURL = 'http://106.53.71.181:3030/api'
}


export default baseURL