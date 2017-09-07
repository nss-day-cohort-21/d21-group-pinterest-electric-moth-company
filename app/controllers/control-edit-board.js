"use strict";

app.controller("editBoardCtrl", function($scope, $window, userFactory, PINCreds, $q, $http) {
    
    $scope.editedBoard = {
            board: "",
            name: "",
            description: ""
        };

    $scope.editBoard = function () {
        const myToken = userFactory.getMyToken();
        console.log("My pretty token in edit board:", myToken);
        
        $http.patch(`https://api.pinterest.com/v1/boards/${$scope.editedBoard.board}/?access_token=${myToken}&fields=id%2Clink%2Cnote%2Curl`, $scope.editedBoard)
            .then((data) => {
                console.log("Edit Data:", data);
            })
            .catch((error) => {
                console.log("Bad Request");
            });
    };
});