define(['ojs/ojcore',
        'jquery',
        'knockout'], function (oj, $, ko){
        
        function createUsersViewModel (params){
            var self = this;
            self.headerTitle = ko.observable("");
            self.addButtonLabel = ko.observable("");
            self.skipButtonLabel = "Skip this step »";
            var router = params.ojRouter.parentRouter;
            
            if(loggedInUserRole())
            {
                if(loggedInUserRole() === 'accountAdmin')
                {
                     self.headerTitle('Would you like to add another account admin?');
                    self.addButtonLabel('Add admin now »');
                }
                else if(loggedInUserRole() === 'itAdmin')
                {
                    self.headerTitle('Would you like to add users now?');
                    self.addButtonLabel('Add users now »');
                }
            }
            
            self.onClickAddUser = function ()
            {
                router.go('/addUsersTut');
            };
        }
        
        return createUsersViewModel;
    
});

