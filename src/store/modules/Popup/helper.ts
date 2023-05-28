import { ss } from '@/utils/storage'

const LOCAL_NAME = 'noticeStorage'

export interface NoticeInfo {
  title: string
  content: string
}

export interface NoticeState {
  noticeInfo: NoticeInfo
}

export function defaultSetting(): NoticeState {
  return {
		noticeInfo: {
			title: '蓝猫一版公告',
			content: '女朋友生理周期来了，你还在说多喝热水吗？\n' +
				'\n' +
				'和女朋友吵架了，你还在为不知道怎么哄女朋友而郁闷吗？\n' +
				'\n' +
				'一年那么多节日，你还在为女朋友挑选什么礼物而苦恼吗？\n' +
				'\n' +
				'......\n' +
				'\n' +
				'没关系，以前林俊杰教你修炼爱情，现在AI来教你修炼爱情。' +
				'<strong>Hello, world!</strong><br><img src="https://picsum.photos/200/300" alt="图片">' +
				'<a href="https://www.baidu.com/">联系我们</a>',
      // description: 'Star on <a href="https://github.com/Chanzhaoyu/chatgpt-bot" class="text-blue-500" target="_blank" >GitHub</a>',
			// description: '我是一个小AI助手！',
    },
  }
}

export function getLocalState(): NoticeState {
  const localSetting: NoticeState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: NoticeState): void {
  ss.set(LOCAL_NAME, setting)
}
