# AngularJS / SailsJS / Restangular generator
[![Build Status](https://secure.travis-ci.org/chiefy/generator-sails-angular.png?branch=master)](https://travis-ci.org/chiefy/generator-sails-angular)

## Requires Sails 0.9.x

Generates a scaffold of a project based off of the latest generator-angular-ui-router:app and includes: SailsJS for creating a simple RESTful API backend, Protractor for E2E & Twitter Bootstrap. 

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generators: `npm install -g generator-sails-angular generator-angular-ui-router`
- Create project directory and `cd` into it: `mkdir my-new-project && cd $_`
- Run: `yo sails-angular [app-name]`
- To run project: `sails lift`
- To test: `grunt test`

## TODO
 * Grunt live-reload, server doesn't work :(
 * Make sure CoffeeScript and SASS works
 * Use Jade for templating by default

## Help!

If you like the stack used by this project, please help out. Would fx be nice with a dedicated MEAN like twist to this for Mongoose ;)
I also want to use Jade as the default templating language...
 
## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
