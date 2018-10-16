$(function() {
    $('.city').click(function () {
        shootLaser($(this))
    })
})

// document.addEventListener('keypress', function(e) {
//     switch (true) {
//         case (e.key === 'q'):
//             shootLaser($('#city-1'))
//             break
//         case (e.key === 'w'):
//             shootLaser($('#city-2'))
//             break
//         case (e.key === 'e'):
//             shootLaser($('#city-3'))
//             break
//         case (e.key === 'r'):
//             shootLaser($('#city-4'))
//             break
//     }
// })

function shootLaser($city) {
    var cityid = $city.data('city')
    $city.addClass('laser')
    setTimeout(function () {
        $city.removeClass('laser')
    }, 300)
}

function listenKeypress() {
    document.addEventListener('keypress', function(e) {
        var keys = {
            'q': '#city-1',
            'w': '#city-2',
            'e': '#city-3',
            'r': '#city-4'
        }
        if (e.key in keys) {
            var $city = $(keys[e.key])
            console.log($city)
            shootLaser($city)

        }
    })
}

listenKeypress()