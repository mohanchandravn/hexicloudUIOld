define(['ojs/ojcore',
        'jquery',
        'knockout'], function (oj,$,ko){
        
        function addUsersTutorialViewModel(params) {
            var self = this;

            self.handleAttached = function() {
                slideInAnimate(500, 0);
            };
            var screenRange = viewportSize();
            if(screenRange)
            {
                if(screenRange !== 'SM' &&  screenRange !== 'MD'){
                    self.followStepsContaineCss = 'follow-steps-container';
                }
                else
                {
                    self.followStepsContaineCss = "";
                }
            }
            
        }
        
        
        return addUsersTutorialViewModel;
    
});


