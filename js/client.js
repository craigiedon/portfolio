var portfolioApp = angular.module('portfolio', ['ngRoute']);
portfolioApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
	.when('/', {
	    templateUrl: 'templates/games.html'
	})
	.when('/art', {
	    templateUrl: 'templates/art.html'
	})
	.when('/about', {
	    templateUrl: 'templates/about.html'
	})
	.when('/games', {
	    redirectTo: '/'
	});
}]);

portfolioApp.controller('MainCtrl', function($scope){
    $scope.selectedNav = [true, false, false, false];

    $scope.selectNav = function(selectedIndex){
	for(var i = 0; i < $scope.selectedNav.length; i++){
	    $scope.selectedNav[i] = false;
	}
	$scope.selectedNav[selectedIndex] = true;
    };
});
