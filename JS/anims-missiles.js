function dropMissile(columnNumber, animationTime) {
    $('#pos-'+columnNumber).prepend('<img src="img/missile-drop-down-white.png" class="missile" id="bomb-'+ columnNumber +'">')

    $('#bomb-' + columnNumber).animate({
        top: "+=350"
    }, animationTime, "linear", function () {
        $(this).remove()

    })
}
// run on start button