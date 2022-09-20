const fs = require('fs');
const csv = require('csv-parser');

let pId = 1;
let rp = [];

const readProds = async () => {
  fs.createReadStream('./data/related.csv')
    .pipe(csv())
    .on('data', (data) => {
      if (data.current_product_id === pId.toString()) {
        rp.push(data.related_product_id);
      }
      if (data.current_product_id !== pId.toString()) {
        let toFile = '\n' + pId + ',"[' + rp + ']"';
        if (pId % 1000 === 0) console.log(pId);
        fs.appendFileSync('./data/Rrelated_products.csv', toFile, (err) => {
          err ? console.log(err) : null;
        });
        rp.length = 0;
        pId += 1;
      }
    })
    .on('end', () => {
      console.log('pau');
    });
  // db.query(`
  //   UPDATE read_products
  //   SET related_products='${JSON.stringify(rows[0].related_products)}'
  //   WHERE id=${i}
  // `);
};

const readFeats = async () => {
  // 1,000,012
  for (let i = 1; i <= 1000012; i++) {
    if (i % 1000 === 0) console.log(i);
    await db
      .query(
        `SELECT array_agg(json_build_object('feature',f.feature, 'value',f.value)) features
        FROM features f
        JOIN products_features pf ON f.id=pf.feature_id
        JOIN products p ON pf.product_id=p.id WHERE p.id=${i}`
      )
      .then(({ rows }) => {
        // console.log(JSON.stringify(rows[0].features));
        db.query(`
          UPDATE read_products
          SET features='${JSON.stringify(rows[0].features)}'
          WHERE id=${i}
        `);
      })
      .catch((err) => console.log(err));
  }
};

const readStyls = async () => {
  // 1,000,012
  for (let i = 1; i <= 1000012; i++) {
    if (i % 1000 === 0) console.log(i);
    await db
      .query(
        `SELECT prod.id product_id,
      (
        SELECT array_agg(json_build_object(
          'style_id', s.id,
          'name', s.name,
          'original_price', prod.default_price,
          'sale_price', s.sale_price,
          'default?', s.default_sty,
          'photos', (SELECT array_agg(json_build_object(
            'thumbnail_url', phot.thumbnail_url,
            'url', phot.url
            ))
            FROM photos phot
            WHERE phot.style_id=s.id
          ),
          'skus', (
            SELECT json_object_agg(sku, (
              SELECT json_build_object('quantity',quantity,'size',size)
              FROM skus sku1
              WHERE sku1.sku=sku2.sku))
            FROM skus sku2
            WHERE sku2.style_id=s.id)
        ))
        FROM styles s
        WHERE s.product_id=${i}
      ) results
    FROM products prod
    WHERE prod.id=${i}`
      )
      .then(({ rows }) => {
        // console.log(JSON.stringify(rows[0].results));
        db.query(`
          UPDATE read_products
          SET styles='${JSON.stringify(rows[0].results)}'
          WHERE id=${i}
        `);
      })
      .catch((err) => console.log(err));
  }
};

const fin = () => {
  console.log('pau');
};

const run = async () => {
  await readProds();
  await fin();
  // await readFeats();
  // await fin();
  // await readStyls();
  // await fin();
};

run();
