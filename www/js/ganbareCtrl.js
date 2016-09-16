// This is a JavaScript file

myApp.controller('ganbareCtrl',function($scope,$timeout){
    "use strict";
    console.log("ganbareCtrl init!");
    $timeout(function() {
        myNavigator.replacePage('challenge.html',{ animation: 'none'});        
    },2000);
});