/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['knockout', 'jquery', 'ojs/ojrouter'
], function (ko, $) {
    /**
     * The view model for the managing service calls
     */
    function serviceConfig() {
        var self = this;
        //local
//        self.portalRestHost = ko.observable("http://127.0.0.1:7101/");
        //GSE JCS
//        self.portalRestHost = ko.observable("https://140.86.1.93/");

        // New GSE JCS

        if (location.protocol === 'http:') {
            self.portalRestHost = ko.observable("http://129.152.128.105:8080/");
        } else {
            self.portalRestHost = ko.observable("https://129.152.128.105/");
        }
//        self.portalRestHost = ko.observable("https://129.152.128.105/");

        self.serverURI = ko.observable("https://documents-gse00002841.documents.us2.oraclecloud.com/documents/link/");

        self.updateCurrentStep = function (payload) {
//            var defer = $.Deferred();
            var serverURL = self.portalRestHost() + "hexiCloudRest/services/rest/createUserStep/";
            $.ajax({
                type: "POST",
                url: serverURL,
                contentType: "application/json",
                data: JSON.stringify(payload),
                success: function (data) {
                    console.log('Successfully posted data at: ' + serverURL);
                    console.log('Navigating to  : ' + payload.curStepCode);
                    router.go(payload.curStepCode);
//                    defer.resolve(payload.curStepCode, {status: 200});
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error posting data to the service" + serverURL);
                    FailCallBackFn(xhr);
//                    defer.reject(xhr);
                }
            });
//            return $.when(defer);
        };

        self.getUserStep = function (userId) {
            var defer = $.Deferred();
            var serverURL = self.portalRestHost() + "hexiCloudRest/services/rest/findUsersCurrentStep/" + userId + "/";
            $.ajax({
                type: "GET",
                url: serverURL,
                success: function (data) {
                    console.log('Successfully retrieved details at: ' + serverURL);
                    defer.resolve(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error retrieving service details at: " + serverURL);
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        // for fetching file details by stepId/stepCode
        self.getFileDetails = function (stepDetail) {
            var defer = $.Deferred();
            if (typeof stepDetail === 'number') {
                var serverURL = self.portalRestHost() + "hexiCloudRest/services/rest/findStepDocsByStepId/" + stepDetail;
            } else {
                var serverURL = self.portalRestHost() + "hexiCloudRest/services/rest/findStepDocsByCode/" + stepDetail;
            }
            $.ajax({
                type: "GET",
                url: serverURL,
                success: function (data, status) {
                    console.log("Successfully retrieved details at: " + serverURL);
                    defer.resolve(data, status);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error retrieving service details at: " + serverURL);
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.getLinkId = function (fileId, docType) {
            var defer = $.Deferred();
            var serverURL = "https://documents-gse00002841.documents.us2.oraclecloud.com/documents/api/1.1/publiclinks/file/" + fileId;
            $.ajax({
                type: "GET",
                url: serverURL,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic YmFsYS5ndXB0YTpzdFlnSUFOQDlDaGFQ');
                },
                success: function (data) {
                    console.log('Successfully retrieved details at: ' + serverURL);
                    if (data.id === fileId) {
                        defer.resolve(data.items[0].linkID, fileId, docType);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error retrieving service details at:" + serverURL);
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.submitSR = function (payload) {
            var defer = $.Deferred();
            var serverURL = self.portalRestHost() + "hexiCloudRest/services/rest/saveAndSendEmail/";
            $.ajax({
                type: "POST",
                url: serverURL,
                contentType: "application/json",
                data: JSON.stringify(payload),
                success: function (data) {
                    console.log('Successfully posted data at: ' + serverURL);
                    defer.resolve(data, {status: 200});
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error posting data to the service" + serverURL);
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.authenticate = function (payload) {
            var defer = $.Deferred();
            var serverURL = self.portalRestHost() + "hexiCloudRest/services/rest/authenticate/";
            $.ajax({
                type: "POST",
                url: serverURL,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(payload),
                success: function (data, textStatus, xhr) {
                    console.log('Successfully posted data at: ' + serverURL);
                    console.log('textStatus : ' + textStatus);
                    console.log('Response status code : ' + xhr.status);
                    defer.resolve(data, {status: xhr.status});
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error posting data to the service : " + serverURL);
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.getUserClmData = function (registryId) {
            var defer = $.Deferred();
            var serverURL = self.portalRestHost() + "hexiCloudRest/services/rest/getClmData/" + registryId;
            $.ajax({
                type: "GET",
                url: serverURL,
                success: function (data) {
                    console.log('Successfully retrieved details at: ' + serverURL);
                    defer.resolve(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error retrieving service details at: " + serverURL);
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.getServiceItems = function () {
            var defer = $.Deferred();
            var serverURL = "pages/servicesMini/servicesMini.json";
            $.ajax({
                type: "GET",
                url: serverURL,
                contentType: "application/json",
                success: function (data, status) {
                    console.log('Successfully retrieved details at: ' + serverURL);
                    defer.resolve(data, status);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error retrieving service details at: " + serverURL);
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.getServiceDetails = function (serverType) {
            var defer = $.Deferred();
            var serverURL = "pages/servicesMini/" + serverType + "-details.json";
            $.ajax({
                type: "GET",
                contentType: "json",
                url: serverURL,
                success: function (data, status) {
                    defer.resolve(data, status)
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error retrieving service details at: " + serverType);
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.getUseCaseDetails = function (id) {
            var defer = $.Deferred();
            var serverURL = "pages/useCases/usecase" + id + ".json";
            $.ajax({
                type: 'GET',
                contentType: "json",
                url: serverURL,
                success: function (data, status) {
                    defer.resolve(data, status)
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error retrieving service details at: " + id);
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.forgotPasswordService = function (userId) {
            var defer = $.Deferred();
            var serviceUrl = "http://127.0.0.1:7001/HexiCloudRest/services/rest/forgotPasswordService/" + userId + "/";
            $.ajax({
                type: 'GET',
                url: serviceUrl,
                success: function (data, status) {
                    defer.resolve(data, status);
                },
                error: function (xhr, ajaxOptions, thrownError)
                {
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };
    }
    ;

    return new serviceConfig();
});
