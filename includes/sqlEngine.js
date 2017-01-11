/*
  Developer: Marzavec ( https://github.com/marzavec )
  Description: maintain connection and interaction objects
*/

sqlEngine = {
  sqlCon: null,
  sqlConnected: false,

  init: function(){
    this.sqlCon = mysql.createConnection({
      host     : sqlConfig.sqlHost,
      user     : sqlConfig.sqlUser,
      password : sqlConfig.sqlPass,
      database : sqlConfig.sqlDb
    });

    this.sqlCon.on('error', this.yolo);

    this.sqlCon.connect(function(err){
    	if(err != undefined && err != ''){
    		console.log('SQL Connection Error: ' + err);
    		logEngine.add('SQL', err);
        process.exit(1);
    	}else{
    		this.sqlConnected = true;
    	}
    });
  },

  yolo: function(errInfo){
    // yolo error handling //
    sqlEngine.init();
  },

  temp: function(){

  }
}
