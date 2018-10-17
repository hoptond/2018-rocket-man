//global scope
var gameScore = {
    score:0,
    toll:0
}

setTimeout(repeatAnims, 500)
repeatAnims()

function repeatAnims() {
    setInterval(function() {
        dropMissile(10000)
    }, 1000)
}

function dropMissile(animationTime) {
    var columnNumber = randomNumGen(4)
    var $bomb = $('<img src="img/missile-drop-down-white.png" ' +
        'class="missile bomb-'+ columnNumber +'">')
    $('#pos-'+columnNumber).prepend($bomb)

    $bomb.animate({
        top: "+=550"
    }, animationTime, "linear", function () {
        missileHitsCity()
        $(this).remove()
    })
}

function missileHitsCity() {
    gameScore.score -= 1
    console.log(gameScore.score)
    gameScore.toll += randomNumGen(10000)
    document.querySelector('#score').textContent = gameScore.score
    document.querySelector('#toll').textContent = gameScore.toll
}

function randomNumGen(topLimit) {
    var randomNum = Math.ceil(Math.random() * topLimit)
    return(randomNum)
}


function createBombEventHandler() {
    var cities = document.querySelectorAll('.city')

    cities.forEach(function(city) {
        city.addEventListener('click', function() {
            var that = this
            isHit(that)
        })
    })//end forEach
}

createBombEventHandler()


function isHit(that) {
    var cityNumber = that.getAttribute('data-city')
    var bombNumber = '.bomb-' + cityNumber
    var hasBombs = document.querySelectorAll(bombNumber).length
    if (hasBombs) {
        gameScore.score += hasBombs
        document.querySelector('#score').textContent = gameScore.score
        console.log(gameScore.score)
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
    } else {
        gameScore.score -= 1
        document.querySelector('#score').textContent = gameScore.score
    }
}