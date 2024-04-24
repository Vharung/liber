import {armes} from "./class/const.js";

export class Macros {
    static createLiberMacro = async function(dropData, slot) {
      // Définir une fonction pour gérer la fenêtre modale avec champ de saisie et liste déroulante
        let actorId = "A8In0jI7o1JtoCFw";
        let actor = game.actors.get(actorId);
        let retour='';
        let inforesult='';
        let succes='';
        function showInputDialogWithSelect(options, callback) {
            const selectOptions = options.map((option) => `<option value="${option.value}">${option.label}</option>`).join('');

            new Dialog({
                title: "Entrer une valeur et choisir une option",
                content: `
                  <p>Sélectionnez une option :</p>
                    <div class="form-group">
                      <select id="selectedOption" name="selectedOption" style="width:50%">
                            ${selectOptions}
                      </select>
                      <select id="userposture" name="userposture" style="width:49%">
                          <option value="focus">Focus</option>
                          <option value="offensif">Offensif</option>
                          <option value="defensif">Défensif</option>
                          <option value="anticipatif">Anticipatif</option>
                      </select>
                    </div><p>Psy dépensés :</p>
                      <div class="form-group">
                          <input type="text" id="userpsy" name="userpsy" value="2" style="text-align:center" readonly/>
                      </div><p>Entrez le bonus/malus :</p>
                    <div class="form-group">
                        <input type="text" id="userInput" name="userInput" value="0" style="text-align:center"/>
                    </div>
                    <p></p>
                   
                `,
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
                            const userpsy = html.find('[name="userpsy"]').val();
                            callback(userInput, selectedOption, userposture, userpsy);
                        },
                    },
                },
                default: "ok",
            }).render(true);
        }

        // Définir les options possibles
        const options = [

          { value: "Aucun", label: "Aucun" },
          { value: "70", label: "Physique" },
          { value: "50", label: "Force" },
          { value: "20", label: "Agilité" },
          { value: "40", label: "Mental" },
          { value: "30", label: "Astuce" },
          { value: "10", label: "Mémoire" },
          { value: "60", label: "Social" },
          { value: "10", label: "Charisme" },
          { value: "50", label: "Sagacite" },
        ];
       ;
       
        // Utiliser la fonction pour afficher la fenêtre modale et récupérer les valeurs
        showInputDialogWithSelect(options, (userInput, selectedOption,userposture,userpsy) => {
          if(selectedOption!=="Aucun"){
            let r = new Roll('1d100');
            let button='';let succes="";
            let critique=5;
            if(userposture=="focus"){
              userInput=parseInt(userInput)+5;
              userpsy=parseInt(userpsy)-1;
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
              texte = `<span style="flex:auto"><p class="infosort"><span class="resultatp"><img src="systems/liber/assets/magie/ombre-5.jpg"  width="24" height="24"/>&nbsp; Jet de L'armure d'ombres (Thraugrim)<span style="display:none">(ntgzklawhorxkpfaioec)</span> : `  + retour +`/`+inforesult+`</span><span class="desctchat">Perturbe l'adversaire,  rendant la cible,  plus difficile à toucher (-10% pour les attaques physique ou/et magique)</span></p>`+succes;
              
                let psy = actor.system.psy.value;
                let hp = actor.system.hp.value;
                let insoin=actor.system.insoin;
                if(!insoin){insoin=0}
                if(userpsy<psy){
                    console.log('sort lancer :'+psy+'-'+userpsy)//bug
                    psy = parseInt(psy)-parseInt(userpsy)
                }else{
                    console.log('sort lancer insoin :'+psy+'<'+userpsy)//bug
                    var diff= parseInt(userpsy)-parseInt(psy)
                    hp=parseInt(hp)-parseInt(diff);
                    psy=0;
                    insoin= parseInt(insoin)+parseInt(diff);            
                }
                actor.update({"system.insoin": insoin,"system.hp.value": hp,"system.psy.value": psy});
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
            let texte = `<span style="flex:auto"><p class="infosort"><span class="resultatp"><img src="systems/liber/assets/magie/ombre-5.jpg"  width="24" height="24"/>&nbsp; Jet de L'armure d'ombres (Thraugrim)<span style="display:none">(ntgzklawhorxkpfaioec)</span></span><span class="desctchat" style="display:block">Perturbe l'adversaire,  rendant la cible,  plus difficile à toucher (-10% pour les attaques physique ou/et magique)<span style="text-align:right; float:right; margin-top:25px">'2'</span></span></p></span>`;
              texte = `<span style="flex:auto"><p class="infosort"><span class="resultatp"><img src="systems/liber/assets/magie/ombre-5.jpg"  width="24" height="24"/>&nbsp; Jet de L'armure d'ombres (Thraugrim)<span style="display:none">(ntgzklawhorxkpfaioec)</span> : `  + retour +`/`+inforesult+`</span><span class="desctchat">Perturbe l'adversaire,  rendant la cible,  plus difficile à toucher (-10% pour les attaques physique ou/et magique)</span></p>`+succes;
            texte+='</span>';
            let chatData = {
                speaker: ChatMessage.getSpeaker({ alias: "Thraugrim", }),
                content: texte
            };
            ChatMessage.create(chatData, {});
          }
        });
    }
  }