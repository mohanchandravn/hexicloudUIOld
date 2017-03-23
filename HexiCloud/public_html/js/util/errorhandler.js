/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['ojs/ojcore', 'knockout', 'ojs/ojrouter'],
  function (oj, ko) {

    function errorHandler() {

        var self = this;

        var router = oj.Router.rootInstance;

        self.errors = [
            { id: "ERROR_GENERIC", errorMsg: "Oops! An error occurred. Please try again." },
            { id: "ERROR_NETWORK_NOT_CONNECTED", errorMsg: "Not Connected to Network." },
            { id: "ERROR_SERVER_NOT_CONNECTED", errorMsg: "Not Connected to Server." }
        ];

        self.errorMessage = ko.observable();

        function init() {
            self.clearError();
        }

        self.setError = function(errorType) {
            self.errorMessage(self.lookupErrorMessage(errorType));
        };

        self.clearError = function() {
            self.errorMessage(null);
        };

        self.getError = function() {
            return self.errorMessage();
        };

        self.hasError = function() {
            return self.errorMessage() !== null && self.errorMessage() !== "";
        };

        self.lookupErrorMessage = function(errorType) {            
            var result;
            try {
                result = self.errors.filter(function (error) {
                            return error.id === errorType;
                         })[0].errorMsg;
                         
            } catch (filterException) {
                console.log("errorhandler.js", "lookupErrorMessage: Error id not found in array of possible error codes.", errorType);
                result = errorType;
            }                       
            return result;                        
        };

        self.showAppError = function(errorType, xhr) {
            self.setError(errorType);

            // Redirect to error page
            router.errorData = xhr;
            router.go('error');
        };

        init();
    }

    return new errorHandler();
});
