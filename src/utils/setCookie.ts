// 写cookies
export function setCookie(name: string, value: string, expires = 3 * 60 * 60 * 1000) {
  expires = new Date(new Date().getTime() + expires)
  document.cookie = `${name}=${value};expires=${expires}`
}

// 读cookie
export function getCookie(name: string) {
  let arr = null
  // "(^| )"+name+"=([^;]*)(;|$)"
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  // eslint-disable-next-line no-cond-assign
  if (arr = document.cookie.match(reg))
    return arr[2]
  return null
}

// 删除cookies
export function delCookie(name: string)
{
  const exp = new Date(new Date().getTime() - 1)
  const cval = getCookie(name)
  if (cval)
    document.cookie = `${name}=${cval};expires=${exp}`
}
