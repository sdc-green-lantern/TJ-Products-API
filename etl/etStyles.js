const fs = require('fs');
const csv = require('csv-parser');

const etStyles = (client) => {
  let styles = [];
  fs.createReadStream('./data/styles.csv')
    .pipe(csv())
    .on('data', (data) => {
      styles.push(data);
    })
    .on('end', () => {
      let writeStyles = 'id,name,sale_price,default_sty,product_id';
      for (const style of styles) {
        writeStyles +=
          '\n' +
          style.id +
          ',"' +
          style.name +
          '",' +
          (style.sale_price === 'null' ? null : style.sale_price) +
          ',' +
          style.default_style + // might need to change to true false
          ',' +
          style.productId;
      }
      fs.writeFile('./data/etlStyles.csv', writeStyles, (err) => {
        err ? console.log(err) : console.log('styles written');
      });
    });
};

module.exports = { etStyles };
