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
                $('.blur-node1, .blur-node2').addClass('animate');
                setTimeout(function(){
                    router.go('/addAnother');
			slideOutAnimate();
                        //$.fn.fullpage.moveSlideLeft();
		}, 600);
                
                
            };
            self.identityDomainAdminSelect = function (){
                loggedInUserRole('itAdmin');
                $('.blur-node1, .blur-node2').addClass('animate');
                setTimeout(function(){
                    router.go('/addAnother');
			slideOutAnimate();
                        //$.fn.fullpage.moveSlideLeft();
		}, 600);
            };
        }
        
        return ChooseRoleViewModel;
    
});

