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
                     self.headerTitle('Please confirm if you would like to add another Account Admin?');
                    self.addButtonLabel('Add admin now »');
                }
                else if(loggedInUserRole() === 'itAdmin')
                {
                    self.headerTitle('Please confirm if you would like to add users now?');
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

