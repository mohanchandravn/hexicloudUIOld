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
        
        self.pdfSrc = ko.observable("");
        
        var successCbFn = function(data, status) {
            console.log(data);
            if (status !== 'nocontent') {
                self.pdfSrc(data.Service.FeaturesLink);
            } else {
                alert('Please add pdf link to DB');
            }
        };
        
        var failCbFn = function(xhr) {
            console.log(xhr);
        };
        
        self.handleAttached = function() {
            service.getServiceDetails('faqs').then(successCbFn, failCbFn);
        };
    }
    
    return faqsContentViewModel;
});
