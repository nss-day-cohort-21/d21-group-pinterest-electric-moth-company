"use strict";

app.controller("addPinCtrl", function($scope, $window, userFactory, PINCreds, $q, $http){

    	$scope.pin = {
	        board: "",
	        note: "",
	        link: "",
	        image_url: ""
    	};

    $scope.createPin = function() {
    	const myToken = userFactory.getMyToken();
    	console.log("My pretty token:", myToken);
	    $http.post(`https://api.pinterest.com/v1/pins/?access_token=${myToken}&fields=id%2Clink%2Cnote%2Curl`, $scope.pin)
	    .then((data) => {
	        console.log("Post Data:", data);
	        console.log("Pin ID:", data.data.data.id);
	        console.log("Pin Image Url:", data.data.data.url);
	        console.log("Pin Link:", data.data.data.link);
	    })
	    .catch((error) => {
	        console.log("Bad Request");
	    });
    };
});