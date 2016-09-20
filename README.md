Angular HTML5 Drag and Drop
===========================
A pure HTML5 Drag and Drop Angular module.

[![Build Status](https://travis-ci.org/gerlocian/ng-html5dragdrop.svg?branch=master)](https://travis-ci.org/gerlocian/ng-html5dragdrop)
[![Dependency Status](https://david-dm.org/gerlocian/ng-html5dragdrop.svg)](https://david-dm.org/gerlocian/ng-html5dragdrop)
[![devDependency Status](https://david-dm.org/gerlocian/ng-html5dragdrop/dev-status.svg)](https://david-dm.org/gerlocian/ng-html5dragdrop#info=devDependencies)

## Installation
To install, you can either use Bower or NPM.

#### Bower
```bash
$ bower install ng-html5dragdrop --save
```

#### NPM
```bash
$ npm install ng-html5dragdrop --save
```

## Usage
Once installed, you will want to include either `ng-html5dragdrop.js` or `ng-html5dragdrop.min.js` to your html markup. Both files are found in [dist](https://github.com/gerlocian/ng-html5dragdrop/tree/master/dist/).
```
<script src="{path_to_dist}/dist/ng-html5dragdrop.js"></script>
or
<script src="{path_to_dist}/dist/ng-html5dragdrop.min.js"></script>
```

After the chosen javascript file is included in your markup, you will need to add the module to your application's dependencies.
```
angular.module('myApp', ['html5DragDrop']);
```

At this point, you can start adding the directives to your elements.
```
<div html5-drag id="myDraggableElement">This is Draggable</div>
<div html5-drop id="myDropzoneElement">This is a Dropzone</div>
```

## Customizing the behavior
The HTML5 Drag and Drop module allows you to add additional functionality through the use of callbacks that you provide with methods on the element through directive attributes. Each directive (`html5-drag` and `html5-drop`) allows you to add methods that will provide a callback for the event to which you want to add functionality.

#### Drag
For the draggable element, you can add `drag-data`, `on-drag-start`, `on-drag`, and `on-drag-end` callbacks for those methods. All of these methods are optional, but if you don't include any of them, your application won't have much drag and drop functionality. Each callback (except `drag-data`) should expect to receive the following three parameters:

1. event - The event fired for the drag start.
1. element - The element being dragged.
1. data - The data provided by the drag-data attribute.

##### drag-data (optional)
This attribute allows you to add arbitrary data that you want to move along with the dragged element. Every event that fires once the drag starts will have access to this data, including the events fired by the dropzone.

*js*
```
angular.module('myApp', ['html5DragDrop']).controller('MyController', function ($scope) {
    $scope.myStuff = {
        name: 'Patrick Ortiz',
        profession: 'Web Developer'
    };
});
```

*html*
```
<body ng-controller="MyController">
    <div html5-drag drag-data="myStuff">Drag Element</div>
</body>
```

##### transfer-type (optional, but if used, you must specify transfer-data)
This attribute allows you to specify the type of data that will be assigned to dataTransfer. This is separate from drag-data above. "transfer-type" can be any type of value, but in most cases, a string will make the most sense. While before we were only able to use "text", this attribute allows you to specify other types. If you provide a value for this attribute, you must also provide one for "transfer-data" in order to specify what data you want to have the dataTransfer method move around. If you don't, the directive will resort to using default values and an error will be placed in the console.

*js*
```
angular.module('myApp', [html5DragDrop]).controller('MyController', function ($scope) {
    $scope.myStuff = {
        name: 'Patrick Ortiz',
        profession: 'Web Developer'
    };
    $scope.transferData = JSON.stringify($scope.myStuff);
});
```

*html*
```
<body ng-controller="MyController">
    <div html5-drag transfer-type="json" transfer-data="transferData">Drag Element</div>
</body>
```

##### transfer-data (optional, but if used, you must specify transfer-type)
This attribute allows you to specify the data that will be assigned to dataTransfer. This is separate from drag-data above. "transfer-data" can be any type of value. While before we were only able to use the element id before, this attribute allows you to specify other data. If you provide a value for this attribute, you must also provide one for "transfer-type" in order to specify what type of data you want to have the dataTransfer method move around. If you don't, the directive will resort to using default values and an error will be placed in the console.

*js*
```
angular.module('myApp', [html5DragDrop]).controller('MyController', function ($scope) {
    $scope.myStuff = {
        name: 'Patrick Ortiz',
        profession: 'Web Developer'
    };
    $scope.transferData = JSON.stringify($scope.myStuff);
});
```

*html*
```
<body ng-controller="MyController">
    <div html5-drag transfer-type="json" transfer-data="transferData">Drag Element</div>
</body>
```

##### on-drag-start (optional)
The callback is fired when the draggable element first starts to move. In the main directive, this is when we create an id for the element if it doesn't exist, store the element's id in the dataTransfer object of the event, and fire the provided callback.

*js*
```
angular.module('myApp', ['html5DragDrop']).controller('MyController', function ($scope) {
    $scope.myStuff = {
        name: 'Patrick Ortiz',
        profession: 'Web Developer'
    };
    
    // Remember: return the actual callback.
    $scope.onDragStart = function () {
        return function (event, draggedElement, data) {
            console.log('Element has started being dragged!');
        }
    };
});
```

*html*
```
<body ng-controller="MyController">
    <div html5-drag drag-data="myStuff" on-drag-start="onDragStart()">Drag Element</div>
</body>
```

##### on-drag (optional)
The callback is fired every so many milliseconds as the draggable element is moving. Because of the repeated nature of this callback, it is best to be careful not to make your callback too process intensive.

*js*
```
angular.module('myApp', ['html5DragDrop']).controller('MyController', function ($scope) {
    $scope.myStuff = {
        name: 'Patrick Ortiz',
        profession: 'Web Developer'
    };
    
    // Remember: return the actual callback.
    $scope.onDrag = function () {
        return function (event, draggedElement, data) {
            console.log('Element is moving!');
        }
    };
});
```

*html*
```
<body ng-controller="MyController">
    <div html5-drag drag-data="myStuff" on-drag="onDrag()">Drag Element</div>
</body>
```

##### on-drag-end (optional)
The callback is fired when the draggable element has been dropped. This can happen for any reason, and does not need to be because it was dropped into a valid dropzone.

*js*
```
angular.module('myApp', ['html5DragDrop']).controller('MyController', function ($scope) {
    $scope.myStuff = {
        name: 'Patrick Ortiz',
        profession: 'Web Developer'
    };
    
    // Remember: return the actual callback.
    $scope.onDragEnd = function () {
        return function (event, draggedElement, data) {
            console.log('Element has been dropped!');
        }
    };
});
```

*html*
```
<body ng-controller="MyController">
    <div html5-drag drag-data="myStuff" on-drag-end="onDragEnd()">Drag Element</div>
</body>
```

#### Drop
For the dropzone element, you can add `on-drag-enter`, `on-drag-over`, `on-drag-leave`, and `on-drop` callbacks for those methods. All of these methods are optional, but if you don't include any of them, your application won't have much drag and drop functionality. Each callback should expect to receive the following four parameters:

1. event - The event fired for the drag start.
1. dropzone - The dropzone element firing the events.
1. draggable - The element being dragged.
1. data - The data provided by the drag-data attribute on the draggable element.

##### on-drag-enter (optional)
The callback is fired when the draggable element is first dragged into the boundries of the dropzone.

*js*
```
angular.module('myApp', ['html5DragDrop']).controller('MyController', function ($scope) {
    $scope.myStuff = {
        name: 'Patrick Ortiz',
        profession: 'Web Developer'
    };
    
    $scope.onDragEnter = function () {
        return function (event, dropzone, draggable, data) {
            console.log('Element has entered the dropzone!');
        }
    };
});
```

*html*
```
<body ng-controller="MyController">
    <div html5-drag drag-data="myStuff">Drag Element</div>
    <div html5-drop on-drag-enter="onDragEnter()">Dropzone Element</div>
</body>
```

##### on-drag-over (optional)
The callback is fired as the draggable element moves over the dropzone. Because of the repeated nature of this callback, it is best to be careful not to make your callback too process intensive. 

*js*
```
angular.module('myApp', ['html5DragDrop']).controller('MyController', function ($scope) {
    $scope.myStuff = {
        name: 'Patrick Ortiz',
        profession: 'Web Developer'
    };
    
    $scope.onDragOver = function () {
        return function (event, dropzone, draggable, data) {
            console.log('Element is moving over the dropzone!');
        }
    };
});
```

*html*
```
<body ng-controller="MyController">
    <div html5-drag drag-data="myStuff">Drag Element</div>
    <div html5-drop on-drag-over="onDragOver()">Dropzone Element</div>
</body>
```

##### on-drag-leave (optional)
The callback is fired when the dragged element is moved out of the bounds of the dropzone. 

*js*
```
angular.module('myApp', ['html5DragDrop']).controller('MyController', function ($scope) {
    $scope.myStuff = {
        name: 'Patrick Ortiz',
        profession: 'Web Developer'
    };
    
    $scope.onDragLeave = function () {
        return function (event, dropzone, draggable, data) {
            console.log('Element has left the dropzone!');
        }
    };
});
```

*html*
```
<body ng-controller="MyController">
    <div html5-drag drag-data="myStuff">Drag Element</div>
    <div html5-drop on-drag-leave="onDragLeave()">Dropzone Element</div>
</body>
```

##### on-drop (optional)
The callback is fired when the draggable element has been dropped into the dropzone.

*js*
```
angular.module('myApp', ['html5DragDrop']).controller('MyController', function ($scope) {
    $scope.myStuff = {
        name: 'Patrick Ortiz',
        profession: 'Web Developer'
    };
    
    $scope.onDrop = function () {
        return function (event, dropzone, draggable, data) {
            console.log('Element has been dropped into the dropzone!');
        }
    };
});
```

*html*
```
<body ng-controller="MyController">
    <div html5-drag drag-data="myStuff">Drag Element</div>
    <div html5-drop on-drop="onDrop()">Dropzone Element</div>
</body>
```

## Examples

1. [Box Move](https://github.com/gerlocian/ng-html5dragdrop/tree/master/examples/box-move.html) - Simple box move between different dropzones.
1. [Color Change](https://github.com/gerlocian/ng-html5dragdrop/tree/master/examples/color-change.html) - Change the color of the dropzone by dragging the colors into it.
1. [Sort](https://github.com/gerlocian/ng-html5dragdrop/tree/master/examples/sort.html) - Simple and rudimentary sorting.

## Development
During development of this module, I wanted to follow these rules:

1. No JQuery or JQuery UI beyond what is provided by jqLite from AngularJS.
1. Do not move the draggable element with javascript outside of the normal drag and drop functionality of HTML5.
1. Do not overcomplicate the interface. Only worry about setting up the drag and drop and allow the author to worry about what to do with it.

Install the dependencies:
```bash
# NPM Globals
$ npm install karma gulp bower -g

# NPM Local
$ npm install

# Bower
$ bower install
```

Run Karma for unit testing:
```bash
$ karma start karma.conf.js
```
