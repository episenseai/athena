import sirv from 'sirv'
import compression from 'compression'
import * as sapper from '@sapper/server'
import process from 'process'
import express from 'express'
import morgan from 'morgan'

process.on('SIGINT', () => {
  console.info('Interrupted')
  process.exit(0)
})

const HOSTNAME = '0.0.0.0'
const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

const dev = NODE_ENV === 'development'

const app = express()

let logger

if (dev) {
  logger = morgan(':remote-addr | :date[iso] | :status | :method | :url')
} else {
  logger = morgan(':remote-addr | :date[iso] | :status | :method | :url | :user-agent')
}
app.use(logger)

app
  .use((req, res, next) => {
    req.data = ''
    res.locals = {}
    next()
  })
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req, res) => ({
        // session data goes here
        // title: `${req._data} - ${res.locals}`,
        req: Object.keys(req),
        res: Object.keys(res),
      }),
    })
  )

app.on('error', (err) => {
  console.error(`error:  ${err}`)
})

app.listen(PORT, HOSTNAME, () => {
  console.log(`Started athena frontend on http://${HOSTNAME}:${PORT}`)
})
