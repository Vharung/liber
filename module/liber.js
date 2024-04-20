import { liber } from "./sheets/class/config.js";
import { LiberActor } from "./sheets/liberactor.js";
import { LiberActorSheet } from "./sheets/liberactorsheet.js";
import { LiberItem } from "./sheets/liberitem.js";
import { LiberItemSheet } from "./sheets/liberitemsheet.js";
import { HealthChangeAnimation } from "./sheets/class/class_HealthChangeAnimation.js";
import * as Chat from "./sheets/liberchat.js";
import { Macros } from "./sheets/libermacro.js";

//const myInstance = new MyClass();
Hooks.once("init", async function() {
    console.log(liber.ASCII)
    CONFIG.liber = liber;
    CONFIG.Actor.documentClass = LiberActor;
    CONFIG.Item.documentClass = LiberItem;
    

    CONFIG.Combat.initiative = {
        formula: "1d6",
        decimals: 2
    };


    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("liber", LiberItemSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("liber", LiberActorSheet, { makeDefault: true });

});

/**
 * Crée une macro au drop d'un objet sur la hotbar 
 */
Hooks.on("hotbarDrop", (bar, data, slot) => {
    if (["Item", "ability"].includes(data.type)) {
        console.log("Type:", data.type);
        console.log("Slot:", slot);

        Macros.createLiberMacro(data, slot);
        console.log("Macro created successfully!");
        return false;
    }
});

Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

/******************************************************/
/****************Animation des PV/PSY******************/
/******************************************************/
//token
Hooks.on('updateToken', (tokenDocument, updateData, options, userId) => {
    if (updateData.actorData?.system?.pv) {
        const currentHP = getProperty(tokenDocument, "actorData.system.pv.total");
        const newHP = getProperty(updateData, "actorData.system.pv.total");

        if (newHP !== currentHP) {
            let changeAmount = newHP - currentHP;
            let changeText = (changeAmount > 0 ? `+${changeAmount}` : `${changeAmount}`);
            let changeColor = (changeAmount > 0 ? 0x00ff00 : 0xff0000); // Vert pour gain, Rouge pour perte
            HealthChangeAnimation.showFloatingText(tokenDocument, changeText, changeColor);
        }
    }
    console.log('updateToken')
});
//fiche de personnage
Hooks.on("renderActorSheet", function(sheet, html) {
    html.find(".hp, .psy").change(function() {
        const input = $(this);
        const oldValue = parseFloat(input.data('oldValue') || input.attr('value'));
        const newValue = parseFloat(input.val());
        const change = newValue - oldValue;
        
        if (change !== 0) {
            // Animation après la mise à jour de la fiche de personnage
            const changeSpan = input.next(".hp-change, .psy-change");
            changeSpan.text((change > 0 ? "+" : "") + change)
                       .css({color: change > 0 ? "green" : "red", opacity: 1, 'margin-top': "-34px"})
                       .animate({'margin-top': "-49px", opacity: 0}, 3000, function() {
                           changeSpan.text(""); // Nettoyer après l'animation
                       });

            // Temporiser la mise à jour de la valeur dans les données
            
        }
    });
});