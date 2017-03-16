/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * dashboard module
 */
define(['jquery', 'knockout', 'config/serviceConfig', 'ojs/ojcore', 'ojs/ojknockout', 'config/sessionInfo', 'ojs/ojprogressbar', 'ojs/ojfilmstrip', 'components/techsupport/loader'
], function ($, ko, service) {
    /**
     * The view model for the main content view template
     */
    function dashboardContentViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        console.log('dashboard page');
        
        self.serviceItems = ko.observableArray([]);
        self.allServiceItems = ko.observableArray([]);
        self.selectedServiceItem = ko.observable();
        self.selectedItemTitle = ko.observable();
        self.selectedItemSubTitle = ko.observable();
        self.benefitsTitle = ko.observable();
        self.selectedItemBenefitsArray = ko.observableArray([]);
        
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
        
        self.openServiceDetail = function(data, event) {
            console.log(data);
            console.log(event);
            var serverType = data.serverType.toLowerCase();
            console.log(serverType);
            self.selectedServiceItem(data.serverType);
            
            var successCbFn = function(data, status) {
                console.log(data);
                self.selectedItemTitle(data.service.title);
                self.selectedItemSubTitle(data.service.subTitle);
                self.benefitsTitle(data.service.benefits.title);
                self.selectedItemBenefitsArray(data.service.benefits.benefitsList);
            };
            
            service.getServiceDetails(serverType).then(successCbFn, FailCallBackFn);
        };
        
        self.onClickFeedback = function()
        {
            if(selectedTemplate() === "")
            {
                selectedTemplate('email_content')
            }
            $("#tech_support").slideToggle();
        };

              
        self.handleAttached = function() {
            service.getServiceItems().then(populateUI, FailCallBackFn);
        };

        self.handleTransitionCompleted = function () {
            // scroll the whole window to top if it's scroll position is not on top
            $(window).scrollTop(0);
        };
  }
    
    return dashboardContentViewModel;
});
