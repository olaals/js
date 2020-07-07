setTimeout(function(){
    console.log("settimeout complete predict js")
    var overlay_canvas = document.getElementById('overlay_canvas');
    overlay_ctx = overlay_canvas.getContext('2d')
    overlay_ctx.beginPath();
    overlay_ctx.rect(20, 20, 150, 100);
    overlay_ctx.stroke();
    video = document.getElementById('arjs-video')
//var video = document.getElementById('video')
    canvas = document.createElement("canvas");
    canvas.width = video.getBoundingClientRect().width
    canvas.height = video.getBoundingClientRect().height
    var context = canvas.getContext('2d');
    var frameRate = 30
    var model_loaded = false

    modelPromise = cocoSsd.load().then(model => {
        // detect objects in the image.
        
        const event = new Event('model_loaded');
        canvas.dispatchEvent(event)

        console.log(model)

        draw(video, canvas, overlay_canvas, context, frameRate, model)
        

    });




    function draw(video, canvas, overlay_canvas, context, frameRate, model) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);


        console.log(video.videoHeight)
        model.detect(canvas).then(predictions => {
            //console.log('Predictions: ', predictions);
            drawRec(predictions)
        });

        setTimeout(draw, 1/frameRate, video, canvas, overlay_canvas, context, frameRate, model);
        canvas.width = video.getBoundingClientRect().width
        canvas.height = video.getBoundingClientRect().height
        overlay_canvas.width = video.getBoundingClientRect().width
        overlay_canvas.height = video.getBoundingClientRect().height
    }


    function drawRec(predictions){
        
        for (i = 0; i < predictions.length; i++) {
            pred = predictions[i]
            console.log(pred)
            bbox = pred.bbox
            console.log(overlay_ctx.canvas.height)
            console.log(overlay_canvas.height)
            overlay_ctx.clearRect(0,0,overlay_canvas.width, overlay_canvas.height)
            overlay_ctx.font = "20px Arial";
            overlay_ctx.fillText(pred.class, bbox[0], bbox[1]);
            overlay_ctx.beginPath();
            overlay_ctx.lineWidth = 5;
            overlay_ctx.strokeStyle = "#FF0000";
            overlay_ctx.rect(bbox[0], bbox[1], bbox[2], bbox[3]);
            overlay_ctx.stroke();
        }
    }

    
}, 5000)