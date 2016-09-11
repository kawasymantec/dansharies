// This is a JavaScript file
myApp.controller('topCtrl',function($scope){
    "use strict";
    console.log("topCtrl init!");
    this.start = function(){
        console.log("topCtrl start");
        
        //もしユーザ登録がまだだったら
            myNavigator.replacePage('regist.html',{ animation: 'none'});
        //ユーザ登録済み
        //ユーザ状態チェック
        //参加状態のチャレンジがある
            //チャレンジの時間内である
//            myNavigator.replacePage('challenge.html',{ animation: 'none'});
            //チャレンジの時間内でない
 //           myNavigator.replacePage('resultEntry.html',{ animation: 'none'});
        //参加待ち状態のチャレンジがある
   //         myNavigator.replacePage('entry.html',{ animation: 'none'});
        //なにもない
     //       myNavigator.replacePage('status.html',{ animation: 'none'});
    };
});


myApp.controller('registCtrl',function($scope){
    "use strict";
    console.log("registCtrl init!");
    this.nickname = "";
    this.regist = function(){
        console.log("registCtrl regist");
        //参加待ち状態のチャレンジがある
            myNavigator.replacePage('entry.html',{ animation: 'none'});
        //なにもない
//            myNavigator.replacePage('status.html',{ animation: 'none'});
    };
});

myApp.controller('entryCtrl',function($scope){
    "use strict";
    console.log("entryCtrl init!");
    this.title = "NO SODA DAY";
    this.description = "今日一日だけ炭酸をやめよう！";
    this.entry = function(){
        //チャレンジに参加する
        console.log("entryCtrl entry");
        myNavigator.replacePage('challenge.html',{ animation: 'none'});
    };
    this.refuse = function(){
        //チャレンジに参加しない
        console.log("entryCtrl refuse");
    };
});

myApp.controller('challengeCtrl',function($scope){
    "use strict";
    console.log("challengeCtrl init!");
    this.title = "NO SODA DAY";
    this.description = "今日一日だけ炭酸をやめよう！";
    this.cheerMessages = ['まけるな','あきらめるな！'];    
    this.giveUp = function(){
        console.log("challengeCtrl giveup");
        myNavigator.replacePage('failure.html',{ animation: 'none'});
    };
    this.cheerUp = function(){
        console.log("challengeCtrl cheerUp");
        //だれかに応援メッセージを届ける
//        myNavigator.replacePage('status.html',{ animation: 'none'});
    };
    this.cheerMe = function(){
        console.log("challengeCtrl cheerMe");
        //だれかの応援メッセージが届く
        this.cheerMessages.unshift('がんばれ！');    

//        myNavigator.replacePage('status.html',{ animation: 'none'});
    };
});

myApp.controller('resultEntryCtrl',function($scope){
    "use strict";
    console.log("resultEntryCtrl init!");
    this.title = "NO SODA DAY";
    this.desription = "今日一日だけ炭酸をやめよう！";
    this.success = function(){
        //成功を登録する
        console.log("resultEntryCtrl success");
        myNavigator.replacePage('success.html',{ animation: 'none'});
    };
    this.failure = function(){
        //失敗を登録する
        console.log("resultEntryCtrl failure");
        myNavigator.replacePage('failure.html',{ animation: 'none'});
    };
});

myApp.controller('successCtrl',function($scope){
    "use strict";
    console.log("successCtrl init!");
    this.title = "NO SODA DAY";
    this.comment = "";
    this.registComment = function(){
        //成功コメントを登録する
        console.log("successCtrl giveup");
        myNavigator.replacePage('entry.html',{ animation: 'none'});
    };
});

myApp.controller('failureCtrl',function($scope){
    "use strict";
    console.log("failureCtrl init!");
    this.title = "NO SODA DAY";
    this.comment = "";
    this.registComment = function(){
        //失敗コメントを登録する
        console.log("failureCtrl giveup");
        myNavigator.replacePage('entry.html',{ animation: 'none'});
    };
});

