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
        console.log($(this))
        $(this).remove()
        document.querySelector('#toll').innerHTML = incrementToll()
    })
}

function randomNumGen() {
    var randomNum = Math.floor(Math.random() * 6) + 1
    return(randomNum)
}

function incrementToll() {
    var previousToll = parseInt(document.querySelector('#toll').innerHTML)
    var currentToll = Math.round(previousToll + ((Math.random()+1)*1E6))
    return currentToll
}

