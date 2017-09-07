"use strict";

app.controller("deleteBoardCtrl", function($scope, $window, userFactory, PINCreds, $q, $http) {

    $scope.deleteBoard = function () {
        const myToken = userFactory.getMyToken();
        console.log("My pretty token in delete board:", myToken);
     
        $http.delete(`https://api.pinterest.com/v1/boards/${$scope.myBoardToDelete}/?access_token=${myToken}&fields=id%2Clink%2Cnote%2Curl`)
            .then((data) => {
                console.log("Delete Board Data:", data);
            })
            .catch((error) => {
                console.log("Bad Request");
            });
    };
});