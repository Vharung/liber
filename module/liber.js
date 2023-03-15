import { liber } from "./sheets/config.js";
import { LiberActor } from "./sheets/liberactor.js";
import { LiberActorSheet } from "./sheets/liberactorsheet.js";
import { LiberItem } from "./sheets/liberitem.js";
import { LiberItemSheet } from "./sheets/liberitemsheet.js";
import * as Chat from "./sheets/liberchat.js";

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


