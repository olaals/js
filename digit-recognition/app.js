
var mousePressed = false;
var lastX, lastY;
var ctx;



document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    console.log(ctx)
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        datasets: [{
            label: 'Prediction',
            backgroundColor: 'orange',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }]
    },


    // Configuration options go here
    options: {}
});

    console.log(chart.data.datasets[0].data)
    

    var chart_el = document.getElementById('myChart');

    chart_el.addEventListener("hello", function(event) {
        console.log("catched event")
        chart.data.datasets[0].data = event.detail.name
        chart.update()
    });

 
 }, false);


async function loadModel() {
    model = await tf.loadLayersModel('assets/model.json');
    return model;
}

model = loadModel();

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");
    canv_el = document.getElementById('myCanvas')

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canv_el.width, canv_el.height);

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });
	    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });
}

function Draw(x, y, isDown) {
    if (isDown) {
        
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 25;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();

    }
    lastX = x; lastY = y;
}
	
function clearArea() {
    ctx = document.getElementById('myCanvas').getContext("2d");



    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    canv_el = document.getElementById('myCanvas')

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canv_el.width, canv_el.height);
}

function saveImg(){
    var c=document.getElementById("myCanvas");
    var d=c.toDataURL("image/png");
    //var w=window.open('about:blank','image from canvas');
    //w.document.write("<img src='"+d+"' alt='from canvas'/>");
    predict(c)
}

preprocessCanvas = (canvas) => {
    // Preprocess image for the network
    let tensor = tf
    .browser.fromPixels(canvas) // Shape: (300, 300, 3) - RGB image
    .resizeNearestNeighbor([28, 28]) // Shape: (28, 28, 3) - RGB image
    .mean(2) // Shape: (28, 28) - grayscale
    .expandDims(2) // Shape: (28, 28, 1) - network expects 3d values with channels in the last dimension
    .expandDims() // Shape: (1, 28, 28, 1) - network makes predictions for "batches" of images
    .toFloat(); // Network works with floating points inputs
    return tensor//.div(255.0); // Normalize [0..255] values into [0..1] range
  }

function predict(canvas){
    tensor = preprocessCanvas(canvas)


    predict(tensor)
 
    // get the model's prediction results
    
    
}

async function predict(tensor) {
    predictions = await model.predict(tensor).data();
};

function showPredictions(){
    let results = Array.from(predictions);
    print(results)
}


async function predictFunc() {
    // get image data from canvas
    console.log("preseed predict button")

    var canvas=document.getElementById("myCanvas");
    var imageData = canvas.toDataURL();
 
    // preprocess canvas
    let tensor = preprocessCanvas(canvas);
    console.log(tensor.data())

    //shape = [1,28,28,1]
    //tensor = tf.randomUniform(
    //    shape, minval=0, maxval=1, dtype='float32'
    //)

    // make predictions on the preprocessed image tensor
    let predictions = await model.predict(tensor).data();
    
    
    // get the model's prediction results
    let results = Array.from(predictions);
    console.log(results)

    console.log(indexOfMax(results))

    console.log(results)

    var chart_el = document.getElementById('myChart');

    chart_el.dispatchEvent(new CustomEvent("hello", {
        detail: { name: results }
    }));


}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}