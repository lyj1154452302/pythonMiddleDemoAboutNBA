$(function(){
	$.getJSON("teamData.json",function(data){
		var dataKing = data['dataKing'];
		$.each(dataKing,function(index,info){
			var dataName = "<p>" + info['数据名称'] + "</p>";
			var playerImg = "<img src=" + info['球员照片'] + " alt='' /> <br />" ;
			var playerData = "<p>" + info['球员数据'] + "</p>";

			$(".kingImg").eq(index).append(dataName);
			$(".kingImg").eq(index).append(playerImg);
			$(".kingImg").eq(index).append(playerData);
		});
		
		
	})
})