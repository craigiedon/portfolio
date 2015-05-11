app.controller('MainCtrl', function($rootScope, $scope, gameService, authenticator){
    $scope.selectedNav = [true, false, false, false];

    $scope.selectNav = function(selectedIndex){
	for(var i = 0; i < $scope.selectedNav.length; i++){
	    $scope.selectedNav[i] = false;
	}
	$scope.selectedNav[selectedIndex] = true;

	console.log("We are actually in the main controller");
    };
});
