//global scope
var columnID = 0
var gameScore = {
    score:0,
    toll:0
}

setTimeout(repeatAnims, 500)
repeatAnims()

function repeatAnims() {
    setInterval(function() {
        dropMissile(2000)
    }, 1000)
}

function dropMissile(animationTime) {
    var columnNumber = randomNumGen(4)
    var $missile = $('<img src="img/missile-drop-down-white.png" ' +
        'class="missile missile-'+ columnNumber +'">')
    $('#pos-'+columnNumber).prepend($missile)

    $missile.animate({
        top: "+=550"
    }, animationTime, "linear", function () {
        missileHitsCity()
        $(this).remove()
    })
}

function missileHitsCity() {
    gameScore.score -= 1
    gameScore.toll += 10000
    document.querySelector('#score').textContent = gameScore.score
    document.querySelector('#toll').textContent = gameScore.toll
}

function randomNumGen(topLimit) {
    var randomNum = Math.ceil(Math.random() * topLimit)
    return(randomNum)
}

function createMissileEventHandler() {
    var cities = document.querySelectorAll('.city')

    cities.forEach(function(city) {
        city.addEventListener('click', function() {
            columnID = this.getAttribute('data-city')
            isHit()
        })
    })//end forEach

}

function isHit() {
    var cityNumber = columnID
    var missileNumber = '.missile-' + cityNumber
    var missiles = document.querySelectorAll(missileNumber)
    var hasMissiles = document.querySelectorAll(missileNumber).length
    if (hasMissiles) {
        gameScore.score += hasMissiles
        document.querySelector('#score').textContent = gameScore.score
        $(missileNumber).stop()
        missiles.forEach(function (missile) {
            missile.classList.remove(missileNumber)
            missile.src = "img/missile-explosion.gif";
            setTimeout(function () {
                try {
                    missile.parentNode.removeChild(missile);
                } catch (e) {
                    // squash errors where the missile is already exploding and we don't need to remove it.
                }
            }, 500)
        })
    } else {
        gameScore.score -= 1
        document.querySelector('#score').textContent = gameScore.score
    }
}

function listenKeypressMissiles() {
    clicked = false
    document.addEventListener('keypress', function(e) {
        var keys = {
            'q': '1',
            'w': '2',
            'e': '3',
            'r': '4'
        }
        if (e.key in keys) {
            columnID = keys[e.key]
            isHit()
        }
    })
}

createMissileEventHandler()
listenKeypressMissiles()

