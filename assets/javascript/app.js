$(document).ready(function () {

    var buttonList = ['NBA Fails', 'The Office', 'Crying Jordan'];

    function renderButtons() {
        $('#button-area').empty();
        for (var i = 0; i < buttonList.length; i++) {
            var giphybtn = $("<button class='btn-outline-secondary btn-lg m-4'>");
            giphybtn.attr('data-search', buttonList[i]);
            giphybtn.addClass('animalbtn');
            giphybtn.text(buttonList[i]);
            $('#button-area').append(giphybtn);
        }
    }

    $('#add-gifs').on('click', function (e) {
        e.preventDefault();
        var textinput = $('#topic-input').val().trim();
        console.log(textinput);
        buttonList.push(textinput);
        renderButtons();
    })

    renderButtons();


    $(document).on("click", ".animalbtn", displayGifs);

    function displayGifs() {
        $('#gifs-here').empty();
        // var for search subject 
        var searchSubject = $(this).attr('data-search');
        console.log(searchSubject);




        // API search endpoint

        var API_Key = "f02LsB2d5MOPCj9giwOpcqWQ6XSuI0Qh"

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchSubject + "&api_key=" + API_Key + "&limit=10&offset=0&rating=PG&lang=en"

        console.log(queryURL);


        // ajax call 
        $.ajax({
                url: queryURL,
                method: 'GET',
            })
            .done(function (response) {

                // looping through 10 gifs
                for (var i = 0; i < response.data.length; i++) {
                    console.log(response.data[i]);
                    var animated = response.data[i].images.fixed_height.url;
                    var still = response.data[i].images.fixed_height_still.url;
                    $('#gifs-here').append("<p>RATING: " + response.data[i].rating + "</p>")


                    var gifImage = $("<img>");

                    gifImage.attr("src", animated);
                    gifImage.addClass('animateImg');
                    gifImage.attr("data-still", still);
                    gifImage.attr("data-animate", animated);
                    gifImage.attr('data-state', 'still');
                    $('#gifs-here').append(gifImage);
                }
            })
    }

    //ON BUTTON CLICK ANIMATE OR STILL THE GIF IMAGES in case of dynamic buttons we added event listener after the $document is loaded
    $(document).on('click', '.animateImg', function () {
        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })




})