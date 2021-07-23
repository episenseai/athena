<script>
  import ExcelPreview from './consume/ExcelPreview.svelte'
  import Menu from '../base/Menu.svelte'
  import { fetch_upload_POST, fetch_json_GET } from '../../api/fetch'
  import { FILE_UPLOAD_SERVICE, FILE_LIST_SERVICE } from '../../api/endpoints'
  import { snack } from '$lib/base/snack'
  import { GET_DATA, POST_DATA, PROJECT } from './store.js'
  import { LOGIN } from '../auth/store'
  import { onMount, createEventDispatcher } from 'svelte'
  import { get } from 'svelte/store'
  import PipeWait from './PipeWait.svelte'

  const dispatch = createEventDispatcher()

  //  POST data
  async function prepare_post() {
    if (get(PROJECT).current_stage !== 'consume:GET') {
      await snack(
        'warning',
        `Currently processing data for the ${get(PROJECT)
          .current_stage.split(':')[0]
          .toUpperCase()} stage. Can not move to the prepare stage.`,
      )
      return
    }
    // miminal configuration complete
    if (selected) {
      let item = items.find(({ value }) => value === selected)
      // eslint-disable-next-line
      $POST_DATA = {
        stage: 'consume:POST',
        data: { filepath: item.value, filename: item.name, timestamp: item.desc },
      }
      dispatch('postdata', {
        current_stage: 'consume:GET',
        next_stage: 'consume:POST',
      })
      // issue a POST request to the server
      // on success set PROJECT = POST
    } else {
      await snack('warning', 'select a file to proceed')
    }
  }

  let files
  let file
  // max file size limit 1GB = 1073741824 bytes
  let maxFileSze = 1024 * 1024 * 2000 // 100MB
  let maxfileSizeReached = false

  // convert raw bytes to human readable format
  function formatBytes(bytes) {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    let i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(2)}  ${sizes[i]}`
  }

  /* let buffersize = 1048576 * 5 // 1 MB * 5 = 5 */
  let start = 0
  let end = 1024 * 30 // 50KB

  let content = ''

  function readContent() {
    file = files[0]
    maxfileSizeReached = file.size > maxFileSze
    if (!maxfileSizeReached) {
      let temp = file.slice(start, end)
      let reader = new FileReader()
      //reader.onprogress = event => console.log(`${event.type}: ${event.loaded} bytes transferred\n`)
      reader.onload = () => {
        content = reader.result.split('\n').slice(0, -1).join('\n')
      }
      reader.readAsText(temp)
    }
  }

  // bound to the file input dom element
  let uploadfiles
  let file_node
  let disabled = false
  async function upload() {
    window.dispatchEvent(new Event('pgbaron'))
    disabled = true
    const formData = new FormData()
    formData.append('filename', uploadfiles[0].name)
    formData.append('file', uploadfiles[0])
    await snack('info', `Trying to upload (${uploadfiles[0].name}) for processing...`)
    const response = await fetch_upload_POST(
      FILE_UPLOAD_SERVICE(get(LOGIN).userid),
      formData,
      'FILE UPLOAD',
    )
    disabled = false
    // server error
    if (!response) return

    if (response.json.success) {
      // account created
      await snack('success', response.json.info)
      // eslint-disable-next-line
      uploadfiles = null
      file_node.value = null
      await get_uploads()
      if (items.length > 0) selected = items[0].value
      //console.log(response.json.data)
    } else {
      // error in upload
      await snack('warning', response.json.info)
      // console.log(response.json.data)
    }
    window.dispatchEvent(new Event('pgbaroff'))
  }

  const datestr = (timestamp) => {
    try {
      return new Date(Date.parse(timestamp))
    } catch (err) {
      return timestamp
    }
  }

  async function get_uploads() {
    const response = await fetch_json_GET(FILE_LIST_SERVICE(get(LOGIN).userid), 'GET UPLOADS')
    items = response.json.data.map((p) => ({
      value: p.filepath,
      name: p.filename,
      desc: datestr(p.timestamp),
    }))
  }
  let getting_uploads = true
  onMount(async () => {
    if (get(PROJECT).current_stage === 'consume:GET') {
      await PROJECT.get_pipe({ current_stage: 'consume:GET' })
      await get_uploads()
      getting_uploads = false
    }
  })

  $: if (files) readContent()

  // file select menu
  let open = false
  let selected
  let items = []
</script>

<button on:click={prepare_post} class="nextstage-btn">
  <span class="logo-global">&#9654;</span>
  Build current stage
</button>
{#if $PROJECT && $PROJECT.current_stage === 'consume:GET' && $GET_DATA.stage === 'consume:GET'}
  <div class="import-stage">
    <div>
      <h4>Compressed CSV data file</h4>
      <div class="btns">
        <label class="btn">
          Select
          {uploadfiles ? 'another' : 'a'}
          file for upload (.zip)
          <input
            {disabled}
            type="file"
            bind:files={uploadfiles}
            bind:this={file_node}
            accept="application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip,
            .zip"
          />
        </label>
        {#if uploadfiles}<span>✔</span>{/if}
      </div>
      {#if uploadfiles && uploadfiles.length > 0}
        <div class="file-info">
          <h3>File info:</h3>
          <p>FileName: {uploadfiles[0].name}</p>
          <p>Size: {formatBytes(uploadfiles[0].size)}</p>
          <p>LastModified: {new Date(uploadfiles[0].lastModified)}</p>
        </div>
        <button {disabled} class="upload" on:click={upload}>
          <span class="logo-global">↑</span>
          Upload the selected file
        </button>
      {/if}

      <h4 class="preview-sec">Preview CSV files</h4>

      <div class="btns">
        <label class="btn">
          Select
          {file ? 'another' : 'a'}
          file for preview (.csv)
          <input {disabled} type="file" bind:files accept="text/csv, .csv" />
        </label>
        {#if file}<span>✔</span>{/if}
      </div>
      {#if file}
        <div class="file-info">
          <h3>File info:</h3>
          <p>FileName: {file.name}</p>
          <p>Size: {formatBytes(file.size)}</p>
          <p>LastModified: {new Date(file.lastModified)}</p>
        </div>
      {/if}

      {#if file && maxfileSizeReached}
        <div class="preview-error">
          <h3>Can not generate Preview</h3>
          <p>
            Max preview file size limit of
            {formatBytes(maxFileSze)}
            reached. You can still upload and process the data.
          </p>
        </div>
      {/if}
    </div>
    <div>
      <h4>Select a previously uploaded file from the list.</h4>
      <div class="filemenu">
        <Menu bind:open bind:selected {items} width="400" color="blue" />
      </div>

      <p class="note">
        INFO: Try reloding the page if the uploaded file does not appear in the list.
      </p>
    </div>
  </div>
  {#if file && content}
    <ExcelPreview rawCSV={content} />
  {/if}
{:else if $PROJECT && $PROJECT.current_stage === 'consume:POST'}
  <PipeWait />
{/if}

<style>
  label * {
    pointer-events: none;
  }
  .file-info {
    margin: 0.8em 0 0.4em;
    padding-left: 16px;
    border-left: 10px solid rgba(0, 0, 0, 0.3);
  }
  .file-info p {
    margin-bottom: 0px;
  }
  .import-stage {
    margin: 60px auto 0;
    width: 900px;
    display: flex;
    justify-content: space-around;
  }
  .import-stage > div {
    flex-basis: 200px;
    flex-grow: 1;
  }
  .import-stage > div:last-of-type {
    flex-basis: 150px;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    margin-left: 10px;
    padding-left: 10px;
  }
  .btn {
    display: inline-grid;
    width: 350px;
    border: var(--medium-border);
  }
  .preview-error {
    margin-bottom: 10px;
  }
  .preview-error * {
    color: var(--red);
  }
  .btns {
    margin-top: 10px;
  }
  .upload {
    display: inline-block;
    min-width: 350px;
    padding: 7px;
    overflow: hidden;
    background-color: var(--light3);
  }
  .btn:hover,
  .upload:hover {
    background-color: #fafafa;
    border-color: var(--blue);
  }
  .btns span {
    color: var(--teal);
    margin-left: 10px;
  }
  .preview-sec {
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
  .filemenu {
    margin-top: 10px;
  }
  .note {
    margin-top: 20px;
    color: var(--text-lighter);
  }
</style>
