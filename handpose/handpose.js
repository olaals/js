timeout = 100;

function waitForElementToDisplay(selector, time) {
  if (document.querySelector(selector) != null) {
    main();
    return;
  } else {
    setTimeout(function () {
      waitForElementToDisplay(selector, time);
    }, time);
  }
}

function distance3D(pose1, pose2) {
  let d1 = pose1[0] - pose2[0];
  let d2 = pose1[1] - pose2[1];
  let d3 = pose1[2] - pose2[2];
  let dist = Math.sqrt(d1 * d1 + d2 * d2 + d3 * d3);
  return dist;
}

function calculateDistanceHand(predictions) {
  palm = predictions[0].annotations.palmBase[0];
  indexFinger = predictions[0].annotations.indexFinger[3];
  thumb = predictions[0].annotations.thumb[3];
  ringFinger = predictions[0].annotations.ringFinger[3];
  pinky = predictions[0].annotations.pinky[3];
  d11 = distance3D(palm, indexFinger);
  d22 = distance3D(palm, thumb);
  d33 = distance3D(palm, ringFinger);
  d44 = distance3D(palm, pinky);
  tot_dist = d11 + d22 + d33 + d44;
  console.log(tot_dist);
}

function poseMinus(pose1, pose2) {
  x_delta = pose1[0] - pose2[0];
  y_delta = pose1[1] - pose2[1];
  z_delta = pose1[2] - pose2[2];
  return [x_delta, y_delta, z_delta];
}

function dotProduct(pose1, pose2) {
  return pose1[0] * pose2[0] + pose1[1] * pose2[1] + pose1[2] + pose2[2];
}

function lengthVector(vec) {
  return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
}

function calcAngle(predictions) {
  A = predictions[0].annotations.palmBase[0];
  B = predictions[0].annotations.indexFinger[1];
  C = predictions[0].annotations.indexFinger[3];
  AB = poseMinus(B, A);
  BC = poseMinus(C, B);
  dot_prod = dotProduct(AB, BC);
  AB_len = lengthVector(AB);
  BC_len = lengthVector(BC);
  theta = Math.acos(dot_prod / (AB_len * BC_len));
  return theta;
}

async function predictLoop(vid, model) {
  const predictions = await model.estimateHands(vid);
  if (predictions.length > 0) {
    theta = calcAngle(predictions);
    if (theta > 1) {
      console.log("fistbump");
    } else {
      console.log("flat");
    }
    /*
      `predictions` is an array of objects describing each detected hand, for example:
      [
        {
          handInViewConfidence: 1, // The probability of a hand being present.
          boundingBox: { // The bounding box surrounding the hand.
            topLeft: [162.91, -17.42],
            bottomRight: [548.56, 368.23],
          },
          landmarks: [ // The 3D coordinates of each hand landmark.
            [472.52, 298.59, 0.00],
            [412.80, 315.64, -6.18],
            ...
          ],
          annotations: { // Semantic groupings of the `landmarks` coordinates.
            thumb: [
              [412.80, 315.64, -6.18]
              [350.02, 298.38, -7.14],
              ...
            ],
            ...
          }
        }
      ]
      */

    for (let i = 0; i < predictions.length; i++) {
      const keypoints = predictions[i].landmarks;
      //console.log(keypoints)

      // Log hand keypoints.
      for (let i = 0; i < keypoints.length; i++) {
        const [x, y, z] = keypoints[i];
        //console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
      }
    }
  }
  setTimeout(() => {
    predictLoop(vid, model);
  }, timeout);
}

console.log("handposejs");
async function main() {
  // Load the MediaPipe handpose model.
  const model = await handpose.load();
  // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain a
  vid = document.getElementById("arjs-video");
  // hand prediction from the MediaPipe graph.
  predictLoop(vid, model);
}

waitForElementToDisplay("video", 500);
