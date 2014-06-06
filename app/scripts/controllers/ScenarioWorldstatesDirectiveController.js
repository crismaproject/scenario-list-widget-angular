angular.module(
    'de.cismet.crisma.widgets.scenarioListWidget.controllers',
    [
        'de.cismet.commons.angular.angularTools'
    ]
).controller(
    'de.cismet.crisma.widgets.scenarioListWidget.controllers.ScenarioWorldstatesDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        function ($scope, Worldstates) {
            'use strict';
            var worldstateId;
            $scope.$watch('selectedWorldstateNode', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    worldstateId = $scope.selectedWorldstateNode.objectKey;
                    worldstateId = worldstateId.substring(worldstateId.lastIndexOf('/')+1,worldstateId.length);
                    $scope.selectedWorldstate = Worldstates.get({wsId: worldstateId});
                }
            });
        }
    ]
);