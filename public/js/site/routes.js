app.config(['$routeProvider', function($routeProvider){    
    $routeProvider
	.when('/', {
	    redirectTo: '/games'
	})
	.when('/art', {
	    templateUrl: 'templates/art.html'
	})
	.when('/about', {
	    templateUrl: 'templates/about.html'
	})
	.when('/games', {
	    templateUrl: 'templates/games.html',
	    controller: 'gamesListCtrl'
	})
	.when('/game/:id',{
	    templateUrl: 'templates/game.html',
	    controller: 'gameDetailCtrl'
	});
}]);
