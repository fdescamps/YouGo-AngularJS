'use strict';

/* Services */
var yougoServices = angular.module('yougoServices', ['ngResource','ngCookies']);

yougoServices.value('version', '0.1');

yougoServices.factory( 'UserFactory', [ 'Auth', '$resource', '$http', '$q', function( Auth, $resource, $http, $q ){
	Auth.setCredentials("kristina.chung@company.com","password");
	
	// $resource way
	/*return $resource(
			"http://localhost:8080/yougo-rest/api/users", 
			{
				alt:'json', 
				callback:'JSON_CALLBACK'
			},
	       	{
	        	get: {
		 			method: 'JSONP', 
					isArray: true, 
					params: {
						callback: 'JSON_CALLBACK'
					}
		 		},
				replies: {
					method:'JSONP',
					isArray: true,  
					params:{
						callback: 'JSON_CALLBACK'
					}
				}
	       	}
	);*/
	
	// $http way
	return {
		getUsers: function () {
			//local OK
			/*var url = "./js/data.json";
			return $http.get( url ).then(function( response ){
			    return response.data;
			});*/
			
			//distant
			
			$http.defaults.useXDomain = true;
			return $http.jsonp('https://localhost:8080/yougo-rest/api/users/')
			            .success(function(data) {
			                alert(data);
							return data;
			            })	.error(function(response) {
				                console.info(response);
								return response;
				            });
			
			
			/*
			var url = "http://localhost:8080/yougo-rest/api/users/?callback=JSON_CALLBACK";
			var users;
			function myJSON_CALLBACK(data) {
			    users = data;
			}
			$.jsonp({
			        cache: false,
			        url: "http://localhost:8080/yougo-rest/api/users/?callback=?",
			        callbackParameter: "myJSON_CALLBACK",
			        success: function (json, textStatus, xOptions) {
			            // handle success - textStatus is "success"
						console.info("json: "+json+", textStatus: "+textStatus+", xOptions: "+xOptions);   
						console.info("users: "+users);
			        },
			        error: function (xOptions, textStatus) {
			            // handle failure - textStatus is either "error" or "timeout"
						console.info("textStatus: "+textStatus+", xOptions: "+xOptions);   
						console.info("users: "+users);
			        }
			    });
			*/
			/*
			var users;
			function myJSON_CALLBACK(data) {
			    users = data;
			}
			return $http({
			       		method: "JSONP",
			            params: {
			                callback: "myJSON_CALLBACK"
			            },
			            url: "http://127.0.0.1:8080/yougo-rest/api/users",
			            isArray: true
			        }).success(function(data, status) {
						//Never Goes HERE !!
						console.info("data: "+data+", status: "+status);
			        }).error(function(data, status) {
						//Freaking hack !!
			            console.info("data: "+data+", status: "+status);
						console.info(users);
			        });*/
			/*return $.getJSON(url, function(json) {
				console.log(json);
				return json;
			});*/
			/*
			return $.ajax({
				type: 'GET',
			    url: url,
				dataType: 'jsonp',
				crossDomain: true,
				jsonp: true,
				username: "kristina.chung@company.com",
				password: "password",
			    success: function(response){
				 	console.log(response.data);
					return response.data;
				},
				error: function(response)  {
				 	console.log(response);
					return response;
				}, 	
			});*/
			// KO :
			/*return $.jsonp({
			      "url": url,
				  contentType: "application/json",
			      "success": function(response) {
					console.log(response);
					return response;
			      },
			      "error": function(d,msg) {
			        console.log(d);
				  	console.log(msg);
			      }
			});*/
			
			// KO :
			/*return $http.jsonp( url )
			  .success( function( response ){ 
			     return response;
			  })
			  .error( function( response ){ 
			     console.log( 'ERROR: ' + response);
			  });*/
			/*KO :*/
			/*return $http.jsonp( url ).then(function( response ){
			    return response.data;
			});*/
			//KO :
			/*return $resource( 
				url, 
				{alt: 'json', callback: 'JSON_CALLBACK'}, 
				{query:     {method: 'JSONP'} }).query(function(){});*/
		}
	}
}]);

yougoServices.factory( 'Auth', [ 'Base64', '$cookieStore', '$http', function ( Base64, $cookieStore, $http ) {
    // initialize to whatever is in the cookie, if anything
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookieStore.get('authdata');

    return {
		getHttpHeaderBasicAuth: function (username, password) {
            return 'Basic ' + Base64.encode(username + ':' + password);
        },
		setCredentials: function (username, password) {
            var encoded = Base64.encode(username + ':' + password);
            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
            $cookieStore.put('authdata', encoded);
        },
        clearCredentials: function () {
            document.execCommand("ClearAuthenticationCache");
            $cookieStore.remove('authdata');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }
    };
}]);

yougoServices.factory( 'Base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };
});
