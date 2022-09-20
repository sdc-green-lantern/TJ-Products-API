const fs = require('fs');
const csv = require('csv-parser');

let pId = 1;
let rp = [];

const readProds = () => {
  fs.writeFileSync(
    './data/Rrelated_products.csv',
    `product_id,related_products`,
    (err) => (err ? console.log(err) : null)
  );
  fs.createReadStream('./data/related.csv')
    .pipe(csv())
    .on('data', (data) => {
      if (data.current_product_id !== pId.toString()) {
        let toFile = '\n' + pId + ',"[' + rp + ']"';
        fs.appendFileSync('./data/Rrelated_products.csv', toFile, (err) => {
          err ? console.log(err) : null;
        });
        rp.length = 0;
        pId = data.current_product_id;
      }
      rp.push(data.related_product_id);
      if (data.current_product_id === '1000011' && rp.length === 6) {
        let toFile = '\n' + pId + ',"' + JSON.stringify(rp) + '"';
        fs.appendFileSync('./data/Rrelated_products.csv', toFile, (err) => {
          err ? console.log(err) : null;
        });
      }
    })
    .on('end', () => {
      console.log('pau');
    });
};

readProds();
