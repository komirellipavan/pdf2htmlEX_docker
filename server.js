'use strict';

const express = require('express');
const { execFile } = require('child_process');
var formidable = require('formidable');
const fs = require('fs');
const path = require('path');
var onFinished = require('on-finished')

// Constants
const PORT = 4000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('pdf2htmlEX');

});

// Add a health check route in express
app.get('/_health', (req, res) => {
  res.status(200).send('ok')
})

//Reads pdf file from post
//Exectes  pdf2htmlEX app
//API PARAMS: pdf = "file.pdf" - form-data
const pdf = express();
app.post('/pdfupload', (req, res) => {

  const form = formidable({ keepExtensions : true });
 try{
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    if(files.pdf === undefined){
      res.status(401).send("Invalid Path");
      return;
    }else{
      console.log(files.pdf);
      html2pdf(files.pdf.path,res);
    }
   

  });}
  catch(x){
    console.log(x);
  }
});


function html2pdf(filepath,res){
   execFile('./pdf2htmlEX_run',[filepath], (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
  
    if (stderr) {
      console.error(`stderr: ${stderr}`);

      var fileName = filepath.substring(4, filepath.length - 4);

      console.log(fileName);
      const _filepath = path.join(__dirname, fileName);
      res.sendFile(_filepath + '.html');
      onFinished(res, function (err, res) {
        // clean up open fds, etc.
        // err contains the error if request error'd
        delFile(filepath,pdf);
        console.log(err);
      })
      
      return;
    }

    //console.log(`stdout:\n${stdout}`);
  });

} 

//Remove html file from directory after sending response
function delFile(filepath){

  var fileName = filepath.substring(5, filepath.length - 4);
  try {
    //file removed
    fs.unlinkSync(fileName + '.html')
    fs.unlinkSync(filepath);
    console.log("Del");
    
  } catch(err) {
    console.error(err)
  }

}

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

