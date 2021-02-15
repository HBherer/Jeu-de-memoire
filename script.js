"use strict"
$(document).ready(validation());


let cartesTournees = []
let pairesTrouvees = 0
let pairesATrouvees;

let btnValidate = document.getElementById("valider")
btnValidate.addEventListener("click", validation)


function afficheFinPartie() {
  let finPartie = document.createElement("P")
  const message = document.getElementById("message")
  let texte = document.createTextNode("Temps écoulé, Vous avez perdu la partie!")
  finPartie.appendChild(texte)
  message.appendChild(finPartie)
}
function affichePartieVictoire() {
  let finPartie = document.createElement("P")
  const message = document.getElementById("message")
  let texte = document.createTextNode("Bravo! Vous avez fini la partie avant que le temps ne soit écoulé complètement!")
  finPartie.appendChild(texte)
  message.appendChild(finPartie)
}


function demarrerTimer(nbMinutes) {
  let temps = nbMinutes * 60
  updateAffichage(temps)
  let secondes = temps % 60
  const minutes = Math.floor(temps / 60)
  if (secondes < 10) {
    secondes = "0" + secondes
  }
  document.getElementById("tempsAfficher").textContent = "Temps restant:" + minutes + ":" + secondes
  document.getElementById("tempsAfficher").setAttribute("dataSecondes", temps)
  var intervale = setInterval(diminuerParSeconde, 1000)
  return intervale
  function diminuerParSeconde() {
    let nbSecondes = document.getElementById("tempsAfficher").getAttribute("dataSecondes")
    nbSecondes = parseInt(nbSecondes)
    nbSecondes = nbSecondes - 1
    updateAffichage(nbSecondes)
    if (nbSecondes === 0) {
      clearInterval(intervale)
      document.title = "Jeu de Mémoire | Vous avez Perdu!"
      jeu.textContent = ""
      afficheFinPartie()
    }
  }
}


function updateAffichage(nbSecondes) {
  let secondes = nbSecondes % 60
  const minutes = Math.floor(nbSecondes / 60)
  if (secondes < 10) {
    secondes = "0" + secondes
  }
  const timer = document.getElementById("tempsAfficher")
  timer.textContent = "Temps restant:" + minutes + ":" + secondes
  timer.setAttribute("dataSecondes", nbSecondes)
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
        jeu.textContent = ""
        affichePartieVictoire()
        demarrerTimer()
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
jQuery.validator.addMethod("fullname", function(value, element) {
  if (/^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/.test(value)) {
    return true;
  } else {
    return false;
  };
})

function validation(e) {
  $("form[name='formulaire']").validate({
    rules: {
      nombreCarte: {
        required: true,
        number: true,
        min: 2,
        max: 10, 
      },
      nomUtilisateur: {
        required: true,
        fullname: true,
      },
    },
    messages: {
      nombreCarte: "Veuillez entrer un nombre paire entre 2 et 10 inclusivement",
      nomUtilisateur: "Entrer votre nom complet  (Exemple: Prénom Nom)",
    },
    submitHandler: function (form, event) {
      event.preventDefault();
      afficheNomJoueur()
      demarrerTimer(5)
      genererBoutons()
    }
  })
}