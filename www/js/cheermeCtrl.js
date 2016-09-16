// This is a JavaScript file


/*
    チャレンジ参加中画面
*/
myApp.controller('cheermeCtrl',function($scope,challenger,$timeout){
    "use strict";
    console.log("cheermeCtrl init!");
    var num = (new Date()).getSeconds() % 2;
    this.img = "img/ouen" + num + ".png"; 
    console.log(this.img);
    this.logout = function(){
        console.log("challengeCtrl logout");
        myNavigator.replacePage('logout.html',{ animation: 'none'});
    };
});
