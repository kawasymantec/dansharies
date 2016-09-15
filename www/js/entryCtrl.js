// This is a JavaScript file

/*
    チャレンジ参加確認画面
*/
myApp.controller('entryCtrl',function($scope,challenger){
    "use strict";
    console.log("entryCtrl init!");
    this.title = challenger.currentMission.title;
    this.description = challenger.currentMission.description;
    //参加する
    this.entry = function(){
        //チャレンジに参加する
        console.log("entryCtrl entry");
        challenger.MissionStart(challenger.currentMission.objectId,function(){
            myNavigator.replacePage('challenge.html',{ animation: 'none'});
        },function(){
            myNavigator.replacePage('logout.html',{ animation: 'none'});
        });
    };
    //参加しない
    this.refuse = function(){
        //チャレンジに参加しない
        console.log("entryCtrl refuse");
        challenger.MissionRefuse(challenger.currentMission.objectId,function(){
            myNavigator.replacePage('top.html',{ animation: 'none'});
        },function(){
            myNavigator.replacePage('logout.html',{ animation: 'none'});
        });
    };
});
