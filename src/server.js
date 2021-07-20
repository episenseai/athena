import * as sapper from '@sapper/server'
import compression from 'compression'
import express from 'express'
import morgan from 'morgan'
import process from 'process'
import sirv from 'sirv'

process.on('SIGINT', () => {
  console.info('Interrupted')
  process.exit(0)
})

const HOSTNAME = '0.0.0.0'
const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

const dev = NODE_ENV === 'development'

const app = express()

// emit date in local timezone
morgan.token('date', () => {
  let p = new Date()
    .toString()
    .replace(/[A-Z]{3}\+/, '+')
    .split(/ /)
  return p[2] + '/' + p[1] + '/' + p[3] + ':' + p[4] + ' ' + p[5]
})

let logger

if (dev) {
  logger = morgan('[:date[clf]] | :status | :method | :url | :remote-addr')
} else {
  logger = morgan('[:date[clf]] | :status | :method | :url | :remote-addr | :user-agent')
}

app.use(logger)

app.use(
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sapper.middleware({
    session: (_req, _res) => ({
      // session data goes here
      // title: `${req._data} - ${res.locals}`,
    }),
  }),
)

app.on('error', (err) => {
  console.error(`error:  ${err}`)
})

app.listen(PORT, HOSTNAME, () => {
  console.log(`Serving athena frontend @ http://${HOSTNAME}:${PORT}`)
})
