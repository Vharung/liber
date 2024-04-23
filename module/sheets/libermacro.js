import {armes} from "./class/const.js";

export class Macros {
    static createLiberMacro = async function(dropData, slot) {
      // Créer une macro pour les items
      
      if (dropData.type == "Item") {
        const item = await fromUuid(dropData.uuid);
        const actor = item.actor;
        const idActor = actor.id;
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
                    cancel: {
                        label: "Annuler",
                    },
                    ok: {
                        label: "OK",
                        callback: (html) => {
                            const userInput = html.find('[name="userInput"]').val();
                            const selectedOption = html.find('[name="selectedOption"]').val();
                            const userposture = html.find('[name="userposture"]').val();
                            callback(userInput, selectedOption, userposture);
                        },
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
        const id_actor="${idActor}";
        console.log('`+game.actors.get(actor.id).system.psy.value+`'); //PV insoignable
        var retour='';
        var inforesult='';
        var succes='';
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
            let retour=null;
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
              texte = \`<span style="flex:auto"><p class="infosort"><span class="resultatp"><img src="${item.img}"  width="24" height="24"/>&nbsp; Jet de ${macroName} : \`  + retour +\`/\`+inforesult+\`</span><span class="desctchat">${item.system.description}</span></p>\`+succes;
              `;

              if(item.system.degats){
                command+=`button+=\`<button class="roll-damage" style="cursor:pointer;margin-bottom: 5px;" data-name="Degat" data-actorid="{ actor: this }"
                  data-dice="${item.system.degats}" data-img="${item.img}" data-desc="${item.system.description}" data-type="jetdedegat">Degat</button>\`;`
              }
              /*if (item.system.cout) {//a tester
                command+=`
                let psy = actor.system.psy.value;
                let hp = actor.system.hp.value;
                let insoin=0;
                if(cout<psy){
                    console.log('sort lancer :'+psy+'-'+cout)//bug
                    psy = parseInt(psy)-parseInt(cout)
                }else{
                    console.log('sort lancer insoin :'+psy+'<'+cout)//bug
                    var diff= parseInt(cout)-parseInt(psy)
                    hp=parseInt(hp)-parseInt(diff);
                    psy=0;
                    insoin= parseInt(insoin)+parseInt(diff);            
                }
                game.actors.get(actor.id).update({"system.insoin": insoin,"system.hp.value": hp,"system.psy.value": psy});`;
              }*/
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
            let texte = \`<span style="flex:auto"><p class="infosort"><span class="resultatp"><img src="${item.img}"  width="24" height="24"/>&nbsp; Jet de ${macroName}</span><span class="desctchat" style="display:block">${item.system.description}<span style="text-align:right; float:right; margin-top:25px">'${item.system.cout}'</span></span></p></span>\`;
              texte = \`<span style="flex:auto"><p class="infosort"><span class="resultatp"><img src="${item.img}"  width="24" height="24"/>&nbsp; Jet de ${macroName} : \`  + retour +\`/\`+inforesult+\`</span><span class="desctchat">${item.system.description}</span></p>\`+succes;
            texte+='</span>';
            let chatData = {
                speaker: ChatMessage.getSpeaker({ alias: "`+game.actors.get(actor.id).name +`", }),
                content: texte
            };
            ChatMessage.create(chatData, {});
          }
        });

        `;
        this.createMacro(slot, macroName, command, item.img);


    }

    if (dropData.type == "ability") {
      console.log("ID de l'acteur :", dropData.idactor);
      let idActor = dropData.idactor;
      let valeur=dropData.attDice;

      let id = '';
      const letters = 'abcdefghijklmnopqrstuvwxyz';
      const mains=Object.values(armes.mains)
      for (let i = 0; i < 20; i++) {
          const randomIndex = Math.floor(Math.random() * letters.length);
          id += letters[randomIndex];
      }
      let macroName = dropData.name +'<span style="display:none">('+id+')</span>';
      let img = 'systems/liber/assets/item/' + dropData.name + '.jpg';
      let command = `const actor = game.actors.get('${idActor}');
      function showInputDialogWithSelect(callback) {
            new Dialog({
                title: "Entrer une valeur et choisir une option",
                content: \`
                    <p>Sélectionnez une option :</p>
                    <div class="form-group">
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
                    cancel: {
                        label: "Annuler",
                    },
                    ok: {
                        label: "OK",
                        callback: (html) => {
                            const userInput = html.find('[name="userInput"]').val();
                            const userposture = html.find('[name="userposture"]').val();
                            callback(userInput, userposture);
                        },
                    },
                },
                default: "ok",
            }).render(true);
        }
        showInputDialogWithSelect((userInput, userposture) => {
            let critique = 5;
            if (userposture == "focus") {
                userInput = parseInt(userInput) + 5;
            } else if (userposture == "offensif") {
                critique = 10;
            }
            let r = new Roll("1d100");
            roll = r.evaluate({ "async": false });
            let retour = r.total;
            let listedemain=['Bâton','Espadon','Hallebarde','Fléaux d’arme','Epée à deux mains','Hache de bataille','Faux de guerre','Lance Lourde','Masse lourde'];
            let inforesult = parseInt(${valeur}) + parseInt(userInput);
            let succes, degats;
            if (retour > 95) {
                succes = "<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec critique</h4>";
                degats = 0;
            } else if (retour <= critique) {
                succes = "<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite critique</h4>";
                degats = 2;
            } else if (retour <= inforesult) {
                succes = "<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite</h4>";
                degats = 1;
            } else {
                succes = "<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec</h4>";
                degats = 0;
            }`;
            if(dropData.name=="physique"){//a tester
              command +=`let {armed,degatd,desd,imgd,armeg,degatg,desg,imgg} = actor.system.armeuse;
              for (let i = listedemain.length - 1; i >= 0; i--) {
                console.log(armeg+'='+listedemain[i])
                  if(armed.includes(listedemain[i]) || armeg.includes(listedemain[i])){

                      succes+='<button class="addfats" style="cursor:pointer;margin-bottom: 5px;" data-actorid="${idActor}">Ajouter un point de fatigue</button>';
                  }
              }
             
              if(armed){
                  succes+='<button class="roll-damage" style="cursor:pointer;margin-bottom: 5px;" data-name="'+armed+'" data-actorid="${idActor}" data-dice="'+degatd+'" data-img="'+imgd
              +'" data-desc="'+desd+'" data-type="jetdedegat">Utiliser '+armed+'</button>';
              }
              if(armeg){
                  succes+='<button class="roll-damage" style="cursor:pointer" data-name="'+armeg+'" data-actorid="${idActor}" data-dice="'+degatg+'" data-img="'+imgg
              +'" data-desc="'+desg+'" data-type="jetdedegat">Utiliser '+armeg+'</button>';
              }`            

            }
            command+=`ChatMessage.create({ user: game.user._id, speaker: ChatMessage.getSpeaker({ alias: actor.name,}), content: \`<span style="flex:auto"><p class="resultatp"><img src="${img}" width="24" height="24"/>&nbsp;Utilise ${macroName} \`  + retour +\`/\`+inforesult+\`<p><div class="dice-roll"><div class="dice-result"><div class="dice-formula">\`+r.result+\`</div><h4 class="dice-total">\`+retour+\`</h4>\`+succes+\`</div></div>\` });
        });`;
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