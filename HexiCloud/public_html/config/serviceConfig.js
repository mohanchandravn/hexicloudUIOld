/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['knockout', 'jquery', 'config/sessionInfo', 'ojs/ojrouter'
], function (ko, $, sessionInfo) {
    
    /**
     * The view model for the managing service calls
     */
    function serviceConfig() {
        
        var self = this;
        
        // local
        // self.portalRestHost = ko.observable("http://127.0.0.1:7101/");
        // GSE JCS
        // self.portalRestHost = ko.observable("https://140.86.1.93/");

        // New GSE JCS
        if (location.protocol === 'http:') {
            self.portalRestHost = ko.observable("http://129.152.128.105:8080/");
        } else {
            self.portalRestHost = ko.observable("https://129.152.128.105/");
        }
        // self.portalRestHost = ko.observable("https://129.152.128.105/");

        self.serverURI = ko.observable("https://documents-gse00002841.documents.us2.oraclecloud.com/documents/link/");

        self.updateCurrentStep = function (payload) {
            // var defer = $.Deferred();
            var serverURL = self.portalRestHost() + "hexiCloudRestSecured/services/rest/createUserStep/";
            $.ajax({
                type: "POST",
                url: serverURL,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", "Bearer " + sessionInfo.getFromSession(sessionInfo.accessToken));
                },
                contentType: "application/json",
                data: JSON.stringify(payload),
                success: function (data) {
                    console.log('Successfully posted data at: ' + serverURL);
                    console.log('Navigating to  : ' + payload.curStepCode);
                    router.go(payload.curStepCode);
                    // defer.resolve(payload.curStepCode, {status: 200});
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error posting data to the service" + serverURL);
                    FailCallBackFn(xhr);
                    // defer.reject(xhr);
                }
            });
            // return $.when(defer);
        };

        self.getUserStep = function (userId) {
            var defer = $.Deferred();
            var serverURL = self.portalRestHost() + "hexiCloudRestSecured/services/rest/findUsersCurrentStep/" + userId + "/";
            $.ajax({
                type: "GET",
                url: serverURL,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", "Bearer " + sessionInfo.getFromSession(sessionInfo.accessToken));
                },
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

        // For fetching file details by stepId/stepCode
        self.getFileDetails = function (stepDetail) {
            var defer = $.Deferred();
            if (typeof stepDetail === 'number') {
                var serverURL = self.portalRestHost() + "hexiCloudRestSecured/services/rest/findStepDocsByStepId/" + stepDetail;
            } else {
                var serverURL = self.portalRestHost() + "hexiCloudRestSecured/services/rest/findStepDocsByCode/" + stepDetail;
            }
            $.ajax({
                type: "GET",
                url: serverURL,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", "Bearer " + sessionInfo.getFromSession(sessionInfo.accessToken));
                },
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
            var serverURL = self.portalRestHost() + "hexiCloudRestSecured/services/rest/saveAndSendEmail/";
            $.ajax({
                type: "POST",
                url: serverURL,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", "Bearer " + sessionInfo.getFromSession(sessionInfo.accessToken));
                },
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
            var serverURL = self.portalRestHost() + "hexiCloudRestSecured/login";
            $.ajax({
                type: "POST",
                url: serverURL,
                dataType: "json",
                beforeSend: function(request) {
                    request.setRequestHeader("Portal-Type", "user");
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                contentType: "application/x-www-form-urlencoded",
                data: payload,
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

        self.getUserDetails = function (userId) {
            var defer = $.Deferred();
            var serverURL = self.portalRestHost() + "hexiCloudRestSecured/services/rest/getUserDetails/" + userId + "/";
            $.ajax({
                type: "GET",
                url: serverURL,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", "Bearer " + sessionInfo.getFromSession(sessionInfo.accessToken));
                },
                success: function (data, textStatus, xhr) {
                    console.log('Successfully posted data at: ' + serverURL);
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
            var serverURL = self.portalRestHost() + "hexiCloudRestSecured/services/rest/getClmData/" + registryId;
            $.ajax({
                type: "GET",
                url: serverURL,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", "Bearer " + sessionInfo.getFromSession(sessionInfo.accessToken));
                },
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
                dataType: "json",
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
            var serverURL = self.portalRestHost() + "hexiCloudRestSecured/services/rest/serviceBenefits/" + serverType + "/";
            $.ajax({
                type: "GET",
                url: serverURL,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", "Bearer " + sessionInfo.getFromSession(sessionInfo.accessToken));
                },
                dataType: "json",
                success: function (data, status) {
                    defer.resolve(data, status);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error retrieving service details at: " + serverType);
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.getUseCaseItems = function () {
            var defer = $.Deferred();
            var serverURL = self.portalRestHost() + "hexiCloudRestSecured/services/rest/usecases/";
            $.ajax({
                type: "GET",
                url: serverURL,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", "Bearer " + sessionInfo.getFromSession(sessionInfo.accessToken));
                },
                dataType: "json",
                success: function (data, status) {
                    defer.resolve(data, status);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error retrieving service details at: " + serverType);
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.getUseCaseDetails = function (usecaseCode) {
            var defer = $.Deferred();
            var serverURL = self.portalRestHost() + "hexiCloudRestSecured/services/rest/usecases/" + usecaseCode + "/";
            $.ajax({
                type: 'GET',
                url: serverURL,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", "Bearer " + sessionInfo.getFromSession(sessionInfo.accessToken));
                },
                dataType: "json",
                success: function (data, status) {
                    defer.resolve(data, status)
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error retrieving service details for: " + usecaseCode);
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.forgotPasswordService = function (userId) {
            var defer = $.Deferred();
            var serviceUrl = self.portalRestHost() + "hexiCloudRestSecured/services/rest/forgotPasswordService/" + userId + "/";
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
    };

    return new serviceConfig();
});
