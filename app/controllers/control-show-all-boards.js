"use strict";

app.controller("showAllBoardsCtrl", function ($scope, pinsFactory, boardsFactory, userFactory, $rootScope) {
    $scope.boards = [];
    let user = userFactory.getCurrentUser();
    $rootScope.searchText = true;
    $scope.searchText = filterFactory;

    const showAllBoards = function () {
        boardsFactory.getAllBoards(user)
            .then((boards) => {
            console.log('boards from showAllBoards', boards);
            $scope.boards = boards;
            });
    };


    showAllBoards();
});