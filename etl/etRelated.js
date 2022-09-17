const fs = require('fs');
const csv = require('csv-parser');

const etRelated = (client) => {
  let related = [];
  fs.createReadStream('./data/related.csv')
    .pipe(csv())
    .on('data', (data) => {
      related.push(data);
    })
    .on('end', () => {
      let writeRelated = 'id,product_id,related_product_id';
      for (const relate of related) {
        if (relate.related_product_id !== '0') {
          writeRelated +=
            '\n' +
            relate.id +
            ',' +
            relate.current_product_id +
            ',' +
            relate.related_product_id;
        }
      }
      fs.writeFile('./data/etlRelated.csv', writeRelated, (err) => {
        err ? console.log(err) : console.log('related written');
      });
    });
};

module.exports = { etRelated };
