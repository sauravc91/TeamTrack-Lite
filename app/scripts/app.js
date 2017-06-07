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
        controller: 'DashboardCtrl'
      })

      // User OverView
      .state('overview', {
        url: '/overview',
        parent: 'user',
        templateUrl: 'views/dashboard/overview.html'
      })

      // User Task Add
      .state('logtask', {
        url: '/logtask',
        parent: 'user',
        templateUrl: 'views/dashboard/task-logger.html'
      })

      // User profile
      .state('profile', {
        url: '/profile',
        parent: 'user',
        templateUrl: 'views/dashboard/profile.html'
      })

      // Admin dashboard base
      .state('admin', {
        url: '/admin',
        parent: 'base',
        templateUrl: 'views/admin.html',
      // controller: 'AdminCtrl'
      })

      // Admin overview
      .state('admin-overview', {
        url: '/overview',
        parent: 'admin',
        templateUrl: 'views/admin/overview.html'
      })

      // Admin Profile
      .state('admin-profile', {
        url: '/profile',
        parent: 'admin',
        templateUrl: 'views/admin/profile.html'
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  });
