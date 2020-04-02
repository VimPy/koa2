const Koa = require('koa')
const app = new Koa() // 创建一个Koa对象表示web app本身
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

/**
 * 1.ctx:由koa传入的封装了request和response的变量,可以通过它访问request和response
 * 2.next:next是koa传入的将要处理的下一个异步函数
 * 3.调用await next()的原因:
 * koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用await next()来调用下一个async函数。
 * 把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。
 * 4.调用app.use()的顺序决定了middleware的顺序
 * 5.如果一个middleware没有调用await next()，则后续的middleware将不再执行
 */
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next() // 用await首先处理下一个异步函数,即调用下一个middleware
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`) // 打印请求方法 请求url 耗费时间.ctx.url相当于ctx.request.url
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
