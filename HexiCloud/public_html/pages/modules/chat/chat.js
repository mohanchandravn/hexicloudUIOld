define(['ojs/ojcore',
        'jquery',
        'knockout'],function (oj,$,ko){
    
    function chatViewModel (params) {
        var self = this;
        self.chatUrl = ko.observable('');
        self.chatUrl("https://hexicloud.rightnowdemo.com/app/chat/chat_landing/Contact.Name.First/Sasi/Contact.Name.Last/Rao/Contact.Email.0.Address/abc@test.com/");
        
    }
    
    return chatViewModel;
    
});


