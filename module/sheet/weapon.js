const ItemSheetV2 = foundry.applications.sheets.ItemSheetV2;
const { HandlebarsApplicationMixin } = foundry.applications.api;

/** Gestion de la feuille d'objet */
export default class LiberWeaponSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["liber", "item"],
    position: { width: 400, height: 600 },
    form: { submitOnChange: true },
    window: { resizable: true },
    actions: {
      //editImage: LiberItemSheet.#onEditImage,
      story:LiberWeaponSheet.#onStory
    }
  };

  /** @override */
  static PARTS = {
    header: { template: "systems/liber/templates/item/item-header.hbs" },
    main:{template: "systems/liber/templates/item/item-main-weapon.hbs"}
  };

  _onRender(context, options) {
    console.log("Context rendu :", context);
  }


  /** Préparation des données */
  async _prepareContext() {
      const context = {
        fields: this.document.schema.fields, 
        systemFields: this.document.system.schema.fields,
        source: this.document.toObject(),
        item: this.document,
        system: this.document.system
      };

    return context;
  }

  _prepareItemData(itemData) {
    const data = itemData.system;
    console.log(data)
  }
  static async #onStory(event, target) {
    const weaponTypes = [
      "Épée", "Hache", "Dague", "Lance", "Arc", 
      "Marteau de guerre", "Bâton", "Fléau", "Masse", "Katana",
      "Rapière", "Gourdin", "Hallebarde", "Arbalète", "Cimeterre",
      "Fouet", "Griffes", "Pique", "Trident", "Gantelet"
    ];
    const nameModifiers = [
      "du Soleil", "des Ombres", "de l’Infini", "du Titan", "du Dragon",
      "du Démon", "de la Tempête", "du Chaos", "de l’Éclipse", "des Anciens",
      "de la Lune", "des Abysses", "du Jugement", "des Cieux", "du Phénix",
      "du Tonnerre", "du Destin", "du Roi", "du Vampire", "de la Sorcière"
    ];
    const magicEffects = [
      "+1d6 dégâts de feu", "+1d8 dégâts de glace", "50% de chance de foudroyer l'ennemi, 1d10 passe armure",
      "Drain de vie (+1 PV par coup)", "Régénération lente (+1 PV/tour)", "Double attaque, si l'arme est utilisé en arme secondaire, pas de malus",
      "inflige au poison","Absorption d’énergie, 1psy par coup", "Ralentit les ennemis touchés, perds une demi action", 
      "Émet une lumière divine", "L'arme revient toujours en main", "Augmente la parade du porteur de 20%"
    ];
    const diceOptions = [4, 6, 8];
    let itemType, itemName, effect, dieType, diceCount ,bonus, degat;
    itemType = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
    itemName = nameModifiers[Math.floor(Math.random() * nameModifiers.length)];
    effect = magicEffects[Math.floor(Math.random() * magicEffects.length)];
    dieType = diceOptions[Math.floor(Math.random() * diceOptions.length)];
    diceCount = Math.random() < 0.5 ? 1 : 2; 
    bonus = Math.floor(Math.random() * 3); 
    degat=`${diceCount}d${dieType}${bonus > 0 ? `+${bonus}` : ""}`;
    this.item.update({'name':itemType +" "+ itemName,'system.biography':effect,'system.degat':degat});
  }
}