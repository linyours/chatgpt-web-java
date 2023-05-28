<script setup lang='ts'>
import { ref ,defineAsyncComponent,computed,onMounted} from 'vue'
import { useRouter } from 'vue-router'
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  useMessage,
} from 'naive-ui'
import { setCookie } from '@/utils/setCookie'
import encry from '@/utils/md5'
import { doLogin } from '@/api/user'
import {NoticeInfo} from "@/store/modules/Popup/helper";
import {useNoticeStore} from "@/store/modules/Popup";
import {requestNoticeContent} from '@/api/Popup'
import { t } from '@/locales'
import {UserInfo} from '@/typings/user'
import {scrollbar} from "@/components/common";


const PoPupDialogs = defineAsyncComponent(() => import('@/components/common/PoPupDialogs/index.vue'))

import {ModelType} from "@/typings/user";


const formRef = ref<any | null>(null)
const router = useRouter()
// const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const message = useMessage()
const model = ref<ModelType>(Object.create(null))
const rules = {
  account: {
    required: true,
    message: '请输入用户名',
    trigger: ['input', 'blur'],
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['input', 'blur'],
  },
}


const noticeStore = useNoticeStore()
const show = ref<boolean>(false)
const newsList =  [
    {
        name: "登录公告：",
        detail: "蓝猫AI助手全新上线！关注公众号【蓝猫AI三千问】即可享受ChatGPT带来的智能体验！" +
            "现在立马【登录】，优先免费体验最新功能！" +
            "有任何需求<a href=\"https://mp.weixin.qq.com/s/WxwXPfThFEHjAE7hHyvwoA\" style=\"color: #58a6ff\">点击联系我们</a>!先提的优先实现！",
    }
]

export interface NoticeState {
	noticeInfo: NoticeInfo
}

const noticeInfo = computed(() => noticeStore.noticeInfo)


onMounted(() => {
	loadPopup()
})

async function loadPopup() {
	let res = await requestNoticeContent("login")
	if (res && res.isShow) {
		// const ck = encry(`lm${data.id}`)
		noticeInfo.value.title = res.title
		noticeInfo.value.content = res.content
		updateNoticeInfo(noticeInfo.value)
		show.value = true
	}
}

function updateNoticeInfo(options: Partial<NoticeInfo>) {
	noticeStore.updateNoticeInfo(options)
}

// 点击登录
const handleValidateButtonClick = async (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors: any) => {
    if (errors)
      return message.error(errors[0][0].message)
  })

  const { account, password } = model.value
  if (account && password) {
    const res = await doLogin({account:account,password:encry(password)})
		// 设置cookie，默认存活24小时
		setCookie('blueCat_token', res.id)
		router.push('/')
  }
}

const handleRegistBtnClick = async (e: MouseEvent) => {
  router.push('/regist')
}

type NInputThemeOverrides = NonNullable<NInput['themeOverrides']>
const nInputThemeOverrides: NInputThemeOverrides = {
    textColor: 'black',
    borderColor: 'black',
    placeholderColor: '#979793',
    hoverColor: 'black',
		border: '1px solid black'
}

// function validateAccount(account:string) {
//     if(!account){
//         return false
//     }
//     const phoneRegex = /^1[3456789]\d{9}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(account) || phoneRegex.test(account);;
// }
</script>

<template>
	<div class="messageBox">
		<scrollbar :sendVal="newsList"></scrollbar>
	</div>
  <div id="login-box">
		<PoPupDialogs v-if="show" v-model:visible="show" />
		<NForm ref="formRef" class="login-form" :model="model" label-placement="left" label-width="80" :rules="rules">
      <div class="login-title">
        蓝 猫 AI
      </div>
      <NFormItem label-style="color: black" path="account" label="账 号：">
        <NInput  :theme-overrides="nInputThemeOverrides"  v-model:value="model.account" :allow-input="(val) => { return !/[^A-Za-z0-9_@.]/g.test(val) }" maxlength="32" placeholder="请输入邮箱或者手机号" />
      </NFormItem>
      <NFormItem label-style="color: black" path="password" label="密    码：">
        <NInput  :theme-overrides="nInputThemeOverrides" v-model:value="model.password" placeholder="请输入密码" type="password" show-password-on="mousedown" maxlength="16" @keydown.enter.prevent />
      </NFormItem>
      <NButton class="login-btn" type="primary" @click="handleValidateButtonClick">
        登  录
      </NButton>
      <div class="login-linkBox">
        <span class="login-link" @click="handleRegistBtnClick">
          立即注册
        </span>
      </div>
    </NForm>
  </div>
</template>

<style scoped>
#login-box{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('@/assets/back.webp') no-repeat fixed;
    @media screen and (min-width: 720px) and (max-width: 1920px) {
        background-size: 100% 100%;
    }
}
.login-form{
	width: 25rem;
	height: 19rem;
	background-color: aliceblue;
	padding: 2rem;
	border-radius: 6px;
	background: #fff;
	padding: 25px 25px 5px 25px;
}
.login-title{
	margin-bottom: 1.5rem;
	text-align: center;
	font-size: 24px;
	font-weight: 800;
	color: darkcyan;
}
.login-btn{
	width: 100%;
	margin-top: 8px
}
.login-linkBox{
	float:right;
	margin-top: 10px;
}
.login-link{
	color: #337ab7;
	cursor: pointer;
}
.messageBox {
	width: 100%;
	overflow: hidden;
	background: black;
}
</style>
