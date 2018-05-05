

$(document).ready(function () {



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
});