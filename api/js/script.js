//Open Giphy API Key: x0Etx6oBTPDB0cDlzIoj3uYct0wFkryr
//api.giphy.com/v1/gifs/search
//https://api.giphy.com/v1/gifs/search?api_key=x0Etx6oBTPDB0cDlzIoj3uYct0wFkryr&q=data&limit=25&offset=0&rating=G&lang=en


$(document).ready(function () {
  console.log("JavaScript loaded successfully!");

  var key = "x0Etx6oBTPDB0cDlzIoj3uYct0wFkryr";
  var gifs = [];
  var currentIndex = 0;
  var searchRequest = null;

  function showGIF() {
    var count = gifs.length;
    $("#gif-count").text(count ? (currentIndex + 1) + " / " + count : "0 / 0");
    $("#prev-gif").prop("disabled", count < 2 || currentIndex === 0);
    $("#next-gif").prop("disabled", count < 2 || currentIndex === count - 1);

    if (!count) {
      $("#gif-image").prop("hidden", true).removeAttr("src");
      return;
    }

    var gif = gifs[currentIndex];
    var url = gif.images.downsized_large.url;
    $("#gif-image")
      .attr("src", url)
      .attr("alt", gif.title || "GIPHY GIF")
      .prop("hidden", false);
    $("#gif-message").hide();
  }

  function getGIFS(value) {
    value = value.trim();
    if (!value) return;
    console.log("Searching for:", value);

    if (searchRequest) searchRequest.abort();
    gifs = [];
    currentIndex = 0;
    showGIF();
    $("#gif-message").text("Loading GIFs...").show();

    var url = "https://api.giphy.com/v1/gifs/search?api_key=" + key +
      "&q=" + encodeURIComponent(value) + "&limit=25&offset=0&rating=g&lang=en";

    searchRequest = $.getJSON(url, function (json) {
      console.log("GIPHY API response:", json);
      gifs = (json.data || []).filter(function (gif) {
        return gif.images && gif.images.downsized_large && gif.images.downsized_large.url;
      });
      currentIndex = 0;
      if (!gifs.length) $("#gif-message").text("No GIFs found.").show();
      showGIF();
    }).fail(function (xhr, status, error) {
      if (status === "abort") return;
      console.error("API Error:", xhr.status, status, error);
      $("#gif-message").text("Could not load GIFs. Check the console.").show();
      showGIF();
    });
  }

  $("#search").on("keydown", function (e) {
    if (e.key === "Enter") getGIFS($(this).val());
  });

  $("#prev-gif").on("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      showGIF();
    }
  });

  $("#next-gif").on("click", function () {
    if (currentIndex < gifs.length - 1) {
      currentIndex++;
      showGIF();
    }
  });
});


