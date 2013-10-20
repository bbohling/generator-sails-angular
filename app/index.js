'use strict';
var util = require('util');
var path = require('path');
var exec = require('child_process').exec;
var yeoman = require('yeoman-generator');
var rimraf = require('rimraf');

var SailsAngularGenerator = module.exports = function SailsAngularGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  
  this.env.register('generator-angular','angular');

  this.angularGen = this.env.create('angular:app',{ options: { 'skip-install':true } });

  // Prevent angular:app from running npm install && bower install
  // we'll do that when we're done here
  this.angularGen.removeAllListeners('end');
  
  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};
 
util.inherits(SailsAngularGenerator, yeoman.generators.Base);

SailsAngularGenerator.prototype.askFor = function askFor() {
  var cb = this.async(),
      that = this;

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
      name: 'includeRequireJS',
      message: 'Would you like to include RequireJS (for AMD support)?'
  }];

  var scope = this;

  this.prompt(prompts, function (props) {
    this.includeRequireJS = props.includeRequireJS;
    runAngularGenerator(scope)
    
  }.bind(this));


  var runAngularGenerator = function(_scope) {
    _scope.angularGen.on('end',function() {    
      that.bootstrap = that.angularGen.bootstrap;
      that.compassBootstrap = that.angularGen.compassBootstrap;
      that.resourceModule = that.angularGen.resourceModule;
      that.cookiesModule = that.angularGen.cookiesModule;
      that.sanitizeModule = that.angularGen.sanitizeModule;

      var filesToNix = [
        '.editorconfig',
        '.gitignore',
        '.jshintrc',
        'Gruntfile.js',
        'package.json',
        'bower.json',
        'app/scripts/app.js',
        'app/scripts/controllers/main.js',
        'app/views/main.html',
        'app/index.html',
        'test/spec/controllers/main.js',
        'karma.conf.js'
      ];

      filesToNix.forEach(function(file){
        rimraf.sync(file);
      });
      cb();
    });  
    
    _scope.angularGen.run();    
  }        

};

SailsAngularGenerator.prototype.app = function app() {
  
  this.copy('app.js');
  this.template('views/layout.ejs');
  this.copy('views/404.ejs');
  this.copy('views/500.ejs');  
  this.copy('views/main.html','app/views/main.html');
  this.template('scripts/app.js','app/scripts/app.js');
  this.template('scripts/controllers/main.js','app/scripts/controllers/main.js');
  this.template('test/spec/controllers/main.js');
  this.directory('views/home');
  this.directory('api');
  this.directory('assets');
  this.directory('config');
  
};

SailsAngularGenerator.prototype.projectfiles = function projectfiles() {
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  
  this.copy('karma.conf.js');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('Gruntfile.js');

};

// Another option is to simply duplicate the basic functionality found in generator-protractor
// In order to avoid any prolems with package.json
// SailsAngularGenerator.prototype.e2eConfig = function e2eConfig() {
//   var exec = require('child_process').exec,
//       child;

//   var runProtractor = function() {
//     console.log('Note: Please, do NOT overwrite your existing package.json file with this generator!!')
//     exec('yo protractor', function(error, stdout, stderr) {});
//   }

//   var installProtractor = function() {
//     exec('npm install generator-protractor', function (error, stdout, stderr) {
//       if (error !== null) {
//         console.log('error on: npm install generator-protractor > ' + error);
//       } else {
//         runProtractor();
//       }
//     });                
//   }

//   child = exec('npm search generator-protractor', function (error, stdout, stderr) {    
//     if (error !== null) {
//       console.log('error on: npm search generator-protractor > ' + error);
//     } else {
//       if (stdout !== null && !stdout.contains('generator-protractor')) {
//         installProtractor();
//       } else {
//         runProtractor();
//       }        
//     }
//   });

//   console.log("Attempting to add protractor as a dev dependency in package.json")
//   // Add protractor to devDependencies of package.json
//   this.packageFile = this.readFileAsString(path.join(this.sourceRoot(), '../../package.json'));
//   this.packageFile.replace('"devDependencies": {', '"devDependencies": {\n  "protractor": "~0.10.0",\n');  
// };


SailsAngularGenerator.prototype.spec = function spec() {
  this.mkdir('spec');
};

SailsAngularGenerator.prototype.protractorFiles = function() {
  this.copy('protractorConfig.js');
  this.copy('README_Protractor.md');
};
