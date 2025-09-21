const ActorSheetV2 = foundry.applications.sheets.ActorSheetV2;
const { HandlebarsApplicationMixin } = foundry.applications.api;
import LiberChat from "../document/chat.js";
import {Model} from "../data/model.js";

/** Gestion de la feuille de personnage */

export default class LiberCharacterSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["liber", "actor", "character"],
    position: { width: 685, height: 890 },
    form: { submitOnChange: true },
    window: { resizable: true },
    dragDrop: [{ dragSelector: '[data-drag]', dropSelector: '.inventory-list' }], // Remplacer '.inventory-list' par votre sélecteur    tabGroups: { sheet: "inventory" },
    actions: {
      editImage: LiberCharacterSheet.#onEditImage,
      edit: LiberCharacterSheet.#onItemEdit,
      delete: LiberCharacterSheet.#onItemDelete,
      posture:LiberCharacterSheet.#onPosture,
      bonuscompt:LiberCharacterSheet.#onBonusCompt,
      restbonus:LiberCharacterSheet.#onBonusReset,
      update:LiberCharacterSheet.#onUpdate,
      levelup:LiberCharacterSheet.#onLevelUp,
      roll:LiberCharacterSheet.#onRoll,
      story:LiberCharacterSheet.#onStory,
      sleep:LiberCharacterSheet.#onSleep,
      carac:LiberCharacterSheet.#onCarac,
      filtre:LiberCharacterSheet.#onFiltre,
      random:LiberCharacterSheet.#onRandom,
      equip: LiberCharacterSheet.#onItemEquip,
      desequip: LiberCharacterSheet.#onItemDesequip,
      rollDamage: LiberCharacterSheet.#onItemRollDamage,
      description: LiberCharacterSheet.#onItemDescription,
      addsort: LiberCharacterSheet.#onAddSort
    }
  };

  /** @override */
  static PARTS = {
    tabs: { template: "systems/liber/templates/actors/character-navigation.hbs" },
    header: { template: "systems/liber/templates/actors/character-header.hbs" },
    biography: { template: "systems/liber/templates/actors/character-biography.hbs" },
    inventory: { template: "systems/liber/templates/actors/character-inventory.hbs" }
  };



  /** Préparation des données */
  async _prepareContext() {
    const filter=this.document.system.inventory;
    const items=this.document.items.toObject();
    
    // Séparer les objets magiques
    let magic = items
    .filter(item => item.type === "magic")
    .sort((a, b) => a.system.quantity - b.system.quantity);
    let filteredItems;
    if(filter=="all"){
      filteredItems = items.filter(item => item.type !== "magic");
    }else{
      filteredItems = items.filter(item => filter.includes(item.type));
    }
    filteredItems.droite=[];
    filteredItems.gauche=[];
    filteredItems.middle=[];
    
    // Répartition des items en fonction de l'emplacement
    filteredItems.forEach(item => {
    const equipLocation = item.system.equip; 
        if (equipLocation === "droite") {
            filteredItems.droite.push(item);
        } else if (equipLocation === "gauche") {
            filteredItems.gauche.push(item);
        } else if (equipLocation === "middle") {
            filteredItems.middle.push(item);
        }
    });

    //Affichage des cultes et clan en fonction de la race
    const race = this.document.system.race;
    const clan = this.document.system.clan;
    const culte = this.document.system.culte;
    const metier = this.document.system.metier;

    let listCulte = [];
    let listClan = [];
    let listMetier = [];
    let listMagie = [];

    if (race === "dragon") {
        listClan = ["aucune", "ralich", "aelath", "dwaliwyr", "yie", "nydiag", "weitha", "crilanydd", "cem", "coalith", "natura", "vivaqua", "limenido", "eraliwin", "atlantide", "galerrakath", "atakanax", "corbeau", "nomade", "troubadour", "other"];
        listCulte = (clan === "nomade") ? ["aucune"] : ["aucune", "vharung", "marrunas", "vaudou", "dieuxsombres", "runes", "other"];
    } else if (race === "humain") {
        listClan = ["aucune", "oklata", "nomade", "troubadour", "corbeau"];
        listCulte = (clan === "nomade") ? ["aucune"] : ["aucune", "nouvelordre", "croises", "lumiereceleste", "vharung", "waetra", "baphomet", "marrunas", "vaudou", "numismatomancie", "dieuxsombres", "runes", "other"];
    } else if (race === "demon") {
        listClan = ["aucune", "demonclan", "nomade", "troubadour", "corbeau", "other"];
        listCulte = (clan === "nomade") ? ["aucune"] : ["aucune", "waetra", "demonsanciens", "numismatomancie", "vharung", "marrunas", "dieuxsombres", "vaudou", "runes", "other"];
    } else if (race === "drauch") {
        listClan = ["aucune", "drauch", "nomade", "troubadour", "corbeau", "other"];
        listCulte = (clan === "nomade") ? ["aucune"] : ["aucune", "waetra", "vharung", "numismatomancie", "marrunas", "dieuxsombres", "vaudou", "runes", "other"];
    } else if (race === "rocailleux") {
        listClan = ["aucune"];
        listCulte = ["aucune"];
    } else if (race === "celeste") {
        listClan = ["oklata"];
        listCulte = ["other"];
    } else if (race === "semihumain") {
        listClan = ["aucune", "oklata", "ralich", "aelath", "dwaliwyr", "yie", "nydiag", "weitha", "crilanydd", "cem", "coalith", "natura", "vivaqua", "limenido", "eraliwin", "atlantide", "galerrakath", "atakanax", "corbeau", "nomade", "troubadour", "other"];
        listCulte = (clan === "nomade") ? ["aucune"] : ["aucune", "nouvelordre", "croises", "lumiereceleste", "vharung", "waetra", "demonsanciens", "baphomet", "marrunas", "vaudou", "runes", "numismatomancie", "dieuxsombres", "other"];
    } else {
        listClan = ["aucune", "drauch", "demonclan", "ralich", "aelath", "dwaliwyr", "yie", "nydiag", "weitha", "crilanydd", "cem", "coalith", "natura", "vivaqua", "limenido", "eraliwin", "atlantide", "galerrakath", "atakanax", "oklata", "nomade", "troubadour", "corbeau", "other"];
        listCulte = (clan === "nomade") ? ["aucune"] : ["aucune", "nouvelordre", "croises", "lumiereceleste", "vharung", "waetra", "demonsanciens", "baphomet", "marrunas", "vaudou", "runes", "numismatomancie", "dieuxsombres", "other"];
    }

    // Adapter la liste des cultes ou clans en fonction du métier sélectionné
    if (metier === "mercenaire") {
      listCulte = listClan.filter(clan => !["corbeau", "troubadour"].includes(clan));
    } else if (metier === "inquisiteur") {
      listClan = listClan.filter(clan => !["croises"].includes(clan));
    }
    // Attribution de métiers en fonction du clan et du culte

    if (clan === "corbeau") {
        listMetier = ["none","guerrier"];listCulte=["aucune","runes","other"];
    } else if (clan === "troubadour") {
        listMetier = ["none","troubadour"];
    } else if (culte === "croises") {
        listMetier = ["none","croise"];
    } else {
        listMetier = ["personnalise","chevalier","soldat","mercenaire","pirate","chasseurdeprime","assassinvoleur","inquisiteur","druide","clerc","erudit","magicien","oracle"];
    }

    const cout = this.actor.system.cout || 0; // Vérifier si `cout` est défini

    // Vérifier si le compendium existe
    const pack = game.packs.get('liber.magie');
    if (!pack) {
        console.error("Compendium 'liber.magie' introuvable !");
        return;
    }
    // Récupérer les documents du compendium
    const tables = await pack.getDocuments();
    if (!tables.length) {
        console.warn("Aucune donnée trouvée dans le compendium 'liber.magie'.");
        return;
    }

    // Déterminer l'école de magie en fonction du clan ou du culte
    let magieSchool = [culte]; // Ajouter le culte
    if (clan === "drauch") {
      magieSchool.push("yie", "crilanydd");
    } else if(race=="celeste"){
      magieSchool = ["lumiereceleste","croises","nouvelordre","vharung","galerrakath","oklata"];
    }else {
      magieSchool.push(clan);
    }
    // Vérifier et ajouter la magie correspondante au système du personnage
    let newMagie = [];
    tables.forEach(table => {
      // Si le clan ou le culte est "other", inclure toutes les magies sous la condition de coût
      if (clan === "other" || culte === "other" && race!="celeste") {
          if (table.system.quantity <= cout) {
              newMagie.push({ name: table.name, id: table._id, quantity : table.system.quantity, description : table.system.biography });
          }
      } 
      // Sinon, appliquer la logique classique
      else if (magieSchool.includes(table.system.school) && table.system.quantity <= cout) {
          newMagie.push({ name: table.name, id: table._id, quantity : table.system.quantity, description : table.system.biography });
      }
    });
    newMagie.sort((a, b) => a.quantity - b.quantity);

    // Convertir `newMagie` en tableau pour la mise à jour
    listMagie = Array.from(newMagie);
    if (!game.user.isGM) {
      console.log("pas gm"); 
    }

    return {
        tabs: this.#getTabs(),
        fields: this.document.schema.fields,
        systemFields: this.document.system.schema.fields, 
        //systemFields:fixedSystemFields, 
        actor: this.document,
        system: this.document.system,
        inventory:filteredItems,
        magic:magic,
        listClan:listClan,
        listCulte:listCulte,
        listMagie:listMagie,
        listMetier:listMetier,
        source: this.document.toObject(),
        items: this.document.items.toObject()
      };
  }


  async _preparePartContext(partId, context) {
    return context;
  }

  _onRender(context, options) {
    super._onRender(context, options);  // Appelez la méthode parente si nécessaire
    console.log(context);
    this._onVerif();

    // Ajoutez un listener pour vérifier si le drag-and-drop fonctionne
    this.element.querySelectorAll('[data-drag]').forEach(item => {
        item.addEventListener('dragstart', () => {
      });
    });

    /*conserver le dernier onglet ouvert*/
    if (!this.actor) return;
    // Récupérer l'onglet actif spécifique à ce personnage (ou valeur par défaut)
    const activeTab = localStorage.getItem(`activeTab-${this.actor.id}`) || "background"; 
    // Appliquer l'affichage correct
    this._setActiveTab(activeTab);
    // Gérer le clic sur les onglets pour changer de vue
    this.element.querySelectorAll(".sheet-tabs [data-tab]").forEach(tab => {
      tab.addEventListener("click", (event) => {
        const newTab = event.currentTarget.dataset.tab;
        this._setActiveTab(newTab);
      });
    });

    /* Colorisation des compétences */
    let compe = '';
    document.querySelectorAll(".perso").forEach(compt => {
      const input = compt.querySelector("input");
      const spanElement = compt.querySelector("span");
      const calc = compt.querySelector("span[calc]").getAttribute("calc");
      const span = spanElement ? spanElement.innerHTML : ""; // Vérifie si <a> existe
      const valor = parseInt(input?.value, 10) || 0; // Vérifie si input existe et parse en nombre
      const dataAbility = compt.getAttribute('data-ability'); // Récupère la valeur de data-ability du parent .perso
      // Appliquer la couleur selon la valeur
      if (valor === 0) {
        input.style.background = "";
        input.style.color = "var(--couleur-clair)";
      } else if (valor > 0) {
        input.style.background = "var(--couleur-vert)";
        input.style.color = "white";
        compe += `<div class="resume"><a class="attribut" data-action="bonuscompt" data-ability="${dataAbility}" data-val="${valor}" title="span"><span>${valor}</span> ${span}</a></div>`;
      } else {
        input.style.background = "var(--couleur-rouge)";
        input.style.color = "white";
        compe += `<div class="resume"><a class="attribut" data-action="bonuscompt" data-ability="${dataAbility}" data-val="${valor}" title="span"><span>${valor}</span> ${span}</a></div>`;
      }  
    });
    const type=this.actor.type;
    //if(type=='character' || type=="pnj"){
    
    //}

    // Mettre à jour le contenu de `.competences` raccourci des information
    let competencesElement = document.querySelector(".competences");
    if (competencesElement) {
      competencesElement.innerHTML = compe;
    }

    

    // Récupérer la valeur de la posture
    const posture = this.actor.system.posture;

    // Sélectionner tous les éléments avec la classe 'post'
    document.querySelectorAll('.post').forEach(element => {
      // Vérifier si l'élément a la classe 'posture'
      if (element.classList.contains(posture)) {
        // Si c'est le cas, appliquer l'opacité à 1
        element.style.opacity = '1';
      } else {
        // Sinon, appliquer l'opacité à 0.5
        element.style.opacity = '0.5';
      }
    });

    //opacité des avantage insoin ...
    document.querySelectorAll('.head input').forEach(element => {
      // Vérifier si l'élément a la classe 'posture'
      if (element.value>0) {
        // Si c'est le cas, appliquer l'opacité à 1
        element.style.opacity = '1';
      } else {
        // Sinon, appliquer l'opacité à 0.5
        element.style.opacity = '0.5';
      }
    });

    // Récupérer la valeur de l'élément HTML avec la classe 'enc'
    const max = this.actor.system.encmax;

    // Calcul du total et du pourcentage
    const min = this.actor.system.enc;
    let pourcentage =Math.round(min * 100 / max);
    if(pourcentage>100){pourcentage=100;}
    // Récupérer la barre d'encombrement
    const barEncElement = document.querySelector('.barenc');
    barEncElement.style.width = pourcentage+'%';
    // Modifier la couleur de la barre d'encombrement en fonction du pourcentage
    if (pourcentage < 25) {
        barEncElement.style.background = 'green';
        
    } else if (pourcentage < 75) {
        barEncElement.style.background = 'orange';
    } else if (pourcentage < 100) {
        barEncElement.style.background = 'red';
    } else if (pourcentage < 120) {
        barEncElement.style.background = '#660000';
    } else {
        barEncElement.style.background = 'black';
    }

    //tab inventaire
    const inventory = this.actor.system.inventory;
    const types = ["all", "weapon", "armor", "item"];

    if (types.includes(inventory)) {
      document.querySelector(`a[data-type="${inventory}"]`).style.opacity = 1;
    }

    // Background red si PV à zéro
    const race = this.actor.system.race;
    const hp = this.actor.system.hp.value;
    const psy = this.actor.system.psy.value;

    // Vérifier si les points de vie sont égaux à 0
    if ((hp <= 0 && race !== 'etredepsy') || (psy <= 0 && race === 'etredepsy')) {
        // Récupérer l'élément et appliquer le style CSS
        const actorElement = document.getElementById(`LiberCharacterSheet-Actor-${this.actor._id}`);
        if (actorElement) {
            actorElement.style.background = 'linear-gradient(230deg, rgba(190,25,25,1) 0%, rgba(25,25,25,1) 100%)';
        }else{
            actorElement.style.background = 'linear-gradient(218deg, #2a2b2c 0%, #120304 100%)';
        }

    }
    let reste = document.querySelector("input[name='system.reste']");
    if(reste.value>0){
      reste.style.background = "var(--couleur-vert)";
    }else if(reste.value<0){
      reste.style.background = "var(--couleur-rouge)";
    }

  }
  
  /*conserver le dernier onglet ouvert*/
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

  #tabs() {
    const tabs = {
      background: { id: "background", group: "sheet", icon: "fa-solid fa-book", label: "Liber.Labels.background" },
      carac: { id: "carac", group: "sheet", icon: "fa-solid fa-shapes", label: "Liber.Labels.carac" },
      features: { id: "features", group: "sheet", icon: "fa-solid fa-shapes", label: "Liber.Labels.features" },
      items: { id: "items", group: "sheet", icon: "fa-solid fa-shapes", label: "Liber.Labels.items" },
      spells: { id: "spells", group: "sheet", icon: "fa-solid fa-shapes", label: "Liber.Labels.spells" },
      lab: { id: "lab", group: "sheet", icon: "fa-solid fa-shapes", label: "Liber.Labels.lab" }
    };

    const activeTab = this.tabGroups.sheet || "background"; // Si aucune valeur n'est définie, l'onglet "features" est activé par défaut.
    
    for (const v of Object.values(tabs)) {
      v.active = activeTab === v.id;
      v.cssClass = v.active ? "active" : "";
      }
    return tabs;
  }

  /** Gestion des onglets */
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

  /** Gestion des événements au rendu */
  /** @override */
 /* async _onDrop(event) {
    event.preventDefault();
    console.log(event)
    const data = TextEditor.getDragEventData(event);

    if (data.type === "Item") {
        const item = await Item.fromDropData(data);
        if (item) {
            await this.actor.createEmbeddedDocuments("Item", [item.toObject()]);
        }
    }
  }

  async _onDropItem(event, itemData) {
      // Sauvegarder l'onglet actif
      console.log(event)
      const activeTab = this._tabs[0]?.active;
      // Ajouter l'objet normalement
      await super._onDropItem(event, itemData);

      // Rafraîchir sans perdre l'onglet actif
      this.render(false, { activeTab });
  }

  

  /** @override */
 _onVerif() {
    let resultat = 0;
    let sortPris = [];
    let corrections = [];
    let competences = [];
    let sortRestant = 0;
    let stat = { message: "", reste: 0 };

    const type = this.actor.type;
    //const point_apprentissage = this.actor.system.competences.apprentissage;
    const level = this.actor.system.niveau;

   if (type === 'character') {
        // Vérification des compétences
        const compCheck  = this.onCalculerPenaliteCompetences();
        resultat=compCheck.resultat;
        corrections =compCheck.corrections;
        competences =compCheck.competences;
        // Vérification des points stat
        stat = this.onStat();
    }
 
    // Calcul de l'encombrement
    let encStats = this.onEnc() || { enc: 0, max: 0 };

    // Calcul des points de vie et de magie
    let calcul = this.onCalcul();


    if (type === 'character') {
        sortPris = this.actor.items.filter(item => item.type === "magic");
        sortRestant = calcul.nbSort - sortPris.length;
    }else {
      calcul.hpalert="";
      calcul.psyalert="";
    }
    let updateData = {
        ...this.onStatut(),     // Autres données de statut
        ...corrections          // Compétences raciales corrigées 
    };


    // Mise à jour de l'acteur
    this.actor.update({
      "system.reste": resultat,
      "system.probleme": stat.message,
      "system.restant": stat.reste,
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
      // [`system.apprentissage.level${level}`]: point_apprentissage,
      ...updateData,
      ...competences
    });
}



  /**
   * Calcule la pénalité en fonction des compétences avec leurs multiplicateurs et applique les limites.
   * @param {Object} cpts - Objet contenant les compétences et leurs valeurs.
   * @returns {number} - Résultat après application des multiplicateurs et limites.
   */
  onCalculerPenaliteCompetences() {
    const cpts = this.actor.system.competences;
    const level = this.actor.system.niveau;
    const base = this.actor.system.base;
    const clan = this.actor.system.clan;
    const faiblesse =this.actor.system.faiblesse;
    //const apprentissage=this.actor.system.apprentissage;
    const race = this.actor.system.race;
    let bonus_compt=10;
    if(faiblesse=="distrait"){
      bonus_compt=bonus_compt - 2;
    }
    /*let apprentissage_bonus = 0;
    for (let i = 1; i < level; i++) {

        apprentissage_bonus = apprentissage_bonus + apprentissage["level"+i] || 0; 
    }
    let resultat = base + ((level - 1) * bonus_compt)+ apprentissage_bonus;*/

    let resultat = base + ((level - 1) * bonus_compt)
    // ✅ Corrections raciales
    const corrections = {};
    if (Model.race[race]) {
        const raceComp = Model.race[race];
        for (const comp in raceComp) {
            if (comp !== "ajoutpoint") {
                if (!cpts[comp] || cpts[comp] < raceComp[comp]) {
                    corrections[`system.competences.${comp}`] = raceComp[comp];
                    cpts[comp] = raceComp[comp]; // Met à jour la copie pour le calcul
                }
            }
        }
    }

    // Calcul de la pénalité
      for (const competence in cpts) {
        if (Model.multiplicateurs[competence]) {
          const valeur = cpts[competence]; // Récupération de la valeur de la compétence
          const penalite = valeur * Model.multiplicateurs[competence]; // Calcul de la pénalité
          resultat -= penalite; // Soustraction de la pénalité du résultat
        }
      }

    //bonus clan à continuer
    let competences = {};
    if (clan === "ralich") {
      if (this.actor.system.competences.discretion < 10) {
        competences["system.competences.discretion"] = 10;
      }

      if (race === "dragon") {
        competences["system.reste"] = resultat+30;
      } else {
        competences["system.reste"] = resultat+20;
      }
    }else if (clan === "limenido") {
      if (this.actor.system.competences.discretion < 10) {
        competences["system.competences.observation"] = 10;
      }
      competences["system.reste"] = resultat+20;
    }else if (clan === "atlantide") {
      if (this.actor.system.competences.connaissances < 10) {
        competences["system.competences.connaissances"] = 10;
      }
      competences["system.reste"] = resultat+20;
    }
      
      
      return { resultat, corrections, competences };
      // Mise à jour UNE SEULE FOIS après le calcul
      
  }

  onStat() {
    const ability = this.actor.system.ability;

      // Calcul des valeurs
      const physique = ability.force + ability.agilite;
      const social = ability.charisme + ability.sagacite;
      const mental = ability.memoire + ability.astuce;
      const stat = ability.physique + ability.social + ability.mental;
      let reste = 170 - stat;
      let message = "";

      // Vérification de la somme globale
      

      // Vérification individuelle des valeurs
      if (physique !== ability.physique) {
          message = game.i18n.localize("Liber.Labels.Erreur1");
      } 
      if (social !== ability.social) {
          message = game.i18n.localize("Liber.Labels.Erreur2");
      }
      if (mental !== ability.mental) {
          message = game.i18n.localize("Liber.Labels.Erreur3");
      }
      if (stat !== 170) {
          message = game.i18n.localize("Liber.Labels.Erreur4");
      }

      // Suppression du dernier saut de ligne pour éviter un affichage mal formaté
      message = message.trim();

      // Mise à jour des informations de l'acteur
      return {
        message: message.trim(),
        reste: reste
    };
  }

  onEnc(){
    const force =this.actor.system.ability.force;
    const puissance =this.actor.system.competences.endurance
    const race=this.actor.system.race;
    const talent=this.actor.system.talent;
    const faiblesse=this.actor.system.faiblesse;
    const ecu=this.actor.system.ecu;
    let min=35;
    if(race=="centaure"){min=min + 20;}
    if(talent=="mulet"){min=min * 2;}
    if(faiblesse=="faible"){min=min - 10;}
    let max=(force + puissance) /2 + min;
    const items=this.actor.items;
    let enc=0;
    enc=ecu * 0.01;
     // Itération à travers chaque item de l'acteur
    items.forEach(item => {
        const quantity = item.system.quantity; // Récupération de la quantité
        const poids = item.system.poids; // Récupération du poids
        enc+= poids*quantity
    });
    return{enc,max}
  }

  

  /**
     * @param {PointerEvent} event - The originating click event
     * @param {HTMLElement} target - the capturing HTML element which defined a [data-action]
     */
  static async #onUpdate(event, target) {
    // Récupération des informations de l'acteur
    const { metier, race } = this.actor.system;

    // 1️⃣ Réinitialisation de toutes les compétences à 0
    const allCompetences = Object.keys(this.actor.system.competences || {});
    const competencesReset = Object.fromEntries(allCompetences.map(key => [`system.competences.${key}`, 0]));
    // Récupération des données du métier
    const metierData = Model.Metiers[metier];
    if (!metierData) {
        console.warn(`Métier ${metier} non trouvé dans Model.Metiers`);
        return;
    }
    const { hpmax, psymax, ability, competences } = metierData;
    // Génération dynamique des chemins pour les statistiques
    const abilityUpdates = Object.fromEntries(
        Object.entries(ability).map(([key, value]) => [`system.ability.${key}`, value])
    );

    // 3️⃣ Application des bonus raciaux
    let raceBonus = Model.race[race] || {};
    
    let competencesMiseAJour = Object.fromEntries(
        Object.keys({ ...competences, ...raceBonus }).map(key => {
            let metierValue = competences[key] || 0;
            let raceValue = raceBonus[key] || 0;
            return [`system.competences.${key}`, metierValue + raceValue];
        })
    );

    // 4️⃣ Gestion du bonus d'armure
    let armorBonus = raceBonus.armor || 0;
    let updatedArmor = (this.actor.system.armor || 0) + armorBonus;
    let base=25 + raceBonus.ajoutpoint || 25;
    const name=await this.onName();
    const img=await this.onAvatar();
    // Mise à jour des données de l'acteur

    this.actor.update(
        Object.assign(
            { 
              'name':name,
              'img':img,
              'system.hp.value': hpmax,
              'system.hp.max': hpmax,
              'system.psy.value': psymax,
              'system.psy.max': psymax,
              'system.base': base,
              'system.armure': updatedArmor // Met à jour l'armure
            },
            abilityUpdates,
            competencesReset,
            competencesMiseAJour // Applique les compétences mises à jour
        )
    );
  }



     


    //#region Actions

    


    /**
     * @param {PointerEvent} event - The originating click event
     * @param {HTMLElement} target - the capturing HTML element which defined a [data-action]
     */
    static #onItemEdit(event, target) {
        const itemId = target.getAttribute('data-item-id');
        const item = this.actor.items.get(itemId);
        item.sheet.render(true);
    }

    /**
     * @param {PointerEvent} event - The originating click event
     * @param {HTMLElement} target - the capturing HTML element which defined a [data-action]
     */
    static async #onItemDelete(event, target) {
        const itemId = target.getAttribute('data-item-id');
        const item = this.actor.items.get(itemId);
        const type = item.type;
        if (item.system.quantity > 1 && type !='magic') {
            await item.update({ "system.quantity": item.system.quantity - 1 });
        } else {
            item.delete();
        }
    }


    /**
     * @param {PointerEvent} event - The originating click event
     * @param {HTMLElement} target - the capturing HTML element which defined a [data-action]
     */
    static async #onBonusCompt(event, target) {
      const bonus=target.getAttribute('data-val');
      this.actor.update({ "system.bonus": bonus });
    }
    static async #onBonusReset(event, target) {
      const name=target.getAttribute('data-name');
      this.actor.update({ [`system.${name}`]: 0 });
    }

    static async #onLevelUp(event, target) {
      if (!this.actor) return console.error("this.actor est indéfini");

      const name = target.value; // Correction de target.Value → target.value
      //const apprentissage = this.actor.system.apprentissage;
      //let apprenti = this.actor.system.apprenti || []; // S'assurer que c'est bien un tableau

      // Vérifier que le niveau est bien un nombre et que apprentissage a une entrée correspondante
      let level = parseInt(name, 10);
      if (isNaN(level) || level <= 0) {
        return console.error("Niveau invalide ou hors limites :", level);
      }
      //level--;
      // Ajouter l'entrée correcte à apprenti (sous forme d'objet clé-valeur)
     // apprenti.push({ niveau:level, valeur: apprentissage });
      // Mise à jour de l'acteur
      //await this.actor.update({ "system.apprenti": apprenti });
    }

    /**
     * @param {PointerEvent} event - The originating click event
     * @param {HTMLElement} target - the capturing HTML element which defined a [data-action]
     */
    static async #onRoll(event, target) {
    // Récupération des attributs du target
      let ability = target.getAttribute('data-ability'); // Correctement récupéré
      let valuemax = parseInt(target.getAttribute('data-value')) || 0;
      const posture = this.actor.system.posture;
      const fatigue = this.actor.system.fatigue;
      const bonus = parseInt(this.actor.system.bonus) || 0;
      const malus = parseInt(this.actor.system.malus) || 0;
      const traitre = this.actor.system.traitre;
      const emphase = this.actor.system.emphase;
      const fatig = parseInt(this.actor.system.fatig) || 0;
      const enc = parseInt(this.actor.system.enc) || 0;
      const encmax = parseInt(this.actor.system.encmax) || 0;

      /*Arme équipé*/
      let equippedItems =this.actor.items.filter(item => item.system.equip);
  
      /* Magie */
      const type = target.getAttribute('data-type');
      const itemId = target.getAttribute('data-item-id');
      let item, itemname, quantity, psy, pv, insoin,physique, mental, social, description, talent;

      const image = target.getAttribute('data-img');
      let visuel = `systems/liber/assets/actor/${ability}.webp`;
      let label = this.actor.name + game.i18n.localize("Liber.Chat.Roll.faire") + game.i18n.localize("Liber.Chat.Roll." + ability);

      /* Gestion de la magie */
      if (type) {
        item = this.actor.items.get(itemId);
        if (item) {
            psy = parseInt(this.actor.system.psy.value) || 0;
            pv = parseInt(this.actor.system.hp.value) || 0;
            insoin = parseInt(this.actor.system.insoin) || 0;
            mental = parseInt(this.actor.system.ability.mental) || 0;
            social = parseInt(this.actor.system.ability.social) || 0;
            physique = parseInt(this.actor.system.ability.physique) || 0;
            talent = this.actor.system.talent;
            description = item.system.biography;
            quantity = parseInt(item.system.quantity) || 0;
            visuel = item.img;
            itemname = item.name;
        }

        visuel = image || visuel;

        if (type === "corbeau") {
            ability = "physique";
            valuemax = physique;
        } else if (type === "troubadour") {
            ability = "social";
            valuemax = social;
        } else {
            ability = "mental";
            valuemax = mental;
        }
        label = this.actor.name + game.i18n.localize("Liber.Chat.Roll.faire") + " : " + itemname;
      }

      /*ajout bonus*/
      valuemax += bonus + malus;
      let critique = 5;
      let echec = 95;

      if (traitre === "yes") {
          echec -= 5;
      }
      if (emphase === "dephase2") {
          echec -= 10;
      } else if (emphase === "dephase1") {
          echec -= 5;
      } else if (emphase === "emphase1") {
          critique += 5;
      } else if (emphase === "emphase2") {
          critique += 10;
      }

      if (posture === "offensif") {
          critique += 5;
      } else if (posture === "focus") {
          valuemax += 5;
      }

      if (enc > encmax && ability=="physique") {
          let dif = Math.floor(enc - encmax);
          valuemax -= dif;
      }
      if(ability=="physique"){
        valuemax -= fatig * 5;
      }
      

      if (valuemax > echec) {
          valuemax = echec;
      } else if (valuemax < critique) {
          valuemax = critique;
      }

      let succes = "";

    

      // Calcul du jet avec Roll
      const roll = await new Roll("1d100").roll();
      const result = roll.total;

      let info = result + '/' + valuemax;
      if (type) {
        info=`${info}<div class="infos"><span class="title">Info</span><div class="description">${description}</div></div>`;
      }
      // Définir le message en fonction du résultat
      if (result > echec) {
          succes += "<span class='result' style='background:#ff3333;'>" + game.i18n.localize("Liber.Chat.Roll.EchecCrit") + "</span>";
      } else if (result <= critique) {
          succes += "<span class='result' style='background:#7dff33;'>" + game.i18n.localize("Liber.Chat.Roll.ReussiteCrit") + "</span>";
      } else if (result <= valuemax) {
          succes += "<span class='result' style='background:var(--couleur-vert);'>" + game.i18n.localize("Liber.Chat.Roll.Reussite") + "</span>";
      } else {
          succes += "<span class='result' style='background:var(--couleur-rouge);'>" + game.i18n.localize("Liber.Chat.Roll.Echec") + "</span>";
      }

      // Décompte de la psy
      if (type) {
          if (type !== "corbeau") {
              if ((psy + pv) >= quantity) {
                  psy -= quantity;
                  if (psy < 0) {
                      pv += psy;
                      if (talent !== "conversion") {
                          insoin -= psy;
                      }
                      psy = 0;
                  }
              } else {
                  succes = ""
                  info=game.i18n.localize("Liber.Chat.Roll.Ressource")+`<div class="infos"><span class="title">Info</span><div class="description">${description}</div></div>`;
              }
          } else {
              if (pv >= quantity) {
                  pv -= quantity;
              } else {
                  succes = ""
                  info=game.i18n.localize("Liber.Chat.Roll.Ressource")+`<div class="infos"><span class="title">Info</span><div class="description">${description}</div></div>`;
              }
          }
          await this.actor.update({ 'system.hp.value': pv, 'system.insoin': insoin, 'system.psy.value': psy });
      }
      if (type && item.system.degat!=0) {
        succes+= `<button class="roll-damage" data-action="rollDamage" data-itemid="${itemId}" data-actorid="${this.actor._id}">${game.i18n.localize("Liber.Chat.Roll.LancerDegats")}</button>`;
      }

      if (equippedItems && ability == "physique") {

        equippedItems.forEach(item => {
            if (item.system.degat !=="0") {
              succes += `<button class="roll-damage" data-action="rollDamage" data-itemid="${item._id}" data-actorid="${this.actor._id}">
                              ${game.i18n.localize("Liber.Chat.Roll.utiliser")} ${item.name}
                           </button>`;//*<div class="infos"><span class="title">Info</span><div class="description">${description}</div></div>*/
            }

            if (item.system.consommable === "yes") {
              succes += `<button class="use-item" data-action="useItem" data-itemid="${item._id}" data-actorid="${this.actor._id}">
                              ${game.i18n.localize("Liber.Chat.Roll.consommer")} ${item.name}
                           </button>`;
            }
        });
      }

      // Données pour le chat
      let chatData = {
          actingCharName: this.actor.name,
          actingCharImg: this.actor.img,
          actingAbilName: visuel,
          introText: label,
          info: info,
          succes: succes
      };


      // Création du chat avec le template spécifié
      let chat = await new LiberChat(this.actor)
          .withTemplate("systems/liber/templates/chat/roll-resultat.hbs")
          .withContent(ability)
          .withData(chatData)
          .create();

      // Affichage du chat
      await chat.display();

      return { roll, result };
    }


    /**
     * @param {PointerEvent} event - The originating click event
     * @param {HTMLElement} target - the capturing HTML element which defined a [data-action]
     */
    static async #onItemRollDamage(event, target) {
      const itemId = target.getAttribute('data-item-id');
      const actor=this.actor || target.getAttribute('data-actorid');
      const race = actor.system.race;
      const clan = actor.system.clan;
      const item = actor.items.get(itemId);
      if (!item) return; // Sécurité si l'item est introuvable
      const school=item.system.school;
      const doublemain=item.system.doublemain;
      const talent=actor.system.talent;
      let fatig = actor.system.fatig || 0;
      const visuel = item.img;
      const name = item.name;
      const consomable = item.system.consommable;
      let quantity = item.system.quantity; // Récupération correcte de la quantité
      const type = item.type;
      let psy = actor.system.psy.value;
      let pv = actor.system.hp.value;
      let insoin = actor.system.insoin;
      const formula = item.system.degat;
      let equipLocation = item.system.equip;
      let description=item.system.biography;
      let niveau=actor.system.niveau;
      let label = actor.name + game.i18n.localize("Liber.Chat.Roll.utilise") + name;

      if (formula) {
          const roll = await new Roll(formula).roll(); // Lancer le jet
          let result = roll.total; 
          let resultat = result;

          if (doublemain === "yes") {
            const roll2 = await new Roll(formula).roll(); // Lancer le jet
            let result2 = roll2.total;
            label=label+game.i18n.localize("Liber.Chat.Roll.Percucant");
            resultat=result + game.i18n.localize("Liber.Chat.Roll.Or")+result2; 
            if(result<result2){
              resultat=resultat+" : "+result2;
            }else{
              resultat=resultat+" : "+result;
            }
          }
          if (race === "orc" && type === "weapon") {
            result += 2;
          }
          if (clan ==="coalith" && type === "weapon"){
            result += niveau;
          }
          let info="";
          if(description!==""){
            info=`<div class="infos"><span class="title">Info</span><div class="description">${description}</div></div>`;
          }
          let succes =`${info}<span class='result' style='background:var(--couleur-vert);'>${resultat}</span>`;

          let chatData = {
              actingCharName: actor.name,
              actingCharImg: actor.img,
              actingAbilName: visuel,
              introText: label,
              succes: succes
          };

          let chat = await new LiberChat(this.actor)
              .withTemplate("systems/liber/templates/chat/roll-damage.hbs")
              .withContent("rollDamage")
              .withData(chatData)
              .create();

          await chat.display();
          if (doublemain === "yes") {
                fatig += 1;
                await actor.update({ 'system.fatig': fatig });
              }
          // Gestion de la consommation
          if (consomable === "yes" && quantity > 0) {
              quantity--; // Réduction de la quantité
              if (quantity === 0) {
                  equipLocation = ""; // Déséquipé si plus d'unités
              }
              

              await item.update({
                  'system.equip': equipLocation,
                  'system.quantity': quantity
              });

          }
      }
    }

    /**
     * @param {PointerEvent} event - The originating click event
     * @param {HTMLElement} target - the capturing HTML element which defined a [data-action]
     */
    static async #onPosture(event, target) {
      const posture=target.getAttribute('data-posture');
      const introText= game.i18n.localize("Liber.Chat.Posture.Change")+ game.i18n.localize(`Liber.Chat.Posture.${posture}`);
      const text= game.i18n.localize(`Liber.Chat.Posture.${posture}-text`)

      let chatData = {
        actingCharName: this.actor.name,
        actingCharImg: this.actor.img,
        introText,
        text
      }
      //tchat
      let chat = await new LiberChat(this.actor)
      .withTemplate("systems/liber/templates/chat/posture.hbs")
      .withContent(posture)
      .withData(chatData)
      .create();
      await chat.display();
      this.actor.update({ "system.posture": posture });
    }


    /**
     * @param {PointerEvent} event - The originating click event
     * @param {HTMLElement} target - the capturing HTML element which defined a [data-action]
     */
    static #onStory(event, target) {

      function getRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }
        
      const hero = getRandom(Model.hero);
      const mentor = getRandom(Model.mentor);
      const enemy = getRandom(Model.enemy);
      const reward = getRandom(Model.reward);
      const actionPreparatrice = getRandom(Model.actionPreparatrice);
      const actionReponse = getRandom(Model.actionReponse);
        
      const story = `${game.i18n.localize(actionPreparatrice)} ${game.i18n.localize("Liber.Character.Histoire.Partie.partie1")} 
      ${game.i18n.localize(mentor)} 
      ${game.i18n.localize("Liber.Character.Histoire.Partie.partie2")} ${game.i18n.localize(actionReponse)} 
      ${game.i18n.localize("Liber.Character.Histoire.Partie.partie3")} ${game.i18n.localize(enemy)} 
      ${game.i18n.localize("Liber.Character.Histoire.Partie.partie4")} ${game.i18n.localize(reward)} 
      ${game.i18n.localize("Liber.Character.Histoire.Partie.partie5")} ${game.i18n.localize(hero)} 
      ${game.i18n.localize("Liber.Character.Histoire.Partie.partie6")}`;
      this.actor.update({ 'system.biography': story });

    }

    static #onCarac(event, target) {
      const elements = {
        
      };

      function getRandom(arr) {
          return arr[Math.floor(Math.random() * arr.length)];
      }

      const interet =game.i18n.localize( getRandom(Model.interets));
      const deces =game.i18n.localize( getRandom(Model.deces));
      const amour =game.i18n.localize( getRandom(Model.amour));
      const amitie =game.i18n.localize( getRandom(Model.amitie));
      const haine =game.i18n.localize( getRandom(Model.haine));
      const principale =game.i18n.localize( getRandom(Model.amitie));
      const passion =game.i18n.localize( getRandom(Model.passion));
      const personnalite =game.i18n.localize( getRandom(Model.personnalite));
      const perception =game.i18n.localize( getRandom(Model.perception));
      const rancunier =game.i18n.localize( getRandom(Model.rancunier));
      const tare =game.i18n.localize( getRandom(Model.tare));
      const distingue =game.i18n.localize( getRandom(Model.distingue));
      this.actor.update({
        'system.caractere.interets': interet,
        'system.caractere.deces': deces,
        'system.caractere.amour': amour,
        'system.caractere.amitie': amitie,
        'system.caractere.haine': haine,
        'system.caractere.principale': principale,
        'system.caractere.passion': passion,
        'system.caractere.personnalite': personnalite,
        'system.caractere.perception': perception,
        'system.caractere.rancunier': rancunier,
        'system.caractere.tare': tare,
        'system.caractere.distingue': distingue
      });
    }

    onCalcul(event,target){//v3 tenir compte du métier dans le calcul
      const actor=this.actor.system;
      const talent=actor.talent;
      const faiblesse=actor.faiblesse;
      const clan=actor.clan;
      const culte=actor.culte;
      const niveau=actor.niveau;
      const insoin = actor.insoin;
      const race = actor.race;
      const metier = actor.metier;
      let message;
      let pvEncours=actor.hp.value ?? 0;
      let psyEncours=actor.psy.value ?? 0;
      let pvMax=actor.hp.max ?? 0;
      let psyMax=actor.psy.max ?? 0;
      let hpalert; let psyalert;
      let pvMin=0;let psyMin =0; let nbSort = 0; let maxSort=0;
      if(metier=="personnalise"){  
        //calcul niveau 1 des éléments
        pvMin = Math.round(actor.ability.physique / 3);
        psyMin = Math.round(actor.ability.mental/ (actor.ability.physique/10));
        nbSort = Math.round(actor.ability.social/10);


        //calcul cout max tous niveaux
        maxSort = Math.round(psyMin/ 4) + niveau -1;
        if(maxSort<0){maxSort=0}
        if(clan=="corbeau"){maxSort=niveau}
      }else {
        let nameMetier = Model.Metiers[metier];
        pvMin = nameMetier.hpmax;
        psyMin = nameMetier.psymax;
        nbSort = nameMetier.nb + niveau -1;
        maxSort = nameMetier.cout + niveau -1;
      }
      

      //verification des minimuns
      if(talent=="memoirearcanique"){nbSort=nbSort+1;}
      if(talent=="aura"){psyMin=psyMin+2*(niveau);}
      if(talent=="vigoureux"){pvMin=pvMin+2*(niveau)}
      if(pvMax<pvMin){pvMax=pvMin}
      if(psyMax<psyMin){psyMax=psyMin}
      if(niveau==1){
        if(pvMax>pvMin){pvMax=pvMin}
        if(psyMax>psyMin){psyMax=psyMin}
      }
      if(metier=="guerrier" && niveau==1){psyMax=psyMin}
      if(race=="etredepsy"){pvMax=0;psyMin=0;}
      if(race=="rocailleux"){pvMin=psyMin+pvMin;psyMin=0;psyMax=0;psyEncours=0;}
      

      //calcul des points de niveaux
      let pointxp = (niveau - 1) * 3;
      const xp = pointxp + pvMin + psyMin;
      const calcultotxp = pvMax + psyMax;

      //vérifiaction si pv ou psy supérieur au max
      if(pvEncours>pvMax){pvEncours=pvMax;}
      if(psyEncours>psyMax){psyEncours=psyMax;}


      // Insoignable      
      const hpinsoin=pvEncours + insoin
      if (hpinsoin > pvMax) {
          pvEncours = pvMax - insoin;
      }
      
      if(calcultotxp>xp){
        message=game.i18n.localize("Liber.Alert.Ability");
        hpalert="var(--couleur-rouge)";
        psyalert="var(--couleur-rouge)";
      }else if(calcultotxp<xp){
        hpalert="var(--couleur-vert)";
        psyalert="var(--couleur-vert)";
      }

      
      //vérification des talents et faiblesse
      return {
        hp: {
          value: pvEncours,
          max: pvMax
        },
        psy: {
          value: psyEncours,
          max: psyMax
        },
        message: message,
        nbSort: nbSort,
        cout: maxSort,
        hpalert: hpalert,
        psyalert: psyalert
      };

    }

    static async #onSleep(event, target){
        let { talent, faiblesse, time, duree, repos, niveau, insoin, fatig, ronfleur } = this.actor.system;
        let psy = this.actor.system.psy.value;
        let psymax = this.actor.system.psy.max;
        let hp = this.actor.system.hp.value;
        let hpmax = this.actor.system.hp.max;
        let d = 0, hpadd = 0, psyadd = 0, j = 0, fatadd = 0; 
        if (duree == "day") {
          time = time * 24;
          j = Math.floor(time / 3);
        }
        switch (repos) {
          case "fast":
            d = Math.round(Math.random() * 4);
            hpadd = ((d + niveau) * time) / 8;
            psyadd = Math.floor((niveau * time) / 2);
            break;

          case "quiet":
            d = Math.round(Math.random() * 6);
            hpadd = ((d + niveau) * time) / 8;
            psyadd = Math.floor(niveau * time);
            fatadd = Math.floor(1 * time);
            break;

          case "good":
            d = Math.round(Math.random() * 6);
            insoin = 0;
            hpadd = (d + niveau) * time;
            psyadd = Math.floor(niveau * time);
            fatadd = Math.floor(2 * time);
            break;

          case "intens":
            d = Math.round(Math.random() * 8);
            insoin = 0;
            hpadd = ((2 * d) + niveau) * time;
            psyadd = Math.floor(niveau * time);
            fatadd = Math.floor(3 * time);
            break;

          default:
            break;
        }
        if (talent === "bondormeur") {
          hpadd = parseInt(hpadd) * 2;
          psyadd = parseInt(psyadd) * 2;
        }
        if (faiblesse === "insomniaque") {
          hpadd = parseInt(hpadd) / 2;
          psyadd = parseInt(psyadd) / 2;
        }

        hpadd = Math.min(hpadd, parseInt(hpmax) - parseInt(hp));
        hp = parseInt(hpadd) + parseInt(hp);
        fatig=parseInt(fatig)-fatadd
        if (hp > hpmax) {hp = hpmax;}

        psyadd = Math.min(psyadd, parseInt(psymax) - parseInt(psy));
        psy = parseInt(psy) + parseInt(psyadd);

        if (psy > psymax) {psy = psymax;}
        if (fatig < 0) {fatig = 0;}

        if (hp >= hpmax && insoin > 0) {
          hp = parseInt(hpmax) - parseInt(insoin);
          hpadd = parseInt(hpadd) - parseInt(insoin);
        }
        const introText= game.i18n.localize('Liber.Chat.Sleep.sleep');
        let text=game.i18n.localize('Liber.Chat.Sleep.ronfleur');
        if(ronfleur=="no"){
          text=game.i18n.localize('Liber.Chat.Sleep.recuperation');
        }
        let chatData = {
          actingCharName: this.actor.name,
          actingCharImg: this.actor.img,
          introText,
          text
        }
        //tchat
        let chat = await new LiberChat(this.actor)
        .withTemplate("systems/liber/templates/chat/posture.hbs")
        .withContent("sleep")
        .withData(chatData)
        .create();
        await chat.display();
        if(ronfleur=="no"){
          this.actor.update({ "system.insoin": insoin, "system.hp.value": hp, "system.psy.value": psy, "system.fatig": fatig });
        }
    }

    static async #onSort(event, target){
      const race=this.actor.system.race;
      const culte=this.actor.system.culte;
      const clan=this.actor.system.clan;
      const cout=this.actor.system.cout;

    }

    async onName() {
      const race= this.actor.system.race;
      const sex= this.actor.system.sex;
      let nameList = Model.names[race];
      let name = "";
      // Vérifier si la race a des noms spécifiques pour les sexes ou si les noms sont neutres
      if (nameList.hasOwnProperty('female') && nameList.hasOwnProperty('male')) {
        // Sélectionner un nom au hasard pour le sexe approprié
      if(sex=="Autre"){sex='male';}
        name = nameList[sex][Math.floor(Math.random() * nameList[sex].length)];
      } 
      if (nameList.hasOwnProperty('famille')){
        // Sélectionner un nom au hasard pour le sexe approprié
        name =nameList['famille'][Math.floor(Math.random() * nameList['famille'].length)]+" "+name;
      } else {
        // Sélectionner un nom au hasard dans la liste neutre
        if(race=="dragon"){
          name = nameList[Math.floor(Math.random() * nameList.length)]+nameList[Math.floor(Math.random() * nameList.length)];
          name = name.charAt(0).toUpperCase() + name.slice(1);
        }else {
          name = nameList[Math.floor(Math.random() * nameList.length)];
        }
        
      }
      return name;
    }

    async onAvatar() {
      const { race, sex } = this.actor.system;
      if(race=="autre"){
        return "icons/svg/mystery-man.svg";
      }
      const basePath = `systems/liber/assets/avatar/` + (race +'/' || 'default/');
      const genderPath = (sex === 'female') ? 'femmes/' : 'hommes/';
      const fullPath = basePath + genderPath;
      try {
          const avatarUrl = fullPath + 'avatar'+ [Math.floor(Math.random() * 10 )+1] +'.jpg';
          return avatarUrl;
      } catch (error) {
          console.error('Erreur lors du chargement des avatars :', error);
      }

      // Retourne une image par défaut si aucune image trouvée
      const defaultAvatar = this.baseUrl + 'default/avatar1.jpg';
      return defaultAvatar;
    }

    static async #onFiltre(event,target){
      const types=target.getAttribute('data-type');
      this.actor.update({'system.inventory':types})
    }

     static async #onRandom(event, target) {
    let type = event.target.dataset["type"];
    if (!type) return;

    const pack = game.packs.get('liber.inventaire');
    if (!pack) {
        console.error("Le pack 'liber.inventaire' est introuvable.");
        return;
    }

    const tables = await pack.getDocuments();
    const filteredItems = tables.filter(t => t.type === type);



    if (filteredItems.length === 0) {
        console.warn(`Aucun objet trouvé pour le type : ${type}`);
        return;
    }

    let itemsToAdd = [];

    if (type === "armor" || type === "weapon") {
        const randomItem = filteredItems[Math.floor(Math.random() * filteredItems.length)].toObject();
        randomItem.system.quantity = 1;
        delete randomItem._id;
        itemsToAdd.push(randomItem);
    } else {
        const itemCount = Math.floor(Math.random() * 10) + 1;
        for (let i = 0; i < itemCount; i++) {
            const randomItem = filteredItems[Math.floor(Math.random() * filteredItems.length)].toObject();
            randomItem.system.quantity = Math.floor(Math.random() * 10) + 1;
            delete randomItem._id;
            itemsToAdd.push(randomItem);
        }
    }

    if (!this.actor) {
        console.error("Aucun acteur sélectionné pour ajouter les objets.");
        return;
    }

    try {
        await this.actor.createEmbeddedDocuments('Item', itemsToAdd, { renderSheet: false });
        ui.notifications.info(`${itemsToAdd.length} objet(s) ajouté(s) à ${this.actor.name} !`);
    } catch (error) {
        console.error("Erreur lors de l'ajout des objets :", error);
    }
  }



    static async #onItemEquip(event, target) {
      const itemId = target.getAttribute('data-item-id');
      const equipLocation = target.getAttribute('data-ou');

      if(equipLocation=="middle"){
        const protection=target.getAttribute('data-protection');
        let armor=this.actor.system.armure;
        armor=armor + protection;
        await this.actor.update({'system.armure':armor});
      }
      
      // Récupération de l'item
      const item = this.actor.items.get(itemId);
      await item.update({'system.equip':equipLocation})
    }
    static async #onItemDesequip(event, target) {  
      // Récupération de l'item
      const itemId = target.getAttribute('data-item-id');
      const item = this.actor.items.get(itemId);
      const equipLocation = target.getAttribute('data-ou');
      if(equipLocation=="middle"){
        const protection=target.getAttribute('data-protection');
        let armor=this.actor.system.armure;
        armor=armor - protection;
        await this.actor.update({'system.armure':armor});
      }
      await item.update({'system.equip':""})
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





    /**
     * @param {PointerEvent} event - The originating click event
     * @param {HTMLElement} target - the capturing HTML element which defined a [data-action]
     */
    static async #onItemRollSave(event, target) {
        const ability = target.getAttribute('data-ability');
        const roll = await this.actor.rollSave(ability);
    }

    

    /**
     * @param {PointerEvent} event - The originating click event
     * @param {HTMLElement} target - the capturing HTML element which defined a [data-action]
     */
    static async #onShortRest(event, target) {
        await this.actor.system.shortRest();
    }

    /**
     * @param {PointerEvent} event - The originating click event
     * @param {HTMLElement} target - the capturing HTML element which defined a [data-action]
     */
    static async #onFullRest(event, target) {
        await this.actor.system.fullRest();
    }

    

    static async #onItemUnequip(event, target) {
        const itemId = target.getAttribute('data-item-id');
        const item = this.actor.items.get(itemId);
        await item.update({ "system.equipped": false });
    }

    static async #onItemDescription(event, target) {
        const itemId = target.getAttribute('data-item-id');
        const item = this.actor.items.get(itemId);
        const actor=this.actor;
        const visuel=item.img;
        const description=item.system.biography;
        const label=item.name;
        let chatData = {
          actingCharName: actor.name,
          actingCharImg: actor.img,
          actingAbilName: visuel,
          info:"Info",
          introText: label,
          succes:description
        };

        let chat = await new LiberChat(this.actor)
          .withTemplate("systems/liber/templates/chat/roll-resultat.hbs")
          .withContent("itemDescription")
          .withData(chatData)
          .create();

        await chat.display();
    }

    static async #onAddSort(event, target){
      const id=this.actor._id;
      //LiberCharacterSheet-Actor-
      const select = document.querySelector(`#LiberCharacterSheet-Actor-${id} select[name="system.magie"]`);
      if (!select) return console.error("Le champ select[name='system.magie'] est introuvable.");

      const selectedOption = select.options[select.selectedIndex]; // Récupère l'option sélectionnée
      const dataId = selectedOption.value; // Récupère la valeur de l'option (correspond à l'ID du sort)

      if (!dataId) return console.error("Aucun sort sélectionné.");

      // Recherche dans le compendium "liber.magie"
      const pack = game.packs.get("liber.magie");
      if (!pack) return console.error("Le compendium 'liber.magie' est introuvable.");

      const index = await pack.getIndex(); // Charge l'index des objets du compendium
      const entry = index.find(i => i._id === dataId); // Trouve l'entrée correspondante

      if (!entry) return console.error(`Sort avec l'ID ${dataId} non trouvé dans le compendium.`);

      // Récupère l'objet complet depuis le compendium
      const spell = await pack.getDocument(entry._id);

      if (!spell) return console.error(`Impossible de récupérer le sort ${dataId}.`);

      // Ajoute le sort à l'acteur
      this.actor.createEmbeddedDocuments("Item", [spell.toObject()]);
    }

    /**
     * Handle changing a Document's image.
     *
     * @this BoilerplateActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @returns {Promise}
     * @private
     */
    
  onStatut() {
    const actor = this.actor;
    const etatsActifs = actor.effects.map(e => e.name);
    const updateData = {};

    // Met à jour l'opacité des icônes dans la fiche
    document.querySelectorAll('.chnget').forEach(icon => {
        const etat = icon.dataset.etat;
        const actif = etatsActifs.includes(etat);
        icon.style.opacity = actif ? "1" : "0.5";

        // Prépare la mise à jour de system.etat
        updateData[`system.etat.${etat}`] = actif ? 1 : 0.5;
    });
    
  }

}


