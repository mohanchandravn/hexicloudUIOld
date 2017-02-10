/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * dashboard module
 */
define(['jquery', 'knockout', 'ojs/ojcore', 'config/serviceConfig', 'ojs/ojprogressbar', 'ojs/ojoffcanvas'
], function ($, ko, oj, service) {
    /**
     * The view model for the main content view template
     */
    var navigationDrawerLeft, navigationDrawerRight;

    navigationDrawerLeft = {
        "selector": "#navigationDrawerLeft",
        "edge": "start",
        "displayMode": "push",
        "modality": "modal",
        "query": oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.XL_UP)//,
//        "autoDismiss": "none"
    };
    navigationDrawerRight = {
        "selector": "#navigationDrawerRight",
        "edge": "end",
        "displayMode": "push",
        "modality": "modeless",
        "query": oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP)//,
//        "autoDismiss": "none"
    };
    
    function dashboardContentViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        console.log('dashboard page');
        self.runningCPUCount = ko.observable(1);
        self.totalCPUCount = ko.observable(5);
        self.currentUsedMemory = ko.observable(30);
        self.servicesArray = ko.observableArray([]);
        self.guidedPathsArray = ko.observableArray([]);
        
        // variables to store shapes, instances, volumes
        self.shapes = ko.observable(null);
        self.instances = ko.observable(null);
        self.volumes = ko.observable(null);
        
        // screenrange observable for responsive alignment
        self.screenRange = oj.ResponsiveKnockoutUtils.createScreenRangeObservable();
        self.isScreenXL = ko.computed(function () {
            if (self.screenRange() === "xl")
                return true;
            else
                return false;
        }, self);
        
        self.getServiceDetails = function() {
//            $.ajax({
//                type: "GET",
//                url: "https://api-z12.compute.em2.oraclecloud.com/shape/",
//                contentType: "application/oracle-compute-v3+json",
//                dataType: "json",
////                accept: "application/oracle-compute-v3+json",
//                beforeSend: function (xhr) {
////                    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8383");
//                    xhr.setRequestHeader('Accept', 'application/oracle-compute-v3+json');
//                    xhr.withCredentials = true;
//                },
//                success: function (result) {
////                    self.servicesArray([]);
////                    self.servicesArray(result.services);
//                    console.log(result);
//                },
//                error: function (xhr, ajaxOptions, thrownError) {
//                    console.log('Error retrieving details..');
//                    console.log(xhr);
//                    console.log(ajaxOptions);
//                    console.log(thrownError);
//                }
//            });
            // service to get guidedpaths list
            $.ajax({
                type: "GET",
                url: "pages/service/guidedPaths.json",
                contentType: "application/json",
                dataType: "json",
                success: function (result) {
                    self.guidedPathsArray([]);
                    self.guidedPathsArray(result.guidedPaths);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log('Error retrieving details..');
                    console.log(xhr);
                    console.log(ajaxOptions);
                    console.log(thrownError);
                }
            });
            
            // service to get shapes list
            $.ajax({
                type: "GET",
                url: "jsonData/shapes.json",
                contentType: "application/json",
                dataType: "json",
                success: function (result) {
                    self.shapes(result);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log('Error retrieving details..');
                    console.log(xhr);
                    console.log(ajaxOptions);
                    console.log(thrownError);
                }
            });
            // service to get instances list
            $.ajax({
                type: "GET",
                url: "jsonData/instances.json",
                contentType: "application/json",
                dataType: "json",
                success: function (result) {
                    self.instances(result);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log('Error retrieving details..');
                    console.log(xhr);
                    console.log(ajaxOptions);
                    console.log(thrownError);
                }
            });
            // service to get volumes list
            $.ajax({
                type: "GET",
                url: "jsonData/volumes.json",
                contentType: "application/json",
                dataType: "json",
                success: function (result) {
                    self.volumes(result);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log('Error retrieving details..');
                    console.log(xhr);
                    console.log(ajaxOptions);
                    console.log(thrownError);
                }
            });
        };
                
        self.init = ko.computed(function() {
            if (self.shapes() !== null && self.instances() !== null && self.volumes() !== null) {
                var shapes = self.shapes();
                var instances = self.instances();
                var volumes = self.volumes();
                var volumeName;
                var services = [];
                self.servicesArray([]);
                
                // looping for all shapes
                for (var shapeKey in shapes.result) {
//                    if (Number(shapeKey) < 5) {
                        console.log('----------------------------------------------------------');
//                        
                        // looping for all instances
                        for (var instanceKey in instances.result) {
                            if (shapes.result[shapeKey].name === instances.result[instanceKey].shape) {
                                var storages = instances.result[instanceKey].storage_attachments;
                                var instanceVolume = 0;
                                var ramSize = 0;
                                console.log('instance vol cleared..');
                                for (var idx = 0; idx < storages.length; idx++) {
                                    volumeName = instances.result[instanceKey].storage_attachments[idx].storage_volume_name;
                                    
                                    // looping for all volumes
                                    for (var volumeKey in volumes.result) {
                                        if (volumeName === volumes.result[volumeKey].name) {
                                            instanceVolume += ( Number(volumes.result[volumeKey].size) / (1024 * 1024 * 1024) );
                                            ramSize = Number(shapes.result[shapeKey].ram) / (1024);
                                        }
                                    }
                                }
                                console.log('----------------------------------------------------------');
//                                console.log(idx);
                                console.log('Instance size: ' + instanceVolume);
                                services.push({
                                    "serviceType": "COMPUTE",
        //                            "runningInstances": shapes.result[shapeKey].cpus,
                                    "runningInstances": "1",
                                    "cpuUsage": Number(instanceVolume),
                                    "ramSize": ramSize,
                                    "usageMetric": " GB",
                                    "status": instances.result[instanceKey].state
                                });
                            }
                        }
                        
//                    } else {
//                        return console.log('returning bcoz count is equal to 5');;
//                    }
                }
                
                if(isDomainDetailsGiven()){
                    self.servicesArray(dashboardServices()); 
                }else{
                    self.servicesArray(services);
                }
            
            }
        });
        
        self.checkServiceStatus = function(status) {
            return "service-status-" + status.toLocaleLowerCase();
        };
        
        self.toggleLeft = function() {
            if ($("#navigationDrawerLeft").hasClass('oj-offcanvas-open')) {
                oj.OffcanvasUtils.close(navigationDrawerLeft);
                return;
            } else if ($("#navigationDrawerRight").hasClass('oj-offcanvas-open')) {
                oj.OffcanvasUtils.close(navigationDrawerRight);
            }
            return (oj.OffcanvasUtils.open(navigationDrawerLeft));
        };
        
        self.toggleRight = function() {
            if ($("#navigationDrawerLeft").hasClass('oj-offcanvas-open')) {
                oj.OffcanvasUtils.close(navigationDrawerLeft);
            } else if ($("#navigationDrawerRight").hasClass('oj-offcanvas-open')) {
                return;
                oj.OffcanvasUtils.close(navigationDrawerRight);
            }
            return (oj.OffcanvasUtils.open(navigationDrawerRight));
        };
        
        self.handleAttached = function() {
            self.getServiceDetails();
            
            // setup the Navigation and Ancillary offcanvases for the responsive layout
            oj.OffcanvasUtils.setupResponsive(navigationDrawerLeft);
            oj.OffcanvasUtils.setupResponsive(navigationDrawerRight);
        };
        
        self.routeTo = function(data, event) {
            var id = event.currentTarget.id.toLowerCase();
            service.updateCurrentStep({
                "userId": loggedInUser(),
                "userRole": "itAdmin",
                "curStepCode": id,
                "preStepCode": getStateId()
            });
        };
        
        self.logout = function(data, event) {
            router.go('home/');
        };
    }
    
    return dashboardContentViewModel;
});
