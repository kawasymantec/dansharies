// This is a JavaScript file


myApp.controller('failureCtrl',function($scope,challenger,$timeout){
    "use strict";
    console.log("failureCtrl init!");
    this.title = challenger.currentMission.title;
    this.comment = "";

    /********************************************************/
    // 西島：色々なページでLvを取得するための機構
    var target = this;
    challenger.getAvatorStatus(function(avatorStatus){
        $timeout(function() {
            var lvData          = challenger.calcLv(avatorStatus.mainCurrent);
            target.lv           = lvData.lv;
        },100);
    },function(err){
        console.log(err);
        //$timeout(function() {},100);
    });
    /********************************************************/
    
    this.closeMission = function(){
        //失敗コメントを登録する
        console.log("failureCtrl closeMission");
        challenger.MissionClose(challenger.currentMission.objectId,function(){
            //myNavigator.replacePage('top.html',{ animation: 'none'});
            // 西島が修正（いったん、ミッション終了後は、ステータス画面に戻った方がよい）
            myNavigator.replacePage('status.html',{ animation: 'none'});
        },function(){
            myNavigator.replacePage('logout.html',{ animation: 'none'});
        });
    };
});