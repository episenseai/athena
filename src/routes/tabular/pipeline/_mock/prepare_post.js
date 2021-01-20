export default {
  stage: 'prepare:POST',
  data: {
    rows: 12389,
    target: 8,
    nextAvialableId: '25',
    cols: [
      {
        id: '1',
        name: 'company_permalink',
        type: 'Text',
        imputable: false,
      },
      {
        id: '2',
        name: 'company_name',
        type: 'Category',
        imputable: true,
      },
      {
        id: '3',
        name: 'company_profit',
        type: 'Number',
        imputable: true,
      },
    ],
  },
}
