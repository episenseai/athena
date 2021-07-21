<script>
  let files
  let file
  let div
  $: if (files) file = files[0]

  const dragExit = () => div.classList.add('enter')
  // $: if (div) console.log(div)
</script>

<main>
  <div
    bind:this={div}
    class="drag enter"
    on:dragenter|stopPropagation|preventDefault={() => div.classList.remove('enter')}
    on:dragover|stopPropagation|preventDefault
    on:dragend|stopPropagation|preventDefault={dragExit}
    on:drop|stopPropagation|preventDefault={(e) => {
      dragExit()
      if (e.dataTransfer.files[0].type.match('^text/csv')) files = e.dataTransfer.files
    }}
  >
    <p>Drag and Drop {file ? 'another' : 'a'} File</p>
  </div>
  <h4>or</h4>
  <div class="btns">
    <label class="btn">
      Select
      {file ? 'another' : 'a'}
      File
      <input type="file" bind:files accept="text/csv, .csv" />
    </label>
    {#if file}<span>✔</span>{/if}
  </div>
  {#if file}<button class="upload">↑ Upload {file.name}</button>{/if}
</main>

<style>
  main {
    width: 700px;
    margin: 30px auto;
  }
  .drag {
    width: 100%;
    height: 100px;
    border: 1px solid var(--text-light);
    border-radius: 2px;
    text-align: center;
    background: var(--light2);
  }
  .drag.enter {
    border-style: dashed;
    background: var(--light5);
  }
  .drag p {
    top: 40%;
    width: 200px;
    margin: auto;
    position: relative;
    font-size: 1.1em;
    color: var(--text-light);
  }
  .btns {
    margin-bottom: 20px;
  }
  .btn {
    display: inline-grid;
    width: 270px;
    background-color: var(--light6);
  }
  .btn:hover {
    background-color: var(--light2);
  }
  h4 {
    color: var(--text-light);
    margin: 4px 0;
    padding-left: 10px;
  }
  .btns > span {
    margin-left: 20px;
  }
  .upload {
    min-width: 270px;
    background-color: var(--light10);
    padding: 7px;
  }
</style>
