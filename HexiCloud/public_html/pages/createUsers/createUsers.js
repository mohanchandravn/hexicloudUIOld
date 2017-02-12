/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['knockout', 'config/serviceConfig', 'ojs/ojcore', 'jquery', 'ojs/ojaccordion', 'ojs/ojcollapsible'
], function (ko, service) {
    /**
     * The view model for the main content view template
     */
    function createUsersViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        //for adding Users and Assigning roles
        self.urlForMyServices = ko.observable('https://myservices.em2.oraclecloud.com/mycloud/faces/dashboard.jspx');
        self.textForMyServices = ko.observable('Link for My Services');
        
        //for adding Admin Users and Assigning roles
        self.urlForMyAccount = ko.observable('https://myaccount.cloud.oracle.com/mycloud/faces/dashboard.jspx');
        self.textForMyAccount = ko.observable('Link for My Accounts');
        
        self.documentsArray = ko.observableArray([]);
        
        if (loggedInUserRole() === 'itAdmin') {
            for (var idx = 0; idx < 5; idx++) {
                self.documentsArray.push({"docName": "Document " + (idx + 1), "pdfSrc": "https://documents-gse00002841.documents.us2.oraclecloud.com/documents/link/LDFC37ABC5CD3EF8CBE505C7704A23FFF5A54B6D86DA/file/D68745A6BB6089B3199A8163704A23FFF5A54B6D86DA"});
            }
        } else {
            for (var idx = 0; idx < 5; idx++) {
                self.documentsArray.push({"docName": "Document " + (idx + 1), "pdfSrc": "https://documents-gse00002841.documents.us2.oraclecloud.com/documents/link/LDCDFF97F6E7411D4416C588704A23FFF5A54B6D86DA/file/DD9ADEC488FEEDE3210A732A704A23FFF5A54B6D86DA"});
            }
        }
        
        self.goToServices = function(data, event) {
            isLoggedInUser(true);
            service.updateCurrentStep({
                "userId": loggedInUser(),
                "userRole": "itAdmin",
                "curStepCode": 'servicesMini',
                "preStepCode": getStateId()
            });
        };
        
//        self.pdfSrc(service.serverURI() + fetchedLinkId + "/file/" + fileId);

//        self.addMoreUsers = function() {
//            console.log('Clicked add more user');
//            isLoggedInUser(true);
//            router.go('createUsers/');
//        };
//        self.doNotAddUsers = function() {
//            isLoggedInUser(true);
//            router.go('servicesMini/');
//        };
    }
    
    return createUsersViewModel;
});
