/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['knockout', 'config/serviceConfig', 'ojs/ojcore', 'jquery', 'ojs/ojinputtext',  'ojs/ojknockout-validation'
], function (ko, service) {
    /**
     * The view model for the main content view template
     */
    function loginContentViewModel(params) {
        var self = this;
        var router = params.ojRouter.parentRouter;

        self.userName = ko.observable();
        self.password = ko.observable();
        self.iDomain = ko.observable();
        self.restEndPoint = ko.observable();
        self.tracker = ko.observable();
        self._showComponentValidationErrors = function (trackerObj)
        {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };


        console.log('login page');
        self.login = function () {
            console.log('login clicked');

            var trackerObj = ko.utils.unwrapObservable(self.tracker);

            // Step 1
            if (!this._showComponentValidationErrors(trackerObj))
            {
                return;
            }

            // Step 2
//            if (!this._runAppLevelValidation(trackerObj))
//            {
//                return;
//            }

            loggedInUser(self.userName());

            containerName(self.iDomain());
            isLoggedInUser(true);
//            router.go('hello/');
            console.log(containerName());
            console.log(loggedInUser());
            console.log(self.password());
            console.log(self.restEndPoint());
            //self.dataToSend = {"user" : containerName() + loggedInUser(), "password" : self.password()};
            self.dataToSend = "?container=" + containerName() + "&password=" + self.password() + "&userName=" + self.userName() + "&restEndPoint=" + self.restEndPoint();
            console.log(self.dataToSend);
            var url = wrapperRestEndPoint() + self.dataToSend;
            console.log(wrapperRestEndPoint() + self.dataToSend);
            if (self.userName() != null && self.password() != null && containerName() != null && self.restEndPoint() != null) {
                isDomainDetailsGiven(true);
                $.ajax({
                    type: "POST",
                    url: url,
                    contentType: "text/plain",
                    dataType: "text",
                    data: {userName: self.userName(), password: self.password(), container: containerName(), restEndPoint: self.restEndPoint()},
                    crossDomain: true,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Access-Control-Allow-Origin", "https://140.86.1.93/");
                        xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, options,X-Requested-With, Content-Type, Accept");
                    },
                    success: function (data) {

                        //dashBoardServices(result);
                        data = $.parseJSON(data);

                        dashboardServices(data.result);// = sArray.slice();                     
                        // console.log(dashboardServices());
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log('Error retrieving details..');
                        console.log(xhr);
                        console.log(ajaxOptions);
                        console.log(thrownError);
                    }
                });
            }

            isLoggedInUser(true);
            //Not required to update the step in the login page.
//            service.updateCurrentStep({
//                "userId": loggedInUser(),
//                "userRole": "itAdmin",
//                "curStepCode": 'hello',
//                "preStepCode": getStateId()
//            });
            router.go('hello/');

        };
    }

    return loginContentViewModel;
});
