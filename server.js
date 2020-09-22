const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./src/assets/db.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 4001
server.use(middlewares)
server.use(router)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
})
