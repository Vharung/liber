const ItemSheetV2 = foundry.applications.sheets.ItemSheetV2;
const { HandlebarsApplicationMixin } = foundry.applications.api;

/** Gestion de la feuille d'objet */
export default class LiberArmorSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["liber", "item"],
    position: { width: 400, height: 640 },
    form: { submitOnChange: true },
    window: { resizable: true },
    actions: {
      //editImage: LiberItemSheet.#onEditImage,
      story:LiberArmorSheet.#onStory,
      addContent: LiberArmorSheet.#onAddContent, //ajoute contenu
      deletecontent: LiberArmorSheet.#onDelContent //supprime contenu
    }
  };

  /** @override */
  static PARTS = {
    header: { template: "systems/liber-chronicles/templates/item/item-header.hbs" },
    main:{template: "systems/liber-chronicles/templates/item/item-main-armor.hbs"}
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
      console.log(this.item.type)

      const context = {
        fields: this.document.schema.fields, 
        systemFields: this.document.system.schema.fields,
        source: this.document.toObject(),
        item: this.document,
        system: this.document.system,
        tabs: this.#getTabs()                             // ✅ on passe déjà les tabs préparés
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