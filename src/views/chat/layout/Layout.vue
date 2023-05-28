<script setup lang='ts'>
import { computed } from 'vue'
import { NLayout, NLayoutContent } from 'naive-ui'
import { useRouter } from 'vue-router'
import Sider from './sider/index.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useAppStore, useChatStore } from '@/store'
import {scrollbar} from "@/components/common";
const router = useRouter()
const appStore = useAppStore()
const chatStore = useChatStore()

router.replace({ name: 'Chat', params: { uuid: chatStore.active } })

const { isMobile } = useBasicLayout()

const collapsed = computed(() => appStore.siderCollapsed)


const getMobileClass = computed(() => {
  if (isMobile.value)
    return ['rounded-none', 'shadow-none']
  return ['border', 'rounded-md', 'shadow-md', 'dark:border-neutral-800']
})

const getContainerClass = computed(() => {
  return [
    'h-full',
    { 'pl-[260px]': !isMobile.value && !collapsed.value },
  ]
})
const newsList =  [
    {
        name: "主页公告：",
        detail: "蓝猫AI助手【工具箱】全新上线！关注公众号【蓝猫AI三千问】即可享受ChatGPT带来的智能体验！" +
            "现在点击左下角【登录】按钮，优先免费体验最新功能！" +
            "有任何需求<a href=\"https://mp.weixin.qq.com/s/WxwXPfThFEHjAE7hHyvwoA\" style=\"color: #58a6ff\">点击联系我们</a>!先提的优先实现！",
    }
]
</script>

<template>
	<div v-if="!isMobile" class="messageBox">
		<scrollbar :sendVal="newsList"></scrollbar>
	</div>
<!--	<div v-if="isMobile" style="height: 35px"></div>-->
	<br v-if="!isMobile">
  <div style="top: 200px" class="h-full dark:bg-[#24272e] transition-all" :class="[isMobile ? 'p-0' : 'p-4']">
    <div class="h-full overflow-hidden" :class="getMobileClass">
      <NLayout class="z-40 transition" :class="getContainerClass" has-sider>
        <Sider />
        <NLayoutContent class="h-full">
          <RouterView v-slot="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </RouterView>
        </NLayoutContent>
      </NLayout>
    </div>
  </div>
</template>
<style>
	.messageBox {
		width: 100%;
		background: black;
		z-index: 9;
		position: fixed;
	}
</style>
