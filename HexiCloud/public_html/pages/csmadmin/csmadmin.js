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
        self.allStepsList.push({value: 'vmProvisionedAllOk', label: 'VM Provisioned All Ok'});
        
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
                self.displayMetaData(data.value[0]);
            }
        };
        
        function populateUI(metadata, stepId, stepCode) {
            var selectedStepMetaData = [];
            metadata = metadata.stepData;
            for (var key in metadata) {
                if (metadata[key].stepId === stepId) {
                    selectedStepMetaData.push(metadata[key]);
                }
            }
            
            self.selectedStepCodeMetaDataList(selectedStepMetaData);
        };
        
        self.displayMetaData = function(stepCode) {
            var stepId = self.stepsArray()[0][stepCode];
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
        
        self.deleteMetadata= function(data, event) {
            console.log("we can delete the metadata by this id: " + data.id);
            console.log("metadata details are: " + ko.toJS(data));
        };
    };
    
    return csmadminViewModel;
});
