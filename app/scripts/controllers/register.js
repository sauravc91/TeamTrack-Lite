'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location, $http, $state) {

    //$scope.test='Test';
    $scope.apiUrl='http://localhost:3000/api/'

    $scope.auth = function(obj){
      var loginDTO={"userName":obj.username,"password":obj.password};
        $http({
        method: 'POST',
        url: $scope.apiUrl+'authenticateUser',
        data: loginDTO
      }).then(function successCallback(response) {        
        sessionStorage.setItem('authToken', response.data.token);
        $state.go('dashboard');
        debugger
        }, function errorCallback(response) {
          
        });
    };

  });
