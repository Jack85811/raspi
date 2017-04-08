var app = angular.module('app',[]);

app.service('myJsonService', function(){
    var buttons = [{
          "id": 0,
          "name": "Fernseher",
          "systemCode": 11101,
          "socketNumber": 1
        }, {
          "id": 1,
          "name": "PC",
          "status": "false",
          "systemCode": 11101,
          "socketNumber": 2
        }];

      return{
        getButtons: function (){
            return buttons;
        }
      }
});

app.controller('myButtonLoaderCtrl', function($scope, myJsonService, $http) {

    $scope.buttons = myJsonService.getButtons();

    $scope.clickButtonOn = function (buttonId) {
        var jsonObject = myJsonService.getButtons()[buttonId];
        var systemcode = JSON.stringify(jsonObject.systemCode);
        var socketNumber = JSON.stringify(jsonObject.socketNumber);
        var status = 1;
        var data = {
          "systemCode": systemcode,
          "socketNumber": socketNumber,
          "status": status
        }
        alert(systemcode + "  " + socketNumber +  "  " + status);

    };

    $scope.clickButtonOff = function (buttonId) {
        var jsonObject = myJsonService.getButtons()[buttonId];
        var systemcode = JSON.stringify(jsonObject.systemCode);
        var socketNumber = JSON.stringify(jsonObject.socketNumber);
        var status = 0;
        var urlswitch= "http://localhost:8081/switchon";
        var data = {
          "systemCode": systemcode,
          "socketNumber": socketNumber,
          "status": status
        }
        $http({
            url: urlswitch,
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/json'}
        }).success(function(response) {
                alert("succes");
        }).error(function (response) {
          alert("fail");
        });

        //alert(systemcode + "  " + socketNumber +  "  " + status);
    };

    function callHttp(systemcode, socketNumber, status){

    }

});
