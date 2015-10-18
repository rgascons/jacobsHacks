function concatData(id, data) {
    return id + ": " + data + "<br>";
}

var output = document.getElementById('output');
var swipeDirection="";

var controller = Leap.loop({enableGestures: true}, function(frame){
    frame.gestures.forEach(function(gesture){
        switch (gesture.type){
            case "swipe":
                var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                if(isHorizontal) {
                    if(gesture.direction[0] > 0) {
                        swipeDirection = "Swipe right";
                    }
                    else {
                        swipeDirection = "Swipe left";
                    }
                }
                else {
                    if(gesture.direction[1] > 0) {
                        swipeDirection = "Swipe up";
                    }
                    else {
                        swipeDirection = "Swipe down";
                    }
                }
                console.log(swipeDirection);
                break;
        }
    });
});