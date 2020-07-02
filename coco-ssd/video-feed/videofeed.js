var canvas = document.getElementById('canvas');
//var video = document.getElementById('video')
var context = canvas.getContext('2d');
var frameRate = 30
var model_loaded = false
let video = document.querySelector('video');

modelPromise = cocoSsd.load().then(model => {
    // detect objects in the image.
    
    const event = new Event('model_loaded');
    canvas.dispatchEvent(event)

    console.log(model)

    draw(video, canvas, context, frameRate, model)
    

  });



// Javascript
navigator.mediaDevices.getUserMedia({
    video: {
      frameRate: 20
    }
  }
).then(function(stream) {
  let video = document.querySelector('video');
  video.srcObject = stream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
}).catch(function(err) {
  // deal with an error (such as no webcam)
});


video.addEventListener('play', function() {
  // trigger business logic
}, false);

context.drawImage(video, 0, 0, canvas.width, canvas.height);

// video 'play' event listener
video.addEventListener('play', function() {
  
}, false);





function draw(video, canvas, context, frameRate, model) {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);


    /*
    if(!model_loaded){
        canvas.addEventListener('model_loaded', function(){
            model_loaded = true
            console.log("model_loaded")
        })
    }else{
        model.predict(context)
    }
    */

    //console.log("hei")
    //console.log(model.model)
    model.detect(canvas).then(predictions => {
        //console.log('Predictions: ', predictions);
        drawRec(predictions)
    });

    /*

    */
    

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
        context.strokeStyle = "#FF0000";
        context.rect(bbox[0], bbox[1], bbox[2], bbox[3]);
        context.stroke();
    }
}
