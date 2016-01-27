(function () {
    'use strict';

    /**
     * Tests that the module exists.
     *
     * The fact that we got this far means that the test passes since the
     * before each method should have initialized this anyway. If the module
     * did not exist, this method would not have the change to run. Never the
     * less, let's do some sanity checks.
     */
    function testHtml5DragDropModuleExists() {
        expect(angular.module('html5DragDrop')).toEqual(jasmine.any(Object));
        expect(angular.module('html5DragDrop').name).toBe('html5DragDrop');
    }

    /**
     * Runs the tests.
     */
    describe('Html5 Drag and Drop module', function () {
        beforeEach(module('html5DragDrop'));

        it('should exist', testHtml5DragDropModuleExists);
    });

}());
