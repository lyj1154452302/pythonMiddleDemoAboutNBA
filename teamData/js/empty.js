$(function(){
	$("#teamTitle").text("");
	$(".basicInfoItem").text("");
	$(".date").text("");
	$(".data").text("");
	var trList = $("table tr");
	
	for (var i = 1; i < trList.length; i++) {
		trList.eq(i).text("");
	};
	$(".dataBoard").text("");
	$(".kingImg").html("");
	// $.each(basicList,function(index,info){

	// })
})