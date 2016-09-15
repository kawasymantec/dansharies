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
        challenger.signUp(this.username,this.password);
        //参加待ち状態のチャレンジがある
            myNavigator.replacePage('entry.html',{ animation: 'none'});
        //なにもない
//            myNavigator.replacePage('status.html',{ animation: 'none'});
    };
});


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
});

myApp.controller('resultEntryCtrl',function($scope,challenger){
    "use strict";
    console.log("resultEntryCtrl init!");
    this.title = "NO SODA DAY";
    this.desription = "今日一日だけ炭酸をやめよう！";
    //成功した
    this.success = function(){
        //成功を登録する
        console.log("resultEntryCtrl success");
        challenger.MissionFinish(challenger.currentMission.objectId,"success",function(){
            myNavigator.replacePage('success.html',{ animation: 'none'});
        },function(){
            myNavigator.replacePage('logout.html',{ animation: 'none'});
        });
    };
    
    //失敗した
    this.failure = function(){
        //失敗を登録する
        console.log("resultEntryCtrl failure");
        challenger.MissionFinish(challenger.currentMission.objectId,"failed",function(){
            myNavigator.replacePage('failure.html',{ animation: 'none'});
        },function(){
            myNavigator.replacePage('logout.html',{ animation: 'none'});
        });
    };
});


