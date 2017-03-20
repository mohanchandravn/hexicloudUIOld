define(['ojs/ojcore',
        'jquery',
        'knockout',
        'config/serviceConfig',
        'ojs/ojinputtext',
        'ojs/ojknockout'], function (oj,$,ko, serviceConfig){
    
    function ForgotPasswordViewModel(params){
        var self = this;
        self.userName = ko.observable("");
        self.tracker = ko.observable();
        self.templateId = ko.observable('forgotPwdForm');
        if(params)
        {
        self.parentVM = params.parent;
       }
        
        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };
        
        self.userNameOptionChange = function (event, data)
        {
            $('#invaliduserid').hide();
        };
        
        self.onClickGetForgotPwdSubmit = function ()
        {
             $('#invaliduserid').hide();
            var trackerObj = ko.utils.unwrapObservable(self.tracker);

            // Step 1
            if (!this._showComponentValidationErrors(trackerObj))
            {
                return;
            }
            serviceConfig.forgotPasswordService(self.userName()).then(handleForgotPwdServiceSuccess, handleForgotPwdServiceFailure);
            
        };
        
        var handleForgotPwdServiceSuccess = function (data, status)
        {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if(status === 'success')
            {
                self.templateId('forgotPwduccess');
            }
            else if(status === 'nocontent')
            {
               $('#invaliduserid').show();
                 
            }
        };
        
        var handleForgotPwdServiceFailure = function (xhr)
        {
            
            self.templateId('forgotPwdFailure');
        };
        
        
        self.onClickBackToLogin = function (){
            if( self.parentVM)
            {
                 self.parentVM.goToLogin();
            }
        };
    }
    
    return ForgotPasswordViewModel;
});

