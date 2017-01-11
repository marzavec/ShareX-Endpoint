/*
  Developer: Marzavec ( https://github.com/marzavec )
  Description: validates & updates user related database information
*/

users = {
  // main app init //
  init: function(){

  },

  //isValid: function(apiKey){ // placeholder for later dev //
  isValid: function(username, password){
    var found = false;

    for(var i = 0, j = sharexConfig.users.length; i < j; i++)
      if(sharexConfig.users[i].user == username && sharexConfig.users[i].pass == password)
        found = true;

    return found;
  }
}
