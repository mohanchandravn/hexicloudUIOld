/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['config/serviceConfig', 'ojs/ojcore', 'knockout', 'jquery', 'ojs/ojinputtext'
], function (service) {
    /**
     * The view model for the main content view template
     */
    function helloViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        var successCallBackFn = function(id, data) {
            console.log(data);
            router.go(id);
        };
        
        var FailCallBackFn = function(xhr) {
            console.log(xhr);
        };
        
        self.skipProcess = function() {
            isLoggedInUser(true);
            service.updateCurrentStep({
                    "userId" : loggedInUser(),
                    "userRole" : "itAdmin",
                    "curStepCode" : "dashboard",
                    "preStepCode" : getStateId()
            }).then(successCallBackFn, FailCallBackFn);
        };
        self.startProcess = function() {
            console.log('Navigating to role Identified page');
            isLoggedInUser(true);
            service.updateCurrentStep({
                    "userId" : loggedInUser(),
                    "userRole" : "itAdmin",
                    "curStepCode" : "roleIdentified",
                    "preStepCode" : getStateId()
            }).then(successCallBackFn, FailCallBackFn);
        };
    }
    
    return helloViewModel;
});