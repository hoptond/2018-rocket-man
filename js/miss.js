


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
    var city = document.querySelector('#city-' + cityid)
    city.innerHTML = '<img class="explosion" src="img/city-hit.gif">'
    setTimeout( function (e) {
        city.innerHTML = ''
    }, 1250)
    incrementDeathToll()
}

function incrementDeathToll() {
    var toll = document.querySelector('#toll')
    toll.textContent = parseInt(toll.textContent) + 1000000
}

