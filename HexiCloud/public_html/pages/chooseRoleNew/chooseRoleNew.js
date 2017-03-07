define(['ojs/ojcore',
    'jquery',
    'knockout', 'config/serviceConfig'], function (oj, $, ko, service) {

    function ChooseRoleViewModel(params)
    {
        var self = this;
        self.headerTitle = "Please confirm your role:";
        self.buyerTitle = "Buyer »";
        self.identityDomainAdminTitle = "Identity Domain Admin »";
        self.welcomeUserMessage = ko.observable("Welcome ");
        if (loggedInUser())
        {
            self.welcomeUserMessage(self.welcomeUserMessage() + userFirstLastName());
        }
        var router = params.ojRouter.parentRouter;
        self.buyerSelect = function ()
        {
            loggedInUserRole('accountAdmin');
//            setTimeout(function () {
                service.updateCurrentStep({
                    "userId": loggedInUser(),
                    "userRole": loggedInUserRole(),
                    "curStepCode": "addAdditionalUsers",
                    "preStepCode": getStateId(),
                    "userAction": "Selected Role as : " + loggedInUserRole()
                });

                //$.fn.fullpage.moveSlideLeft();
//            }, 500);
//            slideOutAnimate(1500, 0);
            $('.blur-node1, .blur-node2').addClass('animate');


        };
        self.identityDomainAdminSelect = function () {
            loggedInUserRole('itAdmin');
//            setTimeout(function () {
                service.updateCurrentStep({
                    "userId": loggedInUser(),
                    "userRole": loggedInUserRole(),
                    "curStepCode": "addAdditionalUsers",
                    "preStepCode": getStateId(),
                    "userAction": "Selected Role as : " + loggedInUserRole()
                });

                //$.fn.fullpage.moveSlideLeft();
//            }, 500);
//            slideOutAnimate(1500, 0);
            $('.blur-node1, .blur-node2').addClass('animate');
        };

        self.handleAttached = function () {
//            slideInAnimate(500, 0);
        };
    }

    return ChooseRoleViewModel;

});

