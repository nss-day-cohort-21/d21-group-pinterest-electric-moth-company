"use strict";

app.controller("navbarCtrl", function($scope, $window, userFactory, $location, PINCreds, $q, $http){

    const authCode = userFactory.getAuthCode();
    const authToken = userFactory.getAccessToken();
    var newAuthToken;

    console.log("Auth Code:", authCode);
    console.log("Auth Token:", authToken);

    $scope.loginUser = function() {
        return $q((resolve, reject) => {

            

            const myToken = userFactory.getMyToken();
            $window.location = `https://api.pinterest.com/oauth/?response_type=code&redirect_uri=https://21588d50.ngrok.io&scope=read_public,write_public,read_relationships,write_relationships&client_id=4921312230101758289`;
            resolve(myToken);
            console.log("My pretty token:", myToken);
            })
            .then ((myToken) => {
            console.log("myToken after redirect:". myToken);
            $http.get(`https://api.pinterest.com/v1/me/?access_token=${myToken}&fields=first_name%2Cid%2Clast_name%2Curl%2Cimage`);
            })
            .then((data) => {
                console.log("Personal Info:", data.data);
                console.log("Hello ", data.data.data.first_name + " " + data.data.data.last_name + "!");
                $('#targetDiv').append(`<img class="circle" src="${data.data.data.image["60x60"].url}" />`);
                $('#userName').append(`<span class="center">Hello ${data.data.data.first_name}<span>`);
            })
            .catch((error) => {
                console.log("Bad Request");
            });
        };
});
