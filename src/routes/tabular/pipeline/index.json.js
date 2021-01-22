import importData from './_mock/consume.js'
import prepareData from './_mock/prepare.js'
import transformData from './_mock/transform.js'
import buildData from './_mock/build.js'

// mock data for all the stages
const mock = [
  { data: importData, name: 'consume' },
  { data: prepareData, name: 'prepare' },
  { data: transformData, name: 'transform' },
  { data: buildData, name: 'build' },
]

// GET request to pull the mock data for stages
export function get(req, res, _) {
  // stage for which the data needs to be returned
  const { stage } = req.query
  // check ofr unwanted query params
  const onlyStage = Object.keys(req.query).length === 1
  // check whether stage is requested is valid
  const requestedStage = stage ? mock.find((s) => s.name === stage) : undefined
  // error message
  let errorMessage

  if (stage && requestedStage && onlyStage) {
    // successful request
    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.end(JSON.stringify(requestedStage.data))
  } else {
    //  reuest error
    if (!stage) {
      errorMessage = {
        message: '[ ?stage ] query param not found in the reuqest',
        stages: mock.map((s) => s.name),
      }
    } else if (!requestedStage) {
      errorMessage = {
        message: `[  stage = ${stage}  ] is not a valid stage`,
        stages: mock.map((s) => s.name),
      }
    } else if (!onlyStage) {
      errorMessage = {
        message: 'Unrecognized query params found',
        query: req.query,
      }
    } else {
      errorMessage = {
        message: 'Resource not found',
      }
    }

    // it will redirect to 404 error page
    res.writeHead(404, {
      'Content-Type': 'application/json',
    })
    res.end(JSON.stringify({ ...errorMessage, type: 'error' }))
  }
}
