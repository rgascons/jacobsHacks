function swipeRight() {
    var product = $("#container").find(".product:not(.selected)").first();
    product.addClass("selected");

    $(product).addClass('rotate-left').delay(1500).fadeOut(1);
    if (product.is(':last-child') ) {
        $(product + ':nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(300);
    }
    else {
        product.next().fadeIn(400);
    }
};
