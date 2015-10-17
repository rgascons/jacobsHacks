$(document).ready(function(){
    //Hides weird loading message at the bottom of the page
    $.mobile.loading().hide();

    //More action -> hand right
    $(".product").on("swiperight", function() {
      $(this).addClass('rotate-left').delay(1500).fadeOut(1);
      $('.product').find('.status').remove();

      $(this).append('<div class="status info">More of this!</div>');
      if ( $(this).is(':last-child') ) {
        $('.product:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
       } else {
          $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
       }
    });

    //I dont want it -> hand left
   $(".product").on("swipeleft", function() {
    $(this).addClass('rotate-right').delay(1500).fadeOut(1);
    $('.product').find('.status').remove();
    $(this).append('<div class="status dislike">Ahg!</div>');

    if ( $(this).is(':last-child') ) {
     $('.product:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
      alert('No more images');
     } else {
        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
    } 
  });

    // Donate action -> hand up
    $(".product").on("tap", function() {
        $(this).addClass('animated fadeOutUp').delay(1500).fadeOut(1);
        $('.product').find('.status').remove();
        $(this).append('<div class="status like">Donate</div>');

        if ( $(this).is(':last-child') ) {
            $('.product:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
            alert('No more images');
        } else {
            $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
        }
    });

    // Buy action -> hand down
    $(".product").on("taphold", function() {
        $(this).addClass('animated wobble').delay(3000).fadeOut(3);
        $('.product').find('.status').remove();
        $(this).append('<div class="status like">I buy it!</div>');

        if ( $(this).is(':last-child') ) {
            $('.product:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
            alert('No more images');
        } else {
            $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
        }
    });

});