console.log("hei")
myCanvas = document.getElementById("myCanvas")
myCtx = myCanvas.getContext('2d')
myCtx.beginPath();
myCtx.fillStyle = "red";
myCtx.fillRect(0, 0, myCanvas.width, myCanvas.height);
myCtx.fill();
vid = document.querySelector("video")
console.log(vid)
//scene_el = document.getElementById("scene").remove()

setTimeout( ()=>{
    console.log("timeout complete")
    cameraView = document.getElementById("arjs-video");
    video = document.querySelector("video")
    console.log(cameraView) 
    console.log(video)
    print(video)
}, 3000)


function print(){
    video = document.querySelector("video")
    console.log(video)
    canvas = document.querySelector("canvas")
    console.log(canvas)

    myCtx.drawImage(canvas, 0,0)
    var img_url = canvas.toDataURL("image/png");
    console.log("loaded img url from video:")
    console.log(canvas.toDataURL("image/png"))
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    ReImg.fromCanvas(document.querySelector('canvas')).downloadPng()
    setTimeout(()=>{
        window.location.href=image;
        //document.write('<img src="'+img+'"/>');
        var img = new Image;
        img.onload = function(){
            myCtx.drawImage(img,0,0, myCanvas.width, myCanvas.height); // Or at whatever offset you like
        };
        console.log(img)
        console.log(img_url)
        img.src = "//www.weborg.no/wp-content/uploads/2017/11/google-logo-e1509538942481.png";
    }, 2000)
}

function debugBase64(base64URL){
   
    var win = window.open();
    win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}

