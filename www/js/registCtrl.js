// This is a JavaScript file
myApp.controller('topCtrl',function($scope,challenger,$timeout){
    "use strict";
    console.log("topCtrl init!");
    this.username = "";
    this.password = "";
    
    if(challenger.isLogin()){
        challenger.getStatus(function(status){
            switch(status){
            case 'Wait':    //挑戦待ち
                console.log("topCtrl init...wait");
                $timeout(function() {
                    myNavigator.replacePage('entry.html',{ animation: 'none'});        
                },100);
                break;
            case 'Challenge':    //挑戦中
                console.log("topCtrl init...Challenge");
                $timeout(function() {
                    myNavigator.replacePage('challenge.html',{ animation: 'none'});        
                },100);
                break;
            case 'Finish':    //挑戦終了
                console.log("topCtrl init...Finish");
                $timeout(function() {
                    myNavigator.replacePage('resultentry.html',{ animation: 'none'});        
                },100);
                break;
            case 'Success':    //挑戦成功
                console.log("topCtrl init...Success");
                $timeout(function() {
                    myNavigator.replacePage('success.html',{ animation: 'none'});        
                },100);
                break;
            case 'Failure':    //挑戦失敗
                console.log("topCtrl init...Failure");
                $timeout(function() {
                    myNavigator.replacePage('failure.html',{ animation: 'none'});        
                },100);
                break;
            default:
                console.log("topCtrl init...XXX"+status);
                $timeout(function() {
                    myNavigator.replacePage('status.html',{ animation: 'none'});        
                },100);
                break;
            }
        });
    }else{
        $timeout(function() {
            myNavigator.replacePage('login.html',{ animation: 'none'});        
        },100);
    }
    
    
});

/*
    ログイン画面
*/
myApp.controller('loginCtrl',function($scope,challenger){
    "use strict";
    console.log("loginCtrl init!");
    this.username = "";
    this.password = "";
    this.login = function(){
        console.log("topCtrl login");
        challenger.login(this.username,this.password,function(){
            //成功
            myNavigator.replacePage('challenge.html',{ animation: 'none'});
        },function(){
            //失敗
//            myNavigator.replacePage('challenge.html',{ animation: 'none'});            
        });
        
    };
    
    this.regist = function(){
        console.log("topCtrl regist");
        myNavigator.pushPage('regist.html',{ animation: 'lift'});
    };
});


/*
    ユーザ登録画面
*/
myApp.controller('registCtrl',function($scope,challenger){
    "use strict";
    console.log("registCtrl init!");
    this.username = "";
    this.password = "";
    this.regist = function(){
        console.log("registCtrl regist");
        challenger.signUp(this.username,this.password);
        //参加待ち状態のチャレンジがある
            myNavigator.replacePage('entry.html',{ animation: 'none'});
        //なにもない
//            myNavigator.replacePage('status.html',{ animation: 'none'});
    };
});

/*
    チャレンジ参加確認画面
*/
myApp.controller('entryCtrl',function($scope){
    "use strict";
    console.log("entryCtrl init!");
    this.title = "NO SODA DAY";
    this.description = "今日一日だけ炭酸をやめよう！";
    //参加する
    this.entry = function(){
        //チャレンジに参加する
        console.log("entryCtrl entry");
        myNavigator.replacePage('challenge.html',{ animation: 'none'});
    };
    //参加しない
    this.refuse = function(){
        //チャレンジに参加しない
        console.log("entryCtrl refuse");
    };
});

/*
    チャレンジ参加中画面
*/
myApp.controller('challengeCtrl',function($scope){
    "use strict";
    console.log("challengeCtrl init!");
    this.title = "NO SODA DAY";
    this.description = "今日一日だけ炭酸をやめよう！";
    this.cheerMessages = ['まけるな','あきらめるな！'];

    //諦める
    this.giveUp = function(){
        console.log("challengeCtrl giveup");
        myNavigator.replacePage('failure.html',{ animation: 'none'});
    };

    //励ます
    this.cheerUp = function(){
        console.log("challengeCtrl cheerUp");
        //ダイアログ表示
        
        //メッセージ入力
        //だれかに応援メッセージを届ける
//        myNavigator.replacePage('status.html',{ animation: 'none'});
    };
    
    //励まされる
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
    //成功した
    this.success = function(){
        //成功を登録する
        console.log("resultEntryCtrl success");
        myNavigator.replacePage('success.html',{ animation: 'none'});
    };
    
    //失敗した
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

    //コメント登録
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

