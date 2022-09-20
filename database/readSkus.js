const fs = require('fs');
const csv = require('csv-parser');

let sId = 1;
let styles = {};
let skus = {};

const readSkus = () => {
  fs.writeFileSync('./data/Rskus.csv', `sku_id,skus`, (err) =>
    err ? console.log(err) : null
  );
  fs.createReadStream('./data/skus.csv')
    .pipe(csv())
    .on('data', (data) => {
      if (data.styleId !== sId.toString()) {
        styles[sId] = skus;
        let toFile =
          `\n${Number(sId)},~` + JSON.stringify(styles[sId.toString()]) + '~';
        fs.appendFileSync('./data/Rskus.csv', toFile, (err) =>
          err ? console.log(err) : null
        );
        skus = {};
        sId = data.styleId;
      }
      skus[data.id] = { quantity: data.quantity, size: data.size };
      if (data.styleId === '1958102' && Object.keys(skus).length === 11) {
        styles[sId] = skus;
        let toFile =
          `\n${Number(sId)},~` + JSON.stringify(styles[sId.toString()]) + '~';
        fs.appendFileSync('./data/Rskus.csv', toFile, (err) =>
          err ? console.log(err) : null
        );
      }
    })
    .on('end', () => console.log('pau'));
};

readSkus();
