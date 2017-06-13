'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function ($scope, $location, $http, $state) {
    alertify.set('notifier', 'position', 'top-right');

    $scope.apiUrl = 'http://10.11.113.61:3000/api/';

    $scope.auth = function (obj) {
      var loginDTO = {'userName': obj.username,'password': obj.password};
      $http({
        method: 'POST',
        url: $scope.apiUrl + 'authenticateUser',
        data: loginDTO
      }).then(function successCallback (response) {
        if (response.data.success == true) {
          sessionStorage.setItem('authToken', response.data.token);
          var jwt =sessionStorage.getItem('authToken').split('.');
          sessionStorage.setItem('userObj', JSON.stringify(atob(jwt[1])));
          var flash= JSON.parse(atob(jwt[1])).Role;

          if(flash==='TQ==')
            $state.go('admin-overview');
          else
            $state.go('overview');
        }else {
          alertify.error('Authentication failed for your credentials');
        }
      }, function errorCallback (response) {
        alertify.warning('Your account is not yet active');
      });
    };
  });
