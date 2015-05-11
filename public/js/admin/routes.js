app.config(['$routeProvider', function($routeProvider){

    var authenticationNeeded = {
	auth: function(authenticator, $location){
	    if(!authenticator.isAuthenticated()){
		console.log("Tried to get through the resolve barrier and failed");
		$location.path('/login');
	    }
	}
    };
    
    $routeProvider
	.when('/', {
	    redirectTo: '/newGame'
	})
	.when('/login', {
	    templateUrl: 'templates/login.html',
	    controller: 'loginCtrl'
	})
	.when('/newGame', {
	    templateUrl: 'templates/newGame.html',
	    controller: 'newGameCtrl',
	    resolve: authenticationNeeded
	})
	.when('/editGames', {
	    templateUrl: 'templates/editGames.html',
	    controller: 'editGamesCtrl',
	    resolve: authenticationNeeded
	});
}]);
