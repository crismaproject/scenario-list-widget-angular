angular.module(
    'de.cismet.crisma.widgets.scenarioListWidget.directives',
    []
).directive(
    'worldstateSelect',
    function () {
        'use strict';

        return {
            scope: {
                worldstates: '=',
                selectedWorldstates: '='
            },
            restrict: 'E',
            templateUrl: 'partials/worldstateSelector.html'
        };
    }
);
