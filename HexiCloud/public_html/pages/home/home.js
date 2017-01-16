/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * home module
 */
define(['ojs/ojcore', 'knockout', 'jquery'
], function (oj, ko, $) {
    /**
     * The view model for the main content view template
     */
    function homeContentViewModel(params) {
        var self = this;
        
        console.log('home page');
        
        self.isLoggedinTrue = function() {
            router.go('login/');
        };
        
        self.startProcess = function() {
            console.log('start process');
            router.go('learning/');
        };
        
        self.skipProcess = function() {
            console.log('skip process');
            router.go('dashboard/');
        };
    }
    
    return homeContentViewModel;
});
