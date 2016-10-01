'use strict';

angular.module('app.home')
  .controller('HomeCtrl', ['$http', HomeCtrl]);

  function HomeCtrl($http){
      var vm = this;
      vm.awesomeThings = [];
      vm.newThing = '';

      vm.activate = activate;
      vm.getThings = getThings;
      vm.addThing = addThing;
      vm.deleteThing = deleteThing;
      activate();

      function activate(){
          getThings();
      }
      function getThings(){
          $http.get('/api/things').success(function(awesomeThings) {
            vm.awesomeThings = awesomeThings;
          });
      }
      function addThing(){
          if(vm.newThing === ''){
              return;
          }
          $http.post('/api/things', { name: vm.newThing });
          vm.newThing = '';
      }
      function deleteThing(thing){
          $http.delete('/api/things/'+thing._id);
      }

  }
