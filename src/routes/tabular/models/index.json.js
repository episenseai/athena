import data0 from './_mock/mockdata.js'
import data1 from './_mock/multimockdata.js'
import data2 from './_mock/regressiondata.js'

export function get(req, res, next) {
  // successful request
  res.writeHead(200, {
    'Content-Type': 'application/json',
  })
  res.end(JSON.stringify(data2))
}
