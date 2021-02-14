"use strict"
$(document).ready(validation());


let catesTournees = []
let pairesTrouvees = 0
let pairesATrouvees;

let btnValidate = document.getElementById("valider")
btnValidate.addEventListener("click", genererBoutons)


function melangerCarte() {
  let nombrePaires = document.getElementById("nbCarteEntrer").values
  nombrePaires = parseInt(nombrePaires)
  const nbTours = nombrePaires
  const tableauCartes = []
  for (let i = 0; i < nbTours; i++) {
    tableauCartes.push(i)
    tableauCartes.push(i)
  }
  const tableauCartesMelangees = []
  while (tableauCartes.length > 0) {
    const index = Math.floor(Math.random() * tableauCartes.length)
    tableauCartesMelangees.push(tableauCartes[index])
    tableauCartes.splice(index, 1)
  }
}



function genererBoutons() {
  let nombreBoutons = document.getElementById("nbCarteEntrer").value
  nombreBoutons = parseInt(nombreBoutons)
  // const message = valider(parametre)
  const jeu = document.getElementById("jeu")
  jeu.innerHTML = ""
  for (let i = 0; i < nombreBoutons; i++) {
    const bouton = document.createElement("button")
    bouton.style.height = "80px"
    bouton.style.width = "50px"
    bouton.style.backgroundColor = "green"
    let texte = document.createTextNode("")
    texte = document.createTextNode("?")
    bouton.setAttribute("data-nombre-cache", i)
    bouton.appendChild(texte)
    bouton.addEventListener("click", retournerCarte)
    jeu.appendChild(bouton)
  }
}


function retournerCarte(e){
  let texte = document.createTextNode("")
  const carteRetourner = e.target
  const nombre = carteRetourner.getAttribute("data-nombre-cache")
  texte = document.createTextNode(nombre)
  carteRetourner.appendChild(texte)
}









function validation() {
  $("form[name='formulaire']").validate({
    rules: {
      nombreCarte: "required",
      nomUtilisateur: "required",
    },
    messages: {
      nombreCarte: "Veuillez entrer un nombre paire de carte entre 2 et 10 inclusivement",
      nomUtilisateur: "Veuillez entrer votre nom",
    },
  });
};


//const form = document.getElementById("formConfig")
//form.addEventListener("submit, valider")

//function valider(e){
//    const messages = []
//    let nbCarte = document.inscription.nbCarte.value
//     nbCarte = // reste à le mettre en nombre paire tout le temps
//}

//if (Message.length > 0) {
//    e.preventDefault()
//    const div = document.getElementById("message")
//}

// setTimeout(nomDeLaFonction, 2000)
// setInterval(nomVariable, 2000)
// clearInterval(laVariable)