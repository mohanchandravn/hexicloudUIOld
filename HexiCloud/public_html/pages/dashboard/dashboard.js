/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * dashboard module
 */
define(['jquery', 'knockout', 'ojs/ojcore', 'ojs/ojknockout', 'config/serviceConfig', 'config/sessionInfo', 'ojs/ojprogressbar', 'ojs/ojfilmstrip','components/techsupport/loader'
], function ($, ko, oj, service, sessionInfo) {
    /**
     * The view model for the main content view template
     */
    function dashboardContentViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        console.log('dashboard page');
        
        self.usecaseItems = [
            { title: 'Use Case 1', description: 'Migrate Non Oracle Workloads to the Public Cloud' },
            { title: 'Use Case 2', description: 'Extended Use Case for added value – Oracle Ravello Cloud Service' },
            { title: 'Use Case 3', description: 'Migrate Non Oracle Workloads to the Public Cloud' }
        ];
        
        self.selectedFilmStripItem = ko.observable(0);
        
        getItemInitialDisplay = function(index) {
            return index < 3 ? '' : 'none';
        };
        
        self.openUsecaseContainer = function(data, event) {
            console.log(self.selectedFilmStripItem());
            var id = event.currentTarget.id;
            self.selectedFilmStripItem(id);
            console.log(self.selectedFilmStripItem());
            $(".usecase-detail-container").addClass("oj-sm-hide");
            $(".head").removeClass("active");
            $("#head" + id).addClass("active");
            $("#usecaseContainer" + (Number(id) + 1)).removeClass("oj-sm-hide");
        };

        self.togglePath = function(data, event) {
            var id = event.currentTarget.id;
            console.log(id);
            var parsedId = id.match(/\d+/g);
            for (var idx = 0; idx < 5; idx++) {
                if (idx === Number(parsedId[0])) {
                    if ( ($("#guidedPathDetail" + idx).hasClass("oj-sm-hide")) ) {
                        $("#icon" + idx).text('remove');
                        $("#guidedPathDetail" + idx).removeClass("oj-sm-hide");
                        //return;
                    } else {
                        $("#icon" + idx).text('add');
                        $("#guidedPathDetail" + idx).addClass("oj-sm-hide");
                        //return;
                    }
                } else {
                    if ( !($("#guidedPathDetail" + idx).hasClass("oj-sm-hide")) ) {
                        $("#icon" + idx).text('add');
                        $("#guidedPathDetail" + idx).addClass("oj-sm-hide");
                    }
                }
            }
        };
        
        self.onClickFeedback = function()
        {
            $("#tech_support").slideToggle();
        };
              
        self.handleAttached = function() {
            $('#tech_support').hide();
        };
        
        self.selectedTemplate = ko.observable('chat_content');
//        self.references = {
//            "selectedValueRef": self.selectedTemplate
//        };

        self.viewCallContent = function () {
            self.selectedTemplate('phone_content');
        };

        self.viewChatContent = function () {
            self.selectedTemplate('chat_content');
        };
        
        self.viewMailContent = function () {
            self.selectedTemplate('email_content');
        };
        
         self.closeTechSupportLayout = function ()
        {
            $('#tech_support').hide();
        };
    
  }
    
    return dashboardContentViewModel;
});
