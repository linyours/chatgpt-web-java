<script setup lang='ts'>
import { computed } from 'vue'
import { NAvatar } from 'naive-ui'
import { useUserStore } from '@/store'
import defaultAvatar from '@/assets/avatar.jpg'
import { isString } from '@/utils/is'
import {UserInfo} from "@/typings/user"
import {getUserInfo} from "@/api/user"

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

</script>

<template>
  <div v-if="userInfo && userInfo.id" class="flex items-center overflow-hidden">
    <div class="w-10 h-10 overflow-hidden rounded-full shrink-0">
      <template v-if="isString(userInfo.avatar) && userInfo.avatar.length > 0">
        <NAvatar
          size="large"
          round
          :src="userInfo.avatar"
          :fallback-src="defaultAvatar"/>
      </template>
    </div>
    <div class="flex-1 min-w-0 ml-2">
      <h2 class="overflow-hidden font-bold text-md text-ellipsis whitespace-nowrap">
        账号:{{ userInfo.account ?? 'BlueCat' }}
      </h2>
    </div>
  </div>
	<div v-if="!userInfo" class="flex items-center overflow-hidden">

	</div>
</template>

<!-- 描述 -->
<!--      <p class="overflow-hidden text-xs text-gray-500 text-ellipsis whitespace-nowrap">-->
<!--        <span-->
<!--          v-if="isString(userInfo.description) && userInfo.description !== ''"-->
<!--          v-html="userInfo.description"-->
<!--        />-->
<!--      </p>-->
