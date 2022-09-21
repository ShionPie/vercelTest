import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '@/store'
import { getLoginToken, getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL:"",
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      config.headers['access_token'] = getToken()
    }
    if (store.state.user.loginToken) {
      config.headers['authToken'] = getLoginToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // 特殊处理,用于获取xml文件接口
    if (!res.code) {
      res.code = 0
    }
    // if the custom code is not 0, it is judged as an error.
    if (res.code !== 0) {
      console.log('result no code')
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 20 * 1000
      // })

      // 14: Illegal token; 13: Other clients logged in; 31: Token expired;
      if (res.code === 14 || res.code === 13 || res.code === 31 || res.code === 32) {
        // to re-login
        MessageBox.confirm('您的凭证已失效，请点击登出返回到登录页面重新登陆，点击取消则留在当前页面', '警告', {
          confirmButtonText: '登出',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      // return Promise.reject(new Error(res.message || 'Error'))
      return Promise.reject((res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (error.config.url.lastIndexOf('/user/get_token') > -1) {
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
      return Promise.reject(error)
    }
    if (error.response.status === 401) {
      // for debug
      return new Promise((resolve, reject) => {
        store.dispatch('user/getAccessToken').then((res) => {
          const config_ = error.response.config
          config_.headers['access_token'] = getToken()
          if (store.state.user.loginToken) {
            config_.headers['authToken'] = getLoginToken()
          }
          const a = config_.url.indexOf(process.env.VUE_APP_BASE_API)
          if (a > -1) {
            config_.url = config_.url.substring(a + process.env.VUE_APP_BASE_API.length)
          }
          resolve(config_)
          console.log(config_)
        })
      }).then(config => {
        return new Promise((resolve, reject) => {
          service.request(config).then(res => {
            resolve(res)
          }).catch(() => {
          })
        })
      }).catch(() => {
      })
    } else {
      // Message({
      //   message: error.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      return Promise.reject(error)
    }
  }
)
export default service
