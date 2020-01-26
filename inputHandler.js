window.onload = () => {
    
    let squareButton = document.getElementById('square-button')
    let triangleButton = document.getElementById('triangle-button')
    let sawtoothButton = document.getElementById('sawtooth-button')
    let cosineButton = document.getElementById('cosine-button');
    let sineButton = document.getElementById('sine-button');
    let posExpButton = document.getElementById('pos-exp-button');
    let negExpButton = document.getElementById('neg-exp-button');
    let pauseButton = document.getElementById('pause-button');
    // let lowGraphicsButton = document.getElementById('graphics-input');
    squareButton.onclick = () => squareWave(harmonicsCount);
    triangleButton.onclick = () => triangleWave(harmonicsCount);
    sawtoothButton.onclick = () => sawtoothWave(harmonicsCount);
    cosineButton.onclick = () => cosineWave();
    sineButton.onclick = () => sineWave();
    posExpButton.onclick = () => posExpWave();
    negExpButton.onclick = () => negExpWave();
    // lowGraphicsButton.onclick = () => lowGraphicsMode = !lowGraphicsMode;

    let harmonicsInput = document.getElementById('harmonics-input');
    harmonicsInput.value = 10; // default value
    harmonicsInput.onchange = (e) => {
        let c = e.target.valueAsNumber;
        c = max(1, min(100, c)); // Fix the value within range if the user is being naughty
        harmonicsCount = c;
        e.target.value = c;
        currentPreset()
    }

    let speedInput = document.getElementById('speed-input');
    speedInput.onchange = (e) => {
        BASE_FREQ = e.target.valueAsNumber;
        currentPreset();
    }

    pauseButton.onclick = () => {
        isPaused = !isPaused;
        if (isPaused) {
            pauseButton.innerText = "Play";
        } else {
            pauseButton.innerText = "Pause";
        }
    }
}
