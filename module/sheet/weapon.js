const ItemSheetV2 = foundry.applications.sheets.ItemSheetV2;
const { HandlebarsApplicationMixin } = foundry.applications.api;

/** Gestion de la feuille d'objet */
export default class LiberWeaponSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["liber", "item"],
    position: { width: 400, height: 640 },
    form: { submitOnChange: true },
    window: { resizable: true },
    actions: {
      //editImage: LiberItemSheet.#onEditImage,
      story:LiberWeaponSheet.#onStory,
      addContent: LiberWeaponSheet.#onAddContent, //ajoute contenu
      deletecontent: LiberWeaponSheet.#onDelContent //supprime contenu
    }
  };

  /** @override */
  static PARTS = {
    header: { template: "systems/liber-chronicles/templates/item/item-header.hbs" },
    main:{template: "systems/liber-chronicles/templates/item/item-main-weapon.hbs"}
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