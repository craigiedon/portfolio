var portfolioApp = angular.module('portfolio', ['ngRoute', 'ngCookies']);

portfolioApp.factory('authenticator', function($http, $cookies){

    var signIn = function(userData){
	if(userData){
	    return $http.post("/authenticate", userData);
	}
    };
    var signOut = function(){
	return $http.get("/logout");
    };

    return {
	signIn: signIn,
	signOut: signOut,
	isAuthenticated: function(){
	    console.log("Cookies variable?", $cookies);
	    return $cookies.user ? true : false;
	}
    };
});

portfolioApp.directive('fileModel', ['$parse', function($parse){
    return {
	restrict: 'A',
	link: function(scope, element, attrs){
	    var model = $parse(attrs.fileModel);
	    var modelSetter = model.assign;

	    element.bind('change', function(){
		scope.$apply(function(){
		    console.log("Whats on the element? ", element[0]);
		    modelSetter(scope, element[0].files[0]);
		});
	    });
	}
    };
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
	    return $http.put('/games/' + id, newGame);
	},
	createNewGame: function(newGame, imageFile, gameFile){

	    var fd = new FormData();
	    fd.append('name', newGame.name);
	    fd.append('description', newGame.description);
	    fd.append('imageName', imageFile.name);
	    fd.append('gameFile', gameFile.name);
	    
	    fd.append('imageFile', imageFile);
	    fd.append('gameFile', gameFile);
	    
	    return $http.post('/games', fd, {
		transformRequest: angular.identity,
		headers: {'Content-Type': undefined}
	    });
	}
    };
});
	
portfolioApp.config(['$routeProvider', function($routeProvider){

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
	})
	.when('/login', {
	    templateUrl: 'templates/login.html',
	    controller: 'loginCtrl'
	})
	.when('/admin', {
	    templateUrl: 'templates/admin.html',
	    controller: 'adminCtrl',
	    resolve: authenticationNeeded
	});

}]);

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
});

portfolioApp.controller('loginCtrl', function($scope, $location, authenticator, $cookies){
    $scope.user = {username: "", password: ""};
    $scope.login = function(){
	console.log("Logging in with credentials: ", $scope.user);
	authenticator.signIn($scope.user)
	    .success(function(data){
		console.log("Sign in success:" , data.username);
		$cookies.user = data.username;
		$location.path("/admin");
	    });
    };
});

portfolioApp.controller('adminCtrl', function($scope, gameService, $cookies, $location){
    $scope.game = {name: "", description: ""};

    $scope.submitEnabled = true;
    
    $scope.newGame = function(){
	$scope.submitEnabled = false;
	gameService.createNewGame($scope.game, $scope.imageFile, $scope.gameFile)
	    .success(function(data){
		$scope.submitEnabled = true;
		$scope.game = {name: "", description: ""};
	    })
	    .error(function(data){
		$cookies.user = null;
		$location.path("/login");
		$scope.submitEnabled = true;
	    });
    };
});
