$(document).ready(getLocation)





function getLocation(){
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(function(pos){
			var displayData = $('#displayData');
			var crd = pos.coords;
			var times = SunCalc.getTimes(new Date(),crd.latitude,crd.longitude);
			console.log("times dusk " + times.dusk);
			

			displayData.html("times dusk " + (times.sunset.getHours() % 12 || 12 )+ " pm");

			var sunriseStr =  times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
			console.log(sunriseStr);
			
			var moonInfo= SunCalc.getMoonIllumination(new Date());
			var moonPhase = moonInfo.phase;
			var moonText = findMoonPhase(moonPhase);

			console.log("Current Moon Phase (as text): " + moonText);
			console.log("Test for above 0.26 :" + findMoonPhase(0.26));
			console.log("Test for above 0.40 :" + findMoonPhase(0.50));
			console.log("Test for above 0.75 :" + findMoonPhase(1.00));
			console.log("Current Moon Phase:(between 0 - 1): " + moonPhase );

		});
	}


}

function findMoonPhase(moonPhs){
	  var moonPhStr = "";
		if(moonPhs == 0){
			moonPhs = "New Moon";

		}else if(moonPhs > 0 && moonPhs < 0.25){
			moonPhStr = "Waxing Crescent";
		}else if(moonPhs == 0.25){
			moonPhStr = "First Quarter";
		}else if(moonPhs > 0.25 && moonPhs < 0.50 ){
			moonPhStr = "Waxing Gibbous";
		}else if(moonPhs == 0.50){
			moonPhStr="Full Moon";
		}else if(moonPhs > 0.50 && moonPhs < 0.75){
			moonPhStr="Last Quarter";
		}else if( moonPhs >= 0.75 && moonPhs <= 1.00){
			moonPhStr ="Waning Crescent";
		}



		return moonPhStr;
}


