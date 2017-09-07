"use strict";

app.controller("editPinCtrl", function($scope, $window, userFactory, PINCreds, $q, $http) {

    $scope.editedPin = {
        pin: "",
        board: "",
        note: "",
        link: ""
    };

    $scope.editPin = function () {
        const myToken = userFactory.getMyToken();
        console.log("My pretty token in edit pin:", myToken);

        $http.patch(`https://api.pinterest.com/v1/pins/${$scope.editedPin.pin}/?access_token=${myToken}&fields=id%2Clink%2Cnote%2Curl`, $scope.editedPin)
            .then((data) => {
                console.log("Edit Pin Data:", data);
            })
            .catch((error) => {
                console.log("Bad Request");
            });
    };
});