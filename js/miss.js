


function onMissLaser() {
    makeNoise('miss')
    changeScore(-5)

}

function changeScore(value) {
    var score = document.querySelector('#score')
    score.textContent = parseInt(score.textContent) + value
}

function onHitCity(cityid) {
    makeNoise('hitcity')
    incrementDeathToll()
}

function incrementDeathToll() {
    var toll = document.querySelector('#toll')
    toll.textContent = parseInt(toll.textContent) + 1000000
}

