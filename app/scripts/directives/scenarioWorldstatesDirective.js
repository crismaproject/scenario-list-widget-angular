angular.module(
    'de.cismet.crisma.widgets.scenarioListWidget.directives'
).directive(
    'scenarioWorldstatesWidget',
    function () {
        'use strict';

        return {
            scope: {
                selectedWorldstate: '=?'
            },
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/ScenarioWorldstatesTemplate.html',
            controller: 'de.cismet.crisma.widgets.scenarioListWidget.controllers.ScenarioWorldstatesDirectiveController'
        };
    }
);
