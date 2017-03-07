define(['ojs/ojcore',
    'jquery',
    'knockout', 
    'config/serviceConfig',
    'components/trainnavigation/loader'], function (oj, $, ko, service) {

    function createUsersViewModel(params) {
        var self = this;
        self.greetingText = ko.observable("Thanks, " + userFirstLastName());
        self.roleConfirmationText = ko.observable("");
        self.headerTitle = ko.observable("");
        self.addButtonLabel = ko.observable("");
        self.skipHelpText = ko.observable("To skip this step, select ‘skip’ and begin checking your provisioned cloud services now.");
        self.skipButtonLabel = "Skip this step »";
        var router = params.ojRouter.parentRouter;

        if (loggedInUserRole())
        {
            if (loggedInUserRole() === 'accountAdmin')
            {
                self.roleConfirmationText('You’ve told us you’re a buyer.');
                self.headerTitle('To add another account admin, select ‘Add admin now’ for a step-by-step guide.');
                self.addButtonLabel('Add admin now »');
            } else if (loggedInUserRole() === 'itAdmin')
            {
                self.roleConfirmationText('You’ve told us you’re a ID admin.')
                self.headerTitle('To add more users, select ‘Add users now’ for a step-by-step guide.');
                self.addButtonLabel('Add users now »');
            }
        }

        self.onClickAddUser = function () {
//            setTimeout(function () {
//                    router.go('createUsers/');
                service.updateCurrentStep({
                    "userId": loggedInUser(),
                    "userRole": loggedInUserRole(),
                    "curStepCode": 'createUsers',
                    "preStepCode": getStateId(),
                    "userAction": "Watch the screencast"
                });

//            }, 500);
//            slideOutAnimate(1500, 0);
        };

        self.gotoDashboard = function () {
            setTimeout(function () {
                service.updateCurrentStep({
                    "userId": loggedInUser(),
                    "userRole": loggedInUserRole(),
                    "curStepCode": 'servicesMini',
                    "preStepCode": getStateId(),
                    "userAction": "Go to Provisioned Services"
                });
            }, 500);
            slideOutAnimate(1500, 0);
        };

        self.handleAttached = function () {
            slideInAnimate(500, 0);
        };
        
        self.currentStepValue = ko.observable('stp2');
        self.stepsArray =
                ko.observableArray(
                        [{label: 'Choose Role', id: 'stp1'},
                            {label: 'Add Users', id: 'stp2'},
                            {label: 'Services', id: 'stp3'}]);
        self.actionDisabledCss = "disable-train-selection";
    }

    return createUsersViewModel;

});

