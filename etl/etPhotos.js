const fs = require('fs');
const csv = require('csv-parser');

const etPhotos = (client) => {
  let photos = [];
  fs.createReadStream('./data/photos.csv')
    .pipe(csv())
    .on('data', (data) => {
      if (data.thumbnail_url.includes('\n')) {
        let obj = {
          id: data.id,
          styleId: data.styleId,
          url: data.url,
          thumbnail_url: data.thumbnail_url.substring(
            0,
            data.thumbnail_url.indexOf('\n')
          ),
        };
        console.log(
          data.thumbnail_url.substring(0, data.thumbnail_url.indexOf('\n'))
        );
        console.log('-----------------');
        console.log(
          data.thumbnail_url.substring(data.thumbnail_url.indexOf('\n') + 1)
        );
        photos.push(obj);
        let array = data.thumbnail_url
          .substring(data.thumbnail_url.indexOf('\n') + 1)
          .split(',');
        let obj2 = {
          id: array[0],
          styleId: array[1],
          url: array[2] + '"',
        };
        photos.push(obj2);
      } else {
        photos.push(data);
      }
    })
    .on('end', () => {
      console.log(photos.length);
      // let writePhotos = 'id,style_id,url,thumbnail_url';
      // fs.writeFileSync('./data/etlPhotos.csv', writePhotos, (err) => {
      //   err ? console.log(err) : console.log('header written');
      // });

      // for (const photo of photos) {
      //   let writePhotosLine =
      //     '\n' + photo.id + ',' + photo.styleId + ',"' + photo.url + '"';
      //   if ('thumbnail_url' in photo)
      //     writePhotosLine += ',"' + photo.thumbnail_url + '"';
      //   fs.appendFileSync('./data/etlPhotos.csv', writePhotosLine, (err) => {
      //     err ? console.log(err) : null;
      //   });
      // }
      console.log('pau');
    });
};

module.exports = { etPhotos };
