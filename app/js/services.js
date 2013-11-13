/* Services */
/* TODO: use cidsjs module when available */
angular.module(
    'de.cismet.crisma.widgets.scenarioListWidget.services',
    [
        'de.cismet.crisma.widgets.configuration'
    ]
).factory(
    'de.cismet.crisma.widgets.scenarioListWidget.services.ScenarioWorldstates',
    [
        'CRISMA_DOMAIN',
        function (CRISMA_DOMAIN) {
            'use strict';

            return ci.getAllObjectsOfClass(
                CRISMA_DOMAIN,
                'worldstates',
                {
                    "fields": "id,name",
                    "filter": "childworldstates:\\[\\]"
                }
            );
        }
    ]
);
