


# Welcome to Onsen UI 2!

This template is using Onsen UI, a HTML5 framework that is focusing on the speed and ease of use.
For details, please check out [Onsen UI Website](http://onsenui.io) and [the documents](http://onsenui.io/v2/).

# 元のAPIキーから自分のAPIキーに変更する。
1.もとのAPIキーで検索

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

2.自分のAPIキーをニフティクラウドから取得して書き換える
    /www/js/challenger.js


# 以下、落書き

https://mb.api.cloud.nifty.com/2013-09-01/applications/J2MyTSYNctp6tx7e/publicFiles/readme.txt


https://mb.api.cloud.nifty.com/2013-09-01/applications/J2MyTSYNctp6tx7e/publicFiles/dansharies.apk

https://github.com/kawasymantec/dansharies/raw/master/dansharies.apk


    var cheerme_times = 0;


        cheerme_times++;
        if(cheerme_times % 5 == 0){            
            myNavigator.pushPage('cheermeHirose.html',{ animation: 'none'});        
        } else {
            myNavigator.pushPage('cheerme.html',{ animation: 'none'});        
        }