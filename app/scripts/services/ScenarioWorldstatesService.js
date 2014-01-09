/* Services */
/* TODO: use cidsjs module when available */
angular.module(
    'de.cismet.crisma.widgets.scenarioListWidget.services',
    [
        'ngResource'
    ]
).factory(
    'de.cismet.crisma.widgets.scenarioListWidget.services.ScenarioWorldstatesService',
    [
        'CRISMA_ICMM_API',
        'CRISMA_DOMAIN',
        '$resource',
        function (CRISMA_ICMM_API, CRISMA_DOMAIN, $resource) {
            'use strict';

            var getScenarioWorldstates;

            getScenarioWorldstates = function () {
                return $resource(
                    CRISMA_ICMM_API + '/' + CRISMA_DOMAIN + '.worldstates/:wsId',
                    {wsId: '@id', deduplicate: true, fields: 'id,name', level: '1', omitNullValues: 'false'},
                    {
                        'get':    {method: 'GET', cache: true},
                        'query':  {method: 'GET', params: {filter: 'childworldstates:\\[\\]'}, isArray: true, transformResponse: function (data) {
                            return JSON.parse(data).$collection;
                        }}
                    }
                );
            };

            return {
                getScenarioWorldstates: getScenarioWorldstates
            };
        }
    ]
);
