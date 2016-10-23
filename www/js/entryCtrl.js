// This is a JavaScript file

/*
    チャレンジ参加確認画面
*/
myApp.controller('entryCtrl',function($scope,challenger){
    "use strict";
    console.log("entryCtrl init!");
    this.title = challenger.currentMission.title;
    this.description = challenger.currentMission.description;
    this.missionNo = challenger.currentMission.missionNo || 0;
    this.baasurlbase = challenger.baasurlbase;
    //参加する
    this.entry = function(){
        //チャレンジに参加する
        console.log("entryCtrl entry");
        challenger.MissionStart(challenger.currentMission.objectId,challenger.currentMission.category,function(){
            myNavigator.replacePage('ganbare.html',{ animation: 'none'});
        },function(){
            myNavigator.replacePage('logout.html',{ animation: 'none'});
        });
    };
    //参加しない
    this.refuse = function(){
        //チャレンジに参加しない
        console.log("entryCtrl refuse");
        challenger.MissionRefuse(challenger.currentMission.objectId,challenger.currentMission.category,function(){
            myNavigator.replacePage('top.html',{ animation: 'none'});
        },function(){
            myNavigator.replacePage('logout.html',{ animation: 'none'});
        });
    };

    this.logout = function(){
        console.log("entryCtrl logout");
        myNavigator.replacePage('logout.html',{ animation: 'none'});
    };
});
