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
        
        //screenrange observable for responsive alignment
        self.screenRange = oj.ResponsiveKnockoutUtils.createScreenRangeObservable();
        self.isScreenXL = ko.computed(function () {
            if (self.screenRange() === "xl")
                return true;
            else
                return false;
        }, self);
        
        self.getServiceDetails = function() {
            $.getJSON("pages/service/services.json", function(result) {
                self.servicesArray([]);
                self.servicesArray(result.services);
            });
            $.getJSON("pages/service/guidedPaths.json", function(result) {
                self.guidedPathsArray([]);
                self.guidedPathsArray(result.guidedPaths);
            });
        };
        
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
            
            //setup the Navigation and Ancillary offcanvases for the responsive layout
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
