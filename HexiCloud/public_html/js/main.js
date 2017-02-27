/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
requirejs.config({
    baseUrl: '.',
    // Path mappings for the logical module names
    paths:
            //injector:mainReleasePaths
                    {
                        'knockout': 'js/libs/knockout/knockout-3.4.0',
                        'jquery': 'js/libs/jquery/jquery-3.1.0.min',
                        'jqueryui-amd': 'js/libs/jquery/jqueryui-amd-1.12.0.min',
                        'ojs': 'js/libs/oj/v2.2.0/debug',
                        'ojL10n': 'js/libs/oj/v2.2.0/ojL10n',
                        'ojtranslations': 'js/libs/oj/v2.2.0/resources',
                        'signals': 'js/libs/js-signals/signals.min',
                        'text': 'js/libs/require/text',
                        'promise': 'js/libs/es6-promise/es6-promise.min',
                        'hammerjs': 'js/libs/hammer/hammer-2.0.8.min',
                        'ojdnd': 'js/libs/dnd-polyfill/dnd-polyfill-1.0.0.min'
//                        'utilities': 'utils/utilities'
                    }
            //endinjector
            ,
            // Shim configurations for modules that do not expose AMD
            shim: {
                'jquery': {
                    exports: ['jQuery', '$']
                }
            },
            // This section configures the i18n plugin. It is merging the Oracle JET built-in translation
            // resources with a custom translation file.
            // Any resource file added, must be placed under a directory named "nls". You can use a path mapping or you can define
            // a path that is relative to the location of this main.js file.
            config: {
                ojL10n: {
                    merge: {
                        //'ojtranslations/nls/ojtranslations': 'resources/nls/menu'
                    }
                }
            }
        });


/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */

require(['ojs/ojcore', 'knockout', 'jquery', 'config/sessionInfo', 'ojs/ojknockout',
    'ojs/ojtoolbar', 'ojs/ojbutton', 'ojs/ojrouter', 'ojs/ojmodule'],
        function (oj, ko, $, sessionInfo)
        {
            var self = this;
            
            //oj.Assert.forceDebug();
            //oj.Logger.option('level', oj.Logger.LEVEL_INFO);
            oj.ModuleBinding.defaults.modelPath = './';
            oj.ModuleBinding.defaults.viewPath = 'text!./';

            
            // Retrieve the router static instance and configure the states
            var router = oj.Router.rootInstance;
            // Set the router base URL to the href of this page. This is needed when
            // dealing with rewrited URL when the router uses the path URL adapter.
            oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

            // Register custom components for reusing the code
            ko.components.register('navigationbarleft', {require: 'components/navigationbarleft/navigationbarleft'});
            ko.components.register('navigationbarright', {require: 'components/navigationbarright/navigationbarright'});
            function getPath(path) {

                if (path === 'learningFlow')
                    return "pages/learning/" + path;
                else
                    return "pages/" + path + "/" + path;
            }
            ;

            router.configure(
                    {
                        'home': {label: 'Home', value: getPath('home'), isDefault: true},
                        'login': {label: 'Login', value: getPath('login')},
                        'hello': {label: 'Hello', value: getPath('hello')},
                        'roleIdentified': {label: 'Role Identified', value: getPath('roleIdentified')},
                        'chooseRole': {label: 'Choose Role', value: getPath('chooseRole')},
                        'createUsers': {label: 'Create Users', value: getPath('createUsers')},
                        'addAdditionalUsers': {label: 'Add Additional Users', value: getPath('addAdditionalUsers')},
                        'learning': {label: 'Learning', value: getPath('learning')},
                        'dashboard': {label: 'Dashboard', value: getPath('dashboard')},
                        'service': {label: 'Service', value: getPath('service')},
                        'settings': {label: 'Settings', value: getPath('settings')},
                        'learningFlow': {label: 'learningFlow', value: getPath('learningFlow')},
                        'raiseSR': {label: 'Raise an SR', value: getPath('raiseSR')},
                        'servicesMini': {label: 'Mini Services', value: getPath('servicesMini')},
                        'guidedPathsMini': {label: 'Mini Learning', value: getPath('guidedPathsMini')},
                        'csmadmin': {label: 'CSM Admin', value: getPath('csmadmin')},
                        'samplecsv': {label: 'Sample CSV', value: getPath('samplecsv')}
                    });

            function viewModel() {
                self.router = router;
                var moduleConfig = $.extend(true, {}, router.moduleConfig, {params: {
                        'rootData': {}}});
                self.moduleConfig = moduleConfig;
                
                self.isDomainDetailsGiven = ko.observable(false);
                
                //screenrange observable for responsive alignment
                self.screenRange = oj.ResponsiveKnockoutUtils.createScreenRangeObservable();
                self.isLoggedInUser = ko.observable(sessionInfo.getFromSession(sessionInfo.isLoggedInUser));
                self.wrapperRestEndPoint = ko.observable("https://140.86.1.93/HexiCloudRESTAPI/resources/rest/myservices");
                self.containerName = ko.observable(sessionInfo.getFromSession(sessionInfo.containerName));
                self.loggedInUser = ko.observable(sessionInfo.getFromSession(sessionInfo.loggedInUser));
                self.loggedInUserRole = ko.observable(sessionInfo.getFromSession(sessionInfo.loggedInUserRole));
                self.userFirstLastName = ko.observable(sessionInfo.getFromSession(sessionInfo.userFirstLastName));
                self.userClmRegistryId = ko.observable(sessionInfo.getFromSession(sessionInfo.userClmRegistryId));
                self.isChatInitialized = ko.observable(false);

                self.getStateId = function () {
                    return router.currentState().id;
                };

                self.FailCallBackFn = function (xhr) {
                    console.log(xhr);
                };

                self.dashboardServices = ko.observableArray([]);
//                document.cookie = "nimbula=eyJpZGVudGl0eSI6ICJ7XCJyZWFsbVwiOiBcImNvbXB1dGUtZW0yLXoxMlwiLCBcInZhbHVlXCI6IFwie1xcXCJjdXN0b21lclxcXCI6IFxcXCJDb21wdXRlLWdzZTAwMDAwNTE0XFxcIiwgXFxcInJlYWxtXFxcIjogXFxcImNvbXB1dGUtZW0yLXoxMlxcXCIsIFxcXCJlbnRpdHlfdHlwZVxcXCI6IFxcXCJ1c2VyXFxcIiwgXFxcInNlc3Npb25fZXhwaXJlc1xcXCI6IDE0ODYwMzQyMzAuMjM1MjA0LCBcXFwiZXhwaXJlc1xcXCI6IDE0ODYwMjU2MzUuNDA5ODIxLCBcXFwidXNlclxcXCI6IFxcXCIvQ29tcHV0ZS1nc2UwMDAwMDUxNC9jbG91ZC5hZG1pblxcXCIsIFxcXCJncm91cHNcXFwiOiBbXFxcIi9Db21wdXRlLWdzZTAwMDAwNTE0L0NvbXB1dGUuQ29tcHV0ZV9Nb25pdG9yXFxcIiwgXFxcIi9Db21wdXRlLWdzZTAwMDAwNTE0L0NvbXB1dGUuQ29tcHV0ZV9PcGVyYXRpb25zXFxcIl19XCIsIFwic2lnbmF0dXJlXCI6IFwiclRyTlNnVytrdnNZMG56MWhlOTRmS2V5Tjg3NDBQRU10NUhPVkdrSDF3Si8veFdkSnBGaytxWUFuc0tDNTBLQy9mSU1jS01kMzBaN201ZXlSL2I1ekZNUHR4VUdqaVExMkMybnFPVEFOSHQrRlQrcW9HQXNzRnFPcXlkaGhyb2hCKzFjbldubzV4K1d5Mi9wOGlibllpRSswNHBsS21HYlpEMmxhVGVCcTJKbGRSVXMwdjgrODlUeWRQd0dpQUZjWXJkUE9GSnljdjNQMm5pcjdqYStRZ1F6ZzlrSTFxRk4rNlJSdXRvQXhtK0d6RFk4MVgrTGFmN0RNL1RLN08xNXpPUERZalBEUkxjUUEyZnRrRURHYUxMVVhxMlA4Zm56N3BzU3pTYUZOWGJnK2x5WkUrUVV6Q3hDd3p1Nk5DU0laOXE0TUFoY21ub3ZMNkhqMDNmMldRPT1cIn0ifQ==";
//                document.cookie = "atgRecVisitorId=11C9P_gPbvotlemq3jnCeAbaFmWOzRjoIXTBVSyM4iM5YJc7C5B";
                $(window).resize(function () {
                    if (oj.ResponsiveUtils.compare(self.screenRange(), oj.ResponsiveUtils.SCREEN_RANGE.LG) < 0) {
                        self.isChatInitialized(false);
                    }
//                    self.autoAlignContent();
                });

//                self.autoAlignContent = function () {
//                    if (oj.ResponsiveUtils.compare(self.screenRange(), oj.ResponsiveUtils.SCREEN_RANGE.LG) > 0) {
//                        if (self.isChatInitialized()) {
//                            $('navigationbarright').css("width", "250px");
//                            $('.dashboard').css("max-width", "calc(100% - 250px)");
//                        } else {
//                            $('navigationbarright').css("width", "250px");
//                            $('.dashboard').css("max-width", "calc(100% - 500px)");
//                        }
//                    } else if (oj.ResponsiveUtils.compare(self.screenRange(), oj.ResponsiveUtils.SCREEN_RANGE.MD) > 0) {
//                        if (self.isChatInitialized()) {
//                            $('navigationbarright').css("width", "250px");
//                            $('.dashboard').css("max-width", "calc(100% - 500px)");
//                        } else {
//                            $('navigationbarright').css("width", "250px");
//                            $('.dashboard').css("max-width", "calc(100% - 500px)");
//                        }
//                    } else if (oj.ResponsiveUtils.compare(self.screenRange(), oj.ResponsiveUtils.SCREEN_RANGE.SM) > 0) {
//                        if (self.isChatInitialized()) {
//                            $('navigationbarright').css("width", "250px");
//                            $('.dashboard').css("max-width", "calc(100% - 500px)");
//                        } else {
//                            $('navigationbarright').css("width", "250px");
//                            $('.dashboard').css("max-width", "calc(100% - 500px)");
//                        }
//                    } else {
//                        if (self.isChatInitialized()) {
//                            $('navigationbarright').css("width", "250px");
//                            $('.dashboard').css("max-width", "calc(100% - 500px)");
//                        } else {
//                            $('navigationbarright').css("width", "250px");
//                            $('.dashboard').css("max-width", "calc(100% - 500px)");
//                        }
//                    }
//                };
            }
            ;


            $(document).ready(function ()
            {
                oj.Router.sync().then(function () {
                    ko.applyBindings(viewModel(), document.getElementById('routing-container'));
                });
            });
        });

