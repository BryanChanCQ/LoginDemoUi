export const toMapValue = (keys, map) => {
  const vals = []
  keys.forEach(element => {
    vals.push(map[element])
  })
  return vals
}

export const toMapKey = (vals, map) => {
  const keys = []
  vals.forEach(element => {
    for (var p in map) {
      if (map[p] === element) {
        keys.push(p)
      }
    }
  })
  return keys
}

const isPoneAvailable = (str) => {
  var telreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!telreg.test(str)) {
    return false
  }
  return true
}

export const validateMobile = (rule, value, callback) => {
  if (value !== undefined && value !== '' && !isPoneAvailable(value)) {
    callback(new Error('手机号码格式不正确'))
  } else {
    callback()
  }
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    const str = o[k] + ''
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
