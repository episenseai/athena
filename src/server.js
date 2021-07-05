import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import { createServer } from 'http'
import process from 'process'

process.on('SIGINT', () => {
  console.info('Interrupted')
  process.exit(0)
})

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

polka()

const { handler } = polka() // You can also use Express
  .use((req, res, next) => {
    req.mydata = 'data'
    res.locals = { name: 'anon' }
    next()
  })
  .use((req, _res, next) => {
    req.user = { id: 0, name: 'anon' }
    next()
  })
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req, res) => ({
        // session data goes here
        title: `${req.mydata} - ${res.locals.name}`,
        req: Object.keys(req),
        res: Object.keys(res),
        user: req.user,
      }),
    })
  )

const server = createServer(handler)

server.on('error', (err) => {
  console.log(`error:  ${err}`)
})

server.listen(PORT, () => {})
