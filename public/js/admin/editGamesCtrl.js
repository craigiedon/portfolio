app.controller('editGamesCtrl', function($location, $scope, gameService){
    gameService.getAll()
	.success(function(data){
	    $scope.games = data;
	});

    $scope.delete = function(game){
	console.log("Index of game", $scope.games.indexOf(game));
	$scope.games.splice($scope.games.indexOf(game), 1);
	gameService.delete(game._id)
	    .success(function(data){
		console.log(data);
	    });
    };

    $scope.edit = function(game){
	$location.path("/editGame/" + game._id);
    };
    
});
