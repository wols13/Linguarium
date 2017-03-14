$('#hand').click(function () {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active')
    } else {
        $(this).addClass('active')
        var audio = new Audio('sounds/Ding.mp3');
        audio.play();
    }

    var appElement = document.querySelector('[ng-controller=user_list]');
    var $scope = angular.element(appElement).scope();

    $scope.$apply(function () {
        $scope.raiseHand(user_id);
    });

    socket.emit('raise_hand', {id: user_id});
});



