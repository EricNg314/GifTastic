

$(document).ready(function () {


    var defSearchArry = ["Mario", "Sonic", "Super Smash Brothers", "Zelda", "Kirby", "Pokemon"];
    var currSearchArry = defSearchArry;
    var imageDiv = $("#gifBox");
    var btnsDiv = $("#gifBtns");

    $("#startApp").on("click", function () {
        play_click_sound();

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

    $(document).on("click", "#run-search", function () {
        event.preventDefault();
        searchTxt = $("#gifSearchTxt").val().trim();
        currSearchArry.push(searchTxt);

        makeButtons(currSearchArry);
        play_click_sound();
    });

    $("#clear-all").on("click", function () {
        btnsDiv.empty();
        currSearchArry = [];
        play_click_sound();
    });

    $(document).on("click", ".btnSearch", function () {
        event.preventDefault();
        var authKey = "RXEKYfD8ip0oRo03T6DsdUCnXS6A69lw";
        var numResults = 10;
        var searchTxt = this.value;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTxt + "&api_key=" + authKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            makeGifs(response, numResults);
        });
        play_click_sound();
    });

    $(document).on("click", "#playPauseAllBtn", function(){
        playPauseGifs();
    })


    $(document).on("click", ".gif", function () {
        var gifState = $(this).attr("data-state");
        if (gifState === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animated");
        } else if (gifState === "animated") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        play_click_sound();
    });


    function makeButtons(array) {
        btnsDiv.empty();

        for (var i = 0; i < array.length; i++) {
            var newButton = $("<button>");

            // var elementExists = document.getElementById("find-me");
            newButton.addClass("btn btn-dark my-1 mx-1 btnSearch animated fadeInDown")
            // newButton.addClass("btn btn-secondary mx-1 btnSearch")
            newButton.attr("value", array[i]);
            newButton.text(array[i]);
            btnsDiv.append(newButton);

        }
    }

    function makeGifs(response, numResults) {
        imageDiv.empty();

        for (var i = 0; i < numResults; i++) {
            var imgDiv = $("<div>");
            var imgInfoDiv = $("<div>");
            var imgPUser = $("<p>");
            var username = response["data"][i]["username"];
            var imgPRating = $("<p>");
            var rating = response["data"][i]["rating"];
            var imgTag = $("<img>");
            var imgURLStill = response["data"][i]["images"]["fixed_height_still"]["url"];
            var imgURLAnimated = response["data"][i]["images"]["fixed_height"]["url"];

            imgDiv.addClass("d-block rounded border  float-left m-3")

            imgInfoDiv.addClass("text-white bg-dark")

            if(username != ""){
                imgPUser.text("By Giphy User: " + username);
                imgInfoDiv.append(imgPUser);
            }

            imgInfoDiv.append(imgPRating);


            imgPRating.addClass("my-0 py-auto")
            imgPRating.text("Rating: " + rating);

            imgTag.addClass("gif");
            imgTag.attr("src", imgURLStill);
            imgTag.attr("data-state", "still");
            imgTag.attr("data-still", imgURLStill);
            imgTag.attr("data-animated", imgURLAnimated);

            // imgInfoDiv.append(imgPUser);


            imgDiv.append(imgInfoDiv);
            imgDiv.append(imgTag);

            imageDiv.append(imgDiv);
        };

    };

    function playPauseGifs() {
        var elements = document.getElementsByClassName("gif");
        var playPauseAll = $("#playPauseAllBtn").attr("data-state");

        if (playPauseAll === "still") {
            $("#playPauseAllBtn").attr("data-state", "animated");
            for (var i = elements.length - 1; i >= 0; --i) {
                var gifElement = (elements[i]);
                var gifState = $(gifElement).attr("data-state");

                if (gifState === "still") {
                    $(gifElement).attr("src", $(gifElement).attr("data-animated"));
                    $(gifElement).attr("data-state", "animated");
                }
            }
        } else if (playPauseAll === "animated") {
            $("#playPauseAllBtn").attr("data-state", "still");
            for (var i = elements.length - 1; i >= 0; --i) {
                var gifElement = (elements[i]);
                var gifState = $(gifElement).attr("data-state");

                if (gifState === "animated") {
                    $(gifElement).attr("src", $(gifElement).attr("data-still"));
                    $(gifElement).attr("data-state", "still");
                }
            }
        }

    }



    function play_click_sound() {
        document.getElementById('audioClick').play();
    }

});