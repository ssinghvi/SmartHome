var app = angular.module('SmartHome', ['services'])

.controller('MainCtrl', function($scope, $log, WeatherFactory) {
	$scope.data = WeatherFactory.data;
});

var services = angular.module('services', []);
services.factory('WeatherFactory', function($http, $log) {
	var data = { currentConditions: null };

	var ws = {
		lang: 'en',
		intervalId: null,
		refreshTime: 10000,
		apiBase: 'http://api.openweathermap.org/data/',
		apiVersion: '2.5',
		currentEndpoint: 'weather',
		applicationId: '456030183535f3aa5fde8406a5d127b1'
	}

	var	init = function() {
		$log.info('Weather', 'Initialize Service');
		ws.intervalId = setInterval(function() {
			updateCurrentWeather();
		}, ws.refreshTime);
	}

	var roundValue = function(temperature) {
		return parseFloat(temperature).toFixed(1);
	}

	var updateCurrentWeather = function() {
		$log.info('Weather','Updating Current Weather');
		$http.get(ws.apiBase + ws.apiVersion + '/' + ws.currentEndpoint + '?zip=94044' + '&appid=' + ws.applicationId)
		.success(function(d) {
			$log.info('Weather', d);
			data.currentConditions = d;
		})
		.error(function(e) {
			$log.error('Weather', e);
			data.currentConditions = null;
		});
	}

	init();

	return {
		data: data
	};

});