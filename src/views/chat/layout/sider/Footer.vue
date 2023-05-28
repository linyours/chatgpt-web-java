<script setup lang='ts'>
import { defineAsyncComponent, ref ,computed,onMounted} from 'vue'
import { useUserStore } from '@/store'
import { HoverButton, SvgIcon, UserAvatar } from '@/components/common'
import { NButton } from 'naive-ui'
import {UserInfo} from "@/typings/user"
import {getUserInfo} from "@/api/user"
import { useRouter } from 'vue-router'

const userStore = useUserStore()

const userInfo = ref<UserInfo>(Object.create(null))
onMounted(async () => {
    userInfo.value = await getUserInfo()
    if(userInfo.value){
        userStore.updateUserInfo(userInfo.value)
        return
    }
})
const Setting = defineAsyncComponent(() => import('@/components/common/Setting/index.vue'))

const show = ref(false)

const router = useRouter()
function login() {
    router.push('/login')
}

</script>

<template>
  <footer class="flex items-center justify-between min-w-0 p-4 overflow-hidden border-t dark:border-neutral-800">
		<div v-if=" userInfo && userInfo.id" class="flex-1 flex-shrink-0 overflow-hidden">
			<UserAvatar />
		</div>
<!--		<HoverButton v-if=" userInfo && userInfo.id"  @click="show = true">-->
<!--			<span class="text-xl text-[#4f555e] dark:text-white">-->
<!--					<SvgIcon icon="ri:settings-4-line" />-->
<!--			</span>-->
<!--		</HoverButton>-->

		<div v-else class="flex-1 flex-shrink-0 overflow-hidden">
			<NButton style=" border: none " block @click="login">
				{{ $t('store.loginButton') }}
			</NButton>
		</div>

    <Setting v-if="show" v-model:visible="show" />
  </footer>
</template>
