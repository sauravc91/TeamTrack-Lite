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
    alertify.set('notifier','position', 'top-right');
    //$scope.test='Test';
    $scope.apiUrl='http://localhost:3000/api/'

    $scope.auth = function(obj){
      var loginDTO={"userName":obj.username,"password":obj.password};
        $http({
        method: 'POST',
        url: $scope.apiUrl+'authenticateUser',
        data: loginDTO
      }).then(function successCallback(response) {       
          if(response.data.success==true){
            sessionStorage.setItem('authToken', response.data.token);
            $state.go('dashboard');
          }
          else{
            alertify.error('Authentication failed for your credentials'); 
          }          
        }, function errorCallback(response) {
          alertify.warning('Your account is not yet active');   
        });
    };

  });
