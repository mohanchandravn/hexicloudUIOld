/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojinputtext'
], function (oj, ko, $) {
    /**
     * The view model for the main content view template
     */
    function loginContentViewModel() {
        var self = this;

        self.userName = ko.observable();
        self.password = ko.observable();
        self.iDomain = ko.observable();


        console.log('login page');
        self.login = function () {
            console.log('login clicked');
            loggedInUser(self.userName());
            containerName("/Compute-" + self.iDomain() + "/");
            isLoggedInUser(true);
//            router.go('hello/');
            console.log(containerName());
             console.log(loggedInUser());
              console.log(self.password());
              self.dataToSend = {"user" : containerName() + loggedInUser(), "password" : self.password()};
              console.log( JSON.stringify(self.dataToSend));
              console.log(restEndPoint() + 'authenticate/');
               $.ajax({
                type: "POST",
                contentType: "application/oracle-compute-v3+json",
                data: JSON.stringify(self.dataToSend),
                crossDomain: true,
                dataType: "application/oracle-compute-v3+json",  
                url: restEndPoint() + 'authenticate/',
                success: function (result) {
                    console.log("Success = " + result);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log('Error retrieving details..');
                    console.log(xhr);
                    console.log(ajaxOptions);
                    console.log(thrownError);
                }
            });
        };
    }

    return loginContentViewModel;
});
