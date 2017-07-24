
var app = angular.module('app',[]);

app.service('myJsonService', function(){
    var buttons = [{
          "id": 0,
          "name": "A",
          "systemCode": 11101,
          "socketNumber": 1
        }, {
          "id": 1,
          "name": "B",
          "systemCode": 11101,
          "socketNumber": 2
        }, {
          "id": 2,
          "name": "C",
          "systemCode": 11101,
          "socketNumber": 3
        }];

      return{
        getButtons: function (){
            return buttons;
        }
      }
});

app.controller('myButtonLoaderCtrl', function($scope, myJsonService, $http,  $timeout) {

    $scope.buttons = myJsonService.getButtons();

    $scope.clickButtonOn = function (buttonId) {
        var jsonObject = myJsonService.getButtons()[buttonId];
        var systemcode = JSON.stringify(jsonObject.systemCode);
        var socketNumber = JSON.stringify(jsonObject.socketNumber);
        var status = 1;
        var urlswitch= 'http://192.168.0.56:8081/switch';
        var data = {
          "systemCode": systemcode,
          "socketNumber": socketNumber,
          "status": status
        }
        callHttp(urlswitch, data)
    };

    $scope.clickAllButtonOn = function () {
        var json = myJsonService.getButtons();
        var status = 1;
        var urlswitch= 'http://192.168.0.56:8081/switchallon';
        callHttp(urlswitch,json);
    };

    $scope.clickButtonOff = function (buttonId) {
        var jsonObject = myJsonService.getButtons()[buttonId];
        var systemcode = JSON.stringify(jsonObject.systemCode);
        var socketNumber = JSON.stringify(jsonObject.socketNumber);
        var status = 0;
        var urlswitch= "http://192.168.0.56:8081/switch";
        var data = {
          "systemCode": systemcode,
          "socketNumber": socketNumber,
          "status": status
        }
        callHttp(urlswitch, data);
    };
    $scope.clickAllButtonOff = function () {
      var json = myJsonService.getButtons();
      var status = 1;
      var urlswitch= 'http://192.168.0.56:8081/switchalloff';
      callHttp(urlswitch,json);
    };

    function callHttp(urlswitch, data){
      return $http({
         url: urlswitch,
         method: "POST",
         data: data,
         headers: {'Content-Type': 'application/json'},
         async : false
     }).success(function(response) {

     }).error(function (response) {
       alert("failed to connect");
     });
    }

});
