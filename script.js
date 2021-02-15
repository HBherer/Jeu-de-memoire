"use strict"
$(document).ready(validation());


let cartesTournees = []
let pairesTrouvees = 0
let pairesATrouvees;

let btnValidate = document.getElementById("valider")
btnValidate.addEventListener("click", validation)






function clicCarte(e) {
  nmpaireAtrouver()
  retournerCarte(e)
  cartesTournees.push(e.target)
  console.log(cartesTournees)
  if (cartesTournees.length === 2) {
    if (cartesTournees[0].values !== cartesTournees[1].values) {
      pairesTrouvees = pairesTrouvees + 1
      cartesTournees.splice(0);
      console.log("ouiouiouioui")
      if (pairesTrouvees === pairesATrouvees) {
        alert("Le jeu est fini!")
      }
    }
    else {
      setInterval(retourCarteZero(e), 2000)
      
      console.log("NONONONONO")
    }
  }
}

function retourCarteZero(e){
  retourCarteZero1(e)
  retourCarteZero2(e)
}

function retourCarteZero2(e) {
  let derniereCarteClick1 = e.target
      derniereCarteClick1.textContent = " "
      let zero2 = document.createTextNode("♣")
      derniereCarteClick1.appendChild(zero2)
}

function retourCarteZero1(e) {
  for (let i = 0; i < cartesTournees.length; i++) {
    let derniereCarteClick = cartesTournees[i]
    derniereCarteClick.textContent = " "
    let zero = document.createTextNode("♣")
    derniereCarteClick.appendChild(zero)

    cartesTournees.splice(0);
    console.log(cartesTournees)
  }
}

function nmpaireAtrouver() {
  pairesATrouvees = document.getElementById("nbCarteEntrer").value
  pairesATrouvees = parseInt(pairesATrouvees)
  console.log(pairesATrouvees)
}



function genererBoutons() {
  document.title = "Jeu de Mémoire | En cour de jeu"
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
  formul.style.visibility = "hidden"
  let nombreBoutons = tableauCartesMelangees.length
  const jeu = document.getElementById("jeu")
  jeu.innerHTML = ""
  for (let i = 0; i < nombreBoutons; i++) {
    const bouton = document.createElement("button")
    bouton.style.height = "100px"
    bouton.style.width = "60px"
    bouton.style.backgroundColor = "white"
    let texte = document.createTextNode("♣")
    bouton.setAttribute("dataNombreCache", tableauCartesMelangees[i])
    bouton.appendChild(texte)
    bouton.addEventListener("click", clicCarte)
    jeu.appendChild(bouton)
  }
}

function retournerCarte(e) {
  const carteRetourner = e.target
  const nombre = carteRetourner.getAttribute("dataNombreCache")
  let texte = document.createTextNode(nombre)
  carteRetourner.textContent = " "
  carteRetourner.appendChild(texte)
}






function afficheNomJoueur() {
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
    submitHandler: function (form, event) {
      event.preventDefault();
      afficheNomJoueur()
      genererBoutons()
    }
  })
}






// setTimeout(nomDeLaFonction, 2000)
// setInterval(nomVariable, 2000)
// clearInterval(laVariable)