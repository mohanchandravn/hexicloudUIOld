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
            console.log(data.serverType);
        };
        
        self.onClickFeedback = function()
        {
            $("#tech_support").slideToggle();
        };
        
        self.selectedTemplate = ko.observable('chat_content');
        self.references = {
            "selectedValueRef": self.selectedTemplate
        };

        self.viewCallContent = function () {
            self.selectedTemplate('phone_content');
        };

        self.viewChatContent = function () {
            self.selectedTemplate('chat_content');
        };
        
        self.viewMailContent = function () {
            self.selectedTemplate('email_content');
        };
              
        self.handleAttached = function() {
            $('#tech_support').hide();
            service.getServiceItems().then(populateUI, FailCallBackFn);
        };

        self.handleTransitionCompleted = function () {
            // scroll the whole window to top if it's scroll position is not on top
            $(window).scrollTop(0);
        };
  }
    
    return dashboardContentViewModel;
});
