app.controller('editGamesCtrl', function($location, $scope, gameService){
    gameService.getAll()
	.success(function(data){
	    $scope.games = data;
	    console.log($scope.games);
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

    $scope.save = function(){
	for(var i = 0; i < $scope.games.length; i++){
	    if($scope.games[i].rank !== i){
		$scope.games[i].rank = i;
		gameService.update($scope.games[i]._id, $scope.games[i]);
	    }
	}
    };

    $scope.sortableOptions = {
	update: function(e, ui){
	    console.log($scope.games);
	}
    };
});
