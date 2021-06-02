<script>
  import Menu from '../../components/base/Menu.svelte'
  import PipeMain from '../../components/tp/PipeMain.svelte'
  import ModelsMain from '../../components/tp/ModelsMain.svelte'
  import { PROJECT, SWITCH_PROJECT, GET_DATA, POST_DATA } from '../../components/tp/store'
  import { onMount } from 'svelte'
  import { snack } from '../../components/base/store/snack'
  import Details from '../../components/base/Details.svelte'
  // file select menu
  let open = false
  let selectedproj

  let items = []
  let disabled = false

  async function list_projects() {
    const data = await PROJECT.list_all()
    if (data) {
      items = data.map((p) => ({
        value: p.projectid,
        name: `${p.projectname}`,
        desc: `${p.timestamp}`,
      }))
      if (items.length === 0) {
        await snack('warning', 'You do not have any projects yet.')
      }
    }
  }
  let getting_list = true
  onMount(async () => {
    await list_projects()
    getting_list = false
  })
</script>

<svelte:head>
  <title>Tabular - episense ai</title>
</svelte:head>

<!--
  for debugging
-->
{#if false}
  <Details>
    <h4 slot="summary">PROJECT state</h4>
    <pre>{JSON.stringify($PROJECT, undefined, 2)}</pre>
  </Details>
  <Details>
    <h4 slot="summary">GET data</h4>
    <pre
      style="overflow: scroll; max-height:600px; margin-bottom: 5px;">
      {JSON.stringify($GET_DATA, undefined, 2)}
    </pre>
  </Details>
  <Details>
    <h4 slot="summary">POST data</h4>
    <pre
      style="overflow: scroll; max-height:600px; margin-bottom: 5px;">
      {JSON.stringify($POST_DATA, undefined, 2)}
    </pre>
  </Details>
{/if}

{#if $SWITCH_PROJECT || (!$PROJECT.id && !$PROJECT.current_stage)}
  <div class="projects">
    <div>
      <h4>Start a new project</h4>
      <form
        on:submit|preventDefault|stopPropagation={async (event) => {
          disabled = true
          const response = await PROJECT.new(event.target.projectname.value, event.target.projectdesc.value)
          if (response) {
            await list_projects()
            await snack('info', 'Continue with the newly created and selected project.')
            // eslint-disable-next-line
            event.target.projectname.value = ''
            // eslint-disable-next-line
            event.target.projectdesc.value = ''
            if (items.length > 0) {
              selectedproj = items[0].value
            }
          }
          disabled = false
        }}>
        <label for="projectname">Project Name</label>
        <input required type="text" id="projectname" minlength="4" maxlength="20" />
        <label for="projectdesc">Description (optional)</label>
        <input type="text" id="projectdesc" minlength="0" maxlength="100" />

        <button type="submit" {disabled}>
          Create and select a new Project
          <span class="logo-global">+</span>
        </button>
      </form>
    </div>
    <div>
      <h4>To continue with an existing project, select from the list below.</h4>
      <div class="projectmenu">
        <Menu bind:open bind:selected={selectedproj} {items} width="350" color="maroon" />
      </div>
      <div class="selectproj">
        <button
          {disabled}
          on:click={async () => {
            disabled = true
            if (selectedproj) {
              await PROJECT.switch_proj(selectedproj)
            } else await snack('warning', 'Please select a project to continue...')
            disabled = false
          }}>
          Continue with the selected Project
          <span class="logo-global">→</span>
        </button>
      </div>
      {#if !getting_list && items.length === 0}
        <p class="empty">!! You have not created any project yet. Create a new project to select from the list.</p>
      {/if}
    </div>
  </div>
  {#if $SWITCH_PROJECT && $PROJECT.id && $PROJECT.current_stage}
    <div class="switch">
      <button {disabled} on:click={() => ($SWITCH_PROJECT = false)}>
        <span class="logo-global">←</span>
        Go back to the running Project
      </button>
    </div>
  {/if}
{:else if !$SWITCH_PROJECT && $PROJECT.id && $PROJECT.current_stage === 'finalconfig:GET' && $PROJECT.pipe_status === '1'}
  <ModelsMain />
{:else if !$SWITCH_PROJECT && $PROJECT.id && $PROJECT.pipe_status !== '1' && ['consume:GET', 'prepare:GET', 'transform:GET', 'build:GET', 'consume:POST', 'prepare:POST', 'transform:POST', 'build:POST', 'finalconfig:GET'].includes($PROJECT.current_stage)}
  <PipeMain />
{/if}

<style>
  .projects {
    margin: 16px auto 0;
    width: 860px;
    display: flex;
    justify-content: space-around;
  }
  .projects > div {
    flex-basis: 350px;
    flex-grow: 1;
    padding-bottom: 26px;
    padding-right: 25px;
  }
  .projects > div:last-of-type {
    flex-basis: 350px;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    margin-left: 10px;
    padding-left: 30px;
  }
  .projectmenu {
    margin-top: 36px;
  }
  label {
    width: 200px;
    padding-right: 5px;
    display: block;
  }
  input {
    margin-bottom: 12px;
    height: 28px;
    width: 100%;
    font-size: 15px;
    display: block;
  }
  form {
    margin-top: 15px;
  }
  .selectproj {
    margin-top: 35px;
  }
  .switch {
    margin: auto;
    text-align: center;
    width: 100%;
  }
  .empty {
    margin-top: 15px;
    color: var(--reddish);
  }
  input {
    margin-bottom: 20px;
    height: 32px;
    padding: 5px 10px 7px 10px;
    background-color: transparent;
    border: 1px solid #dfdfdf;
    outline: none;
    border-radius: 4px;
    color: #32325d;
    font-weight: 400;
    font-size: 14px;
    line-height: 26px;
  }
  input:focus {
    border-color: #ffa27b;
  }
</style>
