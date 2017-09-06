"use strict";

app.controller("addPinCtrl", function($scope, $window, userFactory, $location, PINCreds, $q, $http){

    let authCode;
    let token;

    $('#authCode').click(() => {
        let currentURL = $window.location.href;
        authCode = currentURL.slice(32, 48);
        console.log('Temporary Auth Code:', authCode);
    });

	$('#addPin').click(() => {
	    return $q((resolve, reject) => {
	    	console.log("HEEEEYYYY");
	        $http.post(`https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=${PINCreds.client_id}&client_secret=${PINCreds.client_secret}&code=${authCode}`)
	        .then((authCode) => {
	            console.log('Permanent Access Token:', authCode.data.access_token);
	            token = authCode.data.access_token;
	            // $window.location = `https://api.pinterest.com/v1/me/boards/?access_token${data.data.access_token}=&fields=id%2Cname%2Curl`;
	            resolve(token);
	        })
	        .then((accessToken) => {
	            console.log("Token:", token);
	            $http.post('https://api.pinterest.com/v1/pins/?access_token=${token}&fields=id%2Clink%2Cnote%2Curl')
	            .then((info) => {
	                console.log(info.data);
	            });
	        })
	        .catch((error) => {
	            reject(error);
	        });
	    });
	    // $window.location = `https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=${PINCreds.client_id}&client_secret=${PINCreds.client_secret}&code=${authCode}`;
    });

 });