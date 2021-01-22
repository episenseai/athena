<script>
  export let model

  $: cm = model.cm

  let TP, FP, FN, TN
  let P, N
  let TOTAL // PREVALENCE
  let TPR, FNR, TNR, FPR
  let PPV, NPV, FDR, FOR
  let ACC
  let F1SCORE
  /* let MCC */
  /* let INFORMEDNESS */
  let LR_PLUS, LR_NEG, DOR

  $: if (cm) {
    // hit
    TP = cm[0][0]
    // false alarm, Type-I error
    FP = cm[0][1]
    // miss, Type-II error
    FN = cm[1][0]
    // correct rejection
    TN = cm[1][1]

    // condition Positive (total)
    P = TP + FN
    // consdition Negative (total)
    N = TN + FP
    TOTAL = P + N

    // sensitivity, recall, hit rate, probability of detection, or true positive rate
    TPR = TP / P
    // miss rate or false negative rate
    FNR = 1 - TPR
    // specificity, selectivity or true negative rate
    TNR = TN / N
    // fall-out, probability of false alarm or false positive rate
    FPR = 1 - TNR

    // precision, positive predictive value
    PPV = TP / (TP + FP)
    // false discovery rate
    FDR = 1 - PPV
    // negative predictive value
    NPV = TN / (TN + FN)
    // false omission rate
    FOR = 1 - NPV

    // accuracy
    ACC = (TP + TN) / (P + N)
    // harmonic mean of the precision and sensitivity
    F1SCORE = (2 * PPV * TPR) / (PPV + TPR)

    // Positive likelihood ratio
    LR_PLUS = TPR / FPR
    // Negative likelihood ratio
    LR_NEG = FNR / TNR
    // Dagnostic odds ratio
    DOR = LR_PLUS / LR_NEG
  }
</script>

{#if cm}
  <table>
    <thead>
      <tr>
        <th colspan="2">SIGNIFICANT MODEL MTERICS (BINARY CLASSIFCATION)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Accuracy</td>
        <td>{ACC.toPrecision(4)}</td>
      </tr>
      <tr>
        <td>Precision (PPV)</td>
        <td>{PPV.toPrecision(4)}</td>
      </tr>
      <tr>
        <td>Recall (TPR):</td>
        <td>{TPR.toPrecision(4)}</td>
      </tr>
      <tr>
        <td>F1 Score:</td>
        <td>{F1SCORE.toPrecision(4)}</td>
      </tr>
    </tbody>
  </table>
  <main>
    <div class="actualClass">GROUND TRUTH (TOTAL = {TOTAL})</div>
    <div class="predictedClass"><span class="rotate">MODEL PREDICTION</span></div>
    <div class="actualPositive">POSITIVE</div>
    <div class="actualNegative">NEGATIVE</div>
    <div class="predictedPositive"><span class="rotate">POSITIVE</span></div>
    <div class="predictedNegative"><span class="rotate">NEGATIVE</span></div>
    <div class="tp"><span>true positive (TP)</span> <span>{TP}</span></div>
    <div class="fp"><span>false positive (FP)</span> <span>{FP}</span></div>
    <div class="fn"><span>false negative (FN)</span> <span>{FN}</span></div>
    <div class="tn"><span>true negative (TN)</span> <span>{TN}</span></div>
    <div class="tpr"><span>true positive rate (TPR)</span> <span>{TPR.toPrecision(4)}</span></div>
    <div class="fpr"><span>false positive rate (FPR)</span> <span>{FPR.toPrecision(4)}</span></div>
    <div class="fnr"><span>false negative rate (FNR)</span> <span>{FNR.toPrecision(4)}</span></div>
    <div class="tnr"><span>true negative rate (TNR)</span> <span>{TNR.toPrecision(4)}</span></div>
    <div class="ppv"><span>positive predictive value (PPV)</span> <span>{PPV.toPrecision(4)}</span></div>
    <div class="fdr"><span>false discovery rate (FDR)</span> <span>{FDR.toPrecision(4)}</span></div>
    <div class="for"><span>false omission rate (FOR)</span> <span>{FOR.toPrecision(4)}</span></div>
    <div class="npv"><span>negative predictive value (NPV)</span> <span>{NPV.toPrecision(4)}</span></div>
    <div class="lrplus">
      <span>positive likelihood ratio (LR_PLUS)</span>
      <span>{LR_PLUS.toPrecision(4)}</span>
    </div>
    <div class="lrneg">
      <span>negative likelihood ratio (LR_NEG)</span>
      <span>{LR_NEG.toPrecision(4)}</span>
    </div>
    <div class="dor"><span>diagnostic odds ratio (DOR)</span> <span>{DOR.toPrecision(4)}</span></div>
    <div class="acc"><span>accuracy (ACC)</span> <span>{ACC.toPrecision(4)}</span></div>
    <!-- For styling purposes only -->
    <div class="tr1" />
    <div class="tr2" />
    <div class="tr3" />
    <div class="tr4" />
    <div class="tr5" />
  </main>
{/if}

<!-- Descriptions -->
<style>
  main {
    margin: 30px auto 0;
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-auto-rows: minmax(40px, auto);
    grid-gap: 0;
    max-width: 1050px;
  }

  main > * {
    text-align: center;
    padding: 13px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-style: solid;
    border-color: rgba(3, 168, 124, 0.7);
  }
  div {
    border-width: 1px 1px 0 0;
  }
  .actualClass {
    grid-column: 3 / 9;
    grid-row: 1 / 2;
  }
  .predictedClass {
    grid-column: 1 / 2;
    grid-row: 3 / 5;
    border-left-width: 1px;
  }
  .actualPositive {
    grid-column: 3 / 6;
    grid-row: 2 / 3;
  }
  .actualNegative {
    grid-column: 6 / 9;
    grid-row: 2 / 3;
  }
  .predictedPositive {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
  }
  .predictedNegative {
    grid-column: 2 / 3;
    grid-row: 4 / 5;
  }
  .tp {
    grid-column: 3 / 6;
    grid-row: 3 / 4;
  }
  .fp {
    grid-column: 6 / 9;
    grid-row: 3 / 4;
  }
  .fn {
    grid-column: 3 / 6;
    grid-row: 4 / 5;
  }
  .tn {
    grid-column: 6 / 9;
    grid-row: 4 / 5;
  }
  .tpr {
    grid-column: 3 / 6;
    grid-row: 5 / 6;
  }
  .fpr {
    grid-column: 6 / 9;
    grid-row: 5 / 6;
  }
  .fnr {
    grid-column: 3 / 6;
    grid-row: 6 / 7;
  }
  .tnr {
    grid-column: 6 / 9;
    grid-row: 6 / 7;
  }
  .ppv {
    grid-column: 9 / 13;
    grid-row: 3 / 4;
  }
  .fdr {
    grid-column: 13 / 17;
    grid-row: 3 / 4;
  }
  .for {
    grid-column: 9 / 13;
    grid-row: 4 / 5;
  }
  .npv {
    grid-column: 13 / 17;
    grid-row: 4 / 5;
  }
  .lrplus {
    grid-column: 9 / 13;
    grid-row: 5 / 6;
  }
  .lrneg {
    grid-column: 9 / 13;
    grid-row: 6 / 7;
  }
  .dor {
    grid-column: 13 / 17;
    grid-row: 5 / 7;
  }
  .acc {
    grid-column: 9 / 13;
    grid-row: 2 / 3;
  }
  .tr1 {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    border-width: 0 1px 0 0;
  }
  .tr2 {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    border-width: 0 1px 0 0;
  }
  .tr3 {
    grid-column: 2 / 3;
    grid-row: 5 / 6;
    border-width: 1px 1px 0 0;
  }
  .tr4 {
    grid-column: 1 / 2;
    grid-row: 5 / 6;
    border-width: 1px 0 0 0;
  }
  .tr5 {
    grid-column: 2 / 3;
    grid-row: 6 / 7;
    border-width: 0 1px 0 0;
  }
  .fnr,
  .tnr,
  .lrneg,
  .dor {
    border-bottom-width: 1px;
  }

  .tp,
  .tn,
  .fp,
  .fn {
    background-color: rgba(255, 253, 194, 0.4);
  }

  .actualClass,
  .predictedClass,
  .predictedPositive,
  .predictedNegative,
  .actualPositive,
  .actualNegative {
    background-color: rgba(246, 241, 228, 0.3);
    font-family: Inter;
    font-size: 0.8em;
    letter-spacing: 0.04em;
    color: var(--text-medium);
  }
  .tpr,
  .tnr,
  .fpr,
  .fnr {
    background-color: rgba(212, 197, 249, 0.14);
  }
  .lrplus,
  .lrneg,
  .dor {
    background-color: rgba(215, 240, 162, 0.2);
  }
  .ppv,
  .fdr,
  .for,
  .npv {
    background-color: rgba(246, 106, 10, 0.07);
  }
  .acc {
    background-color: rgba(215, 240, 162, 0.2);
  }
  main .acc {
    flex-direction: row;
  }
  .acc span {
    margin: 0;
  }
  .acc span:nth-child(2) {
    margin-left: 8px;
  }
  span:first-child,
  .rotate {
    font-size: 1em;
    margin-bottom: 4px;
    color: var(--text-medium);
  }
  span:nth-child(2) {
    color: #c05726;
  }
  .rotate {
    font-family: Inter;
    transform: rotate(270deg);
    margin-bottom: 0;
    position: relative;
    top: 3px;
    color: var(--text-medium);
  }
  table {
    width: 400px;
    margin: 30px auto;
    border-style: solid;
    border-width: 0 1px 0 1px;
    border-color: #eaecef;
  }
  td {
    padding: 6px;
    font-size: 13px;
  }
  td:nth-child(2) {
    color: #c05726;
    font-size: 13px;
  }
</style>
