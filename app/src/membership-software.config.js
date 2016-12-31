(function () {
    'use strict';

    angular
        .module("membershipSoftware")
        .config(function ($mdThemingProvider, $mdIconProvider) {
            //TODO configure mdDateLocaleProvider

            $mdIconProvider
                .defaultIconSet("./assets/svg/avatars.svg", 128)
                .icon("menu", "./assets/svg/menu.svg", 24)
                .icon("share", "./assets/svg/share.svg", 24)
                .icon("add", "./assets/svg/ic_add_black_24px.svg", 24)
                .icon("search_white", "./assets/svg/ic_search_white_24px.svg", 24)
                .icon("search", "./assets/svg/ic_search_black_24px.svg", 24)
                .icon("close_white", "./assets/svg/ic_close_white_24px.svg", 24)
                .icon("mode_edit", "./assets/svg/ic_mode_edit_black_24px.svg", 24)
                .icon("more_vert", "./assets/svg/more_vert.svg", 24)
                .icon("delete_forever", "./assets/svg/ic_delete_forever_black_24px.svg", 24)
                .icon("google_plus", "./assets/svg/google_plus.svg", 512)
                .icon("hangouts", "./assets/svg/hangouts.svg", 512)
                .icon("twitter", "./assets/svg/twitter.svg", 512)
                .icon("phone", "./assets/svg/phone.svg", 512)
                .icon("navigate_next_white", "./assets/svg/ic_navigate_next_white_24px.svg", 24)
                .icon("person_add", "./assets/svg/ic_person_add_24px.svg", 24)
                .icon("person_add_black", "./assets/svg/ic_person_add_black_24px.svg", 24);

            $mdThemingProvider
                .definePalette('black', {
                    '50': '#858585',
                    '100': '#5e5e5e',
                    '200': '#424242',
                    '300': '#1f1f1f',
                    '400': '#0f0f0f',
                    '500': '#000000',
                    '600': '#000000',
                    '700': '#000000',
                    '800': '#000000',
                    '900': '#000000',
                    'A100': '#858585',
                    'A200': '#5e5e5e',
                    'A400': '#0f0f0f',
                    'A700': '#000000',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': '50 A100'
                });

            $mdThemingProvider
                .theme('darkToolbar')
                .primaryPalette('black');

            $mdThemingProvider
                .theme('default')
                .primaryPalette('teal')
                .warnPalette('red');

        });

})();