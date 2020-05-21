
//selectors
let userNameForm = document.querySelector("#usernameForm")
let userName = document.querySelector("#userName");


let selection = document.querySelector("#select");


let pojamInput = document.querySelector("#inputPojam");
let pojamButton = document.querySelector("#buttonPojam");

let selectionDiv = document.querySelector("#selection");


let regEx = /[!@#$%^&*(),.?":{}|<>0-9_\s]/g;


userNameForm.addEventListener("submit", () =>{
    localStorage.setItem("userNameLS", userName.value);
});

if(localStorage.userNameLS === undefined) {
    selectionDiv.classList.add("invisible");
}
else {
    selectionDiv.classList.remove("invisible");
}



//events
pojamButton.addEventListener("click", event => {
    event.preventDefault();

    let pocetnoSlovo = capitalizeFirstLetter(pojamInput.value.charAt(0));
    let noviPojam = capitalizeFirstLetter(pojamInput.value.replace(regEx, ''));


    let date = new Date();
    let provera = false;


    db.collection("pojmovi")
    .where('kategorija', '==', selection.value)
    .where('pojam', '==', noviPojam)
    .get()
    .then(snapshot => {
        snapshot.docs.forEach(doc => {
            if(noviPojam == doc.data().pojam) {
                provera = true;
                
            }
        });

        if(provera) {
            alert('Pojam postoji')
        }
        else {
        db.collection("pojmovi").doc().set({
            pocetno_slovo: pocetnoSlovo,
            kategorija: selection.value,
            pojam: noviPojam,
            korisnik: localStorage.getItem("userNameLS"),
            vreme: firebase.firestore.Timestamp.fromDate(date)
            
        })
        .then(function(){
            console.log("Pojam uspesno dodat!")
        })
        .catch(function(error){
            console.error("Nije uspelo dodavanje pojma: ", error)
        });
        }
    })

});





// functions
function capitalizeFirstLetter(string) 
{
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


