// This is a JavaScript file


myApp.controller('failureCtrl',function($scope,challenger){
    "use strict";
    console.log("failureCtrl init!");
    this.title = challenger.currentMission.title;
    this.comment = "";
    this.closeMission = function(){
        //失敗コメントを登録する
        console.log("failureCtrl closeMission");
        challenger.MissionClose(challenger.currentMission.objectId,function(){
            myNavigator.replacePage('top.html',{ animation: 'none'});
        },function(){
            myNavigator.replacePage('logout.html',{ animation: 'none'});
        });
    };
});