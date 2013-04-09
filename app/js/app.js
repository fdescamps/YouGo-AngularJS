'use strict';


// Declare app level module which depends on filters, and services
angular.module('yougo', ['yougoFilters', 'yougoServices', 'yougoDirectives', 'ui']).
  config(['$routeProvider', function($routeProvider) {
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
  }]);
