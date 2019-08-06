import axios from '@/axios'
// import api from './api'
export default {
  // 公共接口
  login: data => { // 登录接口
    return axios(`/warrantLogin`, data, `post`)
  },
}