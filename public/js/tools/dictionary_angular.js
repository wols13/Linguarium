angular.module('dictionary', [])
.controller('MainCtrl', [
  '$scope',
  function($scope, entries) {
    $scope.search  = '';
    //Some preset words to begin with
    $scope.entries = [{id: 1, word: 'Motivate', definition: 'To Push Someone To Do Something', date_added: new Date()}, {id: 2, word: 'Challenge', definition: 'To Pokemon Battle Someone', date_added: new Date()}];
    var current_id = $scope.entries.length + 1;
    $scope.sort = {
      type: 'word',
      descending: true
    };
    $scope.addEntry = function() {
      if(!$scope.word || $scope.word === '') {
        return;
      } else {
        $scope.entries.push({
          id: current_id,
          word: $scope.word,
          definition: $scope.definition,
          date_added: new Date(),
        });
        $scope.word = '';
        $scope.definition = '';
        current_id += 1;
      }
    }

    $scope.showWord = function(entry) {
      var subtitles = document.getElementById("subtitles");
      subtitles.removeAttribute("class");
      var subtitle_word = document.getElementById("subtitle-header");
      var subtitle_definition = document.getElementById("subtitle-text");
      subtitle_word.innerHTML = entry.word;
      subtitle_definition.innerHTML = entry.definition;
      socket.emit('show_word', {id: entry.id, word: entry.word, definition: entry.definition, date_added: entry.date_added});
      console.log('I SENT THE WORD!');
    }

    $scope.removeWord = function(entry) {
      var subtitles = document.getElementById("subtitles");
      subtitles.className += "hidden-subtitle";
      socket.emit('remove_word');
      console.log('I REMOVED THE WORD!');
    }

    $scope.toggleSort = function(type) {
      if ($scope.sort.type == type) {
        $scope.sort.descending == true ? $scope.sort.descending = false : $scope.sort.descending = true;
        console.log($scope.sort);
      } else {
        $scope.sort.type == 'word' ? $scope.sort.type = 'date' : $scope.sort.type = 'word';
        console.log($scope.sort);
      }
    }
  }])