(function(){
  var app = angular.module("tableService", []);

  app.factory("clients", ['$http', '$log', function($http, $log){
    var url = "http://jsonplaceholder.typicode.com/comments";

    var _getClients = function(callback){
      callback = callback || function(){};

      $http({url: url, method: "GET"})
        .then(function(data){
          callback(data);
        },
        function(status){
          $log.error('Error: ' + status);
        })
    };

    return {
      getClients: _getClients
    }
  }]);
})();
