// This is a JavaScript file


myApp.controller('successCtrl',function($scope,challenger){
    "use strict";
    console.log("successCtrl init!");
    this.title = "NO SODA DAY";
    this.comment = "";

    //コメント登録
    this.registComment = function(){
        //成功コメントを登録する
        console.log("successCtrl registComment");
        challenger.MissionCommentUp(challenger.currentMission.objectId,this.comment,function(){
            myNavigator.replacePage('top.html',{ animation: 'none'});
        },function(){
            console.log("error");
            
        })
    };
});
