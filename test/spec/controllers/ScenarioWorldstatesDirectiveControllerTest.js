describe('Controller: ScenarioWorldstatesDirectiveController', function () {
    'use strict';

    var httpBackend, rootScope, createController;

    beforeEach(module(function ($provide) {
        $provide.constant('DEBUG', 'true');
        $provide.constant('CRISMA_DOMAIN', 'testdomain');
        $provide.constant('CRISMA_ICMM_API', 'http://testapi');
    }));

    beforeEach(module('de.cismet.crisma.widgets.scenarioListWidget.controllers'));

    beforeEach(inject(
        [
            '$rootScope',
            '$httpBackend',
            '$controller',
            function ($rootScope, $httpBackend, $controller) {
                rootScope = $rootScope;
                httpBackend = $httpBackend;
                httpBackend.when(
                    'GET',
                    'http://testapi/testdomain.worldstates?deduplicate=true&fields=id,name&filter=childworldstates:%5C%5B%5C%5D&level=1&omitNullValues=false'
                ).respond('{"$collection": [{"ThisIs":"OK"}]}');

                createController = function () {
                    return $controller(
                        'de.cismet.crisma.widgets.scenarioListWidget.controllers.ScenarioWorldstatesDirectiveController',
                        { '$scope': $rootScope }
                    );
                };
            }
        ]
    ));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should query worldstates from ICMM API', function () {
        var c;

        httpBackend.expectGET('');
        c = createController();
        rootScope.$apply();
        httpBackend.flush();
    });

    it('should assign worldstates to scope', function () {
        var c;

        httpBackend.expectGET('');
        c = createController();
        rootScope.$apply();
        httpBackend.flush();

        expect(angular.equals([{'ThisIs': 'OK'}], rootScope.scenarioWorldstates)).toBeTruthy();
    });
});
