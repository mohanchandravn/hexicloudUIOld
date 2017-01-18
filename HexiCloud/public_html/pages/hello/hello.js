/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojinputtext'
], function (oj, ko, $) {
    /**
     * The view model for the main content view template
     */
    function helloViewModel() {
        var self = this;
        
        console.log('hello page');
        self.skipProcess = function() {
            isLoggedInUser(true);
            router.go('dashboard/');
        };
        self.startProcess = function() {
            console.log('Navigating to role Identified page');
            isLoggedInUser(true);
            router.go('roleIdentified/');
        };
    }
    
    return helloViewModel;
});