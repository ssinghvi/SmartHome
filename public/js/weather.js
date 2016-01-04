var weather = {
	lang: 'en',
	intervalId: null,
	refreshTime: 30000,
	apiBase: 'http://api.openweathermap.org/data/',
	apiVersion: '2.5',
	currentEndpoint: 'weather',
	applicationId: '456030183535f3aa5fde8406a5d127b1',
	currentConditions: null
}

weather.roundValue = function(temperature) {
	return parseFloat(temperature).toFixed(1);
}

weather.updateCurrentWeather = function() {
	console.log('Weather #','Updating Current Weather');
	$.ajax({
		type: 'GET',
		url: weather.apiBase + weather.apiVersion + '/' + weather.currentEndpoint + '?zip=94536' + '&appid=' + weather.applicationId,
		dataType: 'json',
		success: function(data) {
			this.currentConditions = data;
		}.bind(this),
		error: function(e) {
			console.log(e);
		}
	});
}

weather.init = function() {
	console.log('Weather #','Initializing Service');
	this.intervalId = setInterval(function() {
		this.updateCurrentWeather();
	}.bind(this), this.refreshTime);
}