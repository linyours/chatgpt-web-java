import type { Router } from 'vue-router'
import VueCookies from 'vue-cookies'
import { useAuthStoreWithout } from '@/store/modules/auth'

// 路由白名单
const white_routers = ['/login', '/regist', '/404', '/500']

export function setupPageGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStoreWithout()
    if (!authStore.session) {
      try {
        // 获取cookie
        // const token = VueCookies.get('blueCat_token')
        // if (!white_routers.includes(to.path)) {
        //   if (!token)
        //     next({ name: 'Login' })
        // }
        next()
        // const data = await authStore.getSession()
        // if (String(data.auth) === 'false' && authStore.token)
        //   authStore.removeToken()
        // if (to.path === '/500')
        //   next({ name: 'Root' })
        // else
        //   next()
      }
      catch (error) {
        if (to.path !== '/500')
          next({ name: '500' })
        else
          next()
      }
    }
    else {
      next()
    }
  })
}
