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

        console.log('Mini Services page');

        self.sservicesArray = ko.observableArray([]);


        var getUserClmDataSuccessCallBackFn = function (data) {
            if (data) {
                for (var i in data) {
                    var tierName = data[i].productTier5;
                    if (tierName.indexOf("Storage") > -1) {
                        data[i].iaasImage = "img/mini-DB-Icon.png";
                         data[i].cpuUsage = "44";
                          data[i].memUsage = "12";
                    }
                    if (tierName.indexOf("Compute") > -1) {
                        data[i].iaasImage = "img/mini-compute-icon.png";
                          data[i].cpuUsage = "55";
                          data[i].memUsage = "85";
                    }
                     data[i].sizeClass = 'oj-masonrylayout-tile-1x1';
                }
                self.sservicesArray(data);
            }
        };

        self.getServiceDetails = function () {
            if (!userClmRegistryId()) {
                $.getJSON("pages/servicesMini/servicesMini.json", function (result) {
                    self.sservicesArray([]);
                    self.sservicesArray(result.services);
                });
            } else {
                service.getUserClmData(userClmRegistryId()).then(getUserClmDataSuccessCallBackFn);
            }
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
                "preStepCode": getStateId(),
                "userAction" : "Go To Guided Paths mini"
            });
        };
        self.raiseSR = function () {
            isLoggedInUser(true);
            service.updateCurrentStep({
                "userId": loggedInUser(),
                "userRole": "itAdmin",
                "curStepCode": 'raiseSR',
                "preStepCode": "Raise a email request"
            });
        };
    }


    return serviceContentViewModel;
});


