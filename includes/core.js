/*
  Developer: Marzavec ( https://github.com/marzavec )
  Description: Main app control
*/

core = {
  // main app init //
  init: function(){
    //sqlEngine.init(); // placeholder for later dev //
    httpServerEngine.init();

    console.log(coreConfig.appName + ' initialized');
  }
}
