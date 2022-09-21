const express = require('express')
const path = require('path')
console.log(path.resolve(__dirname))
const app = express()
app.listen(7777,() => {
  console.log('7777服务启动成功')
})
// 使用中间件
const zhong = (req, res, next) => {
  console.log('中间件',req.body,req.query)
  next()
}
app.use(zhong)
app.use('/public',express.static(path.resolve(__dirname,'public')))
// 通过express.json() 全局中间件解析表单中JSON数据
app.use(express.json())
// 通过express.urlencoded() 中间件来解析表单中的 url-encoded 格式的数据。
app.use(express.urlencoded( { extended: false} ))

// get请求
app.get('/test',(req,res) => {
  console.log(req.query)
  res.send({name:'123'})
})
// post请求
app.post('/posttest',(req, res) => {
  console.log(req.body)
  res.send({age:122})
})