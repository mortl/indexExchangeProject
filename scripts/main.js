$(document).ready(function() {

    var debug = false;


    updateBackground(debug);
    displayMoonPhase();


});






//-----------------------------------------------------//


function updateBackground(debug) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {

            var crd = pos.coords;

            //This is the modified Suncalc which I found on Suncalc.net
            //I used this version to determine the times of the sun because it was better optimized then the original version.

            var times = SunCalc2.getDayInfo(new Date(), crd.latitude, crd.longitude, true);

            //Get the morningTwilight object to retrieve data on the various morning hours.
            var morningInfo = times.morningTwilight;

            //Get the nightTwilight object to retreive data on various night hours.
            var nightInfo = times.nightTwilight;



            //display debugging information.
            if(debug == true){
        
            console.log("times dusk " + formatTime(times.dusk, true));
            console.log("sunset start " + formatTime(times.sunset.start, true))
            console.log("sunset " + formatTime(times.sunset.end, true));
            console.log("sunrise " + formatTime(times.sunrise.start, true));
            console.log("sunrise end " + formatTime(times.sunrise.end, true));
            console.log("dawn " + formatTime(times.dawn));
            console.log("noon " + formatTime(times.transit, true));
            console.log("dusk " + formatTime(times.dusk));

            console.log("Dusk: " + dusk);
            console.log("Sunset : " + sunset);

            console.log("sunrise start: " + sunriseStart);
            console.log("sunrise end " + sunriseEnd);
            console.log("night start " + nightStart);
            console.log("morningStart: " + morningStart);
            console.log("morning end " + morningEnd);
        }



            var morningStart = morningInfo.astronomical.start.getHours();
            var morningEnd = morningInfo.civil.end.getHours();
            var noon = times.transit.getHours();
            var sunriseStart = times.sunrise.start.getHours();
            var sunriseEnd = times.sunrise.end.getHours();
            var nightStart = nightInfo.astronomical.start.getHours();
            
            var sunset = times.sunset.end.getHours();
            var dusk = times.dusk.getHours();
           
            
           


            var currentTime = new Date().getHours();
          
            if (0 <= currentTime && currentTime < morningStart) {
                $("html").addClass("dawn");
            }
            if (morningStart <= currentTime && currentTime < noon) {
                $("html").addClass('sunrise')
            }
            if (noon <= currentTime && currentTime < sunset) {
                $("html").addClass("day");
            }
            if (currentTime <= sunset && currentTime < dusk + 1) {
               
                $("html").addClass("sunset");
            }
            if (currentTime > dusk || currentTime <= 0) {
            
                $("html").addClass("night");
                
            }



        });
    }

}

function displayMoonPhase() {

    var moonInfo = SunCalc.getMoonIllumination(new Date());
    var moonPhase = moonInfo.phase;
    var moonText = findMoonPhase(moonPhase);

    console.log("Current Moon Phase (as text): " + moonText);
    //console.log("Test for above 0.26 :" + findMoonPhase(0.26));
    //console.log("Test for above 0.40 :" + findMoonPhase(0.50));
    //console.log("Test for above 0.75 :" + findMoonPhase(1.00));
    console.log("Current Moon Phase:(between 0 - 1): " + moonPhase);
    $('.moonPhase').html("Current moon phase: " + moonText);
}

function findMoonPhase(moonPhs) {
    var moonPhStr = "";
    if (moonPhs == 0) {
        moonPhs = "New Moon";

    } else if (moonPhs > 0 && moonPhs < 0.25) {
        moonPhStr = "Waxing Crescent";
    } else if (moonPhs == 0.25) {
        moonPhStr = "First Quarter";
    } else if (moonPhs > 0.25 && moonPhs < 0.50) {
        moonPhStr = "Waxing Gibbous";
    } else if (moonPhs == 0.50) {
        moonPhStr = "Full Moon";
    } else if (moonPhs > 0.50 && moonPhs < 0.75) {
        moonPhStr = "Last Quarter";
    } else if (moonPhs >= 0.75 && moonPhs <= 1.00) {
        moonPhStr = "Waning Crescent";
    }

    return moonPhStr;
}

function formatTime(date, postfix) {
    if (isNaN(date)) {
        return '&nbsp;&nbsp;n/a&nbsp;&nbsp;';
    }

    var hours = date.getHours(),
        minutes = date.getMinutes(),
        ap;

    if (postfix) {
        ap = (hours < 12 ? 'am' : 'pm');
        if (hours == 0) {
            hours = 12;
        }
        if (hours > 12) {
            hours -= 12;
        }
    } else {
        hours = (hours < 10 ? '0' + hours : '' + hours);
    }

    minutes = (minutes < 10 ? '0' + minutes : '' + minutes);

    return hours + ':' + minutes + (postfix ? ' ' + ap : '');
}



