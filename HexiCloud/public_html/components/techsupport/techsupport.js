define(['ojs/ojcore',
    'jquery',
    'knockout'], function (oj, $, ko) {

    function techSupportViewModel(context) {
        var self = this;
        self.selectedTemplate = ko.observable('phone_content');
        context.props.then(function (properties) {
            if(properties.references)
            {
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

        self.closeTechSupportLayout = function ()
        {
            $('#tech_support').hide();
        };
        
        self.handleAttached = function () {
//            slideInAnimate(500, 0);
            $('#tech_support').hide();
        };

    }

    return techSupportViewModel;

});
