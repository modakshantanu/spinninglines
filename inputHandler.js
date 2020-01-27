window.onload = () => {
    
    let textarea = document.getElementById('textarea');

    let squareButton = document.getElementById('square-button')
    let triangleButton = document.getElementById('triangle-button')
    let sawtoothButton = document.getElementById('sawtooth-button')
    let cosineButton = document.getElementById('cosine-button');
    let sineButton = document.getElementById('sine-button');
    let posExpButton = document.getElementById('pos-exp-button');
    let negExpButton = document.getElementById('neg-exp-button');
    let pauseButton = document.getElementById('pause-button');
    let goButton = document.getElementById('go-button');
    let syntaxButton = document.getElementById('syntax-button');
    let syntax = document.getElementById('syntax-rules');
    let scaleInput = document.getElementById('scale-input');
    let clearButon = document.getElementById('clear-button');
    syntax.style.display = 'none';
    // let lowGraphicsButton = document.getElementById('graphics-input');
    squareButton.onclick = () => squareWave(harmonicsCount);
    triangleButton.onclick = () => triangleWave(harmonicsCount);
    sawtoothButton.onclick = () => sawtoothWave(harmonicsCount);
    cosineButton.onclick = () => cosineWave();
    sineButton.onclick = () => sineWave();
    posExpButton.onclick = () => posExpWave();
    negExpButton.onclick = () => negExpWave();
    syntaxButton.onclick = () => {
        syntax.style.display = syntax.style.display === 'block' ? 'none' : 'block';
    }
    clearButon.onclick = () => {
        textarea.value = '';
        textarea.rows = 5;
    }
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
        graphPoints = [];
        currentPreset();
    }

    scaleInput.onchange = (e) => {
        SCALE = [1,5,20,100][e.target.valueAsNumber-1];
        graphPoints = [];
    }

    pauseButton.onclick = () => {
        isPaused = !isPaused;
        if (isPaused) {
            pauseButton.innerText = "Play";
        } else {
            pauseButton.innerText = "Pause";
        }
    }

    let errorMessage = document.getElementById('errormsg');
    goButton.onclick = () => {
        errorMessage.innerText = '';
        let res;
        try {
            res = parseText(textarea.value);
        } catch (err) {
            res = false;
        }
        currentPreset = ()=>{};
        if (!res) {
            errorMessage.innerText = 'Invalid Syntax';
        }
    }


}
