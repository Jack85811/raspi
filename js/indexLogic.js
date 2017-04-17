
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
        }, {
          "id": 2,
          "name": "---",
          "status": "false",
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
        //var urlswitch= "http://localhost:8081/switchon";
        var urlswitch= 'http://192.168.0.17:8081/switchon';
        var data = {
          "systemCode": systemcode,
          "socketNumber": socketNumber,
          "status": status
        }
        callHttp(urlswitch, data)
    };

    $scope.clickAllButtonOn = function () {
        var jsonButtons = myJsonService.getButtons();
        var count = Object.keys(jsonButtons).length;
        console.log(count);
        for(i=0;i<=count;i++){
            $scope.clickButtonOn(jsonButtons[i].id);
        };
    };

    $scope.clickButtonOff = function (buttonId) {
        var jsonObject = myJsonService.getButtons()[buttonId];
        var systemcode = JSON.stringify(jsonObject.systemCode);
        var socketNumber = JSON.stringify(jsonObject.socketNumber);
        var status = 0;
        var urlswitch= "http://192.168.0.17:8081/switchon";
        var data = {
          "systemCode": systemcode,
          "socketNumber": socketNumber,
          "status": status
        }
        callHttp(urlswitch, data);
    };
    $scope.clickAllButtonOff = function () {
      var jsonButtons = myJsonService.getButtons();
      jsonButtons.forEach( function (buttonObj){
        setTimeout(function () {
          //alert(buttonObj.id);
          $scope.clickButtonOff(buttonObj.id);
        }, 1000);
      });
    };

    function callHttp(urlswitch, data){
      return $http({
         url: urlswitch,
         method: "POST",
         data: data,
         headers: {'Content-Type': 'application/json'}
     }).success(function(response) {

     }).error(function (response) {
       alert("fail");
     });
    }

});
