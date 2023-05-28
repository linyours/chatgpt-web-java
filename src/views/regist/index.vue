<script setup lang='ts'>
import { ref } from 'vue'
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
import { doRegist } from '@/api/user'
import {scrollbar} from "@/components/common";

interface ModelType {
  password: string
  account: string
}

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

const handleValidateButtonClick = async (e: MouseEvent) => {
  e.preventDefault()
  const { account, password } = model.value
  formRef.value?.validate((errors: any) => {
    if (errors)
      return message.error(errors[0][0].message)
  })

  const res = await doRegist(account, encry(password))
	setCookie('blueCat_token', res.blueCat_token)
	message.success('注册成功')
	router.push('/')
}

function validateAccount(account: string) {
  if (!account)
    return false
  const phoneRegex = /^1[3456789]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(account) || phoneRegex.test(account);
}

type NInputThemeOverrides = NonNullable<NInput['themeOverrides']>
const nInputThemeOverrides: NInputThemeOverrides = {
    textColor: 'black',
    borderColor: 'black',
    placeholderColor: '#979793',
    hoverColor: 'black',
    border: '1px solid black'
}

const newsList =  [
    {
        name: "登录公告：",
        detail: "蓝猫AI助手全新上线！关注公众号【蓝猫AI三千问】即可享受ChatGPT带来的智能体验！" +
            "现在立马【注册账号】登录，优先免费体验最新功能！" +
            "有任何需求<a href=\"https://mp.weixin.qq.com/s/WxwXPfThFEHjAE7hHyvwoA\" style=\"color: #58a6ff\">点击联系我们</a>!先提的优先实现！",
    }
]

</script>

<template>
	<div class="messageBox">
		<scrollbar :sendVal="newsList"></scrollbar>
	</div>

  <div id="login-box">
    <NForm ref="formRef" class="login-form" :model="model" label-placement="left" label-width="80" :rules="rules">
      <div class="login-title">
        蓝 猫 AI 注 册
      </div>
      <NFormItem label-style="color: black" path="account" label="账  号：">
					<NInput :theme-overrides="nInputThemeOverrides" v-model:value="model.account" :allow-input="(val) => { return !/[^A-Za-z0-9_@.]/g.test(val) }" maxlength="32" placeholder="请输入邮箱或者手机号" />
      </NFormItem>
      <NFormItem label-style="color: black" path="password" label="密  码：">
        <NInput :theme-overrides="nInputThemeOverrides"  v-model:value="model.password" placeholder="请输入密码" maxLength = "16" type="password" show-password-on="mousedown" @keydown.enter.prevent />
      </NFormItem>
      <NButton class="login-btn" type="primary" @click="handleValidateButtonClick">
        注  册
      </NButton>
      <div class="login-linkBox">
        <span class="login-link" @click="() => { router.push('/login') }">
          返回登录页
        </span>
      </div>
    </NForm>
  </div>
</template>

<style>
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
