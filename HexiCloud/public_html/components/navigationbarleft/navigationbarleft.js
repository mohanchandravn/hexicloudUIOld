/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * navigationbarleft module
 */
define(['text!./navigationbarleft.html', 'ojs/ojcore', 'knockout'
], function (template, oj, ko) {
    /**
     * The view model for the main content view template
     */
    function navigationbarleftContentViewModel() {
        var self = this;
    }
    
    return {viewModel: {createViewModel: navigationbarleftContentViewModel }, template: template};
});
