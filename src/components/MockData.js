import { GET_DATA } from './tp/store'
export async function getStageData(stage) {
  const res = await fetch(`https://localhost:3000/tabular/pipeline.json?stage=${stage}`)

  const stageData = await res.json()
  GET_DATA.set({ ...stageData, status: res.status, stage: `${stage}:GET` })
}
