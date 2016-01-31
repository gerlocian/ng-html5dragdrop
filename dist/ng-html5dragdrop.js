(function () {
    'use strict';

    /**
     * The html5 Drag and Drop module is meant to take all the broiler plate
     * work needed for setting up drag and drop for browsers out of the hands
     * of angular authors so that they can focus on building functionality.
     *
     * All drag and drop functionality is already set up. The developer only
     * needs to focus on what they want the elements or dropzones to do when
     * the drag and drop functionality is complete.
     *
     * @author Patrick Ortiz <pogithub@gmail.com>
     * @link https://github.com/gerlocian/ng-html5dragdrop
     */

    angular.module('html5DragDrop', []);

}());

(function () {
    'use strict';

    /**
     * The html5Drag directive allows the author to designate the elements that
     * they want to be draggable. These elements will then be given the proper
     * values and logic to make them draggable on the screen. This directive
     * will NOT make use of the jquery library beyond the jqlite provided by
     * angular. The following options are available.
     *
     *     - dragData
     *         Example: (<div html5-drag drag-data='{object}'></div>)
     *         The data to apply to the dragged element. In standard HTML5 drag
     *         and drop, we are limited to strings. Through the power of
     *         angular, we can drag the data that we want along with us.
     *
     *     - onDragStart:
     *         Example: (<div html5-drag on-drag-start='{function_name}></div>)
     *         The name of the method to fire when the draggable element starts
     *         to move. You only want to include the method name. The method
     *         will then be fired with the event data as the first parameter
     *         and the dragData as the second if available.
     *
     *     - onDrag:
     *         Example: (<div html5-drag on-drag='{function_name}'></div>)
     *         The name of the method to fire as the draggable element is moved
     *         across the screen. This method is given the event data and the
     *         dragData if available. This method will also be fired numerous
     *         times, so be very careful to ensure that you don't use process
     *         intensive logic here.
     *
     *     - onDragEnd:
     *         Example: (<div html5-drag on-drag-end='{function_name}'></div>)
     *         The name of the method to fire once the draggable element is
     *         released. This method will fire whether or not the element was
     *         dragged and released into a valid drop zone. The method should
     *         expect to receive the event data and the dragData if available
     *         as parameters.
     */
    angular.module('html5DragDrop').directive('html5Drag', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var dragData = scope.$eval(attrs.dragData),
                    onDragStart = scope.$eval(attrs.onDragStart),
                    onDrag = scope.$eval(attrs.onDrag),
                    onDragEnd = scope.$eval(attrs.onDragEnd);

                // Assign a unique id to the element if it has no id.
                if (!element.attr('id')) {
                    element.attr('id', generateUniqueId(scope));
                }

                // Add attributes to the element to make it draggable.
                element.attr('draggable', true);
                element.data('dragData', dragData);

                // Assign event handlers to dragging events.
                //         element, event,       callback,    storeId?
                setupEvent(element, 'dragstart', onDragStart, true );
                setupEvent(element, 'drag',      onDrag,      false);
                setupEvent(element, 'dragend',   onDragEnd,   false);
            }
        };
    });

    /**
     * Generates a unique id for the element in the event that the element does
     * not have an id. This is needed so that the drag can assign an id to the
     * dataTransfer so that the end of the drag events can determine which
     * element was dragged.
     *
     * @return {string} The new unique id for the element.
     */
    function generateUniqueId(scope) {
        if (!scope.currentIdNum) {
            scope.currentIdNum = 0;
        }

        scope.currentIdNum += 1;
        return 'draggable-id-' + scope.currentIdNum;
    }

    /**
     * Sets up the event handlers and callbacks for each draggable element for
     * drag and drop.
     *
     * @param element {angular.element} The element representing the draggable.
     * @param eventName {string} The event name to setup for the element.
     * @param callback {Function} The callback function for the event.
     * @param storeId {boolean} Determines if element id is stored.
     */
    function setupEvent(element, eventName, callback, storeId) {
        element.on(eventName, function (event) {
            if (storeId) {
                event.dataTransfer.setData('text/plain', element.attr('id'));
            }

            if (angular.isFunction(callback)) {
                callback(event, element, element.data().dragData);
            }
        });
    }
}());

(function () {
    'use strict';

    /**
     * The html5Drop directive allows the author to designate the elements that
     * they want to be valid dropzones for dragged elements. These elements
     * will then be given the proper values and logic to make them dropzones on
     * the screen. This directive will NOT make use of the jquery library
     * beyond the jqlite provided by angular. The following options are
     * available.
     *
     *     - onDragEnter:
     *         Example: (<div html5-drop on-drag-enter='{function_name}></div>)
     *         The name of the method to fire when the draggable element first
     *         moves over the dropzone. You only want to include the method
     *         name. The method will then be fired with the following
     *         attributes:
     *             1) Event - the event caused by the drag enter.
     *             2) Dropzone - the element representing the dropzone.
     *             3) Dragged - the element being dragged into the area.
     *             4) Data - the dragged data from the dragged element.
     *
     *     - onDragOver:
     *         Example: (<div html5-drop on-drag-over='{function_name}'></div>)
     *         The name of the method to fire as the draggable element is
     *         moving across the screen. This method is given the same data as
     *         onDragEnter event. This method will also be fired numerous
     *         times, so be very careful to ensure that you don't use process
     *         intensive logic here.
     *
     *     - onDragLeave:
     *         Example: (<div html5-drop on-drag-leave='{function_name}'></div>)
     *         The name of the method to fire once the draggable element leaves
     *         a valid dropzone. Receives the same parameters as the
     *         onDragEnter event.
     *
     *     - onDrop:
     *         Example: (<div html5-drop on-drop='{function_name}'></div>)
     *         The name of the method to fire when the draggable item is
     *         dropped. This will allow the final logic that completes the drag
     *         and drop cycle. Received the same parameters as the onDragEnter
     *         method.
     */
    angular.module('html5DragDrop').directive('html5Drop', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onDragEnter = scope.$eval(attrs.onDragEnter),
                    onDragOver  = scope.$eval(attrs.onDragOver),
                    onDragLeave = scope.$eval(attrs.onDragLeave),
                    onDrop      = scope.$eval(attrs.onDrop);

                // Assign event handlers to dragging events.
                //         element, event,       callback,    preventDefault
                setupEvent(element, 'dragenter', onDragEnter, true );
                setupEvent(element, 'dragover',  onDragOver,  true );
                setupEvent(element, 'dragleave', onDragLeave, false);
                setupEvent(element, 'drop',      onDrop,      true );
            }
        };
    });

    /**
     * Sets up the event handlers and callbacks for each dropzone event for
     * drag and drop.
     *
     * @param element {angular.element} The element representing the dropzone.
     * @param eventName {string} The event name to setup for the element.
     * @param callback {Function} The callback function for the event.
     * @param preventDefault {boolean} Determines if prevent default is called.
     */
    function setupEvent(element, eventName, callback, preventDefault) {
        element.on(eventName, function (event) {
            if (preventDefault) { event.preventDefault(); }

            if (angular.isFunction(callback)) {
                var dragElementId = event.dataTransfer.getData('text/plain'),
                    draggedEl = angular.element(document.getElementById(dragElementId));
                callback(event, element, draggedEl, draggedEl.data().dragData);
            }
        });
    }
}());
