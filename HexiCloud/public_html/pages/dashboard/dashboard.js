/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * dashboard module
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojlistview'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function dashboardContentViewModel() {
        var self = this;
        
        console.log('dashboard page');
        self.routeTo = function(data, event) {
            var id = event.currentTarget.id.toLowerCase();
            router.go(id);
        };
    }
    
    return dashboardContentViewModel;
});
