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
  'de.cismet.crisma.widgets.scenarioListWidget.services',
  'de.cismet.crisma.widgets.scenarioListWidget.controllers'
]);
angular.module('de.cismet.crisma.widgets.scenarioListWidget.controllers', [
  'de.cismet.crisma.widgets.scenarioListWidget.services',
  'de.cismet.commons.angular.angularTools'
]).controller('de.cismet.crisma.widgets.scenarioListWidget.controllers.ScenarioWorldstatesDirectiveController', [
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
]);
angular.module('de.cismet.crisma.widgets.scenarioListWidget.directives', []).directive('scenarioWorldstatesWidget', function () {
  'use strict';
  return {
    scope: {
      scenarioWorldstates: '=?',
      selectedWorldstates: '=?'
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/ScenarioWorldstatesTemplate.html',
    controller: 'de.cismet.crisma.widgets.scenarioListWidget.controllers.ScenarioWorldstatesDirectiveController'
  };
});
/* Services */
/* TODO: use cidsjs module when available */
angular.module('de.cismet.crisma.widgets.scenarioListWidget.services', ['ngResource']).factory('de.cismet.crisma.widgets.scenarioListWidget.services.ScenarioWorldstatesService', [
  'CRISMA_ICMM_API',
  'CRISMA_DOMAIN',
  '$resource',
  function (CRISMA_ICMM_API, CRISMA_DOMAIN, $resource) {
    'use strict';
    var getScenarioWorldstates;
    getScenarioWorldstates = function () {
      return $resource(CRISMA_ICMM_API + '/' + CRISMA_DOMAIN + '.worldstates/:wsId', {
        wsId: '@id',
        deduplicate: true,
        fields: 'id,name',
        level: '1',
        omitNullValues: 'false'
      }, {
        'get': {
          method: 'GET',
          cache: true
        },
        'query': {
          method: 'GET',
          params: { filter: 'childworldstates:\\[\\]' },
          isArray: true,
          transformResponse: function (data) {
            return JSON.parse(data).$collection;
          }
        }
      });
    };
    return { getScenarioWorldstates: getScenarioWorldstates };
  }
]);