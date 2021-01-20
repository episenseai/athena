export default {
  stage: 'build:POST',
  data: {
    cv: {
      folds: 5, // between 2-20
      holdout: 20, // between 5%-50%
    },
    // Data Split
    sampleUsing: 'Stratified',
    splitUsing: 'Cross Validation',
    optimizeUsing: 'Log Loss',
    downsampling: false,
  },
}
