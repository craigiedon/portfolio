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

portfolioApp.factory('gameService', function($http){
    return {
	getAll: function(){
	    return $http.get('/games');
	},
	get: function(id){
	    return $http.get('/games/' + id);
	},
	delete: function(id){
	    return $http.delete('/games/' + id);
	},
	update: function(id, newGame){
	    return $http.put('/games/' + id, {data: newGame});
	},
	post: function(newGame){
	    return $http.post('/games', {data: newGame});
	}
    };
});

portfolioApp.controller('MainCtrl', function($scope, gameService){
    $scope.selectedNav = [true, false, false, false];

    $scope.selectNav = function(selectedIndex){
	for(var i = 0; i < $scope.selectedNav.length; i++){
	    $scope.selectedNav[i] = false;
	}
	$scope.selectedNav[selectedIndex] = true;
    };

    gameService.getAll().success(function(data){
	console.log(data);
    });
});
