var missilesActive = false
var columnID = 0
var gameScore = {
    score:0,
    toll:0
}

var impacts = [0, 0, 0, 0]

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
        missileHitsCity($(this), columnNumber)
    })
}

/**
 * Function call drops missile every 500ms
 * animationTime is variable based on users score
 */
function repeatAnims() {
    setInterval(function() {
        var animationTime = animationChangeSpeed()
        dropMissile(animationTime)
    }, 500)
}

/**
 * Function decrements game score and increments death toll and renders the scores on the page when a city is hit
 * @param $missile The JQUERY object that refers to the missile hitting the city
 * @param cityid the id of the the city that is being hit by the missile
 */
function missileHitsCity($missile, cityid) {
    gameScore.score -= 1
    gameScore.toll += 10000
    document.querySelector('#score').textContent = gameScore.score
    document.querySelector('#toll').textContent = gameScore.toll
    hitCityEffect(cityid)
    $missile.remove()

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
    // forEach loop changed with Array.prototype.forEach.call due to compatibility issues in IE10
    Array.prototype.forEach.call(cities, function(city) {
        city.addEventListener('click', checkForMissiles)
    })
}

/**
 * This was previously an anonymous function given its own function. It sets the column id and executes the isHit()
 * method to scan for any missiles in the column
 */
function checkForMissiles() {
    columnID = this.getAttribute('data-city')
    $city = $('#city-' +  columnID)
    shootLaser($city)
    isHit()
}

/**
 * If a missile is hit stop the anim and replace the missile img with explosion img - increment the deflects score.  If it is a miss decrement the deflects score and render on the page
 */
function isHit() {
    var missileNumber = '.missile-' + columnID
    var missiles = document.querySelectorAll(missileNumber)
    var hasMissiles = missiles.length
    var success = true
    if (hasMissiles) {
        gameScore.score += hasMissiles
        document.querySelector('#score').textContent = gameScore.score
        $(missileNumber).stop()
        // forEach loop changed with Array.prototype.forEach.call due to compatibility issues in IE10
        Array.prototype.forEach.call(missiles, function(missile) {
            missiles.forEach(function (missile) {
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
        })
    } else if (missilesActive) {
        success = false
        gameScore.score -= 1
        document.querySelector('#score').textContent = gameScore.score
    }
    laserResultSound(success, columnID)
}

/*
 * The sound produced from a city when the user presses a button.
 *
 * @param success Whether firing this laser produced a cheer or a boo
 * @param cityid The id of the given city
 */
function laserResultSound(success, cityid) {
    if(success) {
        var sound = 'cheer' + cityid
        makeNoise(sound)
    } else {
        makeNoise('miss')
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
            $city = $('#city-' +  columnID)
            shootLaser($city)
        }
    })
}

/*
 * This changes the speed of the missiles based upon the player's current score.
 */
function animationChangeSpeed() {
    return gameScore.score > 0 ? 3000 / (1 + (gameScore.score * 0.03)) : 3000
}

/*
 * This plays the explosion effect when a missile hits the city.
 *
 * @param cityid The city being exploded.
 */
function hitCityEffect(cityid) {
    makeNoise('hitcity')
    var explosion = document.querySelector('#city-' + cityid + ' .explosion')
    clearTimeout(impacts[cityid - 1])
    //we append a random query string to make the gif reliably start at zero when a new explosion occurs.
    explosion.setAttribute('src', 'img/city-hit.gif' + '?explode=' + Math.random(4))
    impacts[cityid - 1] = setTimeout(function (e) {
        explosion.setAttribute('src', 'img/blank.png')
    }, 1250)
}

document.querySelector('#start').addEventListener('click', function(e) {
    repeatAnims()
    missilesActive = true
    var cities = document.querySelector('.city')
     Array.prototype.forEach.call(cities, function(city) {
         city.removeEventListener('click', checkForMissiles)
     })
    document.querySelector('#start').style.display = 'none'
})
