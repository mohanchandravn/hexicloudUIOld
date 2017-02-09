/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['ojs/ojcore', 'ojs/ojinputtext'
], function () {
    /**
     * The view model for the main content view template
     */
    function raiseSRViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        console.log('Raising SR page');
        self.submitSR = function() {
            isLoggedInUser(true);
            router.go('guidedPathsMini/');
        };
    }
    
    return raiseSRViewModel;
});