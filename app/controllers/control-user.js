"use strict";

/*
    this controller is instantiated when the 'user.html' template
    is rendered at the '/login' path.
    it uses the userFactory to handle the registration of new users, login with google or email and password.

 */

app.controller("userCtrl", function($scope, $window, userFactory, $location){


    // this will hold user's email and password
    $scope.account = {};

    // called when the 'register' button is clicked.
    // form data is gathered and sent to userFactory and our register method
    // passes it off to firebase
    $scope.register = function(){
        userFactory.register({
            email: $scope.account.email,
            password: $scope.account.password
        })
            .then(userData => {
                $scope.logIn();
            })
            .catch(error => console.log("error with login", error));
    };

    $scope.logIn = () => userFactory.logIn($scope.account)
        .then($window.location.href = '#!/task-list');

    $scope.loginGoogle = function(){
        userFactory.authWithProvider()
            .then(result => {
                let user = result.user.uid;
                $location.path('/board-list');
                $scope.$apply();
            })
            .catch(error => console.log("google login error", error.message, error.code));
    };


});