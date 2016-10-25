// This is a JavaScript file

myApp.factory('challenger',function($http){
    "use strict";
    console.log("Challenger init");
    var data = {};
    data.isLogined = false;
    var username = "";
    var password = "";
    // ここのキー情報を書き換えてください
    data.ncmb = new NCMB("38b0271001ed27f11c37c96c48a22c3450b80531d8fe34691b840fa9fa78b276","aca37c2ba53f426e752addb2310361771343832ab94360c3dfae65b874d0932a");
//    data.ncmb = new NCMB("4b88bd93e5559645c2bb49bf28d61955600bcba834647b2921be0e0b6d35349c","bc4389b1d9c193ce52772f59d6331f699a364a860826d4178e45ba3cb4334bb1");
    //アプリケーションキー・クライアントキー
//  data.ncmb = new NCMB("1c86df0315639d025352c9605c008b6923da7b4825c04595cbefde5425826f81","4861b858964d8842849b1bcd94c0442be08c0b34250c4b79cc96115e3a57319a");
    // ta
//    data.ncmb = new  NCMB("61dd2f6199522295ae04e20895f5d77dfb206f7e369469e4b46bd33943bd768f","5677585be44cd7b3d3af084f7c7d2742652a2b221fa6a7f499122a06fe6bb3eb");

    //
    data.currentMission = null;

    /*
        参加中もしくは、最後に参加したミッションの情報を取得する
    */
    data.getCurrentMission = function(success,failed){
        //NCMBから参加中もしくは、最後に参加したミッションの情報を取得する
        var Challengers = data.ncmb.DataStore("challengers");
        var Missions = data.ncmb.DataStore("missions");
        var currentUser = data.ncmb.User.getCurrentUser();
        var currentMissionResult = "";
        //挑戦中か？
        Challengers.equalTo("userid",currentUser.objectId)
        .order("createDate",true)
        .fetchAll()
        .then(function(results){
            if(results.length>0){
                Missions.equalTo("objectId",results[0].missionid)
                .fetchAll()
                .then(function(results){
                    data.currentMission = results[0]; 
                    console.log (data.currentMission.objectId);
                    success();
                })
                .catch(function(err){
                        console.log("getCurrentMission query err");
                        failed("query err");
                });
            }else{
                console.log("getCurrentMission err");
                failed("no mission");
            }
        })
        .catch(function(err){
                console.log("getCurrentMission query err");
                failed("query err");
        });
        
    };
    
    /*
        開催中ミッションの情報をNCMBから取得する
    */
    data.getActiveMission = function(success,failed){
        //開催中ミッションの情報を取得する
        data.getChallengedMission(function(challenged){
            var Missions = data.ncmb.DataStore("missions");
            if(challenged.length>0){
                Missions.equalTo("status","active")
                .notIn("objectId",challenged)
                .order("createDate",true)
                .fetchAll()
                .then(function(results){
                    if(results.length>0){
                        success(results[0]);
                    }else{
                        failed("no mission");
                    }
                }).catch(function(err){
                    console.log(err);
                    failed(err);
                });
            }else{
                Missions.equalTo("status","active")
                .order("createDate",true)
                .fetchAll()
                .then(function(results){
                    if(results.length>0){
                        success(results[0]);
                    }else{
                        failed("no mission");
                    }
                }).catch(function(err){
                    console.log(err);
                    failed(err);
                });
            }
        },failed);
    };
    
    /*
        参加済みミッションのリストをNCMBから取得する
    */
    data.getChallengedMission = function(success,failed){
        //開催中ミッションの情報を取得する
        var Challengers = data.ncmb.DataStore("challengers");
        var currentUser = data.ncmb.User.getCurrentUser();
        var challengedmission = [];
        Challengers.equalTo("userid",currentUser.objectId)
        .fetchAll()
        .then(function(challenge){
            if(challenge.length>0){
                //ミッションIDのリストを作成
                challengedmission = challenge.map(function(element, index, array) {
                    return element.missionid;
                });
            }
            success(challengedmission);
        }).catch(function(err){
            console.log(err);
            failed(err);
        });
    };

    /*
        ログイン
    */
    data.login = function(userid, password,success,failed){
        console.log("Challenger login");
        data.ncmb.User.login(userid, password)
        .then(function(user){
                  // ログイン後処理
                console.log("Challenger login success");
                data.isLogined = true;
                data.getCurrentMission(success,success);
        })
        .catch(function(err){
          // エラー処理
                console.log("Challenger login failed "  + err);
                failed(err);
        });
    };

    /*
        ログアウト
    */
    data.logout = function(success,failed){
        console.log("Challenger logout");
        data.ncmb.User.logout()
        .then(function(){
            console.log("Challenger logout success");
            data.currentMission = {};
            data.isLogined = false;
        success();
        })
        .catch(function(err){
          // エラー処理
            console.log("Challenger logout failed "  + err);
            failed(err);
        });
    };
    
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
        /*
            ここにユーザIDの重複チェック処理を入れる
        */
        // 新規登録
        user.signUpByAccount()
            .then(function(){
              // 登録後処理
                console.log("Challenger signup success");
                success();
            })
            .catch(function(err){
              // エラー処理
                console.log("Challenger signup failed" + err);
                failed(err);
            });
    };
    
    data.baasurlbase = "https://mb.api.cloud.nifty.com/2013-09-01/applications/J2MyTSYNctp6tx7e/publicFiles/";
//    data.baasurlbase = "https://mb.api.cloud.nifty.com/2013-09-01/applications/lML0I3RGoykDdhm/publicFiles/";
//    data.baasurlbase = "https://mb.api.cloud.nifty.com/2013-09-01/applications/HRXHqc5QIzTcC1zL/publicFiles/";
//    ta
//    data.baasurlbase = "https://mb.api.cloud.nifty.com/2013-09-01/applications/liglr4AQjkc6nVKK/publicFiles/";


/*
        ログイン中かどうかを返す
        true: ログイン中　false: 未ログイン
    */
    data.isLogin = function(){
        console.log("Challenger isLogin :" + data.isLogined);
        return data.isLogined;
    };
    
    /*
    　自分のミッションの状態を取得する
    　Idle : 参加できるミッションなし
    　Wait : ミッション参加待ち（参加するしない？）
    　Challenge : ミッション挑戦中
    　Finish : ミッション終了（結果登録待ち）
    　Success : ミッション成功（コメント登録待ち）
    　Failed : ミッション失敗（コメント登録待ち）
    　Error : 状態異常
    */
    data.getStatus = function(success){
        console.log("Challenger getStatus");
        var currentUser = data.ncmb.User.getCurrentUser();
        if (currentUser) {
            var Missions = data.ncmb.DataStore("missions");
            var Challengers = data.ncmb.DataStore("challengers");
            var currentMission = data.currentMission;
            var currentMissionResult = "";
            if(currentMission){
                console.log("前回参加ミッションID：" + currentMission.objectId);
                //参加したミッションがある
                Challengers.equalTo("userid",currentUser.objectId)
                .equalTo("missionid",currentMission.objectId)
                .equalTo("status","")
                .fetchAll()
                .then(function(results){
                    if(results.length>0) {
                        currentMissionResult = results[0].result;
                        //参加中のMissionがある
                        console.log("参加中のMissionあり");
                            //結果が入っているか？
                        if(currentMissionResult=="success"){
                            console.log("参加中のMissionあり success");
                            //成功コメント待ち
                            success("Success");
                            return;
                        }else if(currentMissionResult=="failed"){
                            console.log("参加中のMissionあり failed");
                            //失敗コメント待ち
                            success("Failed");
                            return;
                        }
                        console.log("前回参加ミッション状態チェック：" + currentMission.objectId);
                        
                        //Mission開催中か？
                        Missions.equalTo("objectId",currentMission.objectId)
                        .fetchAll()
                        .then(function(results){
                            data.currentMission = null;
                            if(results.length>0){
                                data.currentMission = results[0];
                                if(data.currentMission.status=="active"){
                                    console.log("おわってない");
                                    //終わってない
                                    success("Challenge");
                                }else{
                                    console.log("おわった");
                                    //終わった
                                    success("Finish");
                                }
                            }else{
                                console.log("no mission ");
                                // Error
                                success("Error");
                            }
                        })
                        .catch(function(err){
                            console.log("mission search err " + err);
                            success("Error");
                        });
                    }else{
                        //参加中のイベントがない 
                        console.log("参加中のイベントなし");
                        //開催中のミッションを探す
                        data.getActiveMission(function(activemission){
                            //あれば、開催中のミッションへの参加待ち(Wait)
                            data.currentMission = activemission;
                            success("Wait");
                        },function(err){
                            //なければ、ミッション開始街(Idle)
                            success("Idle");
                        });
                    }
                });
            }else{
                console.log("前回参加ミッションなし" );
                //一度もミッションに参加してない
                //開催中のミッションを探す
                data.getActiveMission(function(activemission){
                    //あれば、開催中のミッションへの参加待ち(Wait)
                    data.currentMission = activemission;
                    success("Wait");
                    
                },function(err){
                    console.log("getActiveMission err:" + err);
                    //なければ、ミッション開始待ち(Idle)
                    success("Idle");
                });
            }
        } else {
            console.log("未ログインまたは取得に失敗");
            success("Error");
            return;
        }
    };

    /*
        ミッションに参加する
    */
    data.MissionStart = function(mission_id,category,success,failed){
        console.log("Challenger MissionStart");
        var Challengers = data.ncmb.DataStore("challengers");
        var challengers = new Challengers();
        var currentUser = data.ncmb.User.getCurrentUser();
        challengers.set("missionid", mission_id)
             .set("userid", currentUser.objectId)
             .set("username", currentUser.userName)
             .set("category", category)
             .set("status", "")
             .set("result", "")
             .save()
             .then(function(challenger){
              // 保存後の処理
            //    currentUser.set("missionid",mission_id);
            //    currentUser.update();
                console.log("Challenger MissionStart Success");
                success();
             })
             .catch(function(err){
               // エラー処理
               failed(err);
             });
    };
    /*
        ミッションへの参加を拒否する
    */
    data.MissionRefuse = function(mission_id,category,success,failed){
        //スポットデータの初期化
        console.log("Challenger MissionRefuse");
        var Challengers = data.ncmb.DataStore("challengers");
        var currentUser = data.ncmb.User.getCurrentUser();
        var challengers = new Challengers();
        challengers.set("missionid", mission_id)
            .set("userid", currentUser.objectId)
            .set("username", currentUser.userName)
            .set("category", category)
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
    };

    /*
        ミッションを終了する
    */
    data.MissionFinish = function(mission_id,result,success,failed){
        //スポットデータの初期化
        console.log("Challenger MissionFinish");
        var Challengers = data.ncmb.DataStore("challengers");
        Challengers.equalTo("missionid",mission_id)
            .equalTo("userid",data.ncmb.currentUser.objectId)
            .order("createDate",true)
            .fetchAll()
            .then(function(results){
                if(results.length>0) {
                    results[0].set("result",result);
                    results[0].update()
                    .then(function(){
                        success();
                    });
                }else{
                   failed(err);
                }
            })
            .catch(function(err){
               // エラー処理
               console.log(err);
               failed(err);
             });
    };

    /*
        ミッションを終了する
    */
    data.MissionClose = function(mission_id,success,failed){
        console.log("Challenger MissionClose");
        var Challengers = data.ncmb.DataStore("challengers");
        Challengers.equalTo("missionid",mission_id)
            .equalTo("userid",data.ncmb.currentUser.objectId)
            .order("createDate",true)
            .fetchAll()
            .then(function(results){
                if(results.length>0) {
                    results[0].set("status","finish");
                    results[0].update()
                    .then(function(){
                        success();
                    });
                }
            })
            .catch(function(err){
               // エラー処理
               console.log(err);
               failed(err);
             });
    };

    /*
        チャレンジ終了コメントの登録
    */
    data.MissionCommentUp = function(mission_id,comment,success,failed){
        //スポットデータの初期化
        console.log("Challenger ChallengeCommentUp");
        if(comment){
            var Challengers = data.ncmb.DataStore("challengers");
            Challengers.equalTo("missionid",mission_id)
                .equalTo("userid",data.ncmb.currentUser.objectId)
                .order("createDate",true)
                .fetchAll()
                .then(function(results){
                    if(results.length>0) {
                        results[0].set("status","finish");
                        results[0].set("comment",comment);
                        results[0].update()
                        .then(function(){
                            success();
                        });
                    }
                })
                .catch(function(err){
                   // エラー処理
                   console.log(err);
                   failed(err);
                 });
        }else{
            data.MissionClose(mission_id,success,failed)
        }
    };
    
    /*
        励ましコメントの登録
    */
    data.ChallengeCheerUp = function(mission_id,message,success,failed){
        //応援メッセージの登録
        console.log("Challenger ChallengeCommentUp");
        var Cheers = data.ncmb.DataStore("cheers");
        var currentUser = data.ncmb.User.getCurrentUser();
        var cheers = new Cheers();
        cheers.set("missionid", mission_id)
            .set("userid", currentUser.objectId)
            .set("username", currentUser.userName)
            .set("message", message)
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
    };

    /*
        励ましコメントの取得
    */
    data.ChallengeGetCheer = function(mission_id,success,failed){
        //スポットデータの初期化
        console.log("Challenger ChallengeGetCheer");
        var Cheers = data.ncmb.DataStore("cheers");
        var currentUser = data.ncmb.User.getCurrentUser();
        Cheers.equalTo("missionid",mission_id)
            .notEqualTo("userid",currentUser.objectId)
            .order("createDate",true)
            .fetchAll()
            .then(function(results){
                if(results.length>0) {
                    var num = (new Date()).getSeconds() % results.length;
                    success(results[num]);
                }else{
                   success("やってやれないことはない!");
                }
            })
            .catch(function(err){
               // エラー処理
               console.log(err);
               failed(err);
             });
        return true;
    };
    
    data.GetChallengerCount = function(mission_id,success,failed){
        console.log("Challenger ChallengeGetCheer");
        var Challengers = data.ncmb.DataStore("challengers");
        Challengers.equalTo("missionid",mission_id)
            .fetchAll()
            .then(function(results){
                var totalCnt = results.length;
                var activeCnt = 0;
                for(var i =0;i<results.length;i++) {
                    if(!results[i].result){
                        activeCnt ++;
                    }
                }
                success(activeCnt,totalCnt);
            })
            .catch(function(err){
               // エラー処理
               console.log(err);
               failed(err);
             });
        
    };

    /*
        西島がアバター表示用のデータを取得するために作成
    */
    data.getAvatorStatus = function(success,failed){
        console.log("Challenger getAvatorStatus");

        var avatorStatus = {};
        avatorStatus.mainCurrent  =  0;
        avatorStatus.gameCurrent  =  0;
        avatorStatus.drinkCurrent =  0;
        
        var currentUser = data.ncmb.User.getCurrentUser();
        avatorStatus.user = currentUser.userName;

        if (currentUser) {
            //未使用
            //var Missions = data.ncmb.DataStore("missions");
            var Challengers = data.ncmb.DataStore("challengers");
            var currentMission = data.currentMission;
            var currentMissionResult = "";
            if(currentMission){
                console.log("前回参加ミッションID：" + currentMission.objectId);
                //参加したミッションがある

                Challengers
                .equalTo("userid",currentUser.objectId)
                .equalTo("status","finish")
                .equalTo("result","success").fetchAll()
                .then(function(results){
                    // 一致するデータの回数＝成功回数
                    avatorStatus.mainCurrent = results.length;
                    success(avatorStatus);
                })                
                .catch(function(err){
                    console.log("getAvatorStatus query err");
                    failed("query err");
                });
            }else{
                console.log("前回参加ミッションなし" );
                //一度もミッションに参加してない
                //開催中のミッションを探す
                success(avatorStatus);
                //初期値のまま表示
            }
        } else {
            console.log("未ログインまたは取得に失敗");
            return;
        }
    };

    // 西島（↑の getAvatorStatus と処理が被っているので、バグになりやすい注意）
    // Lvだけの計算用に取得関数
    data.getAvatorLv = function(success,failed){
        console.log("Challenger getAvatorLv");
        var avatorStatus = {};
        avatorStatus.mainCurrent  =  0;

        var currentUser = data.ncmb.User.getCurrentUser();
        avatorStatus.user = currentUser.userName;

        if (currentUser) {
            var Challengers = data.ncmb.DataStore("challengers");
            var currentMission = data.currentMission;
            var currentMissionResult = "";
            if(currentMission){
                console.log("前回参加ミッションID：" + currentMission.objectId);
                //参加したミッションがある

                Challengers
                .equalTo("userid",currentUser.objectId)
                .equalTo("status","finish")
                .equalTo("result","success").fetchAll()
                .then(function(results){
                    // 一致するデータの回数＝成功回数
                    avatorStatus.mainCurrent = results.length;
                    success(avatorStatus);
                })                
                .catch(function(err){
                    console.log("getAvatorLv query err");
                    failed("query err");
                });
            }else{
                console.log("前回参加ミッションなし" );
                //一度もミッションに参加してない
                //開催中のミッションを探す
                success(avatorStatus);
                //初期値のまま表示
            }
        } else {
            console.log("未ログインまたは取得に失敗");
            return;
        }
    };
    
    // 達成回数からLvを計算する関数
    /* それぞれのレベルアップ具合
        アバターと背景 
            達成度 0: アバター△、背景△
            達成度 1: アバター○、背景△
            達成度 2: アバター○、背景○
            達成度 3: アバター◎、背景○
            達成度 4: アバター◎、背景◎
    */
    data.calcLv = function(mainCurrent){
        var lvThre    = [ 0, 1, 3, 100 ];       // アバタ：Lv1のスレッショルド, Lv2, Lv3, ∞
        var blvThre   = [ 0, 2, 4, 100 ];       // 背景用：
        var l = 0, b = 0;
        for( var i = 1; i < lvThre.length; i++ ){
            if( lvThre[i-1]  <= mainCurrent  ){ l = i; }
        }
        for( var i = 1; i < blvThre.length; i++ ){
            if( blvThre[i-1] <= mainCurrent  ){ b = i; }
        }
        return {lv:l,blv:b};
    };

 
    return data;
});

