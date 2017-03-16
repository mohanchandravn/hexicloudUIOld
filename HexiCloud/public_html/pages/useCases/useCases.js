/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * useCases module
 */
define(['jquery', 'knockout', 'config/serviceConfig', 'ojs/ojcore', 'ojs/ojknockout', 'config/sessionInfo', 'ojs/ojprogressbar', 'ojs/ojfilmstrip', 'components/techsupport/loader'
], function ($, ko, service) {
    /**
     * The view model for the main content view template
     */
    function useCasesContentViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        console.log('useCases page');
        
        self.useCaseItems = [
            { title: 'Use Case 1', description: 'Migrate Non Oracle Workloads to the Public Cloud' },
            { title: 'Use Case 2', description: 'Extended Use Case for added value – Oracle Ravello Cloud Service' },
            { title: 'Use Case 3', description: 'Migrate Non Oracle Workloads to the Public Cloud' }
        ];
        
        self.selectedFilmStripItem = ko.observable(0);
        self.selectedUseCaseItem = ko.observable();
        self.selectedUseCaseName = ko.observable();
        self.selectedUseCaseTitle = ko.observable();
        self.selectedUseCaseSubTitle = ko.observable();
//        self.benefitsTitle = ko.observable();
        self.selectedUseCaseBenefitsArray = ko.observableArray([]);
        
        getItemInitialDisplay = function(index) {
            return index < 3 ? '' : 'none';
        };
        
        self.openUseCaseContainer = function(data, event) {
            var id;
            if (event === undefined) {
                id = 0;
            } else {
                id = event.currentTarget.id;
            }
            $(".use-case-detail-container").addClass("oj-sm-hide");
            $(".head").removeClass("active");
            $("#head" + id).addClass("active");
            self.selectedUseCaseItem(id);
            
            var successCbFn = function(data, status) {
                console.log(data);
                self.selectedUseCaseName(data.useCase.name);
                self.selectedUseCaseTitle(data.useCase.title);
                self.selectedUseCaseSubTitle(data.useCase.subTitle);
//                self.benefitsTitle(data.useCase.benefits.title);
                self.selectedUseCaseBenefitsArray(data.useCase.benefits.benefitsList);
            };
            
            service.getUseCaseDetails(id).then(successCbFn, FailCallBackFn)
        };

        self.handleTransitionCompleted = function () {
            // scroll the whole window to top if it's scroll position is not on top
            $(window).scrollTop(0);
        };
        
        self.handleBindingsApplied = function() {
            self.openUseCaseContainer();
        };
  }
    
    return useCasesContentViewModel;
});
