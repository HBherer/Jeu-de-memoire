"use strict"
$(document).ready(validation());


let catesTournees = []
let pairesTrouvees = 0
let pairesATrouvees;

let btnValidate = document.getElementById("valider")
btnValidate.addEventListener("click", validation)




function genererBoutons() {
  let nombrePaires = document.getElementById("nbCarteEntrer").value
  nombrePaires = parseInt(nombrePaires)
  const nbTours = nombrePaires
  const tableauCartes = []
  for (let i = 0; i < nbTours; i++) {
    tableauCartes.push(i)
    tableauCartes.push(i)
  }
  var tableauCartesMelangees = []
  while (tableauCartes.length > 0) {
    const index = Math.floor(Math.random() * tableauCartes.length);
    tableauCartesMelangees.push(tableauCartes[index]);
    tableauCartes.splice(index, 1);
  }
  formul.innerHTML = ""
  let nombreBoutons = tableauCartesMelangees.length
  // const message = valider(parametre)
  const jeu = document.getElementById("jeu")
  jeu.innerHTML = ""
  for (let i = 0; i < nombreBoutons; i++) {
    const bouton = document.createElement("button")
    bouton.style.height = "100px"
    bouton.style.width = "60px"
    bouton.style.backgroundColor = "white"
    let texte = document.createTextNode("")
    texte = document.createTextNode("♣")
    bouton.setAttribute("data-nombre-cache", tableauCartesMelangees[i])
    bouton.appendChild(texte)
    bouton.addEventListener("click", retournerCarte)
    jeu.appendChild(bouton)
  }
}

function retournerCarte(e) {
  const carteRetourner = e.target
  const nombre = carteRetourner.getAttribute("data-nombre-cache")
  let texte = document.createTextNode(nombre)
  carteRetourner.appendChild(texte)
}


function clicCarte(){

}



function afficheNomJoueur(){
  let nom = document.createElement("P")
  nomAfficher.innerHTML = ""
  let nomUser = document.getElementById("nomUser").value
  let texte = document.createTextNode(nomUser)
  nom.appendChild(texte)
  nomAfficher.appendChild(nom)
}


function validation(e) {
  $("form[name='formulaire']").validate({
    rules: {
      nombreCarte: {
        required: true,
        number: true,
      },
      nomUtilisateur: {
        required: true,
      },
    },
    messages: {
      nombreCarte: "Veuillez entrer un nombre paire entre 2 et 10 inclusivement",
      nomUtilisateur: "Veuillez entrer votre nom",
    },
    submitHandler: function(form, event) {
       event.preventDefault();
       afficheNomJoueur()
       genererBoutons()
    }
  })
}




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