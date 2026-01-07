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
import MobileActorInterface from "./sheet/mobile.js";

import { Macros } from "./macro.js";


const ActorSheetV2 = foundry.applications.sheets.ActorSheetV2;
const ItemSheetV2 = foundry.applications.sheets.ItemSheetV2;

/** Initialisation du système */
Hooks.once("init", async function () {
  console.log("Initialisation du système Liber...");
  console.log(liber.ASCII)

  CONFIG.Actor.dataModels = {
    character: LiberCharacterData,
    pnj: LiberCharacterData,
    monstre: LiberCharacterData
  };

  CONFIG.Combat.initiative = {
    formula: "1d6",
    decimals: 1
  };


  console.log(CONFIG.Actor.dataModels);
  CONFIG.Item.dataModels = {
    item: LiberItemData,
    armor: LiberItemData,
    weapon: LiberItemData,
    magic: LiberItemData
  };

// Acteurs
foundry.documents.collections.Actors.unregisterSheet("core", ActorSheetV2);
foundry.documents.collections.Actors.registerSheet("liber", LiberCharacterSheet, { types: ["character","pnj"], makeDefault: true });
foundry.documents.collections.Actors.registerSheet("liber", LiberMonsterSheet, { types: ["monstre"], makeDefault: true });

// Items
foundry.documents.collections.Items.unregisterSheet("core", ItemSheetV2);
foundry.documents.collections.Items.registerSheet("liber", LiberItemSheet, { types: ["item"], makeDefault: true });
foundry.documents.collections.Items.registerSheet("liber", LiberArmorSheet, { types: ["armor"], makeDefault: true });
foundry.documents.collections.Items.registerSheet("liber", LiberWeaponSheet, { types: ["weapon"], makeDefault: true });
foundry.documents.collections.Items.registerSheet("liber", LiberMagicSheet, { types: ["magic"], makeDefault: true });

});

/*A faire
- ajout les chargements des types en fonction metier / clan etc...
- vérification des mise à niveau
- autre fonction*/

Handlebars.registerHelper('capitalizeFirstLetter', function(str) {
  if (typeof str === 'string' && str.length > 0) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
});

Handlebars.registerHelper("stripTags", function (text) {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
});

/*Jet de des du chat*/
Hooks.once("ready", () => {
    document.addEventListener("click", async (event) => {
        let button = event.target.closest("[data-action]");
        if (!button) return; // Évite les clics hors des boutons ciblés

        let action = button.dataset.action;
        let itemId = button.dataset.itemid;
        let actorId = button.dataset.actorid;

        let actor = game.actors.get(actorId);
        if (!actor) return;

        let item = actor.items.get(itemId);
        if (!item) return;

        console.log(`Action déclenchée : ${action}`, item);

        if (action === "rollDamage") {
            let damageFormula = item?.system?.degat;
            if (!damageFormula || !Roll.validate(damageFormula)) {
                return ui.notifications.error(`Formule de dégâts invalide : ${damageFormula}`);
            }

            console.log(`Lancer de dégâts : ${damageFormula}`);
            let roll = await new Roll(damageFormula).roll({ async: true });
            let damageResult = roll.total;

            let chatContent = `<div>${game.i18n.localize("Liber.Chat.Roll.Degats")} : ${damageResult}</div>`;
            let visuel = item.img || "icons/svg/dice-target.svg";
            let label = actor.name + game.i18n.localize("Liber.Chat.Roll.Degat") || "Jet de Dégâts";
            let succes = `<span class='result' style='background:var(--couleur-vert);'>${damageResult}</span>`;
            //point de fatigue
            const doublemain= item.system.doublemain;console.log(doublemain)
            const fatig= actor.system.fatig;console.log(fatig)
            if(doublemain=="yes"){
                await actor.update({ "system.fatig": fatig + 1 });//pas d'update effectuer
            }
            let chatData = {
                actingCharName: actor.name,
                actingCharImg: actor.img,
                actingAbilName: visuel,
                introText: label,
                info: item.name,
                succes: succes
            };

            let chat = await new LiberChat(actor)
                .withTemplate("systems/liber-chronicles/templates/chat/roll-resultat.hbs")
                .withContent(chatContent)
                .withData(chatData)
                .create();

            await chat.display();
        }

        if (action === "useItem") {
            if (item.system.quantity > 1) {
                await item.update({ "system.quantity": item.system.quantity - 1 });
                ui.notifications.info(`${item.name} utilisé. Il en reste ${item.system.quantity - 1}.`);
            } else {
                await item.delete();
                ui.notifications.info(`${item.name} a été entièrement consommé.`);
            }
        }
    });
});


/*macro*/
/*Hooks.on("hotbarDrop", (bar, data, slot) => {
    Macros.createLiberMacro(data, slot);
});*/

Hooks.on("hotbarDrop", async (bar, data, slot) => {
    console.log("🔥 Objet déplacé sur la hotbar :", data);

    if (data.type !== "Item") return;

    const item = await fromUuid(data.uuid);
    if (!item) {
        console.error("❌ Item introuvable !");
        return;
    }

    console.log("🖼 Image :", item.img, "⚔ Dégâts :", item.system.degat);

    const macroName = `Attaque : ${item.name}`;
    const macroCommand = `
        (async () => {
            const uuid = "${data.uuid}";

            const item = await fromUuid(uuid);
            if (!item) {
                ui.notifications.error("Item introuvable !");
                return;
            }

            await item.prepareData();

            const type = item.type;
            const degats = item.system.degat ?? "N/A";
            const description = item.system.biography ?? "Pas de description.";

            const uuidParts = uuid.split(".");
            const actorId = uuidParts[1];
            const itemId = uuidParts[3];
            const actor = game.actors.get(actorId);

            if (!actor) {
                console.error("Acteur introuvable !");
                return;
            }

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
                        cancel: {
                            label: "Annuler"
                        },
                        ok: {
                            label: "OK",
                            callback: (html) => {
                                const bonus = html[0].querySelector('[name="userInput"]').value;
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

                const traitre = actor.system.traitre;
                const emphase = actor.system.emphase;
                const enc = actor.system.enc ?? 0;
                const encmax = actor.system.encmax ?? 0;
                const doublemain=item.system.doublemain; //to use
                const fatig = actor.system.fatig ?? 0; //to use
                let psy = actor.system.psy ?? 0; //to use
                let pv = actor.system.hp ?? 0; //to use
                let insoin = actor.system.insoin ?? 0; //to use
                const talent = actor.system.talent; //to use
                const consommable=item.system.consommable; //to use
                let quantity=item.system.quantity;
                const school=item.system.school;

                let critique = 5;
                let echec = 95;

                if (traitre === "yes") echec -= 5;
                if (emphase === "dephase2") echec -= 10;
                else if (emphase === "dephase1") echec -= 5;
                else if (emphase === "emphase1") critique += 5;
                else if (emphase === "emphase2") critique += 10;

                if (posture === "offensif") critique += 5;
                else if (posture === "focus") valuemax += 5;

                if (enc > encmax && ability === "physique") {
                    valuemax -= Math.floor(enc - encmax);
                }

                if (ability === "physique") {
                    valuemax -= fatig * 5;
                }

                valuemax = Math.min(valuemax, echec);
                valuemax = Math.max(valuemax, critique);

                const roll = await new Roll("1d100").roll({ async: true });
                const result = roll.total;

                const intro = \`<div class="intro-img">
                    <img src="\${actor.img}">
                    <img src="systems/liber-chronicles/assets/actor/\${ability}.webp">
                </div>
                <div class="intro-chat">\`;


                let info = \`<p class="info">\${result}/\${valuemax}</p>\`;

                info += \`
                <div class="infos">
                    <span class="title">Info</span>
                    <div class="description">\${description}</div>
                </div>\`;

                
                

                let succes = \`<p class="resultat">\`;
                if (result > echec) {
                    succes += \`<span class='result' style='background:#ff3333;'>\${game.i18n.localize("Liber.Chat.Roll.EchecCrit")}</span>\`;
                } else if (result <= critique) {
                    succes += \`<span class='result' style='background:#7dff33;'>\${game.i18n.localize("Liber.Chat.Roll.ReussiteCrit")}</span>\`;
                } else if (result <= valuemax) {
                    succes += \`<span class='result' style='background:var(--couleur-vert);'>\${game.i18n.localize("Liber.Chat.Roll.Reussite")}</span>\`;
                } else {
                    succes += \`<span class='result' style='background:var(--couleur-rouge);'>\${game.i18n.localize("Liber.Chat.Roll.Echec")}</span>\`;
                }

                if (type && item.system.degat!=0) {
                    succes+= \`<button class="roll-damage" data-action="rollDamage" data-itemid="\${itemId}" data-actorid="\${actorId}">${game.i18n.localize("Liber.Chat.Roll.utiliser")} \${item.name}
                           </button>\`;
                }

               /* if(type=="magic"){
                  if (school !== "corbeau") {
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
                          info=\`${game.i18n.localize("Liber.Chat.Roll.Ressource")}<div class="infos"><span class="title">Info</span><div class="description">\${description}</div></div>\`;
                      }
                  } else {
                      if (pv >= quantity) {
                          pv -= quantity;
                      } else {
                          succes = ""
                          info=\`${game.i18n.localize("Liber.Chat.Roll.Ressource")}<div class="infos"><span class="title">Info</span><div class="description">\${description}</div></div>\`;
                      }
                  }
                  await actor.update({ 'system.hp': pv, 'system.insoin': insoin, 'system.psy': psy });
              }*/


                succes+="</p>";

                const content = intro + \`<div class="chat roll">\${info}\${succes}</div></div>\`;

                await ChatMessage.create({
                    user: game.user.id,
                    speaker: ChatMessage.getSpeaker({ actor }),
                    content,
                    template: "systems/liber-chronicles/templates/chat/roll-resultat.hbs"
                });

                

                ui.notifications.info("L'attaque de " + item.name + " inflige " + degats + " dégâts !");
            });
        })();
    `;

    let existingMacro = game.macros.find(m => m.name === macroName);
    if (!existingMacro) {
        console.log("🛠 Création d'une nouvelle macro...");
        existingMacro = await Macro.create({
            name: macroName,
            type: "script",
            img: item.img,
            command: macroCommand,
            ownership: { default: 2 }
        });
    }

    console.log(`📌 Tentative d'ajout à la hotbar (slot ${slot})...`);

    setTimeout(async () => {
        await game.user.assignHotbarMacro(null, slot);
        await game.user.assignHotbarMacro(existingMacro, slot);
        await ui.hotbar.render();
        console.log(`✅ Macro "${existingMacro.name}" assignée au slot ${slot} !`);
    }, 100);

    ui.notifications.info(`✅ Ajout de "${item.name}" à la hotbar !`);
});

/*Token*/
Hooks.on("updateToken", (token, updates) => {
  if (token.actor?.sheet?.rendered) {
    token.actor.sheet.render(true);
  }
});

// ====================================
// Initialisation automatique
// ====================================
const mobileInterface = new MobileActorInterface();
mobileInterface.init();