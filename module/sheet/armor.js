const ItemSheetV2 = foundry.applications.sheets.ItemSheetV2;
const { HandlebarsApplicationMixin } = foundry.applications.api;

/** Gestion de la feuille d'objet */
export default class LiberArmorSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["liber", "item"],
    position: { width: 400, height: 600 },
    form: { submitOnChange: true },
    window: { resizable: true },
    actions: {
      //editImage: LiberItemSheet.#onEditImage,
      story:LiberArmorSheet.#onStory
    }
  };

  /** @override */
  static PARTS = {
    header: { template: "systems/liber-chronicles/templates/item/item-header.hbs" },
    main:{template: "systems/liber-chronicles/templates/item/item-main-armor.hbs"}
  };

  _onRender(context, options) {
    console.log("Context rendu :", context);
  }


  /** Préparation des données */
  async _prepareContext() {
      console.log("Préparation du contexte de l'objet :", this);
      console.log(this.item.type)

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
    const armorTypes = [
      "Plastron", "Casque", "Bouclier", "Gants", "Bottes",
      "Cape", "Tunique", "Cuirasse", "Jambières", "Brassards",
      "Cotte de mailles", "Armure de plaques", "Robe enchantée", "Gilet de protection", "Épaulettes",
      "Tabard", "Ceinture", "Gantelets renforcés", "Masque mystique", "Heaume"
    ];
    const nameModifiers = [
      "du Soleil", "des Ombres", "de l’Infini", "du Titan", "du Dragon",
      "du Démon", "de la Tempête", "du Chaos", "de l’Éclipse", "des Anciens",
      "de la Lune", "des Abysses", "du Jugement", "des Cieux", "du Phénix",
      "du Tonnerre", "du Destin", "du Roi", "du Vampire", "de la Sorcière"
    ];
    const magicEffects = [
      "Double attaque, pas de malus", "Immunité au poison", "Double la vitesse de déplacement", "Confère une résistance magique, effet des sort /2", "Absorption d’énergie, chaque sort lancer cout 1 psy de moins",
      "Crée une barrière protectrice temporaire, bloque une attaque par jour", "Permet de voir dans l'obscurité",
      "Émet une lumière divine", "Transforme le porteur en ombre temporairement", "Augmente la force du porteur de 2"
    ];
    const diceOptions = [4, 6, 8];
    let itemType, itemName, effect, dieType, diceCount ,bonus;
    itemType = armorTypes[Math.floor(Math.random() * armorTypes.length)];
    itemName = nameModifiers[Math.floor(Math.random() * nameModifiers.length)];
    effect = magicEffects[Math.floor(Math.random() * magicEffects.length)];
    dieType = diceOptions[Math.floor(Math.random() * diceOptions.length)];
    bonus = Math.floor(Math.random() * 5); 
    this.item.update({'name':itemType +" "+ itemName,'system.biography':effect,'system.protec':bonus});
  }

}