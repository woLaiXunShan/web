import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true // 允许请求携带cookie
// 创建axios实例
const Axios = axios.create({
  baseURL: 'http://127.0.0.1:8000/bmp/', // 
  timeout: 15000 // 请求超时时间
})
// 添加请求拦截器
Axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.url += '.do'
  // 若请求的地址、参数与上一次完全相同，则指定时间内不发起后续请求
  let lastDate = new Date().getTime()
  if (config.url === sessionStorage.lastUrl && config.data === sessionStorage.lastData && (lastDate - sessionStorage.lastDate < 2000)) {
    return Promise.reject()
  } else {
    sessionStorage.lastUrl = config.url
    sessionStorage.lastData = config.data
    sessionStorage.lastDate = lastDate
    return config
  }
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
Axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response.data
}, error => {
  return Promise.reject(error)
})
// 发起请求
export default (url, data, method = `GET`, file) => {
  data = data || ''
  if (method === `GET`) {
    return Axios.get(url, data.params ? data : {
      params: data
    })
  }
  if (method === 'delete' || method === 'DELETE') {
    return Axios.delete(url, data.params ? data : {
      params: data
    })
  }
  if (method === 'POST' || method === 'post') {
    if (file) {
      return Axios.post(url, data)
    } else {
      return Axios.post(url, qs.stringify(data))
    }
  }
  if (method === 'patch' || method === 'PATCH') {
    return Axios.patch(url, qs.stringify(data))
  }
  if (method === 'put' || method === 'PUT') {
    return Axios.put(url, qs.stringify(data))
  }
}
