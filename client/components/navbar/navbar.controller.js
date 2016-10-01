'use strict';

angular.module('angularAppTemplateApp')
  .controller('NavbarCtrl', ['$state', 'Auth', 'firebaseService', NavbarCtrl]);

  function NavbarCtrl($state, Auth, firebaseService){
      var vm = this;
      vm.menu = [];

      vm.isCollapsed = true;
      //vm.isLoggedIn = Auth.isLoggedIn;
      vm.isAdmin = Auth.isAdmin;
      vm.currentUser = firebaseService.auth().currentUser;

      console.log("CURRENT USER: ", vm.currentUser);

      if(vm.currentUser === null)
        vm.isLoggedIn = false;
      else {
        vm.isLoggedIn = true;
        vm.email = vm.currentUser.email;
        }

      vm.logout = logout;
      //vm.isActive = isActive;

      function logout(){
          firebaseService.auth().signOut().then(function() {
            $state.go("login");
          }, function(error) {
            console.log("ERROR LOGGING OUT");
          });

      }
//      function isActive(state){
//          return route === $state.path();
//      }
  }
