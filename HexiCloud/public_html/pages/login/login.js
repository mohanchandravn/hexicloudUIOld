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
    function loginContentViewModel() {
        var self = this;
        
        console.log('login page');
        self.login = function() {
            console.log('login clicked');
            isLoggedInUser(true);
            router.go('hello/');
        };
    }
    
    return loginContentViewModel;
});
