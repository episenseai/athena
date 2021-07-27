<script>
  import NavLogo from '$lib/NavLogo.svelte'
  import { LOGIN } from '$lib/auth/store.js'
  import { PROJECT, SWITCH_PROJECT } from '$lib/tabular/store'
  export let segment
  import { snack } from '$lib/base/snack'
  import { get } from 'svelte/store'

  // tabular or home
  export let level
</script>

<nav class="noselect">
  <div>
    <ul>
      <li class="brand">
        <a
          class={segment === undefined && level === 'home' ? 'selected' : ''}
          href="."
          title="HOME: episense ai"
        >
          <NavLogo />
        </a>
      </li>
      {#if level === 'tabular'}
        <li class="tabular">
          <span> Tabular </span>
        </li>
      {/if}
    </ul>
  </div>
  {#if level === 'home'}
    <ul>
      <li class="demo">
        <span> (Demo version) </span>
      </li>
    </ul>
  {/if}

  {#if level === 'tabular'}
    <div>
      <ul>
        <li class="pipeline">
          <span class={!($PROJECT.pipe_status === '1') ? 'selected' : ''} title="TABULAR: Pipeline">
            Pipeline
          </span>
        </li>
        <li class="next-icon">&nbsp;&nbsp;&#9654;&nbsp;&nbsp;</li>
        <li class="models">
          <span
            class={$PROJECT.current_stage === 'finalconfig:GET' && $PROJECT.pipe_status === '1'
              ? 'selected'
              : ''}
            title="TABULAR: Models"
          >
            Models
          </span>
        </li>
      </ul>
    </div>
  {/if}

  <div class="others">
    <ul>
      {#if level === 'tabular'}
        {#if $PROJECT.name && $PROJECT.current_stage}
          <li class="cproj"><span class="pname">{$PROJECT.name}</span></li>
        {/if}
        <li>
          <button
            on:click|stopPropagation={async () => {
              if (get(SWITCH_PROJECT) === true) {
                await snack(
                  'warning',
                  'Already in the process of switching project. Try selecting a project from the list below.',
                )
                return
              }
              $SWITCH_PROJECT = true // eslint-disable-line
            }}
          >
            <span class="logo-global">&#8635;</span>
            Switch Project
          </button>
        </li>
      {/if}
      <li class="loggedin">
        {#if level === 'home'}
          <span class="username">
            {$LOGIN.username}
          </span>
        {/if}
        <button
          on:click|stopPropagation={async () => {
            const response = await LOGIN.oauth_logout()
            if (response) {
              await PROJECT.reset_proj()
              window.location.replace(window.location.origin)
            }
          }}
        >
          Logout
          <span class="logo-global">&#x23FB;</span>
        </button>
        {#if $LOGIN.picture}
          <img src={$LOGIN.picture} alt="" />
        {:else}
          <div class="defpic" />
        {/if}
      </li>
    </ul>
  </div>
</nav>

<style>
  nav {
    border-bottom: var(--light-border);
    font-weight: 300;
    padding: 0 1em;
    display: flex;
    justify-content: space-between;
    background-color: #fafafa;
    height: 44px;
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    height: 100%;
  }
  li {
    list-style: none;
    margin: auto;
    font-size: 13px;
    letter-spacing: 0.03em;
  }
  .selected {
    color: green;
  }
  li a {
    position: relative;
    display: inline-block;
  }

  a,
  .tabular {
    text-decoration: none;
    padding: 0.8em 1.8em 0.8em 0;
    font-family: Inter;
    font-size: 14px;
    letter-spacing: 0.01em;
    color: rgba(var(--lobster-rgb), 1);
    font-weight: 500;
  }
  a {
    display: block;
  }
  .pipeline span,
  .models span {
    font-weight: 500;
    font-size: 14px;
  }
  .tabular {
    padding: 0.3em 0.4em 0.1em;
    top: 5px;
    margin-right: 0;
    color: rgba(var(--lobster-rgb), 1);
  }
  .tabular::before,
  .brand::before {
    content: '❏';
    color: rgba(var(--pink-rgb), 1);
    position: relative;
    font-size: 26px;
    top: 2px;
    line-height: 0;
    padding-right: 5px;
  }
  .brand::before {
    content: '';
  }

  .brand a {
    padding: 0;
    top: -3px;
  }
  div:nth-child(3) li a:hover {
    color: var(--lobster);
  }

  .others li a {
    color: var(--text-light);
    font-size: 11px;
    padding: 1.1em 0.4em 0.8em 0.4em;
  }
  .others li:last-child a {
    padding-right: 0.2em;
  }
  button {
    margin-right: 6px;
    padding: 4px 10px;
    border: 1px solid rgba(97, 125, 144, 0.6);
  }
  button:hover {
    border: 1px solid rgba(var(--lobster-rgb), 1);
  }
  .username {
    font-weight: 500;
    margin-right: 10px;
  }
  .pname {
    color: var(--pink);
  }
  .cproj {
    margin-right: 10px;
    border-bottom: var(--light-border);
    padding: 0.2em 0.6em 0.2em 0.6em;
  }
  div.defpic {
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAwIDUwMCIgaWQ9IkxheWVyXzEiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDUwMCA1MDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxnPjxwYXRoIGQ9Ik0yNTAsMjkxLjZjLTUyLjgsMC05NS44LTQzLTk1LjgtOTUuOHM0My05NS44LDk1LjgtOTUuOHM5NS44LDQzLDk1LjgsOTUuOFMzMDIuOCwyOTEuNiwyNTAsMjkxLjZ6IE0yNTAsMTI3LjMgICAgYy0zNy43LDAtNjguNCwzMC43LTY4LjQsNjguNHMzMC43LDY4LjQsNjguNCw2OC40czY4LjQtMzAuNyw2OC40LTY4LjRTMjg3LjcsMTI3LjMsMjUwLDEyNy4zeiIvPjwvZz48Zz48cGF0aCBkPSJNMzg2LjksNDAxLjFoLTI3LjRjMC02MC40LTQ5LjEtMTA5LjUtMTA5LjUtMTA5LjVzLTEwOS41LDQ5LjEtMTA5LjUsMTA5LjVoLTI3LjRjMC03NS41LDYxLjQtMTM2LjksMTM2LjktMTM2LjkgICAgUzM4Ni45LDMyNS42LDM4Ni45LDQwMS4xeiIvPjwvZz48L2c+PC9zdmc+');
    display: inline-block;
    display: inline-block;
    width: 25px;
    height: 25px;
    background-repeat: no-repeat;
    vertical-align: bottom;
  }
  .next-icon {
    color: var(--text-lighter);
  }
  li.loggedin {
    display: flex;
    align-items: center;
  }
  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
  .demo {
    color: var(--green);
    font-weight: 500;
    font-size: 14px;
  }
</style>
