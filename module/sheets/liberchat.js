export class LiberChat {
  constructor() {
    // Sélectionnez le bouton avec la classe "attack" et ajoutez un écouteur d'événements "click"
    const attackButton = document.querySelector('.attack');
    attackButton.addEventListener('click', this.attackHandler);
  }
  
  attackHandler() {
    // Affichez un message lorsque le bouton est cliqué
    console.log("L'attaque a été lancée !");
  }
}