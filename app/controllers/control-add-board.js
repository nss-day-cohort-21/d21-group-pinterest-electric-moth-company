"use strict";


app.controller("addBoardCtrl", function($scope, $window, userFactory, PINCreds, $q, $http){

	 $scope.board = {
        name: "",
        description: ""
    };

	const authCode = userFactory.getAuthCode();
    const authToken = userFactory.getAccessToken();
    var newAuthToken;

    console.log("Auth Code:", authCode);
    console.log("Auth Token:", authToken);

    $scope.createBoard = function() {
    	const myToken = userFactory.getMyToken();
    	console.log("My pretty token:", myToken);
    	
	    $http.post(`https://api.pinterest.com/v1/boards/?access_token=${myToken}&fields=id%2Cname`, $scope.board)
	    .then((data) => {
	        console.log("Post Data:", data);
	    })
	    .catch((error) => {
	        console.log("Bad Request");
	    });
    };
});


	// console.log('token', userFactory.token);

	// $scope.createBoard = function() {
	// 	authToken.then(function(response){ 
 //        console.log("Response:", response);
 //        newAuthToken = response;
 //        return newAuthToken;
	//     }).then
	//     ((newAuthToken) => {
	//         console.log("New Auth Token", newAuthToken);
	//         console.log("Auth Code:", authCode); 
	//         let obj = {
	//                        name: 'NSS Codez',
	//                    };
	//         $http.post(`https://api.pinterest.com/v1/boards/?access_token=AVMV5l-nZiyAwSDQcdXjwAm4wDVCFOHnKIE4yKFETJNSM2Av4QAAAAA&fields=id%2Cname%2Curl`, obj)
	//         .then((data) => {
	//             console.log("Post Data:", data);
	//         })
	//         .catch((error) => {
	//             console.log("Bad Request");
	//         });
	//     });
	// };