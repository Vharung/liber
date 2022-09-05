/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
 export class LiberActor extends Actor {
  prepareData() {
    super.prepareData();
    const actorData = this.system;
    const data = actorData;
    const flags = actorData.flags;
  	if (actorData.type === 'personnage') this._preparePJData(actorData);
  }

  _preparePJData(actorData) {
    const data = actorData;
    console.log(`Liber | Préparation Data PJ.\n`);
    console.log(data);
    actorData.system.encombrement.max=(parseInt(actorData.force) + parseInt(actorData.system.caracteristique.puissance)) /2 + 20;
    
  }

  prepareBaseData() {
  }

  prepareDerivedData() {
  }
}