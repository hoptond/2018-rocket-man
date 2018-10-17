


function onMissLaser() {
    makeNoise('miss')
    changeScore(-5)

}

function changeScore(value) {
    var score = document.querySelector('#score')
    score.textContent = parseInt(score.textContent) + value
}

function onHitCity(cityid) {
    console.log('BOOM')
    makeNoise('hitcity')
    var explosion = document.querySelector('#city-' + cityid + ' .explosion')
    if(explosion.getAttribute('src') === null) {
        explosion.removeAttribute('src')
        explosion.setAttribute('src', 'img/city-hit.gif')
        console.log(explosion.getAttribute('src'))
        console.log(explosion.src)
        var timeout = setTimeout( function (e) {
            explosion.removeAttribute('src')
        }, 1250)
    }
    incrementDeathToll()
}

function incrementDeathToll() {
    var toll = document.querySelector('#toll')
    toll.textContent = parseInt(toll.textContent) + 1000000
}

