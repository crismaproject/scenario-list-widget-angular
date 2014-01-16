angular.module('de.cismet.crisma.widgets.scenarioListWidget.directives').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/ScenarioWorldstatesTemplate.html',
    "<div class=\"expandfull padding-border-box\">\n" +
    "    <div class=\"well expandfull\">\n" +
    "        <select id=\"scenarioWorldstateWidget\" multiple=\"true\" size=\"10\" data-ng-model=\"selectedWorldstates\"\n" +
    "                data-ng-options=\"ws.name for ws in scenarioWorldstates track by ws.id\" />\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
