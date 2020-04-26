class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playButton = document.querySelector(".play");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0; // To monitor the actual track
        this.bpm = 150; // beats per minute
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
                    this.snareAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start(){
        let interval = (60/this.bpm) * 1000;
        setInterval(() =>{
            this.repeat();
        }, interval);
    }
}


let drumkit = new Drumkit();


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
});

