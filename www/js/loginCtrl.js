// This is a JavaScript file

/*
    ログイン画面
*/
myApp.controller('loginCtrl',function($scope,challenger){
    "use strict";
    console.log("loginCtrl init!");
    this.username = window.localStorage.getItem('login.userid');
    this.password = window.localStorage.getItem('login.password');
/*    if(this.username.length>0){
  //      this.remember = 'true';
    }*/
    //ログイン
    this.login = function(){
        console.log("loginCtrl login");
        var target  = this;
        challenger.login(this.username,this.password,function(){
            console.log(target.remember);
            if(target.remember){
                window.localStorage.setItem('login.userid',target.username);
                window.localStorage.setItem('login.password',target.password);
            }else{
                window.localStorage.setItem('login.userid','');
                window.localStorage.setItem('login.password','');
            }
            //成功
            //myNavigator.replacePage('top.html',{ animation: 'none'});
            // ★西島：アバター←→挑戦中
            //最初に表示されるのをアバター画面にします
            myNavigator.replacePage('status.html',{ animation: 'none'});
        },function(){
            //失敗
             ons.notification.alert({
                message: 'ログインに失敗しました',title:"エラー"
            });
      //            myNavigator.replacePage('challenge.html',{ animation: 'none'});            
        });
        
    };
    
    //ユーザ登録画面へ
    this.regist = function(){
        console.log("loginCtrl regist");
        myNavigator.pushPage('regist.html',{ animation: 'lift'});
    };
});

/*
    ログアウト画面
*/
myApp.controller('logoutCtrl',function($scope,challenger,$timeout){
    "use strict";
    console.log("logoutCtrl init!");
    challenger.logout(
        function(){
            //成功
            $timeout(function() {
                myNavigator.replacePage('top.html',{ animation: 'none'});        
            },500);
        },function(){
            //失敗
        }
    );
});

