// This is a JavaScript file


/*
    チャレンジ参加中画面
*/
myApp.controller('challengeCtrl',function($scope,challenger,$timeout){
    "use strict";
    console.log("challengeCtrl init!");
    this.title = challenger.currentMission.title;
    this.description = challenger.currentMission.description;
    this.cheerMessages = ['まけるな','あきらめるな！'];
    this.activeChallenger = "-";
    this.totalChallenger = "-";
    var target = this;
    var cheerme_times = 0;

    challenger.GetChallengerCount(challenger.currentMission.objectId,function(active,total){
        console.log("challengeCtrl challenger Count!");
        $timeout(function() {
            target.activeChallenger = active;
            target.totalChallenger = total;
        },100);
    },function(err){
        console.log(err);
        $timeout(function() {
            target.activeChallenger = "??";
            target.totalChallenger = "??";
        },100);
        
        
    });

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
         myNavigator.pushPage('hagemasu.html',{ animation: 'left'});
      
    };
    
    //励まされる
    this.cheerMe = function(){
        console.log("challengeCtrl cheerMe");
        cheerme_times++;
        if(cheerme_times % 5 == 0){            
            myNavigator.pushPage('cheermeHirose.html',{ animation: 'none'});        
        } else {
            myNavigator.pushPage('cheerme.html',{ animation: 'none'});        
        }
/*        //だれかの応援メッセージが届く
        //メッセージ入力
        challenger.ChallengeGetCheer(challenger.currentMission.objectId,function(cheer){
            console.log("応援取得:" + cheer.username);
            console.log("応援取得:" + cheer.message);
            //成功
     //       this.cheerMessages.unshift(cheer.message);    
        },function(){
            //失敗
        });
*/
    };
    
    // 西島が追加
    this.goStatus = function(){
        console.log("challengeCtrl goStatus");
        //myNavigator.pushPage('cheermeHirose.html',{ animation: 'none'});
        // あえてアニメーション
        myNavigator.pushPage('status_back.html');        
    }
    
    this.logout = function(){
        console.log("challengeCtrl logout");
        myNavigator.replacePage('logout.html',{ animation: 'none'});
    };
});

