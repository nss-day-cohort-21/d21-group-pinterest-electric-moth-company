"use strict";

app.controller("addPinCtrl", function($scope, $window, userFactory, PINCreds, $q, $http){

	// const authCode = userFactory.getAuthCode();
 //    const authToken = userFactory.getAccessToken();

 //    console.log("Auth Code:", authCode);
 //    console.log("Auth Token:", authToken);

    $scope.createPin = function() {
    	const myToken = userFactory.getMyToken();
    	console.log("My pretty token:", myToken);
    	let obj = {
                   	board: "mtallentbdesign/mySports",
					note: "note",
					link: "http://amoskeagbeverages.com/wp-content/uploads/2014/08/coors-coors-banquet.gif",
					image_url: "http://amoskeagbeverages.com/wp-content/uploads/2014/08/coors-coors-banquet.gif"
	               };
	    $http.post(`https://api.pinterest.com/v1/pins/?access_token=${myToken}&fields=id%2Clink%2Cnote%2Curl`, obj)
	    .then((data) => {
	        console.log("Post Data:", data);
	    })
	    .catch((error) => {
	        console.log("Bad Request");
	    });
    };
});