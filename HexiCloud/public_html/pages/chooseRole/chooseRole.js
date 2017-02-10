/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['config/serviceConfig', 'knockout', 'ojs/ojcore', 'jquery', 'ojs/ojradioset'
], function (service, ko) {
    /**
     * The view model for the main content view template
     */
    function chooseRoleViewModel(params) {
        var self = this;

        var router = params.ojRouter.parentRouter;

        console.log('choose role page');
        self.currentRole = ko.observable(loggedInUserRole());
        self.selectedRole = function () {
            isLoggedInUser(true);
//            userRole(self.currentRole());
            console.log('The selected role is: ' + userRole());
//            router.go('addAdditionalUsers/');
            service.updateCurrentStep({
                "userId": loggedInUser(),
                "userRole": self.currentRole(),
                "curStepCode": "addAdditionalUsers",
                "preStepCode": getStateId()
            });
        };
    }

    return chooseRoleViewModel;
});