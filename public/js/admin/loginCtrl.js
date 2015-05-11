app.controller('loginCtrl', function($scope, $location, authenticator, $cookies){
    $scope.user = {username: "", password: ""};
    $scope.login = function(){
	console.log("Logging in with credentials: ", $scope.user);
	authenticator.signIn($scope.user)
	    .success(function(data){
		console.log("Sign in success:" , data.username);
		$cookies.user = data.username;
		$location.path("/");
	    });
    };
});
