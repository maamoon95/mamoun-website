// handle errors
function handleErrors (req,res,err,errord) {
    //console.log(err);
    return res.status(500).json ({errord})
  const errorcode = err.parent.code;
  
    if (errorcode == 23505) {
      
      res.json(error = err.parent.code)

    } else {
       res.json (err)
    }
  

 
}
module.exports = { handleErrors };