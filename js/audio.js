function shootLaser($city) {
    $city.addClass('laser')
    setTimeout(function() {
        $city.removeClass('laser')
    }, 300)
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