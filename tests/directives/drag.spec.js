(function () {
    'use strict';

    var $compile, $scope;

    function getEventHandlersFromElement(element) {
        return angular.element._data(element[0], 'events');
    }

    function getEventHandlerForEvent(element, event) {
        var eventsData = getEventHandlersFromElement(element);
        return eventsData.events[event];
    }

    describe('Drag directive', function () {
        beforeEach(module('html5DragDrop'));
        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        }));

        afterEach(function () {
            $compile = null;
            $scope = null;
        });

        it('should assign an id to the element if it does not have one', function () {
            var element = $compile('<div html5-drag></div>')($scope);
            $scope.$apply();

            expect(element.attr('id')).toBe('draggable-id-1');
        });

        it('should assign the next id in sequence to the element if it does not have one', function () {
            var element;

            $scope.currentIdNum = 3;
            element = $compile('<div html5-drag></div>')($scope);
            $scope.$apply();

            $scope.currentIdNum = 3;

            expect(element.attr('id')).toBe('draggable-id-4');
        });

        it('should add "draggable" to the element', function () {
            var element = $compile('<div html5-drag></div>')($scope);
            $scope.$apply();

            expect(element.attr('draggable')).toBeDefined();
            expect(element.attr('draggable')).toBe('true');
        });

        it('should assign provided drag data to the element\'s data method', function () {
            var element;

            $scope.testDragData = { data: '5bd7fffd-2ec8-12bd-df47-ffa9253d1a23'};
            element = $compile('<div html5-drag drag-data="testDragData"></div>')($scope);
            $scope.$apply();

            expect(element.data()).toEqual(jasmine.any(Object));
            expect(element.data().dragData).toEqual(jasmine.any(Object));
            expect(element.data().dragData).toBe($scope.testDragData);
        });

        describe('onDragStart', function () {
            it('should be assigned a handler', function () {
                var element = $compile('<div html5-drag></div>')($scope), event;
                $scope.$apply();

                event = getEventHandlerForEvent(element, 'dragstart');

                expect(event[0]).toBeDefined();
                expect(event[0]).toEqual(jasmine.any(Function));
            });

            it('should assign the id to event.dataTransfer when the dragstart event is fired', function () {
                var element = $compile('<div html5-drag id="test-id"></div>')($scope),
                    event, eventData;
                $scope.$apply();

                event = getEventHandlerForEvent(element, 'dragstart')[0];
                eventData = { dataTransfer: jasmine.createSpyObj('dataTransfer', ['setData']) };

                event(eventData);
                expect(eventData.dataTransfer.setData).toHaveBeenCalledWith('text/plain', 'test-id');
            });

            it('should fire a callback method if provided', function () {
                var element, event, eventData;

                $scope.testOnDragStart = jasmine.createSpy('onDragStart');
                $scope.testDragData = { data: '5bd7fffd-2ec8-12bd-df47-ffa9253d1a23'};
                element = $compile(
                    '<div html5-drag id="test-id" on-drag-start="testOnDragStart" drag-data="testDragData"></div>'
                )($scope);
                $scope.$apply();
                eventData = { dataTransfer: jasmine.createSpyObj('dataTransfer', ['setData']) };
                event = getEventHandlerForEvent(element, 'dragstart')[0];

                event(eventData);
                expect($scope.testOnDragStart).toHaveBeenCalledWith(eventData, element, $scope.testDragData);
            });
        });

        describe('onDrag', function () {
            it('should be assigned a handler', function () {
                var element = $compile('<div html5-drag></div>')($scope), event;
                $scope.$apply();

                event = getEventHandlerForEvent(element, 'drag');

                expect(event[0]).toBeDefined();
                expect(event[0]).toEqual(jasmine.any(Function));
            });

            it('should not error if the callback method is not provided', function () {
                var element = $compile('<div html5-drag id="test-id"></div>')($scope),
                    event, eventData;
                $scope.$apply();

                event = getEventHandlerForEvent(element, 'drag')[0];
                eventData = {
                    dataTransfer: jasmine.createSpyObj('dataTransfer', ['setData'])
                };

                event(eventData);
            });

            it('should fire a callback method if provided', function () {
                var element, event, eventData;

                $scope.testOnDrag = jasmine.createSpy('onDrag');
                $scope.testDragData = { data: '5bd7fffd-2ec8-12bd-df47-ffa9253d1a23'};
                element = $compile(
                    '<div html5-drag id="test-id" on-drag="testOnDrag" drag-data="testDragData"></div>'
                )($scope);
                $scope.$apply();
                eventData = { dataTransfer: jasmine.createSpyObj('dataTransfer', ['setData']) };
                event = getEventHandlerForEvent(element, 'drag')[0];

                event(eventData);
                expect($scope.testOnDrag).toHaveBeenCalledWith(eventData, element, $scope.testDragData);
            });
        });

        describe('onDragEnd', function () {
            it('should be assigned a handler', function () {
                var element = $compile('<div html5-drag></div>')($scope), event;
                $scope.$apply();

                event = getEventHandlerForEvent(element, 'dragend');

                expect(event[0]).toBeDefined();
                expect(event[0]).toEqual(jasmine.any(Function));
            });

            it('should assign the id to event.dataTransfer when the dragend event is fired', function () {
                var element = $compile('<div html5-drag id="test-id"></div>')($scope),
                    event, eventData;
                $scope.$apply();

                event = getEventHandlerForEvent(element, 'dragend')[0];
                eventData = {
                    dataTransfer: jasmine.createSpyObj('dataTransfer', ['setData'])
                };

                event(eventData);
            });

            it('should fire a callback method if provided', function () {
                var element, event, eventData;

                $scope.testOnDragEnd = jasmine.createSpy('onDragEnd');
                $scope.testDragData = { data: '5bd7fffd-2ec8-12bd-df47-ffa9253d1a23'};
                element = $compile(
                    '<div html5-drag id="test-id" on-drag-end="testOnDragEnd" drag-data="testDragData"></div>'
                )($scope);
                $scope.$apply();
                eventData = { dataTransfer: jasmine.createSpyObj('dataTransfer', ['setData']) };
                event = getEventHandlerForEvent(element, 'dragend')[0];

                event(eventData);
                expect($scope.testOnDragEnd).toHaveBeenCalledWith(eventData, element, $scope.testDragData);
            });
        });

    });

}());
