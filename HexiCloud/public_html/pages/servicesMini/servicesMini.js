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
define(['knockout', 'config/serviceConfig', 'jquery', 'ojs/ojcore', 'ojs/ojprogressbar', 'ojs/ojmasonrylayout','components/trainnavigation/loader','components/techsupport/loader'
], function (ko, service, $) {
    /**
     * The view model for the main content view template
     */
    function serviceContentViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        self.servicesAsExpected = ko.observable(true);
        self.showSupportPanel = ko.observable(false);

        self.goToDashboard = function () {
            isLoggedInUser(true);
//            setTimeout(function () {
                service.updateCurrentStep({
                    "userId": loggedInUser(),
                    "userRole": loggedInUserRole(),
                    "curStepCode": 'dashboard',
                    "preStepCode": getStateId(),
                    "userAction": "Go To Dashboard"
                });
//            }, 500);
//            slideOutAnimate(1500, 0);
        };
        self.contactSupport = function () {
            self.servicesAsExpected(false);
            self.showSupportPanel(true);
        };

        self.selectedTemplate = ko.observable('phone_content');
        self.references = {
            "selectedValueRef": self.selectedTemplate
        };

        self.displayMail = function () {
            self.selectedTemplate('email_content');
            $('#tech_support').slideToggle();
        };

        self.displayCall = function () {
            self.selectedTemplate('phone_content');
            $('#tech_support').slideToggle();
        };

        self.displayChat = function () {
            self.selectedTemplate('chat_content');
            $('#tech_support').slideToggle();
        };
        
        self.currentStepValue = ko.observable('stp3');
        self.stepsArray =
                ko.observableArray(
                        [{label: 'Choose Role', id: 'stp1'},
                            {label: 'Add Users', id: 'stp2'},
                            {label: 'Services', id: 'stp3'}]);
        self.actionDisabledCss = "disable-train-selection";
        
        self.handleAttached = function () {
//            slideInAnimate(500, 0);
            $('#tech_support').hide();
        };
        
        self.handleTransitionCompleted = function () {
            // scroll the whole window to top if it's scroll position is not on top
            $(window).scrollTop(0);
        };
    }


    return serviceContentViewModel;
});


