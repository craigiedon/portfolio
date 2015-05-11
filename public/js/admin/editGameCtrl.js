app.controller('editGameCtrl', function($scope, $routeParams, gameService, $location){
    gameService.get($routeParams.id)
	.success(function(data){
	    $scope.game = data;
	});

    $scope.editGame = function(){
	console.log("Edit was actually called");
	gameService.update($scope.game._id, $scope.game)
	    .success(function(data){
		console.log(data);
		$location.path("/editGames");
	    });
    };
    
});
