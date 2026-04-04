const ActorSheetV2 = foundry.applications.sheets.ActorSheetV2;
const { HandlebarsApplicationMixin } = foundry.applications.api;
import LiberChat from "../document/chat.js";
import { Model } from "../data/liber.js";

export default class LiberCharacterSheet extends HandlebarsApplicationMixin(ActorSheetV2) {

  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["liber", "actor", "character"],
    position: { width: 685, height: 850 },
    form: { submitOnChange: true },
    window: { resizable: true },
    dragDrop: [{ dragSelector: "[data-drag]", dropSelector: ".inventory-list" }],
    actions: {
      editImage:   LiberCharacterSheet.#onEditImage,
      edit:        LiberCharacterSheet.#onItemAction,
      use:         LiberCharacterSheet.#onItemAction,
      delete:      LiberCharacterSheet.#onItemAction,
      equip:       LiberCharacterSheet.#onItemAction,
      desequip:    LiberCharacterSheet.#onItemAction,
      rollDamage:  LiberCharacterSheet.#onItemAction,
      description: LiberCharacterSheet.#onItemAction,
      filtre:      LiberCharacterSheet.#onItemAction,
      posture:     LiberCharacterSheet.#onActorAction,
      roll:        LiberCharacterSheet.#onActorAction,
      sleep:       LiberCharacterSheet.#onActorAction,
      story:       LiberCharacterSheet.#onActorAction,
      carac:       LiberCharacterSheet.#onActorAction,
      update:      LiberCharacterSheet.#onActorAction,
      random:      LiberCharacterSheet.#onActorAction,
      levelup:     LiberCharacterSheet.#onActorAction,
      bonuscompt:  LiberCharacterSheet.#onActorAction,
      restbonus:   LiberCharacterSheet.#onActorAction,
      addsort:     LiberCharacterSheet.#onAddSort,
      oncouv:      LiberCharacterSheet.#onEtatToggle,
    }
  };


 /** @override */
  static PARTS = {
    tabs:      { template: "systems/liber-chronicles/templates/actors/character-navigation.hbs" },
    header:    { template: "systems/liber-chronicles/templates/actors/character-header.hbs" },
    biography: { template: "systems/liber-chronicles/templates/actors/character-biography.hbs" },
    inventory: { template: "systems/liber-chronicles/templates/actors/character-inventory.hbs" },
  };

  /* -------------------------------------------------- */
  /*  Données                                           */
  /* -------------------------------------------------- */

  /** @override */
  async _prepareContext() {
    const { system } = this.document;
    const { inventory: filter, race, clan, culte, metier, cout = 0 } = system;
    const itemsData = this.#organizeItems(filter);
    const { listClan, listCulte, listMetier } = this.#getListsConfig(race, clan, culte, metier);
    const listMagie = await this.#getAvailableMagic(race, clan, culte, cout);

    return {
      tabs: this.#getTabs(),
      fields: this.document.schema.fields,
      systemFields: system.schema.fields,
      actor: this.document,
      system,
      inventory: itemsData.equipment,
      magic: itemsData.magic,
      listClan,
      listCulte,
      listMetier,
      listMagie,
      source: this.document.toObject(),
    };
  }

  #organizeItems(filter) {
    const itemsData = {
      magic: [],
      equipment: { gauche: [], droite: [], middle: [], inventory: [] },
    };

    for (const item of this.document.items) {
      if (item.type === "magic") {
        itemsData.magic.push(item);
        continue;
      }
      if (filter !== "all" && !filter.includes(item.type)) continue;

      const loc = item.system?.equip;
      if (["gauche", "droite", "middle"].includes(loc)) itemsData.equipment[loc].push(item);
      itemsData.equipment.inventory.push(item);
    }

    itemsData.magic.sort((a, b) => (a.system?.quantity ?? 0) - (b.system?.quantity ?? 0));
    itemsData.equipment.inventory.sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));
    return itemsData;
  }

  // ---- Listes de sélection ----

  static #RACE_CONFIG = {
    dragon:     { clans: ["aucune","ralich","aelath","dwaliwyr","yie","nydiag","weitha","crilanydd","cem","coalith","natura","vivaqua","limenido","eraliwin","atlantide","galerrakath","atakanax","corbeau","nomade","troubadour","other"], cultes: ["aucune","vharung","marrunas","vaudou","dieuxsombres","runes","other"] },
    humain:     { clans: ["aucune","oklata","nomade","troubadour","corbeau"], cultes: ["aucune","nouvelordre","croises","lumiereceleste","vharung","waetra","baphomet","marrunas","vaudou","numismatomancie","dieuxsombres","runes","other"] },
    demon:      { clans: ["aucune","demonclan","nomade","troubadour","corbeau","other"], cultes: ["aucune","waetra","demonsanciens","numismatomancie","vharung","marrunas","dieuxsombres","vaudou","runes","other"] },
    drauch:     { clans: ["aucune","drauch","nomade","troubadour","corbeau","other"], cultes: ["aucune","waetra","vharung","numismatomancie","marrunas","dieuxsombres","vaudou","runes","other"] },
    rocailleux: { clans: ["aucune"], cultes: ["aucune"] },
    celeste:    { clans: ["oklata"], cultes: ["other"] },
    semihumain: {
      clans:  ["aucune","oklata","ralich","aelath","dwaliwyr","yie","nydiag","weitha","crilanydd","cem","coalith","natura","vivaqua","limenido","eraliwin","atlantide","galerrakath","atakanax","corbeau","nomade","troubadour","other"],
      cultes: ["aucune","nouvelordre","croises","lumiereceleste","vharung","waetra","demonsanciens","baphomet","marrunas","vaudou","runes","numismatomancie","dieuxsombres","other"],
    },
  };

  static #DEFAULT_CONFIG = {
    clans:  ["aucune","drauch","demonclan","ralich","aelath","dwaliwyr","yie","nydiag","weitha","crilanydd","cem","coalith","natura","vivaqua","limenido","eraliwin","atlantide","galerrakath","atakanax","oklata","nomade","troubadour","corbeau","other"],
    cultes: ["aucune","nouvelordre","croises","lumiereceleste","vharung","waetra","demonsanciens","baphomet","marrunas","vaudou","runes","numismatomancie","dieuxsombres","other"],
  };

  static #METIERS_DEFAULT = ["personnalise","chevalier","soldat","mercenaire","pirate","chasseurdeprime","assassinvoleur","inquisiteur","druide","clerc","erudit","magicien","oracle"];

  #getListsConfig(race, clan, culte, metier) {
    const cfg = LiberCharacterSheet.#RACE_CONFIG[race] ?? LiberCharacterSheet.#DEFAULT_CONFIG;
    let { clans: listClan, cultes: listCulte } = cfg;

    if (clan === "nomade") listCulte = ["aucune"];
    if (metier === "mercenaire") listClan = listClan.filter(c => !["corbeau","troubadour"].includes(c));
    if (metier === "inquisiteur") listClan = listClan.filter(c => c !== "croises");

    let listMetier;
    if (clan === "corbeau")        { listMetier = ["none","guerrier"];     listCulte = ["aucune","runes","other"]; }
    else if (clan === "troubadour") { listMetier = ["none","troubadour"]; }
    else if (culte === "croises")   { listMetier = ["none","croise"]; }
    else                            { listMetier = LiberCharacterSheet.#METIERS_DEFAULT; }

    return { listClan, listCulte, listMetier };
  }

  async #getAvailableMagic(race, clan, culte, cout) {
    const pack = game.packs.get("liber-chronicles.magie");
    if (!pack) return [];

    const index = await pack.getIndex({ fields: ["system.quantity","system.school","system.biography"] });

    let magieSchool;
    if (race === "celeste") {
      magieSchool = new Set(["lumiereceleste","croises","nouvelordre","vharung","galerrakath","oklata"]);
    } else {
      magieSchool = new Set([culte]);
      if (clan === "drauch") magieSchool.add("yie").add("crilanydd");
      else magieSchool.add(clan);
    }

    const isOther  = clan === "other" || (culte === "other" && race !== "celeste");
    const isAucune = clan === "aucune" && culte === "aucune";

    return index
      .filter(e => {
        if ((e.system?.quantity ?? Infinity) > cout) return false;
        if (isAucune) return e.system?.school === "aucune";
        if (e.system?.school === "aucune") return false;
        return isOther || magieSchool.has(e.system?.school);
      })
      .map(e => ({ name: e.name, id: e._id, quantity: e.system.quantity, description: e.system.biography }))
      .sort((a, b) => a.quantity - b.quantity);
  }

  /* -------------------------------------------------- */
  /*  Rendu                                             */
  /* -------------------------------------------------- */
  /** @override */
    async _onRender(context, options) {
      await super._onRender(context, options);
      const SKIP_VERIF = new Set([
        "roll", "sleep", "story", "carac",
        "rollDamage", "description", "filtre", "addsort", "oncouv",
        "edit", "use", "delete",
        "equip","desequip"
      ]);

      const ENC_ONLY = new Set(["edit", "use", "delete"]);
      const EQUIP_ONLY = new Set(["equip","desequip"]);

      const action = this._lastAction;
      //this._lastAction = null;

      if (!action || !SKIP_VERIF.has(action)) {
        await this._onVerif();
      } else if (ENC_ONLY.has(action)) {
        await this._onVerifEnc();
      }else if (EQUIP_ONLY.has(action)) {
        await this._onVerifEquip();
      }

      this.#updateVisuals(this.element, this.actor.system);
      this.#setupTabs();
      if (!game.user.isGM) {
        this.element.querySelectorAll(".reponse").forEach(el => (el.style.display = "none"));
      }
    }


  #setupTabs() {
    if (!this.actor) return;
    
    const activeTab = localStorage.getItem(`activeTab-${this.actor.id}`) || "background";
    this._setActiveTab(activeTab);
    
    this.element.querySelectorAll(".sheet-tabs [data-tab]").forEach(tab => {
      tab.addEventListener("click", (event) => {
        this._setActiveTab(event.currentTarget.dataset.tab);
      });
    });
  }
 
  /** @override */
  _setActiveTab(tabId) {
      if (!this.actor) return;

      // Stocker l'onglet actif en utilisant l'ID de l'acteur
      localStorage.setItem(`activeTab-${this.actor.id}`, tabId);

      // Masquer tous les onglets
      this.element.querySelectorAll(".tab").forEach(tab => {
          tab.style.display = "none";
      });

      // Afficher seulement l'onglet actif
      const activeTab = this.element.querySelector(`.tab[data-tab="${tabId}"]`);
      if (activeTab) {
          activeTab.style.display = "block";
      }

      // Mettre à jour la classe "active" dans la navigation
      this.element.querySelectorAll(".sheet-tabs [data-tab]").forEach(tab => {
          tab.classList.remove("active");
      });

      const activeTabNav = this.element.querySelector(`.sheet-tabs [data-tab="${tabId}"]`);
      if (activeTabNav) {
          activeTabNav.classList.add("active");
      }

      const GM = game.user.isGM;
      if (!GM) { // Vérifie si le joueur n'est PAS GM
        document.querySelectorAll('.reponse').forEach(element => {
          element.style.display = "none"; // Corrigé "this" -> "element"
        });
      }
  }

  
  

  #updateVisuals(el, system) {
    // Compétences
    el.querySelectorAll(".perso input").forEach(i => {
      const v = parseInt(i.value) || 0;
      i.style.color      = v === 0 ? "var(--couleur-clair)" : "white";
      i.style.background = v > 0 ? "var(--couleur-vert)" : v < 0 ? "var(--couleur-rouge)" : "";
    });

    // Avantages
    el.querySelectorAll(".head input").forEach(i => {
      i.style.opacity = parseInt(i.value) > 0 ? "1" : "0.5";
    });

    // Encombrement
    const { enc = 0, encmax = 1 } = system;
    const barEnc = el.querySelector(".barenc");
    if (barEnc) {
      const pct = Math.min(Math.round(enc * 100 / encmax), 100);
      barEnc.style.width      = `${pct}%`;
      barEnc.style.background = pct < 50 ? "#3fb359" : pct < 75 ? "#abb33f" : pct < 100 ? "#c3891c" : "#a51111";
    }

    // Filtre inventaire actif
    const validFilters = ["all","weapon","armor","item"];
    if (validFilters.includes(system.inventory)) {
      const link = el.querySelector(`a[data-type="${system.inventory}"]`);
      if (link) link.style.opacity = "1";
    }

    // Fond selon HP
    const sheetEl = document.getElementById(`LiberCharacterSheet-Actor-${this.actor.id}`);
    if (sheetEl) {
      const mort = (system.hp.value <= 0 && system.race !== "etredepsy")
                || (system.psy.value <= 0 && system.race === "etredepsy");
      sheetEl.style.background = mort
        ? "linear-gradient(230deg, rgba(190,25,25,1) 0%, rgba(25,25,25,1) 100%)"
        : "linear-gradient(218deg, #2a2b2c 0%, #120304 100%)";
    }

    // Reste
    const resteInput = el.querySelector("input[name='system.reste']");
    if (resteInput) {
      const v = parseInt(resteInput.value) || 0;
      resteInput.style.background = v > 0 ? "var(--couleur-vert)" : v < 0 ? "var(--couleur-rouge)" : "";
    }
  }

  /* -------------------------------------------------- */
  /*  Onglets — v13 utilise tabGroups nativement        */
  /* -------------------------------------------------- */

  #getTabs() {
    const defs = {
      background: { icon: "fa-solid fa-book",   label: "Liber.Labels.background" },
      carac:      { icon: "fa-solid fa-shapes",  label: "Liber.Labels.carac" },
      features:   { icon: "fa-solid fa-shapes",  label: "Liber.Labels.features" },
      items:      { icon: "fa-solid fa-shapes",  label: "Liber.Labels.items" },
      spells:     { icon: "fa-solid fa-shapes",  label: "Liber.Labels.spells" },
      lab:        { icon: "fa-solid fa-shapes",  label: "Liber.Labels.lab" },
    };
    return Object.entries(defs).reduce((acc, [id, cfg]) => {
      acc[id] = { id, group: "sheet", ...cfg, active: this.tabGroups.sheet === id, cssClass: this.tabGroups.sheet === id ? "active" : "" };
      return acc;
    }, {});
  }

  /* -------------------------------------------------- */
  /*  Vérification / Calcul                             */
  /* -------------------------------------------------- */

  async _onVerif() {
    console.log("onverif")
    const actor  = this.actor;
    const sys    = actor.system;
    const { type, system: { race, metier, niveau } } = actor;

    // ── Calculs ──────────────────────────────────────────
    const raceBonus  = Model.race[race] ?? {};
    const encStats   = this.onEnc();
    const calcul     = this.onCalcul();
    const armurenat  = Math.max(sys.armure, raceBonus.armor ?? 0);

    let resultat = 0, corrections = {}, competences = {}, sortRestant = 0;
    let stat = { message: "", reste: 0 };

    if (type === "character") {
      ({ resultat, corrections, competences } = this.onCalculerPenaliteCompetences());
      stat        = this.onStat();
      sortRestant = calcul.nbSort - actor.items.filter(i => i.type === "magic").length;
    } else {
      calcul.hpalert = calcul.psyalert = "";
    }

    // ── Valeurs candidates ───────────────────────────────
    const candidates = {
      "system.armure":    armurenat,
      "system.reste":     resultat,
      "system.probleme":  stat.message,
      "system.restant":   stat.reste,
      "system.enc":       encStats.enc,
      "system.encmax":    encStats.max,
      "system.hp.value":  calcul.hp.value,
      "system.hp.max":    calcul.hp.max,
      "system.psy.value": calcul.psy.value,
      "system.psy.max":   calcul.psy.max,
      "system.cout":      calcul.cout,
      "system.max":       sortRestant,
      "system.alert.hp":  calcul.hpalert,
      "system.alert.psy": calcul.psyalert,
      "system.pvetpsy":   calcul.diff,
      "system.langues":   raceBonus.langues,
      ...this.onStatut(),
      ...corrections,
      ...competences,
    };

    // ── Ne mettre à jour que ce qui a changé ─────────────
    const updates = {};
    for (const [path, value] of Object.entries(candidates)) {
      const current = foundry.utils.getProperty(actor, path);
      if (current !== value) updates[path] = value;
    }

    if (Object.keys(updates).length) await actor.update(updates);
  }

  onCalculerPenaliteCompetences() {
    const { competences: cpts, niveau: level, base, clan, metier, faiblesse, race } = this.actor.system;
    const bonus_compt = faiblesse === "distrait" ? 8 : 10;
    let resultat = base + (level - 1) * bonus_compt;

    const corrections = {};
    const raceComp = Model.race[race] ?? {};
    for (const [comp, val] of Object.entries(raceComp)) {
      if (comp === "ajoutpoint" || comp==="langues") continue;
      if (!cpts[comp] || cpts[comp] < val) {
        corrections[`system.competences.${comp}`] = val;
        cpts[comp] = val;
      }
    }

    for (const [comp, mult] of Object.entries(Model.multiplicateurs)) {
      resultat -= (cpts[comp] ?? 0) * mult;
    }

    const competences = {};
    if (clan === "ralich") {
      if ((cpts.discretion ?? 0) < 10) competences["system.competences.discretion"] = 10;
      competences["system.reste"] = resultat + (race === "dragon" ? 30 : 20);
    } else if (clan === "limenido") {
      if ((cpts.observation ?? 0) < 10) competences["system.competences.observation"] = 10;
      competences["system.reste"] = resultat + 20;
    } else if (clan === "atlantide") {
      if ((cpts.connaissances ?? 0) < 10) competences["system.competences.connaissances"] = 10;
      competences["system.reste"] = resultat + 20;
    }

    const minRace   = Model.race[race] ?? {};
    const minMetier = Model.Metiers[metier]?.competences ?? {};
    for (const comp of new Set([...Object.keys(minRace), ...Object.keys(minMetier)])) {
      if (comp === "ajoutpoint" || comp === "armor" || comp==="langues") continue;
      const min = Math.max((minRace[comp] + minMetier[comp]) ?? 0);
      if ((cpts[comp] ?? 0) < min) competences[`system.competences.${comp}`] = min;
    }
    return { resultat, corrections, competences };
  }

  onStat() {
    const { ability } = this.actor.system;
    const physique = ability.force + ability.agilite;
    const social   = ability.charisme + ability.sagacite;
    const mental   = ability.memoire + ability.astuce;
    const stat     = ability.physique + ability.social + ability.mental;

    let message = "";
    if (physique !== ability.physique) message = game.i18n.localize("Liber.Labels.Erreur1");
    else if (social !== ability.social) message = game.i18n.localize("Liber.Labels.Erreur2");
    else if (mental !== ability.mental) message = game.i18n.localize("Liber.Labels.Erreur3");
    else if (stat !== 170)              message = game.i18n.localize("Liber.Labels.Erreur4");

    return { message: message.trim(), reste: 170 - stat };
  }

  onEnc() {
    const { ability: { force }, competences: { endurance: puissance }, race, talent, faiblesse, ecu } = this.actor.system;
    let min = 35;
    if (race === "centaure") min += 20;
    if (talent === "mulet")  min *= 2;
    if (faiblesse === "faible") min -= 10;
    const max = (force + puissance) / 2 + min;

    let enc = ecu * 0.01;
    for (const item of this.actor.items) enc += (item.system.poids ?? 0) * (item.system.quantity ?? 0);
    return { enc, max };
  }

  async _onVerifEnc() {
    const actor = this.actor;
    const { enc, max } = this.onEnc();

    const updates = {};
    if (foundry.utils.getProperty(actor, "system.enc")    !== enc)  updates["system.enc"]    = enc;
    if (foundry.utils.getProperty(actor, "system.encmax") !== max)  updates["system.encmax"] = max;

    if (Object.keys(updates).length) await actor.update(updates);
  }

  onCalcul() {
    const sys = this.actor.system;
    const { talent, faiblesse, clan, culte, niveau, insoin, race, metier } = sys;
    let pvMax = sys.hp.max ?? 0, psyMax = sys.psy.max ?? 0;
    let pvEncours = sys.hp.value ?? 0, psyEncours = sys.psy.value ?? 0;
    let pvMin, psyMin, nbSort, maxSort;

    if (metier === "personnalise") {
      pvMin   = Math.round(sys.ability.physique / 3);
      psyMin  = Math.round(sys.ability.mental / (sys.ability.physique / 10));
      nbSort  = Math.round(sys.ability.social / 10);
      maxSort = Math.max(0, Math.round(psyMin / 4) + niveau - 1);
      if (clan === "corbeau") maxSort = niveau;
    } else {
      const m = Model.Metiers[metier];
      pvMin   = m.hpmax;
      psyMin  = m.psymax;
      nbSort  = m.nb + niveau - 1;
      maxSort = m.cout + niveau - 1;
    }

    if (talent === "memoirearcanique") nbSort++;
    if (talent === "aura")      psyMin += 2 * niveau;
    if (talent === "vigoureux") pvMin  += 2 * niveau;

    pvMax  = Math.max(pvMax,  pvMin);
    psyMax = Math.max(psyMax, psyMin);
    if (niveau === 1) { pvMax = pvMin; psyMax = psyMin; }
    if (metier === "guerrier" && niveau === 1) psyMax = psyMin;
    if (race === "etredepsy")  { pvMax = 0; psyMin = 0; }
    if (race === "rocailleux") { pvMin += psyMin; psyMin = 0; psyMax = 0; psyEncours = 0; }

    pvEncours  = Math.min(pvEncours,  pvMax);
    psyEncours = Math.min(psyEncours, psyMax);
    if (pvEncours + insoin > pvMax) pvEncours = pvMax - insoin;

    const xp       = (niveau - 1) * 3 + pvMin + psyMin;
    const calcTot  = pvMax + psyMax;
    const diff     = calcTot - xp;
    const overXP   = calcTot > xp;
    const underXP  = calcTot < xp;

    return {
      hp:       { value: pvEncours, max: pvMax },
      psy:      { value: psyEncours, max: psyMax },
      nbSort,
      cout:     maxSort,
      diff,
      hpalert:  overXP ? "var(--couleur-rouge)" : underXP ? "var(--couleur-vert)" : "",
      psyalert: overXP ? "var(--couleur-rouge)" : underXP ? "var(--couleur-vert)" : "",
    };
  }

  onStatut() {
    const etatsActifs = new Set(this.actor.effects.map(e => e.name));
    const updates = {};
    this.element?.querySelectorAll(".chnget").forEach(icon => {
      updates[`system.etat.${icon.dataset.etat}`] = etatsActifs.has(icon.dataset.etat) ? 1 : 0.5;
    });
    return updates;
  }

  /* -------------------------------------------------- */
  /*  Actions items                                     */
  /* -------------------------------------------------- */

  static async #onItemAction(event, target) {
    event.preventDefault();
    this._lastAction = target.dataset.action;
    const { action, itemId, type: filterType } = target.dataset;
    const actor = this.actor;
    const item  = actor.items.get(itemId);

    switch (action) {
      case "edit":    return item.sheet.render(true);
      case "delete":  return item.delete();

      case "use": {
        const qty = item.system.quantity || 0;
        return qty > 1 ? item.update({ "system.quantity": qty - 1 }) : item.delete();
      }

      case "equip": {
        const protection = Number(target.dataset.protection) || 0;
        this._lastEquipDelta = protection;  // ← stocker
        await actor.update({ "system.armure": Math.max(0, (actor.system.armure || 0) + protection) });
        return item.update({ "system.equip": target.dataset.ou });
      }

      case "desequip": {
        const protection = Number(target.dataset.protection) || 0;
        this._lastEquipDelta = -protection;
        await actor.update({ "system.armure": Math.max(0, (actor.system.armure || 0) - protection) });
        return item.update({ "system.equip": "" });
      }

      case "filtre":
        return actor.update({ "system.inventory": filterType });

      case "rollDamage":
        return LiberCharacterSheet.#rollDamage(actor, item);

      case "description":
        return LiberCharacterSheet.#sendDescription(actor, item);

      default:
        console.warn(`Action item inconnue : ${action}`);
    }
  }

  static async #rollDamage(actor, item) {
  const { race, clan, talent, fatig = 0, niveau } = actor.system;
  const { doublemain, consommable, quantity = 0, biography, degat, equip } = item.system;
  if (!degat) return;

  let label     = `${actor.name} ${game.i18n.localize("Liber.Chat.Roll.utilise")} ${item.name}`;
  let result1   = await new Roll(degat).roll();
  let resultat  = result1.total;          // number
  let affichage = String(result1.total);  // string pour le chat

  if (doublemain === "yes") {
    const result2 = await new Roll(degat).roll();
    label     += game.i18n.localize("Liber.Chat.Roll.Percucant");
    resultat   = Math.max(result1.total, result2.total); // number — garde le meilleur
    affichage  = `${result1.total} / ${result2.total}`;  // string pour le chat
    await actor.update({ "system.fatig": fatig + 1 });
  }

  if (race === "orc"     && item.type === "weapon") resultat += 2;
  if (clan === "coalith" && item.type === "weapon") resultat += niveau;
  affichage = String(resultat); // sync après bonus

  // ── Cible désignée ─────────────────────────────────────────────
  const targets = game.user.targets;
  let targetInfo = "";

  if (targets.size > 0) {
    const targetActor = targets.first().actor;

    if (targetActor) {
      const armure    = Number(targetActor.system.armure)   ?? 0;
      const hpActuel  = Number(targetActor.system.hp.value) ?? 0;
      const degatsNet = Math.max(0, resultat - armure);
      const hpNouveau = Math.max(0, hpActuel - degatsNet);

      await targetActor.update({ "system.hp.value": hpNouveau });

      if (hpNouveau <= 0) {
        await targetActor.toggleStatusEffect("dead", { active: true, overlay: true });
      } else{
        await targetActor.toggleStatusEffect("dead", { active: false, overlay: false });
      }

      targetInfo = `
        <div class="target-result">
          <img src="${targetActor.img}">
          <strong>${targetActor.name}</strong> —
          ${hpNouveau <= 0 ? "<br><span style='color:#ff3333;'>☠ Hors combat</span>" : ""}
        </div>`;
    }
  }

  // ── Chat ───────────────────────────────────────────────────────
  const info   = biography ? `<div class="infos"><span class="title">Info</span><div class="description">${biography}</div></div>` : "";
  const succes = `${info}<span class='result' style='background:var(--couleur-vert);'>${affichage}</span>${targetInfo}`;

  await new LiberChat(actor)
    .withTemplate("systems/liber-chronicles/templates/chat/roll-damage.hbs")
    .withContent("rollDamage")
    .withData({ actingCharName: actor.name, actingCharImg: actor.img, actingAbilName: item.img, introText: label, succes })
    .create().then(c => c.display());

  // ── Consommable ────────────────────────────────────────────────
  if (consommable === "yes" && quantity > 0) {
    const newQty = quantity - 1;
    await item.update({ "system.equip": newQty === 0 ? "" : equip, "system.quantity": Math.max(0, newQty) });
  }
}

  static async #sendDescription(actor, item) {
    await new LiberChat(actor)
      .withTemplate("systems/liber-chronicles/templates/chat/roll-resultat.hbs")
      .withContent("itemDescription")
      .withData({ actingCharName: actor.name, actingCharImg: actor.img, actingAbilName: item.img, info: "Info", introText: item.name, succes: item.system.biography ?? "" })
      .create().then(c => c.display());
  }

  /* -------------------------------------------------- */
  /*  Actions acteur                                    */
  /* -------------------------------------------------- */

  static async #onActorAction(event, target) {
    event.preventDefault();
    this._lastAction = target.dataset.action;
    const actor  = this.actor;
    const action = target.dataset.action;
    const rand   = arr => arr[Math.floor(Math.random() * arr.length)];

    switch (action) {
      // 🎯 --- BONUS COMPÉTENCE ---
      case "bonuscompt": {
        const bonus = Number(target.dataset.val) || 0;
        await actor.update({ "system.bonus": bonus });
        break;
      }

      // 🧹 --- RÉINITIALISATION BONUS / CHAMP ---
      case "restbonus": {
        const name = target.dataset.name;
        await actor.update({ [`system.${name}`]: 0 });
        break;
      }

      case "roll": {
        const { ability, type, itemId, img, objet } = target.dataset;
        await this._generateRoll(actor, ability, parseInt(target.dataset.value) || 0, type, itemId, img, objet);
        break;
      }
      // ⬆️ --- LEVEL UP (placeholder futur) ---
      case "levelUp": {
        const level = parseInt(target.value, 10);
        if (isNaN(level) || level <= 0) return console.error("Niveau invalide :", level);
        ui.notifications.info(`${actor.name} passe au niveau ${level}`);
        break;
      }

      case "posture": {
        const posture    = target.dataset.posture;
        const introText  = `${game.i18n.localize("Liber.Chat.Posture.Change")} ${game.i18n.localize(`Liber.Chat.Posture.${posture}`)}`;
        const text       = game.i18n.localize(`Liber.Chat.Posture.${posture}-text`);
        await new LiberChat(actor).withTemplate("systems/liber-chronicles/templates/chat/posture.hbs").withContent(posture).withData({ actingCharName: actor.name, actingCharImg: actor.img, introText, text }).create().then(c => c.display());
        await actor.update({ "system.posture": posture });
        break;
      }

      case "sleep":
        await this._handleSleep(actor);
        break;

      case "update": {
        const { metier, race } = actor.system;
        const metierData = Model.Metiers[metier];
        if (!metierData) return ui.notifications.warn(`Métier "${metier}" introuvable.`);

        const competencesReset  = Object.fromEntries(Object.keys(actor.system.competences || {}).map(k => [`system.competences.${k}`, 0]));
        const abilityUpdates    = Object.fromEntries(Object.entries(metierData.ability).map(([k, v]) => [`system.ability.${k}`, v]));
        const raceBonus         = Model.race[race] ?? {};
          // ⚡ Maj sans "langue"
        const competencesMaj = Object.fromEntries(
          Object.keys({ ...metierData.competences, ...raceBonus })
            .filter(k => k !== "langue")
            .map(k => [
              `system.competences.${k}`,
              (metierData.competences?.[k] || 0) + (raceBonus?.[k] || 0)
            ])
        );


        await actor.update({
          name:  await this._generateName(),
          img:   await this._generateAvatar(),
          "system.hp.value":  metierData.hpmax,
          "system.hp.max":    metierData.hpmax,
          "system.psy.value": metierData.psymax,
          "system.psy.max":   metierData.psymax,
          "system.base":      25 + (raceBonus.ajoutpoint ?? 0),
          "system.armure":    (raceBonus.armor ?? 0),
          ...abilityUpdates,
          ...competencesReset,
          ...competencesMaj,
        });
        ui.notifications.info(`${actor.name} a été mis à jour.`);
        break;
      }

      case "story": {
        const parts = ["actionPreparatrice","mentor","actionReponse","enemy","reward","hero"];
        const keys  = ["partie1","partie2","partie3","partie4","partie5","partie6"];
        const story = parts.map((p, i) =>
          `${game.i18n.localize(rand(Model[p]))} ${game.i18n.localize(`Liber.Character.Histoire.Partie.${keys[i]}`)}`
        ).join("\n");
        await actor.update({ "system.biography": story.trim() });
        break;
      }

      case "carac": {
        const keys = ["interets","deces","amour","amitie","haine","principale","passion","personnalite","perception","rancunier","tare","distingue"];
        await actor.update(Object.fromEntries(keys.map(k => [`system.caractere.${k}`, game.i18n.localize(rand(Model[k]))])));
        break;
      }

      case "random": {
        const type = target.dataset.type;
        const pack = game.packs.get("liber-chronicles.inventaire");
        if (!pack) return ui.notifications.error("Pack introuvable.");
        const docs     = await pack.getDocuments();
        const filtered = docs.filter(t => t.type === type);
        if (!filtered.length) return ui.notifications.warn(`Aucun objet pour le type : ${type}`);

        const items = ["armor","weapon"].includes(type)
          ? [{ ...filtered[Math.floor(Math.random() * filtered.length)].toObject(), _id: undefined, "system.quantity": 1 }]
          : Array.from({ length: Math.floor(Math.random() * 10) + 1 }, () => ({
              ...filtered[Math.floor(Math.random() * filtered.length)].toObject(),
              _id: undefined,
              "system.quantity": Math.floor(Math.random() * 10) + 1,
            }));

        // Nettoyer les _id avant création
        items.forEach(i => delete i._id);
        await actor.createEmbeddedDocuments("Item", items, { renderSheet: false });
        ui.notifications.info(`${items.length} objet(s) ajouté(s) à ${actor.name}`);
        break;
      }

      default:
        console.warn(`Action acteur inconnue : ${action}`);
    }
  }

  /* -------------------------------------------------- */
  /*  Equipement                                        */
  /* -------------------------------------------------- */
  async _onVerifEquip() {
    const actor   = this.actor;
    const sys     = actor.system;
    const delta   = this._lastEquipDelta ?? 0;
    this._lastEquipDelta = null;  // reset

    // sys.armure contient déjà la valeur mise à jour par le handler
    // On applique juste le plancher racial
    const raceBonus = Model.race[sys.race] ?? {};
    const armurenat = Math.max(sys.armure, raceBonus.armor ?? 0);

    if (foundry.utils.getProperty(actor, "system.armure") !== armurenat) {
      await actor.update({ "system.armure": armurenat });
    }
  }



  /* -------------------------------------------------- */
  /*  Image                                             */
  /* -------------------------------------------------- */

  static async #onEditImage(event, target) {
    const attr    = target.dataset.edit;
    const current = foundry.utils.getProperty(this.document, attr);
    const { img } = this.document.constructor.getDefaultArtwork?.(this.document.toObject()) ?? {};
    return new FilePicker({
      current,
      type: "image",
      redirectToRoot: img ? [img] : [],
      callback: path => this.document.update({ [attr]: path }),
      top:  this.position.top  + 40,
      left: this.position.left + 10,
    }).browse();
  }

  /* -------------------------------------------------- */
  /*  Génération nom / avatar                           */
  /* -------------------------------------------------- */

  async _generateName() {
    const { race, sex = "male" } = this.actor.system;
    const nameList = Model.names[race];
    if (!nameList) return this.actor.name || "Nouvel Acteur";

    let name;
    const s = sex === "Autre" ? "male" : sex;
    if (nameList.female && nameList.male) {
      const arr = nameList[s] ?? nameList.male ?? nameList.female;
      name = arr[Math.floor(Math.random() * arr.length)];
    } else if (race === "dragon") {
      const a = nameList[Math.floor(Math.random() * nameList.length)];
      const b = nameList[Math.floor(Math.random() * nameList.length)];
      name = (a + b).charAt(0).toUpperCase() + (a + b).slice(1);
    } else {
      name = nameList[Math.floor(Math.random() * nameList.length)];
    }

    if (nameList.famille?.length) {
      const fam = nameList.famille[Math.floor(Math.random() * nameList.famille.length)];
      name = `${fam} ${name}`;
    }
    return name;
  }

  async _generateAvatar() {
    const { race, sex } = this.actor.system;
    if (!race || race === "autre") return "icons/svg/mystery-man.svg";
    const gender = sex === "female" ? "femmes" : "hommes";
    const rand   = Math.floor(Math.random() * 10) + 1;
    return `systems/liber-chronicles/assets/avatar/${race}/${gender}/avatar${rand}.jpg`;
  }

  /* -------------------------------------------------- */
  /*  Jet de dé                                         */
  /* -------------------------------------------------- */

  async _generateRoll(actor, ability, valuemax, type, itemId, image, objet) {
    const sys = this.actor.system;
    const { posture, fatigue, fatig = 0, enc = 0, encmax = 0, traitre, emphase } = sys;
    const bonus  = parseInt(sys.bonus) || 0;
    const malus  = parseInt(sys.malus) || 0;

    const equippedItems = this.actor.items.filter(i => i.system.equip);
    let visuel = image || `systems/liber-chronicles/assets/actor/${ability}.webp`;
    let label  = `${actor.name}${game.i18n.localize("Liber.Chat.Roll.faire")}${game.i18n.localize("Liber.Chat.Roll." + ability)}`;

    let item, itemname, quantity, psy, pv, insoin, physique, mental, social, description, talent;

    if (type) {
      item = this.actor.items.get(itemId);
      if (item) {
        ({ value: psy }  = sys.psy);
        ({ value: pv }   = sys.hp);
        insoin    = parseInt(sys.insoin) || 0;
        mental    = parseInt(sys.ability.mental) || 0;
        social    = parseInt(sys.ability.social) || 0;
        physique  = parseInt(sys.ability.physique) || 0;
        talent    = sys.talent;
        description = item.system.biography;
        quantity  = parseInt(item.system.quantity) || 0;
        visuel    = item.img;
        itemname  = item.name;
      }
      visuel = image || visuel;
      if      (type === "corbeau")    { ability = "physique"; valuemax = physique; }
      else if (type === "troubadour") { ability = "social";   valuemax = social;   }
      else                            { ability = "mental";   valuemax = mental;   }
      label = `${actor.name}${game.i18n.localize("Liber.Chat.Roll.faire")} : ${itemname}`;
    }

    valuemax += bonus + malus;
    let critique = 5, echec = 95;

    if (traitre === "yes")         echec  -= 5;
    if (emphase === "dephase2")    echec  -= 10;
    else if (emphase === "dephase1") echec -= 5;
    else if (emphase === "emphase1") critique += 5;
    else if (emphase === "emphase2") critique += 10;

    if (posture === "offensif") critique += 5;
    if (posture === "focus")    valuemax += 5;
    if (enc > encmax && ability === "physique") valuemax -= Math.floor(enc - encmax);
    if (ability === "physique") valuemax -= fatig * 5;

    valuemax = Math.max(critique, Math.min(echec, valuemax));

    const roll   = await new Roll("1d100").roll();
    const result = roll.total;

    let info = `${result}/${valuemax}`;
    if (type) info += `<div class="infos"><span class="title">Info</span><div class="description">${description}</div></div>`;

    let succes = "";
    if      (result > echec)    succes = `<span class='result' style='background:#ff3333;'>${game.i18n.localize("Liber.Chat.Roll.EchecCrit")}</span>`;
    else if (result <= critique) succes = `<span class='result' style='background:#7dff33;'>${game.i18n.localize("Liber.Chat.Roll.ReussiteCrit")}</span>`;
    else if (result <= valuemax) succes = `<span class='result' style='background:var(--couleur-vert);'>${game.i18n.localize("Liber.Chat.Roll.Reussite")}</span>`;
    else                        succes = `<span class='result' style='background:var(--couleur-rouge);'>${game.i18n.localize("Liber.Chat.Roll.Echec")}</span>`;

    if (objet === "magie") {
      if (posture === "focus") quantity = Math.max(0, quantity - 1);
      if (type !== "corbeau") {
        if ((psy + pv) >= quantity) {
          psy -= quantity;
          if (psy < 0) { pv += psy; if (talent !== "conversion") insoin -= psy; psy = 0; }
        } else {
          succes = "";
          info   = `${game.i18n.localize("Liber.Chat.Roll.Ressource")}<div class="infos"><span class="title">Info</span><div class="description">${description}</div></div>`;
        }
      } else {
        if (pv >= quantity) { pv -= quantity; }
        else { succes = ""; info = `${game.i18n.localize("Liber.Chat.Roll.Ressource")}<div class="infos"><span class="title">Info</span><div class="description">${description}</div></div>`; }
      }
      await this.actor.update({ "system.hp.value": pv, "system.insoin": insoin, "system.psy.value": psy });
    }

    if (type && item?.system.degat != 0) {
      succes += `<button class="roll-damage" data-action="rollDamage" data-itemid="${itemId}" data-actorid="${actor._id}">${game.i18n.localize("Liber.Chat.Roll.LancerDegats")}</button>`;
    }

    if (equippedItems.length && ability === "physique") {
      for (const eq of equippedItems) {
        if (eq.system.degat !== "0") succes += `<button class="roll-damage" data-action="rollDamage" data-itemid="${eq._id}" data-actorid="${actor._id}">${game.i18n.localize("Liber.Chat.Roll.utiliser")} ${eq.name}</button>`;
        if (eq.system.consommable === "yes") succes += `<button class="use-item" data-action="useItem" data-itemid="${eq._id}" data-actorid="${actor._id}">${game.i18n.localize("Liber.Chat.Roll.consommer")} ${eq.name}</button>`;
      }
    }

    const chat = await new LiberChat(actor)
      .withTemplate("systems/liber-chronicles/templates/chat/roll-resultat.hbs")
      .withContent(ability)
      .withData({ actingCharName: actor.name, actingCharImg: actor.img, actingAbilName: visuel, introText: label, info, succes })
      .create();
    await chat.display();
    return { roll, result };
  }

  /* -------------------------------------------------- */
  /*  Sommeil                                           */
  /* -------------------------------------------------- */

  async _handleSleep(actor) {
    const sys = actor.system;
    let { talent, faiblesse, duree, repos, niveau, fatig, ronfleur } = sys;
    let { value: psy, max: psymax } = sys.psy;
    let { value: hp,  max: hpmax  } = sys.hp;
    let insoin = sys.insoin;
    let time   = sys.time;
    if (duree === "day") time *= 24;

    let d = 0, hpadd = 0, psyadd = 0, fatadd = 0;

    const sleeping = {
      fast:   () => { d = Math.floor(Math.random() * 4) + 1; insoin = 1; hpadd = Math.round((d + niveau) * time / 8); psyadd = Math.round(niveau * time / 2); fatadd = 0; },
      quiet:  () => { d = Math.floor(Math.random() * 6) + 1; insoin = 1; hpadd = Math.round((d + niveau) * time / 8); psyadd = Math.round(niveau * time / 2); fatadd = time; },
      good:   () => { d = Math.floor(Math.random() * 6) + 1; insoin = 0; hpadd = (d + niveau) * time;  psyadd = niveau * time; fatadd = 2 * time; },
      intens: () => { d = Math.floor(Math.random() * 8) + 1; insoin = 0; hpadd = (2*d + niveau) * time; psyadd = niveau * time; fatadd = 3 * time; },
    };
    sleeping[repos]?.();

    if (talent === "bondormeur")      { hpadd *= 2; psyadd *= 2; }
    if (faiblesse === "insomniaque")  { hpadd /= 2; psyadd /= 2; }

    hp   = Math.min(hp  + hpadd,  hpmax);
    psy  = Math.min(psy + psyadd, psymax);
    fatig = Math.max(0, fatig - fatadd);
    if (hp >= hpmax && insoin > 0) hp = hpmax - insoin;

    const text = ronfleur === "no"
      ? game.i18n.localize("Liber.Chat.Sleep.recuperation")
      : game.i18n.localize("Liber.Chat.Sleep.ronfleur");

    await new LiberChat(actor)
      .withTemplate("systems/liber-chronicles/templates/chat/posture.hbs")
      .withContent("sleep")
      .withData({ actingCharName: actor.name, actingCharImg: actor.img, introText: game.i18n.localize("Liber.Chat.Sleep.sleep"), text })
      .create().then(c => c.display());

    if (ronfleur === "no") {
      await actor.update({ "system.insoin": insoin, "system.hp.value": hp, "system.psy.value": psy, "system.fatig": fatig });
    }
  }

  /* -------------------------------------------------- */
  /*  Sorts                                             */
  /* -------------------------------------------------- */

  static async #onAddSort(event, target) {
    const select = document.querySelector(`#LiberCharacterSheet-Actor-${this.actor._id} select[name='system.magieChoisie']`);
    if (!select) return console.error("select[name='system.magieChoisie'] introuvable.");
    const dataId = select.value;
    if (!dataId) return console.error("Aucun sort sélectionné.");

    const pack = game.packs.get("liber-chronicles.magie");
    if (!pack) return console.error("Compendium 'liber-chronicles.magie' introuvable.");

    const index = await pack.getIndex();
    const entry = index.find(i => i._id === dataId);
    if (!entry) return console.error(`Sort ${dataId} non trouvé.`);

    const spell = await pack.getDocument(entry._id);
    if (spell) await this.actor.createEmbeddedDocuments("Item", [spell.toObject()]);
  }

  /* -------------------------------------------------- */
  /*  États / effets                                    */
  /* -------------------------------------------------- */

  static #STATUS_MAP = {
    Asleep: "sleep",     Stunned: "stun",     Blind: "blind",
    Deaf: "deaf",        Silenced: "silenced", Frightened: "fear",
    Burning: "fire",     Frozen: "frozen",     Invisible: "invisible",
    Bleeding: "bleeding", Poisoned: "poison",  Blessed: "blessed",
    Unconscious: "unconscious", Dead: "dead",
  };

  static async #onEtatToggle(event, target) {
    const etatKey = target.dataset.etat;
    if (!etatKey) return;
    const actor    = this.document;
    const newValue = actor.system.etat[etatKey] === 1 ? 0.5 : 1;
    await actor.update({ [`system.etat.${etatKey}`]: newValue });

    const statusId = LiberCharacterSheet.#STATUS_MAP[etatKey];
    if (statusId) {
      try { await actor.toggleStatusEffect(statusId, { active: newValue === 1, overlay: false }); }
      catch (e) { console.warn(`toggleStatusEffect(${statusId}) :`, e); }
    }
  }
}