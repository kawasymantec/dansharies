// This is a JavaScript file

myApp.controller('statusCtrl',function($scope){
    "use strict";
    console.log("statusCtrl init!");

    this.logout = function(){
        console.log("statusCtrl logout");
        myNavigator.replacePage('logout.html',{ animation: 'none'});
    };
    
});
