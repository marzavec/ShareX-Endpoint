/*
  Developer: Marzavec ( https://github.com/marzavec )
  Description: Main entry point for your project. Sets process title, imports
               node classes, creates log folder if needed, imports all js files
               from default directories. Then runs the initialization functions
*/

// import node classes //
fileSys = require('fs');
httpServer = require('http');
httpsServer = require('https');
clientDataParser = require('formidable');
// mysql = require("mysql"); // placeholder for later dev //

// create log folder //
if(!fileSys.existsSync('./logs')){
  fileSys.mkdirSync('./logs');
}

// main import function //
// blocking function used to make sure everything is imported before init()s //
var importDirectory = function(targetDir){
  var fileList = fileSys.readdirSync(targetDir);
  fileList.forEach(function(targetFile){
    if(targetFile.substr(-3) == '.js'){
      targetFile = targetDir + targetFile;
      if(!fileSys.lstatSync(targetFile).isDirectory()) require(targetFile);
    }
  });
}

// import server configs //
importDirectory('./configs/');

// import server classes //
importDirectory('./includes/');

// initialize //
core.init();

// set process title //
process.title = coreConfig.appName;
