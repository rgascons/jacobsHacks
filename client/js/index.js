function swipeRight() {
    var product = $("#container").find(".product:not(.selected)").first();
    product.addClass("selected");
    var win = window.open(document.getElementById('link').getAttribute('wishlistUrl'), '_blank');
    win.focus();
    //window.location.replace(document.getElementById('link').getAttribute('wishlistUrl'));
    $(product).addClass('rotate-left').delay(350).fadeOut(1);
    if (product.is(':last-child') ) {
        console.log("I am the last pic");
        $(product + ':nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(300);
    }
    else {
        console.log("Last pic I am not - Yoda");
        product.next().fadeIn(400);
    }
}

function swipeLeft() {
    var product = $('#productCard');
    product.addClass("selected");
    httpGetAsync('http://localhost:8080/nextProduct', function (response) {
        response=(JSON.parse(response));
        console.log(document.getElementById('title').innerHTML);
        document.getElementById('title').innerHTML = response.title;
        console.log(document.getElementById('title').innerHTML);
        document.getElementById('price').innerHTML =  response.price;
        document.getElementById('link').setAttribute('wishlistUrl', response.link);
        document.getElementById('prodImage').style.backgroundImage="url("+response.imageURL+")";
    });
    product.addClass('rotate-right').delay(350).fadeOut(1);
    product.removeClass('rotate-right').delay(350).fadeOut(1);
    product.removeClass("selected");

    product.fadeIn(400);
}

function wait(seconds) {
    var milliseconds = seconds * 1000;
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

swipeLeft();