export class Macros {

    static createLiberMacro = async function(dropData, slot) {
              // Créer une macro pour les items
            if (dropData.type == "Item") {
                const item = await fromUuid(dropData.uuid);
                const actor = item.actor;
                const physique=actor.system.ability.physique;
                const force=actor.system.ability.force;
                const agilite=actor.system.ability.agilite;
                const social=actor.system.ability.social;
                const sagacite=actor.system.ability.sagacite;
                const charisme=actor.system.ability.charisme;                
                const mental=actor.system.ability.mental;
                const ast=actor.system.ability.ast;
                const memoire=actor.system.ability.memoire;
                let command = null;
                let macroName = null;

                /*id unique*/
                let id = '';
                const letters = 'abcdefghijklmnopqrstuvwxyz';
console.log
                for (let i = 0; i < 20; i++) {
                    const randomIndex = Math.floor(Math.random() * letters.length);
                    id += letters[randomIndex];
                }
                macroName = item.name + " (" + game.actors.get(actor.id).name +")" + '<span style="display:none">(' + id + ')</span>';

command = `
// Définir une fonction pour gérer la fenêtre modale avec champ de saisie et liste déroulante
function showInputDialogWithSelect(options, callback) {
    const selectOptions = options.map((option) => \`<option value="\${option.value}">\${option.label}</option>\`).join('');

    new Dialog({
        title: "Entrer une valeur et choisir une option",
        content: \`
          <p>Sélectionnez une option :</p>
            <div class="form-group">
              <select id="selectedOption" name="selectedOption" style="width:50%">
                    \${selectOptions}
              </select>
              <select id="userposture" name="userposture" style="width:49%">
                  <option value="focus">Focus</option>
                  <option value="offensif">Offensif</option>
                  <option value="defensif">Défensif</option>
                  <option value="anticipatif">Anticipatif</option>
              </select>
            </div>
            <p>Entrez le bonus/malus :</p>
            <div class="form-group">
                <input type="text" id="userInput" name="userInput" value="0" style="text-align:center"/>
            </div>
            <p></p>
            
        \`,
        buttons: {
            ok: {
                label: "OK",
                callback: (html) => {
                    const userInput = html.find('[name="userInput"]').val();
                    const selectedOption = html.find('[name="selectedOption"]').val();
                    const userposture = html.find('[name="userposture"]').val();
                    callback(userInput, selectedOption, userposture);
                },
            },
            cancel: {
                label: "Annuler",
            },
        },
        default: "ok",
    }).render(true);
}

// Définir les options possibles
const options = [

  { value: "Aucun", label: "Aucun" },
  { value: "${physique}", label: "Physique" },
  { value: "${force}", label: "Force" },
  { value: "${agilite}", label: "Agilité" },
  { value: "${mental}", label: "Mental" },
  { value: "${ast}", label: "Astuce" },
  { value: "${memoire}", label: "Mémoire" },
  { value: "${social}", label: "Social" },
  { value: "${charisme}", label: "Charisme" },
  { value: "${sagacite}", label: "Sagacite" },
];

// Utiliser la fonction pour afficher la fenêtre modale et récupérer les valeurs
showInputDialogWithSelect(options, (userInput, selectedOption,userposture) => {
  if(selectedOption!=="Aucun"){
    let r = new Roll('1d100');
    let button='';let succes="";
    let critique=5;
    if(userposture=="focus"){
      userInput=parseInt(userInput)+5;
    }else if(userposture=="offensif"){
      critique=10;
    }
    let retour;
    r.evaluate().then((result) => {
      retour = result.total;
      let inforesult=parseInt(selectedOption)+parseInt(userInput);
      if(retour>95){
          succes="<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec critique</h4>";
          degats=0;
      }else if(retour<=critique){
          succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite critique</h4>";
          degats=2;
      }else if(retour<=inforesult){
          succes="<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite</h4>";
          degats=1;
      }else{
          succes="<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec</h4>";
          degats=0;
      }
      texte = \`<span style="flex:auto"><p class="infosort"><span class="resultatp"><img src="${item.img}"  width="24" height="24"/>&nbsp; Jet de ${macroName} :\`  + retour +\`+\`+selectedOption+\`</span><span class="desctchat">${item.system.description}</span></p>\`+succes;
      `;

      if(item.system.degats){
        command+=`button+=\`<button class="roll-damage" style="cursor:pointer;margin-bottom: 5px;" data-name="Degat" data-actorid="{ actor: this }" 
          data-dice="${item.system.degats}" data-img="${item.img}" data-desc="${item.system.description}" data-type="jetdedegat">Degat</button>\`;`
      }
      command+=`
      texte+=button+'</span>';
      //info Tchat    
      r.toMessage({
          speaker: ChatMessage.getSpeaker({ actor: this }),
          flavor: texte
       });
    });

    // Affiche les valeurs récupérées dans la console
    console.log("Valeur entrée par l'utilisateur :", userInput);
    console.log("Option sélectionnée :", selectedOption);
  }else{
    console.log(${item.system.cout})
    let texte = \`<span style="flex:auto"><p class="infosort"><span class="resultatp"><img src="${item.img}"  width="24" height="24"/>&nbsp; Jet de ${macroName}</span><span class="desctchat" style="display:block">${item.system.description}<span style="text-align:right; float:right; margin-top:25px">'${item.system.cout}'</span></span></p></span>\`;
    texte+='</span>';
    let chatData = {
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: texte
    };
    ChatMessage.create(chatData, {});
  }
});

`;
                this.createMacro(slot, macroName, command, item.img);








               

















            }

            if (dropData.type == "ability") {
                let id = '';
                  const letters = 'abcdefghijklmnopqrstuvwxyz';

                  for (let i = 0; i < 20; i++) {
                    const randomIndex = Math.floor(Math.random() * letters.length);
                    id += letters[randomIndex];
                  }
                let macroName = dropData.name +'<span style="display:none">('+id+')</span>';
                let img = 'systems/liber/assets/item/' + dropData.name + '.jpg';
                let command = 'let r = new Roll("1d100");roll=r.evaluate({"async": false});ChatMessage.create({user: game.user._id,speaker: ChatMessage.getSpeaker({token: actor}),content: `<span style="flex:auto"><p class="resultatp"><img src="' + img + '"  width="24" height="24"/>&nbsp;Utilise ' + macroName + '<p><div class="dice-roll"><div class="dice-result"><div class="dice-formula">`+r.result+`</div><h4 class="dice-total">`+r.total+`</h4></div></div>`});';                
                this.createMacro(slot, macroName, command, img);
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