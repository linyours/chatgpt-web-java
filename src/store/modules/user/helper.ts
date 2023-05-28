import { ss } from '@/utils/storage'
import {UserInfo} from "@/typings/user";

const LOCAL_NAME = 'userStorage'

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: 'http://43.153.112.145:1002/icon.jpeg',
      username: '助手-BlueCat',
      // description: 'Star on <a href="https://github.com/Chanzhaoyu/chatgpt-bot" class="text-blue-500" target="_blank" >GitHub</a>',
			// description: '我是一个小AI助手！',
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
