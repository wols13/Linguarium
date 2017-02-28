angular.module("dictionary", [])
.controller('MainCtrl', [
  '$scope',
  function($scope, entries) {
    $scope.entries = [];
    $scope.addEntry = function() {
      if(!$scope.word || $scope.word === '') {
        return;
      } else {
        $scope.entries.push({
          word: $scope.word,
          definition: $scope.definition,
        });
        $scope.word = '';
        $scope.definition = '';
      }
      return false;
    }

    $scope.showWord = function(entry) {
      var subtitles = document.getElementById("subtitles");
      subtitles.removeAttribute("class");
      var subtitle_word = document.getElementById("subtitle-header");
      var subtitle_definition = document.getElementById("subtitle-text");
      subtitle_word.innerHTML = entry.word;
      subtitle_definition.innerHTML = entry.definition;
      socket.emit('show_word', {word: entry.word, definition: entry.definition});
    }

    $scope.removeWord = function(entry) {
      var subtitles = document.getElementById("subtitles");
      subtitles.className += "hidden-subtitle";
      socket.emit('remove_word');
    }
  }])
