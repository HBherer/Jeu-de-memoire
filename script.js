"use stric"

let catesTournees = []
let pairesTrouvees = 0
let pairesATrouvees;


document.getElementsByClassName("carte")[0].addEventListener("click", genererCarte)


function genererCarte() {
  const nombrePaires = document.getElementsByName("number")[0].values
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
    
  }console.log(tableauCartes)
    console.log(tableauCartesMelangees)
    console.log(nombrePaires)
}

function erreur() {
  document.getElementsByClassName("message")[0].textContent = "Erreur"
}

// const form = document.getElementById("formConfig")
// form.addEventListener("submit, valider")
// 
// function valider(e){
//     const messages = []
//     let nbCarte = document.inscription.nbCarte.value
//     nbCarte = // reste à le mettre en nombre paire tout le temps
// }
// 
// 
// if (Message.length > 0) {
//     e.preventDefault()
//     const div = document.getElementById("message")
// }
// 
// setTimeout(nomDeLaFonction, 2000)
// setInterval(nomVariable, 2000)
// clearInterval(laVariable)