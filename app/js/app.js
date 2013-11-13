angular.module('tpltest', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('partials/worldstateSelector.html', 
'<div>'
    + '<select id="worldstate-selection-widget" multiple="true" size="10" data-ng-model="selectedWorldstates" '
             +'data-ng-options="ws.name for ws in worldstates" >'
    +'</select>'
+'</div>'
)    
}]);

angular.module(
    'de.cismet.crisma.widgets.scenarioListWidget',
    [
        'de.cismet.crisma.widgets.scenarioListWidget.directives',
        'de.cismet.crisma.widgets.scenarioListWidget.services',
        'de.cismet.crisma.widgets.scenarioListWidget.controllers',
        'tpltest'
    ]
);