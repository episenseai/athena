import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
// import { readFileSync } from 'fs'
//import { createServer } from 'https'
import { createServer } from 'http'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

//const key = readFileSync(process.env.KEY_FILE)
//const cert = readFileSync(process.env.CERT_FILE)
//const credentials = { key, cert }

polka()

const { handler } = polka() // You can also use Express
  .use((req, res, next) => {
    req.mydata = 'data'
    res.locals = { name: 'anon' }
    next()
  })
  .use((req, res, next) => {
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

//const server = createServer(credentials, handler)
const server = createServer(handler)

server.on('error', (err) => {
  console.log(`error:  ${err}`)
})

server.listen(PORT, () => {
  console.log(`┌─────────────────────────────────────────────────────────────────────┐`)
  console.log(`│ Running frontend for [[ carbon ]] on http://localhost:${PORT}          │`)
  console.log(`└─────────────────────────────────────────────────────────────────────┘`)
})
