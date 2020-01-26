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
    let amp = 75;
    for (let i = 1; i <= n; i++) {
        lines.push({A : (amp/i) * (i%2 ? 1:-1) , f : BASE_FREQ * i, ph : PI/2})  
    }
}

function squareWave(n) {
    n = n || harmonicsCount;
    currentPreset = squareWave;

    resetGraphData();
    let amp = 100
    for (let i = 0; i < n; i++) {
        lines.push({A : amp * (((i+1)%2 == 1?1:-1)) / (i*2+1), f : BASE_FREQ*(1+2*i) });
    }
}

function triangleWave(n) {
    n = n || harmonicsCount;
    currentPreset = triangleWave;

    resetGraphData();
	let amp = 100;
	for (let i = 0; i < n; i++) {
		lines.push({A: amp*(1/((i*2 + 1)**2)) , f: BASE_FREQ * (i*2 + 1)})
	}
}

function sineWave(amp, freq, phase) {
    amp = amp || 100;
    freq = freq || 1;
    phase = phase || 0;
    resetGraphData();
    currentPreset = sineWave;
    lines.push({A : amp/2 , f: BASE_FREQ * freq, ph: -PI/2 + phase}) // -ie^ix
    lines.push({A : amp/2 , f: BASE_FREQ * -freq, ph: PI/2 - phase}) // ie^-ix
}

function cosineWave(amp , freq, phase) {
    amp = amp || 100;
    freq = freq || 1;
    phase = phase || 0;
    currentPreset = cosineWave;
    resetGraphData();
    
    lines.push({A: amp/2 , f: BASE_FREQ * freq , ph: phase}); // e^ix
    lines.push({A: amp/2 , f: BASE_FREQ * -freq, ph: -phase}) // e^-ix
} 

function posExpWave(amp, freq, phase) {
    amp = amp || 100; freq = freq || 1; phase = phase || 0;
    resetGraphData();
    currentPreset =  posExpWave;
    lines.push({A: amp, f: BASE_FREQ*freq, ph: phase});
}

function negExpWave(amp, freq, phase) {
    amp = amp || 100; freq = freq || 1; phase = phase || 0;
    resetGraphData();
    currentPreset =  negExpWave;
    lines.push({A: amp, f: BASE_FREQ*-freq, ph:phase});
}

