'use strict';

angular.module('app.settings')
  .controller('SettingsCtrl',['User', 'Auth', SettingsCtrl]);

  function SettingsCtrl(User, Auth){
    var vm = this;
    vm.errors = {};
    vm.user = {
        oldPassword:'',
        newPassword:''
    };
    vm.changePassword = changePassword;

    function changePassword(form){
        vm.submitted = true;
        if(form.$valid) {
          Auth.changePassword( vm.user.oldPassword, vm.user.newPassword )
          .then( function() {
            vm.message = 'Password successfully changed.';
          })
          .catch( function() {
            form.password.$setValidity('sql', false);
            vm.errors.other = 'Incorrect password';
            vm.message = '';
          });
        }
    }

  }
