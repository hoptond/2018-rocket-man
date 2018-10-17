setTimeout(repeatAnims, 500)
repeatAnims()

function repeatAnims() {
    setInterval(function() {
        dropMissile(1000)
    }, 1000)
}

function dropMissile(animationTime) {
    var columnNumber = randomNumGen()
    $('#pos-'+columnNumber).prepend('<img src="img/missile-drop-down-white.png" ' +
        'class="missile" id="bomb-'+ columnNumber +'">')

    $('#bomb-' + columnNumber).animate({
        top: "+=550"
    }, animationTime, "linear", function () {
        $(this).remove()
    })
}

function randomNumGen() {
    var randomNum = Math.ceil(Math.random() * 4)
    return(randomNum)
}

function explodeMissile() {
    var cities = document.querySelectorAll('.city')

    cities.forEach(function(city) {
        city.addEventListener('click', function () {
            var cityNumber = this.getAttribute('data-city')
            var elementExists = document.getElementById('bomb-' + cityNumber);
            if (elementExists != null) {
                console.log('let do something')
                $('#bomb-' + cityNumber).stop()
            }

        })
    })//end forEach
}

explodeMissile()