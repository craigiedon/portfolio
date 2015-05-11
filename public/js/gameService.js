app.factory('gameService', function($http){
    return {
	getAll: function(){
	    return $http.get('/api/games');
	},
	get: function(id){
	    return $http.get('/api/games/' + id);
	},
	delete: function(id){
	    return $http.delete('/api/games/' + id);
	},
	update: function(id, newGame){
	    return $http.put('/api/games/' + id, newGame);
	},
	createNewGame: function(newGame, imageFile, gameFiles){

	    var fd = new FormData();
	    fd.append('name', newGame.name);
	    fd.append('description', newGame.description);
	    fd.append('dateCreated', newGame.dateCreated);
	    fd.append('imageName', imageFile[0].name);
	    fd.append('playLink', newGame.playLink);
	    
	    fd.append('imageFile', imageFile[0]);

	    if(gameFiles){
		for(var i = 0; i < gameFiles.length; i++){
		    fd.append(gameFiles[i].name, gameFiles[i]);
		}
	    }

	    return $http.post('/api/games', fd, {
		transformRequest: angular.identity,
		headers: {'Content-Type': undefined}
	    });
	}
    };
});
