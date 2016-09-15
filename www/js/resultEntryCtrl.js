// This is a JavaScript file

myApp.controller('resultEntryCtrl',function($scope,challenger){
    "use strict";
    console.log("resultEntryCtrl init!");
    this.title = challenger.currentMission.title;
    this.desription = challenger.currentMission.description;
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

