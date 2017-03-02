define(['ojs/ojcore',
        'jquery',
        'knockout'], function (oj,$,ko){
        
        function addUsersTutorialViewModel(params) {
            var self = this;

            self.handleAttached = function() {
                slideInAnimate(600, 0);
            };
        }
        
        return addUsersTutorialViewModel;
    
});


