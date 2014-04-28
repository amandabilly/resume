$(document).ready(function() {
  // $('p, li').flowtype({
  //   minimum   : 500,
  //   maximum   : 1200,
  //   minFont   : 12,
  //   maxFont   : 20,
  //   fontRatio : 30
  // });
  
  enquire.register("screen and (min-width:47em)", function() {
    
    // Sticky sidebar only at browsers wide enough
    $("#side").stick_in_parent();

    // Text Rotator for header
    $(".rotate").textrotator({
      animation: "fade", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
      separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
      speed: 4000 // How many milliseconds until the next word show.
    });

  });

  var dynamicCarousel = function() {
    var hi = 0;
    $(".item").each(function(){
      var h = $(this).height();
      if(h > hi){
         hi = h;
      }    
    });
    $(".carousel-inner").css("height", hi);
  };
  dynamicCarousel();
  $(window).resize(function() {
    dynamicCarousel();
  });

  // Boostrap carousel for Xomba testimonials
  $('.carousel-quotes').carousel();

});