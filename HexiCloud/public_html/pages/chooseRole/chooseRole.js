/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['knockout', 'ojs/ojcore', 'jquery', 'ojs/ojradioset'
], function (ko) {
    /**
     * The view model for the main content view template
     */
    function chooseRoleViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        console.log('hello page');
        self.currentRole = ko.observable("itAdmin");
        self.selectedRole = function() {
            isLoggedInUser(true);
            userRole(self.currentRole());
            console.log('The selected role is: ' + userRole());
            router.go('addAdditionalUsers/');
        };
    }
    
    return chooseRoleViewModel;
});