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
    function rolerIdentifiedViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        console.log('hello page');
        self.acceptRole = function() {
            isLoggedInUser(true);
            userRole('accountAdmin');
            router.go('addAdditionalUsers/');
        };
        self.rejectRole = function() {
            isLoggedInUser(true);
            userRole('');
            router.go('chooseRole/');
        };
    }
    
    return rolerIdentifiedViewModel;
});