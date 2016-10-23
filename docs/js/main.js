//		var Challengers = data.ncmb.DataStore("challengers");
//		var currentUser = data.ncmb.User.getCurrentUser();
//		var currentMissionResult = "";
var MissionDataStore = {};
var missions = {};
var currentMission = {};
var dateList = [];


$(function() {

	connectServer("sumioka",function(results_missions){
		missions = results_missions;
		updateMissionList();
		updateDatepicker(["2016-10-19"]);				
	});

	// EventHandlers
	$("#server").change(function(){
		var serverID = $(this).val();
		connectServer(serverID,function(results_missions){
			missions = results_missions;
			updateMissionList();
			updateDatepicker(["2016-10-19"]);
		});
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
			newMissionNo = Number(lastNo) + 1;
		}
		$("#missionNo").html(newMissionNo);
	})



	$("#createMission").click(function(){

		if($("#missionNo").text() == "未選択") {
			$("#createMissionMessage").html("missinoNoが未設定です");
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
		.set("end_datetime" , $("#end_date").val() + "T" + $("#end_time").val() + ":00.000+09:00")
		.save()
		.then(function(missionData){
			console.log(JSON.stringify(missionData));
			console.log("create missionData done");
		})
		.catch(function(err){
			console.log(err);
		});
		//console.log($("#entry_syutsudai").val());
		//console.log($("#entry_ouen").val());
	});

	$("#updateMission").click(function(){
		// var missionData = missions[XXXXXXXXXX TODO]
		// missionData
		// .set(missionNo , $("#missionNo").text())
		// .set(date_val , $("#date_val").val())
		// .set(title , $("#title").val())
		// .set(category , $("#category").val())
		// .set(description , $("#description").val())
		// .set(tips , $("#tips").val())
		// .set(status , $("#status").val())
		// .set(start_datetime , $("#start_datetime").val())
		// .set(end_datetime , $("#end_datetime").val())
		// .save();
		//console.log($("#entry_syutsudai").val());
		//console.log($("#entry_ouen").val());
	});

});




function connectServer(serverID, success){
	data.ncmb = new NCMB(servers[serverID].appKey,servers[serverID].clientKey);
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
				 + mission.status + ((mission.status == "active") ? "<button>close</button>" : "<button>active</button>") + "</td><td>" 
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

function updateDatepicker(){

	for(var idx in missions){
		var mission = missions[idx];
		if(mission.start_datetime && mission.start_datetime.length == 29){
			// 正しくは$.datepicker.parseDate( format, value, settings )　とか使うはず。
			var date = mission.start_datetime.substr(0,10);
			dateList.push(date);
		}
	}

	$("#datepicker").datepicker({
		// 日付が選択された時、日付をテキストフィールドへセット
		onSelect: function(dateText, inst) {
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
			} else {
				$("#missionNo").text("");
				$("#objectId").html('<button id="makeNewMission">番号新規作成</button>');
				$("#title").val("");
				$("#category").val("food");
				$("#description").val("");
				$("#tips").val("");
				$("#status").val("close");
				$("#start_time").val("09:00");
				$("#end_time").val("18:00");
			}
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



