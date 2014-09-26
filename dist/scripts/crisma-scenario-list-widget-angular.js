angular.module('de.cismet.crisma.widgets.scenarioListWidget', [
  'de.cismet.crisma.widgets.scenarioListWidget.directives',
  'de.cismet.crisma.widgets.scenarioListWidget.controllers',
  'de.cismet.cids.rest.collidngNames.Nodes',
  'de.cismet.crisma.ICMM.Worldstates',
  'de.cismet.cids.widgets.nodeListWidget'
]);
angular.module('de.cismet.crisma.widgets.scenarioListWidget.controllers', [
  'de.cismet.commons.angular.angularTools',
  'de.cismet.cids.rest.collidngNames.Nodes'
]).controller('de.cismet.crisma.widgets.scenarioListWidget.controllers.ScenarioWorldstatesDirectiveController', [
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
      Worldstates.get({
        'wsId': ws.id,
        level: 100,
        field: 'parentworldstate,id',
        deduplicate: true
      }, function (parents) {
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
    $scope.$watch('selectedWorldstateNode', function (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (changeFromSelectedWorldstateWatch) {
          changeFromSelectedWorldstateWatch = false;
          return;
        }
        worldstateId = $scope.selectedWorldstateNode.objectKey;
        worldstateId = worldstateId.substring(worldstateId.lastIndexOf('/') + 1, worldstateId.length);
        Worldstates.get({ wsId: worldstateId }, function (ws) {
          $scope.selectedWorldstate = ws;
        });
      }
    });
    $scope.$watch('selectedWorldstate', function (newVal, oldVal) {
      if (newVal !== oldVal) {
        getNodeKeyForWorldstate($scope.selectedWorldstate).then(function (key) {
          Nodes.get({ nodeId: Nodes.utils.getRequestIdForNodeKey(key) }, function (wsNode) {
            changeFromSelectedWorldstateWatch = true;
            $scope.selectedWorldstateNode = wsNode;
          });
        });
      }
    });
  }
]);
angular.module('de.cismet.crisma.widgets.scenarioListWidget.directives', []).directive('scenarioWorldstatesWidget', function () {
  'use strict';
  return {
    scope: { selectedWorldstate: '=?' },
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/ScenarioWorldstatesTemplate.html',
    controller: 'de.cismet.crisma.widgets.scenarioListWidget.controllers.ScenarioWorldstatesDirectiveController'
  };
});