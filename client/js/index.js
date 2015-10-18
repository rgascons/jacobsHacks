function swipeRight() {
    var product = $("#container").find(".product:not(.selected)").first();
    product.addClass("selected");

    $(product).addClass('rotate-left').delay(350).fadeOut(1);
    if (!product.is(':last-child') ) {
        product.next().fadeIn(500);
    }
};

function swipeLeft() {
    var product = $("#container").find(".product:not(.selected)").first();
    product.addClass("selected");

    $(product).addClass('rotate-right').delay(350).fadeOut(1);
    if (!product.is(':last-child') ) {
        product.next().fadeIn(500);
    }
};

function swipeUp() {
    var product = $("#container").find(".product:not(.selected)").first();
    product.addClass("selected");

    $(product).addClass('animated fadeOutUp').delay(1500).fadeOut(1);
    if (!product.is(':last-child') ) {
        product.next().fadeIn(500);
    }
};

function swipeDown() {
    var product = $("#container").find(".product:not(.selected)").first();
    product.addClass("selected");

    $(product).addClass('animated fadeOutDown').delay(1500).fadeOut(1);
    if (!product.is(':last-child') ) {
        product.next().fadeIn(500);
    }
};