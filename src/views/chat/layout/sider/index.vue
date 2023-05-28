<script setup lang='ts'>
import type { CSSProperties } from 'vue'
import { computed, ref, watch } from 'vue'
import { NButton, NLayoutSider } from 'naive-ui'
import List from './List.vue'
import Footer from './Footer.vue'
import { useAppStore, useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { PromptStore } from '@/components/common'
import type { Theme } from '@/store/modules/app/helper'
import { SvgIcon } from '@/components/common'
import { PromptModel } from '@/components/common'

const appStore = useAppStore()
const chatStore = useChatStore()

const { isMobile } = useBasicLayout()
const show = ref(false)

const showPromptModel = ref(false)
const collapsed = computed(() => appStore.siderCollapsed)

function changePromptModel() {
    showPromptModel.value = true
}

function handleAdd() {
    chatStore.addHistory({ title: 'New Chat', uuid: Date.now(), isEdit: false })
    if (isMobile.value)
        appStore.setSiderCollapsed(true)
}

function handleUpdateCollapsed() {
  appStore.setSiderCollapsed(!collapsed.value)
}

const getMobileClass = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return {
      position: 'fixed',
      zIndex: 50,
    }
  }
  return {}
})

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    }
  }
  return {}
})

watch(
  isMobile,
  (val) => {
    appStore.setSiderCollapsed(val)
  },
  {
    immediate: true,
    flush: 'post',
  },
)

const theme = computed(() => appStore.theme)
const themeOptions: { label: string; key: Theme; icon: string }[] = [
    {
        label: 'Auto',
        key: 'auto',
        icon: 'ri:contrast-line',
    },
    {
        label: 'Light',
        key: 'light',
        icon: 'ri:sun-foggy-line',
    },
    {
        label: 'Dark',
        key: 'dark',
        icon: 'ri:moon-foggy-line',
    },
]

	function toAide() {
      window.open(`#/aide`, '_blank')
  }

</script>

<template>
  <NLayoutSider
    :collapsed="collapsed"
    :collapsed-width="0"
    :width="260"
    :show-trigger="isMobile ? false : 'arrow-circle'"
    collapse-mode="transform"
    position="absolute"
    bordered
    :style="getMobileClass"
    @update-collapsed="handleUpdateCollapsed"
  >
    <div class="flex flex-col h-full" :style="mobileSafeArea">
      <main class="flex flex-col flex-1 min-h-0">
<!--        <div class="p-4">-->
<!--					<NButton dashed block @click="changePromptModel">-->
<!--						{{ $t('chat.chosePromptModel') }}-->
<!--					</NButton>-->
<!--        </div>-->
				<div class="p-4">
					<NButton dashed block @click="handleAdd">
						{{ $t('chat.newChatButton') }}
					</NButton>
				</div>

        <div class="flex-1 min-h-0 pb-4 overflow-hidden">
          <List />
        </div>

<!--				提示词商店-->
        <div class="p-4">
					<NButton block @click="toAide">
						{{ $t('store.ToolButton') }}
					</NButton>
          <NButton block @click="show = true">
            {{ $t('store.siderButton') }}
          </NButton>
        </div>
				<div class="p-1">
					<!--			设置主题 -->
					<div class="flex items-center space-x-1" >
						<span class="flex-shrink-0 w-[100px]">{{ $t('setting.theme') }}</span>
						<template v-for="item of themeOptions" :key="item.key">
							<NButton
								size="small"
								:type="item.key === theme ? 'primary' : undefined"
								@click="appStore.setTheme(item.key)">
								<template #icon>
									<SvgIcon :icon="item.icon" />
								</template>
							</NButton>
						</template>
					</div>
				</div>
      </main>
      <Footer />
    </div>
  </NLayoutSider>
  <template v-if="isMobile">
    <div v-show="!collapsed" class="fixed inset-0 z-40 bg-black/40" @click="handleUpdateCollapsed" />
  </template>
  <PromptStore v-model:visible="show" />
<!--	<PromptModel v-model:visible="showPromptModel" />-->
</template>
