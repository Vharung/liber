//import les différentes classes
import {liber} from "./data/config.js";
import LiberCharacterSheet from "./sheet/actor.js";
import LiberMonsterSheet from "./sheet/monster.js";
import LiberCharacterData from "./data/actor.js";
import LiberItemData from "./data/item.js";
import LiberItemSheet from "./sheet/item.js";
import LiberMagicSheet from "./sheet/magic.js";
import LiberWeaponSheet from "./sheet/weapon.js";
import LiberArmorSheet from "./sheet/armor.js";
import LiberChat from "./document/chat.js";
import { Macros } from "./macro.js";

const ActorSheetV2 = foundry.applications.sheets.ActorSheetV2;
const ItemSheetV2  = foundry.applications.sheets.ItemSheetV2;

/** Initialisation du système */
Hooks.once("init", async function () {
  console.log("Initialisation du système Liber...");
  console.log(liber.ASCII);

  // ----------------------------------------------------------------
  // DataModels — remplace template.json
  // Les types sont désormais déclarés dans system.json > documentTypes
  // ----------------------------------------------------------------
  CONFIG.Actor.dataModels = {
    character: LiberCharacterData,
    pnj:       LiberCharacterData,
    monstre:   LiberCharacterData
  };

  CONFIG.Item.dataModels = {
    item:   LiberItemData,
    armor:  LiberItemData,
    weapon: LiberItemData,
    magic:  LiberItemData
  };

  // ----------------------------------------------------------------
  // Token resources — remplace primaryTokenAttribute / secondaryTokenAttribute
  // de system.json (incompatibles avec les DataModels)
  // hp et psy sont des SchemaField { value, max } → bar attributes
  // ----------------------------------------------------------------
  CONFIG.Actor.trackableAttributes = {
    character: {
      bar:   ["hp", "psy"],
      value: ["niveau", "armure", "fatig"]
    },
    pnj: {
      bar:   ["hp", "psy"],
      value: ["niveau", "armure", "fatig"]
    },
    monstre: {
      bar:   ["hp", "psy"],
      value: ["niveau", "armure", "fatig"]
    }
  };

  // ----------------------------------------------------------------
  // Initiative
  // ----------------------------------------------------------------
  CONFIG.Combat.initiative = {
    formula:  "1d6",
    decimals: 1
  };

  // ----------------------------------------------------------------
  // Feuilles — Acteurs
  // ----------------------------------------------------------------
  foundry.documents.collections.Actors.unregisterSheet("core", ActorSheetV2);
  foundry.documents.collections.Actors.registerSheet("liber", LiberCharacterSheet, {
    types: ["character", "pnj"],
    makeDefault: true
  });
  foundry.documents.collections.Actors.registerSheet("liber", LiberMonsterSheet, {
    types: ["monstre"],
    makeDefault: true
  });

  // ----------------------------------------------------------------
  // Feuilles — Items
  // ----------------------------------------------------------------
  foundry.documents.collections.Items.unregisterSheet("core", ItemSheetV2);
  foundry.documents.collections.Items.registerSheet("liber", LiberItemSheet, {
    types: ["item"],
    makeDefault: true
  });
  foundry.documents.collections.Items.registerSheet("liber", LiberArmorSheet, {
    types: ["armor"],
    makeDefault: true
  });
  foundry.documents.collections.Items.registerSheet("liber", LiberWeaponSheet, {
    types: ["weapon"],
    makeDefault: true
  });
  foundry.documents.collections.Items.registerSheet("liber", LiberMagicSheet, {
    types: ["magic"],
    makeDefault: true
  });
});

// ----------------------------------------------------------------
// Helpers Handlebars
// ----------------------------------------------------------------
Handlebars.registerHelper("capitalizeFirstLetter", function (str) {
  if (typeof str === "string" && str.length > 0) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
});

Handlebars.registerHelper("stripTags", function (text) {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
});

// ----------------------------------------------------------------
// Jet de dés depuis le chat
// ----------------------------------------------------------------
Hooks.once("ready", () => {
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const { action, itemid: itemId, actorid: actorId } = button.dataset;
    if (!action || !actorId) return;

    const actor = game.actors.get(actorId);
    if (!actor) return;

    // ── useItem ne nécessite pas forcément un item valide au sens strict
    const item = actor.items.get(itemId);

    switch (action) {

      // ── Jet de dégâts ────────────────────────────────────────────
      case "rollDamage": {
        if (!item) return ui.notifications.warn("Item introuvable.");

        const { degat, doublemain, biography } = item.system;
        if (!degat || !Roll.validate(degat)) {
          return ui.notifications.error(`Formule de dégâts invalide : ${degat}`);
        }

        const { race, clan, niveau, fatig = 0 } = actor.system;

        // Jet principal
        let result1  = await new Roll(degat).roll();
        let resultat = result1.total;
        let affichage = String(resultat);
        let label = `${actor.name} ${game.i18n.localize("Liber.Chat.Roll.Degat") || "Jet de Dégâts"}`;

        // Double main
        if (doublemain === "yes") {
          const result2 = await new Roll(degat).roll();
          resultat  = Math.max(result1.total, result2.total);
          affichage = `${result1.total} / ${result2.total}`;
          label    += ` ${game.i18n.localize("Liber.Chat.Roll.Percucant") || "(Percutant)"}`;
          await actor.update({ "system.fatig": fatig + 1 });
        }

        // Bonus race / clan
        if (race === "orc"     && item.type === "weapon") resultat += 2;
        if (clan === "coalith" && item.type === "weapon") resultat += niveau;
        affichage = String(resultat);

        // ── Cible désignée ──────────────────────────────────────────
        const targets = game.user.targets;
        let targetInfo = "";

        if (targets.size > 0) {
          const targetActor = targets.first().actor;
          if (targetActor) {
            const armure    = Number(targetActor.system.armure)   || 0;
            const hpActuel  = Number(targetActor.system.hp.value) || 0;
            const degatsNet = Math.max(0, resultat - armure);
            const hpNouveau = Math.max(0, hpActuel - degatsNet);

            await targetActor.update({ "system.hp.value": hpNouveau });

            if (hpNouveau <= 0) {
              await targetActor.toggleStatusEffect("dead", { active: true, overlay: true });
            } else{
              await targetActor.toggleStatusEffect("dead", { active: false, overlay: false });
            }

            const couleurHP = hpNouveau <= 0 ? "#ff3333" : "var(--couleur-vert)";
            targetInfo = `
              <div class="target-result">
                <img src="${targetActor.img}"">
                <strong>${targetActor.name}</strong> —
                ${hpNouveau <= 0 ? "<br><span style='color:#ff3333;'>☠ Hors combat</span>" : ""}
              </div>`;
              /*Armure : ${armure} ·
                Dégâts nets : <strong>${degatsNet}</strong> ·
                PV : ${hpActuel} → <strong style="color:${couleurHP};">${hpNouveau}</strong>*/
          }
        }

        // ── Chat ────────────────────────────────────────────────────
        const info   = biography
          ? `<div class="infos"><span class="title">Info</span><div class="description">${biography}</div></div>`
          : "";
        const succes = `${info}<span class='result' style='background:var(--couleur-vert);'>${affichage}</span>${targetInfo}`;

        const chat = await new LiberChat(actor)
          .withTemplate("systems/liber-chronicles/templates/chat/roll-resultat.hbs")
          .withContent("rollDamage")
          .withData({
            actingCharName: actor.name,
            actingCharImg:  actor.img,
            actingAbilName: item.img || "icons/svg/dice-target.svg",
            introText:      label,
            info:           item.name,
            succes,
          })
          .create();

        if (!chat) return ui.notifications.error("Impossible de créer le message de chat.");
        await chat.display();
        break;
      }

      // ── Consommation d'item ──────────────────────────────────────
      case "useItem": {
        if (!item) return ui.notifications.warn("Item introuvable.");

        const qty = item.system.quantity ?? 0;
        if (qty > 1) {
          await item.update({ "system.quantity": qty - 1 });
          ui.notifications.info(`${item.name} utilisé. Il en reste ${qty - 1}.`);
        } else {
          await item.delete();
          ui.notifications.info(`${item.name} a été entièrement consommé.`);
        }
        break;
      }

      default:
        break;
    }
  });
});

// ----------------------------------------------------------------
// Hotbar — création de macro à partir d'un item
// ----------------------------------------------------------------
Hooks.on("hotbarDrop", async (bar, data, slot) => {
  console.log("🔥 Objet déplacé sur la hotbar :", data);

  if (data.type !== "Item") return;

  const item = await fromUuid(data.uuid);
  if (!item) {
    console.error("❌ Item introuvable !");
    return;
  }

  const macroName    = `Attaque : ${item.name}`;
  const macroCommand = `
    (async () => {
      const uuid = "${data.uuid}";
      const item = await fromUuid(uuid);
      if (!item) { ui.notifications.error("Item introuvable !"); return; }

      await item.prepareData();

      const type        = item.type;
      const degats      = item.system.degat ?? "N/A";
      const description = item.system.biography ?? "Pas de description.";

      const uuidParts = uuid.split(".");
      const actorId   = uuidParts[1];
      const itemId    = uuidParts[3];
      const actor     = game.actors.get(actorId);
      if (!actor) { console.error("Acteur introuvable !"); return; }

      function showInputDialogWithSelect(callback) {
        new Dialog({
          title: "Entrer une valeur et choisir une option",
          content: \`
            <p>Sélectionnez une option :</p>
            <div class="form-group">
              <select id="userposture" name="userposture" style="width:49%; display:inline-block">
                <option value="focus">Focus</option>
                <option value="offensif">Offensif</option>
                <option value="defensif">Défensif</option>
                <option value="anticipatif">Anticipatif</option>
              </select>
              <select id="userability" name="userability" style="width:49%; display:inline-block">
                <option value="physique">Physique</option>
                <option value="force">Force</option>
                <option value="agilite">Agilité</option>
                <option value="social">Social</option>
                <option value="charisme">Charisme</option>
                <option value="sagacite">Sagacité</option>
                <option value="mental">Mental</option>
                <option value="memoire">Mémoire</option>
                <option value="astuce">Astuce</option>
              </select>
            </div>
            <p>Entrez le bonus/malus :</p>
            <div class="form-group">
              <input type="text" id="userInput" name="userInput" value="0" style="text-align:center"/>
            </div><br>\`,
          buttons: {
            cancel: { label: "Annuler" },
            ok: {
              label: "OK",
              callback: (html) => {
                const bonus   = html[0].querySelector('[name="userInput"]').value;
                const posture = html[0].querySelector('[name="userposture"]').value;
                const ability = html[0].querySelector('[name="userability"]').value;
                callback(bonus, posture, ability);
              }
            }
          },
          default: "ok"
        }).render(true);
      }

      return showInputDialogWithSelect(async (bonus, posture, ability) => {
        let valuemax = actor.system.ability[ability] ?? 0;
        valuemax += parseInt(bonus) || 0;

        const traitre  = actor.system.traitre;
        const emphase  = actor.system.emphase;
        const enc      = actor.system.enc    ?? 0;
        const encmax   = actor.system.encmax ?? 0;
        const fatig    = actor.system.fatig  ?? 0;
        const doublemain = item.system.doublemain;

        let critique = 5;
        let echec    = 95;

        if (traitre === "yes")          echec   -= 5;
        if (emphase === "dephase2")     echec   -= 10;
        else if (emphase === "dephase1") echec  -= 5;
        else if (emphase === "emphase1") critique += 5;
        else if (emphase === "emphase2") critique += 10;

        if (posture === "offensif") critique += 5;
        else if (posture === "focus") valuemax += 5;

        if (enc > encmax && ability === "physique") valuemax -= Math.floor(enc - encmax);
        if (ability === "physique") valuemax -= fatig * 5;

        valuemax = Math.min(valuemax, echec);
        valuemax = Math.max(valuemax, critique);

        const roll   = await new Roll("1d100").roll({ async: true });
        const result = roll.total;

        const intro = \`<div class="intro-img">
          <img src="\${actor.img}">
          <img src="systems/liber-chronicles/assets/actor/\${ability}.webp">
        </div>
        <div class="intro-chat">\`;

        let info = \`<p class="info">\${result}/\${valuemax}</p>
        <div class="infos"><span class="title">Info</span>
        <div class="description">\${description}</div></div>\`;

        let succes = \`<p class="resultat">\`;
        if      (result > echec)    succes += \`<span class='result' style='background:#ff3333;'>\${game.i18n.localize("Liber.Chat.Roll.EchecCrit")}</span>\`;
        else if (result <= critique) succes += \`<span class='result' style='background:#7dff33;'>\${game.i18n.localize("Liber.Chat.Roll.ReussiteCrit")}</span>\`;
        else if (result <= valuemax) succes += \`<span class='result' style='background:var(--couleur-vert);'>\${game.i18n.localize("Liber.Chat.Roll.Reussite")}</span>\`;
        else                         succes += \`<span class='result' style='background:var(--couleur-rouge);'>\${game.i18n.localize("Liber.Chat.Roll.Echec")}</span>\`;

        if (type && item.system.degat != 0) {
          succes += \`<button class="roll-damage" data-action="rollDamage" data-itemid="\${itemId}" data-actorid="\${actorId}">
            \${game.i18n.localize("Liber.Chat.Roll.utiliser")} \${item.name}
          </button>\`;
        }
        succes += "</p>";

        const content = intro + \`<div class="chat roll">\${info}\${succes}</div></div>\`;

        await ChatMessage.create({
          user:    game.user.id,
          speaker: ChatMessage.getSpeaker({ actor }),
          content
        });

        ui.notifications.info("L'attaque de " + item.name + " inflige " + degats + " dégâts !");
      });
    })();
  `;

  let existingMacro = game.macros.find(m => m.name === macroName);
  if (!existingMacro) {
    existingMacro = await Macro.create({
      name:      macroName,
      type:      "script",
      img:       item.img,
      command:   macroCommand,
      ownership: { default: 2 }
    });
  }

  setTimeout(async () => {
    await game.user.assignHotbarMacro(null, slot);
    await game.user.assignHotbarMacro(existingMacro, slot);
    await ui.hotbar.render();
    console.log(`✅ Macro "${existingMacro.name}" assignée au slot ${slot} !`);
  }, 100);

  ui.notifications.info(`✅ Ajout de "${item.name}" à la hotbar !`);
});

// ----------------------------------------------------------------
// Token — re-render la feuille si le token est mis à jour
// ----------------------------------------------------------------
Hooks.on("updateToken", (token, updates) => {
  if (token.actor?.sheet?.rendered) {
    token.actor.sheet.render(true);
  }
});

// ----------------------------------------------------------------
// Token — déplacement durant le turn order
// ----------------------------------------------------------------
if (!game.liberMovement) game.liberMovement = {};

Hooks.on("updateCombat", (combat, changed) => {
  if (!("turn" in changed) && !("round" in changed)) return;
  game.liberMovement = {};
});

Hooks.on("preUpdateToken", (tokenDoc, changes) => {
  if (!game.combat?.started) return;
  if (!tokenDoc.isOwner) return;

  if (changes.x === undefined && changes.y === undefined) return;

  const id = tokenDoc.id;

  const DISTANCE_MAX = tokenDoc.occludable.radius ?? 8;

  const gridSize = canvas.grid.size;
  const gridDistance = canvas.scene.grid.distance ?? 1;

  const dx = (changes.x ?? tokenDoc.x) - tokenDoc.x;
  const dy = (changes.y ?? tokenDoc.y) - tokenDoc.y;

  const pixels = Math.sqrt(dx * dx + dy * dy);
  const meters = (pixels / gridSize) * gridDistance;

  if (!game.liberMovement[id]) {
    game.liberMovement[id] = { moved: 0, sprinting: false, warned: false };
  }

  const state = game.liberMovement[id];
  const total = state.moved + meters;

  const walk = DISTANCE_MAX;
  const sprint = DISTANCE_MAX * 2;

  // 🔴 limite absolue
  if (total > sprint) {
    ui.notifications.error("⛔ Max "+sprint+" !");
    return false;
  }

  // 🟠 dépassement marche → blocage + warning
  if (total > walk && !state.sprinting) {
    if (!state.warned) {
      ui.notifications.warn("⚠️ Sprint nécessaire ! Refaite le déplacement pour confirmer.");
      state.warned = true;
    } else {
      state.sprinting = true;
      ui.notifications.info("🏃 Sprint activé !");
      ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ token: tokenDoc }),
        content: `<strong>🏃 Sprint !</strong> <em>${tokenDoc.name}</em> dépasse sa marche normale et se met à sprinter.`,
        type: CONST.CHAT_MESSAGE_TYPES?.OOC ?? 1,
      });
    }
    return false;
  }

  // ✅ autorisé
  state.moved = total;
});

const easteregg =`
 ⠄⠄⠄⠄⠄⠄⠄⠄⣀⣠⣤⣤⣤⣄⡀⠄⠄⠄
 ⠄⠄⠄⠄⠄⠄⣴⣿⣿⣿⡿⣿⡿⣗⢌⢳⡀⠄
 ⠄⠄⠄⠄⠄⣼⣿⡇⣿⠹⡸⡹⣷⡹⡎⣧⢳⠄
 ⠄⠄⠄⠄⠄⣿⣿⠱⡙⠰⣢⡱⢹⡇⡷⢸⢸.
 ⠄⠄⠄⠄⠄⢿⢸⡈⣉⣤⠠⣴⡄⡇⠁⠄⢸.
 ⠄⠄⠄⠄⠄⠸⡆⡃⡙⢍⣹⡿⢓⠄⠤⣐⡟⠄
 ⠄⠄⠄⠄⠄⠄⠙⠾⠾⠮⣵⢸⡔⢷⣍⠉⠄⠄
 ⠄⠄⠄⠄⢀⣴⣾⣿⣷⡺⡋⢞⣎⣚⣛⣳⣴⣶
 ⠄⠄⠄⠄⢘⣛⣩⣾⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿
 ⠄⠄⣀⠺⣿⣿⣿⠟⣡⣾⠿⢿⣿⣿⡎⢋⠻⣿
 ⠄⠄⣉⣠⣿⣿⡏⣼⣿⠁⠶⠄⣿⣿⡇⡼⠄⠈
 ⠄⠄⣈⠻⠿⠟⢁⠘⢿⣷⣶⣾⣿⠟⡰⠃⠄⠄
 ⠄⣴⣿⣧⢻⣿⣿⣷⣦⣬⣉⣩⣴⠞⠁⠄⠄⠄
 ⠄⠘⠿⠿⢸⣿⣿⣿⣿⣿⣿⣿⠁⠄⠄⠄⠄.
 ⠄⢤⡝⣧⢸⣿⣿⣿⣿⣿⣿⠟⠄⠄⠄⠄⠄⠄
 ⣜⢧⠻⣀⢿⣿⣿⣿⣿⣿⠏⣾⣧⡀⠄⠄⠄⠄
 ⠹⢂⣾⣿⠸⣿⣿⣿⣿⡏⣼⣿⣿⣷⠄⠄⠄⠄
 ⠄⣿⣿⣿⣧⠹⣿⢻⡿⢰⣿⣿⣿⣿⣇⠄⠄⠄
 ⢸⣿⣿⣿⣿⣇⢹⢸⢁⣿⣿⣿⣿⣿⣿⡆⠄⠄
 ⢸⣿⣿⣿⣿⣿⣆⠄⣿⣿⣿⣿⣿⣿⣿⡇⠄⠄
 ⠸⣿⣿⣿⣿⣿⣿⠄⢿⣿⣿⣿⣿⣿⣿⡇⠄⠄
 ⠄⣿⣿⣿⣿⣿⣿⠄⠈⣿⣿⣿⣿⣿⣿⡇⠄⠄
`