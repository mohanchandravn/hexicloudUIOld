define(['ojs/ojcore',
        'jquery',
        'knockout'], function (oj, $, ko){
        
        function createUsersViewModel (params){
            var self = this;
            self.greetingText = ko.observable("Thanks, " + userFirstLastName());
            self.roleConfirmationText=ko.observable("");
            self.headerTitle = ko.observable("");
            self.addButtonLabel = ko.observable("");
            self.skipHelpText = ko.observable("To skip this step, select ‘skip’ and begin checking your provisioned cloud services now.");
            self.skipButtonLabel = "Skip this step »";
            var router = params.ojRouter.parentRouter;
            
            if(loggedInUserRole())
            {
                if(loggedInUserRole() === 'accountAdmin')
                {
                    self.roleConfirmationText('You’ve told us you’re a buyer.');
                    self.headerTitle('To add another account admiin, select ‘add admin now’ for a step-by-step guide.');
                    self.addButtonLabel('Add admin now »');
                }
                else if(loggedInUserRole() === 'itAdmin')
                {
                     self.roleConfirmationText('You’ve told us you’re a ID admin.')
                    self.headerTitle('To add more users, select ‘add users now’ for a step-by-step guide.');
                    self.addButtonLabel('Add users now »');
                }
            }
            
            self.onClickAddUser = function () {
                setTimeout(function(){
                    router.go('addUsersTut/');
                }, 500);
                slideOutAnimate(1500, 0);
            };

            self.handleAttached = function() {
                slideInAnimate(500, 0);
            };
        }
        
        return createUsersViewModel;
    
});

