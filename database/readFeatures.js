const fs = require('fs');
const csv = require('csv-parser');

let pId = 1;
let prods = {};
let feat = [];

const readFeats = async () => {
  fs.writeFile(
    './data/Rfeatures.csv',
    `id,name,slogan,description,category,default_price,features`,
    (err) => (err ? console.log(err) : null)
  );
  fs.createReadStream('./data/product.csv')
    .pipe(csv())
    .on('data', (data) => {
      prods[data.id] = data;
    })
    .on('end', () => {
      fs.createReadStream('./data/features.csv')
        .pipe(csv())
        .on('data', (data) => {
          if (data.product_id !== pId.toString()) {
            prods[pId.toString()].features = feat;
            let toFile =
              `\n${prods[pId.toString()].id},"${prods[pId.toString()].name}","${
                prods[pId.toString()].slogan
              }","${prods[pId.toString()].description}","${
                prods[pId.toString()].category
              }",${prods[pId.toString()].default_price},"` +
              JSON.stringify(prods[pId.toString()].features) +
              '"';
            fs.appendFileSync('./data/Rfeatures.csv', toFile, (err) =>
              err ? console.log(err) : null
            );
            feat.length = 0;
            pId += 1;
          }
          feat.push({ feature: data.feature, value: data.value });
        })
        .on('end', () => {
          console.log(pId.toString());
          console.log(prods[pId.toString()]);
          console.log(feat);
        });
    });
};

const fin = async () => {
  console.log('pau');
};

const run = async () => {
  await readFeats();
  await fin();
};

run();
