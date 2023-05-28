<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
import {useRouter, useRoute} from "vue-router";
import {fetchPromptModelChatAPIProcess} from '@/api'
import {GPT3} from "@/api/ServiceTypeConstant";
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import {useBasicLayout} from '@/hooks/useBasicLayout'
import mila from 'markdown-it-link-attributes'
import mdKatex from '@traptitech/markdown-it-katex'
import {t} from '@/locales'

const router = useRouter()
const route = useRoute()
let obj = route.query
let searchQuestion = ref('')
const { uuid } = route.params as { uuid: string }
const toLogin = () => {
		router.push('/Login')
}
const {isMobile} = useBasicLayout()
const openLongReply = import.meta.env.VITE_GLOB_OPEN_LONG_REPLY === 'true'
let controller = new AbortController()
const htmlText = ref('')
const inversion = ref<boolean>(false)
const asRawText = ref(inversion)
const error = ref<boolean>(false)
const mdi = new MarkdownIt({
		html: false,
		linkify: true,
		highlight(code, language) {
				const validLang = !!(language && hljs.getLanguage(language))
				if (validLang) {
						const lang = language ?? ''
						return highlightBlock(hljs.highlight(code, {language: lang}).value, lang)
				}
				return highlightBlock(hljs.highlightAuto(code).value, '')
		},
})

mdi.use(mila, {attrs: {target: '_blank', rel: 'noopener'}})
mdi.use(mdKatex, {blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000'})

const wrapClass = computed(() => {
		return [
				'text-wrap',
				'min-w-[20px]',
				'rounded-md',
				isMobile.value ? 'p-2' : 'px-3 py-2',
				inversion.value ? 'bg-[#d2f9d1]' : 'bg-[#f4f6f8]',
				inversion.value ? 'dark:bg-[#a1dc95]' : 'dark:bg-[#1e1e20]',
				inversion.value ? 'message-request' : 'message-reply',
				{'text-red-500': error.value},
		]
})

function highlightBlock(str: string, lang?: string) {
		return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
}

const loading = ref(false)

const submit = async () => {
		if (loading.value || !searchQuestion.value) {
				return
		}
		htmlText.value = ''
		let lastText = ''
		let text = ''
		let message = searchQuestion.value
    controller = new AbortController()
		loading.value = true
    let options: Chat.ConversationRequest = {}
		try {
        const fetchChatAPIOnce = async () => {
        await fetchPromptModelChatAPIProcess<Chat.ConversationResponse>({
            content: message,
            modelId: obj.id,
            options,
            signal: controller.signal,
            onDownloadProgress: ({event}) => {
                const xhr = event.target
                const {responseText} = xhr
                try {
                    const data = responseText
                    text = lastText + data
                    htmlText.value = changeText(text)

                    let container = document.getElementById('container');
                    container.scrollTop += 10
                    if (openLongReply && data.detail.choices[0].finish_reason === 'length') {
                        lastText = data.text
                        message = ''
                        return fetchChatAPIOnce()
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        })
     }
        await fetchChatAPIOnce()
    }catch (error: any) {
        if (error.message === 'canceled') {
            loading.value = false
        }
    }
		finally {
        loading.value = false
    }
}

function changeText(text: string) {
		const value = text ?? ''
		if (!asRawText.value){
				return mdi.render(value)
		}
		return value
}

</script>
<template>
	<div id="__next">
		<main>
			<div class="flex h-screen w-screen flex-col overflow-hidden bg-slate-50 text-black">
				<nav class="sticky top-0 left-0 z-10 w-full flex-none border-b border-slate-900/10 bg-white/80 backdrop-blur">
					<div class="max-w-8xl mx-auto">
						<div class="py-2 px-4">
							<div class="relative flex h-10 items-center">
								<a class="font-semibold text-black" href="/" style="display: flex; align-items: center;">
									<img src="@/assets/avatar.jpg" width="140" height="40" style="height: 3rem; width: 3rem" alt="icon"/>
									<span style="font-size: 1.5rem;color: rgb(77,78,81); letter-spacing: 0.2rem; margin-left: 1rem;"> 蓝猫AI助手 </span>
								</a>
								<div class="ml-auto flex">
									<button @click="toLogin" type="submit"
													class="rounded-lg px-4 py-2 text-base font-semibold disabled:cursor-not-allowed outline-none bg-black text-white plausible-event-name=LoginTrigger">
										登录/注册
									</button>
								</div>
							</div>
						</div>
					</div>
				</nav>
				<div class="relative flex min-h-full w-screen">
					<!-- <div
							class="absolute left-0 z-10 h-screen overflow-scroll bg-white md:static md:transition-all xl:absolute xl:top-0 w-0 md:-translate-x-full">
							<div class="sticky top-0 left-0 flex justify-between bg-white/80 py-4 backdrop-blur">
									<div>
											<div class="text-xs text-gray-400">写方案小助手🆕</div>
											<div class="text-xl font-semibold">历史记录</div>
									</div><button
											class="inline-flex h-10 w-10 appearance-none items-center justify-center rounded-full bg-gray-100 text-black focus:outline-none"
											aria-label="Close"><svg width="25" height="25" viewBox="0 0 15 15" fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
															d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
															fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
											</svg></button>
							</div>
							<div class="mt-2 text-gray-400">暂无历史记录</div>
					</div> -->
					<div
						class="container mx-auto h-screen flex-1 overflow-y-scroll pb-10 pt-4 transition-all xl:absolute xl:right-0 xl:pr-[400px]">
						<div class="mx-auto flex w-11/12 max-w-[600px] flex-col gap-y-2 py-4 sm:w-4/5">
							<div class="flex justify-between"><a class="w-24" @click="()=>{router.push('/aide')}">
								<div
									class="flex w-24 flex-row items-center rounded-lg bg-gray-200 py-2 pl-2 text-sm">
									<svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
											fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
									</svg>
									<div class="-ml-[4px]">返回列表</div>
								</div>
							</a>
								<!-- <button class="rounded-lg bg-gray-200 p-2 px-4 text-sm ">历史记录(付费开通)</button> -->
							</div>
							<h2 class="mt-4 flex items-center text-xl font-semibold"><span class="mr-2">{{ obj.title }}</span>
							</h2><span class="text-sm text-gray-500">{{ obj.introduce }}</span>
							<div class="mt-5 flex flex-col gap-y-2 rounded-xl bg-white p-4 ring-1 ring-slate-900/10">
								<div class="flex w-full flex-col gap-y-4">
																<textarea  :placeholder="obj.demo" v-model="searchQuestion"
																					class="w-full resize-none appearance-none rounded-lg p-4 ring-1 ring-slate-900/10 focus:ring-2 focus:ring-black">
																</textarea>
									<div class="flex items-center">
										<!-- <button type="button" role="checkbox"
												aria-checked="false" data-state="unchecked" data-disabled="" disabled=""
												value="on" class="h-[18px] w-[18px] appearance-none rounded bg-[#F0F0F0]"
												id="batch-generate"></button><input type="checkbox" aria-hidden="true"
												disabled=""
												style="transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0"
												tabindex="-1" value="on" />
										<label class="ml-2 text-sm text-gray-500" for="batch-generate">批量生成<span>
												（<a class="text-black underline"
														href="/payment">付费开通</a>）
												</span>
										</label> -->
									</div>
									<button type="submit"
													@click="submit"
													class="rounded-lg  px-4 py-2 text-base font-semibold disabled:cursor-not-allowed outline-none bg-black text-white plausible-event-name=Generate">
										<div class="flex items-center justify-center gap-x-1">提交</div>
									</button>
								</div>
								<div dir="ltr" data-orientation="horizontal" class="flex flex-col gap-y-2">
									<div data-state="active" data-orientation="horizontal" role="tabpanel"
											 aria-labelledby="radix-:R19aiqm:-trigger-0" id="radix-:R19aiqm:-content-0"
											 tabindex="0" style="animation-duration:0s">
									</div>
								</div>
							</div>
							<!--													<div  style="width: 600px;height: 300px;border: 2px solid black;overflow: auto;">-->
							<!--														-->
							<!--													</div>-->
							<div class="text-black" style="font-size: 16px;" :class="wrapClass">
								<div ref="textRef" class="leading-relaxed break-words" >
									<div id="container" v-if="!inversion">
										<div v-if="!asRawText" class="markdown-body" v-html="htmlText"/>
										<div v-else class="whitespace-pre-wrap" v-text="htmlText"/>
									</div>
									<div v-else class="whitespace-pre-wrap" v-text="htmlText"/>
									<template v-if="loading">
										<span class="dark:text-white w-[4px] h-[20px] block animate-blink"/>
									</template>
								</div>
							</div>
							<div class="mt-5 mx-auto cursor-pointer text-center text-sm text-gray-500" type="button"
									 aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:Rbaiqm:"
									 data-state="closed">关注公众号，第一时间了解更多玩法及更新
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<style scoped>

</style>
