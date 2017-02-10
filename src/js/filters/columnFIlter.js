(function() {
    'use strict';

    angular
        .module('users')
        .filter('columnFilter', columnFilter);

    function columnFilter() {
        return function(items, search) {
            if (!search) return items;

            var pattern = new RegExp(search, 'i'),
                filtered = [];

            items.forEach(function(item) {
                if (pattern.test(item.name) ||
                    pattern.test(item.username) ||
                    pattern.test(item.email)) {
                    filtered.push(item);
                }
            })
            return filtered;
        }
    }
})();