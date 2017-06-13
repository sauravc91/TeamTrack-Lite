'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular.module('yapp', [
  'ui.router',
  'ngAnimate'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })

      // Route for login
      .state('login', {
        url: '/login',
        parent: 'base',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })

      // Route for sign up
      .state('register', {
        url: '/register',
        parent: 'base',
        templateUrl: 'views/register.html',
        controller: 'SignUpCtrl'
      })

      // User dashboard base
      .state('user', {
        url: '/user',
        parent: 'base',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        authorize: false
      })

      // User OverView
      .state('overview', {
        url: '/overview',
        parent: 'user',
        templateUrl: 'views/dashboard/overview.html',
        authorize: false
      })

      // User Task Add
      .state('logtask', {
        url: '/logtask',
        parent: 'user',
        templateUrl: 'views/dashboard/task-logger.html',
        authorize: false,
        controller: 'taskCtrl'
      })

      // User profile
      .state('profile', {
        url: '/profile',
        parent: 'user',
        templateUrl: 'views/dashboard/profile.html',
        authorize: false
      })

      // Admin dashboard base
      .state('admin', {
        url: '/admin',
        parent: 'base',
        templateUrl: 'views/admin.html',
        authorize: true
      // controller: 'AdminCtrl'
      })

      // Admin overview
      .state('admin-overview', {
        url: '/overview',
        parent: 'admin',
        templateUrl: 'views/admin/overview.html',
        authorize: true
      })

      // Admin user mgmt
      .state('manageusers', {
        url: '/manageusers',
        parent: 'admin',
        templateUrl: 'views/admin/manage-users.html',
        authorize: true
      })

      // Admin Profile
      .state('admin-profile', {
        url: '/profile',
        parent: 'admin',
        templateUrl: 'views/admin/profile.html',
        authorize: true
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  })

  .run(function($rootScope,$state,$location){
    alertify.set('notifier', 'position', 'top-right');
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams, options){ 
        
          if(toState.name!='login' && toState.name!='register'){
            if(sessionStorage.getItem('authToken')==null || sessionStorage.getItem('authToken')=="undefined"){
              
              debugger
              
              event.preventDefault();
              $state.go('login');
              alertify.error('Please login first');
            }
            else{
              var jwt =sessionStorage.getItem('authToken').split('.')
              var flash= JSON.parse(atob(jwt[1])).Role;
              if(toState.authorize==true && flash!=='TQ=='){
                  event.preventDefault();
                  sessionStorage.removeItem('authToken');
                  $state.go('login');
                  alertify.error('Access restricted ! You have been logged out');
              }
              if(toState.authorize==false && flash!=='RQ=='){
                  event.preventDefault();
                  sessionStorage.removeItem('authToken');
                  $state.go('login');
                  alertify.error('Access restricted ! You have been logged out');
              }
            }
          }
          
          debugger 
          // transitionTo() promise will be rejected with 
          // a 'transition prevented' error
      })
  })
