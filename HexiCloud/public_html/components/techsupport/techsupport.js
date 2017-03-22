
define(['ojs/ojcore', 'jquery', 'knockout', 'config/serviceConfig', 'ojs/ojinputtext', 'ojs/ojknockout-validation'], 

function (oj, $, ko, service) {

    function techSupportViewModel(context) {
        
        var self = this;
        
        self.selectedTemplate = ko.observable('phone_content');
        self.emailSubject = ko.observable();
        self.emailMessage = ko.observable();
        self.detailsOfSR = ko.observable();
        self.statusOfSR = ko.observable(false);
        self.tracker = ko.observable();       

        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;
            return true;
        };

        context.props.then(function (properties) {
            if (properties.references) {
                self.selectedTemplate = properties.references.selectedValueRef;
            }
        });

        self.viewCallContent = function () {
            self.selectedTemplate('phone_content');
        };

        self.viewChatContent = function () {
            self.selectedTemplate('chat_content');
        };

        self.viewMailContent = function () {
            self.selectedTemplate('email_content');
        };

        self.closeTechSupportLayout = function () {
            self.emailSubject("");
            self.emailMessage("");
            self.detailsOfSR("");
            self.statusOfSR(false);
            $('#tech_support').hide();
        };

        self.handleAttached = function () {
            // slideInAnimate(500, 0);
            $('#tech_support').hide();
            $('#chat').addClass('tab-selected');
        };

        var successCallBackFn = function (data, status) {
            console.log(data);
            console.log(status);
            self.detailsOfSR(data);
            self.statusOfSR(true);
        };

        var failCallBackFn = function (xhr) {
            console.log(xhr);
        };
        
        self.sendEmail = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
            service.submitSR({
                "userId": loggedInUser(),
                "message": self.emailMessage(),
                "subject": self.emailSubject(),
                "sentTo": "To me 1",
                "sentCC": "CC me 1",
                "sentBCC": "BCC me 1"
            }).then(successCallBackFn, failCallBackFn);
        };

        self.resetAndCloseEmail = function () {
            self.emailSubject("");
            self.emailMessage("");
            self.detailsOfSR("");
            self.statusOfSR(false);
            $('#tech_support').hide();
        };
    }

    return techSupportViewModel;
});
