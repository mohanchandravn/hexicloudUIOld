/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * dashboard module
 */
define(['jquery', 'knockout', 'ojs/ojcore', 'ojs/ojprogressbar', 'ojs/ojoffcanvas'
], function ($, ko, oj) {
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
    
    function dashboardContentViewModel() {
        var self = this;
        
        console.log('dashboard page');
        var router = oj.Router.rootInstance;  
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
            // service to get services list
            $.ajax({
                type: "GET",
                url: "pages/service/services.json",
                contentType: "application/json",
                dataType: "json",
                success: function (result) {
                    self.servicesArray([]);
                    self.servicesArray(result.services);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log('Error retrieving details..');
                    console.log(xhr);
                    console.log(ajaxOptions);
                    console.log(thrownError);
                }
            });
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
                console.clear();
                self.servicesArray([]);
                for (var prop in shapes.result) {
                    if (Number(prop) < 5) {
                        console.log('----------------------------------------------------------');
//                        console.log(shapes.result[prop]);
//                        console.log(instances.result[prop]);
                        if (shapes.result[prop].name === instances.result[prop].shape) {
                            volumeName = "/" + instances.result[prop].storage_attachments[0].storage_volume_name;
//                            console.log(volumes.result[prop]);
                            if (volumeName === volumes.result[prop].name) {
                                console.log('name: ' + shapes.result[prop].name);
                                console.log('ram: ' + shapes.result[prop].ram);
                                console.log('cpus: ' + shapes.result[prop].cpus);
                                console.log('size: ' + volumes.result[prop].size);
                                services.push({
                                    "serviceType": "COMPUTE",
                                    "runningInstances": shapes.result[prop].cpus,
                                    "cpuUsage": Number((volumes.result[prop].size) / (1024 * 1024)),
                                    "learningCompleteness": "2",
                                    "usageMetric": " GB",
                                    "status": instances.result[prop].state
                                });
                                
                            }
                        }
                    } else {
                        return console.log('returning bcoz count is equal to 5');;
                    }
                }
                console.log('----------------------------------------------------------');
                self.servicesArray(services);
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
            router.go(id);
        };
        
        self.logout = function(data, event) {
            router.go('home/');
        };
    }
    
    return dashboardContentViewModel;
});
