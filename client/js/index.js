function swipeRight() {
    var product = $("#container").find(".product:not(.selected)").first();
    product.addClass("selected");

    $(product).addClass('rotate-left').delay(350).fadeOut(1);
    if (product.is(':last-child') ) {
        console.log("I am the last pic");
        $(product + ':nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(300);
    }
    else {
        console.log("Last pic I am not - Yoda");
        product.next().fadeIn(400);
    }
};

function swipeLeft() {
    var product = $("#container").find(".product:not(.selected)").first();
    product.addClass("selected");

    $(product).addClass('rotate-right').delay(350).fadeOut(1);
    if (product.is(':last-child') ) {
        console.log("I am the last pic");
        $(product + ':nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(300);
    }
    else {
        console.log("Last pic I am not - Yoda");
        product.next().fadeIn(400);
    }
};

function wait(seconds) {
    var milliseconds = seconds * 1000;
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}
