export default {
  modelType: 'multi_classifier', // or 'regressor' 'classifier'
  models: [
    {
      id: '112233',
      metrics: { val: 0.456 },
      status: 'DONE',
      // confusion matrix: [[TP, FP], [FN, TN]]
      classes: [
        'account_balance',
        'contact',
        'disposable',
        'Interest_rate',
        'loans',
        'mobile',
        'mortgage',
        'overdraft',
        'pay_person',
        'payday',
        'savings_target',
        'smalltalk.target',
        'smalltalk.name',
        'smalltalk.hello',
        'smalltalk.thank',
        'statement',
        'upcoming_bills',
      ],
      cm: [
        [724, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [7, 1326, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [1, 0, 888, 13, 17, 24, 3, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [24, 0, 3, 1229, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [4, 0, 8, 13, 278, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [67, 10, 8, 13, 24, 683, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [34, 10, 8, 13, 17, 32, 497, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [0, 10, 8, 13, 17, 24, 0, 328, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [1, 10, 8, 13, 17, 24, 32, 2, 876, 4, 0, 0, 0, 47, 87, 0, 10],
        [36, 10, 8, 13, 17, 24, 32, 0, 4, 299, 0, 0, 0, 47, 87, 0, 10],
        [48, 10, 8, 13, 17, 24, 32, 0, 4, 0, 628, 0, 0, 47, 87, 0, 10],
        [11, 10, 8, 13, 17, 24, 32, 0, 2, 0, 0, 389, 0, 47, 87, 0, 10],
        [13, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 445, 47, 87, 0, 10],
        [16, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 2, 0, 947, 87, 0, 10],
        [18, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 99, 47, 756, 0, 10],
        [22, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 845, 8],
        [0, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 1000],
      ],
      roc: [
        {
          name: 'class 0',
          x: [0.0, 0.02, 0.06, 0.1, 0.13, 0.18, 0.2, 0.32, 0.34, 0.38, 0.4, 0.5, 0.56, 0.6, 0.62, 0.65, 0.7, 0.75, 1.0],
          y: [
            0.1, 0.22, 0.23, 0.26, 0.3, 0.37, 0.5, 0.6, 0.67, 0.78, 0.82, 0.84, 0.85, 0.88, 0.92, 0.93, 0.95, 1.0, 1.0,
          ],
          area: 0.923,
        },
        {
          name: 'class 1',
          x: [0.0, 0.02, 0.06, 0.1, 0.13, 0.18, 0.2, 0.32, 0.34, 0.38, 0.4, 0.5, 0.56, 0.6, 0.62, 0.65, 0.7, 0.75, 1.0],
          y: [
            0.02, 0.23, 0.26, 0.28, 0.34, 0.36, 0.4, 0.5, 0.6, 0.8, 0.86, 0.88, 0.89, 0.9, 0.92, 0.98, 0.99, 1.0, 1.0,
          ],
          area: 0.99,
        },
        {
          name: 'class 2',
          x: [
            0.0, 0.02, 0.06, 0.1, 0.13, 0.18, 0.2, 0.32, 0.34, 0.38, 0.4, 0.5, 0.56, 0.6, 0.62, 0.65, 0.67, 0.85, 1.0,
          ],
          y: [0.01, 0.2, 0.3, 0.32, 0.34, 0.35, 0.45, 0.5, 0.6, 0.7, 0.8, 0.84, 0.86, 0.9, 0.93, 0.94, 0.95, 1.0, 1.0],
          area: 0.88,
        },
        {
          name: 'class 3',
          x: [0.0, 0.1, 0.2, 0.25, 0.28, 0.3, 0.34, 0.36, 0.38, 0.4, 0.42, 0.5, 0.56, 0.6, 0.62, 0.65, 0.8, 0.9, 1.0],
          y: [
            0.1, 0.22, 0.23, 0.26, 0.3, 0.37, 0.5, 0.6, 0.67, 0.78, 0.82, 0.84, 0.85, 0.88, 0.92, 0.93, 0.95, 1.0, 1.0,
          ],
          area: 0.86,
        },
      ],
    },
    {
      id: '112234',
      metrics: { val: 0.563 },
      status: 'DONE',
      classes: [
        'account_balance',
        'contact',
        'disposable',
        'Interest_rate',
        'loans',
        'mobile',
        'mortgage',
        'overdraft',
        'pay_person',
        'payday',
        'savings_target',
        'smalltalk.target',
        'smalltalk.name',
        'smalltalk.hello',
        'smalltalk.thank',
        'statement',
        'upcoming_bills',
      ],
      cm: [
        [724, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [7, 1326, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [1, 0, 888, 13, 17, 24, 3, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [24, 0, 3, 1229, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [4, 0, 8, 13, 278, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [67, 10, 8, 13, 24, 683, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [34, 10, 8, 13, 17, 32, 497, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [0, 10, 8, 13, 17, 24, 0, 328, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [1, 10, 8, 13, 17, 24, 32, 2, 876, 4, 0, 0, 0, 47, 87, 0, 10],
        [36, 10, 8, 13, 17, 24, 32, 0, 4, 299, 0, 0, 0, 47, 87, 0, 10],
        [48, 10, 8, 13, 17, 24, 32, 0, 4, 0, 628, 0, 0, 47, 87, 0, 10],
        [11, 10, 8, 13, 17, 24, 32, 0, 2, 0, 0, 389, 0, 47, 87, 0, 10],
        [13, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 445, 47, 87, 0, 10],
        [16, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 2, 0, 947, 87, 0, 10],
        [18, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 99, 47, 756, 0, 10],
        [22, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 845, 8],
        [0, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 1000],
      ],
      roc: [
        {
          name: 'class 0',
          x: [0.0, 0.02, 0.06, 0.1, 0.13, 0.18, 0.2, 0.32, 0.34, 0.38, 0.4, 0.5, 0.56, 0.6, 0.62, 0.65, 0.7, 0.75, 1.0],
          y: [
            0.1, 0.22, 0.23, 0.26, 0.3, 0.37, 0.5, 0.6, 0.67, 0.78, 0.82, 0.84, 0.85, 0.88, 0.92, 0.93, 0.95, 1.0, 1.0,
          ],
          area: 0.923,
        },
        {
          name: 'class 1',
          x: [0.0, 0.02, 0.06, 0.1, 0.13, 0.18, 0.2, 0.32, 0.34, 0.38, 0.4, 0.5, 0.56, 0.6, 0.62, 0.65, 0.7, 0.75, 1.0],
          y: [
            0.02, 0.23, 0.26, 0.28, 0.34, 0.36, 0.4, 0.5, 0.6, 0.8, 0.86, 0.88, 0.89, 0.9, 0.92, 0.98, 0.99, 1.0, 1.0,
          ],
          area: 0.99,
        },
        {
          name: 'class 2',
          x: [
            0.0, 0.02, 0.06, 0.1, 0.13, 0.18, 0.2, 0.32, 0.34, 0.38, 0.4, 0.5, 0.56, 0.6, 0.62, 0.65, 0.67, 0.85, 1.0,
          ],
          y: [0.01, 0.2, 0.3, 0.32, 0.34, 0.35, 0.45, 0.5, 0.6, 0.7, 0.8, 0.84, 0.86, 0.9, 0.93, 0.94, 0.95, 1.0, 1.0],
          area: 0.88,
        },
        {
          name: 'class 3',
          x: [0.0, 0.1, 0.2, 0.25, 0.28, 0.3, 0.34, 0.36, 0.38, 0.4, 0.42, 0.5, 0.56, 0.6, 0.62, 0.65, 0.8, 0.9, 1.0],
          y: [
            0.1, 0.22, 0.23, 0.26, 0.3, 0.37, 0.5, 0.6, 0.67, 0.78, 0.82, 0.84, 0.85, 0.88, 0.92, 0.93, 0.95, 1.0, 1.0,
          ],
          area: 0.86,
        },
      ],
    },
    {
      id: '112235',
      status: 'RUNNING',
    },
    {
      id: '112236',
      status: 'RUNNING',
    },
    {
      id: '112237',
      status: 'WAIT',
    },
    {
      id: '112238',
      metrics: { val: 0.454 },
      status: 'DONE',
      classes: [
        'account_balance',
        'contact',
        'disposable',
        'Interest_rate',
        'loans',
        'mobile',
        'mortgage',
        'overdraft',
        'pay_person',
        'payday',
        'savings_target',
        'smalltalk.target',
        'smalltalk.name',
        'smalltalk.hello',
        'smalltalk.thank',
        'statement',
        'upcoming_bills',
      ],
      cm: [
        [724, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [7, 1326, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [1, 0, 888, 13, 17, 24, 3, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [24, 0, 3, 1229, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [4, 0, 8, 13, 278, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [67, 10, 8, 13, 24, 683, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [34, 10, 8, 13, 17, 32, 497, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [0, 10, 8, 13, 17, 24, 0, 328, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [1, 10, 8, 13, 17, 24, 32, 2, 876, 4, 0, 0, 0, 47, 87, 0, 10],
        [36, 10, 8, 13, 17, 24, 32, 0, 4, 299, 0, 0, 0, 47, 87, 0, 10],
        [48, 10, 8, 13, 17, 24, 32, 0, 4, 0, 628, 0, 0, 47, 87, 0, 10],
        [11, 10, 8, 13, 17, 24, 32, 0, 2, 0, 0, 389, 0, 47, 87, 0, 10],
        [13, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 445, 47, 87, 0, 10],
        [16, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 2, 0, 947, 87, 0, 10],
        [18, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 99, 47, 756, 0, 10],
        [22, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 845, 8],
        [0, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 1000],
      ],
      roc: [
        {
          name: 'class 0',
          x: [0.0, 0.02, 0.06, 0.1, 0.13, 0.18, 0.2, 0.32, 0.34, 0.38, 0.4, 0.5, 0.56, 0.6, 0.62, 0.65, 0.7, 0.75, 1.0],
          y: [
            0.1, 0.22, 0.23, 0.26, 0.3, 0.37, 0.5, 0.6, 0.67, 0.78, 0.82, 0.84, 0.85, 0.88, 0.92, 0.93, 0.95, 1.0, 1.0,
          ],
          area: 0.923,
        },
        {
          name: 'class 1',
          x: [0.0, 0.02, 0.06, 0.1, 0.13, 0.18, 0.2, 0.32, 0.34, 0.38, 0.4, 0.5, 0.56, 0.6, 0.62, 0.65, 0.7, 0.75, 1.0],
          y: [
            0.02, 0.23, 0.26, 0.28, 0.34, 0.36, 0.4, 0.5, 0.6, 0.8, 0.86, 0.88, 0.89, 0.9, 0.92, 0.98, 0.99, 1.0, 1.0,
          ],
          area: 0.99,
        },
        {
          name: 'class 2',
          x: [
            0.0, 0.02, 0.06, 0.1, 0.13, 0.18, 0.2, 0.32, 0.34, 0.38, 0.4, 0.5, 0.56, 0.6, 0.62, 0.65, 0.67, 0.85, 1.0,
          ],
          y: [0.01, 0.2, 0.3, 0.32, 0.34, 0.35, 0.45, 0.5, 0.6, 0.7, 0.8, 0.84, 0.86, 0.9, 0.93, 0.94, 0.95, 1.0, 1.0],
          area: 0.88,
        },
        {
          name: 'class 3',
          x: [0.0, 0.1, 0.2, 0.25, 0.28, 0.3, 0.34, 0.36, 0.38, 0.4, 0.42, 0.5, 0.56, 0.6, 0.62, 0.65, 0.8, 0.9, 1.0],
          y: [
            0.1, 0.22, 0.23, 0.26, 0.3, 0.37, 0.5, 0.6, 0.67, 0.78, 0.82, 0.84, 0.85, 0.88, 0.92, 0.93, 0.95, 1.0, 1.0,
          ],
          area: 0.86,
        },
      ],
    },
    {
      id: '112239',
      status: 'ERROR',
    },
    {
      id: '112240',
      metrics: { val: 0.773 },
      status: 'DONE',
      classes: [
        'account_balance',
        'contact',
        'disposable',
        'Interest_rate',
        'loans',
        'mobile',
        'mortgage',
        'overdraft',
        'pay_person',
        'payday',
        'savings_target',
        'smalltalk.target',
        'smalltalk.name',
        'smalltalk.hello',
        'smalltalk.thank',
        'statement',
        'upcoming_bills',
      ],
      cm: [
        [724, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [7, 1326, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [1, 0, 888, 13, 17, 24, 3, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [24, 0, 3, 1229, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [4, 0, 8, 13, 278, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [67, 10, 8, 13, 24, 683, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [34, 10, 8, 13, 17, 32, 497, 0, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [0, 10, 8, 13, 17, 24, 0, 328, 2, 4, 0, 0, 0, 47, 87, 0, 10],
        [1, 10, 8, 13, 17, 24, 32, 2, 876, 4, 0, 0, 0, 47, 87, 0, 10],
        [36, 10, 8, 13, 17, 24, 32, 0, 4, 299, 0, 0, 0, 47, 87, 0, 10],
        [48, 10, 8, 13, 17, 24, 32, 0, 4, 0, 628, 0, 0, 47, 87, 0, 10],
        [11, 10, 8, 13, 17, 24, 32, 0, 2, 0, 0, 389, 0, 47, 87, 0, 10],
        [13, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 445, 47, 87, 0, 10],
        [16, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 2, 0, 947, 87, 0, 10],
        [18, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 99, 47, 756, 0, 10],
        [22, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 845, 8],
        [0, 10, 8, 13, 17, 24, 32, 0, 2, 4, 0, 0, 0, 47, 87, 0, 1000],
      ],
      roc: [
        {
          name: 'class 0',
          x: [0.0, 0.02, 0.06, 0.1, 0.13, 0.18, 0.2, 0.32, 0.34, 0.38, 0.4, 0.5, 0.56, 0.6, 0.62, 0.65, 0.7, 0.75, 1.0],
          y: [
            0.1, 0.22, 0.23, 0.26, 0.3, 0.37, 0.5, 0.6, 0.67, 0.78, 0.82, 0.84, 0.85, 0.88, 0.92, 0.93, 0.95, 1.0, 1.0,
          ],
          area: 0.923,
        },
        {
          name: 'class 1',
          x: [0.0, 0.02, 0.06, 0.1, 0.13, 0.18, 0.2, 0.32, 0.34, 0.38, 0.4, 0.5, 0.56, 0.6, 0.62, 0.65, 0.7, 0.75, 1.0],
          y: [
            0.02, 0.23, 0.26, 0.28, 0.34, 0.36, 0.4, 0.5, 0.6, 0.8, 0.86, 0.88, 0.89, 0.9, 0.92, 0.98, 0.99, 1.0, 1.0,
          ],
          area: 0.99,
        },
        {
          name: 'class 2',
          x: [
            0.0, 0.02, 0.06, 0.1, 0.13, 0.18, 0.2, 0.32, 0.34, 0.38, 0.4, 0.5, 0.56, 0.6, 0.62, 0.65, 0.67, 0.85, 1.0,
          ],
          y: [0.01, 0.2, 0.3, 0.32, 0.34, 0.35, 0.45, 0.5, 0.6, 0.7, 0.8, 0.84, 0.86, 0.9, 0.93, 0.94, 0.95, 1.0, 1.0],
          area: 0.88,
        },
        {
          name: 'class 3',
          x: [0.0, 0.1, 0.2, 0.25, 0.28, 0.3, 0.34, 0.36, 0.38, 0.4, 0.42, 0.5, 0.56, 0.6, 0.62, 0.65, 0.8, 0.9, 1.0],
          y: [
            0.1, 0.22, 0.23, 0.26, 0.3, 0.37, 0.5, 0.6, 0.67, 0.78, 0.82, 0.84, 0.85, 0.88, 0.92, 0.93, 0.95, 1.0, 1.0,
          ],
          area: 0.86,
        },
      ],
    },
  ],
}
// status of the job
// 1 -> 'done', 1 -> 'running', 2 -> 'waiting', 3 -> 'error'
