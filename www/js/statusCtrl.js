// This is a JavaScript file

myApp.controller('statusCtrl',function($scope,challenger,$timeout){
    "use strict";
    console.log("statusCtrl init!");

    // たくさんの帰り値を取得する方法が分からなかったので、
    // グローバル変数(avatorStatus)を変更することにした
    challenger.calcAvatorStatus();
    
    this.user = challenger.avatorStatus.user;
    this.lv   = challenger.avatorStatus.lv;

    this.mainMedal    = challenger.avatorStatus.mainMedal;
    this.mainCurrent  = challenger.avatorStatus.mainCurrent;
    this.mainNext     = challenger.avatorStatus.mainNext;
    this.gameMedal    = challenger.avatorStatus.gameMedal;
    this.gameCurrent  = challenger.avatorStatus.gameCurrent;
    this.gameNext     = challenger.avatorStatus.gameNext;
    this.drinkMedal   = challenger.avatorStatus.drinkMedal;
    this.drinkCurrent = challenger.avatorStatus.drinkCurrent;
    this.drinkNext    = challenger.avatorStatus.drinkNext;

    this.logout = function(){
        console.log("statusCtrl logout");
        myNavigator.replacePage('logout.html',{ animation: 'none'});
    };
    
});
