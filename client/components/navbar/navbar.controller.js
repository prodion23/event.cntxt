'use strict';

angular.module('angularAppTemplateApp')
  .controller('NavbarCtrl', ['$location', 'Auth', NavbarCtrl]);
  
  function NavbarCtrl($location, Auth){
      var vm = this;
      vm.menu = [];

      vm.isCollapsed = true;
      vm.isLoggedIn = Auth.isLoggedIn;
      vm.isAdmin = Auth.isAdmin;
      vm.getCurrentUser = Auth.getCurrentUser;

      vm.logout = logout;
      vm.isActive = isActive;

      function logout(){
          Auth.logout();
          $location.path('/login');
      }
      function isActive(route){
          return route === $location.path();
      }
  }
