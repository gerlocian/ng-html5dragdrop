(function () {
    'use strict';

    angular.module('html5DragDrop').directive('html5Drop', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onDragEnter = scope.$eval(attrs.onDragEnter);

                // Assign event handlers to dragging events.
                element.on('dragenter', function (event) {
                    event.preventDefault();

                    if (angular.isFunction(onDragEnter)) {
                        var dragElementId = event.dataTransfer.getData('text/plain'),
                            draggedEl = angular.element(document.getElementById(dragElementId));
                        onDragEnter(event, element, draggedEl, draggedEl.data().dragData);
                    }
                });
            }
        }
    });
}());
