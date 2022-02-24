/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const propertiesReader = require('properties-reader');
const scanner = require('sonarqube-scanner');

const options = propertiesReader('./sonar-project.properties');

const properties = options._properties;
properties['sonar.login'] = 'admin';
properties['sonar.password'] = 'sonar';
scanner(
  {
    serverUrl: 'http://192.168.0.15:9000',
    options: properties,
  },
  () => process.exit()
);
