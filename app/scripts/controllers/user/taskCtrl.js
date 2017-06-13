angular.module('yapp')
  .controller('taskCtrl', function ($scope, $state, $http) {
    $scope.test = 'Viola!!';
    $scope.apiUrl = 'http://10.11.113.61:3000/api/';

    $scope.logTask = function (obj) {

      var uid= JSON.parse(sessionStorage.getItem('userObj'))._id;

      var loggerDTO = {
        'Title': obj.Title,
        'Description': obj.Description,
        'TaskType': obj.TaskType,
        'TaskReferenceID': obj.TaskReferenceID,
        'EstimatedStartDate': obj.EstimatedStartDate,
        'EstimatedEndDate': obj.EstimatedEndDate,
        'ActualStartDate': 'Tue May 23 2017 12:47:04 GMT+0530 (India Standard Time)',
        'ActualEndDate': 'Tue May 23 2017 12:47:04 GMT+0530 (India Standard Time)',
        'CreatedAt': new Date(),
        'UpdatedAt': new Date(),
        'CreatedBy': uid,
        'Status': 'Open',
        'TaskDetails': []
      };

      $http({
          method: 'POST',
          url: $scope.apiUrl + 'createTask',
          data: loggerDTO
        }).then(function successCallback (response) {
          alertify.success('Task Creation Successfull !');
          debugger;
        }, function errorCallback (response) {});

    };
  });
