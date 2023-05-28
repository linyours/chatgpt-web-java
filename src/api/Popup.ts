import { post } from '@/utils/request'


export function requestNoticeContent<T>(source : string) {
  return post<T>({
    url: '/popupInfo/getPopupInfo',
    data: {"source":source},
  })
}
