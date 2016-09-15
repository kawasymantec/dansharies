// This is a JavaScript file

/*
    ログイン画面
*/
myApp.controller('loginCtrl',function($scope,challenger){
    "use strict";
    console.log("loginCtrl init!");
    this.username = "";
    this.password = "";

    //ログイン
    this.login = function(){
        console.log("loginCtrl login");
        challenger.login(this.username,this.password,function(){
            //成功
            myNavigator.replacePage('top.html',{ animation: 'none'});
        },function(){
            //失敗
//            myNavigator.replacePage('challenge.html',{ animation: 'none'});            
        });
        
    };
    
    //ユーザ登録画面へ
    this.regist = function(){
        console.log("loginCtrl regist");
        myNavigator.pushPage('regist.html',{ animation: 'lift'});
    };
});

/*
    ログアウト画面
*/
myApp.controller('logoutCtrl',function($scope,challenger,$timeout){
    "use strict";
    console.log("logoutCtrl init!");
    challenger.logout();
    $timeout(function() {
        myNavigator.replacePage('top.html',{ animation: 'none'});        
    },300);
});

