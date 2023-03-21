Hooks.on('renderChatMessage', (message, html) => {
  html.find('.roll-damage').click(event => {
    const button = event.currentTarget;
    const actorId = button.dataset.actorid;
    const dice = button.dataset.dice;
    const img = button.dataset.img;
    const name =button.dataset.name;
    const desc =button.dataset.desc;

    const actor = game.actors.get(actorId);
    //const damageRoll = new Roll(dice).roll();
    let r = new Roll(dice);
    var roll=r.evaluate({"async": false});
    const command='<span style="flex:auto"><p class="resultatp"><img src="'+img+'"  width="24" height="24"/>&nbsp;Utilise '+name+'<p>'+desc+'<div class="dice-roll"><div class="dice-result"><div class="dice-formula">'+r.result+'</div><h4 class="dice-total">'+r.total+'</h4></div></div>';

    const chatData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      content:command,
      type: CONST.CHAT_MESSAGE_TYPES.OTHER
    };

    ChatMessage.create(chatData, {});
  });
});




