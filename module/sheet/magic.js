const ItemSheetV2 = foundry.applications.sheets.ItemSheetV2;
const { HandlebarsApplicationMixin } = foundry.applications.api;

/** Gestion de la feuille d'objet */
export default class LiberMagicSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["liber", "item"],
    position: { width: 400, height: 600 },
    form: { submitOnChange: true },
    window: { resizable: true },
    actions: {
      //editImage: LiberItemSheet.#onEditImage,
      story:LiberMagicSheet.#onStory
    }
  };

  /** @override */
  static PARTS = {
    header: { template: "systems/liber/templates/item/item-header.hbs" },
    main:{template: "systems/liber/templates/item/item-main-magic.hbs"}
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
    const spellTypes = [
        "Boule de feu", "Éclair de givre", "Main spectrale", "Invocation de l’ombre", "Explosion psychique",
        "Vague de force", "Lumière sacrée", "Nuage toxique", "Choc gravitationnel", "Foudre céleste",
        "Chant des esprits", "Orbe du chaos", "Flammes infernales", "Poussée télékinétique", "Mur élémentaire",
        "Invocation de l’élémentaire", "Tempête de sable", "Illusion parfaite", "Regard pétrifiant", "Cri assourdissant"
    ];

    const spellModifiers = [
        "dévastateur", "éthéré", "ancestral", "interdit", "divin", "chaotique", "spectral", "de l’aurore",
        "du néant", "des abysses", "de l’éclipse", "maudit", "suprême", "de la clairvoyance", "des arcanes oubliés",
        "du gardien", "de la destruction", "sacré", "ténébreux", "du phénix"
    ];

    const action = {
        "Blesser / Diminuer": 2,
        "Divise effet": 2,
        "Double effet": 2,
        "Donner": 1,
        "Empoisonner": 2,
        "Immuniser / Protéger": 2,
        "Lire": 1,
        "Marquer / Lier": 0,
        "Modifier / Contrôler": 4,
        "Paralyser / Bloquer": 1,
        "Soigner / Augmenter": 2,
        "Stocker": 1,
        "Voler / Léviter": 1,
        "Voler / Prendre": 1
    };

    const objet = {
        "Capacité": 1,
        "Mentale / Penser de la cible": 2,
        "Psy/Magie de la cible": 1,
        "Vie/Physique de la cible": 1,
        "Objet": 1
    };

    const cible = {
        "2 Cibles": 3,
        "Cible": 0,
        "Zone": 5
    };

    const degat = {
        "1d10": 3,
        "1d20": 5,
        "1d6": 1,
        "1d8": 2,
        "1d4": 0
    };

    const duree = {
        "1 Tour": 0,
        "Permanent": 5,
        "Persistant": 3
    };

    // Sélection aléatoire des éléments du sort
    let selectedAction = Object.keys(action)[Math.floor(Math.random() * Object.keys(action).length)];
    let selectedObjet = Object.keys(objet)[Math.floor(Math.random() * Object.keys(objet).length)];
    let selectedCible = Object.keys(cible)[Math.floor(Math.random() * Object.keys(cible).length)];
    let selectedDegat = Object.keys(degat)[Math.floor(Math.random() * Object.keys(degat).length)];
    let selectedDuree = Object.keys(duree)[Math.floor(Math.random() * Object.keys(duree).length)];

    // Calcul du coût en psy
    let costPsy = action[selectedAction] + objet[selectedObjet] + cible[selectedCible] + degat[selectedDegat] + duree[selectedDuree];

    // Construction du nom du sort et de l'effet
    let spellName = spellTypes[Math.floor(Math.random() * spellTypes.length)] + " " +
                     spellModifiers[Math.floor(Math.random() * spellModifiers.length)];

    let spellEffect = `${selectedAction} sur ${selectedObjet}, affecte ${selectedCible}, inflige ${selectedDegat}, durée: ${selectedDuree}. Coût en psy : ${costPsy}`;

    

    this.item.update({ 'name': spellName, 'system.biography': spellEffect,"system.cible":selectedCible,"system.duree":selectedDuree,"system.quantity":costPsy });// ajout des psy en fonction voir runes
  }
}