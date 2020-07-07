//const reimg = require("./reimg")

setTimeout(function(){
    console.log("hei timeout")
            //....
    video = document.getElementById("arjs-video")

    canvas = document.createElement("canvas");
    // scale the canvas accordingly
    //canvas.width = video.getBoundingClientRect().width
    // draw the video at that frame
    //canvas.getContext('2d')
    //.drawImage(video, 0, 0, canvas.width, canvas.height);
    //document.body.append(canvas)
    // convert it to a usable data URL
    video_w = video.getBoundingClientRect().width
    video_h = video.getBoundingClientRect().height
    overlay_canvas =  injectCanvas(video_w, video_h)
    overlay_ctx = overlay_canvas.getContext('2d')
    overlay_ctx.beginPath();
    overlay_ctx.rect(20, 20, 150, 100);
    overlay_ctx.stroke();

    var img_url = canvas.toDataURL("image/png");
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    //ReImg.fromCanvas(canvas).downloadPng()

}, 1000)

function injectCanvas(width, height){
    overlay_canvas = document.createElement("canvas")
    overlay_canvas.id = "overlay_canvas"
    overlay_ctx = overlay_canvas.getContext('2d')
    overlay_canvas.style.position = "absolute"
    overlay_canvas.style.top = "0"
    overlay_canvas.style.left = "0"
    overlay_canvas.width = width
    overlay_canvas.height = height
    //overlay_canvas.style.width = "100%"
    //overlay_canvas.style.width = "100%"
    //overlay_ctx.globalAlpha = 0.5
    document.body.append(overlay_canvas)
    return overlay_canvas
}