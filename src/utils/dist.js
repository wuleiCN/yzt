
/**
 * 获取项目状态
 */
function proTags() {
  return {
    0: '在建',
    1: '停工',
    2: '竣工'
  }
}
/**
 * 进入场状态
 */
function inOutTags() {
  return {
    0: '在场',
    1: '退场',
    2: '未同步'
  }
}
/**
 * 角色状态
 */
function roleTags() {
  return {
    0: '禁用',
    1: '启用'
  }
}
function winddirectiontoName() {
  return {
    '0': '北',
    '1': '北东北',
    '2': '东北',
    '3': '东东北',
    '4': '东',
    '5': '东东南',
    '6': '东南',
    '7': '南东南',
    '8': '南',
    '9': '南西南',
    '10': '西南',
    '11': '西西南',
    '12': '西',
    '13': '西西北',
    '14': '西北',
    '15': '北西北'
  }
}

export default {
  proTags,
  roleTags,
  winddirectiontoName,
  inOutTags
}
