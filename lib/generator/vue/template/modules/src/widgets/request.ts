import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

axios.defaults.timeout = 12000
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true
// 允许跨域
// axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '' + (__DEV__ ? '' : import.meta.env.VITE_MAIN_SITE_DOMAIN),
})

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response
    }
    // TODO: 错误统一处理
    return response
  },
  // 请求失败
  error => {
    const { response } = error
    // TODO: 错误统一处理
    if (response) {
      // 请求已发出，但是不在2xx的范围
      return Promise.reject(response.data)
    } else {
      return Promise.reject(error)
    }
  }
)

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // TODO 鉴权相关
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const request = <T>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config
  return new Promise((resolve, reject) => {
    axiosInstance
      .request<T, AxiosResponse<T>>(conf)
      .then((res: AxiosResponse<T>) => {
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function get<T>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' })
}

export function post<T>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'POST' })
}

export default request
export type { AxiosInstance, AxiosResponse }
