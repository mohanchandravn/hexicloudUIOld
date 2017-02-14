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
define(['knockout', 'config/serviceConfig', 'jquery', 'ojs/ojcore', 'ojs/ojprogressbar'
], function (ko, service, $) {
    /**
     * The view model for the main content view template
     */
    function serviceContentViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;

        console.log('guided path page');

        self.srunningCPUCount = ko.observable(1);
        self.stotalCPUCount = ko.observable(5);
        self.scurrentUsedMemory = ko.observable(30);
        self.sservicesArray = ko.observableArray([]);
        self.sguidedPathsArray = ko.observableArray([]);

        self.getServiceDetails = function () {
            $.getJSON("pages/servicesMini/servicesMini.json", function (result) {
                self.sservicesArray([]);
                self.sservicesArray(result.services);
            });
        };

        self.handleAttached = function () {
            self.getServiceDetails();
        };
        
        self.gotoGuidedPaths = function () {
            isLoggedInUser(true);
            service.updateCurrentStep({
                "userId": loggedInUser(),
                "userRole": "itAdmin",
                "curStepCode": 'guidedPathsMini',
                "preStepCode": getStateId()
            });
        };
        self.raiseSR = function () {
            isLoggedInUser(true);
            service.updateCurrentStep({
                "userId": loggedInUser(),
                "userRole": "itAdmin",
                "curStepCode": 'raiseSR',
                "preStepCode": getStateId()
            });
        };
    }

    return serviceContentViewModel;
});


