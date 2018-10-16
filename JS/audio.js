var audioObj = {
    cheer1: 'audio/cheer1.wav',
    cheer2: 'audio/cheer2.wav',
    cheer3: 'audio/cheer3.wav',
    cheer4: 'audio/cheer4.wav'
}

document.addEventListener('keypress', function(e) {
    switch (true) {
        case (e.key === 'q'):
            makeNoise('cheer1', audioObj)
            break
        case (e.key === 'w'):
            makeNoise('cheer2', audioObj)
            break
        case (e.key === 'e'):
            makeNoise('cheer3', audioObj)
            break
        case (e.key === 'r'):
            makeNoise('cheer4', audioObj)
            break
    }
})

var cities = document.querySelectorAll('.city')
cities.forEach(function(city) {
    city.addEventListener('click', function() {
        var param = 'cheer' + city.dataset.city
        makeNoise(param, audioObj)
    })
})

function makeNoise(noise, audioObject) {
    var audio = new Audio(audioObject[noise])
    audio.play()
}