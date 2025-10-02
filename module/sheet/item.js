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
      story: LiberItemSheet.#onStory,
      addContent: LiberItemSheet.#onAddContent, //ajoute contenu
      deletecontent: LiberItemSheet.#onDelContent //supprime contenu
    }
  };

  /** @override */
  static PARTS = {
    header: { template: "systems/liber-chronicles/templates/item/item-header.hbs" },
    main:{template: "systems/liber-chronicles/templates/item/item-main-item.hbs"}
  };

  _onRender(context, options) {
    console.log("Context rendu :", context);

    const activeTab = localStorage.getItem(`activeTab-item-${this.item.id}`) || "biography";
    this._setActiveTab(activeTab);

    // ✅ Gestion du clic sur les onglets
    this.element.querySelectorAll(".sheet-tabs [data-tab]").forEach(tab => {
      tab.addEventListener("click", ev => {
        const newTab = ev.currentTarget.dataset.tab;
        this._setActiveTab(newTab);
      });
    });
  }


 /** Préparation des données */
  async _prepareContext() {
    console.log("Préparation du contexte de l'objet :", this);
    console.log(this.item.type);

    // Contexte de base
    const context = {
      fields: this.document.schema.fields,              // ✅ Champs généraux
      systemFields: this.document.system.schema.fields, // ✅ Champs système
      source: this.document.toObject(),                 // ✅ Source brute (utile pour debug)
      item: this.document,                              // ✅ Référence à l'objet
      system: this.document.system,                      // ✅ Données système
      tabs: this.#getTabs()                             // ✅ on passe déjà les tabs préparés

    };

    // ➕ Ajout du contenu interne (inventaire de l'objet, ex: sac, coffre)
    context.contents = this.document.system.contents || [];

    console.log("Contexte préparé :", context);
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




  static async #onAddContent(event, target) {//ajout contenu
    const current = foundry.utils.deepClone(this.item.system.contents || []);
    current.push({ id: randomID(), name: "Nouvel objet", qty: 1 });
    await this.item.update({ "system.contents": current });
  }

  /** Suppression d’un contenu de l’inventaire interne */
  static async #onDelContent(event, target) {
    const idx = target.getAttribute('data-index')

    // clone du tableau system.contents
    let contents = foundry.utils.duplicate(this.item.system.contents || []);

    if (idx >= 0 && idx < contents.length) {
      contents.splice(idx, 1); // supprime l’élément
      await this.item.update({ "system.contents": contents });
    }
  }
  async _preparePartContext(partId, context) {
        const doc = this.document;
        switch (partId) {
            case "biography":
                context.tab = context.tabs.biography;
                context.enrichedBiography = await foundry.applications.ux.TextEditor.enrichHTML(this.document.system.biography, { async: true });
                break;
            case "detail":
                context.tab = context.tabs.detail;
                context.items = [];
                const itemsRaw = this.document.items;
                for (const item of itemsRaw) {
                    item.enrichedDescription = await foundry.applications.ux.TextEditor.enrichHTML(item.system.description, { async: true });
                    context.items.push(item);
                }
                break;
        }
        return context;
  }
  _setActiveTab(tabId) {
    // ✅ Sauvegarde de l'onglet actif
    localStorage.setItem(`activeTab-item-${this.item.id}`, tabId);

    // Masquer tout
    this.element.querySelectorAll(".tab").forEach(t => t.style.display = "none");

    // Afficher l'onglet actif
    const active = this.element.querySelector(`.tab[data-tab="${tabId}"]`);
    if (active) active.style.display = "block";

    // Mettre à jour la navigation
    this.element.querySelectorAll(".sheet-tabs [data-tab]").forEach(t => t.classList.remove("active"));
    const nav = this.element.querySelector(`.sheet-tabs [data-tab="${tabId}"]`);
    if (nav) nav.classList.add("active");
  }
  #getTabs() {
    const tabs = {
      biography: {
        id: "biography",
        icon: "fa-solid fa-book",
        label: ""
      },
      detail: {
        id: "detail",
        icon: "fa-solid fa-graduation-cap",
        label: ""
      }
    };

    // Marque l'onglet actif (utilisé à la génération du HTML)
    const activeTab = localStorage.getItem(`activeTab-item-${this.item.id}`) || "biography";
    for (const t of Object.values(tabs)) {
      t.cssClass = (t.id === activeTab) ? "active" : "";
    }
    return tabs;
  }
}