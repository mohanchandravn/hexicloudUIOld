/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * dashboard module
 */
define(['jquery', 'knockout', 'ojs/ojcore', 'ojs/ojprogressbar'
], function ($, ko) {
    /**
     * The view model for the main content view template
     */
    function dashboardContentViewModel() {
        var self = this;
        
        console.log('dashboard page');
        var router = oj.Router.rootInstance;  
        self.runningCPUCount = ko.observable(1);
        self.totalCPUCount = ko.observable(5);
        self.currentUsedMemory = ko.observable(30);
        self.servicesArray = ko.observableArray([]);
        self.guidedPathsArray = ko.observableArray([]);
        
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
        
        self.handleAttached = function() {
            self.getServiceDetails();
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
