Hooks.on('renderChatMessage', (message, html) => {
  // Gestion du clic sur le bouton de roll de dégâts
  html.find('.roll-damage').click(async event => {  // Ajout de 'async' ici pour utiliser 'await'
    const button = event.currentTarget;
    const actorId = button.dataset.actorid;
    const dice = button.dataset.dice;
    const img = button.dataset.img;
    const name = button.dataset.name;
    const desc = button.dataset.desc;

    const actor = game.actors.get(actorId);
    let r = await new Roll(dice).evaluate();  // Ajout de 'await' ici pour attendre l'évaluation du jet de dés
    let retour = r.result;

    const command = `<span style="flex:auto"><p class="resultatp"><img src="${img}"  width="24" height="24"/>&nbsp;${game.i18n.localize("liber.use")} ${name}<p>${desc}<div class="dice-roll"><div class="dice-result"><div class="dice-formula">${r.result}</div><h4 class="dice-total">${r.total}</h4></div></div>`;

    /*const chatData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      content: command,
      type: CONST.CHAT_MESSAGE_TYPES.OTHER
    };

    ChatMessage.create(chatData, {});*/
    if (r && command) {
        await r.toMessage({
          user: game.user._id,
          speaker: ChatMessage.getSpeaker({ actor: actor }),
          content: command
        });
    }

  });

  // Gestion du clic sur le bouton d'ajout de fatigue
  html.find('.addfats').click(event => {
    const button = event.currentTarget;
    const actorId = button.dataset.actorid;
    const actor = game.actors.get(actorId);
    let fatigue = actor.system.fatigue;
    fatigue++;
    actor.update({'system.fatigue': fatigue});
  });
});