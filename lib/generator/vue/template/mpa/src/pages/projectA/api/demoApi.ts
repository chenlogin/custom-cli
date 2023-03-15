/**
 * 项目demoA接口封装
 */
import { get } from '@/common/widgets/request'
import { joinQueryParams } from '@/common/widgets/utils'

const URL = {
  pageInfo: '/paper/info',
}

export const getPaperInfo = async (urlParam: { subject: string; paperId: string }) =>
  get({
    url: joinQueryParams(URL.pageInfo, urlParam),
    params: {
      data: JSON.stringify({}),
    },
  })
