// This is a JavaScript file

myApp.factory('challenger',function($http){
    "use strict";
    console.log("Challenger init");
    var data = {};
    data.isLogined = false;
    var username = "";
    var password = "";
    // ここのキー情報を書き換えてください
    data.ncmb = new NCMB("620f1b09c7cf8dcf9bd83752f77a3903c28deb74adb0053190d9cd968b4bbdce","5e25a9a66756aef9b7ac2f65b99c0132fb103cb48b3d54345ee4e17f520f51d7");

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
            ここにユーザIDの重複チェック処理を入れる by kodaka
        */
        console.log("Checking duplicate userid");
        data.ncmb.User.equalTo("userName", userid)
        .fetchAll()
        .then(function(results){
            if (results.length > 0){
                console.log("Found duplicate userid");
                failed("The user name you specified was already used.")
            }
        })
        .catch(function(err){
          // エラー処理
                console.log("Check duplicate failed "  + err);
                failed(err);
        });
        
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
    
    data.baasurlbase = "https://mb.api.cloud.nifty.com/2013-09-01/applications/xGpizk5NhMefcgtU/publicFiles/";
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
    data.MissionStart = function(mission_id,success,failed){
        console.log("Challenger MissionStart");
        var Challengers = data.ncmb.DataStore("challengers");
        var challengers = new Challengers();
        var currentUser = data.ncmb.User.getCurrentUser();
        challengers.set("missionid", mission_id)
             .set("userid", currentUser.objectId)
             .set("username", currentUser.userName)
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
    data.MissionRefuse = function(mission_id,success,failed){
        //スポットデータの初期化
        console.log("Challenger MissionRefuse");
        var Challengers = data.ncmb.DataStore("challengers");
        var currentUser = data.ncmb.User.getCurrentUser();
        var challengers = new Challengers();
        challengers.set("missionid", mission_id)
            .set("userid", currentUser.objectId)
            .set("username", currentUser.userName)
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
                    success(results[0]);
                }else{
                   failed("no message");
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
        
    }
    
 
    return data;
});
