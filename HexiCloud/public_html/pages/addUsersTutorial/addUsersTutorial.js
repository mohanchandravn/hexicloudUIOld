define(['ojs/ojcore',
    'jquery',
    'knockout', 
    'config/serviceConfig',
    'components/trainnavigation/loader'], function (oj, $, ko, service) {

    function addUsersTutorialViewModel(params) {
        var self = this;

        self.handleAttached = function () {
            slideInAnimate(500, 0);
        };

        self.videoSrc = ko.observable();
        if (loggedInUserRole() === 'accountAdmin') {
            self.videoSrc("assets/AddIDAFromMyAccount.mp4");
        } else {
            self.videoSrc("assets/AddUserToMyServices.mp4");
        }
        self.getShortVideo = function () {
            if (loggedInUserRole() === 'accountAdmin') {
                self.videoSrc("assets/AddIDAFromMyAccount.mp4");
            } else {
                self.videoSrc("assets/AddUserToMyServices.mp4");
            }
            $("#createUsersVid")[0].load();
        };
        self.getLongVideo = function () {

            if (loggedInUserRole() === 'accountAdmin') {
                self.videoSrc("assets/AddIDAFromMyAccount2.mp4");
            } else {
                self.videoSrc("assets/loginAndaddusers.mp4");
            }
            $("#createUsersVid")[0].load();
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
//            setTimeout(function () {
            service.updateCurrentStep({
                "userId": loggedInUser(),
                "userRole": loggedInUserRole(),
                "curStepCode": 'servicesMini',
                "preStepCode": getStateId(),
//                    "preStepCode": 'createUsers',
                "userAction": "Go to Provisioned Services"
            });
//            }, 500);
//            slideOutAnimate(1500, 0);

            

        };
        self.currentStepValue = ko.observable('stp2');
            self.stepsArray =
                    ko.observableArray(
                            [{label: 'Choose Role', id: 'stp1'},
                                {label: 'Add Additional Users', id: 'stp2'},
                                {label: 'Provisioned Services', id: 'stp3'}]);
            self.actionDisabledCss = "disable-train-selection";
    }
    return addUsersTutorialViewModel;
});


