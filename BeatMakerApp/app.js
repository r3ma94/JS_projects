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
        console.log(step);
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
    pad.addEventListener("click", drumkit.activePad)
})

// Play button to start the loop
drumkit.playButton.addEventListener("click", () =>{
    drumkit.start();
});

