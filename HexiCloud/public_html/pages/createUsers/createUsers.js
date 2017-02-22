/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['knockout', 'config/serviceConfig', 'ojs/ojcore', 'jquery', 'ojs/ojaccordion', 'ojs/ojcollapsible'
], function (ko, service, oj) {
    /**
     * The view model for the main content view template
     */
    function createUsersViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        //for adding Users and Assigning roles
        self.urlForMyServices = ko.observable('https://myservices.em2.oraclecloud.com/mycloud/faces/dashboard.jspx');
        self.textForMyServices = ko.observable('Go to MyServices to Add Users');
        
        //for adding Admin Users and Assigning roles
        self.urlForMyAccount = ko.observable('https://myaccount.cloud.oracle.com/mycloud/faces/dashboard.jspx');
        self.textForMyAccount = ko.observable('Go to MyAccounts to Add Users');
        
        self.documentsArray = ko.observableArray([]);
        
        var getFileDetailsSuccessFn = function(data, status) {
            if (status !== 'nocontent') {
                console.log(data);
                self.documentsArray([]);
                var array = [];
                for (var idx = 0; idx < data.length; idx++) {
                    array.push({
                        "docName": data[idx].fileName,
                        "pdfSrc": "https://documents-usoracleam82569.documents.us2.oraclecloud.com/documents/link/" + data[idx].publicLinkId + "/file/" + data[idx].docFileId});
                }
                self.documentsArray(array);
            } else {
                console.log('Content not available for the selected step');
            }
        };
        
        var getFileDetailsFailFn = function(xhr) {
            console.log(xhr);
        };
        
        self.goToServices = function(data, event) {
            isLoggedInUser(true);
            service.updateCurrentStep({
                "userId": loggedInUser(),
                "userRole": "itAdmin",
                "curStepCode": 'servicesMini',
                "preStepCode": getStateId(),
                "userAction" : "Go to Services Provisioned"
            });
        };
        
//        self.addMoreUsers = function() {
//            console.log('Clicked add more user');
//            isLoggedInUser(true);
//            router.go('createUsers/');
//        };
//        self.doNotAddUsers = function() {
//            isLoggedInUser(true);
//            router.go('servicesMini/');
//        };
        
        self.handleAttached = function() {
            service.getFileDetails(getStateId()).then(getFileDetailsSuccessFn, getFileDetailsFailFn);
        };
    }
    
    return createUsersViewModel;
});
