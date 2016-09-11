// This is a JavaScript file
//app init
var myApp = angular.module('myApp', ['onsen']);

/*
 route list コントローラ
*/
myApp.controller('routelistCtrl',function($scope){
    "use strict";
    console.log("routelistCtrl init!");
    if(pgMyRoute.selectedItem.spots == null){
        pgMyRoute.selectedItem.spots = new Array();
    }
    this.routes = pgMyRoute.selectedItem.spots;

    this.showDetail = function(index){
        pgMyRoute.selectItem(index);
        myNavigator.pushPage('spotdetail.html',{ animation: 'lift'});
    }
});


document.addEventListener('deviceready', function() {
    console.log("device ready!");
    // NCMB 初期化
    if(window.NCMB){
        // プッシュ通知受信時のコールバックを登録します
        window.NCMB.monaca.setHandler
        (
            function(jsonData){
                // 送信時に指定したJSONが引数として渡されます
                alert("callback :::" + JSON.stringify(jsonData));
            }
        );
        
        var successCallback = function () {
            //端末登録後の処理
        };
        var errorCallback = function (err) {
            //端末登録でエラーが発生した場合の処理
            conole.log(err);
        };
        // デバイストークンを取得してinstallation登録が行われます
        // ※ YOUR_APPLICATION_KEY,YOUR_CLIENT_KEYはニフティクラウドmobile backendから発行されたAPIキーに書き換えてください
        // ※ YOUR_SENDER_IDはFCMでプロジェクト作成時に発行されたSender ID(送信者ID)に書き換えてください
        window.NCMB.monaca.setDeviceToken(
            "38b0271001ed27f11c37c96c48a22c3450b80531d8fe34691b840fa9fa78b276",
            "aca37c2ba53f426e752addb2310361771343832ab94360c3dfae65b874d0932a",
            "162448935574",
            successCallback,
            errorCallback
        );
        
        // 開封通知登録の設定
        // trueを設定すると、開封通知を行う
        window.NCMB.monaca.setReceiptStatus(true);
    }
        
}, false);

document.addEventListener('deviceready', function() {
    console.log("device ready!");
    // NCMB 初期化
    // デバイストークン登録
}, false);
