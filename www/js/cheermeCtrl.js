// This is a JavaScript file


/*
    チャレンジ参加中画面
*/
myApp.controller('cheermeCtrl',function($scope,challenger,$timeout){
    "use strict";
    console.log("cheermeCtrl init!");
    var num = (new Date()).getSeconds() % 2;
    this.img = "img/ouen1.png";

    this.username = "-";
    this.message;
    console.log("username 初定義:" + this.username);
    var target = this;
    console.log(this.img);
    challenger.ChallengeGetCheer(challenger.currentMission.objectId,function(cheer){
        console.log("応援取得:" + cheer.username);
        console.log("応援取得:" + "from cheermeCtrl");
        console.log("応援取得:" + cheer.message);
        $timeout(function() {
            target.username = cheer.username;
            target.message = cheer.message;
        },100);

        //成功
        //this.cheerMessages.unshift(cheer.message);
       return ['b', 'c'];
    },function(){
        //失敗
        console.log("応援失敗:");
        });
    console.log("テスト1:"  );
    console.log(target.username);
  // console.log(test);


    this.logout = function(){
        console.log("challengeCtrl logout");
        myNavigator.replacePage('logout.html',{ animation: 'none'});
    };
});
