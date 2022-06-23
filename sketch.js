
let carrier; // this is the oscillator we will hear
let modulator; // this oscillator will modulate the frequency of the carrier
let analyzer; // we'll use this visualize the waveform



function setup() {
  let cnv = createCanvas(windowWidth, windowHeight/2);
  

  carrier = new p5.Oscillator('square');
  //carrier.amp(1.0, 0.01);
  //carrier.freq(0); // set frequency
  carrier.start(); // start oscillating

  // try changing the type to 'square', 'sine' or 'triangle'
  modulator = new p5.Oscillator('square');
  modulator.start();

  // add the modulator's output to modulate the carrier's frequency
  modulator.disconnect();
  carrier.freq(modulator);

  // create an FFT to analyze the audio
  analyzer = new p5.FFT();

  // fade carrier in/out on mouseover / touch start
  // toggleAudio(cnv);
  handsfree = new Handsfree();
  
  
  
  // Handsfree (x, y)'s so we don't overwrite mouseX and pmouseX
  x = 0
  y = 0
  lastX = 0
  lastY = 0
  
  Handsfree.use('p5XY', (pointer) => {
    lastX = x
    lastY = y
    x = pointer.x
    y = pointer.y

    if (handsfree.head && handsfree.head.state.smirk) {
      line(x, y, lastX, lastY)
    }
  })
  
}


 
function drawWave(waveform, color, startX, endX){
  noFill()
  stroke(color);
  strokeWeight(10);
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    const x = map(i, 0, waveform.length, startX, endX);
    const y = height / 2 + map(waveform[i], -1, 1, -height / 4, height / 4);
    vertex(x, y);
  }
  endShape();
}
 

function keyPressed(){

  if (key == '1') {
   modulator.setType('sine')
   carrier.setType('sine')

    console.log(key)
  }
   else if (key == '2') {
   modulator.setType('square')
   carrier.setType('square')
  } 
  else if (key == '3') {
   modulator.setType('triangle')
   carrier.setType('triangle')
  } 
  else if (key == '4') {
   modulator.setType('sawtooth')
   carrier.setType('sawtooth')
  }
  
 
 }

 function getcolor(waveform){
  let color = ""
  console.log(color)
  if (waveform == 'sine') {
    color= "red"
  }
  else if (waveform == 'square') {
    color = "green"
  }
  else if (waveform == 'triangle') {
    color = "yellow"
  }
  else {
    color = "white"
  }


  return color
 }

function draw() {
  
    const w = width

    const modDepth = map(y, 0, w, 0, 200);
    const modFreq =4// map(mouseY, height, 0, 0, 60);
    modulator.freq(modFreq);
    modulator.amp(modDepth);

    const carDepth = map(y, 0, w, 0, 1);
   const carFreq = map(x, height, 0, 110, 880);
  carrier.freq(carFreq);
    carrier.amp(carDepth);
    //}


  const waveform = analyzer.waveform();
  console.log(modulator)

  background(160,0,200)


  drawWave(waveform, color(getcolor(modulator.oscillator.type)), 0, width)
  //drawWave(waveform, color(0,255,0), width/2, width)
  
  stroke(255);
  strokeWeight(2)
}
