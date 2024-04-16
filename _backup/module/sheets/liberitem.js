/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Items}
 */
 export class LiberItem extends Item {
  static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["Liber", "sheet", "item"],
          width: 600,
          height: 400,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "monstre" }]
        });
    }

  prepareData() {
    super.prepareData();
    //const itemData = this.system;
    const itemData = this.system;
    //const data = itemData.system;
    const data = itemData.system;
    const flags = itemData.flags;
  	//preparation dépendant du type de personnage (
  	if (itemData.type === 'arme') this._prepareItemData(itemData);
    if (itemData.type === 'armure') this._prepareItemData(itemData);
    if (itemData.type === 'objet') this._prepareItemData(itemData);
    if (itemData.type === 'magie') this._prepareItemData(itemData);
  }

  _prepareItemData(itemData) {
    const data = itemData.system;
  }

  prepareBaseData() { 
  }

  prepareDerivedData() {
  }

  DegatLvl(){
    let itemData = this.system;
    let dgt=itemData.degats;
    if(dgt==0){
      this.update({'system.degat':0});
    }else {
      var fixe = dgt.split('+');
      var des=fixe[0].split('d');
      var number=fixe[1];
      var nb=des[0];
      var type=des[1];

      if(number==undefined||number==""){
          number=0;
      }
      
      var limite=4;
      if(number<limite){
        number++;
      }else {
        number=3;
        if(nb<limite){
          nb++;
        }else{
          nb=3;
          if(type==4){
            type=6
          }else if(type==6){
            type=8
          }else if(type==8){
            type=10
          }else if(type==10){
            type=12
          }else if(type==12){
            type=20
          }else if(type==20){
            type=100
          }else if(type==100){
            if(nb<limite){
              nb++;
            }
          }
        }

      }
      console.log(nb+'d'+type+'+'+number)
      var ndgt=nb+'d'+type+'+'+number; 
      this.update({'system.degats':ndgt});
    }
    
  }
}