var app = angular.module('app',[]);

app.service('myJsonService', function(){
    var buttons = [{
          "id": "1",
          "name": "Fernseher",
          "status": "false"
        }, {
          "id": "2",
          "name": "PC",
          "status": "false"
        }];

      return{
        getButtons: function (){
            return buttons;
        }
      }
});

app.controller('myButtonLoaderCtrl', function($scope, myJsonService ){

    $scope.buttons = myJsonService.getButtons();
});
