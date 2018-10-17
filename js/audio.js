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
    var cities = Array.prototype.slice.call(document.querySelectorAll('.city'))
    cities.forEach(function(city) {
        city.addEventListener('click', function() {
            //we get the city id via the attribute instead of just using the dataset, because IE does not support datasets.
            //thanks, bill gates!
            var cityid = city.getAttribute('data-city')
            var sound = 'cheer' + cityid
            makeNoise(sound)
            var $city = $('#city-' + cityid)
            shootLaser($city)
        })
    })
}


function makeNoise(noise) {
    var audioObj = {
        cheer1: 'audio/cheer1.mp3',
        cheer2: 'audio/cheer2.mp3',
        cheer3: 'audio/cheer3.mp3',
        cheer4: 'audio/cheer4.mp3'
    }
    var audio = new Audio(audioObj[noise])
    audio.play()
}