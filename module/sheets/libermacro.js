export class LiberActorSheet extends ActorSheet {
  Hooks.on('renderItemSheet5e', (app, html, data) => {
  const item = data.item;
  const itemType = item.type;

  const rollMacro = (itemId) => {
    const item = sheet.actor.items.get(itemId);
    if (!item) return;
    const itemType = item.data.type;

    if (itemType === 'spell') {
      // Exécuter la macro de sort
      const spell = item.getSpellData();
      const chatData = {
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({ actor: sheet.actor }),
        content: `Prepare to cast ${spell.name}...`
      };
      ChatMessage.create(chatData);
      item.roll();
    } else if (itemType === 'weapon') {
      // Exécuter la macro d'attaque de l'arme
      const attackData = item.getAttackData();
      const chatData = {
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({ actor: sheet.actor }),
        content: `Prepare to attack with ${item.name}...`
      };
      ChatMessage.create(chatData);
      item.rollAttack(attackData);
    } else if (itemType === 'consumable') {
      // Exécuter la macro de consommable
      const chatData = {
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({ actor: sheet.actor }),
        content: `Use ${item.name}...`
      };
      ChatMessage.create(chatData);
      item.roll();
    }
  };

  const dragData = {
    type: 'Item',
    data: item,
    dragstart: ev => {
      ev.stopPropagation();
      ev.dataTransfer.setData('text/plain', JSON.stringify(dragData));
    }
  };

  html.find('.item-name h4').attr('draggable', true).on('dragstart', dragData.dragstart);

  if (itemType !== 'spell') {
    const data = item.data.data;
    const macroData = {
      name: item.name,
      type: 'script',
      img: item.img,
      command: `game.dnd5e.rollItemMacro('${item._id}')`,
      flags: {
        'dnd5e.itemMacro': true
      }
    };
    let macro = game.macros.entities.find(m => (m.data.flags?.dnd5e?.itemMacro) && (m.data.command === macroData.command));
    if (!macro) macro = Macro.create(macroData);
    html.find('.item-image').on('dblclick', () => macro.execute());
  }
});


*


const item = sheet.actor.items.get(itemId);
const itemType = item.data.type;

const rollMacro = (itemId) => {
  const item = sheet.actor.items.get(itemId);
  if (!item) return;
  const itemType = item.data.type;

  if (itemType === 'spell') {
    // Exécuter la macro de sort
    const spell = item.getSpellData();
    const chatData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({ actor: sheet.actor }),
      content: `Prepare to cast ${spell.name}...`
    };
    ChatMessage.create(chatData);
    item.roll();
  } else if (itemType === 'weapon') {
    // Exécuter la macro d'attaque de l'arme
    const attackData = item.getAttackData();
    const chatData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({ actor: sheet.actor }),
      content: `Prepare to attack with ${item.name}...`
    };
    ChatMessage.create(chatData);
    item.rollAttack(attackData);
  } else if (itemType === 'consumable') {
    // Exécuter la macro de consommable
    const chatData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({ actor: sheet.actor }),
      content: `Use ${item.name}...`
    };
    ChatMessage.create(chatData);
    item.roll();
  }
};

game.dnd5e.rollItemMacro = (itemId) => {
  rollMacro(itemId);
};

}



*


export async function createRollItemMacro(data, slot) {
  if ( data.type !== "Item" ) return;
  if (!( "data" in data ) ) return ui.notifications.warn("You can only create macro buttons for owned Items");
  const item = data.data;

  // Create the macro command
  const command = `game.fs2e.macros.rollItemMacro("${item.name}");`;
  let macro = game.macros.entities.find(m => (m.name === item.name) && (m.command === command));
  if ( !macro ) {
    macro = await Macro.create({
      name: item.name,
      type: "script",
      img: item.img,
      command: command,
      flags: {"fs2e.itemMacro": true}
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}
