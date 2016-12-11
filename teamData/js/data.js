// function loadingScript(){
//     $.getScript("https://www.gstatic.com/charts/loader.js",function(){
//         $.getScript("./js/readBasicInfo.js",function(){
//             $.getScript("./js/scoreBoard.js",function(){
//                 $.getScript("./js/threeBoard.js",function(){
//                     $.getScript("./js/reboundBoard.js",function(){
//                         $.getScript("./js/asistBoard.js",function(){
//                             $.getScript("./js/stealBoard.js",function(){
//                                 $.getScript("./js/blockShotBoard.js",function(){
//                                     $.getScript("./js/dataKing.js",function(){
//                                         $("#loading").hide();
//                                         $("#infoPage").show();
//                                     })
//                                 })
//                             })
//                         })
//                     })
//                 })
//             })
//         })
//     })
// }
$(function(){
    // $("#infoPage").hide();
    // setTimeout("loadingScript()",3000);
    $.getScript("https://www.gstatic.com/charts/loader.js",function(){
        $.getScript("./js/readBasicInfo.js",function(){
            $.getScript("./js/scoreBoard.js",function(){
                $.getScript("./js/threeBoard.js",function(){
                    $.getScript("./js/reboundBoard.js",function(){
                        $.getScript("./js/asistBoard.js",function(){
                            $.getScript("./js/stealBoard.js",function(){
                                $.getScript("./js/blockShotBoard.js",function(){
                                    $.getScript("./js/dataKing.js",function(){
                                        $("#loading").hide();
                                        $("#infoPage").show();
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})
