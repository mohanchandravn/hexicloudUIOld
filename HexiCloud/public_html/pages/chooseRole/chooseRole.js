/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojradioset'
], function (oj, ko, $) {
    /**
     * The view model for the main content view template
     */
    function chooseRoleViewModel() {
        var self = this;
        
        console.log('hello page');
        self.currentRole = ko.observable("itAdmin");
        self.selectedRole = function() {
            isLoggedInUser(true);
             console.log('The value : ' + self.currentRole);
            router.go('addAdditionalUsers/');
        };
    }
    
    return chooseRoleViewModel;
});