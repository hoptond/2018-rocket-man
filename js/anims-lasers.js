function shootLaser($city) {
    var cityid = $city.data('city')
    $city.attr('src','img/cities-' + cityid + '-laser.png')
    var $this = $city
    setTimeout(function () {
        $this.attr('src','img/cities-' + cityid + '.png')
    }, 300)
}
$('.city').click(function () {
    shootLaser($(this))
})

$(window).keypress(function() {
    console.log( "Handler for .keypress() called." );
});