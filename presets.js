const PI = Math.PI;
let currentPreset = () => {};

function resetGraphData() {
    lines = [];
    graphPoints = [];
}

function sawtoothWave(n) {
    n = n || harmonicsCount;
    currentPreset = sawtoothWave;
    resetGraphData();
    let amp = 3.75;
    for (let i = 1; i <= n; i++) {
        lines.push({A : (amp/i) * (i%2 ? 1:-1) , f :  i, ph : PI/2})  
    }
    let text = `// This wave is usually written as a sum of sin/cos\n// Here it is shown as a sum of exp for simplicity\n`
    fillTextfield(text);
}

function squareWave(n) {
    n = n || harmonicsCount;
    currentPreset = squareWave;

    resetGraphData();
    let amp = 5
    for (let i = 0; i < n; i++) {
        lines.push({A : amp * (((i+1)%2 == 1?1:-1)) / (i*2+1), f : (1+2*i) , ph : 0});
    }
    let text = `// This wave is usually written as a sum of sin/cos\n// Here it is shown as a sum of exp for simplicity\n`
    fillTextfield(text);
}

function triangleWave(n) {
    n = n || harmonicsCount;
    currentPreset = triangleWave;

    resetGraphData();
	let amp = 5;
	for (let i = 0; i < n; i++) {
		lines.push({A: amp*(1/((i*2 + 1)**2)) , f:  (i*2 + 1), ph : 0})
    }
    let text = `// This wave is usually written as a sum of sin/cos\n// Here it is shown as a sum of exp for simplicity\n`
    fillTextfield(text);
}

function sineWave(amp = 5, freq = 1, phase = 0) {

    resetGraphData();
    currentPreset = sineWave;
    lines.push({A : amp/2 , f:  freq, ph: -PI/2 + phase}) // -ie^ix
    lines.push({A : amp/2 , f:  -freq, ph: PI/2 - phase}) // ie^-ix
    fillTextfield();
}

function cosineWave(amp = 5, freq = 1, phase = 0) {

    currentPreset = cosineWave;
    resetGraphData();
    
    lines.push({A: amp/2 , f:  freq , ph: phase}); // e^ix
    lines.push({A: amp/2 , f:  -freq, ph: -phase}) // e^-ix
    fillTextfield();
} 

function posExpWave(amp = 5, freq = 1, phase = 0) {
    resetGraphData();
    currentPreset =  posExpWave;
    lines.push({A: amp, f: freq, ph: phase});
    fillTextfield();
}

function negExpWave(amp = 5 , freq = 1, phase = 0) {
    resetGraphData();
    currentPreset =  negExpWave;
    lines.push({A: amp, f: -freq, ph:phase});
    fillTextfield();
}

function fillTextfield(text = '') {
    for (let l of lines) {
        text += lineToString(l) + '\n';
    }
    textarea.value = text;
    textarea.rows = max(5,min(lines.length + 4 , 20));
}

function lineToString({A , f , ph}) {
    return A.toFixed(2) + ' * exp(i*( ' + f.toFixed(2) + 't + ' + ph.toFixed(2) + ' ))';
}

