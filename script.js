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
                var uvColor = $("#uv-field");
                uvColor.text(uvi);

                if (uvi < 3.0){
                    uvColor.addClass("mild")
                } else if (uvi >= 3.0 && uvi < 6.0){
                    uvColor.addClass("moderate")
                } else if (uvi >= 6.0){
                    uvColor.addClass("severe")
                }
            });
        });

    }

    function fiveDayGo(city){
        var queryFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&exclude=hourly,minutely,alerts&appid=fc68e264d139e3d3a853b82e6c6117e9&units=imperial";

        $.ajax({
            url: queryFive,
            method: "GET"
        }).then(function(response){
            console.log(response);

            $("#day1").prepend(response.list[1].dt_txt);
            var iconCode1 = response.list[1].weather[0].icon;
            var weatherIcon1 = $("#day1-icon");
            weatherIcon1.attr("src", "http://openweathermap.org/img/wn/" + iconCode1 + ".png");
            $("#day1").append("Temp (°F): " + response.list[1].main.temp);
            $("#day1").append("<br>");
            $("#day1").append("Humidity: " + response.list[1].main.humidity);


            $("#day2").prepend(response.list[1].dt_txt);
            var iconCode1 = response.list[1].weather[0].icon;
            var weatherIcon1 = $("#day1-icon");
            weatherIcon1.attr("src", "http://openweathermap.org/img/wn/" + iconCode1 + ".png");
            $("#day2").append("Temp (°F): " + response.list[1].main.temp);
            $("#day2").append("<br>");
            $("#day2").append("Humidity: " + response.list[1].main.humidity);

            $("#day3").prepend(response.list[1].dt_txt);
            var iconCode1 = response.list[1].weather[0].icon;
            var weatherIcon1 = $("#day1-icon");
            weatherIcon1.attr("src", "http://openweathermap.org/img/wn/" + iconCode1 + ".png");
            $("#day3").append("Temp (°F): " + response.list[1].main.temp);
            $("#day3").append("<br>");
            $("#day3").append("Humidity: " + response.list[1].main.humidity);

            $("#day4").prepend(response.list[1].dt_txt);
            var iconCode1 = response.list[1].weather[0].icon;
            var weatherIcon1 = $("#day1-icon");
            weatherIcon1.attr("src", "http://openweathermap.org/img/wn/" + iconCode1 + ".png");
            $("#day4").append("Temp (°F): " + response.list[1].main.temp);
            $("#day4").append("<br>");
            $("#day4").append("Humidity: " + response.list[1].main.humidity);

            $("#day5").prepend(response.list[1].dt_txt);
            var iconCode1 = response.list[1].weather[0].icon;
            var weatherIcon1 = $("#day1-icon");
            weatherIcon1.attr("src", "http://openweathermap.org/img/wn/" + iconCode1 + ".png");
            $("#day5").append("Temp (°F): " + response.list[1].main.temp);
            $("#day5").append("<br>");
            $("#day5").append("Humidity: " + response.list[1].main.humidity);
        })
    }
// 1, 9, 17, 25, 33




    $("#start-search").on("click", function(event){
        event.preventDefault();

        var newLocation = $("#user-search").eq(0).val();

        var newCityButton = $("<button class=\"city-button\">");
        newCityButton.text(newLocation);
        $("#locations").prepend(newCityButton);

        cityGo(newLocation);
        fiveDayGo(newLocation);
    })

    $(document).on("click", ".city-button",function(){
        cityGo($(this).text());
        fiveDayGo($(this).text());
    })

    cityGo("San Francisco");
    fiveDayGo("San Francisco");
});