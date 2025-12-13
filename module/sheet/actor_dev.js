const ActorSheetV2 = foundry.applications.sheets.ActorSheetV2;
const { HandlebarsApplicationMixin } = foundry.applications.api;
import LiberChat from "../document/chat.js";
import { Model } from "../data/model.js";

/** Gestion optimisée de la feuille de personnage */
export default class LiberCharacterSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  
  static DEFAULT_OPTIONS = {
    classes: ["liber", "actor", "character"],
    position: { width: 685, height: 890 },
    form: { submitOnChange: true },
    window: { resizable: true },
    dragDrop: [{ dragSelector: '[data-drag]', dropSelector: '.inventory-list' }],
    tabGroups: { sheet: "inventory" },
    actions: {
      editImage: LiberCharacterSheet.#onEditImage,
      edit: LiberCharacterSheet.#onItemAction,
      use: LiberCharacterSheet.#onItemAction,
      delete: LiberCharacterSheet.#onItemAction,
      posture: LiberCharacterSheet.#onActorAction,
      bonuscompt: LiberCharacterSheet.#onActorAction,
      restbonus: LiberCharacterSheet.#onActorAction,
      update: LiberCharacterSheet.#onActorAction,
      levelup: LiberCharacterSheet.#onActorAction,
      roll: LiberCharacterSheet.#onActorAction,
      story: LiberCharacterSheet.#onActorAction,
      sleep: LiberCharacterSheet.#onActorAction,
      carac: LiberCharacterSheet.#onActorAction,
      filtre: LiberCharacterSheet.#onItemAction,
      random: LiberCharacterSheet.#onActorAction,
      equip: LiberCharacterSheet.#onItemAction,
      desequip: LiberCharacterSheet.#onItemAction,
      rollDamage: LiberCharacterSheet.#onItemAction,
      description: LiberCharacterSheet.#onItemAction,
      addsort: LiberCharacterSheet.#onAddSort
    }
  };

  static PARTS = {
    tabs: { template: "systems/liber-chronicles/templates/actors/character-navigation.hbs" },
    header: { template: "systems/liber-chronicles/templates/actors/character-header.hbs" },
    biography: { template: "systems/liber-chronicles/templates/actors/character-biography.hbs" },
    inventory: { template: "systems/liber-chronicles/templates/actors/character-inventory.hbs" }
  };

  // Configuration des races (extrait pour factorisation)
  static RACE_CONFIG = {
    dragon: {
      clans: ["aucune", "ralich", "aelath", "dwaliwyr", "yie", "nydiag", "weitha", "crilanydd", "cem", "coalith", "natura", "vivaqua", "limenido", "eraliwin", "atlantide", "galerrakath", "atakanax", "corbeau", "nomade", "troubadour", "other"],
      cultes: ["aucune", "vharung", "marrunas", "vaudou", "dieuxsombres", "runes", "other"]
    },
    humain: {
      clans: ["aucune", "oklata", "nomade", "troubadour", "corbeau"],
      cultes: ["aucune", "nouvelordre", "croises", "lumiereceleste", "vharung", "waetra", "baphomet", "marrunas", "vaudou", "numismatomancie", "dieuxsombres", "runes", "other"]
    },
    demon: {
      clans: ["aucune", "demonclan", "nomade", "troubadour", "corbeau", "other"],
      cultes: ["aucune", "waetra", "demonsanciens", "numismatomancie", "vharung", "marrunas", "dieuxsombres", "vaudou", "runes", "other"]
    },
    drauch: {
      clans: ["aucune", "drauch", "nomade", "troubadour", "corbeau", "other"],
      cultes: ["aucune", "waetra", "vharung", "numismatomancie", "marrunas", "dieuxsombres", "vaudou", "runes", "other"]
    },
    rocailleux: { clans: ["aucune"], cultes: ["aucune"] },
    celeste: { clans: ["oklata"], cultes: ["other"] },
    semihumain: {
      clans: ["aucune", "oklata", "ralich", "aelath", "dwaliwyr", "yie", "nydiag", "weitha", "crilanydd", "cem", "coalith", "natura", "vivaqua", "limenido", "eraliwin", "atlantide", "galerrakath", "atakanax", "corbeau", "nomade", "troubadour", "other"],
      cultes: ["aucune", "nouvelordre", "croises", "lumiereceleste", "vharung", "waetra", "demonsanciens", "baphomet", "marrunas", "vaudou", "runes", "numismatomancie", "dieuxsombres", "other"]
    }
  };

  /* ========== PRÉPARATION DES DONNÉES ========== */

  async _prepareContext() {
    const { system, items } = this.document;
    const itemsArray = items.toObject();
    
    const magic = itemsArray.filter(i => i.type === "magic").sort((a, b) => a.system.quantity - b.system.quantity);
    const filteredItems = this._filterAndSortItems(itemsArray, system.inventory);
    const { listClan, listCulte, listMetier } = this._getConfigLists(system);
    const listMagie = await this._getMagicList(system);

    return {
      tabs: this.#getTabs(),
      fields: this.document.schema.fields,
      systemFields: system.schema.fields,
      actor: this.document,
      system,
      inventory: filteredItems,
      magic,
      listClan,
      listCulte,
      listMagie,
      listMetier,
      source: this.document.toObject(),
      items: itemsArray
    };
  }

  _filterAndSortItems(items, filter) {
    const filtered = filter === "all" ? items.filter(i => i.type !== "magic") : items.filter(i => filter.includes(i.type));
    
    filtered.droite = [];
    filtered.gauche = [];
    filtered.middle = [];
    
    filtered.forEach(item => {
      const loc = item.system.equip;
      if (loc in filtered) filtered[loc].push(item);
    });
    
    return filtered;
  }

  _getConfigLists(system) {
    const { race, clan, culte, metier } = system;
    const defaultClans = ["aucune", "drauch", "demonclan", "ralich", "aelath", "dwaliwyr", "yie", "nydiag", "weitha", "crilanydd", "cem", "coalith", "natura", "vivaqua", "limenido", "eraliwin", "atlantide", "galerrakath", "atakanax", "oklata", "nomade", "troubadour", "corbeau", "other"];
    const defaultCultes = ["aucune", "nouvelordre", "croises", "lumiereceleste", "vharung", "waetra", "demonsanciens", "baphomet", "marrunas", "vaudou", "runes", "numismatomancie", "dieuxsombres", "other"];

    let listClan = LiberCharacterSheet.RACE_CONFIG[race]?.clans || defaultClans;
    let listCulte = clan === "nomade" ? ["aucune"] : (LiberCharacterSheet.RACE_CONFIG[race]?.cultes || defaultCultes);

    // Adaptation métier
    if (metier === "mercenaire") listClan = listClan.filter(c => !["corbeau", "troubadour"].includes(c));
    else if (metier === "inquisiteur") listClan = listClan.filter(c => c !== "croises");

    // Détermination métiers
    let listMetier = ["personnalise", "chevalier", "soldat", "mercenaire", "pirate", "chasseurdeprime", "assassinvoleur", "inquisiteur", "druide", "clerc", "erudit", "magicien", "oracle"];
    if (clan === "corbeau") {
      listMetier = ["none", "guerrier"];
      listCulte = ["aucune", "runes", "other"];
    } else if (clan === "troubadour") {
      listMetier = ["none", "troubadour"];
    } else if (culte === "croises") {
      listMetier = ["none", "croise"];
    }

    return { listClan, listCulte, listMetier };
  }

  async _getMagicList(system) {
    const { clan, culte, race, cout = 0 } = system;
    const pack = game.packs.get('liber-chronicles.magie');
    if (!pack) return [];

    const tables = await pack.getDocuments();
    if (!tables.length) return [];

    let magieSchool = [culte];
    if (clan === "drauch") magieSchool.push("yie", "crilanydd");
    else if (race === "celeste") magieSchool = ["lumiereceleste", "croises", "nouvelordre", "vharung", "galerrakath", "oklata"];
    else magieSchool.push(clan);

    return tables
      .filter(t => ((clan === "other" || culte === "other") && race !== "celeste") || (magieSchool.includes(t.system.school) && t.system.quantity <= cout))
      .map(t => ({ name: t.name, id: t._id, quantity: t.system.quantity, description: t.system.biography }))
      .sort((a, b) => a.quantity - b.quantity);
  }

  /* ========== RENDU VISUEL ========== */

  async _onRender(context, options) {
    await super._onRender(context, options);
    await this._onVerif();
    
    const el = this.element[0];
    this._setupActiveTab();
    this._applyVisualStyles(el);
    this._updateEncumbranceBar(el);
    this._updateBackgroundColor();
  }

  _setupActiveTab() {
    if (!this.actor) return;
    const activeTab = localStorage.getItem(`activeTab-${this.actor.id}`) || "background";
    this._setActiveTab(activeTab);
    this.element.querySelectorAll(".sheet-tabs [data-tab]").forEach(tab => {
      tab.addEventListener("click", e => this._setActiveTab(e.currentTarget.dataset.tab));
    });
  }

  _setActiveTab(tabId) {
    if (!this.actor) return;
    localStorage.setItem(`activeTab-${this.actor.id}`, tabId);

    this.element.querySelectorAll(".tab").forEach(tab => tab.style.display = "none");
    const activeTab = this.element.querySelector(`.tab[data-tab="${tabId}"]`);
    if (activeTab) activeTab.style.display = "block";

    this.element.querySelectorAll(".sheet-tabs [data-tab]").forEach(tab => tab.classList.remove("active"));
    const activeNav = this.element.querySelector(`.sheet-tabs [data-tab="${tabId}"]`);
    if (activeNav) activeNav.classList.add("active");

    if (!game.user.isGM) {
      document.querySelectorAll('.reponse').forEach(el => el.style.display = "none");
    }
  }

  _applyVisualStyles(el) {
    // Compétences
    el.querySelectorAll(".perso input").forEach(input => {
      const val = parseInt(input.value) || 0;
      input.style.color = val === 0 ? "var(--couleur-clair)" : "white";
      input.style.background = val > 0 ? "var(--couleur-vert)" : (val < 0 ? "var(--couleur-rouge)" : "");
    });

    // Avantages
    el.querySelectorAll('.head input').forEach(i => i.style.opacity = parseInt(i.value) > 0 ? '1' : '0.5');

    // Inventaire actif
    const inventory = this.actor.system.inventory;
    if (["all", "weapon", "armor", "item"].includes(inventory)) {
      const tab = document.querySelector(`a[data-type="${inventory}"]`);
      if (tab) tab.style.opacity = 1;
    }

    // Reste colorisé
    const resteInput = el.querySelector("input[name='system.reste']");
    if (resteInput) {
      const val = parseInt(resteInput.value) || 0;
      resteInput.style.background = val > 0 ? "var(--couleur-vert)" : (val < 0 ? "var(--couleur-rouge)" : "");
    }
  }

  _updateEncumbranceBar(el) {
    const { enc = 0, encmax = 1 } = this.actor.system;
    const barEnc = el.querySelector('.barenc');
    if (!barEnc) return;

    const pourcent = Math.min(Math.round(enc * 100 / encmax), 120);
    barEnc.style.width = `${pourcent}%`;
    barEnc.style.background = pourcent < 25 ? 'green' : pourcent < 75 ? 'orange' : pourcent < 100 ? 'red' : pourcent < 120 ? '#660000' : 'black';
  }

  _updateBackgroundColor() {
    const { hp, psy, race } = this.actor.system;
    const sheetEl = document.getElementById(`LiberCharacterSheet-Actor-${this.actor.id}`);
    if (!sheetEl) return;

    const mort = (hp.value <= 0 && race !== 'etredepsy') || (psy.value <= 0 && race === 'etredepsy');
    sheetEl.style.background = mort ? 'linear-gradient(230deg, rgba(190,25,25,1) 0%, rgba(25,25,25,1) 100%)' : 'linear-gradient(218deg, #2a2b2c 0%, #120304 100%)';
  }

  #getTabs() {
    const tabs = {
      background: { id: "background", group: "sheet", icon: "fa-solid fa-book", label: "Liber.Labels.background" },
      carac: { id: "carac", group: "sheet", icon: "fa-solid fa-shapes", label: "Liber.Labels.carac" },
      features: { id: "features", group: "sheet", icon: "fa-solid fa-shapes", label: "Liber.Labels.features" },
      items: { id: "items", group: "sheet", icon: "fa-solid fa-shapes", label: "Liber.Labels.items" },
      spells: { id: "spells", group: "sheet", icon: "fa-solid fa-shapes", label: "Liber.Labels.spells" },
      lab: { id: "lab", group: "sheet", icon: "fa-solid fa-shapes", label: "Liber.Labels.lab" }
    };

    for (const v of Object.values(tabs)) {
      v.active = this.tabGroups[v.group] === v.id;
      v.cssClass = v.active ? "active" : "";
    }
    return tabs;
  }

  /* ========== VÉRIFICATION ET CALCULS ========== */

async _onVerif() {
  const actor = this.actor;
  const system = foundry.utils.duplicate(actor.system);
  
  let updateData = {};
  
  // Calculs pour les personnages joueurs
  if (actor.type === "character") {
    const compCheck = this.onCalculerPenaliteCompetences();
    const stat = this.onStat();
    Object.assign(updateData, compCheck.corrections, compCheck.competences, {
      "system.reste": compCheck.resultat,
      "system.probleme": stat.message,
      "system.restant": stat.reste
    });
  }

  // Calculs d'encombrement et ressources
  const encStats = this.onEnc();
  const calcul = this.onCalcul();
  const sortRestant = actor.type === "character" ? calcul.nbSort - actor.items.filter(i => i.type === "magic").length : 0;

  // Armure raciale
  const raceBonus = Model.race[system.race] || {};
  const armurenat = Math.max(system.armure, raceBonus.armor || 0);

  Object.assign(updateData, {
    "system.armure": armurenat,
    "system.enc": encStats.enc,
    "system.encmax": encStats.max,
    "system.hp.value": calcul.hp.value,
    "system.hp.max": calcul.hp.max,
    "system.psy.value": calcul.psy.value,
    "system.psy.max": calcul.psy.max,
    "system.cout": calcul.cout,
    "system.max": sortRestant,
    "system.alert.hp": calcul.hpalert,
    "system.alert.psy": calcul.psyalert,
    ...this.onStatut()
  });

  await actor.update(updateData, { render: false });
}

onCalculerPenaliteCompetences() {
  const { competences: cpts, niveau, base, clan, metier, faiblesse, race } = this.actor.system;
  
  const bonus_compt = faiblesse === "distrait" ? 8 : 10;
  let resultat = base + ((niveau - 1) * bonus_compt);
  
  const corrections = {};
  const competences = {};

  // Corrections raciales
  const raceComp = Model.race[race] || {};
  for (const [comp, val] of Object.entries(raceComp)) {
    if (!["ajoutpoint", "armor"].includes(comp) && (!cpts[comp] || cpts[comp] < val)) {
      corrections[`system.competences.${comp}`] = val;
      cpts[comp] = val;
    }
  }

  // Calcul pénalité
  for (const [comp, val] of Object.entries(cpts)) {
    if (Model.multiplicateurs[comp]) resultat -= val * Model.multiplicateurs[comp];
  }

  // Bonus clan
  const clanBonus = {
    ralich: { comp: "discretion", val: 10, bonus: race === "dragon" ? 30 : 20 },
    limenido: { comp: "observation", val: 10, bonus: 20 },
    atlantide: { comp: "connaissances", val: 10, bonus: 20 }
  };

  if (clanBonus[clan]) {
    const { comp, val, bonus } = clanBonus[clan];
    if (cpts[comp] < val) competences[`system.competences.${comp}`] = val;
    resultat += bonus;
  }

  // Vérification Race + Métier
  const minMetier = Model.Metiers[metier]?.competences || {};
  for (const comp of new Set([...Object.keys(raceComp), ...Object.keys(minMetier)])) {
    if (!["ajoutpoint", "armor"].includes(comp)) {
      const minValue = Math.max(raceComp[comp] || 0, minMetier[comp] || 0);
      if ((cpts[comp] ?? 0) < minValue) competences[`system.competences.${comp}`] = minValue;
    }
  }

  return { resultat, corrections, competences };
}

onStat() {
  const { ability } = this.actor.system;
  const physique = ability.force + ability.agilite;
  const social = ability.charisme + ability.sagacite;
  const mental = ability.memoire + ability.astuce;
  const stat = ability.physique + ability.social + ability.mental;
  
  const errors = [];
  if (physique !== ability.physique) errors.push(game.i18n.localize("Liber.Labels.Erreur1"));
  if (social !== ability.social) errors.push(game.i18n.localize("Liber.Labels.Erreur2"));
  if (mental !== ability.mental) errors.push(game.i18n.localize("Liber.Labels.Erreur3"));
  if (stat !== 170) errors.push(game.i18n.localize("Liber.Labels.Erreur4"));

  return { message: errors.join("\n").trim(), reste: 170 - stat };
}

onEnc() {
  const { ability, competences, race, talent, faiblesse, ecu } = this.actor.system;
  
  let min = 35;
  if (race === "centaure") min += 20;
  if (talent === "mulet") min *= 2;
  if (faiblesse === "faible") min -= 10;
  
  const max = (ability.force + competences.endurance) / 2 + min;
  let enc = ecu * 0.01;
  
  this.actor.items.forEach(item => enc += (item.system.poids || 0) * (item.system.quantity || 0));
  
  return { enc, max };
}

onCalcul() {
  const system = this.actor.system;
  const { talent, faiblesse, clan, niveau, insoin, race, metier, ability } = system;
  
  let pvMin, psyMin, nbSort, maxSort;
  let pvMax = system.hp.max ?? 0;
  let psyMax = system.psy.max ?? 0;
  let pvEncours = system.hp.value ?? 0;
  let psyEncours = system.psy.value ?? 0;

  // Calcul selon métier
  if (metier === "personnalise") {
    pvMin = Math.round(ability.physique / 3);
    psyMin = Math.round(ability.mental / (ability.physique / 10));
    nbSort = Math.round(ability.social / 10);
    maxSort = Math.max(0, Math.round(psyMin / 4) + niveau - 1);
    if (clan === "corbeau") maxSort = niveau;
  } else {
    const nameMetier = Model.Metiers[metier];
    pvMin = nameMetier.hpmax;
    psyMin = nameMetier.psymax;
    nbSort = nameMetier.nb + niveau - 1;
    maxSort = nameMetier.cout + niveau - 1;
  }

  // Talents/faiblesses
  if (talent === "memoirearcanique") nbSort += 1;
  if (talent === "aura") psyMin += 2 * niveau;
  if (talent === "vigoureux") pvMin += 2 * niveau;

  // Minimums
  pvMax = Math.max(pvMax, pvMin);
  psyMax = Math.max(psyMax, psyMin);

  if (niveau === 1) {
    pvMax = Math.min(pvMax, pvMin);
    psyMax = Math.min(psyMax, psyMin);
  }

  if (metier === "guerrier" && niveau === 1) psyMax = psyMin;

  // Races spéciales
  if (race === "etredepsy") { pvMax = 0; pvMin = 0; }
  if (race === "rocailleux") { pvMin += psyMin; psyMin = psyMax = psyEncours = 0; }

  // Limitations
  pvEncours = Math.min(pvEncours, pvMax);
  psyEncours = Math.min(psyEncours, psyMax);
  if (pvEncours + insoin > pvMax) pvEncours = pvMax - insoin;

  // Alertes XP
  const xp = (niveau - 1) * 3 + pvMin + psyMin;
  const calcultotxp = pvMax + psyMax;
  let hpalert = "", psyalert = "";
  if(this.actor.type=="character"){
    if (calcultotxp > xp) hpalert = psyalert = "var(--couleur-rouge)";
    else if (calcultotxp < xp) hpalert = psyalert = "var(--couleur-vert)";
  }
  

  return {
    hp: { value: pvEncours, max: pvMax },
    psy: { value: psyEncours, max: psyMax },
    nbSort,
    cout: maxSort,
    hpalert,
    psyalert
  };
}

onStatut() {
  const etatsActifs = this.actor.effects.map(e => e.name);
  const updateData = {};

  document.querySelectorAll('.chnget').forEach(icon => {
    const etat = icon.dataset.etat;
    const actif = etatsActifs.includes(etat);
    icon.style.opacity = actif ? "1" : "0.5";
    updateData[`system.etat.${etat}`] = actif ? 1 : 0.5;
  });

  return updateData;
}

/* ========== ACTIONS ACTEUR ========== */

static async #onActorAction(event, target) {
  event.preventDefault();

  const actor = this.actor;
  const action = target.dataset.action;
  if (!actor || !action) return;

  const getRandom = arr => arr[Math.floor(Math.random() * arr.length)];

  const actions = {
    bonuscompt: () => actor.update({ "system.bonus": Number(target.dataset.val) || 0 }),
    restbonus: () => actor.update({ [`system.${target.dataset.name}`]: 0 }),
    
    levelUp: () => {
      const level = parseInt(target.value, 10);
      if (!isNaN(level) && level > 0) ui.notifications.info(`${actor.name} passe au niveau ${level}`);
    },

    roll: () => this._generateRoll(actor, target.dataset.ability, parseInt(target.dataset.value) || 0, target.dataset.type, target.dataset.itemId, target.dataset.img),

    posture: async () => {
      const posture = target.dataset.posture;
      await new LiberChat(actor)
        .withTemplate("systems/liber-chronicles/templates/chat/posture.hbs")
        .withContent(posture)
        .withData({
          actingCharName: actor.name,
          actingCharImg: actor.img,
          introText: game.i18n.localize("Liber.Chat.Posture.Change") + " " + game.i18n.localize(`Liber.Chat.Posture.${posture}`),
          text: game.i18n.localize(`Liber.Chat.Posture.${posture}-text`)
        })
        .create()
        .then(chat => chat.display());
      await actor.update({ "system.posture": posture });
    },

    sleep: () => this._handleSleep(actor),

    update: async () => {
      const { metier, race } = actor.system;
      const metierData = Model.Metiers[metier];
      if (!metierData) return ui.notifications.warn(`Métier "${metier}" introuvable.`);

      const competencesReset = Object.fromEntries(Object.keys(actor.system.competences || {}).map(k => [`system.competences.${k}`, 0]));
      const { hpmax, psymax, ability, competences } = metierData;
      const abilityUpdates = Object.fromEntries(Object.entries(ability).map(([k, v]) => [`system.ability.${k}`, v]));

      const raceBonus = Model.race[race] || {};
      const competencesMiseAJour = Object.fromEntries(
        Object.keys({ ...competences, ...raceBonus }).map(k => [`system.competences.${k}`, (competences[k] || 0) + (raceBonus[k] || 0)])
      );

      await actor.update({
        name: await this._generateName(),
        img: await this._generateAvatar(),
        "system.hp.value": hpmax,
        "system.hp.max": hpmax,
        "system.psy.value": psymax,
        "system.psy.max": psymax,
        "system.base": 25 + (raceBonus.ajoutpoint || 0),
        "system.armure": (actor.system.armure || 0) + (raceBonus.armor || 0),
        ...abilityUpdates,
        ...competencesReset,
        ...competencesMiseAJour
      });

      ui.notifications.info(`${actor.name} a été mis à jour.`);
    },

    story: async () => {
      const parts = ["actionPreparatrice", "mentor", "actionReponse", "enemy", "reward", "hero"];
      const story = parts.map((p, i) => 
        game.i18n.localize(getRandom(Model[p])) + " " + game.i18n.localize(`Liber.Character.Histoire.Partie.partie${i + 1}`)
      ).join(" ").trim();
      await actor.update({ "system.biography": story });
    },

    carac: async () => {
      const caractere = ["interets", "deces", "amour", "amitie", "haine", "principale", "passion", "personnalite", "perception", "rancunier", "tare", "distingue"];
      const updates = Object.fromEntries(caractere.map(k => [`system.caractere.${k}`, game.i18n.localize(getRandom(Model[k]))]));
      await actor.update(updates);
    },

    random: async () => {
      const type = target.dataset.type;
      const pack = game.packs.get("liber-chronicles.inventaire");
      if (!pack) return ui.notifications.error("Pack introuvable.");

      const docs = await pack.getDocuments();
      const filtered = docs.filter(t => t.type === type);
      if (!filtered.length) return ui.notifications.warn(`Aucun objet de type : ${type}`);

      const itemsToAdd = ["armor", "weapon"].includes(type)
        ? [{ ...filtered[Math.floor(Math.random() * filtered.length)].toObject(), system: { quantity: 1 }, _id: undefined }]
        : Array.from({ length: Math.floor(Math.random() * 10) + 1 }, () => {
            const obj = filtered[Math.floor(Math.random() * filtered.length)].toObject();
            obj.system.quantity = Math.floor(Math.random() * 10) + 1;
            delete obj._id;
            return obj;
          });

      await actor.createEmbeddedDocuments("Item", itemsToAdd, { renderSheet: false });
      ui.notifications.info(`${itemsToAdd.length} objet(s) ajouté(s)`);
    }
  };

  if (actions[action]) await actions[action]();
  else console.warn(`Action inconnue : ${action}`);
}

/* ========== ACTIONS ITEMS ========== */

static async #onItemAction(event, target) {
  event.preventDefault();

  const action = target.dataset.action;
  const itemId = target.dataset.itemId;
  const actor = this.actor;
  const item = actor.items.get(itemId);

  const actions = {
    edit: () => item?.sheet.render(true),
    delete: () => item?.delete(),
    
    use: async () => {
      if (!item) return;
      const qty = item.system.quantity || 0;
      qty > 1 ? await item.update({ "system.quantity": qty - 1 }) : await item.delete();
    },

    rollDamage: async () => {
      if (!item?.system.degat) return;

      const { race, clan, talent, fatig = 0, niveau } = actor.system;
      const { doublemain, consommable, quantity = 0, biography, degat, equip } = item.system;
      
      let label = `${actor.name} ${game.i18n.localize("Liber.Chat.Roll.utilise")} ${item.name}`;
      let result = await new Roll(degat).roll();
      let resultat = result.total;

      if (doublemain === "yes") {
        const result2 = await new Roll(degat).roll();
        label += game.i18n.localize("Liber.Chat.Roll.Percucant");
        resultat = `${result.total} / ${result2.total}`;
        await actor.update({ "system.fatig": fatig + 1 });
      }

      if (race === "orc" && item.type === "weapon") resultat += 2;
      if (clan === "coalith" && item.type === "weapon") resultat += niveau;

      const info = biography ? `<div class="infos"><span class="title">Info</span><div class="description">${biography}</div></div>` : "";
      const succes = `${info}<span class='result' style='background:var(--couleur-vert);'>${resultat}</span>`;

      await new LiberChat(actor)
        .withTemplate("systems/liber-chronicles/templates/chat/roll-damage.hbs")
        .withContent("rollDamage")
        .withData({
          actingCharName: actor.name,
          actingCharImg: actor.img,
          actingAbilName: item.img,
          introText: label,
          succes
        })
        .create()
        .then(chat => chat.display());

      if (consommable === "yes" && quantity > 0) {
        const newQty = quantity - 1;
        await item.update({ "system.equip": newQty === 0 ? "" : equip, "system.quantity": Math.max(0, newQty) });
      }
    },

    equip: async () => {
      const equipLocation = target.dataset.ou;
      const protection = Number(target.dataset.protection) || 0;
      await actor.update({ "system.armure": Math.max(0, (actor.system.armure || 0) + protection) });
      await item.update({ "system.equip": equipLocation });
    },

    desequip: async () => {
      const protection = Number(target.dataset.protection) || 0;
      await actor.update({ "system.armure": Math.max(0, (actor.system.armure || 0) - protection) });
      await item.update({ "system.equip": "" });
    },

    description: async () => {
      await new LiberChat(actor)
        .withTemplate("systems/liber-chronicles/templates/chat/roll-resultat.hbs")
        .withContent("itemDescription")
        .withData({
          actingCharName: actor.name,
          actingCharImg: actor.img,
          actingAbilName: item.img,
          info: "Info",
          introText: item.name,
          succes: item.system.biography || ""
        })
        .create()
        .then(chat => chat.display());
    },

    filtre: () => actor.update({ "system.inventory": target.dataset.type })
  };

  if (actions[action]) await actions[action]();
  else console.warn(`Action item inconnue : ${action}`);
}

/* ========== HELPERS ========== */

async _generateName() {
  const { race, sex } = this.actor.system;
  const nameList = Model.names[race];
  if (!nameList) return this.actor.name || "Nouvel Acteur";

  let name = "";
  const gender = sex === "Autre" ? "male" : sex;

  if (nameList.female && nameList.male) {
    const arr = nameList[gender] || nameList.male;
    name = arr[Math.floor(Math.random() * arr.length)];
  } else if (race === "dragon") {
    const a = nameList[Math.floor(Math.random() * nameList.length)];
    const b = nameList[Math.floor(Math.random() * nameList.length)];
    name = (a + b).charAt(0).toUpperCase() + (a + b).slice(1);
  } else {
    name = nameList[Math.floor(Math.random() * nameList.length)];
  }

  if (nameList.famille?.length) {
    name = `${nameList.famille[Math.floor(Math.random() * nameList.famille.length)]} ${name}`;
  }

  return name;
}

async _generateAvatar() {
  const { race, sex } = this.actor.system;
  if (!race || race === "autre") return "icons/svg/mystery-man.svg";

  const genderPath = sex === "female" ? "femmes/" : "hommes/";
  const rand = Math.floor(Math.random() * 10) + 1;
  return `systems/liber-chronicles/assets/avatar/${race}/${genderPath}avatar${rand}.jpg`;
}

async _handleSleep(actor) {
  const sys = actor.system;
  let { talent, faiblesse, time, duree, repos, niveau, insoin, fatig, ronfleur } = sys;
  let psy = sys.psy.value;
  let hp = sys.hp.value;
  const { max: psymax } = sys.psy;
  const { max: hpmax } = sys.hp;
  
  let d = 0, hpadd = 0, psyadd = 0, fatadd = 0;

  if (duree === "day") time *= 24;

  const reposConfig = {
    fast: { dice: 4, hpMult: 1/8, psyMult: 1/2, fatMult: 0, insoin: 1 },
    quiet: { dice: 6, hpMult: 1/8, psyMult: 1/2, fatMult: 1, insoin: 1 },
    good: { dice: 6, hpMult: 1, psyMult: 1, fatMult: 2, insoin: 0 },
    intens: { dice: 8, hpMult: 2, psyMult: 1, fatMult: 3, insoin: 0 }
  };

  const config = reposConfig[repos];
  if (config) {
    d = Math.floor(Math.random() * config.dice) + 1;
    insoin = config.insoin;
    hpadd = Math.round((d + niveau) * time * config.hpMult);
    if (repos === "intens") hpadd = ((2 * d) + niveau) * time;
    psyadd = Math.round(niveau * time * config.psyMult);
    fatadd = config.fatMult * time;
  }

  if (talent === "bondormeur") { hpadd *= 2; psyadd *= 2; }
  if (faiblesse === "insomniaque") { hpadd /= 2; psyadd /= 2; }

  hp = Math.min(hp + hpadd, hpmax);
  psy = Math.min(psy + psyadd, psymax);
  fatig = Math.max(0, fatig - fatadd);
  if (hp >= hpmax && insoin > 0) hp = hpmax - insoin;

  await new LiberChat(actor)
    .withTemplate("systems/liber-chronicles/templates/chat/posture.hbs")
    .withContent("sleep")
    .withData({
      actingCharName: actor.name,
      actingCharImg: actor.img,
      introText: game.i18n.localize('Liber.Chat.Sleep.sleep'),
      text: ronfleur === "no" ? game.i18n.localize('Liber.Chat.Sleep.recuperation') : game.i18n.localize('Liber.Chat.Sleep.ronfleur')
    })
    .create()
    .then(chat => chat.display());

  if (ronfleur === "no") {
    await actor.update({ "system.insoin": insoin, "system.hp.value": hp, "system.psy.value": psy, "system.fatig": fatig });
  }
}

static async #onAddSort(event, target) {
  const select = document.querySelector(`#LiberCharacterSheet-Actor-${this.actor._id} select[name='system.magieChoisie']`);
  if (!select) return console.error("Champ select introuvable");

  const dataId = select.options[select.selectedIndex]?.value;
  if (!dataId) return console.error("Aucun sort sélectionné");

  const pack = game.packs.get("liber-chronicles.magie");
  if (!pack) return console.error("Compendium introuvable");

  const spell = await pack.getDocument(dataId);
  if (!spell) return console.error(`Sort ${dataId} non trouvé`);

  await this.actor.createEmbeddedDocuments("Item", [spell.toObject()]);
}

static async #onEditImage(event, target) {
  const attr = target.dataset.edit;
  const current = foundry.utils.getProperty(this.document, attr);
  const { img } = this.document.constructor.getDefaultArtwork?.(this.document.toObject()) ?? {};
  
  const fp = new FilePicker({
    current,
    type: 'image',
    redirectToRoot: img ? [img] : [],
    callback: path => this.document.update({ [attr]: path }),
    top: this.position.top + 40,
    left: this.position.left + 10,
  });
  return fp.browse();
}
/* ========== SYSTÈME DE JETS DE DÉS ========== */

async _generateRoll(actor, ability, valuemax, type, itemId, image) {
  const system = actor.system;
  const { posture, fatigue, bonus = 0, malus = 0, traitre, emphase, fatig = 0, enc = 0, encmax = 0 } = system;
  
  // Items équipés
  const equippedItems = actor.items.filter(item => item.system.equip);
  
  // Variables magie
  let item, itemname, quantity, psy, pv, insoin, physique, mental, social, description, talent;
  let visuel = `systems/liber-chronicles/assets/actor/${ability}.webp`;
  let label = `${actor.name} ${game.i18n.localize("Liber.Chat.Roll.faire")} ${game.i18n.localize("Liber.Chat.Roll." + ability)}`;

  // Gestion de la magie
  if (type && itemId) {
    item = actor.items.get(itemId);
    if (item) {
      ({ value: psy = 0 } = system.psy);
      ({ value: pv = 0 } = system.hp);
      ({ insoin = 0, talent } = system);
      ({ mental = 0, social = 0, physique = 0 } = system.ability);
      ({ biography: description, quantity = 0 } = item.system);
      
      visuel = item.img;
      itemname = item.name;
      label = `${actor.name} ${game.i18n.localize("Liber.Chat.Roll.faire")} : ${itemname}`;

      // Adaptation de la caractéristique selon le type
      const typeAbility = { corbeau: { ability: "physique", value: physique }, troubadour: { ability: "social", value: social } };
      if (typeAbility[type]) {
        ({ ability, value: valuemax } = typeAbility[type]);
      } else {
        ability = "mental";
        valuemax = mental;
      }
    }
  }

  if (image) visuel = image;

  // Calcul des modificateurs
  valuemax += bonus + malus;
  let { critique, echec } = this._calculateThresholds(traitre, emphase, posture);

  // Pénalités
  if (enc > encmax && ability === "physique") valuemax -= Math.floor(enc - encmax);
  if (ability === "physique") valuemax -= fatig * 5;

  // Limites
  valuemax = Math.max(critique, Math.min(valuemax, echec));

  // Jet de dés
  const roll = await new Roll("1d100").roll();
  const result = roll.total;

  // Construction de l'info
  let info = `${result}/${valuemax}`;
  if (type) info += `<div class="infos"><span class="title">Info</span><div class="description">${description}</div></div>`;

  // Évaluation du résultat
  let succes = this._evaluateRoll(result, critique, echec, valuemax);

  // Décompte des ressources pour la magie
  if (type && item) {
    const costResult = await this._handleMagicCost(type, quantity, psy, pv, insoin, talent, actor);
    if (!costResult.success) {
      succes = "";
      info = game.i18n.localize("Liber.Chat.Roll.Ressource") + `<div class="infos"><span class="title">Info</span><div class="description">${description}</div></div>`;
    }

    // Bouton dégâts si applicable
    if (costResult.success && item.system.degat != 0) {
      succes += `<button class="roll-damage" data-action="rollDamage" data-itemid="${itemId}" data-actorid="${actor._id}">${game.i18n.localize("Liber.Chat.Roll.LancerDegats")}</button>`;
    }
  }

  // Boutons pour items équipés (jets physiques)
  if (equippedItems.length && ability === "physique") {
    succes += this._generateEquippedItemButtons(equippedItems, actor._id);
  }

  // Envoi du message
  await new LiberChat(actor)
    .withTemplate("systems/liber-chronicles/templates/chat/roll-resultat.hbs")
    .withContent(ability)
    .withData({
      actingCharName: actor.name,
      actingCharImg: actor.img,
      actingAbilName: visuel,
      introText: label,
      info,
      succes
    })
    .create()
    .then(chat => chat.display());

  return { roll, result };
}

/**
 * Calcule les seuils de critique et d'échec
 */
_calculateThresholds(traitre, emphase, posture) {
  let critique = 5;
  let echec = 95;

  // Modificateurs traitre/emphase
  if (traitre === "yes") echec -= 5;
  
  const emphaseMap = {
    dephase2: { echec: -10 },
    dephase1: { echec: -5 },
    emphase1: { critique: 5 },
    emphase2: { critique: 10 }
  };
  
  if (emphaseMap[emphase]) {
    if (emphaseMap[emphase].echec) echec += emphaseMap[emphase].echec;
    if (emphaseMap[emphase].critique) critique += emphaseMap[emphase].critique;
  }

  // Posture
  if (posture === "offensif") critique += 5;

  return { critique, echec };
}

/**
 * Évalue le résultat du jet
 */
_evaluateRoll(result, critique, echec, valuemax) {
  const results = {
    criticalFailure: { condition: result > echec, class: "#ff3333", key: "EchecCrit" },
    criticalSuccess: { condition: result <= critique, class: "#7dff33", key: "ReussiteCrit" },
    success: { condition: result <= valuemax, class: "var(--couleur-vert)", key: "Reussite" },
    failure: { condition: true, class: "var(--couleur-rouge)", key: "Echec" }
  };

  for (const [key, { condition, class: bg, key: labelKey }] of Object.entries(results)) {
    if (condition) {
      return `<span class='result' style='background:${bg};'>${game.i18n.localize("Liber.Chat.Roll." + labelKey)}</span>`;
    }
  }
}

/**
 * Gère le coût en ressources pour la magie
 */
  async _handleMagicCost(type, quantity, psy, pv, insoin, talent, actor) {
    if (type === "corbeau") {
      if (pv >= quantity) {
        await actor.update({ "system.hp.value": pv - quantity });
        return { success: true };
      }
      return { success: false };
    }

    // Autres types de magie
    if ((psy + pv) >= quantity) {
      psy -= quantity;
      if (psy < 0) {
        pv += psy;
        if (talent !== "conversion") insoin -= psy;
        psy = 0;
      }
      await actor.update({ "system.hp.value": pv, "system.insoin": insoin, "system.psy.value": psy });
      return { success: true };
    }

    return { success: false };
  }

  /**
   * Génère les boutons pour les items équipés
   */
  _generateEquippedItemButtons(equippedItems, actorId) {
    let buttons = "";
    
    equippedItems.forEach(item => {
      if (item.system.degat !== "0") {
        buttons += `<button class="roll-damage" data-action="rollDamage" data-itemid="${item._id}" data-actorid="${actorId}">
          ${game.i18n.localize("Liber.Chat.Roll.utiliser")} ${item.name}
        </button>`;
      }

      if (item.system.consommable === "yes") {
        buttons += `<button class="use-item" data-action="useItem" data-itemid="${item._id}" data-actorid="${actorId}">
          ${game.i18n.localize("Liber.Chat.Roll.consommer")} ${item.name}
        </button>`;
      }
    });

    return buttons;
  }

  /* ========== PRÉPARATION DES CONTEXTES (optionnel) ========== */

  async _preparePartContext(partId, context) {
    return context;
  }
}