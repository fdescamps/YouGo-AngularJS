'use strict';


// Declare app level module which depends on filters, and services
angular.module('yougo', ['yougoFilters', 'yougoServices', 'yougoDirectives', 'ui']).
  config(['$routeProvider', function($routeProvider) {
<<<<<<< HEAD
    $routeProvider
		.when('/myRequests',             {templateUrl: 'partials/myRequests.html',             controller: MyCtrl1})
    	.when('/newRequest',             {templateUrl: 'partials/newRequest.html',             controller: MyCtrl2})
    	.when('/validateRequests',       {templateUrl: 'partials/validateRequests.html',       controller: MyCtrl2})
    	.when('/manageUsers',            {templateUrl: 'partials/manageUsers.html',            controller: MyCtrl2})
    	.when('/manageUsersList',        {templateUrl: 'partials/manageUsersList.html',        controller: UserCtrl})
    	.when('/manageUserTypes',        {templateUrl: 'partials/manageUserTypes.html',        controller: MyCtrl2})
    	.when('/manageUserTypesList',    {templateUrl: 'partials/manageUserTypesList.html',    controller: MyCtrl2})
    	.when('/manageRequestTypes',     {templateUrl: 'partials/manageRequestTypes.html',     controller: MyCtrl2})
    	.when('/manageRequestTypesList', {templateUrl: 'partials/manageRequestTypesList.html', controller: MyCtrl2})
    	.otherwise({redirectTo: '/myRequests'});
=======
    $routeProvider.when('/signin',                 {templateUrl: 'partials/signin.html'});
    $routeProvider.when('/myRequests',             {templateUrl: 'partials/myRequests.html'});
    $routeProvider.when('/newRequest',             {templateUrl: 'partials/newRequest.html'});
    $routeProvider.when('/validateRequests',       {templateUrl: 'partials/validateRequests.html'});
    $routeProvider.when('/manageUsers',            {templateUrl: 'partials/manageUsers.html'});
    $routeProvider.when('/manageUserTypes',        {templateUrl: 'partials/manageUserTypes.html'});
    $routeProvider.when('/manageRequestTypes',     {templateUrl: 'partials/manageRequestTypes.html'});
    $routeProvider.otherwise({redirectTo: '/signin'});
>>>>>>> agent22yougoangularjs/master
  }]);
