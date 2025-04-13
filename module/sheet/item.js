const ItemSheetV2 = foundry.applications.sheets.ItemSheetV2;
const { HandlebarsApplicationMixin } = foundry.applications.api;

/** Gestion de la feuille d'objet */
export default class LiberItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["liber", "item"],
    position: { width: 400, height: 640 },
    form: { submitOnChange: true },
    window: { resizable: true },
    actions: {
      //editImage: LiberItemSheet.#onEditImage,
      story:LiberItemSheet.#onStory
    }
  };

  /** @override */
  static PARTS = {
    header: { template: "systems/liber/templates/item/item-header.hbs" },
    main:{template: "systems/liber/templates/item/item-main-item.hbs"}
  };

  _onRender(context, options) {
    console.log("Context rendu :", context);
  }


  /** Préparation des données */
  async _prepareContext() {
      console.log("Préparation du contexte de l'objet :", this);
      console.log(this.item.type)

      const context = {
        fields: this.document.schema.fields, // ✅ Assure que les champs sont bien accessibles
        systemFields: this.document.system.schema.fields, // ✅ Ajoute les champs système
        source: this.document.toObject(), // ✅ Ajoute `source.name` correctement
        item: this.document,
        system: this.document.system
      };

    return context;
  }

  _prepareItemData(itemData) {
    const data = itemData.system;
    console.log(data)
  }
  static async #onEditImage(event, target) {
    const attr = target.dataset.edit;
    const current = foundry.utils.getProperty(this.document, attr);
    const { img } =
      this.document.constructor.getDefaultArtwork?.(this.document.toObject()) ??
      {};
    const fp = new FilePicker({
      current,
      type: 'image',
      redirectToRoot: img ? [img] : [],
      callback: (path) => {
          this.document.update({ [attr]: path });
      },
      top: this.position.top + 40,
      left: this.position.left + 10,
    });
    return fp.browse();
  }
  static async #onStory(event, target) {
    const itemTypes = ["Anneau", "Amulette", "Potion", "Bâton", "Parchemin", "Cape", "Bottes", "Gants", "Cristal", "Talisman"];
    const nameModifiers = [
      "de l’ombre", "du dragon dormant", "des vents sacrés", "de l’éclair céleste",
      "du sang maudit", "des étoiles", "du titan endormi", "de la lumière éternelle",
      "des esprits errants", "du gardien oublié", "de la lune spectrale", "du chaos pur",
      "du sage ancien", "de la tempête", "du serpent mystique", "des abysses profondes",
      "du destin", "de la clarté absolue", "du renouveau", "de la protection divine"
    ];
    const magicEffects = [
      "Invisibilité pendant 10 secondes", "Ajoute une demi action supplémentaire", "Rend insensible aux poisons",
      "Permet de respirer sous l’eau", "Confère une vision nocturne parfaite", "Double la force pendant 1 minute",
      "Régénère 5 points de vie par tour, pendant 10 tour", "Permet de léviter à 1 mètre du sol",
      "Projette un éclair infligeant 2d6 dégâts", "Permet de parler avec les animaux",
      "Donne une armure magique (+1 d'armure)", "Augmente la résistance au feu, dégât du feu /2",
      "Confère une aura de peur", "Bloque les attaques mentales, télépathie comprise", "Téléportation instantanée sur 10m",
      "Protège contre les effets magiques négatifs, 50% qu'il rate", "Soigne instantanément une blessure grave, usage unique",
      "Double l’endurance temporairement, ignore l'encombrement pour une journée", "Amplifie la magie de l’utilisateur, effet +2",
      "Annule une attaque une fois par jour"
    ];
    let itemType, itemName, effect;
    itemType = armorTypes[Math.floor(Math.random() * armorTypes.length)];
    itemName = nameModifiers[Math.floor(Math.random() * nameModifiers.length)];
    effect = magicEffects[Math.floor(Math.random() * magicEffects.length)];
    this.item.update({'name':itemType +" "+ itemName,'system.biography':effect});
  }
}