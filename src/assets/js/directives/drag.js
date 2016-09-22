/*eslint angular/di: 0 */
(function () {
    'use strict';

    var currentIdNum = 0;

    /**
     * The html5Drag directive allows the author to designate the elements that
     * they want to be draggable. These elements will then be given the proper
     * values and logic to make them draggable on the screen. This directive
     * will NOT make use of the jquery library beyond the jqlite provided by
     * angular. The following options are available.
     *
     *     - dragData:
     *         Example: (<div html5-drag drag-data='{object}'></div>)
     *         The data to apply to the dragged element. In standard HTML5 drag
     *         and drop, we are limited to strings. Through the power of
     *         angular, we can drag the data that we want along with us.
     *
     *     - onDragStart (event, element, data):
     *         Example: (<div html5-drag on-drag-start='{function_name}></div>)
     *         A method invocation that returns the callback to fire when the
     *         draggable element starts to move. The callback will then be
     *         fired with the event data as the first parameter and the
     *         dragData as the second if available.
     *
     *     - onDrag (event, element, data):
     *         Example: (<div html5-drag on-drag='{function_name}'></div>)
     *         A method invocation that returns the callback to fire as the
     *         draggable element is moved across the screen. This method will
     *         also be fired numerous times, so be very careful to ensure that
     *         you don't use process intensive logic here.
     *
     *     - onDragEnd (event, element, data):
     *         Example: (<div html5-drag on-drag-end='{function_name}'></div>)
     *         A method invocation that returns the callback to fire once the
     *         draggable element is released. This method will fire whether or
     *         not the element was dragged and released into a valid drop zone.
     */
    angular.module('html5DragDrop').directive('html5Drag', ['$log', function ($log) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                // Assign a unique id to the element if it has no id.
                if (!element.attr('id')) {
                    element.attr('id', generateUniqueId());
                }

                var dragData        = scope.$eval(attrs.dragData),
                    transferType    = scope.$eval(attrs.transferType) || attrs.transferType || 'text',
                    transferData    = scope.$eval(attrs.transferData) || attrs.transferData || element.attr('id'),
                    onDragStart     = scope.$eval(attrs.onDragStart),
                    onDrag          = scope.$eval(attrs.onDrag),
                    onDragEnd       = scope.$eval(attrs.onDragEnd);

                // Ensure that the transferType and transferData are both set if either is set.
                if ((attrs.transferType && !attrs.transferData) || (attrs.transferData && !attrs.transferType)) {
                    $log.error('Transfer-type and transfer-data must both be provided. Ignoring both...');
                    transferType = 'text';
                    transferData = element.attr('id');
                }

                // Add attributes to the element to make it draggable.
                element.attr('draggable', true);
                element.data('dragData', dragData);

                element.on('dragstart', function (event) {
                    var dataTransfer = event.dataTransfer || event.originalEvent.dataTransfer;
                    dataTransfer.setData(transferType, transferData);
                    angular.element(document.getElementsByClassName('dragging')).removeClass('dragging');
                    element.addClass('dragging');

                    if (angular.isFunction(onDragStart)) {
                        onDragStart(event, element, element.data('dragData'));
                    }
                });

                element.on('drag', function (event) {
                    if (angular.isFunction(onDrag)) {
                        onDrag(event, element, element.data('dragData'));
                    }
                });

                element.on('dragend', function (event) {
                    element.removeClass('dragging');

                    if (angular.isFunction(onDragEnd)) {
                        onDragEnd(event, element, element.data('dragData'));
                    }
                });
            }
        };
    }]);

    /**
     * Generates a unique id for the element in the event that the element does
     * not have an id. This is needed so that the drag can assign an id to the
     * dataTransfer so that the end of the drag events can determine which
     * element was dragged.
     *
     * @return {string} The new unique id for the element.
     */
    function generateUniqueId() {
        if (!currentIdNum) {
            currentIdNum = 0;
        }

        currentIdNum += 1;
        return 'draggable-id-' + currentIdNum;
    }
}());
