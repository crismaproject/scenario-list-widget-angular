angular.module('de.cismet.crisma.widgets.scenarioListWidget.directives').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/ScenarioWorldstatesTemplate.html',
    "<div class=\"well\">\n" +
    "    <select id=\"scenarioWorldstatesWidget\" multiple=\"true\" size=\"10\" data-ng-model=\"selectedWorldstates\" class=\"\"\n" +
    "            data-ng-options=\"ws.name for ws in scenarioWorldstates\" />\n" +
    "</div>\n"
  );

}]);
