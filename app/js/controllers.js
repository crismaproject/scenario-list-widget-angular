angular.module(
    'de.cismet.crisma.widgets.scenarioListWidget.controllers',
    [
        'de.cismet.crisma.widgets.scenarioListWidget.services',
        'de.cismet.commons.angular.angularTools',
        'de.cismet.crisma.widgets.configuration'
    ]
).controller(
    'de.cismet.crisma.widgets.scenarioListWidget.controllers.ScenarioListWidgetController',
    [
        '$scope',
        '$injector',
        'de.cismet.crisma.widgets.scenarioListWidget.services.ScenarioWorldstates',
        'de.cismet.commons.angular.angularTools.AngularTools',
        'DEBUG',

        function ($scope, $injector, ScenarioWorldstates, AngularTools, DEBUG) {
            'use strict';

            var initializeListeners;

            // using initializer function as we don't need anything of this stuff in this scope
            initializeListeners = function () {
                var shareService;

                if ($injector.has('de.cismet.crisma.widgets.shared.SharedService')) {
                    if (DEBUG) {
                        console.log("shareservice available, attaching selectedWorldstatesChanged listener");
                    }

                    shareService = $injector.get('de.cismet.crisma.widgets.shared.SharedService');

                    $scope.$on('selectedWorldstatesChanged', function () {
                        AngularTools.safeApply($scope, function () {
                            $scope.selectedWorldstates = shareService.getSelectedWorldstates();
                        });
                    });

                    $scope.$watch('selectedWorldstates', function (n, o, s) {
                        if (typeof n === 'undefined') {
                            throw {
                                name: 'IllegalStateException',
                                message: 'selected worldstate undefined'
                            };
                        }

                        if (o === n) {
                            // ignore event, do nothing
                            return;
                        }

                        shareService.setSelectedWorldstates($scope.selectedWorldstates);
                    });
                } else {
                    if (DEBUG) {
                        console.log("shareservice not available, not listening for selectedWorldstatesChanged");
                    }
                }
            };

            initializeListeners();

            $scope.scenarioWorldstates = [];
            $scope.selectedWorldstates = [];

            ScenarioWorldstates.done(function (ws) {
                AngularTools.safeApply($scope, function () {
                    $scope.scenarioWorldstates = ws.$collection;
                });
            });
        }
    ]
);