Hooks.on('renderChatMessage', (message, html) => {
  html.find('.roll-damage').click(event => {
    const button = event.currentTarget;
    const actorId = button.dataset.actorid;
    const dice = button.dataset.dice;
    const img = button.dataset.img;
    const name =button.dataset.name;

    const actor = game.actors.get(actorId);
    //const damageRoll = new Roll(dice).roll();
    let r = new Roll(dice);
    var roll=r.evaluate({"async": false});
    let retour=r.total; 
    console.log(retour)
    
    const chatData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      content: `<span style="flex:auto"><p class="infosort"><span class="resultatp" style="cursor:pointer"><img src="${img}
    "  width="24" height="24"/>&nbsp;Le résultat du sort : ${name} est <span style="color:rgb(255 87 51);display: contents;font-weight: bold;font-size: 1.5em;"> ${retour}</span> avec ${dice}</div>`,
      type: CONST.CHAT_MESSAGE_TYPES.OTHER
    };

    ChatMessage.create(chatData, {});
  });
});

