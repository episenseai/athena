<script>
  import { LOGIN } from './auth/store.js'
  import { PROJECT, SWITCH_PROJECT } from './tp/store'
  export let segment
  import { snack } from '../components/base/store/snack'
  // tabular or home
  export let level
  import { get } from 'svelte/store'
</script>

<nav class="noselect">
  <div>
    <ul>
      <li class="brand">
        <a
          class={segment === undefined && level === 'home' ? 'selected' : ''}
          href="."
          title="HOME: episense ai">
          <!-- width="158.4" -->
          <!-- height="51.36" -->
          <svg
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            xmlns:svg="http://www.w3.org/2000/svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
            xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
            id="svg47"
            version="1.1"
            viewBox="0 0 87.312498 28.310417"
            height="48"
            width="92%"
            class="svelte-ieg5x"
            ><defs id="defs41">
              <rect x="6.8822874" y="1.3281607" width="15.092736" height="26.080247" id="rect48" />
            </defs>
            <metadata id="metadata44" />
            <g id="layer1" inkscape:groupmode="layer" inkscape:label="Layer 1">
              <g style="fill:#622aff;fill-opacity:1;stroke-width:0.264583" id="text125" aria-label="ai">
                <path
                  id="path868"
                  style="fill:#622aff;fill-opacity:1;stroke-width:0.264583"
                  d="m 70.187144,11.696112 q 1.037164,0 1.587495,0.486832 0.550332,0.486832 0.550332,1.502828 v 3.852322
        h -0.984247 l -0.275166,-0.793748 h -0.04233 q -0.349249,0.465665 -0.740831,0.687915
        -0.380999,0.211666 -1.05833,0.211666 -0.719664,0 -1.206496,-0.433916 -0.476249,-0.433915
        -0.476249,-1.344079 0,-0.888997 0.613832,-1.333496 0.613831,-0.444498 1.852077,-0.497415 l
        0.910164,-0.03175 v -0.285749 q 0,-0.550331 -0.232833,-0.783164 -0.222249,-0.232832
        -0.634998,-0.232832 -0.391582,0 -0.783164,0.126999 -0.380999,0.116417 -0.740831,0.296333 l
        -0.433915,-0.931331 q 0.423332,-0.222249 0.952497,-0.359832 0.529165,-0.137583 1.142996,-0.137583 z m
        0.740831,3.132657 -0.603248,0.02117 q -0.751414,0.03175 -1.047747,0.306916 -0.296332,0.264583
        -0.296332,0.719665 0,0.412748 0.201083,0.592664 0.211666,0.169333 0.550331,0.169333 0.497415,0
        0.846664,-0.328082 0.349249,-0.338666 0.349249,-0.99483 z" />
                <path
                  id="path870"
                  style="fill:#622aff;fill-opacity:1;stroke-width:0.264583"
                  d="m 74.542668,9.5900355 q 0.296332,0 0.518582,0.1587495 0.232832,0.1481662 0.232832,0.539748
        0,0.391582 -0.232832,0.550332 -0.22225,0.158749 -0.518582,0.158749 -0.328082,0 -0.550332,-0.158749
        -0.222249,-0.15875 -0.222249,-0.550332 0,-0.3915818 0.222249,-0.539748 0.22225,-0.1587495
        0.550332,-0.1587495 z m 0.687914,2.2119095 v 5.736149 h -1.396995 v -5.736149 z" />
              </g>
              <path
                xmlns="http://www.w3.org/2000/svg"
                xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                inkscape:connector-curvature="0"
                id="rect131"
                style="fill:#ce7c3a;fill-opacity:1;stroke-width:0.263326"
                d="M 3.8133676,20.769781 H 83.961088 V 21.58169 H 3.8133676 Z" />
              <g style="fill:#e94256;fill-opacity:1;stroke-width:0.264583" id="text121" aria-label="episense">
                <path
                  id="path851"
                  style="fill:#e94256;fill-opacity:1;stroke-width:0.264583"
                  d="m 25.090051,11.998494 q 1.111246,0 1.756828,0.687914 0.645581,0.687915 0.645581,1.915577 v 0.677332
        h -3.513655 q 0.02117,0.783164 0.380998,1.217079 0.359832,0.423332 1.037164,0.423332 0.518581,0
        0.93133,-0.105833 0.423332,-0.116416 0.867831,-0.328082 v 1.068913 q -0.402166,0.201083
        -0.846664,0.296332 -0.433916,0.09525 -1.05833,0.09525 -0.804331,0 -1.428746,-0.317499
        -0.613831,-0.328082 -0.96308,-0.973663 -0.349249,-0.656165 -0.349249,-1.640412 0,-1.471079
        0.698498,-2.243659 0.709081,-0.772581 1.841494,-0.772581 z m 0.02117,0.984247 q -0.465666,0
        -0.772581,0.349248 -0.296333,0.338666 -0.338666,1.015997 h 2.158993 q -0.01058,-0.592665
        -0.264582,-0.973663 -0.253999,-0.391582 -0.783164,-0.391582 z" />
                <path
                  id="path853"
                  style="fill:#e94256;fill-opacity:1;stroke-width:0.264583"
                  d="m 31.669556,11.998494 q 0.93133,0 1.492245,0.751414 0.571498,0.740831 0.571498,2.21191 0,1.471078
        -0.592665,2.233076 -0.582081,0.751414 -1.513411,0.751414 -0.592665,0 -0.952497,-0.232833
        -0.359833,-0.232832 -0.560915,-0.539748 h -0.07408 q 0.02117,0.201083 0.04233,0.433915
        0.03175,0.232833 0.03175,0.444499 v 2.328326 h -1.407579 v -8.27614 h 1.142996 l 0.1905,0.761997 h
        0.07408 q 0.211666,-0.359832 0.571498,-0.613831 0.370415,-0.253999 0.984247,-0.253999 z m
        -0.444499,1.079496 q -0.613831,0 -0.86783,0.423332 -0.243416,0.423332 -0.243416,1.280579 v 0.169333 q
        0,0.920747 0.232832,1.418162 0.243416,0.486832 0.899581,0.486832 0.529165,0 0.793747,-0.507998
        0.264583,-0.518582 0.264583,-1.407579 0,-0.888997 -0.264583,-1.375829 -0.264582,-0.486832
        -0.814914,-0.486832 z" />
                <path
                  id="path855"
                  style="fill:#e94256;fill-opacity:1;stroke-width:0.264583"
                  d="m 35.689059,9.8924171 q 0.296333,0 0.518582,0.1587499 0.232833,0.148166 0.232833,0.539748
        0,0.391582 -0.232833,0.550331 -0.222249,0.15875 -0.518582,0.15875 -0.328082,0 -0.550331,-0.15875
        -0.222249,-0.158749 -0.222249,-0.550331 0,-0.391582 0.222249,-0.539748 0.222249,-0.1587499
        0.550331,-0.1587499 z m 0.687915,2.2119099 v 5.736148 h -1.396996 v -5.736148 z" />
                <path
                  id="path857"
                  style="fill:#e94256;fill-opacity:1;stroke-width:0.264583"
                  d="m 41.682845,16.178897 q 0,0.867831 -0.571498,1.322912 -0.560915,0.444499 -1.682745,0.444499
        -0.571498,0 -0.99483,-0.08467 -0.423332,-0.08467 -0.814914,-0.264583 v -1.132413 q 0.423332,0.201083
        0.910164,0.338666 0.497415,0.137583 0.89958,0.137583 0.476249,0 0.687915,-0.169333 0.211666,-0.169333
        0.211666,-0.455082 0,-0.169333 -0.09525,-0.306916 -0.09525,-0.137583 -0.359832,-0.296332
        -0.264583,-0.15875 -0.772581,-0.380999 -0.497415,-0.222249 -0.836081,-0.444499 -0.328082,-0.222249
        -0.497415,-0.529164 -0.158749,-0.306916 -0.158749,-0.793748 0,-0.772581 0.582081,-1.164163
        0.582082,-0.402165 1.545162,-0.402165 0.518582,0 0.96308,0.105833 0.444499,0.105833 0.910164,0.317499
        l -0.412749,0.984247 q -0.391582,-0.169333 -0.772581,-0.28575 -0.380998,-0.116416 -0.709081,-0.116416
        -0.751414,0 -0.751414,0.497415 0,0.179916 0.09525,0.317499 0.105833,0.127 0.359832,0.264583
        0.264583,0.137583 0.751414,0.338665 0.486832,0.201083 0.814914,0.423332 0.338666,0.211666
        0.518582,0.529165 0.179916,0.306916 0.179916,0.804331 z" />
                <path
                  id="path859"
                  style="fill:#e94256;fill-opacity:1;stroke-width:0.264583"
                  d="m 45.119771,11.998494 q 1.111247,0 1.756828,0.687914 0.645581,0.687915 0.645581,1.915577 v 0.677332
        h -3.513655 q 0.02117,0.783164 0.380999,1.217079 0.359832,0.423332 1.037163,0.423332 0.518582,0
        0.93133,-0.105833 0.423332,-0.116416 0.867831,-0.328082 v 1.068913 q -0.402165,0.201083
        -0.846664,0.296332 -0.433915,0.09525 -1.05833,0.09525 -0.804331,0 -1.428745,-0.317499
        -0.613832,-0.328082 -0.963081,-0.973663 -0.349249,-0.656165 -0.349249,-1.640412 0,-1.471079
        0.698498,-2.243659 0.709081,-0.772581 1.841494,-0.772581 z m 0.02117,0.984247 q -0.465665,0
        -0.772581,0.349248 -0.296332,0.338666 -0.338666,1.015997 h 2.158994 q -0.01058,-0.592665
        -0.264583,-0.973663 -0.253999,-0.391582 -0.783164,-0.391582 z" />
                <path
                  id="path861"
                  style="fill:#e94256;fill-opacity:1;stroke-width:0.264583"
                  d="m 51.752193,11.998494 q 0.899581,0 1.418162,0.497415 0.518582,0.497415 0.518582,1.608661 v 3.735905
        h -1.407579 v -3.471322 q 0,-1.291163 -0.920747,-1.291163 -0.709081,0 -0.96308,0.507999
        -0.253999,0.507998 -0.253999,1.449912 v 2.804574 h -1.407579 v -5.736148 h 1.079496 l
        0.201083,0.751414 h 0.0635 q 0.253999,-0.444499 0.698498,-0.645581 0.444498,-0.211666
        0.973663,-0.211666 z" />
                <path
                  id="path863"
                  style="fill:#e94256;fill-opacity:1;stroke-width:0.264583"
                  d="m 58.963388,16.178897 q 0,0.867831 -0.571498,1.322912 -0.560915,0.444499 -1.682744,0.444499
        -0.571499,0 -0.994831,-0.08467 -0.423332,-0.08467 -0.814914,-0.264583 v -1.132413 q 0.423332,0.201083
        0.910164,0.338666 0.497415,0.137583 0.899581,0.137583 0.476248,0 0.687914,-0.169333 0.211666,-0.169333
        0.211666,-0.455082 0,-0.169333 -0.09525,-0.306916 -0.09525,-0.137583 -0.359832,-0.296332
        -0.264582,-0.15875 -0.772581,-0.380999 -0.497415,-0.222249 -0.83608,-0.444499 -0.328083,-0.222249
        -0.497415,-0.529164 -0.15875,-0.306916 -0.15875,-0.793748 0,-0.772581 0.582082,-1.164163
        0.582081,-0.402165 1.545161,-0.402165 0.518582,0 0.963081,0.105833 0.444498,0.105833 0.910163,0.317499
        l -0.412748,0.984247 q -0.391582,-0.169333 -0.772581,-0.28575 -0.380999,-0.116416 -0.709081,-0.116416
        -0.751415,0 -0.751415,0.497415 0,0.179916 0.09525,0.317499 0.105833,0.127 0.359832,0.264583
        0.264583,0.137583 0.751415,0.338665 0.486831,0.201083 0.814914,0.423332 0.338665,0.211666
        0.518581,0.529165 0.179916,0.306916 0.179916,0.804331 z" />
                <path
                  id="path865"
                  style="fill:#e94256;fill-opacity:1;stroke-width:0.264583"
                  d="m 62.400316,11.998494 q 1.111246,0 1.756827,0.687914 0.645582,0.687915 0.645582,1.915577 v 0.677332
        h -3.513656 q 0.02117,0.783164 0.380999,1.217079 0.359832,0.423332 1.037163,0.423332 0.518582,0
        0.931331,-0.105833 0.423332,-0.116416 0.86783,-0.328082 v 1.068913 q -0.402165,0.201083
        -0.846664,0.296332 -0.433915,0.09525 -1.05833,0.09525 -0.804331,0 -1.428745,-0.317499
        -0.613832,-0.328082 -0.96308,-0.973663 -0.349249,-0.656165 -0.349249,-1.640412 0,-1.471079
        0.698497,-2.243659 0.709082,-0.772581 1.841495,-0.772581 z m 0.02117,0.984247 q -0.465665,0
        -0.772581,0.349248 -0.296332,0.338666 -0.338665,1.015997 h 2.158993 q -0.01058,-0.592665
        -0.264583,-0.973663 -0.253999,-0.391582 -0.783164,-0.391582 z" />
              </g>
              <g
                inkscape:transform-center-y="-1.8111283"
                inkscape:transform-center-x="-8.6934158"
                style="fill:#e94256;fill-opacity:1;stroke-width:0.264583"
                id="text56"
                aria-label="">
                <path
                  id="path848"
                  style="fill:#e94256;fill-opacity:1;stroke-width:0.264583"
                  d="m 16.832723,14.199793 c 0,-0.908757 -0.750713,-1.540937 -1.540937,-1.540937 -0.750713,0
        -1.540937,0.612424 -1.540937,1.540937 0,0.948269 0.632179,1.540937 1.540937,1.540937 0.928513,0
        1.540937,-0.750713 1.540937,-1.540937 z M 15.667142,9.7745387 H 15.27203 c -2.449694,0
        -4.44501,1.9953153 -4.44501,4.4450103 0,1.837271 1.12607,3.417719 2.706518,4.089409 l
        -0.80998,3.338696 c -0.49389,1.995316 -0.968024,3.259674 -1.896538,3.259674 -0.138289,0
        -0.217311,-0.05927 -0.217311,-0.158045 0,-0.217311 0.355601,-0.197556 0.355601,-0.770468 0,-0.335845
        -0.31609,-0.513646 -0.612424,-0.513646 -0.5531568,0 -1.0272912,0.513646 -1.0272912,1.165581 0,0.474134
        0.296334,0.889002 1.0865582,0.889002 2.212627,0 3.397963,-2.390428 3.793075,-3.990631 l
        0.711202,-2.884318 c 0.118533,0.01976 0.237067,0.01976 0.3556,0.01976 2.449695,0 4.44501,-1.995316
        4.44501,-4.44501 0,-1.817515 -1.106313,-3.397963 -2.667006,-4.089409 l 0.770469,-3.1016297 c
        0.513645,-2.074338 1.007535,-3.4967412 1.995315,-3.4967412 0.13829,0 0.217312,0.059267
        0.217312,0.1580448 0,0.1778004 -0.355601,0.296334 -0.355601,0.8099796 0,0.3358452 0.31609,0.4741344
        0.612424,0.4741344 0.553157,0 1.027291,-0.5136456 1.027291,-1.1655804 0,-0.4741344 -0.296334,-0.889002
        -1.086558,-0.889002 -2.370672,0 -3.516497,2.7262728 -3.911609,4.3067208 z m 3.318941,4.4450103 c
        0,2.034827 -1.65947,3.694297 -3.694297,3.694297 -2.034827,0 -3.694297,-1.65947 -3.694297,-3.694297
        0,-2.034827 1.65947,-3.694297 3.694297,-3.694297 2.034827,0 3.694297,1.65947 3.694297,3.694297 z" />
              </g>
            </g></svg>
        </a>
      </li>
    </ul>
  </div>
  {#if level === 'home'}
    <div class="">
      <ul>
        <li class="username">
          <div />
          {$LOGIN.username}
        </li>
      </ul>
    </div>
  {/if}
  {#if level === 'tabular'}
    <div>
      <ul>
        <li class="tabular">
          <span class={segment === undefined && level === 'tabular' ? 'selected' : ''}> Tabular </span>
        </li>
        <li class="pipeline">
          (
          <span class={!($PROJECT.pipe_status === '1') ? 'selected' : ''} title="TABULAR: Pipeline">
            Pipeline
          </span>)
        </li>
        <li>&nbsp;&nbsp;⮕ &nbsp;&nbsp;</li>
        <li class="models">
          (
          <span
            class={$PROJECT.current_stage === 'finalconfig:GET' && $PROJECT.pipe_status === '1'
              ? 'selected'
              : ''}
            title="TABULAR: Models"> Models </span>)
        </li>
      </ul>
    </div>
  {/if}

  <div class="others">
    <ul>
      {#if level === 'tabular'}
        {#if $PROJECT.name && $PROJECT.current_stage}
          <li class="cproj">Project:&nbsp; <span class="pname">{$PROJECT.name}</span>&nbsp;</li>
        {/if}
        <li>
          <button
            on:click|stopPropagation={async () => {
              console.log(get(SWITCH_PROJECT))
              if (get(SWITCH_PROJECT) === true) {
                await snack(
                  'warning',
                  'Already in the process of switching project. Try selecting a project from the list below.'
                )
                return
              }
              $SWITCH_PROJECT = true // eslint-disable-line
            }}>
            <span class="logo-global">&#x23CE;</span>
            Switch Project
          </button>
        </li>
        <li>
          <button
            on:click|stopPropagation={async () => {
              await PROJECT.reset_proj()
              location.reload()
              await snack('info', 'Current working project unset. Select a new one.')
            }}>
            Reset
            <span class="logo-global">&#x21ba;</span>
          </button>
        </li>
      {/if}
      <li>
        <button
          on:click|stopPropagation={async () => {
            const response = await LOGIN.logout()
            if (response) {
              await PROJECT.reset_proj()
              window.location.replace(window.location.origin)
            }
          }}>
          Logout
          <span class="logo-global">&#x23FB;</span>
        </button>
      </li>

      <li><a class={segment === 'about' ? 'selected' : ''} href="faq" title="About episense ai">FAQ</a></li>
      <li>
        <a
          class={segment === 'legal' ? 'selected' : ''}
          href="legal"
          title="Terms and Privacy policy of episense ai"> legal </a>
      </li>
      <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
      <!--
      <li>
      <a rel="prefetch" class={segment === 'blog' ? 'selected' : ''} href="blog">blog</a>
    </li>
    -->
    </ul>
  </div>
</nav>

<style>
  nav {
    border-bottom: var(--gentle-border);
    font-weight: 300;
    padding: 0 1em;
    display: flex;
    justify-content: space-between;
    background-color: #f5f5f7;
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
    color: var(--blue);
  }
  li a {
    position: relative;
    display: inline-block;
  }

  a,
  .tabular {
    text-decoration: none;
    padding: 0.8em 1.8em 0.8em 0;
    text-transform: uppercase;
    font-family: Inter;
    font-size: 14px;
    letter-spacing: 0.04em;
    color: var(--text-dark);
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
    padding: 0.2em 1.1em;
    margin-right: 5px;
    color: var(--text-dark);
    text-transform: lowercase;
  }
  .tabular::before,
  .brand::before {
    content: '❏';
    position: relative;
    font-size: 20px;
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
  li.tabular:hover::before,
  div:nth-child(3) li a:hover {
    color: var(--lobster);
  }
  li.tabular:hover::before {
    color: var(--text-dark);
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
  .username {
    font-weight: 500;
  }
  .pname {
    color: var(--pink);
  }
  .cproj {
    margin-right: 10px;
    border-bottom: 1px solid var(--blue);
    padding: 0.2em 0.6em 0.2em 0.6em;
  }
  .username div {
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAwIDUwMCIgaWQ9IkxheWVyXzEiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDUwMCA1MDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxnPjxwYXRoIGQ9Ik0yNTAsMjkxLjZjLTUyLjgsMC05NS44LTQzLTk1LjgtOTUuOHM0My05NS44LDk1LjgtOTUuOHM5NS44LDQzLDk1LjgsOTUuOFMzMDIuOCwyOTEuNiwyNTAsMjkxLjZ6IE0yNTAsMTI3LjMgICAgYy0zNy43LDAtNjguNCwzMC43LTY4LjQsNjguNHMzMC43LDY4LjQsNjguNCw2OC40czY4LjQtMzAuNyw2OC40LTY4LjRTMjg3LjcsMTI3LjMsMjUwLDEyNy4zeiIvPjwvZz48Zz48cGF0aCBkPSJNMzg2LjksNDAxLjFoLTI3LjRjMC02MC40LTQ5LjEtMTA5LjUtMTA5LjUtMTA5LjVzLTEwOS41LDQ5LjEtMTA5LjUsMTA5LjVoLTI3LjRjMC03NS41LDYxLjQtMTM2LjksMTM2LjktMTM2LjkgICAgUzM4Ni45LDMyNS42LDM4Ni45LDQwMS4xeiIvPjwvZz48L2c+PC9zdmc+');
    display: inline-block;
    display: inline-block;
    width: 25px;
    height: 25px;
    background-repeat: no-repeat;
    vertical-align: bottom;
  }
</style>
