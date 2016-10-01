'use strict';

angular.module('app.admin')
  .controller('AdminCtrl',['$http', 'Auth', 'User', AdminCtrl]);

    function AdminCtrl($http, Auth, User){
        var vm = this;
        vm.users = User.query();

        vm.delete = deleteUser;

        function deleteUser(user){
            User.remove({id: user_id});
            angular.forEach(users, function(u, i){
                if(u === user){
                    vm.users.splice(i,1);
                }
            });
        }

    }
