$('#hand').click(function(){
    if($(this).hasClass('active')){
        $(this).removeClass('active')
    } else {
        $(this).addClass('active')
        var audio = new Audio('sounds/Ding.mp3');
        audio.play();
    }
});


