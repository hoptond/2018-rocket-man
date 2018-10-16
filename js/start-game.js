


$( window ).on( "load", function () {
    var $rocketImg = $('#splash-title-rocket')
    var $title = $('#splash-title')
    $rocketImg.animate({
        left: "+=5000",
    }, 3000)

    setTimeout(function(){
     $title.fadeIn(50)
    }
    , 800)



})

document.getElementById('splash-open-game').addEventListener("click", function(){
    document.getElementById('splash-screen').style.display = 'none'
})