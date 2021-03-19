const fs = require('fs');

const readStream = fs.createReadStream('./docs/moon3.txt' , {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./docs/moon4.txt');

// readStream.on('data', (chunk)=>{
//     console.log('------- New Chunk -------');
//     console.log(chunk);
//     writeStream.write('\n New Chunkkk \n');
//     writeStream.write(chunk);
// });

//Pipe test
readStream.pipe(writeStream);