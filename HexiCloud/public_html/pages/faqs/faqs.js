/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * faqs module
 */
define(['knockout', 'config/serviceConfig'
], function (ko, service) {
    /**
     * The view model for the main content view template
     */
    function faqsContentViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        self.pdfSrc = ko.observable();
        
        var successCbFn = function(data, status) {
            console.log(data);
            self.pdfSrc(data.UseCase.FeaturesLink);
            hidePreloader();
        };
        
        var failCbFn = function(xhr) {
            console.log(xhr);
            hidePreloader();
        };
        
        self.handleAttached = function() {
            showPreloader();
            service.getUseCaseDetails("faq").then(successCbFn, failCbFn);
        };
    }
    
    return faqsContentViewModel;
});
