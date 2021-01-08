$(document).ready(function(){

    function cityGo(city){
        $("#main-weather").empty();

    }

    function fiveDayGo(city){
        $("#five-weather").empty();
        
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
        console.log($(this).text());
        cityGo($(this).text());
        fiveDayGo($(this).text());
    })
});