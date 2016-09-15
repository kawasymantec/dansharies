// This is a JavaScript file

myApp.controller('idleCtrl',function($scope){
    "use strict";
    console.log("idleCtrl init!");

    this.logout = function(){
        console.log("entryCtrl logout");
        myNavigator.replacePage('logout.html',{ animation: 'none'});
    };
    
});
