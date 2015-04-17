'use strict';

angular.module('serverApp2', [])
  .controller('MainCtrl', ['$http', function($http) {
    var self = this;
    self.items = [];
    self.errorMessage = '';

    $http.get('/api/note').then(function(response) {
        self.items = response.data;
    }, function(errResponse) {
        self.errorMessage = errResponse.data.msg;
    });
  }])
  .factory('NoteService', ['$http', function($http) {
    return {
        query: function() {
            return $http.get('/api/note');
        }
    };
  }]);
