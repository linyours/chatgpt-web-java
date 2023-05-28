import md5 from 'js-md5'

export default function encry(msg: string): string {
  return md5(msg)
}
