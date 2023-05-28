import { defineStore } from 'pinia'
import type { NoticeInfo, NoticeState } from './helper'
import { defaultSetting, getLocalState, setLocalState } from './helper'

export const useNoticeStore = defineStore('notice-store', {
  state: (): NoticeState => getLocalState(),
  actions: {
    updateNoticeInfo(userInfo: Partial<NoticeInfo>) {
			this.noticeInfo = { ...this.noticeInfo, ...userInfo }
			this.recordState()
    },

		resetNoticeInfo() {
      this.noticeInfo = { ...defaultSetting().noticeInfo }
      this.recordState()
    },

    recordState() {
      setLocalState(this.$state)
    },
  },
})
