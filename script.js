"use strict"
$(document).ready(validation());


let cartesTournees = []
let pairesTrouvees = 0
let pairesATrouvees;

let btnValidate = document.getElementById("valider")
btnValidate.addEventListener("click", validation)


//function afficheTimer() {
//  let time = document.createElement("P")
//  const tempsAfficher = document.getElementById("tempsAfficher")
//  let texte = document.createTextNode(demarrerTimer())
//  time.appendChild(texte)
//  tempsAfficher.appendChild(time)
//}

var intervale

function demarrerTimer() {
  let temps = 3
  document.getElementById("tempsAfficher").innerHTML = temps
  intervale = setInterval(diminuerParSeconde, 1000)
  return intervale
}
function diminuerParSeconde(intervale) {
  let temps = document.getElementById("tempsAfficher").innerHTML
  temps = parseInt(temps)
  document.getElementById("tempsAfficher").innerHTML = temps - 1
  if (temps - 1 === 0) {
    clearInterval(intervale)
    // Ajouter function de fin de temps et de jeu
  }
}



function clicCarte(e) {
  nmpaireAtrouver()
  retournerCarte(e)
  cartesTournees.push(e.target)
  cartesTournees[0].disabled = true
  if (cartesTournees.length === 2) {
    if (cartesTournees[0].value == cartesTournees[1].value) {
      pairesTrouvees = pairesTrouvees + 1
      cartesTournees[1].disabled = true
      cartesTournees.splice(0);
      if (pairesTrouvees === pairesATrouvees) {
        document.title = "Jeu de Mémoire | Vous avez Gagner!"
        alert("Le jeu est fini!")
      }
    }
    else {
      setTimeout(retourCarteZero, 1000, (e))
    }
  }
}


function retourCarteZero(e) {
  retourCarteZero1(e)
  retourCarteZero2(e)
}

function retourCarteZero2(e) {
  let derniereCarteClick1 = e.target
  derniereCarteClick1.textContent = " "
  let zero2 = document.createTextNode("♣")
  derniereCarteClick1.appendChild(zero2)
}

function retourCarteZero1() {
  for (let i = 0; i < cartesTournees.length; i++) {
    let derniereCarteClick = cartesTournees[i]
    derniereCarteClick.textContent = " "
    let zero = document.createTextNode("♣")
    derniereCarteClick.appendChild(zero)
    cartesTournees[i].disabled = false
    cartesTournees.splice(0);
  }
}

function nmpaireAtrouver() {
  pairesATrouvees = document.getElementById("nbCarteEntrer").value
  pairesATrouvees = parseInt(pairesATrouvees)
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
    bouton.setAttribute("value", tableauCartesMelangees[i])
    bouton.appendChild(texte)
    bouton.addEventListener("click", clicCarte)
    jeu.appendChild(bouton)
  }
}

function retournerCarte(e) {
  const carteRetourner = e.target
  const nombre = carteRetourner.getAttribute("value")
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
      demarrerTimer()
      genererBoutons()
    }
  })
}