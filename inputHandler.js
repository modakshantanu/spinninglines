window.onload = () => {
    
    let squareButton = document.getElementById('square-button')
    let triangleButton = document.getElementById('triangle-button')
    let sawtoothButton = document.getElementById('sawtooth-button')
    squareButton.onclick = () => squareWave(harmonicsCount);
    triangleButton.onclick = () => triangleWave(harmonicsCount);
    sawtoothButton.onclick = () => sawtoothWave(harmonicsCount);

    let harmonicsInput = document.getElementById('harmonics-input');
    harmonicsInput.value = 10; // default value
    harmonicsInput.onchange = (e) => {
        let c = e.target.valueAsNumber;
        c = max(1, min(100, c)); // Fix the value within range if the user is being naughty
        harmonicsCount = c;
        e.target.value = c;
        currentPreset(c)
    }

    let speedInput = document.getElementById('speed-input');
    speedInput.onchange = (e) => {
        BASE_FREQ = e.target.valueAsNumber;
        currentPreset(harmonicsCount);
    }
    
}
