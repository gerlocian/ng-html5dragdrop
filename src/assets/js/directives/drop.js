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
    angular.module('htmlDragDrop').directive('htmlDrop', function () {
        return {
            restrict: 'A',
            scope: {
                onDragEnter: '=',
                onDragExit: '=',
                onDragLeave: '=',
                onDragOver: '=',
                onDrop: '='
            },
            link: function (scope, element) {
                element.attr('droppable', true);

                element.on('dragover', function (event) {
                    event.preventDefault();
                });

                element.on('drop', function (event) {
                    var id = event.dataTransfer.getData('text/plain'),
                        el = document.getElementById(id),
                        element = angular.element(el);

                    if (angular.isFunction(scope.onDrop))
                        scope.onDrop(event, element, element.data());
                });
            }
        }
    });
}());
