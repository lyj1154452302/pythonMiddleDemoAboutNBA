$(function(){
	$.getJSON("teamData.json",function(data){
		var playersAveragedData = data['playersAveragedData'];
		var list = [["Element","场均得分",{role:"style"}]];
		var colorList = ["#00ffff","#00ff7f","#00ff00","#00cdcd","#008b45","#006400","#0000aa","#00008b","#000000","#00868b","#009acd","#00cd00","#00e5ee","#00688b","#eeee00"];
		var colorCount = 0;
		$.each(playersAveragedData,function(index,info){
			var playerName = info['球员'];
			var playerData = info['得分'];
			list.push([playerName,parseFloat(playerData),"color: "+colorList[colorCount]]);
			colorCount += 1;
		})
		google.charts.load("current", {packages:['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		function drawChart() {
		  var data = google.visualization.arrayToDataTable(list);

		  var view = new google.visualization.DataView(data);
		  view.setColumns([0, 1,
		                   { calc: "stringify",
		                     sourceColumn: 1,
		                     type: "string",
		                     role: "annotation" },
		                   2]);

		  var options = {
		    title: "球员场均得分统计图",
		    width: 830,
		    height: 560,
		    bar: {groupWidth: "95%"},
		    legend: { position: "none" },
		  };
		  var chart = new google.visualization.ColumnChart(document.getElementById("scoreBoard"));
		  chart.draw(view, options);
		}

	})
});