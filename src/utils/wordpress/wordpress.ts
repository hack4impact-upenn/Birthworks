var fs = require('fs');
const csv = require('csv-parser');
const path = './members.csv';

fs.createReadStream(path)
  .pipe(csv())
  .on('data', function (data) {
    try {
      console.log(data);

      //perform the operation
    } catch (err) {
      //error handler
    }
  })
  .on('end', function () {
    //some final operation
  });
