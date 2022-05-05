/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-irregular-whitespace */
const dataConver = {
  add: (arg1, arg2) => {
    var r1, r2, m
    try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  },
  sub: (arg1, arg2) => {
    var r1, r2, m, n
    try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    n = (r1 >= r2) ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  },
  mul: (arg1, arg2) => {
    var c = 0
    var d = a.toString()
    var e = b.toString()
    try {
      c += d.split('.')[1].length
    } catch (f) {}
    try {
      c += e.split('.')[1].length
    } catch (f) {}
    return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
  },
  div: (arg1, arg2) => {
    var toFixed = (arg, n) => {
      if (n === 0) {
        return Math.round(arg)
      }
      try {
        var d, carryD
        var ds = arg.toString().split('.')
        var len = ds[1].length
        var b0 = ''
        var k = 0
        if (len > n) {
          while (k < n && ds[1].substring(0, ++k) === '0') {
            b0 += '0'
          }
          d = Number(ds[1].substring(0, n))
          carryD = Math.round(Number('0.' + ds[1].substring(n, len)))
          len = (d + carryD).toString().length
          if (len > n) {
            return Number(ds[0]) + 1
          } else if (len === n) {
            return Number(ds[0] + '.' + (d + carryD))
          }
          return Number(ds[0] + '.' + b0 + (d + carryD))
        }
      } catch (e) {
      }
      return arg
    }
    var d1, d2
    var n1 = Number(arg1.toString().replace('.', ''))
    var n2 = Number(arg2.toString().replace('.', ''))
    try { d1 = arg1.toString().split('.')[1].length } catch (e) { d1 = 0 }
    try { d2 = arg2.toString().split('.')[1].length } catch (e) { d2 = 0 }
    return toFixed((n1 / n2) * Math.pow(10, d2 - d1), 2)
  }
}

export default {
  dataConver
}
