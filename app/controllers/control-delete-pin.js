"use strict";

app.controller("deletePinCtrl", function($scope, $window, userFactory, PINCreds, $q, $http) {

    $scope.deletePin = function () {
        const myToken = userFactory.getMyToken();
        console.log("My pretty token in delete pin:", myToken);
        
        $http.delete(`https://api.pinterest.com/v1/pins/${$scope.myPinToDelete}/?access_token=${myToken}&fields=id%2Clink%2Cnote%2Curl`)
            .then((data) => {
                console.log("Delete Pin Data:", data);
            })
            .catch((error) => {
                console.log("Bad Request");
            });
    };
});