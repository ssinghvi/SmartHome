var app = angular.module('SmartHome', ['services', 'timeService'])

.controller('MainCtrl', function($scope, $log, WeatherFactory, TimeFactory) {
	$scope.data = WeatherFactory.data;
	$scope.wService = WeatherFactory.service;
	$scope.timeData = TimeFactory.data;
});


/* Time Service */
var timeService = angular.module('timeService', []);
timeService.factory('TimeFactory', function($log) {
	var data = {
		time: null, 
		date: null
	};

	var ws = {
		intervalId: null,
		refreshTime: 1000,
		timeFormat: 'hh:mm:ss'
	}

	var updateTime = function() {
		$log.info('Time', 'Tick');
		var _now = moment();
		data.time = _now.format(ws.timeFormat)
		data.date = _now.format('dddd, LL');
	}

	var init = function() {
		$log.info('Time', 'Initialize Service');
		ws.intervalId = setInterval(function() {
			updateTime();
		}, ws.refreshTime);
	}

	init();

	return {
		data: data,
		service: null
	};
});


/* Weather Service */
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
		applicationId: '456030183535f3aa5fde8406a5d127b1',
		iconTable: {
			'01d': 'wi-day-sunny',
			'02d': 'wi-day-cloudy',
			'03d': 'wi-cloudy',
			'04d': 'wi-cloudy-windy',
			'09d': 'wi-showers',
			'10d': 'wi-rain',
			'11d': 'wi-thunderstorm',
			'13d': 'wi-snow',
			'50d': 'wi-fog',
			'01n': 'wi-night-clear',
			'02n': 'wi-night-cloudy',
			'03n': 'wi-night-cloudy',
			'04n': 'wi-night-cloudy',
			'09n': 'wi-night-showers',
			'10n': 'wi-night-rain',
			'11n': 'wi-night-thunderstorm',
			'13n': 'wi-night-snow',
			'50n': 'wi-night-alt-cloudy-windy'
		}
	}

	var	init = function() {
		$log.info('Weather', 'Initialize Service');
		ws.intervalId = setInterval(function() {
			updateCurrentWeather();
		}, ws.refreshTime);
	}

	var updateCurrentWeather = function() {
		$log.info('Weather','Updating Current Weather');
		$http.get(ws.apiBase + ws.apiVersion + '/' + ws.currentEndpoint + '?zip=94105' + '&appid=' + ws.applicationId)
		.success(function(d) {
			data.currentConditions = d;
		})
		.error(function(e) {
			$log.error('Weather', e);
			data.currentConditions = null;
		});
	}

	init();

	return {
		data: data,
		service: ws
	};

});