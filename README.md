scenario-list-widget-angular
============================

The AngularJS implementation of the Scenario List Widget Functional Building Block.

## Get started

Simply pull in the libraries and all the dependencies via [bower](http://bower.io/)

```sh
  bower install --save crisma-scenario-list-widget-angular
```

There is one directive available in this AngularJS module that is important for you:

```xml
  <scenario-worldstates-widget class="custom-list" selected-worldstate="activeWS"></scenario-worldstates-widget>
```

However, this will only work correctly if you provide info where to find the ICMM instance to use:

```javascript
angular.module(
    'myCoolModule'
).config(
  [
    '$provide',
    function ($provide) {
        'use strict';

        $provide.constant('CRISMA_DOMAIN', 'CRISMA');                       // the name of the CRISMA domain to use
        $provide.constant('CRISMA_ICMM_API', 'http://url/to/the/icmm/api'); // the url to the API of the ICMM instance to use
      }
    }
  ]
);

```

Put the directive in your html, provide the constants and bind your model to the selected worldstate.

### selected-worldstate
single worldstate object

## Demo
Simply checkout the project and put the app folder in your favourite web server, or even more simple, use grunt to fire up a web server for you

```sh
grunt serve
```

## Bootsrap based style

![bildschirmfoto vom 2014-06-06 14 08 15](https://cloud.githubusercontent.com/assets/1785245/3199950/9b4fcd10-ed73-11e3-970b-fba0ac76661d.png)

## Example for custom style

![bildschirmfoto vom 2014-06-06 14 12 13](https://cloud.githubusercontent.com/assets/1785245/3199966/bcc746f8-ed73-11e3-90a7-44463e6ea1a9.png)
