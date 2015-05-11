app.controller('newGameCtrl', function($scope, gameService, $cookies, $location){
    $scope.game = {};

    $scope.submitEnabled = true;
    
    $scope.newGame = function(){
	$scope.submitEnabled = false;
	gameService.createNewGame($scope.game, $scope.imageFile, $scope.gameFiles)
	    .success(function(data){
		$scope.submitEnabled = true;
		$scope.game = {};
		$scope.imageFile = null;
		$scope.gameFiles = null;
	    })
	    .error(function(data){
		$cookies.user = null;
		$location.path("/login");
		$scope.submitEnabled = true;
	    });
    };
});
