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
        }
    });

    /**
     * Sets up the event handlers and callbacks for each dropzone event for
     * drag and drop.
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
