angular.module('linguarium')
.controller('user_list', [
  '$scope',
  function($scope, users) {
    $scope.search  = '';
    //Some preset words to begin with
    $scope.users = [{name: 'Abu', role: 'teacher', id: 1, hand_raised: true},{name: 'GEORGE', role: 'student', id: 2, hand_raised: false}];
    var user_current_id = $scope.users.length + 1;
  }
])
