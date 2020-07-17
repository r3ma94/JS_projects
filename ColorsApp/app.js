// Global selectors and variables
const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll("input[type='range']");
const currentHexes = document.querySelectorAll(".color h2");
let initicalColors;

// Functions 


// Color Generator
function generateHex(){
    const hexColor = chroma.random();
    return hexColor;
}

function randomColors(){
    colorDivs.forEach((div, index) => {
        const hexText = div.children[0];
        const randomColor = generateHex();

        // Add color to background
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;
    });
}

randomColors();