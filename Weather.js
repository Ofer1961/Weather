$(function(){
	
	var apikey = '1e408e56e68d241ef3c9c87b5b5339ae'; // my key
	var apiUrl = 'https://api.forecast.io/forecast/';
	var suffix = '?units=si&callback=?';
	
	
	var skycons = new Skycons({"color": "black"});
	// start animation!
	skycons.play();

	navigator.geolocation.getCurrentPosition(sucess, error);
	
	function sucess(position){
		console.log('Successfully got Weather.');
		
		var lon = position.coords.longitude;
		var lat = position.coords.latitude;
		
		$.getJSON(apiUrl + apikey + '/' + lat + ',' + lon + suffix,function(data){
			console.log(data);			

			var timezone = data.timezone;
			var icon = data.currently.icon;
			var temperature = data.currently.temperature;
			var summary = data.currently.summary;
			var daily = data.daily.data;
			var iconName = "";

			document.getElementById("Lat").innerHTML = lat;
			document.getElementById("Long").innerHTML = lon;
			document.getElementById("Location").innerHTML = timezone;
			skycons.set("icon1", icon);
			document.getElementById("Desc0").innerHTML = icon;
			document.getElementById("Temp").innerHTML = temperature;
			document.getElementById("Summary").innerHTML = summary;
			
			for(var j = 0;j<8;j++){ // daily information.
				skycons.set("icon_" + j, daily[j].icon);
				document.getElementById("Desc_"+j).innerHTML = daily[j].icon;
				document.getElementById("Min_"+j).innerHTML = 'Min: ' + daily[j].temperatureMin;
				document.getElementById("Max_"+j).innerHTML = 'Max: ' + daily[j].temperatureMax;
			}
		});
	}
	
	function error(){
		console.log('UnSuccessfull. Did not get weather.');
	}
})	
	
