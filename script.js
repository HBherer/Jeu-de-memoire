"use strict"
$(document).ready(validation());

let cartesTournees = []
let pairesTrouvees = 0
let pairesATrouvees;

let btnValidate = document.getElementById("valider")
btnValidate.addEventListener("click", validation)

/**
 * Sert à faire afficher un message de fin de partie au joueur si le temps est écouler et efface les cartes
 *
 */
function afficheFinPartie() {
  let finPartie = document.createElement("P")
  const message = document.getElementById("message")
  let texte = document.createTextNode("Temps écoulé, Vous avez perdu la partie!")
  finPartie.appendChild(texte)
  message.appendChild(finPartie)
}
/**
 * Sert à afficher un message de fin du jeu si la partie est gagner et efface les cartses
 *
 */
function affichePartieVictoire() {
  let finPartie = document.createElement("P")
  const message = document.getElementById("message")
  let texte = document.createTextNode("Bravo! Vous avez fini la partie avant que le temps ne soit écoulé complètement!")
  finPartie.appendChild(texte)
  message.appendChild(finPartie)
}
/**
 * Sert à calculer le temps au moment que le jeu se lance et à afficher le temps à chaque seconde
 *
 * @param {*} nbMinutes est le nombre de minute que le que chronomètre vas compter
 * @return {*} retourne la variable de temps (intervale), donc se qui défini se que c'est 1 seconde pour la fonction
 */
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
/**
 * Sert à alléger la fonction demarrerTimer et diminuerPAsSeconde
 *
 * @param {*} nbSecondes est ce que représente 1 seconde pour la fonction
 */
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
/**
 * Sert à gérer une fois qu'une carte est cliqué, si carte identique, les retirer du choix. Si carte différente les remettre en caché pour que le joueur puisse les re choisir
 *
 * @param {*} e prend l'information du dernier clique du joueur
 */
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
/**
 * Sert à unifier la fonction retourCarteZero1 et retourCarteZero2
 *
 * @param {*} e prend l'information du dernier clique du joueur
 */
function retourCarteZero(e) {
  retourCarteZero1(e)
  retourCarteZero2(e)
}
/**
 * Sert à cacher la donnée de la 2e carte
 *
 * @param {*} e prend l'information du dernier clique du joueur
 */
function retourCarteZero2(e) {
  let derniereCarteClick1 = e.target
  derniereCarteClick1.textContent = " "
  let zero2 = document.createTextNode("♣")
  derniereCarteClick1.appendChild(zero2)
}
/**
 * Sert à cacher la donnée de la 1er carte
 *
 */
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
/**
 * Sert à alléger la function clicCarte
 *
 */
function nmpaireAtrouver() {
  pairesATrouvees = document.getElementById("nbCarteEntrer").value
  pairesATrouvees = parseInt(pairesATrouvees)
}
/**
 * Sert à générer les cartes une fois que l'utilisateur lance le jeu
 *
 */
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
/**
 * Sert à afficher la valeur caché de chaque carte
 *
 * @param {*} e prend l'information du dernier clique du joueur
 */
function retournerCarte(e) {
  const carteRetourner = e.target
  const nombre = carteRetourner.getAttribute("value")
  let texte = document.createTextNode(nombre)
  carteRetourner.textContent = " "
  carteRetourner.appendChild(texte)
}
/**
 * Sert à afficher le nom du joueur dans le header du HTML. Selon l'entré du nom du joueur.
 *
 */
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
/**
 * Sert à faire la validation des champs que l'utilisateur a à remplir
 *
 * @param {*} e prend l'information du dernier clique du joueur
 */
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