function listenKeypress() {
    document.addEventListener('keypress', function(e) {
        var keys = {
            'q': '1',
            'w': '2',
            'e': '3',
            'r': '4'
        }
        if (e.key in keys) {
            var sound = 'cheer' + keys[e.key]
            makeNoise(sound)
            var $city = $('#city-' + keys[e.key])
            shootLaser($city)
        }
    })
}

function shootLaser($city) {
    var cityid = $city.data('city')
    $city.addClass('laser')
    setTimeout(function () {
        $city.removeClass('laser')
    }, 300)
}
function listenCityClick() {
    document.querySelectorAll('.city').forEach(function(city) {
        city.addEventListener('click', function() {
            var sound = 'cheer' + city.dataset.city
            makeNoise(sound)
            var $city = $('#city-' + city.dataset.city)
            shootLaser($city)
        })
    })
}


function makeNoise(noise) {
    var audioObj = {
        cheer1: 'audio/cheer1.wav',
        cheer2: 'audio/cheer2.wav',
        cheer3: 'audio/cheer3.wav',
        cheer4: 'audio/cheer4.wav',
        hitcity: 'audio/hit_city.wav',
        miss: 'audio/laser_miss.wav'
    }
    var audio = new Audio(audioObj[noise])
    audio.play()
}