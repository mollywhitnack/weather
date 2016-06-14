//API Key eaeed858874ec520ef5ec27b9d303d94
//API Secret 4657856f291f52ace49e379243962add

//yelp

// Consumer Key 45FG3R4gl9x01mztmbg6vw
//Consumer Secret y-gVy6_xpnoVAypLZhURdVQZHPE

'use strict'

$(document).ready(init);

function init(){
  getWeather();
  getForcast();
  $('.showNight').click(showNight);
}

function getWeather(event){
  //event.preventDefualt();

  $.getJSON('http://api.wunderground.com/api/dce5324afa466aeb/conditions/q/autoip.json')
  .done(function(data) {
     //console.log(data.current_observation.icon_url);
     var url = data.current_observation.icon_url;
     var city = data.current_observation.display_location.full;
     var weather = data.current_observation.weather;
     var temp = data.current_observation.temp_f;
     var feelsLike= data.current_observation.feelslike_f;
     //console.log("city ; ",city, " weather; ",weather," temp ; ", temp ," feelsLike ; ",feelsLike);
     var $span = $('<span>').addClass('items');
     var $img = $('<img>').attr('src', url).addClass("wImage");
     var $city = $('<div>').text(city).addClass("city").append($img);
     var $weather = $('<span>').text(weather).addClass("weather");
     var $temp = $('<span>').text(temp).addClass("temp");
     var $feelsLike = $('<span>').text(`Feels like: ${feelsLike}`).addClass("feelsLike");
     $span.append($city, $weather, $temp, $feelsLike);
     $('.currentWeather').append($span);
   })
  /*.error(function(err) {
    console.log('Error retrieving data! ' , err); 
  });*/
}

function getForcast(event){

  $.getJSON('http://api.wunderground.com/api/dce5324afa466aeb/forecast/q/autoip.json')
  .done(function(data) {
    //console.log(data.forecast.txt_forecast.forecastday);
    console.log("data:", data.forecast.txt_forecast.forecastday);
    
    var $days = data.forecast.txt_forecast.forecastday.map(day =>{
        var $day = $('<span>').addClass(`days`);
        console.log("url: ", day.icon_url);
        console.log(" - : ", day.fcttext_metric);
        console.log("day: ", day.title);
        var $img = $('<img>').attr('src', day.icon_url).addClass("fImage");
        var $about = $('<div>').text(day.fcttext_metric).addClass("about");
        var $title = $('<div>').text(day.title).addClass("dayTitle");
        $day.append($title, $img, $about).addClass(`${day.title}`);
        return $day;
    })
    $('.forecast').append($days);

    /*var $day2 = $('<span>').addClass('day2');
    var $day3 = $('<span>').addClass('day3');
    var $day4 = $('<span>').addClass('day4');
    var $day5 = $('<span>').addClass('day5');
    var $day6 = $('<span>').addClass('day6');
    var $day7 = $('<span>').addClass('day7');*/
  })
  .error(function(err) {
    console.log('Error retrieving data! '); 
  });
}

function showNight(){
  console.log("clicked");
  $('.Night').show();
}
