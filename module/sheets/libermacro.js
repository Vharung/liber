export class LiberActorSheet extends ActorSheet {
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

  game.liber.rollItemMacro = (itemId) => {
    rollMacro(itemId);
  };
}
