class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playButton = document.querySelector(".play");
        this.currentKick = "./sounds/kick-classic.wav"
        this.currentSnare = "./sounds/snare-acoustic01.wav"
        this.currentHihat = "./sounds/hihat-acoustis01.wav"
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0; // To monitor the actual track
        this.bpm = 150; // beats per minute
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteButtons = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }
    activePad(){
        this.classList.toggle("active");
    }
    repeat(){
        let step = this.index % 8; // There are 8 beat pads
        let activeBars = document.querySelectorAll(`.b${step}`);
        // Loop over the pads and add animation style
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            // Check if the pads are active
            if(bar.classList.contains("active")){
                // Check which sound is active
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0; // To restart the time so that the sound plays right away 
                    this.kickAudio.play();
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start(){
        let interval = (60/this.bpm) * 1000;
        // Check if it's already playing:
        if(this.isPlaying){
            // Clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        } else {
            this.isPlaying = setInterval(() =>{
                this.repeat();
            }, interval)
        }
    }
    // Update text inside the button 
    updateBtn(){
        if(!this.isPlaying){
            this.playButton.innerText = "Play";
            this.playButton.classList.add("active");
        }
        else {
            this.playButton.innerText = "Stop";
            this.playButton.classList.remove("active");
        }
    }
    changeSound(e){
        let selectionName = e.target.name;
        let selectionValue = e.target.value;
        //console.log(selectionName);
        switch(selectionName){
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
    mute(e){
        //console.log(e);
        let muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if(e.target.classList.contains("active")){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        }
        else {
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e){
        //console.log(e);
        let tempoText = document.querySelector(".tempo-nr");

        tempoText.innerText = e.target.value;
    }
    updateTempo(e) {
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null; // To change to stop after changing tempo        
        if (!this.playButton.classList.contains("active")){
            this.start();
        }
        
    }
}


const drumkit = new Drumkit();




// Event listeners:

// Loop to activate the pads on click
drumkit.pads.forEach(pad =>{
    pad.addEventListener("click", drumkit.activePad);
    pad.addEventListener("animationend", function(){
        this.style.animation = ""; // Remove the style so that the animation loop continues
    });
})

// Play button to start the loop
drumkit.playButton.addEventListener("click", () =>{
    drumkit.start();
    drumkit.updateBtn();
});

drumkit.selects.forEach(select => {
    select.addEventListener("change", function(e){
        drumkit.changeSound(e);
    });
});

drumkit.muteButtons.forEach(btn =>{
    btn.addEventListener("click", function(e){
        drumkit.mute(e);
    });
});

drumkit.tempoSlider.addEventListener("input", function(e){
    drumkit.changeTempo(e)
});

drumkit.tempoSlider.addEventListener("change", function(e){
    drumkit.updateTempo(e)
});