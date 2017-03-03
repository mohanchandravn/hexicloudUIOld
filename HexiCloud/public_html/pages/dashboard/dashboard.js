/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * dashboard module
 */
define(['jquery', 'knockout', 'ojs/ojcore', 'config/serviceConfig', 'config/sessionInfo', 'ojs/ojprogressbar'
], function ($, ko, oj, service, sessionInfo) {
    /**
     * The view model for the main content view template
     */
    var navigationDrawerLeft;//, navigationDrawerRight;

    navigationDrawerLeft = {
        "selector": "#navigationDrawerLeft",
        "edge": "start",
        "displayMode": "push",
        "autoDismiss": "focusLoss",
        "modality": "modeless"//,
//        "query": oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.XL_UP)
    };
//    navigationDrawerRight = {
//        "selector": "#navigationDrawerRight",
//        "edge": "end",
//        "displayMode": "push",
//        "modality": "modeless"//,
////        "query": oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP)
//    };
    
    function dashboardContentViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        console.log('dashboard page');
        
        self.handleAttached = function() {
            
        };
    }
    
    return dashboardContentViewModel;
});
