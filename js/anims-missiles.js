//global scope
var columnID = 0
var gameScore = {
    score:0,
    toll:0
}

/**
 * Function to prepend a missile to the html and then animate top to bottom
 * @param int animationTime the speed at which to drop a single missle
 */

function dropMissile(animationTime) {
    var columnNumber = randomNumGen(4)
    var $missile = $('<img src="img/missile-drop-down-white.png" ' +
        'class="missile missile-'+ columnNumber +'">')
    $('#pos-'+columnNumber).prepend($missile)

    $missile.animate({
        top: "+=550"
    }, animationTime, "linear", function() {
        missileHitsCity($(this))
    })
}

/**
 * Function call drops missile every 500ms
 */
function repeatAnims() {
    setInterval(function() {
        dropMissile(2000)
    }, 500)
}

/**
 * Function decrements game score and increments death toll and renders the scores on the page when a city is hit
 * @param that Had to pass the $(this) value into missileHitsCity() as 'that' because 'this' is a reserved word and therefore cannot pass 'this' as a parameter
 */
function missileHitsCity(that) {
    gameScore.score -= 1
    gameScore.toll += 10000
    document.querySelector('#score').textContent = gameScore.score
    document.querySelector('#toll').textContent = gameScore.toll
    that.remove()
}

/**
 * generates a random number
 * @param int topLimit the max desired random number to return
 */
function randomNumGen(topLimit) {
    return Math.ceil(Math.random() * topLimit)
}

/**
 * creates click handler on .city elems
 */
function createMissileClickHandler() {
    var cities = document.querySelectorAll('.city')

    cities.forEach(function(city) {
        city.addEventListener('click', function() {
            columnID = this.getAttribute('data-city')
            isHit()
        })
    })//end forEach
}
/**
 * If a missile is hit stop the anim and replace the missile img with explosion img - increment the deflects score.  If it is a miss decrement the deflects score and render on the page
 */
function isHit() {
    var missileNumber = '.missile-' + columnID
    var missiles = document.querySelectorAll(missileNumber)
    var hasMissiles = missiles.length
    if (hasMissiles) {
        gameScore.score += hasMissiles
        document.querySelector('#score').textContent = gameScore.score
        $(missileNumber).stop()
        missiles.forEach(function(missile) {
            missile.classList.remove(missileNumber)
            missile.src = "img/missile-explosion.gif";
            setTimeout(function() {
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

/**
 * listens for key presses and re-assigns values based on key pressed.  Global var columID is re-assigned based on value of key pressed
 */
function listenKeypressMissiles() {
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

createMissileClickHandler()
listenKeypressMissiles()
repeatAnims()
