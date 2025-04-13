
/*Macro*/
export class Macros {
    static createLiberMacro = async function(bar, data, slot) {
        console.log("🔥 Objet déplacé sur la hotbar :", data);

        if (data.type !== "Item") return;
        
        let item = await fromUuid(data.uuid);
        if (!item) {
            console.error("❌ Item introuvable !");
            return;
        }

        console.log("🖼 Image :", item.img, "⚔ Dégâts :", item.system.degat);

        let macroName = `Attaque : ${item.name}`;
        let macroCommand = `
            (async () => {
                let item = await fromUuid("${data.uuid}");
                if (!item) {
                    ui.notifications.error("Item introuvable !");
                    return;
                }
                let uuid=${data.uuid};
                let uuidParts = uuid.split(".");
                let actorId = uuidParts[1]; // ID de l'acteur
                let itemId = uuidParts[3];  // ID de l'item

                let type = item.type
                let degats = item.system.degat;

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
                                    const userInput = html[0].querySelector('[name="userInput"]').value;
                                    const userposture = html[0].querySelector('[name="userposture"]').value;
                                    const userability = html[0].querySelector('[name="userability"]').value;
                                    callback(userInput, userposture, userability);
                                },
                            },
                        },
                        default: "ok",
                    }).render(true);
                }
                return showInputDialogWithSelect((userInput, userposture, userability) => {
                    ui.notifications.info(\`L'attaque de \${item.name} inflige \${degats} dégâts !\`);
                    console.log(userability,userposture,userInput)
                });
            })();
        `;

        // Vérifier si la macro existe déjà
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

        // Retarder l'ajout pour éviter un conflit
        setTimeout(async () => {
            await game.user.assignHotbarMacro(null, slot);
            await game.user.assignHotbarMacro(existingMacro, slot);
            await ui.hotbar.render();
            console.log(`✅ Macro "${existingMacro.name}" assignée au slot ${slot} !`);
        }, 100); // 🔄 Petit délai pour éviter un conflit

        ui.notifications.info(`✅ Ajout de "${item.name}" à la hotbar !`);
    }
}