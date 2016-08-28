/**
 * A JavaScript file.
 *
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license https://opensource.org/licenses/mit-license.php MIT License
 * @version 0.0.1
 */


/**
 * Setting up PrismJS
 */
Prism.plugins.autoloader.languages_path = '/assets/js/prism/components/';

$window = $(window);

$window.on('load', function () {

    var $body = $('body');
    var $wrapper = $('.foxy-wrapper');
    var $navigation = $('.foxy-navigation');
    var $navigationOverlay = $('.foxy-navigation-overlay');

    var navigation = false;

    var toggleNavigation = function (event) {
        event.preventDefault();
        navigation = !navigation;
        $wrapper.toggleClass('minimised', navigation);
        $navigation.toggleClass('visible', navigation);
        $navigationOverlay.toggleClass('hidden', !navigation);
    };
    $body.on('click', '.foxy-wrapper-menu-button', toggleNavigation);
    $body.on('click', '.foxy-navigation-overlay', toggleNavigation);

    var nav = $('.foxy-content-menu-button');
    var toggleNav = function () {
        nav.toggleClass('hidden', $window.width() > 1127);
    };
    $window.resize(function () {
        toggleNav();
    });
    toggleNav();

    if ($body.hasClass('home-template')) {

        var $container = $('#foxy-grid');
        $container.isotope({
            itemSelector: '.foxy-grid-item-wrapper',
            masonry: {
                columnWidth: '.foxy-grid-sizer'
            },
            percentPosition: true,
            // layoutMode: 'fitRows'
        });
        $('.foxy-content').on('click', '.foxy-grid-filter', function (event) {
            event.preventDefault();
            $('.foxy-grid-filter').removeClass('current');
            $(this).addClass('current');
            var filterValue = $(this).attr('data-filter');
            $container.isotope({filter: filterValue});
        });

    }

    var $postContentLinks = $('.foxy-post-content').find('a');
    $.each($postContentLinks, function (index, link) {
        var $link = $(link);
        var text = $link.text();
        if (/^~/.test(text)) {
            $link.text(text.substr(1));
        } else {
            $(link).attr('target', '_blank');
        }
    });


});