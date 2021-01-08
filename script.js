

$("#start-search").on("click", function(event){
    event.preventDefault();

    var newLocation = $("#user-search").eq(0).val();
    console.log(newLocation);
})
