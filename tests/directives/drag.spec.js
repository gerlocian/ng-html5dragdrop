(function () {
    'use strict';

    var $compile, $scope, element, events = [
            'drag', 'dragend', 'dragstart'
        ];

    function beforeEachDragDirectiveTest(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();

        element = $compile(
            '<div id="test-drag-element" html5-drag></div>'
        )($scope);
        $scope.$apply();
    }

    function afterEachDragDirectiveTest() {
        $compile = null;
        $scope = null;
        element = null;
    }

    function testDirectiveAddsTheDraggableAttribute() {
        expect(element.attr('draggable')).toBeDefined();
        expect(element.attr('draggable')).toBe('true');
    }

    function testDirectiveHasAHandlerMethodForEachEvent() {
        var eventData = angular.element._data(element[0], 'events');

        events.forEach(function (el) {
            expect(eventData.events[el]).toBeDefined();
            expect(eventData.events[el].length).toBeGreaterThan(0);

            eventData.events[el].forEach(function (event) {
                expect(event).toEqual(jasmine.any(Function));
                event();
            });
        });
    }

    function testDirectiveAllowsOnDragStartHandler($injector) {
        var callback, compile, elem, scope, eventData, event, data;

        // Create callback spy and inject it into the scope.
        callback = jasmine.createSpy('callback');
        scope = $injector.get('$rootScope').$new();
        scope.dragStartMethod = callback;
        scope.dragdata = { test: 'Goodbye!' };

        // Create the draggable element and inject the scope into the directive.
        compile = $injector.get('$compile');
        elem = compile('<div html5-drag on-drag-start="dragStartMethod" drag-data="dragdata"></div>')(scope);
        scope.$apply();

        // Dig into the event handlers for the newly created element.
        eventData = angular.element._data(elem[0], 'events');

        // Get the event handler for onDragStart and create a dummy event object.
        event = eventData.events.dragstart[0];
        data = {test: 'HelloWorld!'};

        // Run it and insure the callback was actually run.
        event(data);
        expect(callback).toHaveBeenCalledWith(data, scope.dragdata);
    }

    function testDirectiveAllowsOnDragHandler($injector) {
        var callback, compile, elem, scope, eventData, event, data;

        // Create callback spy and inject it into the scope.
        callback = jasmine.createSpy('callback');
        scope = $injector.get('$rootScope').$new();
        scope.dragMethod = callback;
        scope.dragdata = { test: 'Goodbye!' };

        // Create the draggable element and inject the scope into the directive.
        compile = $injector.get('$compile');
        elem = compile('<div html5-drag on-drag="dragMethod" drag-data="dragdata"></div>')(scope);
        scope.$apply();

        // Dig into the event handlers for the newly created element.
        eventData = angular.element._data(elem[0], 'events');

        // Get the event handler for onDragStart and create a dummy event object.
        event = eventData.events.drag[0];
        data = {test: 'HelloWorld!'};

        // Run it and insure the callback was actually run.
        event(data);
        expect(callback).toHaveBeenCalledWith(data, scope.dragdata);
    }

    function testDirectiveAllowsOnDragEndHandler($injector) {
        var callback, compile, elem, scope, eventData, event, data;

        // Create callback spy and inject it into the scope.
        callback = jasmine.createSpy('callback');
        scope = $injector.get('$rootScope').$new();
        scope.dragEndMethod = callback;
        scope.dragdata = { test: 'Goodbye!' };

        // Create the draggable element and inject the scope into the directive.
        compile = $injector.get('$compile');
        elem = compile('<div html5-drag on-drag-end="dragEndMethod" drag-data="dragdata"></div>')(scope);
        scope.$apply();

        // Dig into the event handlers for the newly created element.
        eventData = angular.element._data(elem[0], 'events');

        // Get the event handler for onDragStart and create a dummy event object.
        event = eventData.events.dragend[0];
        data = {test: 'HelloWorld!'};

        // Run it and insure the callback was actually run.
        event(data);
        expect(callback).toHaveBeenCalledWith(data, scope.dragdata);
    }

    describe('Drag directive', function () {
        beforeEach(module('html5DragDrop'));
        beforeEach(inject(beforeEachDragDirectiveTest));
        afterEach(afterEachDragDirectiveTest);

        it('should add "draggable" to the element', testDirectiveAddsTheDraggableAttribute);
        it('should have handlers for the events of the drag', testDirectiveHasAHandlerMethodForEachEvent);
        it('should allow onDragStart handler', inject(testDirectiveAllowsOnDragStartHandler));
        it('should allow onDrag handler', inject(testDirectiveAllowsOnDragHandler));
        it('should allow onDragEnd handler', inject(testDirectiveAllowsOnDragEndHandler));
    });

}());
