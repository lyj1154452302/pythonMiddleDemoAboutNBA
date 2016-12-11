$(function(){
		$.getJSON("teamData.json",function(data){
		var basicInfo = data['basicInfo'];
		$.each(basicInfo,function(index,info){
			var teamName = info['队名'];
			var headCoach = info['主教练'];
			var city = info['城市'];
			var area = info['分区'];
			var boss = info['老板'];
			var court = info['球场'];
			var startNBA = info['进入NBA'];
			var championCount = info['夺冠次数'];
			var currentRank = info['当前排名'];
			$("#teamTitle").text(city+teamName);
			$("#teamName").text(teamName);
			$("#headCoach").text(headCoach);
			$("#city").text(city);
			$("#area").text(area);
			$("#boss").text(boss);
			$("#court").text(court);
			$("#startNBA").text(startNBA);
			$("#championCount").text(championCount);
			$("#currentRank").text(currentRank);
		});
		var lastFiveGames = data['lastFiveGames'];
		var dateList = $(".date");
		var dataList = $(".data");
		var count = 0;
		$.each(lastFiveGames,function(index,info){
			var date = info['日期'];
			var data = info['数据'];
			dateList.eq(count).text(date);
			dataList.eq(count).text(data);
			count += 1;
		});
		var nextFiveGames = data['nextFiveGames'];
		$.each(nextFiveGames,function(index,info){
			var date = info['日期'];
			var data = info['数据'];
			dateList.eq(count).text(date);
			dataList.eq(count).text(data);
			count += 1;
		});
		var playersAveragedData = data['playersAveragedData'];
		var tableTr = $("tr");
		// alert(tableTr.length);
		var count = 1;
		$.each(playersAveragedData,function(index,info){
			var playerName = "<td>" + info['球员'] + "</td>";
			var playerThree = "<td>" + info['三分'] + "</td>";
			var playerRebound = "<td>" + info['总篮板'] + "</td>";
			var playerAsist = "<td>" + info['助攻'] + "</td>";
			var playerSteal = "<td>" + info['抢断'] + "</td>";
			var playerBlockShot = "<td>" + info['盖帽'] + "</td>";
			var playerScore = "<td>" + info['得分'] + "</td>";
			tableTr.eq(count).append(playerName);
			tableTr.eq(count).append(playerThree);
			tableTr.eq(count).append(playerRebound);
			tableTr.eq(count).append(playerAsist);
			tableTr.eq(count).append(playerSteal);
			tableTr.eq(count).append(playerBlockShot);
			tableTr.eq(count).append(playerScore);
			count += 1;
		});
		$("table").attr("cellspacing","15");			
	});
})
