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

Hooks.on('renderActorSheet', (sheet, html) => {
  // Récupérer la liste d'items dans la fiche du personnage
  const items = html.find('.sheet-body li');
  const stat=html.find('.stat2 label');
  
  // Ajouter l'événement de drag sur chaque item
  items.each((index, item) => {
    $(item).attr('draggable', true);
    $(item).on('dragstart', (event) => {
      event.originalEvent.dataTransfer.setData('text/plain', $(item).data('item-id'));
    });
  });

  // Ajouter l'événement de drag sur chaque item
  stat.each((index, item) => {
    $(item).attr('draggable', true);
    $(item).on('dragstart', (event) => {
      event.originalEvent.dataTransfer.setData('text/plain', $(stat).data('name'));
    });
  });


  // Ajouter l'événement de drop sur la barre des macros
  const macroBar = $('.macro');
  macroBar.on('drop', async (event) => {
    event.preventDefault();
    const statId=['physique','force','agilite','social','charisme','sagacite','mental','ast','memoire']
    const itemId = event.originalEvent.dataTransfer.getData('text/plain');
    let item='';let command='';
    if (statId.includes(itemId)) {
      item = {
        name:itemId,
        img:'systems/liber/assets/item/'+itemId+'.jpg',
      };
      command='let r = new Roll("1d100");roll=r.evaluate({"async": false});ChatMessage.create({user: game.user._id,speaker: ChatMessage.getSpeaker({token: actor}),content: `<span style="flex:auto"><p class="resultatp"><img src="'+item.img+'"  width="24" height="24"/>&nbsp;Utilise '+item.name+'<p><div class="dice-roll"><div class="dice-result"><div class="dice-formula">`+r.result+`</div><h4 class="dice-total">`+r.total+`</h4></div></div>`});';
      //recupérer la posture
      //tester la posture
      //recuperer les bonus
      //tester le resultat
      //affiche le texte
    }else {
      item = sheet.actor.items.get(itemId);
      command='let r = new Roll("'+item.system.degats+'");roll=r.evaluate({"async": false});ChatMessage.create({user: game.user._id,speaker: ChatMessage.getSpeaker({token: actor}),content: `<span style="flex:auto"><p class="resultatp"><img src="'+item.img+'"  width="24" height="24"/>&nbsp;Utilise '+item.name+'<p>'+item.system.description+'<div class="dice-roll"><div class="dice-result"><div class="dice-formula">`+r.result+`</div><h4 class="dice-total">`+r.total+`</h4></div></div>`});';

    }
    if (item) {
      const macroData = {
        name: item.name,
        type: 'script',
        img: item.img,
        command: command,
        flags: {"liber.itemMacro": true}
      };
      const macro = await Macro.create(macroData);
      const macroSlot = $(event.target).closest('.macro').data('slot');
      //game.user.assignHotbarMacro(macro, macroSlot);
      let mArray = game.user.getHotbarMacros(1);
      let existingMacro = mArray[macroSlot];
      if (existingMacro.macro) {
        existingMacro.update(macro);
      } else {
        game.user.assignHotbarMacro(macro, macroSlot);
      }
      
    }
  });

  // Permettre le drop sur la barre des macros
  macroBar.on('dragover', (event) => {
    event.preventDefault();
  });

  // Ajouter l'événement de dragenter sur la barre des macros
  macroBar.on('dragenter', (event) => {
    event.preventDefault();
  });
});

