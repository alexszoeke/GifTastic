$(document).ready(function () {
    var dogs = ["dachshunds", "retriever", "husky", "bulldog", "rottweiler", "pit bull", "german shepherd", "beagle", "bichon frise", "vizsla", "greyhound", "terrier", "collie", "australian shepherd", "pomeranian",];
    
    function displayDogs() {
        // var breed = $(this).attr("data-name");
        var breed = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + breed + "&limit=10&api_key=byDhoCYu32OSxSTTcWYQ9dnJ7RRQuCyp";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var imgURL;
            var dogDiv = $("<div>").addClass("dog");
            for (var i=0; i < response.data.length; i++) {
                imgURL = response.data[i].images.fixed_width_still
                .url;
                console.log(imgURL);
                var image = $("<img>").attr("src", imgURL);
                $(image).addClass("gif");
                dogDiv.append(image);
            };
            $("#gif-display").html(dogDiv);

            
            
            
        });


    }

    function renderButtons() {

        $("#buttons").empty();

        for (var i = 0; i < dogs.length; i++) {
          var btn = $("<button>");
          btn.addClass("dog-btn");
          btn.attr("data-name", dogs[i]);
          btn.text(dogs[i]);
          $("#buttons").append(btn);
        }
      }

      $("#add-dog").on("click", function(event) {
        event.preventDefault();

        var dog = $("#dogs-input").val().trim();

        // Adding movie from the textbox to our array
        dogs.push(dog);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });


$(document).on("click", ".dog-btn", displayDogs);

$(document).on('click', '.gif', function() {
    var src = $(this).attr("src");
  if($(this).hasClass('playing')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('playing');
  } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});

renderButtons();
});