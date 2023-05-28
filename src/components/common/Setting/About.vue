<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import { NSpin } from 'naive-ui'
import { fetchChatConfig } from '@/api'
import pkg from '@/../package.json'
import { useAuthStore } from '@/store'

interface ConfigState {
  timeoutMs?: number
  reverseProxy?: string
  apiModel?: string
  socksProxy?: string
  httpsProxy?: string
  usage?: string
}

const authStore = useAuthStore()

const loading = ref(false)

const config = ref<ConfigState>()

// const isChatGPTAPI = computed<boolean>(() => !!authStore.isChatGPTAPI)

// async function fetchConfig() {
//   try {
//     loading.value = true
//     const { data } = await fetchChatConfig<ConfigState>()
//     config.value = data
//   }
//   finally {
//     loading.value = false
//   }
// }

onMounted(() => {
  // fetchConfig()
})
</script>

<template>
  <NSpin :show="loading">
    <div class="p-4 space-y-4" style="text-align: center;">
      <h2 class="text-xl font-bold">
        Version - 1.0.0
      </h2>
      <div class="p-2 space-y-2 rounded-md bg-neutral-100 dark:bg-neutral-700">
        <p>
          免费提供GPT3.5模型调用能力！
					后期将会接入GPT4和一些工具！
        </p>
        <p>
          如果对您有帮助，可以帮忙转发宣传！
        </p>
				<p>
					<h2 class="text-xl font-bold">畅玩蓝猫AI反馈群：</h2>
					<img  style="height: 200px;width: 200px;display: block;margin: 0 auto;" src="http://43.153.112.145:1002/group.jpeg" alt="反馈群" />
				</p>
				<br>
<!--				<p><h2 class="text-xl font-bold">公众号：蓝猫AI三千问</h2>-->
<!--				<img style="height: 200px;width: 200px;display: block;margin: 0 auto;" src="http://43.153.112.145:1002/wechat.jpeg" alt="反馈群" /></p>-->
      </div>
    </div>
  </NSpin>
</template>
