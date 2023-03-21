export class Macros {

    static createLiberMacro = async function(dropData, slot) {
              console.log(dropData.type)
              // Créer une macro pour les items
              if (dropData.type == "Item") {
                const item = await fromUuid(dropData.uuid);
                const actor = item.actor;

                let command = null;
                let macroName = null;

                if (["arme","armure","objet","magie"].includes(item.type)) {
                  let rolldice='';
                    if(item.system.degats){
                      command = 'let r = new Roll("'+item.system.degats+'");roll=r.evaluate({"async": false});ChatMessage.create({user: game.user._id,speaker: ChatMessage.getSpeaker({token: actor}),content: `<span style="flex:auto"><p class="resultatp"><img src="'+item.img+'"  width="24" height="24"/>&nbsp;Utilise '+item.name+'<p>'+item.system.description+'<div class="dice-roll"><div class="dice-result"><div class="dice-formula">`+r.result+`</div><h4 class="dice-total">`+r.total+`</h4></div></div>`});';

                    }else{
                      command = 'ChatMessage.create({user: game.user._id,speaker: ChatMessage.getSpeaker({token: actor}),content: `<span style="flex:auto"><p class="resultatp"><img src="'+item.img+'"  width="24" height="24"/>&nbsp;Utilise '+item.name+'<p>'+item.system.description+'`});';

                    }
                    macroName = item.name + " (" + game.actors.get(actor.id).name + ")";                
                }
                if (command !== null) { this.createMacro(slot, macroName, command, item.img); } 
            }
    }

    /**
     * @description Create a macro
     *  All macros are flaged with a cleenmain.macro flag at true
     * @param {*} slot 
     * @param {*} name 
     * @param {*} command 
     * @param {*} img 
     */
     static createMacro = async function(slot, name, command, img) {
        let macro = game.macros.contents.find(m => (m.name === name) && (m.command === command));
        if (!macro) {
            macro = await Macro.create({
                name: name,
                type: "script",
                img: img,
                command: command,
                flags: {"liber.itemMacro": true}
            }, {displaySheet: false});
            game.user.assignHotbarMacro(macro, slot);
        } 
    }
}