/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojselectcombobox'], 
    function(oj, ko, $) {
    
    function csmadminViewModel() {
        var self = this;
        
        self.allStepsList = ko.observableArray([]);
        self.selectedStepCode = ko.observable();
        self.allStepsList.push({value: 'createdUsers', label: 'Created Users'});
        self.selectedStepCodeMetaDataList = ko.observableArray([]);
        
        //step codes to detect user in which step he's in
        self.stepsArray = ko.observableArray([{
            "yourRole": 10,
            "idAdmin": 11,
            "buyer": 12,
            "createdUsers": 20,
            "vmProvisionedAllOk": 40
        }]);
    
        self.updateStepCode = function (event, data) {
            if (data.value[0] !== undefined) {
                console.log(data.value[0]);
                self.displayMetaData(data.value[0]);
                console.log('not undefined');
            } else {
                console.log('undefined');
            }
        };
        
        function populateUI(metadata, stepId, stepCode) {
            var array = [];
            metadata = metadata.stepData;
            console.log(metadata);
            self.selectedStepCodeMetaDataList(metadata);
        };
        
        self.displayMetaData = function(stepCode) {
            var stepId = self.stepsArray()[0].stepCode;
            console.log(stepId);
            console.log(stepCode);
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: "pages/csmadmin/csmadminMock.json",
                success: function (result) {
                    if (result !== null || result !== undefined) {
                        populateUI(result, stepId, stepCode);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error retrieving service details..");
                }
            });
        };
    };
    
    return csmadminViewModel;
});
