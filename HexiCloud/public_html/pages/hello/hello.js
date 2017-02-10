/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['config/serviceConfig', 'knockout', 'ojs/ojcore', 'jquery', 'ojs/ojinputtext'
], function (service, ko) {
    /**
     * The view model for the main content view template
     */
    function helloViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        self.workFlowButtonText = ko.observable("START");
        self.helpText1 = ko.observable("Please continue the following guide");
        self.helpText2 = ko.observable("to setup your account");
        self.buttonRouterConfig = ko.observable("roleIdentified");

        var getUserStepSuccessCallBackFn = function (data) {
            console.log(data);
            if (data) {
                loggedInUser(data.userId);
                loggedInUserRole(data.userRole);
                self.workFlowButtonText("CONTINUE");
                self.helpText1("You seem to have started the on-boarding");
                self.helpText2("Please Continue");
                self.buttonRouterConfig(data.curStepCode);
            }
        };

        service.getUserStep(loggedInUser()).then(getUserStepSuccessCallBackFn);

        self.skipProcess = function () {
            isLoggedInUser(true);
            service.updateCurrentStep({
                "userId": loggedInUser(),
                "userRole": "itAdmin",
                "curStepCode": "dashboard",
                "preStepCode": getStateId()
            });
        };
        
        self.startProcess = function () {
            console.log('Navigating to role Identified page');
            isLoggedInUser(true);
            service.updateCurrentStep({
                "userId": loggedInUser(),
                "userRole": loggedInUserRole(),
                "curStepCode": self.buttonRouterConfig(),
                "preStepCode": getStateId()
            });
        };
    }

    return helloViewModel;
});
