
// 智慧工地=====================================
const ZHGD_STAGE_API = ['http://192.168.1.176/yzt-zhgd', 'http://192.168.1.176', 'ws://192.168.1.176/yzt-zhgd'] // 测试环境 192.168.1.200:8040/yzt-zhgd
const ZHGD_PRO_API = [
  '//' + window.location.hostname + '/yzt-zhgd',
  window.location.origin,
  (window.location.protocol === 'http:' ? 'ws://' : 'wss://') + window.location.hostname + '' + '/yzt-zhgd'
]

// 劳务平台=====================================
const STAGE_API = ['http://192.168.1.176/yzt-provider', 'http://192.168.1.176'] // 测试环境
const PRO_API = ['//' + window.location.hostname + '/yzt-provider', window.location.origin] // 线上环境
const CS_PRO_API = '//' + window.location.hostname + '/yzt-cs' // cs线上环境
const CS_DEV_API = 'http://192.168.1.176/yzt-cs' // cs测试环境

export function getConfig(env) {
  return {
    getEnvZhgdValue: env ? STAGE_API[0] : PRO_API[0], // 智慧工地整体接口变量
    soketEnvZhgdValue: env ? ZHGD_STAGE_API[2] : ZHGD_PRO_API[2], // 智慧工地soket地址
    getEnvValue: env ? STAGE_API[0] : PRO_API[0], // 劳务平台整体接口变量
    erweimaValue: env ? STAGE_API[1] : PRO_API[1], // 劳务平台考试二维码变量
    CsGetEnvValue: env ? CS_DEV_API : CS_PRO_API // cs端接口
  }
}
