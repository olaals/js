setTimeout(function(){
    console.log("settimeout complete predict js")
    var canvas = document.getElementById('overlay_canvas');
    overlay_ctx = overlay_canvas.getContext('2d')
    overlay_ctx.beginPath();
    overlay_ctx.rect(20, 20, 150, 100);
    overlay_ctx.stroke();
    video = document.getElementById('arjs-video')
//var video = document.getElementById('video')
    var context = canvas.getContext('2d');
    var frameRate = 30
    var model_loaded = false

    modelPromise = cocoSsd.load().then(model => {
        // detect objects in the image.
        
        const event = new Event('model_loaded');
        canvas.dispatchEvent(event)

        console.log(model)

        draw(video, canvas, context, frameRate, model)
        

    });



    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    function draw(video, canvas, context, frameRate, model) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);


        model.detect(canvas).then(predictions => {
            //console.log('Predictions: ', predictions);
            drawRec(predictions)
        });

        setTimeout(draw, 1/frameRate, video, canvas, context, frameRate, model);
    }


    function drawRec(predictions){
        
        for (i = 0; i < predictions.length; i++) {
            pred = predictions[i]
            console.log(pred)
            bbox = pred.bbox
            context.font = "20px Arial";
            context.fillText(pred.class, bbox[0], bbox[1]);
            context.beginPath();
            context.lineWidth = 5;
            context.strokeStyle = "#FF0000";
            context.rect(bbox[0], bbox[1], bbox[2], bbox[3]);
            context.stroke();
        }
    }

    
}, 5000)