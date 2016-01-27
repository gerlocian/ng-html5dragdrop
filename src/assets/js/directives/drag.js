(function () {
    'use strict';

    var instance;

    /**
     * The html5Drag directive allows the author to designate the elements that
     * they want to be draggable. These elements will then be given the proper
     * values and logic to make them draggable on the screen.
     *
     * Available attributes include:
     *     - html5-drag-options: Allows the author to define handlers and
     *          options.
     */
    var DragDirective = function () {
        var vm = this;

        vm.restrict = 'A';
        vm.link = this.getLink();

        vm.scope = {
            onDragStart: '=',
            onDrag: '=',
            onDragEnd: '=',
            dragData: '='
        };
    };
    DragDirective.prototype = {};
    DragDirective.prototype.constructor = DragDirective;

    /**
     * Returns the link function for the directive.
     * @returns {Function}
     */
    DragDirective.prototype.getLink = function () {
        return function (scope, element) {
            element.attr('draggable', true);

            element.on('dragstart', function (event) {
                if (angular.isFunction(scope.onDragStart))
                    scope.onDragStart(event, scope.dragData);
            });

            element.on('drag', function (event) {
                if (angular.isFunction(scope.onDrag))
                    scope.onDrag(event, scope.dragData);
            });

            element.on('dragend', function (event) {
                if (angular.isFunction(scope.onDragEnd))
                    scope.onDragEnd(event, scope.dragData);
            });
        };
    };

    instance = new DragDirective();

    angular.module('html5DragDrop').directive('html5Drag', function () { return instance; });

}());
