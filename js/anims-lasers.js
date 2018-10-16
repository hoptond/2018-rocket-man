$(function() {
    $('.city').click(function () {
        shootLaser($(this))
    })
})

document.addEventListener('keypress', function(e) {
    switch (true) {
        case (e.key === 'q'):
            shootLaser($('#city-1'))
            break
        case (e.key === 'w'):
            shootLaser($('#city-2'))
            break
        case (e.key === 'e'):
            shootLaser($('#city-3'))
            break
        case (e.key === 'r'):
            shootLaser($('#city-4'))
            break
    }
})

function shootLaser($city) {
    var cityid = $city.data('city')
    $city.attr('src','img/cities-' + cityid + '-laser.png')
    setTimeout(function () {
        $city.attr('src','img/cities-' + cityid + '.png')
    }, 300)
}