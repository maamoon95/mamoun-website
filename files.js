const fs = require ('fs');


//reading files
//fs.readFile('./docs/moon.txt' , (err, data) => {
//    if (err){
      //  console.log(err);
    //}
  //console.log(data.toString());
//});

//writing files
//fs.writeFile('./docs/moon.txt', 'hello mamoon',() =>{
  //  console.log('done');
    
//});
//fs.writeFile('./docs/moon2.txt', 'hello mamoon 2',() =>{
  //  console.log('done2');
    
//});

//Directories
//if (!fs.existsSync('./assets')) {
//fs.mkdir('./assets' , (err) => {
//if(err){
 //   console.log(err);
//}
//console.log('dir created');
//});
//} else {
 //   console.log('file already there');
//}

//Deleting files
if (fs.existsSync('./docs/delete.txt')) {
    fs.unlink('./docs/delete.txt' , (err)=>{
        if(err) {
            console.log(err);
    }
    console.log('deleted');
});

}else {
    console.log('doesnt excist');
}