// This is a JavaScript file


/*
 ユーザ登録コントローラ
*/
myApp.controller('registCtrl',function($scope){
    "use strict";
    console.log("registCtrl init!");
    if(pgMyRoute.selectedItem.spots == null){
        pgMyRoute.selectedItem.spots = new Array();
    }
    this.routes = pgMyRoute.selectedItem.spots;

    this.showDetail = function(index){
        pgMyRoute.selectItem(index);
        myNavigator.pushPage('spotdetail.html',{ animation: 'lift'});
    }
});
