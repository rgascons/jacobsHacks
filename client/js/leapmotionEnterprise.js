var controller = new Leap.Controller();
controller.connect();

controller.frameEventName = "deviceFrame";

controller.on('frame', onFrame);

function onFrame(frame)
{
    if(frame.gestures.length > 0) {
        console.log("frame id: " + frame.id);
        if(frame.gestures[0].type == "swipe") {
            var gesture = frame.gestures[0];
            var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
            //swipe right
            if(isHorizontal && frame.gestures[0].direction[0] > 0) {
                var oldFrame = controller.frame(1);
                if (oldFrame.gestures.length > 0) {
                    if(oldFrame.gestures[0].type == "swipe" && oldFrame.gestures[0].direction[0] > 0) {
                    }
                    else goEbay();
                }
                else {
                    goEbay();
                }
            }
            //swipe left
            else if(isHorizontal && frame.gestures[0].direction[0] < 0) {
                var oldFrame = controller.frame(1);
                if (oldFrame.gestures.length > 0) {
                    if(oldFrame.gestures[0].type == "swipe" && oldFrame.gestures[0].direction[0] < 0) {
                    }
                    else goAmazon();
                }
                else {
                    goAmazon();
                }
            }
        }
    }
}

function goAmazon() {
    window.open ('products.html','_self',false);
};

function goEbay() {
    alert("Ebay was not implemented... YET!");
};