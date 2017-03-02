/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * home module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojpagingcontrol' 
], function () {
    /**
     * The view model for the main content view template
     */
    function homeContentViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;
        
        console.log('home page');
        self.filmStripItems = [
            { title: 'Prepare' },
            { title: 'Learn' },
            { title: 'Plan' },
            { title: 'Build' },
            { title: 'Succeed' }
        ];
        self.pagingModel = null;
        
        getItemInitialDisplay = function(index) {
            return index < 1 ? '' : 'none';
        };
        
        getPagingModel = function() {
            if (!self.pagingModel) {
              var filmStrip = $("#filmStrip");
              var pagingModel = filmStrip.ojFilmStrip("getPagingModel");
              self.pagingModel = pagingModel;
            }
            return self.pagingModel;
        }
        
        self.isLoggedinTrue = function() {
//            slideOutAnimate();
            router.go('login/');
        };
    }
    
    return homeContentViewModel;
});
