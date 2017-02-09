/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define([
], function () {
    /**
     * The view model for the main content view template
     */
    function additionalUserViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        console.log('hello page');
        self.addUsers = function() {
            isLoggedInUser(true);
            router.go('createUsers/');
        };
        self.addLater = function() {
            isLoggedInUser(true);
            router.go('servicesMini/');
        };
    }
    
    return additionalUserViewModel;
});