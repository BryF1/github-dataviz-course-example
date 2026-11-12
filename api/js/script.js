//Open Giphy API Key: x0Etx6oBTPDB0cDlzIoj3uYct0wFkryr
//api.giphy.com/v1/gifs/search
//https://api.giphy.com/v1/gifs/search?api_key=x0Etx6oBTPDB0cDlzIoj3uYct0wFkryr&q=data&limit=25&offset=0&rating=G&lang=en


$(document).ready(function() {
  console.log("JavaScript loaded successfully!");

  function getGIFS(value) {
    console.log("Searching for:", value);

    var key = "x0Etx6oBTPDB0cDlzIoj3uYct0wFkryr";
    var url = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + encodeURIComponent(value) + "&limit=25&offset=0&rating=g&lang=en";

    $.getJSON(url, function(json) {
      console.log("GIPHY API response:", json);
      console.log(json.data[0].images.downsize_larged.url);
    }).fail(function(xhr, status, error) {
      console.log("API Error:", xhr.status, status, error);
      console.log(xhr.responseText);
     
    });
  }

  $("#search").keypress(function(e) {
    if (e.which == 13) {
      $("main div").remove();
      getGIFS($("#search").val());
    }
  });
});


