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
define(['jquery', 'knockout', 'ojs/ojcore', 'ojs/ojprogressbar'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function serviceContentViewModel() {
        var self = this;

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
//            $.getJSON("pages/service/fullGuidedPathsDisplay.json", function(result) {
//                self.sguidedPathsArray([]);
//                self.sguidedPathsArray(result.guidedPaths);
//            });
        };

        self.handleAttached = function () {
            self.getServiceDetails();
        };

        self.routeTo = function (data, event) {
            var id = event.currentTarget.id.toLowerCase();
            router.go(id);
        };
        
        self.gotoGuidedPaths = function () {
            isLoggedInUser(true);
            router.go('guidedPathsMini/');
        };
        self.raiseSR = function () {
            isLoggedInUser(true);
            router.go('raiseSR/');
        };
    }


    return serviceContentViewModel;
});


