/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojinputtext'
], function (oj, ko, $) {
    /**
     * The view model for the main content view template
     */
    function createUsersViewModel() {
        var self = this;
        
        console.log('Create Users page');
        self.addMoreUsers = function() {
            isLoggedInUser(true);
            router.go('createUsers/');
        };
        self.doNotAddUsers = function() {
            isLoggedInUser(true);
            router.go('dashboard/');
        };
    }
    
    return createUsersViewModel;
});