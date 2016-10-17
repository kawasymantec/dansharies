// This is a JavaScript file

myApp.controller('topCtrl',function($scope,challenger,$timeout){
    "use strict";
    console.log("topCtrl init!");
    this.username = "";
    this.password = "";
    /*
        ディスパッチャー
    */
    if(challenger.isLogin()){
        console.log("ログイン済み");
        challenger.getStatus(function(status){
            switch(status){
            case 'Wait':    //ミッション待ち
                console.log("topCtrl init...wait");
                $timeout(function() {
                    myNavigator.replacePage('entry.html',{ animation: 'none'});
                    // 西島デバッグ用
                    //myNavigator.replacePage('status.html',{ animation: 'none'});
                },100);
                break;
            case 'Challenge':    //ミッション挑戦中
                console.log("topCtrl init...Challenge");
                $timeout(function() {
                    myNavigator.replacePage('challenge.html',{ animation: 'none'});        
                },100);
                break;
            case 'Finish':    //挑戦終了
                console.log("topCtrl init...Finish");
                $timeout(function() {
                    myNavigator.replacePage('resultentry.html',{ animation: 'none'});        
                },100);
                break;
            case 'Success':    //挑戦成功
                console.log("topCtrl init...Success");
                $timeout(function() {
                    myNavigator.replacePage('success.html',{ animation: 'none'});        
                },100);
                break;
            case 'Failed':    //挑戦失敗
                console.log("topCtrl init...Failed");
                $timeout(function() {
                    myNavigator.replacePage('failure.html',{ animation: 'none'});        
                },100);
                break;
            case 'Idle':    //チャレンジすべきものがない
                console.log("topCtrl init...Idle");
                $timeout(function() {
                    myNavigator.replacePage('status.html',{ animation: 'none'});        
                },100);
                break;
            default:
                console.log("topCtrl init...XXX"+status);
                $timeout(function() {
                    myNavigator.replacePage('status.html',{ animation: 'none'});        
                },100);
                break;
            }
        });
    }else{
        $timeout(function() {
            myNavigator.replacePage('login.html',{ animation: 'none'});        
        },100);
    }
    
    
});
