export default {
  stage: 'transform:POST',
  data: {
    rows: 3000,
    target: 6,
    features: [
      {
        id: 1,
        name: 'Item_Identifier',
        weight: 1,
        include: true,
        origin: 'native',
        type: 'Category',
      },
      {
        id: 2,
        name: 'Item_Weight',
        weight: 0.8,
        include: true,
        origin: 'native',
        type: 'Number',
      },
    ],
  },
}
