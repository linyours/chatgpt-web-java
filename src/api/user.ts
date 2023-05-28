import { post,get } from '@/utils/request'
import {UserInfo,ModelType} from "@/typings/user";

export function doLogin<UserInfo>(params:ModelType) {
	return post<UserInfo>({
		url: '/userInfo/login',
		data: params,
	})
}

export function doRegist<T>(account: string, password: string) {
	return post<T>({
		url: '/userInfo/register',
		data: { account, password },
	})
}

/**
 * 获取用户登录信息
 */
export function getUserInfo<UserInfo>() {
	return get<UserInfo>({
		url:'/userInfo/info'
	})

}
