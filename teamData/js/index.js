$(function(){
	$("#topTab").hide();
	$("#bottomTab").hide();
	//读取所有球队，将所有球队图片插入
	$.ajax({
		url:"/cgi-bin/readAllTeam.py",
		type:"POST",
		data: {data:"1"},
		success:function(response){
			// clearTimeout(t);
			if(response == 0){
				alert("你输入的球队不存在,请重新输入");
				$("#tip").text("");	
			}else{
				var allTeam = response.split(',');
				var len = allTeam.length;
				var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") 
				var allTeamList = new Array();
				$.each(allTeam,function(index,item){
					var a;
					if(index == len){
						a = item.replace(pattern,'');
						a = a.replace(pattern,'');	
						a = a.replace(pattern,'');
						a = a.replace(' ','');							
					}else if(index == 0){
						a = item.replace(pattern,'');
						a = a.replace(pattern,'');	
						a = a.replace(pattern,'');	
						a = a.replace(' ','');
					}else{
						a = item.replace(pattern,'');
						a = a.replace(pattern,'');	
						a = a.replace(pattern,'');
						a = a.replace(' ','');
					}
					if(a == "trail%20blazers"){
						a = "trail blazers";
					}
					allTeamList.push(a);
				})
				$.each(allTeamList,function(index,info){
					if(index == 0){
						var txt = "<div class='item active'><img src='./images/"+info+".jpg'></div>";
						$("#collapseImg").append(txt);
					}else{
						var txt = "<div class='item'><img src='./images/"+info+".jpg'></div>";
						$("#collapseImg").append(txt);
					}
				})
			}
		}
	});
	
	$("li.dropdown").mouseover(function(){
		$(this).addClass('open');
	}).mouseout(function(){
		$(this).removeClass('open');
	})

	//搜索提交
	$("#searchForm").submit(function(){
		var teamName = $("#searchInput").val();
		$.ajax({
			url:"/cgi-bin/pythonDemoCgiTest.py",
			type:"POST",
			data: {teamName:teamName},
			beforeSend:function(){
				$.getScript("./js/empty.js",function(){
					$("#topTab").hide();
					$("#bottomTab").hide();
					$("#tip").text("正在搜索...");
				})					
			},
			success:function(response){
				// clearTimeout(t);
				if(response == 0){
					alert("你输入的球队不存在,请重新输入");
					$("#tip").text("");	
				}else{
					$("#tip").text("");
					$.getScript("./js/data.js",function(){
						$("#topTab").show();
						$("#bottomTab").show();
					});
				}
			}
		});
		return false;
	});

	//菜单栏点击球队
	$(".menuTeam").click(function(){
		var teamName = $(this).children('.teamNameEn').text();
		$.ajax({
			url:"/cgi-bin/pythonDemoCgiTest.py",
			type:"POST",
			data: {teamName:teamName},
			beforeSend:function(){
				$.getScript("./js/empty.js",function(){
					$("#topTab").hide();
					$("#bottomTab").hide();
					$("#tip").text("正在搜索...");
				})					
			},
			success:function(response){
				// clearTimeout(t);
				if(response == 0){
					alert("你输入的球队不存在,请重新输入");
					$("#tip").text("");	
				}else{
					// $("#tip").text("");
					// window.open("teamData.html");
					$("#tip").text("");
					$.getScript("./js/data.js",function(){
						$("#topTab").show();
						$("#bottomTab").show();
					});
				}
			}
		});
	});
});