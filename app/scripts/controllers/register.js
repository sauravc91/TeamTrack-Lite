'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('SignUpCtrl', function($scope, $location, $http, $state) {
    alertify.set('notifier','position', 'top-right');
    //$scope.test='Test';
    $scope.apiUrl='http://localhost:3000/api/'

    $scope.register = function(obj){

      if(obj.password===obj.cpassword){
        var loginDTO={
          "firstName": obj.firstName,
          "lastName": obj.lastName,
          "userName": obj.email,
          "password": obj.password
          };
            $http({
            method: 'POST',
            url: $scope.apiUrl+'createUser',
            data: loginDTO
            }).then(function successCallback(response) {  
              alertify.success('User Registration Successfull !');   
              $state.go('login');   
              debugger
              }, function errorCallback(response) {
                
            });
        }
        else{
          alertify.error('Passwords do not match');
        }
     }
  });
