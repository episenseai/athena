<script context="module">
  const hPrefix = ''

  const info = {
    id: {
      head: `${hPrefix} ID`,
      desc: 'Uniquely identifies each Column in the Data.',
    },
    column: {
      head: `${hPrefix} COLUMN NAME`,
      desc: 'Common name to describe the data in the column. It comes from the Header in the CSV file.',
    },
    datatype: {
      head: `${hPrefix} DATA TYPE`,
      desc: 'Inferred Data Type of the column. Can be changed from the drop down menu.',
    },
    imputable: {
      head: `${hPrefix} IMPUTABLE`,
      desc: `Data might have null or missing values. We can ignore the missing values by
              setting IMPUTABLE to False, which removes the rows from the data. If one
              chooses IMPUTABLE to be True, values are back filled according to some
              heuristics.`,
    },
    samplevalues: {
      head: `${hPrefix} SAMPLE VALUES`,
      desc: 'For each of the columns a randomly selected sample is choosen for preview purposes.',
    },
  }
</script>

<script>
  import { tooltip } from '../../SampleTooltip.svelte'
  export let about
  let translateX = '5px'
  let sample = [info[about].desc]
  let heading = info[about].head
</script>

<span use:tooltip={{ sample, heading, translateX }}>INFO</span>

<style>
  span {
    text-align: center;
    line-height: 1.3;
    color: var(--text-dark);
    font-family: Inter;
    font-size: 9px;
    letter-spacing: 0.04em;
    padding: 1px 3px;
    border: 1px solid var(--light12);
    border-radius: 2px;
    background-color: #fff;
    cursor: help;
    margin-left: 2px;
  }
  span:hover {
    border-color: var(--text-lighter-light-blue);
    color: var(--light-blue);
    background-color: #fff;
  }
</style>
