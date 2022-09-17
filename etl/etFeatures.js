const fs = require('fs');
const csv = require('csv-parser');

const etFeatures = (client) => {
  let features = [];
  fs.createReadStream('./data/features.csv', { encoding: 'utf8' })
    .pipe(csv())
    .on('data', (data) => features.push(data))
    .on('end', () => {
      let writeFeat = 'id,feature,value';
      let writePF = 'id,product_id,feature_id';
      for (const feature of features) {
        writeFeat +=
          '\n' +
          feature.id +
          ',"' +
          feature.feature +
          '","' +
          feature.value +
          '"';
        writePF +=
          '\n' + feature.id + ',' + feature.id + ',' + feature.product_id;
      }
      fs.writeFile('./data/etlFeatures.csv', writeFeat, (err) => {
        err ? console.log(err) : console.log('features written');
      });
      fs.writeFile('./data/etlProducts_Features.csv', writePF, (err) => {
        err ? console.log(err) : console.log('products_features written');
      });
    });
};

module.exports = { etFeatures };
