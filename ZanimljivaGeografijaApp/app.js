
//selectors
let userNameForm = document.querySelector("#usernameForm")
let userName = document.querySelector("#userName");


let selection = document.querySelector("#select");


let pojamInput = document.querySelector("#inputPojam");
let pojamButton = document.querySelector("#buttonPojam");


//events
userNameForm.addEventListener("submit", () =>{
    localStorage.setItem("userNameLS", userName.value);
});

pojamButton.addEventListener("click", ()=>{
    let date = new Date();
    db.collection("pojmovi").doc().set({
        pocetno_slovo: capitalizeFirstLetter(pojamInput.value.charAt(0)),
        kategorija: selection.value,
        pojam: capitalizeFirstLetter(pojamInput.value.replace(/[^a-zA-Z]/g, '')),
        korisnik: localStorage.getItem("userNameLS"),
        vreme: firebase.firestore.Timestamp.fromDate(date)
        
    })
    .then(function(){
        console.log("Pojam uspesno dodat!")
    })
    .catch(function(error){
        console.error("Nije uspelo dodavanje pojma: ", error)
    });

});






// functions
function capitalizeFirstLetter(string) 
{
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


