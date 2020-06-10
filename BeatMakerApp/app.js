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
        const interval = (60/this.bpm) * 1000;
        // Check if it's already playing:
        if(!this.isPlaying){
            this.isPlaying = setInterval(() =>{
                this.repeat();
            }, interval);
        } else {
            // Clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
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
    })
});