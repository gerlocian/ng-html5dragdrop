/*eslint angular/di: 0 */
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
     *     - onDragEnter (event, dropzone, draggedElement, data):
     *         Example: (<div html5-drop on-drag-enter='{function_name}></div>)
     *         A method invocation that returns the callback to fire when the
     *         draggable element first moves over the dropzone.
     *
     *     - onDragOver (event, dropzone, draggedElement, data):
     *         Example: (<div html5-drop on-drag-over='{function_name}'></div>)
     *         A method invocation that returns the callback to fire as the
     *         draggable element is moving across the dropzone. This method
     *         will be fired numerous times, so be very careful to ensure that
     *         you don't use process intensive logic here.
     *
     *     - onDragLeave (event, dropzone, draggedElement, data):
     *         Example: (<div html5-drop on-drag-leave='{function_name}'></div>)
     *         A method invocation that returns the callback to fire once the
     *         draggable element leaves a valid dropzone.
     *
     *     - onDrop (event, dropzone, draggedElement, data):
     *         Example: (<div html5-drop on-drop='{function_name}'></div>)
     *         A method invocation that returns the callback to fire when the
     *         draggable item is dropped. This will allow the final logic that
     *         completes the drag and drop cycle.
     */
    angular.module('html5DragDrop').directive('html5Drop', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onDragEnter = scope.$eval(attrs.onDragEnter),
                    onDragOver  = scope.$eval(attrs.onDragOver),
                    onDragLeave = scope.$eval(attrs.onDragLeave),
                    onDrop      = scope.$eval(attrs.onDrop);

                element.on('dragenter', function (event) {
                    event.preventDefault();

                    if (angular.isFunction(onDragEnter)) {
                        var draggedNode = document.getElementsByClassName('dragging')[0],
                            draggedEl = angular.element(draggedNode);
                        onDragEnter(event, element, draggedEl, draggedEl.data('dragData'));
                    }
                });

                element.on('dragover', function (event) {
                    event.preventDefault();

                    if (angular.isFunction(onDragOver)) {
                        var draggedNode = document.getElementsByClassName('dragging')[0],
                            draggedEl = angular.element(draggedNode);
                        onDragOver(event, element, draggedEl, draggedEl.data('dragData'));
                    }
                });

                element.on('dragleave', function (event) {
                    if (angular.isFunction(onDragLeave)) {
                        var draggedNode = document.getElementsByClassName('dragging')[0],
                            draggedEl = angular.element(draggedNode);
                        onDragLeave(event, element, draggedEl, draggedEl.data('dragData'));
                    }
                });

                element.on('drop', function (event) {
                    event.preventDefault();

                    if (angular.isFunction(onDrop)) {
                        var dataTransfer = event.dataTransfer || event.originalEvent.dataTransfer,
                            dragElementId = dataTransfer.getData('text'),
                            draggedEl = angular.element(document.getElementById(dragElementId));
                        onDrop(event, element, draggedEl, draggedEl.data('dragData'));
                    }
                });
            }
        };
    });
}());
