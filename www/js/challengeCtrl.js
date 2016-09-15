// This is a JavaScript file


/*
    チャレンジ参加中画面
*/
myApp.controller('challengeCtrl',function($scope,challenger){
    "use strict";
    console.log("challengeCtrl init!");
    this.title = "NO SODA DAY";
    this.description = "今日一日だけ炭酸をやめよう！";
    this.cheerMessages = ['まけるな','あきらめるな！'];

    //諦める
    this.giveUp = function(){
        console.log("challengeCtrl giveup");
        challenger.MissionFinish(challenger.currentMission.objectId,"failed",function(){
            myNavigator.replacePage('failure.html',{ animation: 'none'});
        },function(){
            myNavigator.replacePage('logout.html',{ animation: 'none'});
        });
    };

    //励ます
    this.cheerUp = function(){
        console.log("challengeCtrl cheerUp");
        //ダイアログ表示
        
        //メッセージ入力
        //だれかに応援メッセージを届ける
//        myNavigator.replacePage('status.html',{ animation: 'none'});
    };
    
    //励まされる
    this.cheerMe = function(){
        console.log("challengeCtrl cheerMe");
        //だれかの応援メッセージが届く
        this.cheerMessages.unshift('がんばれ！');    

//        myNavigator.replacePage('status.html',{ animation: 'none'});
    };
    
    this.logout = function(){
        console.log("challengeCtrl logout");
        myNavigator.replacePage('logout.html',{ animation: 'none'});
    };
});

