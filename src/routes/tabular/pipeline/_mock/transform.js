export default {
  stage: 'transform:GET',
  data: {
    rows: 3000,
    target: 6,
    // id: unique id assigned to the feature

    // weight: between 0 to 1, of the importance of the feature in prediction

    // include: whether to include that feature to train the model

    // origin: one of ['native', 'derived']
    //   'native': comes from columns in the file uploaded
    //   'derived': comes from a combination of other native features through transformation

    // 20-quantiles also called vigintiles: Q1, Q2, ..., Q19
    // Q-5(25%), Q-10 (50% = median), Q-15(75%)

    // bins - histogram of frequency distribution

    // correlation: correlation with the target variable
    features: [
      {
        id: 1,
        name: 'Item_Identifier',
        weight: 1,
        include: true,
        origin: 'native',
        type: 'Category',
        stats: {
          unique: 1559,
          bins: {
            breaks: ['FDG33', 'FDW13', 'DRE49', 'DRN47', 'FDD38', 'FDF52', 'Others Values/Bins'],
            counts: [10, 10, 9, 9, 9, 9, 8467],
          },
          missing: 10,
        },
      },
      {
        id: 2,
        name: 'Item_Weight',
        weight: 1,
        include: true,
        origin: 'native',
        type: 'Number',
        stats: {
          mean: 12.858,
          median: 12.6,
          std: 2.2,
          min: 4.555,
          max: 21.35,
          missing: 1463,

          quantile: [
            5.945, 6.695, 7.42, 8.02, 8.77375, 9.3, 10.195, 11.1, 11.85, 12.6, 13.5, 14.5, 15.25,
            16.1, 16.85, 17.7, 18.6, 19.35, 20.25, 21.35,
          ],

          bins: {
            breaks: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
            counts: [
              49, 324, 480, 548, 547, 472, 391, 391, 499, 408, 338, 490, 418, 463, 379, 404, 406,
              53,
            ],
          },

          correlation: 2.8,
        },
      },
      {
        id: 3,
        name: 'Item_Fat_Content',
        weight: 0.96,
        include: true,
        origin: 'native',
        type: 'Category',
        stats: {
          unique: 5,
          bins: {
            breaks: ['LF', 'low_fat', 'Low Fat', 'reg', 'Regular'],
            counts: [316, 112, 5089, 117, 2889],
          },
          missing: 0,
        },
      },
      {
        id: 4,
        name: 'Item_Visibility',
        weight: 0.28,
        include: true,
        origin: 'native',
        type: 'Number',
        stats: {
          mean: 0.06613,
          median: 0.05393,
          std: 2.2,
          min: 0.0,
          max: 0.32839,
          missing: 0,

          quantile: [
            0.0, 0.01204177, 0.01726609, 0.02255804, 0.02698948, 0.03195637, 0.03666295, 0.04175434,
            0.04705685, 0.05393093, 0.06070043, 0.06795815, 0.07595795, 0.08345606, 0.09458529,
            0.10692443, 0.12181322, 0.1395144, 0.16377976, 0.32839095,
          ],

          bins: {
            breaks: [
              0.0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2, 0.22, 0.24, 0.26, 0.28,
            ],
            counts: [1465, 1809, 1384, 1123, 812, 589, 499, 341, 273, 94, 37, 30, 21, 14, 20, 9, 3],
          },

          correlation: 20,
        },
      },
      {
        id: 5,
        name: 'Item_Type',
        weight: 0.75,
        include: true,
        origin: 'native',
        type: 'Category',
        stats: {
          unique: 16,
          bins: {
            breaks: [
              'Fruits and Vegetables',
              'Snack Foods',
              'Household',
              'Frozen Foods',
              'Dairy',
              'Canned',
              'Others Values/Bins',
            ],
            counts: [1232, 1200, 910, 856, 682, 649, 2994],
          },
          missing: 0,
        },
      },
      {
        id: 6,
        name: 'Item_MRP',
        weight: 1,
        include: true,
        origin: 'native',
        type: 'Number',
        stats: {
          mean: 140.99,
          median: 143.01,
          std: 2.2,
          min: 31.29,
          max: 266.89,
          missing: 0,

          quantile: [
            42.5167, 52.7956, 63.98706, 84.68924, 93.8265, 102.1332, 110.3228, 118.76504, 126.1704,
            143.0128, 150.7366, 159.43252, 169.2816, 177.7828, 185.6437, 194.48572, 213.47812,
            231.20048, 250.76924, 266.8884,
          ],

          bins: {
            breaks: [
              30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
              210, 220, 230, 240, 250, 260, 270,
            ],
            counts: [
              318, 439, 384, 200, 215, 413, 470, 517, 522, 522, 119, 530, 497, 420, 535, 507, 475,
              78, 223, 256, 227, 212, 259, 185,
            ],
          },

          correlation: 2.5,
        },
      },
      {
        id: 7,
        name: 'Outlet_Identifier',
        weight: 1,
        include: true,
        origin: 'native',
        type: 'Category',
        stats: {
          unique: 16,
          bins: {
            breaks: [
              'Fruits and Vegetables',
              'Snack Foods',
              'Household',
              'Frozen Foods',
              'Dairy',
              'Canned',
              'Others Values/Bins',
            ],
            counts: [1232, 1200, 910, 856, 682, 649, 2994],
          },
          missing: 20,
        },
      },
      {
        id: 8,
        name: 'Outlet_Establishment_Year',
        weight: 0.23,
        include: true,
        origin: 'native',
        type: 'Number',
        stats: {
          mean: 140.99,
          median: 143.01,
          std: 2.2,
          min: 31.29,
          max: 266.89,
          missing: 0,

          quantile: [
            42.5167, 52.7956, 63.98706, 84.68924, 93.8265, 102.1332, 110.3228, 118.76504, 126.1704,
            143.0128, 150.7366, 159.43252, 169.2816, 177.7828, 185.6437, 194.48572, 213.47812,
            231.20048, 250.76924, 266.8884,
          ],

          bins: {
            breaks: [
              30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
              210, 220, 230, 240, 250, 260, 270,
            ],
            counts: [
              318, 439, 384, 200, 215, 413, 470, 517, 522, 522, 119, 530, 497, 420, 535, 507, 475,
              78, 223, 256, 227, 212, 259, 185,
            ],
          },

          correlation: 1,
        },
      },
      {
        id: 9,
        name: 'Outlet_Size',
        weight: 0.67,
        include: true,
        origin: 'native',
        type: 'Category',
        stats: {
          unique: 16,
          bins: {
            breaks: [
              'Fruits and Vegetables',
              'Snack Foods',
              'Household',
              'Frozen Foods',
              'Dairy',
              'Canned',
              'Others Values/Bins',
            ],
            counts: [119, 530, 497, 420, 535, 507, 475],
          },
          missing: 20,
        },
      },
      {
        id: 10,
        name: 'Outlet_Location_Type',
        weight: 0.8,
        include: true,
        origin: 'native',
        type: 'Category',
        stats: {
          unique: 16,
          bins: {
            breaks: ['FDG33', 'FDW13', 'DRE49', 'DRN47', 'FDD38', 'FDF52', 'Others Values/Bins'],
            counts: [522, 119, 530, 497, 420, 535, 507],
          },
          missing: 20,
        },
      },
      {
        id: 11,
        name: 'Outlet_Type',
        weight: 0.92,
        include: true,
        origin: 'native',
        type: 'Category',
        stats: {
          unique: 16,
          bins: {
            breaks: [
              'Fruits and Vegetables',
              'Snack Foods',
              'Household',
              'Frozen Foods',
              'Dairy',
              'Canned',
              'Others Values/Bins',
            ],
            counts: [318, 439, 384, 200, 215, 413, 470],
          },
          missing: 20,
        },
      },
      {
        id: 12,
        name: 'Item_Outlet_Sales',
        weight: 1,
        include: true,
        origin: 'native',
        type: 'Number',
        stats: {
          mean: 140.99,
          median: 143.01,
          std: 2.2,
          min: 31.29,
          max: 266.89,
          missing: 0,

          quantile: [
            42.5167, 52.7956, 63.98706, 84.68924, 93.8265, 102.1332, 110.3228, 118.76504, 126.1704,
            143.0128, 150.7366, 159.43252, 169.2816, 177.7828, 185.6437, 194.48572, 213.47812,
            231.20048, 250.76924, 266.8884,
          ],

          bins: {
            breaks: [
              30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
              210, 220, 230, 240, 250, 260, 270,
            ],
            counts: [
              318, 439, 384, 200, 215, 413, 470, 517, 522, 522, 119, 530, 497, 420, 535, 507, 475,
              78, 223, 256, 227, 212, 259, 185,
            ],
          },

          correlation: 2.2,
        },
      },
    ],
  },
}
