define(['ojs/ojcore',
    'jquery',
    'knockout', 'config/serviceConfig'], function (oj, $, ko, service) {

    function addUsersTutorialViewModel(params) {
        var self = this;

        self.handleAttached = function () {
            slideInAnimate(500, 0);
        };
        var screenRange = viewportSize();
        if (screenRange)
        {
            if (screenRange !== 'SM' && screenRange !== 'MD') {
                self.followStepsContaineCss = 'follow-steps-container';
            } else
            {
                self.followStepsContaineCss = "";
            }
        }

        self.goToServices = function () {
            setTimeout(function () {
                service.updateCurrentStep({
                    "userId": loggedInUser(),
                    "userRole": loggedInUserRole(),
                    "curStepCode": 'servicesMini',
                    "preStepCode": getStateId(),
//                    "preStepCode": 'createUsers',
                    "userAction": "Go to Provisioned Services"
                });
            }, 500);
            slideOutAnimate(1500, 0);

        };
    }
    return addUsersTutorialViewModel;
});


