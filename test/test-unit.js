/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;


describe('protractor unit test generator', function() {
  var app;

  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err);
      }

      app = helpers.createGenerator('sails-angular:app', [
        '../../app'
      ]);
      done();
    });
  });

  /**
   * Create a protractor project.
   * @param {string} configFileName Protractor config name.
   */
  var createProject = function() {
    app.options['skip-install'] = true;
    app.run({}, function() {
    });
  };

  describe('Project creation', function() {
    it('should create config file and package.json', function(done) {
      app.options['skip-install'] = true;
      app.run({}, function() {

        // Ensure the configuration and the package.json files were created.
        helpers.assertFiles([
          'configProtractor.js',
          'package.json',
          'README_Protractor.md'
        ]);

        // Ensure the configuration file contains the timeout.
        helpers.assertFiles([
          ['configProtractor.js', /4000/]
        ]);

        done();
      });
    });
  });

  describe('Unit test creation', function() {
    var generator;

    /**
     * Call the sub-generator to create a unit test.
     * @param {string} configName Protractor configuration file name.
     */
    var createUnitTest = function(configName) {
      createProject(configName);
      generator = helpers.createGenerator('sails-angular:unit', [
        '../../unit'
      ], 'my-test');
    };

    /**
     * Make sure the uni test was added to the config file.
     * @param {string} configName Protractor configuration file name.
     * @param {function} done Done callback.
     */
    var ensureUnitTestWasAddedToConfig = function(configName, done) {
      generator.run({}, function() {
        // Ensure the unit test file was created.
        helpers.assertFiles([
          'spec/my-test-spec.js',
          configName
        ]);

        // And ensure the config file contains the unit test.
        helpers.assertFiles([
          [configName, /'spec\/my-test-spec.js'/]
        ]);

        done();
      });
    };

    it('should create a protractor unit test', function(done) {
      var configName = 'protractorConfig.js';

      createUnitTest(configName);

      helpers.mockPrompt(generator, {
        'testType': 'protractor'
      });

      ensureUnitTestWasAddedToConfig(configName, done);
    });
  });
});
