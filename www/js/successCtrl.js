// This is a JavaScript file


myApp.controller('successCtrl',function($scope){
    "use strict";
    console.log("successCtrl init!");
    this.title = "NO SODA DAY";
    this.comment = "";

    //コメント登録
    this.registComment = function(){
        //成功コメントを登録する
        console.log("successCtrl giveup");
        myNavigator.replacePage('entry.html',{ animation: 'none'});
    };
});
