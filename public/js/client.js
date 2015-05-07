var portfolioApp = angular.module('portfolio', ['ngRoute', 'ngCookies']);

portfolioApp.factory('authenticator', function($http, $cookies){
	console.log("Cookies variable?", $cookies);
    var authenticated = $cookies.user ? true : false;
    var signIn = function(userData){
	if(userData){
	    return $http.post("/authenticate", userData);
	}
    };
    var signOut = function(){
	return $http.get("/logout");
    };

    var register = function(){
    };

    return {
	signIn: signIn,
	signOut: signOut,
	isAuthenticated: authenticated,
	register: register
    };
});

portfolioApp.config(['$routeProvider', function($routeProvider){

    var authenticationNeeded = {
	auth: function(authenticator, $location){
	    if(!authenticator.isAuthenticated){
		$location.path('/login');
	    }
	}
    };
	
	
    $routeProvider
	.when('/', {
	    templateUrl: 'templates/games.html',
		resolve: authenticationNeeded
	})
	.when('/art', {
	    templateUrl: 'templates/art.html',
	    resolve: authenticationNeeded
	})
	.when('/about', {
	    templateUrl: 'templates/about.html',
	    resolve: authenticationNeeded
	})
	.when('/games', {
	    redirectTo: '/'
	})
	.when('/login', {
	    templateUrl: 'templates/login.html',
		controller: 'loginCtrl'
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
	createNewGame: function(newGame){
	    return $http.post('/games', {data: newGame});
	}
    };
});

portfolioApp.controller('MainCtrl', function($rootScope, $scope, gameService, authenticator){
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

    $scope.post = function(){
	gameService.createNewGame({"name": "Brand new game",
				   "description": "new",
				   "image": "image.png"})
	    .success(function(data){
			console.log(data);
	    });
    };
    
});

portfolioApp.controller('loginCtrl', function($scope, authenticator){
    $scope.login = function(){
		authenticator.signIn({username: 'admin', password: 'lynda'})
			.success(function(data){
				console.log("Sign in success:" , data.username);
			});
	};
});
