"use strict";

/*
    this controller is instantiated when the 'user.html' template
    is rendered at the '/login' path.
    it uses the userFactory to handle the registration of new users, login with google or email and password.

 */

app.controller("userCtrl", function($scope, $window, userFactory, $location, PINCreds, $q, $http){

    let authCode;
    let token;

    $('#authCode').click(() => {
        let currentURL = $window.location.href;
        authCode = currentURL.slice(32, 48);
        console.log('Temporary Auth Code:', authCode);
    });

    $('#token').click(() => {
        return $q((resolve, reject) => {
            $http.post(`https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=${PINCreds.client_id}&client_secret=${PINCreds.client_secret}&code=${authCode}`)
            .then((authCode) => {
                console.log('Permanent Access Token:', authCode.data.access_token);
                token = authCode.data.access_token;
                // $window.location = `https://api.pinterest.com/v1/me/boards/?access_token${data.data.access_token}=&fields=id%2Cname%2Curl`;
                resolve(token);
            })
            .then((accessToken) => {
                console.log("Token:", token);
                $http.get(`https://api.pinterest.com/v1/me/?access_token=${token}&fields=first_name%2Cid%2Clast_name%2Curl%2Cimage`)
                .then((info) => {
                    console.log("Personal Info:", info.data);
                    console.log("Hello ", info.data.data.first_name + " " + info.data.data.last_name + "!");
                    $('#targetDiv').append(`<img class="circle" src="${info.data.data.image["60x60"].url}" />`);
                    $('#userName').append(`<span class="center">Hello ${info.data.data.first_name}<span>`);
                });
            })
            .then((irrelevant) => {
                let obj = {
                               board: 'bryonlarrance/our-favorite-things',
                               note: 'Test',
                               image_url: 'http://images.gibson.com/Products/Electric-Guitars/2017/USA/Les-Paul-Tribute/LPTR17FHNH1_MAIN_HERO_01.jpg'
                           };

                $http.post(`https://api.pinterest.com/v1/pins/?access_token=${token}&fields=id%2Clink%2Cnote%2Curl`, obj)
                .then((data) => {
                    console.log("Post Data:", data);
                })
                .catch((error) => {
                    console.log("Bad Request");
                    reject(error);
                });
        });
        // $window.location = `https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=${PINCreds.client_id}&client_secret=${PINCreds.client_secret}&code=${authCode}`;
    });



















    // $('#addPin').click(() => {
    //     return $q((resolve, reject) => {
    //         console.log("HEEEEYYYY");
    //         $http.post(`https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=${PINCreds.client_id}&client_secret=${PINCreds.client_secret}&code=${authCode}`)
    //         .then((authCode) => {
    //             console.log('Permanent Access Token:', authCode.data.access_token);
    //             token = authCode.data.access_token;
    //             // $window.location = `https://api.pinterest.com/v1/me/boards/?access_token${data.data.access_token}=&fields=id%2Cname%2Curl`;
    //             resolve(token);
    //         })
    //         .then((accessToken) => {
    //             console.log("Token:", token);
    //             $http.post(`https://api.pinterest.com/v1/pins/?access_token=${token}&fields=id%2Clink%2Cnote%2Curl%2Cboard`);
    //         })
    //         .then((info) => {
    //             console.log(info.data);
    //         })
    //         .catch((error) => {
    //             reject(error);
    //         });
    //     });
    //     // $window.location = `https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=${PINCreds.client_id}&client_secret=${PINCreds.client_secret}&code=${authCode}`;
    // });
    });
});