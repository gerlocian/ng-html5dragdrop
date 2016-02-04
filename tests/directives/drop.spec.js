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

        describe('onDragEnter', function () {
            it('should be assigned a handler', function () {
                var element = $compile('<div html5-drop></div>')($scope), event;
                $scope.$apply();

                event = getEventHandlerForEvent(element, 'dragenter');

                expect(event[0]).toBeDefined();
                expect(event[0]).toEqual(jasmine.any(Function));
            });

            it('should fire the prevent default method on the event', function () {
                var element = $compile('<div html5-drop></div>')($scope),
                    event, eventData;
                $scope.$apply();

                event = getEventHandlerForEvent(element, 'dragenter')[0];
                eventData = { preventDefault: jasmine.createSpy('preventDefault') };

                event(eventData);
                expect(eventData.preventDefault).toHaveBeenCalled();
            });

            it('should fire a callback method if provided', function () {
                var element, event, eventData, dragData, draggedElement;

                $scope.testOnDragEnter = jasmine.createSpy('onDragEnter');
                $scope.testOnDragEnterCallback = jasmine.createSpy('onDragEnterCallback');
                $scope.testOnDragEnter.and.returnValue($scope.testOnDragEnterCallback);
                dragData = { value: 'test1' };

                element = $compile(
                    '<div html5-drop id="test-id" on-drag-enter="testOnDragEnter()"></div>'
                )($scope);
                draggedElement = angular.element(
                    '<div html5-drag id="draggable-element" class="dragging"></div>'
                ).data({dragData: dragData});
                angular.element(document.body).append(draggedElement);

                $scope.$apply();
                eventData = {
                    preventDefault: jasmine.createSpy('preventDefault')
                };

                event = getEventHandlerForEvent(element, 'dragenter')[0];

                event(eventData);
                expect($scope.testOnDragEnterCallback).toHaveBeenCalledWith(eventData, element, draggedElement, dragData);

                draggedElement.remove();
            });
        });

        describe('onDragOver', function () {
            it('should be assigned a handler', function () {
                var element = $compile('<div html5-drop></div>')($scope), event;
                $scope.$apply();

                event = getEventHandlerForEvent(element, 'dragover');

                expect(event[0]).toBeDefined();
                expect(event[0]).toEqual(jasmine.any(Function));
            });

            it('should fire the prevent default method on the event', function () {
                var element = $compile('<div html5-drop></div>')($scope),
                    event, eventData;
                $scope.$apply();

                event = getEventHandlerForEvent(element, 'dragover')[0];
                eventData = { preventDefault: jasmine.createSpy('preventDefault') };

                event(eventData);
                expect(eventData.preventDefault).toHaveBeenCalled();
            });

            it('should fire a callback method if provided', function () {
                var element, event, eventData, dragData, draggedElement;

                $scope.testOnDragOver = jasmine.createSpy('onDragOver');
                dragData = { value: 'test1' };

                element = $compile(
                    '<div html5-drop id="test-id" on-drag-over="testOnDragOver"></div>'
                )($scope);
                draggedElement = angular.element(
                    '<div html5-drag id="draggable-element" class="dragging"></div>'
                ).data({dragData: dragData});
                angular.element(document.body).append(draggedElement);

                $scope.$apply();
                eventData = {
                    preventDefault: jasmine.createSpy('preventDefault')
                };

                event = getEventHandlerForEvent(element, 'dragover')[0];

                event(eventData);
                expect($scope.testOnDragOver).toHaveBeenCalledWith(eventData, element, draggedElement, dragData);

                draggedElement.remove();
            });
        });

        describe('onDragLeave', function () {
            it('should be assigned a handler', function () {
                var element = $compile('<div html5-drop></div>')($scope), event;
                $scope.$apply();

                event = getEventHandlerForEvent(element, 'dragleave');

                expect(event[0]).toBeDefined();
                expect(event[0]).toEqual(jasmine.any(Function));
            });

            it('should not fire the prevent default method on the event', function () {
                var element = $compile('<div html5-drop></div>')($scope),
                    event, eventData;
                $scope.$apply();

                event = getEventHandlerForEvent(element, 'dragleave')[0];
                eventData = { preventDefault: jasmine.createSpy('preventDefault') };

                event(eventData);
                expect(eventData.preventDefault).not.toHaveBeenCalled();
            });

            it('should fire a callback method if provided', function () {
                var element, event, eventData, dragData, draggedElement;

                $scope.testOnDragLeave = jasmine.createSpy('onDragLeave');
                dragData = { value: 'test1' };

                element = $compile(
                    '<div html5-drop id="test-id" on-drag-leave="testOnDragLeave"></div>'
                )($scope);
                draggedElement = angular.element(
                    '<div html5-drag id="draggable-element" class="dragging"></div>'
                ).data({dragData: dragData});
                angular.element(document.body).append(draggedElement);

                $scope.$apply();
                eventData = {};

                event = getEventHandlerForEvent(element, 'dragleave')[0];

                event(eventData);
                expect($scope.testOnDragLeave).toHaveBeenCalledWith(eventData, element, draggedElement, dragData);

                draggedElement.remove();
            });
        });

        describe('onDrop', function () {
            it('should be assigned a handler', function () {
                var element = $compile('<div html5-drop></div>')($scope), event;
                $scope.$apply();

                event = getEventHandlerForEvent(element, 'drop');

                expect(event[0]).toBeDefined();
                expect(event[0]).toEqual(jasmine.any(Function));
            });

            it('should not fire the prevent default method on the event', function () {
                var element = $compile('<div html5-drop></div>')($scope),
                    event, eventData;
                $scope.$apply();

                event = getEventHandlerForEvent(element, 'drop')[0];
                eventData = { preventDefault: jasmine.createSpy('preventDefault') };

                event(eventData);
                expect(eventData.preventDefault).toHaveBeenCalled();
            });

            it('should fire a callback method if provided', function () {
                var element, event, eventData, dragData, draggedElement;

                $scope.testOnDrop = jasmine.createSpy('onDrop');
                dragData = { value: 'test1' };

                element = $compile(
                    '<div html5-drop id="test-id" on-drop="testOnDrop"></div>'
                )($scope);
                draggedElement = angular.element(
                    '<div html5-drag id="draggable-element"></div>'
                ).data({dragData: dragData});
                angular.element(document.body).append(draggedElement);

                $scope.$apply();
                eventData = {
                    dataTransfer: { getData: jasmine.createSpy('getData') },
                    preventDefault: jasmine.createSpy('preventDefault')
                };
                eventData.dataTransfer.getData.and.returnValue('draggable-element');
                event = getEventHandlerForEvent(element, 'drop')[0];

                event(eventData);
                expect($scope.testOnDrop).toHaveBeenCalledWith(eventData, element, draggedElement, dragData);
                expect(eventData.dataTransfer.getData).toHaveBeenCalledWith('text/plain');

                draggedElement.remove();
            });
        });

    });

}());
