// This is a JavaScript file

myApp.controller('statusCtrl',function($scope,challenger,$timeout){
    "use strict";
    console.log("statusCtrl init!");
    var target = this;

    // たくさんの帰り値を取得する方法が分からなかったので、
    // グローバル変数(avatorStatus)を変更することにした
    challenger.getAvatorStatus(function(avatorStatus){
        // ★これを入れないと、非同期でアクセスしたデータの値が入らない？
        $timeout(function() {
            target.user = avatorStatus.user;
            target.mainCurrent  = avatorStatus.mainCurrent;
            target.gameCurrent  = avatorStatus.gameCurrent;
            target.drinkCurrent = avatorStatus.drinkCurrent;
            /**********************************************************************************
             * それぞれのレベルアップ具合
                アバターと背景
                    達成度 0: アバター△、背景△
                    達成度 1: アバター○、背景△
                    達成度 2: アバター○、背景○
                    達成度 3: アバター◎、背景○
                    達成度 4: アバター◎、背景◎
                達成度メダル：
                    達成度 0: 黒メダル
                    達成度 2: 銅メダル
                    達成度 4: 銀メダル
                    達成度 6: 金メダル
                項目別メダル：
                    達成度 0: 黒メダル
                    達成度 1: 銅メダル
                    達成度 2: 銀メダル
                    達成度 3: 金メダル
            **********************************************************************************/
            // アバター、背景、メダル(全体)、メダル(項目別)の変化するスレッショルド
            // 現在、アバターは3種類、背景は3種類、メダルは4種類存在する＋金メダルの時の分母
            var lvThre    = [ 0, 1, 3, 100 ];       // アバタ：Lv1のスレッショルド, Lv2, Lv3, ∞
            var blvThre   = [ 0, 2, 4, 100 ];       // 背景用：
            var mainThre  = [ 0, 2, 4, 6, 100 ];    // 達成度：黒メダル, 銅, 銀, 金, ∞ 
            var otherThre = [ 0, 1, 2, 3, 100 ];    // 項目別：
            var medal     = [ "N", "B", "S", "G" ];
            // メダル
            var m = 0, g = 0, d = 0;
            for( var i = 0; i < mainThre.length; i++ ){
                if( mainThre[i]  <= target.mainCurrent  ){ m = i; }
                if( otherThre[i] <= target.gameCurrent  ){ g = i; }
                if( otherThre[i] <= target.drinkCurrent ){ d = i; }
            }
            target.mainMedal  = medal[m];
            target.mainNext   = mainThre[m+1];
            target.gameMedal  = medal[g];
            target.gameNext   = otherThre[g+1];
            target.drinkMedal = medal[d];
            target.drinkNext  = otherThre[d+1];
            // レベル
            var l = 0, b = 0;
            for( var i = 1; i < lvThre.length; i++ ){
                if( lvThre[i-1]  <= target.mainCurrent  ){ target.lv  = i; }
                if( blvThre[i-1] <= target.mainCurrent  ){ target.blv = i; }
            }

        },100);
    },function(err){
        console.log(err);
        //$timeout(function() {},100);
    });


    // 西島が追加
    this.backStatus = function(){
        console.log("statusCtrl backStatus");
        //myNavigator.pushPage('cheermeHirose.html',{ animation: 'none'});
        // あえてアニメーション
        myNavigator.popPage();
        /*
            ★問題：ミッション受けていない場合には、アバター画面の「戻る」が機能しない。
        */
    }


    target.logout = function(){
        console.log("statusCtrl logout");
        myNavigator.replacePage('logout.html',{ animation: 'none'});
    };
    
});
