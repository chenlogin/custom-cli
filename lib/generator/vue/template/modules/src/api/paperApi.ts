/**
 * 接口封装
 */
import { get } from '../widgets/request'
import { joinQueryParams } from '../widgets/utils'

const URL = {
  getPaperInfo: '/api/gem/math/pub/paper/info',
}

export const getPaperInfo = async (urlParam: { subject: string; paperId: string }) =>
  get({
    url: joinQueryParams(URL.getPaperInfo, urlParam),
    params: {
      data: JSON.stringify({}),
    },
  })
