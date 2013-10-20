### E2E with Protractor

See [Protractor](https://github.com/angular/protractor)

How to run the tests:

1. Generate a Protractor test:
yo protractor:unit test-name

2. Download the Protractor dependencies:
./node_modules/protractor/bin/install_selenium_standalone

3. Start the Selenium server:
./selenium/start

4. Run Protractor:
./node_modules/protractor/bin/protractor protractorConfig

### Generate a unit test

To generate a protractor unit test just type:

```
$ yo protractor:unit my-test-name
```

### Installing selenium and running the tests

You need to download selenium and start it in your local machine. Just run the following command:

```
$ ./node_modules/protractor/bin/install_selenium_standalone
```

Start the selenium standalone server with:

```
./selenium/start
```

Open another terminal and run the integration tests:

```
$ ./node_modules/protractor/bin/protractor protractor-config.js
```

### Getting To Know Yeoman

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
