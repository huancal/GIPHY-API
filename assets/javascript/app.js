$(document).ready(function () {

    // button click function

    $('button').on('click', function () {
        // var for search subject 
        var searchSubject = $(this).data('search');

        // API search endpoint
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchSubject + "&api_key=f02LsB2d5MOPCj9giwOpcqWQ6XSuI0Qh&limit=10&offset=0&rating=PG&lang=en"
        console.log(queryURL);


        // ajax call 
        $.ajax({
                url: queryURL,
                method: 'GET',
            })
            .done(function (response) {
                console.log(response.data[0].rating);
                // looping through 10 gifs
                for (var i = 0; i < response.data.length; i++) {
                    $('#gifs-here').append("<p>Rating: " + response.data[i].rating + "</p>")
                    $('#gifs-here').append("<img src ='" + response.data[i].images.downsized.url + "'>");
                };
            })
    })



})