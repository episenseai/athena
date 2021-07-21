import { variables } from '$lib/env'

// BACKEND SERVICE
// `node replace` plugin replaces the value of `process.env.BACKEND_SERVER` with the one
// provided in `rollup.config.js` file.
const BACKEND = variables.BACKEND_SERVER

//  TABULAR SERVICE
const TABULAR = `${BACKEND}/tab/v1`

// Authentication
const OAUTH2_BACKEND = variables.OAUTH2_BACKEND

export const OAUTH2_LOGIN_SERVICE = (provider, ustate) =>
  encodeURI(`${OAUTH2_BACKEND}/login?p=${provider}&ustate=${ustate}`)

export const OAUTH2_AUTH_CALLBACK_SERVICE = (code, state, scope = undefined) => {
  let url = `${OAUTH2_BACKEND}/auth?code=${code}&state=${state}`
  if (scope && Object.prototype.toString.call(code) === '[object String]') {
    url = `${url}&scope=${scope}`
  }
  return encodeURI(url)
}

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// file uploads (include file_name)
// POST ${BACKEND}/uploads?userid=26r276re25r52456
// request:
//      Content-Type: multipart/form-data;
// response: 201 OK
//      {
//          success: true,
//          info: "file created",
//          version: "v1",
//          data: {}
//      }
// response: 400 Bad Request => if the userid does match the one that is logged in
//      { succuess: false, info: "error message" }
// response: 500 Internal Server Error => Something bad happened while uploading
//      {
//          success: false,
//          info: "error during file upload"
//          version: "v1",
//      }
export const FILE_UPLOAD_SERVICE = (userid) => encodeURI(`${BACKEND}/uploads?userid=${userid}`)

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// get a list of uploaded files for the user
// GET ${BACKEND}/uploads?userid=26r276re25r52456
// response: 200 OK
//      {
//          success: true,
//          info: "list of uploaded files"
//          version: "v1",
//          data: [ {filepath: "uniquefile path", filename: filename, timestamp: "upload time"}, ... ]
//      }
// response: 400 Bad Request => if the userid does not match the one that is logged in
//      { succuess: false, info: "error message", version: "v1" }
export const FILE_LIST_SERVICE = (userid) => encodeURI(`${BACKEND}/uploads?userid=${userid}`)

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// create a new project
// POST ${BACKEND}/tab/v1/projects?userid=26r276re25r52456
// request:
//      { projectname: projectname, projectdesc: projectdesc }
// response: 201 OK
//      {
//          success: true,
//          info: "project created",
//          version: "v1",
//          data: { projectid: projectid, projectname: projectname }
//      }
// response: 400 Bad Request => if the userid does match the one that is logged in
//      { succuess: false, info: "error message", version: "v1" }
export const TAB_CREATE_PROJECTS_SERVICE = (userid) =>
  encodeURI(`${TABULAR}/projects?userid=${userid}`)

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// change to a different project
// POST ${BACKEND}/tab/v1/projects/current?userid=26r276re25r52456
// request:
//      {}
// response: 200 OK
//      {
//          success: true,
//          info: "project set",
//          version: "v1",
//          data: { id: id,
//                  name: name,
//                  timestamp: ,
//                  current_stage: ,
//                  pipe_status: ,
//                  error_type: ,
//                  error_stack: ,
//          }
// response: 400 Bad Request
//      { succuess: false, info: "error message", version: "v1" }
export const TAB_SET_PROJECT_SERVICE = (userid, projectid) =>
  encodeURI(`${TABULAR}/projects/current?userid=${userid}&projectid=${projectid}`)

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// get all the projects for a particlar user
// GET ${BACKEND}/tab/v1/projects?userid=26r276re25r52456
// response: 200 OK
//      {
//          success: true,
//          info: "project created",
//          version: "v1",
//          data: [ { projectid: projectid, projectname: projectname, created: date }, ... ]
//      }
// response: 400 Bad Request
//      { succuess: false, info: "error message", version: "v1" }
export const TAB_PROJECTS_LIST_SERVICE = (userid) =>
  encodeURI(`${TABULAR}/projects?userid=${userid}`)

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// get the data for the current pipeline stage
// POST ${BACKEND}/tab/v1/pipe/current?userid=26r276re25r52456&projectid=d267gd27f726fd
// request { current_stage:  "consume:GET" }
// response: 200 OK
//      {
//          success: true,
//          info: "pipeline stage data",
//          version: "v1",
//          data:
//              {
//                  stage: "prepare:GET",
//                  data: { stagedata... }
//              }
//      }
// response: 400 Bad Request
//      { succuess: false, info: "error message", version: "v1" }
export const TAB_PIPE_GET_SERVICE = (userid, projectid) =>
  encodeURI(`${TABULAR}/pipe/current?userid=${userid}&projectid=${projectid}`)

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// post data for the next pipeline stage
// POST ${BACKEND}/tab/v1/pipe/next?userid=26r276re25r52456&projectid=d267gd27f726fd
// request:
//      { current_stage: "prepare:GET", next_stage: "prepare:POST", data: {  stage: "prepare:POST",
//                                                                           data:  {stagedata...} }
//      }
// response: 200 OK
//      {
//          success: true,
//          info: "pipeline processing job added",
//          version: "v1",
//          data: { id: id,
//                  name: name,
//                  timestamp: ,
//                  current_stage: ,
//                  pipe_status: ,
//                  error_type: ,
//                  error_stack: ,
//          }
//      }
// response: 400 Bad Request
//      { succuess: false, info: "error message", version: "v1" }
export const TAB_PIPE_POST_SERVICE = (userid, projectid) =>
  encodeURI(`${TABULAR}/pipe/next?userid=${userid}&projectid=${projectid}`)

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// revert to a previous pipeline stage
// POST ${BACKEND}/tab/v1/pipe/revert?userid=26r276re25r52456&projectid=d267gd27f726fd
// request:
//      { from: 'transform:POST', to: 'prpeare:GET' }
// response: 201 OK
//      {
//          success: true,
//          info: "reverting pipeline stage",
//          version: "v1",
//          data: { id: id,
//                  name: name,
//                  timestamp: ,
//                  current_stage: ,
//                  pipe_status: ,
//                  error_type: ,
//                  error_stack: ,
//          }
//      }
// response: 400 Bad Request
//      { succuess: false, info: "error message", version: "v1" }
//          ex. if not (to < from)
//              or any other type of malformed request
//          can only revert to a GET stage
export const TAB_REVERT_STAGE_SERVICE = (userid, projectid) =>
  encodeURI(`${TABULAR}/pipe/revert?userid=${userid}&projectid=${projectid}`)

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// unfreeze the pipeline after to retry after pipeline error
// POST ${BACKEND}/tab/v1/pipe/unfreeze?userid=26r276re25r52456&projectid=d267gd27f726fd
// request:
//      {}
// response: 200 OK
//      {
//          success: true,
//          info: "unfreezed pipeline",
//          version: "v1",
//          data: { id: id,
//                  name: name,
//                  timestamp: ,
//                  current_stage: ,
//                  pipe_status: ,
//                  error_type: ,
//                  error_stack: ,
//          }
//      }
// response: 400 Bad Request
//      { succuess: false, info: "error message", version: "v1" }
//          ex. pipe was never frozen to begin with
//              or any other type of malformed request
export const TAB_UNFREEZE_PIPE_SERVICE = (userid, projectid) =>
  encodeURI(`${TABULAR}/pipe/unfreeze?userid=${userid}&projectid=${projectid}`)

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// submit model build jobs for processing when at stage finalconfig:GET
// POST ${BACKEND}/tab/v1/models/build?userid=26r276re25r52456&projectid=d267gd27f726fd
// response: 200 OK
//      {
//          success: true,
//          info: "started model building",
//          version: "v1",
//          data: { id: id,
//                  name: name,
//                  timestamp: ,
//                  current_stage: ,
//                  pipe_status: 1,
//                  error_type: ,
//                  error_stack: ,
//          }
// response: 400 Bad Request
//      { succuess: false, info: "error message", version: "v1" }
export const TAB_MODEL_BUILD_SERVICE = (userid, projectid) =>
  encodeURI(`${TABULAR}/models/build?userid=${userid}&projectid=${projectid}`)

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// submit model build jobs for processing when at stage finalconfig:GET
// POST ${BACKEND}/tab/v1/models/build?userid=26r276re25r52456&projectid=d267gd27f726fd
// request { modelid: modelid }
// response: 200 OK
//      {
//          success: true,
//          info: "started model building",
//          version: "v1",
//          data: {}
// response: 400 Bad Request
//      { succuess: false, info: "error message", version: "v1" }
// response: 500 Server Error
//      { succuess: false, info: "error message", version: "v1" }
export const TAB_MODEL_CANCEL_SERVICE = (userid, projectid) =>
  encodeURI(`${TABULAR}/models/cancel?userid=${userid}&projectid=${projectid}`)

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// list all the models for a particlar project
// GET ${BACKEND}/tab/v1/models/?userid=26r276re25r52456&projectid=d267gd27f726fd
// response: 200 OK
//      {
//          success: true,
//          info: "list of models",
//          version: "v1",
//          data:
//              {
//                .. mock data
//              }
//      }
// response: 400 Bad Request
//      { succuess: false, info: "error message", version: "v1" }
export const TAB_ALL_MODELS_SERVICE = (userid, projectid) =>
  encodeURI(`${TABULAR}/models?userid=${userid}&projectid=${projectid}`)

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// list all the models for a particlar project
// POST ${BACKEND}/tab/v1/models/?userid=26r276re25r52456&projectid=d267gd27f726fd
// request { modelid: modelid }
// response: 200 OK
//      {
//          success: true,
//          info: "list of models",
//          version: "v1",
//          data:
//              {
//                .. mock data
//              }
//      }
// response: 400 Bad Request
//      { succuess: false, info: "error message", version: "v1" }
export const TAB_MODELS_SERVICE = (userid, projectid) =>
  encodeURI(`${TABULAR}/models?userid=${userid}&projectid=${projectid}`)

// GET request
export const GET_SSE_TOKEN_SERVICE = (userid, projectid) =>
  encodeURI(`${BACKEND}/sse/token?userid=${userid}&projectid=${projectid}`)

export const SSE_UPDATE_SERVICE = (userid, projectid, token) =>
  encodeURI(`${BACKEND}/sse/events?userid=${userid}&projectid=${projectid}&token=${token}`)

export const SSE_MODELS_UPDATE_SERVICE = (userid, projectid, token) =>
  encodeURI(`${BACKEND}/sse/events/models?userid=${userid}&projectid=${projectid}&token=${token}`)
