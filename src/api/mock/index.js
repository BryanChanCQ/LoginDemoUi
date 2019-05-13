// 引入当前目录下的所有mockjs（**_.js）
const r = require.context('./', true, /^\.\/.+_\.js$/)
r.keys().forEach(key => {
  r(key)
})
