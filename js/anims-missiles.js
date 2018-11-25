var missilesActive = false
var gameOver = false
var columnID = 0
var gameScore = {
    score:0,
    toll:0
}

var impacts = [0, 0, 0, 0]

var missileInterval

var deactivatedLasers = [ false, false, false, false];

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
    missileInterval = setInterval(beginDroppingMissiles, 500)
}

function beginDroppingMissiles() {
    var animationTime = animationChangeSpeed()
    dropMissile(animationTime)
}

/**
 * Function decrements game score and increments death toll and renders the scores on the page when a city is hit
 * @param $missile The JQUERY object that refers to the missile hitting the city
 * @param cityid the id of the the city that is being hit by the missile
 */
function missileHitsCity($missile, cityid) {
    if (!gameOver) {
        gameScore.toll += 10000
    }
    document.querySelector('#toll').textContent = gameScore.toll
    hitCityEffect(cityid)
    $missile.remove()
    if(gameScore.toll >= 500000 && gameOver == false) {
        setGameOver()
    }
}

function setGameOver() {
    gameOver = true;
    clearInterval(missileInterval)
    document.removeEventListener('keypress', onKeyPress)
    var cities = document.querySelectorAll('.city')
    var missiles = document.querySelectorAll('.missile')
    Array.prototype.forEach.call(missiles, function(missile) {
        missile.parentNode.removeChild(missile)
    })
    // forEach loop changed with Array.prototype.forEach.call due to compatibility issues in IE10
    Array.prototype.forEach.call(cities, function(city) {
        city.removeEventListener('click', onUserInput)
        destroyCity(city)
    })
    document.querySelector('#gameoverlay').classList.remove('hidden');
    document.querySelector('#start').style.display = 'block'
    document.querySelector('#start').textContent  = 'RETRY'
    makeNoise('gameover')
}

/**
 * generates a random number
 * @param int topLimit the max desired random number to return
 */
function randomNumGen(topLimit) {
    return Math.ceil(Math.random() * topLimit)
}

/**
 * creates click handler on .city elems        gameScore.score -= 1
 */
function createMissileClickHandler() {
    var cities = document.querySelectorAll('.city')
    // forEach loop changed with Array.prototype.forEach.call due to compatibility issues in IE10
    Array.prototype.forEach.call(cities, function(city) {
        city.addEventListener('click', onUserInput)
    })
}

/*
 * On either pressing the key on the keyboard or clicking the city, sets the column id, fires the laser, and checks
 * for any missiles in the path of the laser
 */
function onUserInput() {
    columnID = this.getAttribute('data-city')
    if(deactivatedLasers[columnID - 1]) {
        return
    }
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
                missile.classList.remove(missileNumber)
                missile.src = "img/missile-explosion.gif";
                setTimeout(function() {
                    try {
                        makeNoise('laser_destroy')
                        missile.parentNode.removeChild(missile);
                    } catch (e) {
                        // squash errors where the missile is already exploding and we don't need to remove it.
                    }
                }, 500)
            })
    } else if (missilesActive) {
        success = false
        deactivateLaser(columnID);
    }
    laserResultSound(success, columnID)
}


function deactivateLaser(columnID) {
    deactivatedLasers[columnID - 1] = true
    document.querySelectorAll('.city')[columnID - 1].classList.add('deactivated')
    setTimeout(function() {
        deactivatedLasers[columnID - 1] = false
            document.querySelectorAll('.city')[columnID - 1].classList.remove('deactivated')
    }, 2000)
}

/*
 * The sound produced from a city when the user presses a button.
 *
 * @param success Whether firing this laser produced a cheer or a boo
 * @param cityid The id of the given city
 */
function laserResultSound(success, cityid) {
    var sound = 'laser' + cityid
    makeNoise(sound)
    if(!success) {
        makeNoise('miss')    
    }
}


/**
 * listens for key presses and re-assigns values based on key pressed.  Global var columID is re-assigned based on value of key pressed
 */
function listenKeypressMissiles() {
    document.addEventListener('keypress', onKeyPress)
}

function onKeyPress(e) {
    var keys = {
        'q': '1',
        'w': '2',
        'e': '3',
        'r': '4'
    }
    if (e.key in keys) {
        columnID = keys[e.key]
        if (deactivatedLasers[columnID - 1]) {
            return
        }
        isHit()
        $city = $('#city-' +  columnID)
        shootLaser($city)
    }
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
     //the missile images themselves and the effect timers are seperate, so to prevent explosions happening here after the game ends we just put them in a conditional. this is hacky as fuck but I'm hungry and I don't care anymore
    if (!gameOver) {
        clearTimeout(impacts[cityid - 1])
        makeNoise('hitcity')
        var explosion = document.querySelector('#city-' + cityid + ' .explosion')
        //we append a random query string to make the gif reliably start at zero when a new explosion occurs.
        explosion.setAttribute('src', 'img/city-hit.gif' + '?explode=' + Math.random(4))
        impacts[cityid - 1] = setTimeout(function(e) {
            explosion.setAttribute('src', 'img/blank.png')
        }, 1250)
    }
}

/*
 * Fires the laser from the given city.
 *
 * @param $city the JQUERY object referring to the given city
 */
function shootLaser($city) {
    $city.addClass('laser')
    setTimeout(function() {
        $city.removeClass('laser')
    }, 300)
}

/*
 * This produces a sound from the given short reference.
 *
 * @param noise A shortened noise to refer to a file in the audio folder.
 */
function makeNoise(noise) {
    var audioObj = {
        laser1: 'audio/laser1.mp3',
        laser2: 'audio/laser2.mp3',
        laser3: 'audio/laser3.mp3',
        laser4: 'audio/laser4.mp3',
        cheer1: 'audio/cheer1.mp3',
        cheer2: 'audio/cheer2.mp3',
        cheer3: 'audio/cheer3.mp3',
        cheer4: 'audio/cheer4.mp3',
        hitcity: 'audio/hit_city.mp3',
        miss: 'audio/laser_miss.mp3',
        laser_destroy: 'audio/laser_destroy.mp3',
        gameover: 'audio/gameover.mp3'
    }
    var audio = new Audio(audioObj[noise])
    audio.play()
}

function destroyCity(city) {
    city.classList.add('destroyed')
}

document.querySelector('#start').addEventListener('click', function(e) {
        var cities = document.querySelectorAll('.city')
    if(gameOver) {
        gameOver = false;
        gameScore.score = 0
        gameScore.toll = 0
        listenKeypressMissiles()
        Array.prototype.forEach.call(cities, function(city) {
            city.addEventListener('click', onUserInput)
        })
        document.querySelector('#gameoverlay').classList.add('hidden');
    }
    document.querySelector('#score').textContent = gameScore.score
    document.querySelector('#toll').textContent = gameScore.toll
    repeatAnims()
    missilesActive = true
    Array.prototype.forEach.call(cities, function(city) {
         city.addEventListener('click', onUserInput)
         city.classList.remove('destroyed')
    })
    document.querySelector('#start').style.display = 'none'
})
