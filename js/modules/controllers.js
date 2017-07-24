(function(){
  var app = angular.module("TableController", ["tableService"]);

  app.controller("TableController", ["$scope", "clients", function($scope, clients){
    $scope.data = [];
    $scope.headlines = [];
    $scope.freeId = [];
    $scope.orderByColumn = 'id';
    $scope.orderReverse = false;

    $scope.addNew = function(){
      var id = $scope.data.length + 1;

      if (this.freeId.length){
        id = this.freeId[0];
        this.freeId.splice(0, 1);
      }

      var obj = new Object;
      obj.postId = $scope.newPostId,
      obj.id = id,
      obj.name = $scope.newName,
      obj.email = $scope.newEmail,
      obj.body = $scope.newBody

      $scope.data.push(obj);
      $scope.newPostId = null;
      $scope.newName = "";
      $scope.newEmail = "";
      $scope.newBody = "";
    }

    $scope.changeOrder = function(columnName){
      if ($scope.orderByColumn == columnName){
        $scope.orderReverse = !$scope.orderReverse;
      }
      else {
        $scope.orderByColumn = columnName;
        $scope.orderReverse = false;
      }
    };

    $scope.isOrderedBy = function(columnName){
      return ($scope.orderByColumn == columnName)
    };

    $scope.isOrderedReverse = function(){
      return !$scope.orderReverse
    };

    $scope.editUser = function(obj){
      obj.editing = true;
    };

    $scope.editUserExit = function(obj){
      obj.editing = false;
    };

    $scope.isBoolean = function(prop){
      return typeof prop === 'boolean';
    };

    $scope.remove = function(obj){
      var index = $scope.data.indexOf(obj);
      this.freeId.push(obj.id);
      this.data.splice(index, 1);
    };

    clients.getClients(function(clients){
      $scope.data = clients.data;
      $scope.headlines = Object.keys($scope.data[0]);
    });
  }])
})();
