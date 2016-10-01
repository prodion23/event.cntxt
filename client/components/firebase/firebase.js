angular.module('app.firebase',[])
.factory('firebaseService', function($firebaseArray){
	// Initialize Firebase
    var config = {
         apiKey: "AIzaSyBW1UEG7qEaS18W1vIlr6KvTTMYgfR5zA0",
         authDomain: "eventcontext-856be.firebaseapp.com",
         databaseURL: "https://eventcontext-856be.firebaseio.com",
         storageBucket: "eventcontext-856be.appspot.com",
         messagingSenderId: "56393339507"
        };
	  return firebase.initializeApp(config);
});
