app.factory('authenticator', function($http, $cookies){

    var signIn = function(userData){
	if(userData){
	    return $http.post("/api/authenticate", userData);
	}
    };
    var signOut = function(){
	return $http.get("/api/logout");
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
