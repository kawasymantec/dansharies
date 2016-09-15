// This is a JavaScript file



/*
    ユーザ登録画面
*/
myApp.controller('registCtrl',function($scope,challenger){
    "use strict";
    console.log("registCtrl init!");
    this.username = "";
    this.password = "";
    this.regist = function(){
        console.log("registCtrl regist");
        challenger.signUp(this.username,this.password,function(){
            myNavigator.replacePage('top.html',{ animation: 'none'});
        },function(){
        });
        //参加待ち状態のチャレンジがある
        //なにもない
//            myNavigator.replacePage('status.html',{ animation: 'none'});
    };
});


