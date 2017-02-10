/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['knockout', 'config/serviceConfig', 'ojs/ojcore', 'ojs/ojinputtext'
], function (ko, service) {
    /**
     * The view model for the main content view template
     */
    function raiseSRViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        console.log('Raising SR page');
        
        self.subject = ko.observable('');
        self.message = ko.observable('');
        self.detailsOfSR = ko.observable('');
        self.statusOfSR = ko.observable(false);
        
        var successCallBackFn = function(data, status) {
            console.log(data);
            console.log(status);
            self.detailsOfSR(data);
            self.statusOfSR(true);
        };
        
        var failCallBackFn = function(xhr) {
            console.log(xhr);
        };
        
//            var data = {
//                "userId" : '21',
//                "message" : "message 3",
//                "subject" : "subject 2",
//                "sentTo" : "To me 1",
//                "sentCC" : "CC me 1",
//                "sentBCC" : "BCC me 1",
//                "srId": "4"
//            };
//            successCallBackFn(data);
            
        self.submitSR = function() {
            isLoggedInUser(true);
            console.log(self.subject());
            console.log(self.message());
            service.submitSR({
                "userId" : loggedInUser(),
                "message" : self.message(),
                "subject" : self.subject(),
                "sentTo" : "To me 1",
                "sentCC" : "CC me 1",
                "sentBCC" : "BCC me 1"
            }).then(successCallBackFn, failCallBackFn);
        };
    }
    
    return raiseSRViewModel;
});