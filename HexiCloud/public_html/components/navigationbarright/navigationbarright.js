/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * navigationbarright module
 */
define(['text!./navigationbarright.html', 'ojs/ojcore', 'knockout'
], function (template, oj, ko) {
    /**
     * The view model for the main content view template
     */
    function navigationbarrightContentViewModel() {
        var self = this;        
       //$('body').on('click','chat',function(){alert('it works');
       
       $(document).ready(function(){
        $('#chat').click(function(){
            
        RightNow.Client.Controller.addComponent(
        {
            chat_login_page: "/app/chat/chat_landing/Contact.Name.First/Sasi/Contact.Name.Last/Rao/Contact.Email.0.Address/abc@test.com",
            container_element_id: "myChatLinkContainer",
            info_element_id: "myChatLinkInfo",
            link_element_id: "myChatLink",
            instance_id: "sccl_0",
            module: "ConditionalChatLink",
            type: 7
        },
        "//sc-ramesh.widget.rightnowdemo.com/ci/ws/get"
    ); })

    });
    }
    return {viewModel: {createViewModel: navigationbarrightContentViewModel }, template: template};
});
