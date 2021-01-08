$(document).ready(function(){

    function cityGo(city){
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=fc68e264d139e3d3a853b82e6c6117e9";
        console.log(queryURL);
        $("#location-header").text(city);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
        });

        var queryUV = "https://api.openweathermap.org/data/2.5/onecall?lat=" + "lat" + "&lon=" + "lon" + "&exclude=hourly,minutely,alerts&appid=fc68e264d139e3d3a853b82e6c6117e9";
    }

    function fiveDayGo(city){
        var queryFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=fc68e264d139e3d3a853b82e6c6117e9";

    }





    $("#start-search").on("click", function(event){
        event.preventDefault();

        var newLocation = $("#user-search").eq(0).val();
        console.log(newLocation);

        var newCityButton = $("<button class=\"city-button\">");
        newCityButton.text(newLocation);
        $("#locations").prepend(newCityButton);
    })

    $(document).on("click", ".city-button",function(){
        // this function should populate the weather contents (#main-weather and #five-weather) but NOT add a new button like in the #start-search event listener.
        cityGo($(this).text());
        fiveDayGo($(this).text());
    })

    cityGo("San Francisco");
    fiveDayGo("San Francisco");
});