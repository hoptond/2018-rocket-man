setTimeout(repeatAnims, 500)
repeatAnims()

function repeatAnims() {
    setInterval( function () {
        dropMissile(1000)
    }, 1000 )
}

function dropMissile(animationTime) {
    var columnNumber = randomNumGen()
    $('#pos-'+columnNumber).prepend('<img src="img/missile-drop-down-white.png" class="missile" id="bomb-'+ columnNumber +'">')

    $('#bomb-' + columnNumber).animate({
        top: "+=550"
    }, animationTime, "linear", function () {
        $(this).remove()
    })
}

function randomNumGen() {
    var randomNum = Math.floor(Math.random() * 4) + 1
    return(randomNum)
}

