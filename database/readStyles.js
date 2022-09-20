const fs = require('fs');
const csv = require('csv-parser');

let pId = 1;
let prods = {};
let styles = [];

const readStyls = async () => {
  fs.writeFile('./data/Rstyles.csv', `product_id,styles`, (err) =>
    err ? console.log(err) : null
  );
  fs.createReadStream('./data/styles.csv')
    .pipe(csv())
    .on('data', (data) => {
      prods[data.productId] = { product_id: data.productId };
      if (data.productId !== pId.toString()) {
        prods[pId.toString()].results = styles;
        let toFile =
          `\n${prods[pId.toString()].product_id},"` +
          JSON.stringify(prods[pId.toString()].results) +
          '"';
        fs.appendFileSync('./data/Rstyles.csv', toFile, (err) =>
          err ? console.log(err) : null
        );
        styles.length = 0;
        pId = data.productId;
      }
      styles.push({
        style_id: Number(data.id),
        name: data.name,
        original_price: Number.parseFloat(data.original_price).toFixed(2),
        sale_price: data.sale_price,
        'default?': data.default_style,
      });
      if (data.productId === '1000011' && styles.length === 5) {
        prods[pId.toString()].results = styles;
        let toFile =
          `\n${prods[pId.toString()].product_id},"` +
          JSON.stringify(prods[pId.toString()].results) +
          '"';
        fs.appendFileSync('./data/Rstyles.csv', toFile, (err) =>
          err ? console.log(err) : null
        );
      }
    })
    .on('end', () => {});
};

const fin = async () => {
  console.log('pau');
};

const run = async () => {
  await readStyls();
  await fin();
};

run();
