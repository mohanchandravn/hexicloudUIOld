define(['ojs/ojcore',
        'jquery',
        'knockout'], function (oj, $, ko) {
        
        function ChooseRoleViewModel(params)
        {
            var self = this;
            self.headerTitle = "Please confirm your role:";
            self.buyerTitle = "Buyer »";
            self.identityDomainAdminTitle = "Identity Domain Admin »";
            self.welcomeUserMessage = ko.observable("Welcome, Firstname");
            if(loggedInUser())
            {
                self.welcomeUserMessage(self.welcomeUserMessage()+loggedInUser());
            }
            var router = params.ojRouter.parentRouter;
            self.buyerSelect = function ()
            {
                loggedInUserRole('accountAdmin');
                setTimeout(function(){
                    router.go('/addAnother');
			slideOutAnimate();
                        //$.fn.fullpage.moveSlideLeft();
		}, 600);
                $('.blur-node1, .blur-node2').addClass('animate');
                
                
            };
            self.identityDomainAdminSelect = function (){
                loggedInUserRole('itAdmin');
                setTimeout(function(){
                    router.go('/addAnother');
			slideOutAnimate(1000, 0);
                        //$.fn.fullpage.moveSlideLeft();
		}, 600);
                $('.blur-node1, .blur-node2').addClass('animate');
            };

            self.handleAttached = function() {
                slideInAnimate(600, 0);
            };
        }
        
        return ChooseRoleViewModel;
    
});

