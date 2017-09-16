import angular from 'angular';
import AppCtrl from './AppCtrl';
import AutoInput from './AutoInput';

angular.module('App', []);

angular.module('App').controller('AppCtrl', AppCtrl);

angular.module('App').directive('autoInput', AutoInput);
