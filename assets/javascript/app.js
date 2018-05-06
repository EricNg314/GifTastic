

$(document).ready(function () {


    var defSearchArry = ["cat", "dog", "parrot"];
    var currSearchArry = defSearchArry;
    var imageDiv = $("#gifBox");
    var btnsDiv = $("#gifBtns");

    $("#startApp").on("click", function () {
        //=======Animation ending detection BEGIN========/
        var animationEnd = (function (el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));
        //=======Animation ending detection END========/

        //======Adding animation to element ========/
        $("#jumbotronID").addClass('animated slideOutRight').one(animationEnd, function () {
            $("#jumbotronID").removeClass('animated slideOutRight'); //Removing animation class to reset

            $("#jumbotronID").addClass('d-none') //Hiding main page jumbotron.
            $("#gifContainer").removeClass('d-none'); //Unhiding question box
        });
    });

    makeButtons(defSearchArry);

    $("#run-search").click(function () {

        event.preventDefault();
        searchTxt = $("#gifSearchTxt").val().trim();
        currSearchArry.push(searchTxt);

        makeButtons(currSearchArry);

    });

    $("#clear-all").click(function () {
        btnsDiv.empty();
        currSearchArry = [];
    });

    $(".btnSearch").click(function(){

        event.preventDefault();
        var authKey = "RXEKYfD8ip0oRo03T6DsdUCnXS6A69lw";
        var numResults = 10;
        var searchTxt = this.value;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTxt + "&api_key=" + authKey;

        console.log(this);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response)

            makeGifs(response, numResults);

        });


    })


    function makeButtons(array){
        btnsDiv.empty();

        for(var i = 0; i < array.length; i++){
            var newButton = $("<button>");

            // var elementExists = document.getElementById("find-me");
            // newButton.addClass("btn btn-secondary mx-1 btnSearch animated fadeInRight")
            newButton.addClass("btn btn-secondary mx-1 btnSearch")
            newButton.attr("value", array[i]);
            newButton.text(array[i]);
            btnsDiv.append(newButton);
            // console.log(btnsDiv);
        }
    }

    function makeGifs(response, numResults){
        imageDiv.empty();

        for (var i = 0; i < numResults; i++){
            var imgInfoDiv = $("<div>");
            var imgTag = $("<img>");
            var imgPTag = $("<p>");
            var rating = response["data"][i]["rating"];
            var imgURLStill = response["data"][i]["images"]["fixed_height_still"]["url"];
            var imgURLAnimated = response["data"][i]["images"]["fixed_height"]["url"];

            imgInfoDiv.addClass("d-block float-left m-3")

            imgPTag.text("Rating: " + rating);
            imgTag.attr("src", imgURLStill);
            imgTag.attr("data-status", "still");
            imgTag.attr("data-still", imgURLStill);
            imgTag.attr("data-animated", imgURLAnimated);

            // console.log(imgTag);

            imgInfoDiv.append(imgPTag);
            imgInfoDiv.append(imgTag);

            imageDiv.append(imgInfoDiv);
        };


    };

});