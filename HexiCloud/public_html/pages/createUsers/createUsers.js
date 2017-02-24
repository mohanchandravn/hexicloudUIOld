/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['knockout', 'config/serviceConfig', 'jquery', 'ojs/ojcore', 'ojs/ojaccordion', 'ojs/ojcollapsible'
], function (ko, service, $) {
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
                        "displayLabel": data[idx].displayLabel,
                        "accessToken": data[idx].accessToken,
                        "appLinkId": data[idx].appLinkId,
                        "appLinkUrl": data[idx].appLinkUrl,
                        "displayOrder": data[idx].displayOrder,
                        "docCsRole": data[idx].docCsRole,
                        "docFileId": data[idx].docFileId,
                        "docMetaData": data[idx].docMetaData,
                        "docType": data[idx].docType,
                        "docTypeExtn": data[idx].docTypeExtn,
                        "fileName": data[idx].fileName,
                        "publicLinkId": data[idx].publicLinkId,
                        "refreshToken": data[idx].refreshToken,
                        "stepCode": data[idx].stepCode,
                        "stepId": data[idx].stepId,
                        "subStepCode": data[idx].subStepCode,
                    });
                }
                self.documentsArray(array);
            } else {
                console.log('Content not available for the selected step');
            }
        };
        
        self.getDocsViewLink = function(docTypeExtn, appLinkUrl, refreshToken, accessToken, appLinkId, docFileId) {
            if (docTypeExtn !== 'mp4') {
                $("#" + docFileId).attr('src', appLinkUrl);
                function OnMessage (evt) {   
                    console.log(evt.data);
                    if (evt.data.message === 'appLinkReady') {
                        var iframe= $("#" + docFileId)[0];
                        var iframewindow= iframe.contentWindow ? iframe.contentWindow : iframe.contentDocument.defaultView;
                        var msg = {
                                message: 'setAppLinkTokens',
                                appLinkRefreshToken: refreshToken,
                                appLinkAccessToken: accessToken,
                                appLinkRoleName: "downloader",
                                embedPreview: true
                        };

                        iframewindow.postMessage(msg, '*');
                    }
                };
                window.addEventListener && window.addEventListener('message', OnMessage, false);
            } else {
                console.log("https://documents-usoracleam82569.documents.us2.oraclecloud.com/documents/link/app/" + appLinkId + "/file/" + docFileId + "&dAppLinkAccessToken=" + accessToken);
                return("https://documents-usoracleam82569.documents.us2.oraclecloud.com/documents/link/app/" + appLinkId + "/file/" + docFileId + "&dAppLinkAccessToken=" + accessToken);
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
                "preStepCode": getStateId()
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
