/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * learning module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojbutton'],
function(oj, ko, $)
{
    
    function learningFlowContentViewModel() {
     var self = this;

     this.currentStepValue = ko.observable('stp1');
		this.stepArray = 
		  ko.observableArray(
			  [{label:'', id:'stp1'},
				 {label:'', id:'stp2'},
				 {label:'', id:'stp3'},
				 {label:'', id:'stp4'}, 
				 {label:'', id:'stp5'},
                                 {label:'', id:'stp6'},
				 {label:'', id:'stp7'},
				 {label:'', id:'stp8'}, 
				 {label:'', id:'stp9'},
                                 {label:'', id:'stp10'}
        
 
         
         ]);
	
        this.currentStepVal = function() {
                  //if($("#train").ojTrain("getStep", this.currentStepValue()).id )== 'stp2')
             console.log(this.currentStepValue());  
             if(this.currentStepValue() == 'stp1')
             {
                 $("#step1").show();
                 $("#step2").hide();
                 $("#step3").hide();
                 $("#step4").hide();
                 $("#step5").hide();
                 $("#step6").hide();
                 $("#step7").hide();
                 $("#step8").hide();
                 $("#step9").hide();
                 $("#step10").hide();
             }
            else if(this.currentStepValue() == 'stp2')
            {  
                 $("#step1").hide();
                 $("#step2").show();
                 $("#step3").hide();
                 $("#step4").hide();
                 $("#step5").hide();
                 $("#step6").hide();
                 $("#step7").hide();
                 $("#step8").hide();
                 $("#step9").hide();
                 $("#step10").hide();
            }
            else if(this.currentStepValue() == 'stp3')
            {  
                 $("#step1").hide();
                 $("#step2").hide();
                 $("#step3").show();
                 $("#step4").hide();
                 $("#step5").hide();
                 $("#step6").hide();
                 $("#step7").hide();
                 $("#step8").hide();
                 $("#step9").hide();
                 $("#step10").hide();
            }
            else if(this.currentStepValue() == 'stp4')
            {  
                 $("#step1").hide();
                 $("#step2").hide();
                 $("#step3").hide();
                 $("#step4").show();
                 $("#step5").hide();
                 $("#step6").hide();
                 $("#step7").hide();
                 $("#step8").hide();
                 $("#step9").hide();
                 $("#step10").hide();
            }
            else if(this.currentStepValue() == 'stp5')
            {  
                 $("#step1").hide();
                 $("#step2").hide();
                 $("#step3").hide();
                 $("#step4").hide();
                 $("#step5").show();
                 $("#step6").hide();
                 $("#step7").hide();
                 $("#step8").hide();
                 $("#step9").hide();
                 $("#step10").hide();
            }
            else if(this.currentStepValue() == 'stp6')
            {  
                 $("#step1").hide();
                 $("#step2").hide();
                 $("#step3").hide();
                 $("#step4").hide();
                 $("#step5").hide();
                 $("#step6").show();
                 $("#step7").hide();
                 $("#step8").hide();
                 $("#step9").hide();
                 $("#step10").hide();
            }
            else if(this.currentStepValue() == 'stp7')
            {  
                 $("#step1").hide();
                 $("#step2").hide();
                 $("#step3").hide();
                 $("#step4").hide();
                 $("#step5").hide();
                 $("#step6").hide();
                 $("#step7").show();
                 $("#step8").hide();
                 $("#step9").hide();
                 $("#step10").hide();
            }
            else if(this.currentStepValue() == 'stp8')
            {  
                 $("#step1").hide();
                 $("#step2").hide();
                 $("#step3").hide();
                 $("#step4").hide();
                 $("#step5").hide();
                 $("#step6").hide();
                 $("#step7").hide();
                 $("#step8").show();
                 $("#step9").hide();
                 $("#step10").hide();
            }
            else if(this.currentStepValue() == 'stp9')
            {  
                 $("#step1").hide();
                 $("#step2").hide();
                 $("#step3").hide();
                 $("#step4").hide();
                 $("#step5").hide();
                 $("#step6").hide();
                 $("#step7").hide();
                 $("#step8").hide();
                 $("#step9").show();
                 $("#step10").hide();
            }
            else
            {
                 $("#step1").hide();
                 $("#step2").hide();
                 $("#step3").hide();
                 $("#step4").hide();
                 $("#step5").hide();
                 $("#step6").hide();
                 $("#step7").hide();
                 $("#step8").hide();
                 $("#step9").hide();
                 $("#step10").show();
            }
            
		//return ($("#train").ojTrain("getStep", this.currentStepValue())).label;
        };
        
                self.routeTo = function (data, event) {
                    var id = event.currentTarget.id.toLowerCase();
                    router.go(id);
                };

                self.logout = function (data, event) {
                    router.go('home/');
                };
    }
         return learningFlowContentViewModel;
   
});
