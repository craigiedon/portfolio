app.controller('gamesListCtrl', function(gameService, $scope){
    console.log("In games list controller");
    $scope.games = {};
    gameService.getAll().success(function(data){
	$scope.games = data;
	console.log(data);
    });    
});

app.controller('gameDetailCtrl', function($routeParams, $scope, gameService){
    console.log("In game detail controller");
    $scope.game = null;
    $scope.gameInfoIsDownloaded = function(){
	return $scope.game !== null;
    };
    gameService.get($routeParams.id)
	.success(function(data){
	    $scope.game = data;
	    console.log("Got game", data);
	});
});
