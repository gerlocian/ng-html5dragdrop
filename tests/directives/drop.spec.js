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
                dragData = { value: 'test1' };

                element = $compile(
                    '<div html5-drop id="test-id" on-drag-enter="testOnDragEnter"></div>'
                )($scope);
                draggedElement = angular.element(
                    '<div html5-drag id="draggable-element"></div>'
                ).data({dragData: dragData});
                angular.element(document.body).append(draggedElement);

                $scope.$apply();
                eventData = {
                    preventDefault: jasmine.createSpy('preventDefault'),
                    dataTransfer: { getData: jasmine.createSpy('getData') }
                };
                eventData.dataTransfer.getData.and.returnValue('draggable-element');
                event = getEventHandlerForEvent(element, 'dragenter')[0];

                event(eventData);
                expect($scope.testOnDragEnter).toHaveBeenCalledWith(eventData, element, draggedElement, dragData);
                expect(eventData.dataTransfer.getData).toHaveBeenCalledWith('text/plain');
            });
        });

    });

}());
