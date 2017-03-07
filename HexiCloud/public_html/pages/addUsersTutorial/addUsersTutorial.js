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

        self.videoSrc = ko.observable("assets/newVids/addidamyaccount.mp4");

        self.getShortVideo = function () {
            self.videoSrc = ko.observable("assets/newVids/addidamyaccount.mp4");
            $("#createUsersVid")[0].load();
        };
        self.getLongVideo = function () {

            self.videoSrc("assets/newVids/addusers.mp4");
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
                            {label: 'Add Users', id: 'stp2'},
                            {label: 'Services', id: 'stp3'}]);
        self.actionDisabledCss = "disable-train-selection";
    }
    return addUsersTutorialViewModel;
});


