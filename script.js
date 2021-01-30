const nombrePaires = 10
const nbTours = nombrePaires // J'avais fait une division par deux ici
const tableauCartes = []
for (let i = 0; i < nbTours; i++) {
  tableauCartes.push(i)
  tableauCartes.push(i)
}

const tableauCartesMelangees = []
while(tableauCartes.length > 0) {
  const index = Math.floor(Math.random() * tableauCartes.length)
  tableauCartesMelangees.push(tableauCartes[index])
  tableauCartes.splice(index, 1)
  console.log(tableauCartes)
  console.log(tableauCartesMelangees)

}



const form = document.getElementById("formConfig")
form.addEventListener("submit, valider")

function valider(e){
    const messages = []
    let nbCarte = document.inscription.nbCarte.value
    nbCarte = // reste à le mettre en nombre paire tout le temps
}


if (Message.length > 0) {
    e.preventDefault()
    const div = document.getElementById("message")
}