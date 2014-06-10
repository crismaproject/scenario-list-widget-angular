//angular.module('tpltest', []).run(['$templateCache', function($templateCache) {
//    $templateCache.put('partials/worldstateSelector.html', 
//'<div>'
//    + '<select id="worldstate-selection-widget" multiple="true" size="10" data-ng-model="selectedWorldstates" '
//             +'data-ng-options="ws.name for ws in worldstates" >'
//    +'</select>'
//+'</div>'
//)    
//}]);
// this only combines all the modules in a single one 
angular.module('de.cismet.crisma.widgets.scenarioListWidget', [
  'de.cismet.crisma.widgets.scenarioListWidget.directives',
  'de.cismet.crisma.widgets.scenarioListWidget.controllers',
  'de.cismet.cids.rest.collidngNames.Nodes',
  'de.cismet.crisma.ICMM.Worldstates',
  'de.cismet.cids.widgets.nodeListWidget'
]);
angular.module('de.cismet.crisma.widgets.scenarioListWidget.controllers', ['de.cismet.commons.angular.angularTools']).controller('de.cismet.crisma.widgets.scenarioListWidget.controllers.ScenarioWorldstatesDirectiveController', [
  '$scope',
  'de.cismet.crisma.ICMM.Worldstates',
  function ($scope, Worldstates) {
    'use strict';
    var worldstateId;
    $scope.$watch('selectedWorldstateNode', function (newVal, oldVal) {
      if (newVal !== oldVal) {
        worldstateId = $scope.selectedWorldstateNode.objectKey;
        worldstateId = worldstateId.substring(worldstateId.lastIndexOf('/') + 1, worldstateId.length);
        $scope.selectedWorldstate = Worldstates.get({ wsId: worldstateId });
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