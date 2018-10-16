$( window ).on( "load", function() {
    $('#splash-title-rocket').animate({
        left: "+=5000",
    }, 3000)
    setTimeout(function() {
        $('#splash-title').fadeIn(50)
    }, 800)
})
