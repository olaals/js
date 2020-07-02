console.log("hei")

const img = document.getElementById('cat-dog-stopsign');
const canvas = document.getElementById('myCanvas')

canvas.width = img.width
canvas.height = img.height


const ctx = document.getElementById('myCanvas').getContext('2d');


// Load the model.
cocoSsd.load().then(model => {
  // detect objects in the image.
  model.detect(img).then(predictions => {
    //console.log('Predictions: ', predictions);
    drawRec(predictions)
  });
});

function drawRec(predictions){
    
    for (i = 0; i < predictions.length; i++) {
        pred = predictions[i]
        console.log(pred)
        bbox = pred.bbox
        ctx.font = "20px Arial";
        ctx.fillText(pred.class, bbox[0], bbox[1]);
        ctx.beginPath();
        ctx.strokeStyle = "#FF0000";
        ctx.rect(bbox[0], bbox[1], bbox[2], bbox[3]);
        ctx.stroke();
    }
}


ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

