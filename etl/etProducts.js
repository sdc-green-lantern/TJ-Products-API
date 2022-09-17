const fs = require('fs');
const csv = require('csv-parser');

const etProducts = (client) => {
  let products = [];
  let categories = new Set();
  let cats = {};
  fs.createReadStream('./data/product.csv')
    .pipe(csv())
    .on('data', (data) => {
      products.push(data);
      categories.add(data.category);
    })
    .on('end', () => {
      let writeCat = 'id,name';
      let id = 1;
      for (const category of categories) {
        writeCat += '\n' + id + ',"' + category + '"';
        cats[category] = id;
        id++;
      }
      fs.writeFile('./data/etlCategories.csv', writeCat, (err) => {
        err ? console.log(err) : console.log('categories written');
      });
      let writeProds = 'id,name,slogan,description,default_price,category_id';
      for (const product of products) {
        writeProds +=
          '\n' +
          product.id +
          ',"' +
          product.name +
          '","' +
          product.slogan +
          '","' +
          product.description +
          '",' +
          product.default_price +
          ',' +
          cats[product.category];
      }
      fs.writeFile('./data/etlProducts.csv', writeProds, (err) => {
        err ? console.log(err) : console.log('products written');
      });
    });
};

module.exports = { etProducts };
