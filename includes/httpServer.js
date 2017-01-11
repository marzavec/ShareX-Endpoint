/*
  Developer: Marzavec ( https://github.com/marzavec )
  Description: handles http(s) requests and incoming file handling
*/

httpServerEngine = {
  // class properties //
  mainHttp: null,

  // main app init //
  init: function(){
    if(coreConfig.useSSL){
      this.mainHttp = httpsServer;

      var httpsOptions = {
        key: fileSys.readFileSync(coreConfig.privateKey),
        cert: fileSys.readFileSync(coreConfig.certificate)
      };

      this.mainHttp.createServer(httpsOptions, function(request, response){
        httpServerEngine.onRequest(request, response);
      }).listen(coreConfig.localPort);
    }else{
      this.mainHttp = httpServer;

      this.mainHttp.createServer(function(request, response){
        httpServerEngine.onRequest(request, response);
      }).listen(coreConfig.localPort);
    }
  },

  onRequest: function(request, response){
    //request.hasFailed = true;

    if(request.method == 'GET'){
      this.closeTransaction(request, response);
      return;
    }

    var parser = new clientDataParser.IncomingForm();

    parser.on('field', function(name, value){
      if(name == 'user') request.username = value;
      if(name == 'pass') request.password = value;
    });

    parser.on('file', function(name, file){
      // user verification //
      if(
        typeof request.username === 'undefined' ||
        typeof request.password === 'undefined' ||
        users.isValid(request.username, request.password) === false
      ){
        fileSys.unlink(file.path, function(){});
        request.hasFailed = true;
        httpServerEngine.closeTransaction(request, response);

        return;
      }

      // file verification //
      var type = null;
      var fileDesc = fileSys.openSync(file.path, 'r');
      var magicNumBuff = new Buffer(4);
      var c = fileSys.readSync(fileDesc, magicNumBuff, 0, 4, 0);
      switch(magicNumBuff.toString('hex')){
        case 'ffd8ffe0': // jpg //
          type = 'jpg';
        break;
        case '89504e47': // png //
          type = 'png';
        break;
        case '47494638': // gif //
          type = 'gif';
        break;
      }

      if(type === null){
        fileSys.unlink(file.path, function(){});
        request.hasFailed = true;
        httpServerEngine.closeTransaction(request, response);

        return;
      }

      // store & continue //
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1;
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();

      var namePre = year.toString() + '-' + month.toString() + '-' + day.toString();

      var newPath = sharexConfig.storagePath + '/' + namePre + '.' + type;
      var newName = sharexConfig.accessUri + '/' + namePre + '.' + type;

      if(fileSys.existsSync(newPath)){
        var i = 1;
        while(fileSys.existsSync(newPath)){
          newPath = sharexConfig.storagePath + '/' + namePre + '-' + i.toString()  + '.' + type;
          newName = sharexConfig.accessUri + '/' + namePre + '-' + i.toString() + '.' + type;
          i++;
        }
      }

      request.fileUri = newName;
      fileSys.renameSync(file.path, newPath);
    });

    parser.on('error', function(err){
      request.hasFailed = true;
      httpServerEngine.closeTransaction(request, response);
    });

    parser.on('aborted', function(){
      request.hasFailed = true;
      httpServerEngine.closeTransaction(request, response);
    });

    parser.on('end', function(){
      if(typeof request.hasFailed === 'undefined') request.hasFailed = false;
      httpServerEngine.closeTransaction(request, response);
    });

    parser.parse(request);
  },

  closeTransaction: function(request, response){
    if(request.hasFailed){
      response.writeHead(200);
      response.end('');
    }else{
      response.writeHead(200, {
        Location: request.fileUri
      });
      response.end('');
    }
  }
}
