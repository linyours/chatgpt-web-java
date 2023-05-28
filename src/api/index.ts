
// 这是聊天页面的api 请求

import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'
import { useAuthStore, useSettingStore } from '@/store'
import {GPT3} from "@/api/ServiceTypeConstant";

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/chat',
    data: { prompt, options },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config',
  })
}

export function fetchChatAPIProcess<T = any>(
  params: {
  	serviceType:string,
		conversationId:string,
    prompt: string
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {
  const settingStore = useSettingStore()
  const authStore = useAuthStore()

  let data: Record<string, any> = {
		conversationId: params.conversationId,
		prompt: params.prompt,
    options: params.options,
		serviceType:params.serviceType,
  }

  if (authStore.isChatGPTAPI) {
    data = {
      ...data,
      systemMessage: settingStore.systemMessage,
      temperature: settingStore.temperature,
      top_p: settingStore.top_p,
    }
  }

  let serviceUrl = getUrlByServiceType(params.serviceType)

  return post<T>({
    url: serviceUrl,
    data,
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}


export function fetchPromptModelChatAPIProcess<T = any>(
	params: {
		modelId:string,
		content:string,
		options?: { conversationId?: string; parentMessageId?: string }
		signal?: GenericAbortSignal
		onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {

	let data: Record<string, any> = {
		modelId:params.modelId,
		content:params.content,
		serviceType: GPT3,
	}
	return post<T>({
		url: "/prompt/completion",
		data,
		signal: params.signal,
		onDownloadProgress: params.onDownloadProgress,
	})
}


function getUrlByServiceType(serviceType:string) {
	if(serviceType){
		switch (serviceType) {
			case '':
				return "";
		}
	}
	return '/chat/streamChatWithWeb/V2'
}



export function fetchSession<T>() {
  return post<T>({
    url: '/session',
  })
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: '/verify',
    data: { token },
  })
}

