"use strict";



// instatiate the module as 'app'

const app = angular.module("unpinterested", ["ngRoute"]);
// is user logged in?
// this is checked as the 'resolve' in most views
// the resolve is an optional map of dependencies if they are resolved successfully,
// they will be injected when the controller is instantiated, and are available to $scope in that controller under $resolve.
// else a $routeChangeError will be fired
// in this case, we need to know if the user is logged in to determine whether to allow access to certain paths

// const isAuth = (userFactory) => userFactory.isAuthenticated();

// using $routeProvider to configure the routes
// the .when specifies the the template, controller, and the resolve (see above)
// to be instantiated when the path is requested


app.config(($routeProvider, $httpProvider)=> {
    $routeProvider
    .when('/', {
	    templateUrl: 'partials/show-all-boards.html',
	    // controller: 'userCtrl'
    })
    .when('/add-pin', {
        templateUrl: 'partials/add-pin.html',
        controller: 'addPinCtrl'
    })
    .when('/add-board', {
        templateUrl: 'partials/add-board.html',
        controller: 'addBoardCtrl'
    })
    .when('/edit-pin', {
        templateUrl: 'partials/edit-pin.html',
        controller: 'editPinCtrl'
    })
    .when('/delete-pin', {
        templateUrl: 'partials/delete-pin.html',
        controller: 'deletePinCtrl'
    })
    .when('/edit-board', {
        templateUrl: 'partials/edit-board.html',
        controller: 'editBoardCtrl'
    })
    .when('/delete-board', {
        templateUrl: 'partials/delete-board.html',
        controller: 'deleteBoardCtrl'
    })
    .when('/show-all-boards', {
        templateUrl: 'partials/show-all-boards.html',
        // controller: 'userCtrl'
    })
    .otherwise('/');
});

// .run blocks - A run block is the code which needs to run to kickstart the application. 
// It is executed after all of the service have been configured and the injector has been created
// here we are just initializing our app with firebase, passing 'FRCreds', a constant registered in app/fb-creds.js
// which contains the databaseURL, apiKey, and authDomain need to interact with the app
app.run(($location, FBCreds)=> firebase.initializeApp(FBCreds));