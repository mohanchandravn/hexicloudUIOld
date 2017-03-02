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
            { title: 'Prepare', description: 'for what you need and get your team geared up' },
            { title: 'Learn', description: 'how it\'s done in our use cases and success stories' },
            { title: 'Plan', description: 'the services you need for your business' },
            { title: 'Build', description: 'with real-time support and help' },
            { title: 'Succeed', description: 'in your journey to the cloud' }
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
        };
        
        self.isLoggedinTrue = function() {
            setTimeout(function(){
                router.go('login/');
            }, 600);
            slideOutAnimate(1000, 0);
        };

        self.handleAttached = function() {
            slideInAnimate(600, 0);
        };
    }
    
    return homeContentViewModel;
});
