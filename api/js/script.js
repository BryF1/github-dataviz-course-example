//Open Giphy API Key: x0Etx6oBTPDB0cDlzIoj3uYct0wFkryr
//api.giphy.com/v1/gifs/search
//https://api.giphy.com/v1/gifs/search?api_key=x0Etx6oBTPDB0cDlzIoj3uYct0wFkryr&q=data&limit=25&offset=0&rating=G&lang=en

$(document).ready(function() {
  function getGIFS(value) {
    console.log(value);
    var key = "x0Etx6oBTPDB0cDlzIoj3uYct0wFkryr";
    var url = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + value + "&limit=25&offset=0&rating=G&lang=en";

    $.getJSON(url, function(json) {
      console.log(json);
    }) 
  } 

  $("#search").keypress(function(e) {
    if (e.which == 13) {
      $("main div").remove();
      getGIFS($("#search").val());

    }
    })
  })

