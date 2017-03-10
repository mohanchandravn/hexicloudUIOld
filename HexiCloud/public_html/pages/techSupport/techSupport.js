define(['ojs/ojcore',
        'jquery',
        'knockout'],function (oj,$,ko) {
        
        function TechSupportViewModel() {
            var self = this;
            self.selectedTemplate = ko.observable('phone_content');
            self.displayMail = function (){
                self.selectedTemplate('email_content');
            };
            
            self.displayPhone = function (){
                self.selectedTemplate('phone_content');
            };
            
            self.displayChat = function (){
                self.selectedTemplate('chat_content');
            };
            
            var screenRange = viewportSize();
            if(screenRange)
            {
                if(screenRange)
            {
                if(screenRange === 'LG' &&  screenRange === 'XL'){
                    self.phoneContainerBtLayoutCss = 'oj-sm-justify-content-center';
                }
                else
                {
                    self.phoneContainerBtLayoutCss = "";
                }
            }
            }
        }
        
        return TechSupportViewModel;
    
});
