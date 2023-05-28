import { get, post, Response } from '@/utils/request'
import { PromptModelResp, PromptModel } from '@/typings/promptModel'

export function getAideList() {
	return get<Response<any>>({
		url: '/prompt/getPromptGroup',
	})
}