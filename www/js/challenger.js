// This is a JavaScript file

myApp.factory('challenger',function($http){
    "use strict";
    console.log("Challenger init");
    var data = {};
    data.ncmb = new NCMB("38b0271001ed27f11c37c96c48a22c3450b80531d8fe34691b840fa9fa78b276","aca37c2ba53f426e752addb2310361771343832ab94360c3dfae65b874d0932a");
    /*
        ログイン
    */
    //
    data.currentMission = {};
    
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
                failed(err);
        });
    }

    /*
        ログアウト
    */
    data.logout = function(){
        //スポットデータの初期化
        console.log("Challenger logout");
        data.ncmb.User.logout();
        console.log("Challenger logout success");
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
    
    /*
        状態をカエス
        
    */
    data.getStatus = function(success){
        console.log("Challenger getStatus");
        var currentUser = data.ncmb.User.getCurrentUser();
        if (currentUser) {
            var Missions = data.ncmb.DataStore("missions");
            var Challengers = data.ncmb.DataStore("challengers");
            var currentMissionId = "";
            var currentMissionResult = "";
            //挑戦中か？
            Challengers.equalTo("userid",currentUser.objectId)
            .equalTo("status","")
            .fetchAll()
            .then(function(results){
                for (var i = 0; i < results.length; i++) {
                    currentMissionId = results[i].missionid;
                    currentMissionResult = results[i].result;
                    console.log (currentMissionId);
                }
                if(currentMissionId!==""){
                    //参加中のMissionがある
                    console.log("参加中のMissionあり");
                        //結果が入っているか？
                    if(currentMissionResult=="success"){
                        //成功コメント待ち
                        success("Success");
                        return;
                    }else if(currentMissionResult=="failed"){
                        //失敗コメント待ち
                        success("Failed");
                        return;
                    }
                    //Mission開催中か？
                    Missions.equalTo("objectId",currentMissionId)
                    .fetchAll()
                    .then(function(results){
                        data.currentMission = null;
                        for (var i = 0; i < results.length; i++) {
                            data.currentMission = results[i];
                        }
                        if(data.currentMission){
                            if(data.currentMission.status=="active"){
                                //終わってない
                                success("Challenge");
                                return;
                            }
                            //終わった
                            success("Finish");
                            return;
                        }
                        // Error
                        success("Error");
                        return;
                    })
                    .catch(function(err){
                        console.log(err);
                        success("Error");
                    });
                }else{
                    //参加中のイベントがない 
                    console.log("参加中のイベントなし");
                     var now = new Date();
                    console.log("現在時刻"+ now.toISOString());
                     var nowString = { "__type": "Date", "iso": now.toISOString() };
                    //イベント開催中か？
                    Missions.equalTo("status","active")
                    .fetchAll()
                    .then(function(results){
                        data.currentMission = null;
                        for (var i = 0; i < results.length; i++) {
                            data.currentMission = results[i];
                            console.log("イベントID:"+data.currentMission.objectId);
                            console.log("イベントタイトル:"+data.currentMission.title);
                            console.log("イベント説明:"+data.currentMission.description);
                            console.log("イベント状態:"+data.currentMission.status);
                            console.log("イベント開始時刻"+data.currentMission.start_datetime);
                            console.log("イベント終了時刻"+data.currentMission.end_datetime);
                        }
                        if(data.currentMission){
                            //イベント開催中
                            success("Wait");
                            return;
                        }
                        success("Idle");
                        return;
                    })
                    .catch(function(err){
                        console.log(err);
                        success("Error");
                    });
                }
            })
            .catch(function(err){
                console.log(err);
                success("Error");
            });
        } else {
            console.log("未ログインまたは取得に失敗");
            success("Error");
            return;
        }
    }

    /*
        ミッションに参加する
    */
    data.MissionStart = function(mission_id,success,failed){
        console.log("Challenger MissionStart");
        var Challengers = data.ncmb.DataStore("challengers");
        var challengers = new Challengers();
        challengers.set("missionid", mission_id)
             .set("userid", data.currentUser.objectId)
             .set("status", "")
             .set("result", "")
             .save()
             .then(function(challenger){
              // 保存後の処理
                console.log("Challenger MissionStart Success");
                success();
             })
             .catch(function(err){
               // エラー処理
               failed(err);
             });
    }
    /*
        ミッションを拒否する
    */
    data.MissionRefuse = function(mission_id,success,failed){
        //スポットデータの初期化
        console.log("Challenger MissionRefuse");
        var Challengers = data.ncmb.DataStore("challengers");
        var challengers = new Challengers();
        challengers.set("missionid", mission_id)
            .set("userid", data.currentUser.objectId)
            .set("status", "refuse")
            .set("result", "refuse")
            .save()
            .then(function(challenger){
              // 保存後の処理
                success();
            })
            .catch(function(err){
               // エラー処理
                console.log(err);
                failed(err);
            });
    }

    /*
        ミッションを終了する
    */
    data.MissionFinish = function(mission_id,result,success,failed){
        //スポットデータの初期化
        console.log("Challenger MissionFinish");
        var Challengers = data.ncmb.DataStore("challengers");
        Challengers.equalTo("missionid",mission_id)
            .equalTo("userid",data.currentUser.objectId)
            .fetchAll()
            .then(function(results){
                for (var i = 0; i < results.length; i++) {
                    results[i].set("result",result);
                    results[i].update();
                }
                success();
            })
            .catch(function(err){
               // エラー処理
               console.log(err);
               failed(err);
             });
    }

    /*
        ミッションを終了する
    */
    data.MissionClose = function(mission_id,success,failed){
        //スポットデータの初期化
        console.log("Challenger MissionClose");
        var Challengers = data.ncmb.DataStore("challengers");
        Challengers.equalTo("missionid",mission_id)
            .equalTo("userid",data.currentUser.objectId)
            .fetchAll()
            .then(function(results){
                for (var i = 0; i < results.length; i++) {
                    results[i].set("status","finish");
                    results[i].update();
                }
                success();
            })
            .catch(function(err){
               // エラー処理
               console.log(err);
               failed(err);
             });
    }

    /*
        チャレンジ終了コメントの登録
    */
    data.MissionCommentUp = function(mission_id,comment,success,failed){
        //スポットデータの初期化
        console.log("Challenger ChallengeCommentUp");
        return true;
    }
    
    /*
        励ましコメントの登録
    */
    data.ChallengeCheerUp = function(mission_id,message,success,failed){
        //スポットデータの初期化
        console.log("Challenger ChallengeCommentUp");
        return true;
    }

    /*
        励ましコメントの取得
    */
    data.ChallengeGetCheer = function(mission_id,success,failed){
        //スポットデータの初期化
        console.log("Challenger ChallengeGetCheer");
        return true;
    }
    
    /*
        ミッションの状態を取得する
    */
    data.GetMissionStatus = function(mission_id,active,finished,failed){
        //スポットデータの初期化
        console.log("Challenger GetMissionStatus");
        var Missions = data.ncmb.DataStore("missions");
        Missions.equalTo("objectId",mission_id)
        .fetchAll()
        .then(function(results){
            if(results.length>0){
                if(result[0].status=="active"){
                    
                }else{
                    
                } 
            }else{
                failed(err);
            }
        })
        .catch(function(err){
           // エラー処理
           console.log(err);
           failed(err);
         });

    }
    return data;
    }
);
