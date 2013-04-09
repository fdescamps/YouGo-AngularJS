'use strict';

/* Controllers */
function MyCtrl1() {}
//MyCtrl1.$inject = [];


function MyCtrl2() {}
//MyCtrl2.$inject = [];

function UserCtrl( $scope, UserFactory ) {
	
	// $http way
	$scope.users = UserFactory.getUsers();
	// $resource way
	/*$scope.users = UserFactory.get();*/
}