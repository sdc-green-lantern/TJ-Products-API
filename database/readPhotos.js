const fs = require('fs');
const csv = require('csv-parser');

let sId = 1;
let styles = {};
let photos = [];

const readPhotos = () => {
  fs.writeFileSync('./data/Rphotos.csv', `style_id,photos`, (err) =>
    err ? console.log(err) : null
  );
  fs.createReadStream('./data/photos.csv')
    .pipe(csv())
    .on('data', (data) => {
      if (data.styleId !== sId.toString()) {
        let toFile = `\n${sId},~` + JSON.stringify(photos) + '~';
        fs.appendFileSync('./data/Rphotos.csv', toFile, (err) =>
          err ? console.log(err) : null
        );
        photos.length = 0;
        sId = data.styleId;
      }
      photos.push({ thumbnail_url: data.thumbnail_url, url: data.url });
      if (data.styleId === '1958102' && photos.length === 4) {
        console.log(data.styleId);
        console.log(photos);
        let toFile = `\n${sId},~` + JSON.stringify(photos) + '~';
        fs.appendFileSync('./data/Rphotos.csv', toFile, (err) =>
          err ? console.log(err) : null
        );
      }
    })
    .on('end', () => console.log('pau'));
};

readPhotos();
