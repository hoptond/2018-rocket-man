//global scope

var columnID = 0


var gameScore = {
    score:0,
    toll:0
}

var impacts = [0, 0, 0, 0]

setTimeout(repeatAnims, 500)
repeatAnims()

function repeatAnims() {
    setInterval(function() {
        dropMissile(2000)
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
        hitCityEffect(columnNumber)
        $(this).remove()
        document.querySelector('#toll').innerHTML = incrementToll()
    })
}

function missileHitsCity() {
    gameScore.score -= 1
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
            columnID = this.getAttribute('data-city')
            isHit()
        })
    })//end forEach

}

function isHit() {
    var cityNumber = columnID
    var bombNumber = '.bomb-' + cityNumber
    var hasBombs = document.querySelectorAll(bombNumber).length
    if (hasBombs) {
        gameScore.score += hasBombs
        document.querySelector('#score').textContent = gameScore.score
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

createBombEventHandler()

listenKeypressMissiles()


function incrementToll() {
    var previousToll = parseInt(document.querySelector('#toll').innerHTML)
    var currentToll = Math.round(previousToll + ((Math.random()+1)*1E6))
    return currentToll
}

function hitCityEffect(cityid) {
    makeNoise('hitcity')
    var explosion = document.querySelector('#city-' + cityid + ' .explosion')
    console.log(impacts[cityid - 1])
    clearTimeout(impacts[cityid - 1])
    explosion.setAttribute('src', 'img/city-hit.gif' + '?explod=' + cityid)
    impacts[cityid - 1] = setTimeout( function (e) {
        explosion.removeAttribute('src')
    }, 1250)
}

