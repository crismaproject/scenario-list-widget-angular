angular.module(
    'de.cismet.crisma.widgets.scenarioListWidget.controllers',
    [
        'de.cismet.crisma.widgets.scenarioListWidget.services',
        'de.cismet.commons.angular.angularTools'
    ]
).controller(
    'de.cismet.crisma.widgets.scenarioListWidget.controllers.ScenarioWorldstatesDirectiveController',
    [
        '$scope',
        '$injector',
        'de.cismet.crisma.widgets.scenarioListWidget.services.ScenarioWorldstatesService',
        'de.cismet.commons.angular.angularTools.AngularTools',
        'DEBUG',

        function ($scope, $injector, wsService, AngularTools, DEBUG) {
            'use strict';

            var initializeShareService;

            // using initializer function as we don't need anything of this stuff in this scope
            initializeShareService = function () {
                var shareService;

                if ($injector.has('de.cismet.crisma.widgets.shared.SharedService')) {
                    if (DEBUG) {
                        console.log('shareservice available, attaching selectedWorldstatesChanged listener');
                    }

                    shareService = $injector.get('de.cismet.crisma.widgets.shared.SharedService');

                    $scope.$on('selectedWorldstatesChanged', function () {
                        AngularTools.safeApply($scope, function () {
                            $scope.selectedWorldstates = shareService.getSelectedWorldstates();
                        });
                    });

                    $scope.$watch('selectedWorldstates', function (n, o) {
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
                        console.log('shareservice not available, not listening for selectedWorldstatesChanged');
                    }
                }
            };

            initializeShareService();

            $scope.scenarioWorldstates = wsService.getScenarioWorldstates().query();
            $scope.selectedWorldstates = [];
        }
    ]
);