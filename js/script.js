console.log("Clock script loaded!");

$(document).ready(function() {

  function displayTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    var w = $('#hours').parent().width() - $('#hours').outerWidth();

    console.log(hours + ":" + minutes + ":" + seconds);

    $('#hours').css('left', hours * (w/23));
    $('#minutes').css('left', minutes * (w/59));
    $('#seconds').css('left', seconds * (w/59));
  }

  displayTime();
  setInterval(displayTime, 1000);

  $(window).on('resize', displayTime);
});