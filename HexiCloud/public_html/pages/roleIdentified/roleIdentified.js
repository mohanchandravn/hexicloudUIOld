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
    function rolerIdentifiedViewModel() {
        var self = this;
        
        console.log('hello page');
        self.acceptRole = function() {
            isLoggedInUser(true);
            router.go('addAdditionalUsers/');
        };
        self.rejectRole = function() {
            isLoggedInUser(true);
            router.go('chooseRole/');
        };
    }
    
    return rolerIdentifiedViewModel;
});