angular.module('de.cismet.crisma.widgets.scenarioListWidget.directives').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/ScenarioWorldstatesTemplate.html',
    "<div>\n" +
    "    <cids-node-list-widget selected-worldstate=\"selectedWorldstateNode\"/>\n" +
    "</div>"
  );

}]);
