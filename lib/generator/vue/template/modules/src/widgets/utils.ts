/**
 * 解析url查询参数
 * @param url url
 */
export function getQueryParams(url: string) {
  const params = {}
  let queryString = url.substring(url.search(/\?/) + 1)

  //去掉参数上hash信息
  const hashIndex = queryString.search(/#\//)
  if (hashIndex > -1) {
    queryString = queryString.substring(0, hashIndex)
  }

  const kvs = queryString.split('&')
  kvs.forEach(function (kv) {
    const pair = kv.split('=', 2)
    if (pair.length !== 2 || !pair[0]) {
      return
    }
    const name = decodeURIComponent(pair[0])
    const value = decodeURIComponent(pair[1])
    params[name] = value
  })
  return params
}
/**
 * 将对象转换为url参数
 * @param obj
 */
export function turnToParam(obj) {
  const str: Array<string> = []
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) === true) {
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    }
  }
  return str.join('&')
}

/**
 * 将网址转换为绝对地址
 * @param url
 */
export function wrapAbsolutePath(url: string) {
  // 获取当前页面的url
  let curPath = window.location.href.split('?')[0]
  const tempIndex = curPath.lastIndexOf('/')
  curPath = curPath.substring(0, tempIndex + 1)
  return curPath + url
}
/**
 * 将参数连接到指定URL后面
 * @param url url
 * @param params 一个map，包含要连接的参数
 * @return string 连接后的URL地址
 */
export function joinQueryParams(url, params) {
  // 首先将url解析为空url和params列表
  const oriURL = url.split('?')[0]
  const oriParams = getQueryParams(url)
  // 用新参数覆盖老map
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      oriParams[key] = params[key]
    }
  }
  // 整理成为数组
  const tempArr: Array<string> = []
  for (const key in oriParams) {
    if (Object.prototype.hasOwnProperty.call(oriParams, key)) {
      const param = typeof oriParams[key] === 'object' ? JSON.stringify(oriParams[key]) : oriParams[key]
      tempArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(param))
    }
  }
  // 然后连接参数列表到url
  return oriURL + '?' + tempArr.join('&')
}

/*
 * 设备判断
 * */
export function currentUA() {
  const u = navigator.userAgent
  return {
    iOS: /ip(ad|hone|od)/.test(u.toLowerCase()) && u.toLowerCase().match(/os (\d+)_(\d+)/),
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
  }
}
