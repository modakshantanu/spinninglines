const PI = Math.PI;
let currentPreset = () => {};

function sawtoothWave(n) {
    currentPreset = sawtoothWave;
    lines = [];
    graphPoints = [];
    let amp = 75;
    for (let i = 1; i <= n; i++) {
        lines.push({A : (amp/i) * (i%2 ? 1:-1) , f : BASE_FREQ * i, ph : PI/2})  
    }
}

function squareWave(n) {
    currentPreset = squareWave;

    lines = [];
    graphPoints = [];
    let amp = 100
    for (let i = 0; i < n; i++) {
        lines.push({A : amp * (((i+1)%2 == 1?1:-1)) / (i*2+1), f : BASE_FREQ*(1+2*i)});
    }
}

function triangleWave(n) {
    currentPreset = triangleWave;

    lines = [];
    graphPoints = [];
	let amp = 100;
	for (let i = 0; i < n; i++) {
		lines.push({A: amp*(1/((i*2 + 1)**2)) , f: BASE_FREQ * (i*2 + 1)})
	}
}

