const http = require('http');
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
  headers: {
    'Content-Type': 'audio/mpeg'
  }
};
const fs = require('fs');
let req = http.request(options, (res) => {
    let file = new Buffer.alloc(0);
    res.on('data', (chunk) => {
        file = Buffer.concat([file, chunk]);
    });
    res.on('end', () => {
        fs.writeFileSync('./audioladattu.mp3', file);
    });
});
req.on('error', (error) => {
  console.error(`problem with request: ${error.message}`);
});
req.end();

function deleteFile(filepath) {
    setTimeout(() => {
        fs.unlink(filepath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err}`);
            } else {
                console.log(`Successfully deleted file: ${filepath}`);
            }
        });
    }, 5000);
}

deleteFile('./audioladattu.mp3');
