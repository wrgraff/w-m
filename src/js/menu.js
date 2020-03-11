(function() {
    var pageHeaderMenu = document.querySelector('.page-header__menu')
    var pageHeaderToggler = document.querySelector('.page-header__toggler');

    pageHeaderToggler.addEventListener('click', function() {
        pageHeaderMenu.classList.toggle('page-header__menu_opened');
        pageHeaderToggler.classList.toggle('page-header__toggler_active');
    });

    pageHeaderMenu.classList.add('page-header__menu_absolute');
    pageHeaderToggler.classList.remove('page-header__toggler_hided');
})();