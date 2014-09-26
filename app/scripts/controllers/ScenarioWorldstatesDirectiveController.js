angular.module(
    'de.cismet.crisma.widgets.scenarioListWidget.controllers',
    [
        'de.cismet.commons.angular.angularTools',
        'de.cismet.cids.rest.collidngNames.Nodes'
    ]
).controller(
    'de.cismet.crisma.widgets.scenarioListWidget.controllers.ScenarioWorldstatesDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        'de.cismet.collidingNameService.Nodes',
        '$q',
        function ($scope, Worldstates, Nodes, $q) {
            'use strict';
            var worldstateId, changeFromSelectedWorldstateWatch;

            function getNodeKeyForWorldstate(ws) {
                var defer;
                defer = $q.defer();
                Worldstates.get(
                {
                    'wsId': ws.id,
                    level: 100,
                    field: 'parentworldstate,id',
                    deduplicate: true
                },
                    function (parents) {
                        var key;
                        key = parents.id.toString();
                        while (parents.parentworldstate) {
                            parents = parents.parentworldstate;
                            key += '.' + parents.id;
                        }

                        defer.resolve(key.split('.').reverse().join('.'));
                    });
                return defer.promise;
            }

            /*
             * The watch for the selected Worldstate node listens for changes of the selected node
             * that occur when the user selects a list item.
             * Furhtermore this watch is fires when the selectedWorldstate binding is changed from directives
             * outer scope. In that case we must not update the selectedWorldstate again to avoid an infinte loop 
             * of watch calls
             */
            $scope.$watch('selectedWorldstateNode', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    if (changeFromSelectedWorldstateWatch) {
                        changeFromSelectedWorldstateWatch = false;
                        return;
                    }
                    worldstateId = $scope.selectedWorldstateNode.objectKey;
                    worldstateId = worldstateId.substring(worldstateId.lastIndexOf('/') + 1, worldstateId.length);
                    Worldstates.get({wsId: worldstateId}, function (ws) {
                        $scope.selectedWorldstate = ws;
                    });
                }
            });

            /*
             * This watch listens for changes of the selectedWorldstate from directives outer scope.
             * It is also fired when the selectedWorldstateNode has changed
             */
            $scope.$watch('selectedWorldstate', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    getNodeKeyForWorldstate($scope.selectedWorldstate).then(function (key) {

                        Nodes.get({nodeId: Nodes.utils.getRequestIdForNodeKey(key)}, function (wsNode) {
                            changeFromSelectedWorldstateWatch = true;
                            $scope.selectedWorldstateNode = wsNode;
                        });
                    });
                }
            });

        }
    ]
);