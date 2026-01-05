const ActorSheetV2 = foundry.applications.sheets.ActorSheetV2;
const { HandlebarsApplicationMixin } = foundry.applications.api;
import LiberChat from "../document/chat.js";

/** Gestion de la feuille de personnage */

export default class LiberMonsterSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["liber", "actor", "character"],
    position: { width: 685, height: 890 },
    form: { submitOnChange: true },
    window: { resizable: true },
    dragDrop: [{ dragSelector: '[data-drag]', dropSelector: '.inventory-list' }], // Remplacer '.inventory-list' par votre sélecteur    tabGroups: { sheet: "inventory" },
    actions: {
      editImage: LiberMonsterSheet.#onEditImage,
      edit: LiberMonsterSheet.#onItemEdit,
      delete: LiberMonsterSheet.#onItemDelete,
      posture:LiberMonsterSheet.#onPosture,
      restbonus:LiberMonsterSheet.#onBonusReset,
      levelup:LiberMonsterSheet.#onLevelUp,
      roll:LiberMonsterSheet.#onRoll,
      random:LiberMonsterSheet.#onRandom,
      sleep:LiberMonsterSheet.#onSleep,
      filtre:LiberMonsterSheet.#onFiltre,
      equip: LiberMonsterSheet.#onItemEquip,
      desequip: LiberMonsterSheet.#onItemDesequip,
      rollDamage: LiberMonsterSheet.#onItemRollDamage,
      description: LiberMonsterSheet.#onItemDescription
    }
  };


  /** @override */
  static PARTS = {
    tabs: { template: "systems/liber-chronicles/templates/actors/character-navigation.hbs" },
    header: { template: "systems/liber-chronicles/templates/actors/character-header.hbs" },
    biography: { template: "systems/liber-chronicles/templates/actors/character-biography.hbs" },
    inventory: { template: "systems/liber-chronicles/templates/actors/character-inventory.hbs" }
  };


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

  /** Préparation des données */
  /** Préparation des données */
  async _prepareContext() {
    const { system } = this.document;
    const { inventory: filter, race, clan, culte, metier, cout = 0 } = system;

    // === ORGANISATION DES ITEMS ===
    const itemsData = this.#organizeItems(filter);
    

    return {
      tabs: this.#getTabs(),
      fields: this.document.schema.fields,
      systemFields: system.schema.fields,
      actor: this.document,
      system,
      inventory: itemsData.equipment,
      magic:itemsData.magic,
      source: this.document.toObject()
    };
  }

  #organizeItems(filter) {
    const itemsData = {
      magic: [],
      equipment: {
        gauche: [],
        droite: [],
        middle: [],
        inventory: []
      }
    };

    for (const item of this.document.items) {
      if (item.type === "magic") {
        itemsData.magic.push(item);
        //trier par system.quantity
      } else {
        const matchesFilter = filter === "all" || filter.includes(item.type);
        if (!matchesFilter) continue;
        //trier par name
        const equipLocation = item.system?.equip;
        if (["gauche", "droite", "middle"].includes(equipLocation)) {
          itemsData.equipment[equipLocation].push(item);
        } 
        itemsData.equipment.inventory.push(item);
        
      }
    }
    // Magie : par coût (quantity)
    itemsData.magic.sort(
      (a, b) => (a.system?.quantity ?? 0) - (b.system?.quantity ?? 0)
    );
      // Item : par nom
    itemsData.equipment.inventory.sort((a, b) =>
      a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })
    );
    return itemsData
  }



  async _preparePartContext(partId, context) {
    return context;
  }

  _onRender(context, options) {
      super._onRender(context, options);  // Appelez la méthode parente si nécessaire
      console.log(context);

      // Ajoutez un listener pour vérifier si le drag-and-drop fonctionne
      this.element.querySelectorAll('[data-drag]').forEach(item => {
          item.addEventListener('dragstart', () => {
            console.log('Item is being dragged');
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
        if (pourcentage < 50) {
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

        this.onInsoin();
        this.onEncom();
  }
  
  /*conserver le dernier onglet ouvert*/
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
  }

  onInsoin(){
    const insoin=this.actor.system.insoin;
    const pvMax=this.actor.system.hpmax;
    let pv=this.actor.system.hp;
    if(insoin>0){
      let total=pv + insoin;
      if(total > pvMax){
        pv = pvMax - insoin;
        this.actor.update({'system.hp':pv})
      }
    }else{
      return
    }
  }

  onEncom(){
    const taille=this.actor.system.taille;
    const force=this.actor.system.ability.force;
    const ecu=this.actor.system.ecu;
    const items=this.actor.items;
    let encMax=0;
    if(taille=="mini"){
      encMax=0;
    } else if(taille=="petit"){
      encMax=10;
    }else if(taille=="moyen"){
      encMax=10 + force;
    }else if(taille=="grand"){
      encMax=30 + (force*2);
    }else if(taille=="geant"){
      encMax=100 + (force*20);
    }
    let enc=0;
    enc=ecu * 0.01;
    items.forEach(item => {
        const quantity = item.system.quantity; // Récupération de la quantité
        const poids = item.system.poids; // Récupération du poids
        enc+= poids*quantity
    });
    this.actor.update({"system.enc":enc,"system.encmax":encMax});
  }


  /** Gestion des événements au rendu */
  /** @override */
  async _onDrop(event) {
    event.preventDefault();

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
      const activeTab = this._tabs[0]?.active;
      // Ajouter l'objet normalement
      await super._onDropItem(event, itemData);

      // Rafraîchir sans perdre l'onglet actif
      this.render(false, { activeTab });
  }

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


     static async #onBonusReset(event, target) {
      const name=target.getAttribute('data-name');
      this.actor.update({ [`system.${name}`]: 0 });
    }

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
      let visuel = `systems/liber-chronicles/assets/actor/${ability}.webp`;
      let label = this.actor.name + game.i18n.localize("Liber.Chat.Roll.faire") + game.i18n.localize("Liber.Chat.Roll." + ability);

      /* Gestion de la magie */
      if (type) {
        item = this.actor.items.get(itemId);
        if (item) {
            psy = parseInt(this.actor.system.psy) || 0;
            pv = parseInt(this.actor.system.hp) || 0;
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
          succes += "<h4 class='result' style='background:#7dff33;'>" + game.i18n.localize("Liber.Chat.Roll.ReussiteCrit") + "</h4>";
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
          await this.actor.update({ 'system.hp': pv, 'system.insoin': insoin, 'system.psy': psy });
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
          .withTemplate("systems/liber-chronicles/templates/chat/roll-resultat.hbs")
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
      let psy = actor.system.psy;
      let pv = actor.system.hp;
      let insoin = actor.system.insoin;
      const formula = item.system.degat;
      let equipLocation = item.system.equip;
      let description=item.system.biography;
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
              result += 4;
          }
          let info="";
          if(description!==""){
            info=`<div class="infos"><span class="title">Info</span><div class="description">${description}</div></div>`;
          }
          let succes =`${info}<span class='result' style='background:var(--couleur-vert);'>${resultat}</span>`
          


          

          let chatData = {
              actingCharName: actor.name,
              actingCharImg: actor.img,
              actingAbilName: visuel,
              introText: label,
              succes: succes
          };

          let chat = await new LiberChat(this.actor)
              .withTemplate("systems/liber-chronicles/templates/chat/roll-resultat.hbs")
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
      .withTemplate("systems/liber-chronicles/templates/chat/posture.hbs")
      .withContent(posture)
      .withData(chatData)
      .create();
      await chat.display();
      this.actor.update({ "system.posture": posture });
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

    static async #onItemUnequip(event, target) {
        const itemId = target.getAttribute('data-item-id');
        const item = this.actor.items.get(itemId);
        await item.update({ "system.equipped": false });
    }

    static async #onSleep(event, target){
        let { talent, time, duree, repos, niveau, psy, psymax, hp, hpmax, insoin, fatig, ronfleur } = this.actor.system;
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
            if (talent === "bondormeur") {
              hpadd = parseInt(hpadd) + 6;
              psyadd = parseInt(psyadd) + 3;
              fatadd = parseInt(fatadd) + 1;
            }
            break;

          case "good":
            d = Math.round(Math.random() * 6);
            insoin = 0;
            hpadd = (d + niveau) * time;
            psyadd = Math.floor(niveau * time);
            fatadd = Math.floor(2 * time);
            if (talent === "bondormeur") {
              hpadd = parseInt(hpadd) + 6;
              psyadd = parseInt(psyadd) + 3;
              fatadd = parseInt(fatadd) + 1;

            }
            break;

          case "intens":
            d = Math.round(Math.random() * 8);
            insoin = 0;
            hpadd = ((2 * d) + niveau) * time;
            psyadd = Math.floor(niveau * time);
            fatadd = Math.floor(3 * time);
            if (talent === "bondormeur") {
              hpadd = parseInt(hpadd) + 6;
              psyadd = parseInt(psyadd) + 3;
              fatadd = parseInt(fatadd) + 1;
            }
            break;

          default:
            break;
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
        .withTemplate("systems/liber-chronicles/templates/chat/posture.hbs")
        .withContent("sleep")
        .withData(chatData)
        .create();
        await chat.display();
        if(ronfleur=="no"){
          this.actor.update({ "system.insoin": insoin, "system.hp": hp, "system.psy": psy, "system.fatig": fatig });
        }
    }

    static async #onFiltre(event,target){
      const types=target.getAttribute('data-type');
      this.actor.update({'system.inventory':types})
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
          introText: label,
          succes:description
        };

        let chat = await new LiberChat(this.actor)
          .withTemplate("systems/liber-chronicles/templates/chat/roll-resultat.hbs")
          .withContent("itemDescription")
          .withData(chatData)
          .create();

        await chat.display();
    }

    static async #onLevelUp(event,target){
      let niveau=this.actor.system.niveau
      const items = this.actor.items.filter(item => item.type === "weapon"); // Filtrage des items de type 'weapon'
      let hp=this.actor.system.hp.max; console.log(hp)
      let psy=this.actor.system.psy.max;
      hp=hp + 12;console.log(hp)
      psy=psy + 12;
      niveau++;
      for (const item of items) {
        const dgt = item.system.degat; // Récupération des dégâts
        if (!dgt || dgt === "0") {
            await item.update({ 'system.degat': "0" }); // Mise à jour correcte
            continue; // Passe au prochain item
        }

        let [fixe, number] = dgt.split('+');
        let [nb, type] = fixe.split('d').map(Number);
        number = number ? Number(number) : 0;

        const limite = 4;

        if (number < limite) {
            number++;
        } else {
            number = 3;
            if (nb < limite) {
                nb++;
            } else {
                nb = 3;
                switch (type) {
                    case 4: type = 6; break;
                    case 6: type = 8; break;
                    case 8: type = 10; break;
                    case 10: type = 12; break;
                    case 12: type = 20; break;
                    case 20: type = 100; break;
                    case 100:
                        if (nb < limite) nb++;
                        break;
                }
            }
        }

        const newDgt = `${nb}d${type}+${number}`;

        await item.update({ 'system.degat': newDgt }); // Mise à jour correcte des dégâts
      }
      console.log(hp,psy)
      this.actor.update({'system.niveau':niveau,'system.hp.value':hp,'system.hp.max':hp,'system.psy.value':psy,'system.psy.max':psy})
    }

    static async #onRandom(event,target){
      let type = event.target.dataset["type"];
      if (!type) {
          return;
      }

      const pack = game.packs.get('liber-chronicles.inventaire');
      if (!pack) {
          console.error("Le pack 'liber-chronicles.inventaire' est introuvable.");
          return;
      }

      const tables = await pack.getDocuments();
      const filteredItems = tables.filter(t => t.type === type);

      if (filteredItems.length === 0) {
          console.warn(`Aucun objet trouvé pour le type : ${type}`);
          return;
      }

      let itemsToAdd = new Set(); // Utilisation d'un Set pour éviter les doublons

      if (type === "armor" || type === "weapon") {
          // Sélection d'un seul objet pour armor/weapon
          itemsToAdd.add(filteredItems[Math.floor(Math.random() * filteredItems.length)]);
      } else {
          // Sélection de 1 à 10 objets pour les autres types
          let itemCount = Math.floor(Math.random() * 10) + 1;
          while (itemsToAdd.size < itemCount) {
              itemsToAdd.add(filteredItems[Math.floor(Math.random() * filteredItems.length)]);
          }
      }

      const itemsArray = Array.from(itemsToAdd);

      if (!this.actor) {
          console.error("Aucun acteur sélectionné pour ajouter les objets.");
          return;
      }

      try {
          await this.actor.createEmbeddedDocuments('Item', itemsArray, { renderSheet: false });
      } catch (error) {
          console.error("Erreur lors de l'ajout des objets :", error);
      }
    }
}


