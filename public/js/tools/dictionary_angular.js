angular.module('linguarium')
  .controller('dictionary', [
    '$scope',
    function ($scope, entries) {
      $scope.search = '';
      //Some preset words to begin with
      $scope.entries = [{ id: 1, word: 'Motivate', definition: 'To Push Someone To Do Something', date_added: new Date() }, { id: 2, word: 'Challenge', definition: 'To Pokemon Battle Someone', date_added: new Date() }];
      var current_id = $scope.entries.length + 1;
      $scope.sort = {
        type: 'word',
        descending: true
      };
      $scope.addEntry = function () {
        if (!$scope.word || $scope.word === '') {
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

      $scope.showWord = function (entry) {
        var subtitles = document.getElementById("subtitles");
        subtitles.removeAttribute("class");
        var subtitle_word = document.getElementById("subtitle-header");
        var subtitle_definition = document.getElementById("subtitle-text");
        subtitle_word.innerHTML = entry.word;
        subtitle_definition.innerHTML = entry.definition;
        socket.emit('show_word', { id: entry.id, word: entry.word, definition: entry.definition, date_added: entry.date_added });
      }

      $scope.removeWord = function (entry) {
        var subtitles = document.getElementById("subtitles");
        subtitles.className += "hidden-subtitle";
        socket.emit('remove_word');
      }

      $scope.toggleSort = function (type) {
        if ($scope.sort.type == type) {
          $scope.sort.descending == true ? $scope.sort.descending = false : $scope.sort.descending = true;
          console.log($scope.sort);
        } else {
          $scope.sort.type == 'word' ? $scope.sort.type = 'date' : $scope.sort.type = 'word';
          console.log($scope.sort);
        }
      }

      $scope.addEntryFromJavascript = function (data) {
        var in_scope = false;
        for (i = 0; i < $scope.entries.length; i++) {
          if ($scope.entries[i]['word'] == data.word && $scope.entries[i]['definition'] == data.definition) {
            in_scope = true;
            break;
          };
        };

        if (in_scope == false) {
          $scope.entries.push({
            id: data.id,
            word: data.word,
            definition: data.definition,
            date_added: data.date_added,
          });
        };
      }
    }])
