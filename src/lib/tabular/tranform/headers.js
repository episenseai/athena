export const numFilterOps = ['=', '<', '>', '<=', '>=']

export const headers = [
  {
    name: 'id',
    column: 'id',
    // default sort order of columns if ascending
    ascend: false,
    info: 'Unique ID of the feature',
    // `filter` rows acording to values
    // `filter[0]`: if undefined then do not use filter op otherwise filter according to `numFilterOps`
    // `filter[1]`: current value of the filter text/number
    filter: [''],
    placeholder: '9&&13&&...',
  },
  {
    name: 'feature',
    column: 'name',
    ascend: false,
    info: 'Name of the Feature; comes from the column header in the imported data',
    filter: [''],
    placeholder: 'eg. name1&&name2...',
  },
  {
    name: 'include',
    column: 'include',
    ascend: false,
    info: 'If unchecked, the feature column will not be used for training the Model',
    filter: [''],
    placeholder: 'eg. true',
  },
  {
    name: 'type',
    column: 'type',
    ascend: false,
    info: 'Data Type of the feature; comes from the selection during the Prepare stage',
    filter: [''],
    placeholder: 'Number',
  },
  {
    name: 'weight',
    column: 'weight',
    ascend: false,
    info: 'Weight assigned to the particluar feature in predicting the target',
    filter: [''],
    placeholder: '>0.25&&<0.79',
  },
  {
    name: 'unique',
    column: 'unique',
    ascend: false,
    info: `Number of unique values present in each feature/column. For Category variables 
            it represents the number of distinct categories.`,
    filter: [''],
    placeholder: '<30',
  },
  {
    name: 'missing',
    column: 'missing',
    ascend: false,
    info: 'Number of missing values',
    filter: [''],
    placeholder: '<20&&>8',
  },
  {
    name: 'correlation',
    column: 'correlation',
    ascend: false,
    info: 'Correlation of the Number feature with the selected target',
    filter: [''],
    placeholder: '<1.2&&',
  },
  {
    name: 'min',
    column: 'min',
    ascend: false,
    info: 'Minimum value present in the feature',
    filter: [''],
    placeholder: '>3&&<4.8',
  },
  {
    name: 'mean',
    column: 'mean',
    ascend: false,
    info: 'Statistical Mean of the feature',
    filter: [''],
    placeholder: '>20.24',
  },
  {
    name: 'median',
    column: 'median',
    ascend: false,
    info: 'Statistical Median of the feature',
    filter: [''],
    placeholder: '<23.50&&>2',
  },
  {
    name: 'max',
    column: 'max',
    ascend: false,
    info: 'Maximum value present in the feature',
    filter: [''],
    placeholder: '>8456',
  },
  {
    name: 'std',
    column: 'std',
    ascend: false,
    info: 'Standard deviation of the feature',
    filter: [''],
    placeholder: '<4.56&&>2.3',
  },
]
