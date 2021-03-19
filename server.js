const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const _= require('lodash')
//const mime = require('mime');
//

// const server = http.createServer((req, res)=> {
//     console.log(req.url, req.method);
//     const ext = req.url;
//     var extension = path.extname(ext);
//     //set header
//     const num = _.random(0, 20);
//     console.log(num);
//     //  res.write('<!doctype html><html lang="en"><head><title>tutorial number 4</title><meta name="description" content="tutorial"><meta name="author" content="Mamoun Hourani"><link rel="stylesheet" href="#"></head>');
//     // res.write('<body>');
//     // res.write('<p>hello mamoon</p>');
//     // res.write('<p>this is your first test on node js using html5 and nodejs</p>')
//     // res.write('</body></html>');
//     // res.end();
//     fs.readFile('./view/index.html', (err, data) => {
//        // res.setHeader('content-type', 'text/html');
//        if (err) {
//            console.log(err);
//            res.end();
//        } else {
//            if (extension === '.css') {
//                res.setHeader('content-type', 'text/css');
//            }
//            else if (extension === '.js') {
//                res.setHeader('content-type', 'text00/javascript');
//               // console.log('javascript enable');
//            }
//            else if (extension === '.html') {
//                res.setHeader('content-type', 'text/html');
//            }
//            else if (extension === '.jpg') {
//             res.setHeader('content-type', 'image/jpeg');
//         }
           
//            //res.write(data);
//            res.end(data);
//         }
//     });

// });

// server.listen(3000, 'localhost', () => {
//     console.log('listening for request on 3000');

// });
// console.log('hi there');