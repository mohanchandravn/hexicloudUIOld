/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * service module
 */
define(['knockout', 'config/serviceConfig', 'jquery', 'ojs/ojcore', 'ojs/ojprogressbar',  'ojs/ojmasonrylayout'
], function (ko, service, $) {
    /**
     * The view model for the main content view template
     */
    function serviceContentViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        self.handleAttached = function () {
            slideInAnimate(500, 0);
        };
        self.servicesAsExpected = ko.observable(true);
        self.showSupportPanel = ko.observable(false);

        self.goToDashboard = function () {
            isLoggedInUser(true);
            service.updateCurrentStep({
                "userId": loggedInUser(),
                "userRole": loggedInUserRole(),
                "curStepCode": 'dashboard',
                "preStepCode": getStateId(),
                "userAction" : "Go To Dashboard"
            });
        };
        self.contactSupport = function () {
           self.servicesAsExpected(false);
           self.showSupportPanel(true);
        };
    }


    return serviceContentViewModel;
});


