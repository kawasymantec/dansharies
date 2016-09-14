// This is a JavaScript file

myApp.factory('challenger',function($http,$timeout){
    "use strict";
    var data = {};
    data.ncmb = new NCMB("38b0271001ed27f11c37c96c48a22c3450b80531d8fe34691b840fa9fa78b276","aca37c2ba53f426e752addb2310361771343832ab94360c3dfae65b874d0932a");
/*
    var loaddata = window.localStorage.getItem(stragekey);
    if(loaddata == null)
    {
        data.raw_items = new Array();
    }else{
        data.raw_items = JSON.parse(loaddata);
	}
*/    
    /*
        ログイン
    */
    data.login = function(userid, password,success,failed){
        //スポットデータの初期化
        console.log("Challenger login");
        data.ncmb.User.login(userid, password)
        .then(function(data){
          // ログイン後処理
                console.log("Challenger login success");
                success();
        })
        .catch(function(err){
          // エラー処理
                console.log("Challenger login failed");
                failed();
        });
    }

    /*
        ログアウト
    */
    data.logout = function(success,failed){
        //スポットデータの初期化
        console.log("Challenger logout");
        data.ncmb.User.logout()
        .then(function(data){
          // ログイン後処理
                console.log("Challenger logout success");
                success();
        })
        .catch(function(err){
          // エラー処理
                console.log("Challenger logout failed");
                failed(err);
        });
    }
    
    /*
        ユーザ登録
    */
    data.signUp = function(userid,password,success,failed){
        console.log("Challenger signup");
        //Userのインスタンスを作成
        var user = new data.ncmb.User();
        //ユーザー名・パスワードを設定
        user.set("userName", userid)
            .set("password",password);
        // 新規登録
        user.signUpByAccount()
            .then(function(){
              // 登録後処理
                console.log("Challenger signup success");
                success();
            })
            .catch(function(err){
              // エラー処理
                console.log("Challenger signup failed");
                failed();
            });
    }
    
    /*
        ログイン中かどうかを返す
        true: ログイン中　false: 未ログイン
    */
    data.isLogin = function(){
        console.log("Challenger isLogin");
        var currentUser = data.ncmb.User.getCurrentUser();
        if (currentUser) {
            console.log("ログイン中のユーザー: " + currentUser.get("userName"));
            return true;
        } else {
            console.log("未ログインまたは取得に失敗");
            return false;
        }
    }
    
    data.getStatus = function(success){
        console.log("Challenger getStatus");
        var currentUser = data.ncmb.User.getCurrentUser();
        if (currentUser) {
            console.log("Challenger getStatus_3");
            var Events = data.ncmb.DataStore("events");
            var Challengers = data.ncmb.DataStore("challengers");
            var event_id = "";
            var event_starttime = "";
            var event_endtime = "";
            var challenge_result = "";
            //挑戦中か？
            Challengers.equalTo("userid",currentUser.objectId)
            .equalTo("status","")
            .fetchAll()
            .then(function(results){
                for (var i = 0; i < results.length; i++) {
                    event_id = results[i].eventid;
                    challenge_result = results[i].result;
                    console.log (results[i].eventid);
                }
                if(event_id!==""){
                    //参加中のイベントがある
                    console.log("参加中のイベントあり");
                        //結果が入っているか？
                    if(challenge_result=="success"){
                        //成功コメント待ち
                        success("Success");
                        return;
                    }else if(challenge_result=="failed"){
                        //失敗コメント待ち
                        success("Failed");
                        return;
                    }
                    //イベント開催中か？
                    Events.equalTo("objectid",event_id)
                    .lessThanOrEqualTo("end_datetime",new Date())
                    .fetchAll()
                    .then(function(results){
                        for (var i = 0; i < results.length; i++) {
                            event_endtime = results[i].end_datetime;
                        }
                        if(event_endtime!=""){
                            //終わってない
                            success("Challenge");
                            return;
                        }
                        //終わった
                        success("Finish");
                        return;
                    })
                    .catch(function(err){
                        console.log(err);
                    });
                }else{
                    //参加中のイベントがない 
                    console.log("参加中のイベントなし");
                     var now = new Date();
                    console.log("現在時刻"+ now.toISOString());
                     var nowString = { "__type": "Date", "iso": now.toISOString() };
                    //イベント開催中か？

                    //.greaterThan("start_datetime",nowString)
                    //.lessThanOrEqualTo("end_datetime",nowString)
                    
                    Events.fetchAll()
                    .then(function(results){
                        for (var i = 0; i < results.length; i++) {
                            event_starttime = results[i].get('start_datetime');
                            event_endtime = results[i].get('end_datetime');
                            console.log("イベント開始時刻"+event_starttime);
                            console.log("イベント終了時刻"+event_endtime);
                        }
                        if(event_endtime!=""){
                            //イベント開催中
                            success("Wait");
                            return;
                        }
                        success("Idle");
                        return;
                    })
                    .catch(function(err){
                        console.log(err);
                    });
                }
            })
            .catch(function(err){
                console.log(err);
            });
        } else {
            console.log("未ログインまたは取得に失敗");
            success("Error");
            return;
        }
    }

    /*
        チャレンジに参加する
    */
    data.ChallengeStart = function(event_id){
        //スポットデータの初期化
        console.log("Challenger ChallengeStart");
        return true;
    }

    /*
        チャレンジを終了する
    */
    data.ChallengeFinish = function(event_id,result){
        //スポットデータの初期化
        console.log("Challenger ChallengeFinish");
        return true;
    }

    /*
        チャレンジ終了コメントの登録
    */
    data.ChallengeCommentUp = function(event_id,comment){
        //スポットデータの初期化
        console.log("Challenger ChallengeCommentUp");
        return true;
    }
    
    /*
        励ましコメントの登録
    */
    data.ChallengeCheerUp = function(event_id,message){
        //スポットデータの初期化
        console.log("Challenger ChallengeCommentUp");
        return true;
    }

    /*
        励ましコメントの取得
    */
    data.ChallengeGetCheer = function(event_id){
        //スポットデータの初期化
        console.log("Challenger ChallengeGetCheer");
        return true;
    }
    
    /*
        チャレンジの参加人数を取得する
    */
    data.GetChallengers = function(event_id){
        //スポットデータの初期化
        console.log("Challenger ChallengeGetCheer");
        return 100;
    }

    /*
        チャレンジ継続中の人数を取得する
    */
    data.GetAliveChallengers = function(event_id){
        //スポットデータの初期化
        console.log("Challenger GetAliveChallengers");
        return 45;
    }
//    data.init();
    
    return data;
    }
);
