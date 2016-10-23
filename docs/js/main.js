//		var Challengers = data.ncmb.DataStore("challengers");
//		var currentUser = data.ncmb.User.getCurrentUser();
//		var currentMissionResult = "";
var MissionDataStore = {};
var missions = {};

var currentMission = null;
var currentDate = null;
var currentServerID = "sumioka";

$(function() {

	// connectServer, updateMissionsList, updateDatepicker
	init();

	// EventHandlers
	$("#server").change(function(){
		currentServerID = $(this).val();
		init(currentServerID);
	});

	$("#makeNewMission").click(function(){
		var lastMission = missions[0];
		if(!lastMission){
			console.log("lastMission not found");
			return;
		}

		var lastNo = lastMission.missionNo;
		if(!lastNo){
			console.log("lastNo not found");
			return;					
		}
		if(lastNo == "undefined"){
			console.log("lastNo is undefined");
		}

		var newMissionNo;
		if(lastNo.substr(0,1) == "M"){
			var number = lastNo.substr(1);
			newMissionNo = "M" + ("0000"+ (Number(number) + 1)).slice(-4);
		} else {
			try {
				newMissionNo = Number(lastNo) + 1;
			} catch (e) {
				newMissionNo = "M1001"
			}
		}
		$("#missionNo").html(newMissionNo);
	})



	$("#saveMission").click(function(){

		if($("#missionNo").text() == "未設定") {
			$("#saveMissionMessage").html("missinoNoが未設定です");
			return;
		}
		var missionData = new MissionDataStore();
		missionData
		.set("missionNo" , $("#missionNo").text())
		.set("title" , $("#title").val())
		.set("category" , $("#category").val())
		.set("description" , $("#description").val())
		.set("tips" , $("#tips").val())
		.set("status" , $("#status").val())
		.set("start_datetime" , $("#start_date").val() + "T" + $("#start_time").val() + ":00.000+09:00")
		.set("end_datetime" , $("#end_date").val() + "T" + $("#end_time").val() + ":00.000+09:00");

		if(currentMission){
			missionData.set("objectId", currentMission.objectId)
			.update()
			.then(function(missionData){
				console.log(JSON.stringify(missionData));
				console.log("update missionData done");
				init();
				$("#saveMissionMessage").html("保存しました。");
			})
			.catch(function(err){
				$("#saveMissionMessage").html("保存に失敗しました。サーバとうまくつながっていないみたいです");
				init();
				console.log(err);
			});
		} else {
			missionData
			.save()
			.then(function(missionData){
				console.log(JSON.stringify(missionData));
				console.log("create missionData done");
				init();
				$("#saveMissionMessage").html("保存しました。");
			})
			.catch(function(err){
				console.log(err);
				init();
				$("#saveMissionMessage").html("保存に失敗しました。サーバとうまくつながっていないみたいです");
			});
		}

		var missionNo = $("#missionNo").text();
		var syutsudaiFileName = missionNo + "-entry-syutsudai.png";
		var syutsudaiFileData = document.getElementById("entry_syutsudai").files[0];

		if(syutsudaiFileData){
			data.ncmb.File.upload(syutsudaiFileName, syutsudaiFileData)
			  .then(function(res){
			    // アップロード後処理
			  })
			  .catch(function(err){
			    // エラー処理
			  });			
		}

		var ouenFileName = missionNo + "-entry-ouen.png";
		var ouenFileData = document.getElementById("entry_ouen").files[0];

		if(ouenFileData){
			data.ncmb.File.upload(ouenFileName, ouenFileData)
			  .then(function(res){
			    // アップロード後処理
			  })
			  .catch(function(err){
			    // エラー処理
			  });			
		}

	});

});

function init(serverID){
	if(serverID){
		currentServerID = serverID;
	}
	connectServer(currentServerID,function(results_missions){
		missions = results_missions;
		updateMissionList();
		updateDatepicker();
		if(currentDate){
			onSelectImpl(currentDate);
		}
	});
}

function connectServer(serverID, success){
	data.ncmb = new NCMB(servers[serverID].appKey,servers[serverID].clientKey);
	data.baasUrlBase = servers[serverID].baasUrlBase;
	MissionDataStore = data.ncmb.DataStore("missions");
	MissionDataStore.order("createDate",true)    // TODO: 開始日時順にしたほうがいい。XXX:undefinedの扱い
	.fetchAll()
	.then(function(results){
		console.log(JSON.stringify(results));
		success(results);
	}).catch(function(err){
		console.log(err);
	});
}

function updateMissionList(){
	   if(missions.length>0){
	   	var th = "<tr><td>ミッションNo</td><td>タイトル</td><td>カテゴリ</td><td>説明</td><td>応援コメント</td><td>状態</td><td>開始</td><td>終了</td></tr>";

			$("#missionList").html(th);
	   	for(var i = 0; i < missions.length; i++){
	   		var mission = missions[i];

	   		var start_date, end_date;
	   		if(mission.start_datetime && mission.start_datetime.length == 29){
					start_datetime = mission.start_datetime.substr(0,10) + "<br/>" + mission.start_datetime.substr(11,5);
				} else {
					start_datetime = mission.start_datetime;
				}
				if(mission.end_datetime && mission.end_datetime.length == 29){
					end_datetime = mission.end_datetime.substr(0,10) + "<br/>" + mission.end_datetime.substr(11,5); 
				} else {
					end_datetime = mission.end_datetime;
				}

				var tr = "<tr id='mission_" + i + "'><td>"
				 + mission.missionNo + "</td><td>"
				 + mission.title + "</td><td>"
				 + mission.category + "</td><td>" 
				 + mission.description + "</td><td>" 
				 + mission.tips + "</td><td>"
				 + mission.status
				 		 + ((mission.status == "active")
				 		 	? "<button onclick='changeStatus(\"" + mission.objectId + "\"," + mission.missionNo + ",\"close\")'>close</button>" 
				 		 	: "<button onclick='changeStatus(\"" + mission.objectId + "\"," + mission.missionNo + ",\"active\")'>active</button>") + "</td><td>" 
				 + start_datetime + "</td><td>" 
				 + end_datetime + "</td></tr>";
				 $("#missionList").append(tr);
	   	}
	   }else{
	   	var example = "<tr><td>1</td><td>炭酸飲まない</td><td>food</td><td>炭酸は体に悪い</td><td>おうえん</td><td>active<button>close</button></td><td>2016-10-19T09:00:00</td><td>2016-10-19T17:00:00</td></tr>"
			+ "<tr><td>2</td><td>マンガ読まない</td><td>game</td><td>漫画じゃなくて勉強しよう</td><td>応援コメント</td><td>close<button>active</button></td><td>2016-10-26T09:00:00</td><td>2016-10-26T17:00:00</td></tr>";
			$("#missionList").append(example);
			console.log("no missions");
	   }

}

function changeStatus(objectId, missionNo, status){
	var missionData = new MissionDataStore();
	missionData.set("objectId", objectId)
	.set("status", status)
	.update()
	.then(function(missionData){
		console.log("update status:" + missionNo + "," + objectId + "," + status);
		init();
		$("#missionListMessage").html("missionNo:" + missionNo + "は" + status + "になりました。");
	})
	.catch(function(err){
		console.log("update status失敗:" + missionNo + "," + objectId + "," + status);
		$("#missionListMessage").html("失敗　missionNo:" + missionNo + "は" + status + "にすることに失敗しました。");
		init();
		console.log(err);
	});

}


function updateDatepicker(){

	var dateList = [];
	for(var idx in missions){
		var mission = missions[idx];
		if(mission.start_datetime && mission.start_datetime.length == 29){
			// 正しくは$.datepicker.parseDate( format, value, settings )　とか使うはず。
			var date = mission.start_datetime.substr(0,10);
			dateList.push(date);
		}
	}
	$("#datepicker").datepicker("destroy");
	$("#datepicker").datepicker({
		// 日付が選択された時、日付をテキストフィールドへセット
		onSelect: function(dateText, inst) {
			currentDate = dateText;
			onSelectImpl(dateText);
		},
		// 既にイベントが入っている所を太字で表示
		beforeShowDay: function(date) {
			var ncmbDateStr = createNcmbDateStr(date);
			if (dateList.indexOf(ncmbDateStr) != -1) {
				// 選択可能、太字
				return [true, 'datepicker-event-exist', ''];
			} else {
				return [true, 'datepicker-event-not-exist'];
			}
		}
	});
}

function onSelectImpl(dateText){
	//$("#date_val").val(dateText);
	var dateParsed = $.datepicker.parseDate( "mm/dd/yy", dateText);
	var date = $.datepicker.formatDate( "yy-mm-dd", dateParsed);
	$("#start_date").val(date);
	$("#end_date").val(date);

	currentMission = null;
	for(var idx in missions){
		var mission = missions[idx];
		if(mission.start_datetime && date == mission.start_datetime.substr(0,10)){
			currentMission = mission;
			break;
		}
	}
	if(currentMission){
		$("#missionNo").text(mission.missionNo);
		$("#objectId").text(mission.objectId);
		$("#title").val(mission.title);
		$("#category").val(mission.category);
		$("#description").val(mission.description);
		$("#tips").val(mission.tips);
		$("#status").val(mission.status);
		$("#start_date").val(mission.start_datetime.substr(0,10));
		$("#start_time").val(mission.start_datetime.substr(11,5));
		$("#end_date").val(mission.end_datetime.substr(0,10));
		$("#end_time").val(mission.end_datetime.substr(11,5));
		$("#entry_syutsudai_img").attr("src", data.baasUrlBase + mission.missionNo + "-entry-syutsudai.png");
		$("#entry_ouen_img").attr("src", data.baasUrlBase + mission.missionNo + "-entry-ouen.png");
	} else {
		$("#missionNo").text("未設定");
		$("#objectId").html('<button id="makeNewMission">番号新規作成</button>');
		$("#title").val("");
		$("#category").val("food");
		$("#description").val("");
		$("#tips").val("");
		$("#status").val("close");
		$("#start_time").val("09:00");
		$("#end_time").val("18:00");
		$("#entry_syutsudai_img").attr("src", "");
		$("#entry_ouen_img").attr("src", "");
	}
}

function createNcmbDateStr(date) {
	var year = date.getYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	if (year < 2000) { year += 1900 };
	if (month < 10)  { month = "0" + month };
	if (day < 10)    { day = "0" + day };

	var dateStr = year + "-" + month + "-" + day;
	return dateStr;
}






function getChallengers(){

	var missionTitleTable = {};
	for(var idx in missions){
		missionTitleTable[missions[idx].objectId] = missions[idx].title;
	}


	var ChallengersDataStore = data.ncmb.DataStore("challengers");
	if(currentMission){
		ChallengersDataStore.equalTo("missionid",currentMission.objectId)
	} else {
		$("#challengerListMessage").text("missionを選んで絞り込んだ方がいいです。。");		
	}

	ChallengersDataStore
	.fetchAll()
	.then(function(results){

		var challengers = results;
		if(challengers.length>0){
			var th = "<tr><td>ID</td><td>名前</td><td>ミッション</td><td>status</td><td>result</td></tr>";

			$("#challengerList").html(th);
			for(var i = 0; i < challengers.length; i++){
				var challenger = challengers[i];

				var tr = "<tr id='challenger_" + i + "'><td>"
				 + challenger.userid + "</td><td>"
				 + challenger.username + "</td><td>"
				 + missionTitleTable[challenger.missionid] + "</td><td>" 
				 + "<span id=\"" + challenger.objectId + "_status\">" + challenger.status + "</span>"
				 	+ "<select onChange='changeChallengerStatus(\"" + challenger.objectId + "\",\"" + challenger.status + "\",this)'>"
						+ "<option value=\"notChange\">　</option>"
						+ "<option value=\"\">未設定</option>"
						+ "<option value=\"refuse\">refuse</option>"
						+ "<option value=\"finish\">finish</option>"
				 	+ "</select><span id=\"" + challenger.objectId + "_status_message\" style=\"color:red;\"></span></td><td>" 
				 + "<span id=\"" + challenger.objectId + "_result\">" + challenger.result + "</span>"
				 	+ "<select onChange='changeChallengerResult(\"" + challenger.objectId + "\",\"" + challenger.result + "\",this)'>"
						+ "<option value=\"notChange\">　</option>"
						+ "<option value=\"\">未設定</option>"
						+ "<option value=\"success\">success</option>"
						+ "<option value=\"failed\">failed</option>"
				 	+ "</select><span id=\"" + challenger.objectId + "_result_message\" style=\"color:red;\"></span></td></tr>";
				 $("#challengerList").append(tr);
			}
		}else{
			var example = "<tr><td>no challengers</td></tr>";
			$("#challengerList").append(example);
			console.log("no challengers");
		}
	})
	.catch(function(err){
		console.log("get challengers err " + err);
	});

}


function changeChallengerStatus(objectId, prev_status, elem){
	var status = elem.value;
	if(status == "notChange"){
		return;
	}
	var ChallengersDataStore = data.ncmb.DataStore("challengers");
	var challengerData = new ChallengersDataStore();
	challengerData.set("objectId", objectId)
	.set("status", status)
	.update()
	.then(function(challengerData){
		console.log("update challenger status:" + objectId + "," + status);
		$("#" + objectId + "_status").text(status);
		$("#" + objectId + "_status_message").text("changed from " + prev_status);
	})
	.catch(function(err){
		console.log("update challenger status失敗:" + objectId + "," + status);
		$("#challengerListMessage").html("失敗　challenger:" + objectId + "は" + status + "にすることに失敗しました。");
		console.log(err);
	});
}

function changeChallengerResult(objectId, prev_result, elem){
	var result = elem.value;
	if(result == "notChange"){
		return;
	}
	var ChallengersDataStore = data.ncmb.DataStore("challengers");
	var challengerData = new ChallengersDataStore();
	challengerData.set("objectId", objectId)
	.set("result", result)
	.update()
	.then(function(challengerData){
		console.log("update challenger result:" + objectId + "," + result);
		$("#" + objectId + "_result").text(result);
		$("#" + objectId + "_result_message").text("changed from " + prev_result);
	})
	.catch(function(err){
		console.log("update challenger result失敗:" + objectId + "," + result);
		$("#challengerListMessage").html("失敗　challenger:" + objectId + "は" + result + "にすることに失敗しました。");
		console.log(err);
	});
}
