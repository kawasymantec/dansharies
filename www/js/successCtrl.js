// This is a JavaScript file


myApp.controller('successCtrl',function($scope,challenger,$timeout){
    "use strict";
    console.log("successCtrl init!");
    this.title = "NO SODA DAY";
    this.comment = "";
    var lvData = {};
    var current = 0;
    
    /********************************************************/
    // 西島：色々なページでLvを取得するための機構
    var target = this;
    challenger.getAvatorStatus(function(avatorStatus){
        $timeout(function() {
            current    = avatorStatus.mainCurrent;
            lvData     = challenger.calcLv(avatorStatus.mainCurrent);
            target.lv  = lvData.lv;
            target.blv = lvData.blv;
        },100);
    },function(err){
        console.log(err);
        //$timeout(function() {},100);
    });
    /********************************************************/

    //コメント登録
    this.registComment = function(){
        //成功コメントを登録する
        console.log("successCtrl registComment");
        challenger.MissionCommentUp(challenger.currentMission.objectId,this.comment,function(){
            //myNavigator.replacePage('top.html',{ animation: 'none'});
            // 西島が修正（いったん、ミッション終了後は、ステータス画面に戻った方がよい）
            var newlvData     = challenger.calcLv( current + 1 );
            if ( newlvData.lv > lvData.lv || newlvData.blv > lvData.blv ){
                ons.notification.alert({ 
                    message: 'アバターが成長しました',title:"Congrats!!" 
                }); 
            }
            myNavigator.replacePage('status.html',{ animation: 'none'});
        },function(){
            console.log("error");
            
        })
    };
});
