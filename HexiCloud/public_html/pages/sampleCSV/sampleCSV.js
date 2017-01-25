/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojbutton'], 
    function(oj, ko, $) {
    
    function sampleCSVViewModel() {
        var self = this;
        
        self.resultData = ko.observable('Sample Text before calling the JSON..');
        
        self.getJSONData = function() {
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: 'https://api.github.com/users/mralexgray/repos',
                success: function (result) {
                    self.resultData(ko.toJSON(result));
                    JSONToCSVConvertor(result, 'Sample File', true);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log('Error retrieving details..');
                    console.log(xhr);
                    console.log(ajaxOptions);
                    console.log(thrownError);
                }
            });
        };
        
        function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
            var CSVData = '';
            
            // This condition will generate the Header columns
            if (ShowLabel) {
                var row = "";
                for (var index in JSONData[0]) {
                    row += index + ',';
                }
                // removes comma for last index
                row = row.slice(0, -1);
                CSVData += row + '\r\n';
            }

            // 1st loop is to extract each row
            for (var i = 0; i < JSONData.length; i++) {
                var row = "";

                // 2nd loop will extract each column and convert it in string comma-seprated
                for (var index in JSONData[i]) {
                    row += '"' + JSONData[i][index] + '",';
                }
                row.slice(0, row.length - 1);

                // add a line break after each row
                CSVData += row + '\r\n';
            }

            if (CSVData === "") {
                alert("Invalid json data");
                return;
            } else {
                // Generate a file name
                var fileName;
                // this will remove the blank-spaces from the title and replace it with an underscore
                fileName = ReportTitle.replace(/ /g,"_");   
            }

            // Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSVData);

            // we have to generate a temp <a /> tag and remove it
            var link = document.createElement("a");    
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    
    return sampleCSVViewModel;
});
