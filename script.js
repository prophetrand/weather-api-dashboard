$(document).ready(function(){

    function cityGo(city){
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=fc68e264d139e3d3a853b82e6c6117e9&units=imperial";
        $("#location-header").text(city);

        var lat = '';
        var lon = '';

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            lat = response.coord.lat;
            lon = response.coord.lon;

            var iconCode = response.weather[0].icon;
            var weatherIcon = $("#main-icon");
            weatherIcon.attr("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");

            $("#temperature-field").text("Temperature: " + response.main.temp + " °F");
            $("#humidity-field").text("Humidity: " + response.main.humidity);
            $("#wind-field").text("Wind: " + response.wind.speed + "MPH");

            var queryUV = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=fc68e264d139e3d3a853b82e6c6117e9&units=imperial";

            $.ajax({
                url: queryUV,
                method: "GET"
            }).then(function(response){
                var uvi = response.current.uvi;
                $("#uv-field").text("UV Index: " + uvi)

            });
        });

    }

    function fiveDayGo(city){
        var queryFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&exclude=hourly,minutely,alerts&appid=fc68e264d139e3d3a853b82e6c6117e9&units=imperial";

    }





    $("#start-search").on("click", function(event){
        event.preventDefault();

        var newLocation = $("#user-search").eq(0).val();
        console.log(newLocation);

        var newCityButton = $("<button class=\"city-button\">");
        newCityButton.text(newLocation);
        $("#locations").prepend(newCityButton);

        cityGo(newLocation);
        fiveDayGo(newLocation);
    })

    $(document).on("click", ".city-button",function(){
        // this function should populate the weather contents (#main-weather and #five-weather) but NOT add a new button like in the #start-search event listener.
        cityGo($(this).text());
        fiveDayGo($(this).text());
    })

    cityGo("San Francisco");
    fiveDayGo("San Francisco");
});