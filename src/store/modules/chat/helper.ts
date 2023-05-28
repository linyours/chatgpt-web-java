import { ss } from '@/utils/storage'
import VueCookies from "vue-cookies";
const LOCAL_NAME = 'chatStorage'


export function defaultState(): Chat.ChatState {
	let uuid = 1002
	if (VueCookies.get('blueCat_token')){

	}else{
		uuid = new Date().getTime()
	}
  return {
    active: uuid,
    usingContext: true,
    history: [{ uuid, title: 'New Chat', isEdit: false }],
    chat: [{ uuid, data: [] }],
  }
}

export function getLocalState(): Chat.ChatState {
  const localState = ss.get(LOCAL_NAME)
  return { ...defaultState(), ...localState }
}

export function setLocalState(state: Chat.ChatState) {
  ss.set(LOCAL_NAME, state)
}
