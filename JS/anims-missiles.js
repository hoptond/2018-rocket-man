setTimeout(repeatAnims, 500)
repeatAnims()

function repeatAnims() {
    setInterval(function() {
        dropMissile(1000)
    }, 1000)
}

function dropMissile(animationTime) {
    var columnNumber = randomNumGen()
    var $bomb = $('<img src="img/missile-drop-down-white.png" ' +
        'class="missile bomb-'+ columnNumber +'">')
    $('#pos-'+columnNumber).prepend($bomb)

    $bomb.animate({
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
            var bombNumber = '.bomb-' + cityNumber
            var hasBombs = document.querySelectorAll(bombNumber).length
            console.log(hasBombs)
            if (hasBombs) {
                $(bombNumber).stop()
                var bombs = document.querySelectorAll(bombNumber)
                bombs.forEach(function (bomb) {
                        bomb.classList.remove(bombNumber)
                        bomb.src = "img/missile-explosion.gif";
                        setTimeout(function () {
                            try {
                                bomb.parentNode.removeChild(bomb);
                            } catch (e) {
                                // squash errors where the bomb is already exploding and we don't need to remove it.
                            }
                        }, 500)
                })
            }

        })
    })//end forEach
}

explodeMissile()