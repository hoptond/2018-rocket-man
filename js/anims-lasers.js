$(function() {
    $('.city').click(function () {
        shootLaser($(this))
    })
})


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
            shootLaser($city)

        }
    })
}

listenKeypress()