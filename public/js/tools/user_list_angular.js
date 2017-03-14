angular.module('linguarium')
  .controller('user_list', [
    '$scope',
    function ($scope, users) {
      $scope.search = '';
      //Some preset words to begin with
      //Main elements: Name, role (String), id, hand_raise and points
      $scope.users = [{}];
      $scope.numTeachers = 0;
      $scope.numStudents = 0;

      $scope.addUser = function (data) {
        $scope.users.push({
          name: data.name,
          role: data.role,
          id: data.id,
          hand_raised: data.hand_raised,
          points: 0,
        });
      }

      $scope.updateUserList = function(data) {
        $scope.users = [{}];
        for (var i = 0; i < data.length; i++) {
            if(data[i].role == 'teacher') {
              $scope.numTeachers += 1;
            }  else {
              $scope.numStudents += 1;
            }
            $scope.addUser(data[i]);
        }
      }

      $scope.raiseHand = function(user_id) {
        for (var i = 0; i < $scope.users.length; i++) {
          if ($scope.users[i].id == user_id) {
            $scope.users[i].hand_raised = !$scope.users[i].hand_raised;
          }
        }
      }
    }
  ])
