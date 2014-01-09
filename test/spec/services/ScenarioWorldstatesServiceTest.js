describe('Service: ScenarioWorldstatesService', function () {
    'use strict';

    var httpBackend, rootScope, wsService;

    beforeEach(module(function ($provide) {
        $provide.constant('DEBUG', 'true');
        $provide.constant('CRISMA_DOMAIN', 'testdomain');
        $provide.constant('CRISMA_ICMM_API', 'http://testapi');
    }));

    beforeEach(module('de.cismet.crisma.widgets.scenarioListWidget.services'));

    beforeEach(inject(
        [
            '$rootScope',
            '$httpBackend',
            'de.cismet.crisma.widgets.scenarioListWidget.services.ScenarioWorldstatesService',
            function ($rootScope, $httpBackend, ScenarioWorldstatesService) {
                rootScope = $rootScope;
                httpBackend = $httpBackend;
                wsService = ScenarioWorldstatesService;
            }
        ]
    ));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('ensure proper build of ICMM API call', function () {
        var result;

        httpBackend.expectGET('http://testapi/testdomain.worldstates?deduplicate=true&fields=id,name&filter=childworldstates:%5C%5B%5C%5D&level=1&omitNullValues=false')
            .respond('{}');

        result = wsService.getScenarioWorldstates().query();
        // exception would have been thrown if call was wrong

        rootScope.$apply();
        httpBackend.flush();
    });

    it('should unwrap collection resource of ICMM API', function () {
        var result;

        httpBackend.expectGET('http://testapi/testdomain.worldstates?deduplicate=true&fields=id,name&filter=childworldstates:%5C%5B%5C%5D&level=1&omitNullValues=false')
            .respond('{"$collection": [{"ThisIs":"OK"}]}');

        result = wsService.getScenarioWorldstates().query();

        rootScope.$apply();

        httpBackend.flush();

        expect(angular.equals([{'ThisIs': 'OK'}], result)).toBeTruthy();
    });

    // TODO: optional dependency tests
});
