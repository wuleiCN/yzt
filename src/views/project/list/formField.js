export const Strategy = (function() {
  const DiscountMap = {
    projectNumber: function() { // 项目同步编号
      return ['HZBL', 'XINGHE', 'HZZJJ', 'ZJJH', 'GDJY', 'STZZ', 'DONGWAN', 'HENAN', 'GXGJT', 'WUHAN', 'SHAANXI', 'ZHENGZHOU', 'QINGNINGHUDONG', 'RENYUANSMZ', 'SHPDXM', 'TENHUI', 'DIANXIN', 'BEIJING', 'GDJM', 'ESSI', 'PENGJIANG', 'XINHUIQU', 'GDSDGX', 'GDSQYX', 'GDFS', 'GDHZBL']
    },
    engineeringCode: function() { // 工地同步编号
      return ['XMJF']
    },
    consIds: function() { // 对接的参建单位
      return ['GXGJT', 'EnPing', 'DIANXIN', 'BEIJING']
    },
    userName: function() { // 登录账号
      return ['AJD', 'HZBL', 'SCZIYANG', 'XINGHE', 'JIANGMEN', 'ZHUAN', 'ZHONGYEYUN', 'QINGNINGHUDONG', 'GDMEIZHOU', 'FJS', 'WANKE', 'STZZ', 'DONGWAN', 'ZJKG', 'XMJF', 'GXGJT', 'SHANXI', 'WUHAN', 'HAOFENG', 'TANGCAI', 'HAOFENGYS', 'ZHENGZHOU', 'QUANGUO', 'GUANGZHOUSW', 'GDQINGYUAN', 'LWSMZ', 'RENYUANSMZ', 'SHPDXM', 'TENHUI', 'EnPing', 'DIANXIN', 'ZHYJZ', 'BEIJING', 'GDJM', 'ESSI', 'PENGJIANG', 'XINHUIQU', 'GDSDGX', 'GDSQYX', 'GDFS', 'GDHZBL']
    },
    passWord: function() { // 登录密码
      return ['AJD', 'HZBL', 'SCZIYANG', 'XINGHE', 'JIANGMEN', 'ZHUAN', 'ZHONGYEYUN', 'QINGNINGHUDONG', 'GDMEIZHOU', 'FJS', 'WANKE', 'STZZ', 'DONGWAN', 'ZJKG', 'XMJF', 'GXGJT', 'SHANXI', 'WUHAN', 'HAOFENG', 'TANGCAI', 'HAOFENGYS', 'ZHENGZHOU', 'QUANGUO', 'GUANGZHOUSW', 'GDQINGYUAN', 'LWSMZ', 'RENYUANSMZ', 'SHPDXM', 'TENHUI', 'EnPing', 'DIANXIN', 'ZHYJZ', 'BEIJING', 'GDJM', 'ESSI', 'PENGJIANG', 'XINHUIQU', 'GDSDGX', 'GDSQYX', 'GDFS', 'GDHZBL']
    },
    apiKey: function() { // 授权账号 或 token
      return ['HZBL', 'ZHUAN', 'JIANGMEN', 'ZHONGYEYUN', 'GDMEIZHOU', 'FJS', 'ZJJH', 'STZZ', 'ZJKG', 'XMJF', 'GXGJT', 'SHANXI', 'WUHAN', 'ZHENGZHOU', 'HAOFENG', 'TANGCAI', 'HAOFENGYS', 'GDQINGYUAN', 'LWSMZ', 'SHPDXM', 'GDJM', 'GDFS']
    },
    apiSecret: function() { // 授权密钥
      return ['HZBL', 'ZHUAN', 'ZHONGYEYUN', 'ZJJH', 'WANKE', 'FJS', 'STZZ', 'DONGWAN', 'ZJKG', 'XMJF', 'GXGJT', 'WUHAN', 'ZHENGZHOU', 'HAOFENG', 'TANGCAI', 'HAOFENGYS', 'SHAANXI', 'GDJM', 'GDFS']
    },
    clientSerial: function() { // 设备序号 或 厂家识别码
      return ['HZBL', 'SCZIYANG', 'XINGHE', 'JIANGMEN', 'ZHUAN', 'QINGNINGHUDONG', 'GDMEIZHOU', 'ZJJH', 'WANKE', 'FJS', 'STZZ', 'DONGWAN', 'HENAN', 'ZJKG', 'XMJF', 'GXGJT', 'SHANXI', 'WUHAN', 'ZHENGZHOU', 'HAOFENG', 'TANGCAI', 'HAOFENGYS', 'QUANGUO', 'GUANGZHOUSW', 'GDQINGYUAN', 'LWSMZ', 'RENYUANSMZ', 'SHPDXM', 'TENHUI', 'EnPing', 'DIANXIN', 'ZHYJZ', 'BEIJING', 'ESSI', 'PENGJIANG', 'XINHUIQU', 'GDSDGX', 'GDSQYX', 'GDHZBL']
    }
  }

  return {
    fieldClac: function(discountType) {
      return DiscountMap[discountType] && DiscountMap[discountType]()
    }
  }
})()
