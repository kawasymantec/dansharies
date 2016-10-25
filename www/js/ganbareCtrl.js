// This is a JavaScript file

myApp.controller('ganbareCtrl',function($scope,challenger,$timeout){
    "use strict";
    console.log("ganbareCtrl init!");

    /********************************************************/
    // 西島：色々なページでLvを取得するための機構
    var target = this;
    challenger.getAvatorStatus(function(avatorStatus){
        $timeout(function() {
            var lvData          = challenger.calcLv(avatorStatus.mainCurrent);
            target.lv           = lvData.lv;

            $timeout(function() {
                myNavigator.replacePage('challenge.html',{ animation: 'none'});        
            },2000);
        },100);
    },function(err){
        console.log(err);
        //$timeout(function() {},100);
        $timeout(function() {
            myNavigator.replacePage('challenge.html',{ animation: 'none'});        
        },2000);
    });
    /********************************************************/
    
});