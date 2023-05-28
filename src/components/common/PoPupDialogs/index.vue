<script setup lang='ts' xmlns:v-model="http://www.w3.org/1999/xhtml">
import { computed, ref,onMounted } from 'vue'
import { NModal, NTabPane, NTabs,useMessage } from 'naive-ui'
import {  } from '@/store'
import { SvgIcon } from '@/components/common'
import type { NoticeInfo } from '@/store/modules/Popup/helper'
import {useNoticeStore} from "@/store/modules/Popup";

import {requestNoticeContent} from '@/api/Popup'
import { t } from '@/locales'


interface Props {
  visible: boolean
}

interface Emit {
  (e: 'update:visible', visible: boolean): void
}
const ms = useMessage()

const noticeStore = useNoticeStore()


const props = defineProps<Props>()

const emit = defineEmits<Emit>()


export interface NoticeState {
	noticeInfo: NoticeInfo
}

const noticeInfo = computed(() => noticeStore.noticeInfo)


const noticeTitle = ref(noticeInfo.value.title )

const noticeContent = ref(noticeInfo.value.content)

const show = computed({
  get() {
    return props.visible
  },
  set(visible: boolean) {
    emit('update:visible', visible)
  },
})
</script>

<template>
  <NModal v-model:show="show" :auto-focus="true" preset="card" style="width: 95%; max-width: 640px">
    <div>
      <NTabs  type="line">
        <NTabPane  name="Config" tab="Config">
          <template #tab>
            <div class="text-lg" icon="ri:list-settings-line" />
            <span class="ml-2">{{ $t('setting.notice') }}</span>
          </template>
					<div class="p-4 space-y-4" style="text-align: center;">
						<h2 class="text-xl font-bold">
							{{noticeTitle}}
						</h2>
						<div class="p-2 space-y-2 rounded-md bg-neutral-100 dark:bg-neutral-700">
							<div class="flex-1">
								<p v-html="noticeContent"></p>
							</div>
							<br>
							</div>
					</div>
        </NTabPane>
      </NTabs>
    </div>
  </NModal>
</template>
