function listenKeypress() {
    document.addEventListener('keypress', function(e) {
        var keys = {
            'q': 'cheer1',
            'w': 'cheer2',
            'e': 'cheer3',
            'r': 'cheer4'
        }
        if (e.key in keys) {
            makeNoise(keys[e.key])
        }
    })
}

listenKeypress()

var cities = document.querySelectorAll('.city')
cities.forEach(function(city) {
    city.addEventListener('click', function() {
        var param = 'cheer' + city.dataset.city
        makeNoise(param)
    })
})

function makeNoise(noise) {
    var audioObj = {
        cheer1: 'audio/cheer1.wav',
        cheer2: 'audio/cheer2.wav',
        cheer3: 'audio/cheer3.wav',
        cheer4: 'audio/cheer4.wav'
    }
    var audio = new Audio(audioObj[noise])
    audio.play()
}