export default {
  stage: 'build:GET',
  data: {
    summary: {
      features: 36,
      includedFeatures: 26,
      rows: 483205,
      target: 'Stores_Sales',
      modelType: 'Multi-class Classifier', // or 'Binary Calssification' or 'Regression'
    },
    samplingMethods: ['Random', 'Stratified'], // Random - Monte Carlo Sampling
    splitMethods: ['Cross Validation', 'Training Validation Holdout'],
    cv: {
      folds: 5, // between 2-20
      holdout: 20, // between 5%-50%
    },
    // Data Split
    sampleUsing: 'Random',
    splitUsing: 'Cross Validation',
    metrics: ['Log Loss', 'Others to include'],
    optimizeUsing: 'Log Loss',
    downsampling: false,
  },
}
