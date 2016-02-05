Angular HTML5 Drag and Drop
===========================
A pure HTML5 Drag and Drop Angular module.

## Installation
To install, you can either use Bower or NPM.

##### Bower
```bash
$ bower install ng-html5dragdrop --save
```

##### NPM
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

