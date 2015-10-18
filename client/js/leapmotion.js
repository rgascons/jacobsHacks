var controller = new Leap.Controller();
controller.connect();

controller.frameEventName = "deviceFrame";

controller.on('frame', onFrame);

function onFrame(frame)
{
    if(frame.gestures.length > 0) {
        console.log("frame id: " + frame.id);
        if(frame.gestures[0].type == "swipe") {
            if(frame.gestures[0].direction[0] > 0) {
                var oldFrame = controller.frame(1);
                if (oldFrame.gestures.length > 0) {
                    if(oldFrame.gestures[0].type == "swipe" && oldFrame.gestures[0].direction[0] > 0) {
                    }
                    else swipeRight();
                }
                else {
                    swipeRight();
                }
            }
        }
    }
}