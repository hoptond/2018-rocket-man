function listenKeypress() {
    document.addEventListener('keypress', function(e) {
        var keys = {
            'q': '1',
            'w': '2',
            'e': '3',
            'r': '4'
        }
        if (e.key in keys) {
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
    var cities = document.querySelectorAll('.city')
    Array.prototype.forEach.call(cities, function(city) {
        city.addEventListener('click', function() {
            //we get the city id via the attribute instead of just using the dataset, because IE does not support datasets.
            //thanks, bill gates!
            var $city = $('#city-' + city.dataset.city)
            shootLaser($city)
        })
    })
}

function makeNoise(noise) {
    var audioObj = {
        cheer1: 'audio/cheer1.mp3',
        cheer2: 'audio/cheer2.mp3',
        cheer3: 'audio/cheer3.mp3',
        cheer4: 'audio/cheer4.mp3',
        hitcity: 'audio/hit_city.mp3',
        miss: 'audio/laser_miss.mp3'
    }
    var audio = new Audio(audioObj[noise])
    audio.play()
}