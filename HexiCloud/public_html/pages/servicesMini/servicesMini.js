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
        self.serviceItems = ko.observableArray([]);
        self.allServiceItems = ko.observableArray([]);

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


        self.displayMail = function () {
            selectedTemplate('email_content');
            $('#tech_support').slideToggle();
        };

        self.displayCall = function () {
            selectedTemplate('phone_content');
            $('#tech_support').slideToggle();
        };

        self.displayChat = function () {
            selectedTemplate('chat_content');
            $('#tech_support').slideToggle();
        };
        
        self.currentStepValue = ko.observable('stp3');
        self.stepsArray =
                ko.observableArray(
                        [{label: 'Choose Role', id: 'stp1'},
                            {label: 'Add Users', id: 'stp2'},
                            {label: 'Services', id: 'stp3'}]);
        self.actionDisabledCss = "disable-train-selection";
        
        self.getClass = function(serverType) {
            if (serverType === 'COMPUTE') {
                return 'blue';
            } else if (serverType === 'JCS') {
                return 'green';
            } else {
                return 'purple';
            }
        };
        
        function populateUI(data, status) {
            console.log(data);
            console.log(status);
            var array = [];
//            self.serviceItems(data.services);var array = [];
            self.allServiceItems(data.services);
            $.each(data.services, function(idx, serviceItem) {
                if (idx < 4) {
                    array.push(serviceItem);
                }
            });
            self.serviceItems(array);
        };
        
        self.openAllServices = function(data, event) {
            console.log('opening all service items..');
            self.serviceItems(self.allServiceItems());
            $(".open-all-services-btn").hide();
        };
        
        self.handleAttached = function () {
//            slideInAnimate(500, 0);
            service.getServiceItems().then(populateUI, FailCallBackFn);
        };
        
        self.handleTransitionCompleted = function () {
            // scroll the whole window to top if it's scroll position is not on top
            $(window).scrollTop(0);
        };
    }


    return serviceContentViewModel;
});


