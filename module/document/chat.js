export default class LiberChat {

    constructor(actor) {
        this.actor = actor;
        this.chat = null;
        this.content = null;
        this.template = null;
        this.data = null;
        this.chatData = null;
        this.flags = null;
        this.rolls = null;
        this.type = null;
    }

    /** @returns the instance */
    withContent(type) {
        this.type = type;
        return this;
    }

    /** @returns the instance */
    withTemplate(template) {
        this.template = template;
        return this;
    }

    /** @returns the instance */
    withData(data) {
        this.data = data;
        return this;
    }

    /** @returns the instance */
    withFlags(flags) {
        this.flags = flags;
        return this;
    }

    /** @returns the instance */
    withRolls(rolls) {
        this.rolls = rolls;
        return this;
    }

    /**
     * @description Creates the chat message
     * @returns this instance or null
     */
    async create() {
        if (this.template && this.data) {
            this.content = await this._createContent();
        }

        if (!this.content) {
            return null;
        }

        const messageData = {
            user: game.user.id,
            speaker: {
                actor: this.actor.id,
                alias: this.actor.name,
                scene: null,
                token: null,
            },
            content: this.content,
            style: CONST.CHAT_MESSAGE_STYLES.OTHER,
            rolls: []
        };

        if (this.rolls) {
            const pool = foundry.dice.terms.PoolTerm.fromRolls(this.rolls);
            messageData.rolls.push(Roll.defaultImplementation.fromTerms([pool]));
        }

        if (this.flags) {
            messageData.flags = this.flags;
        }

        // Foundry v14 : valeurs de messageMode = "public", "gm", "blind", "self"
        const mode = game.settings.get('core', 'messageMode');
        switch (mode) {
            case 'gm':
                messageData.whisper = ChatMessage.getWhisperRecipients('GM').map(u => u.id);
                break;
            case 'blind':
                messageData.whisper = ChatMessage.getWhisperRecipients('GM').map(u => u.id);
                messageData.blind = true;
                break;
            case 'self':
                messageData.whisper = [game.user.id];
                break;
            // 'public' : pas de whisper
        }

        this.chatData = messageData;
        return this;
    }

    /** @private */
    async _createContent() {
        const d = foundry.utils.duplicate(this.data);
        d.owner = this.actor.id;
        d.mode  = game.settings.get('core', 'messageMode');
        return await foundry.applications.handlebars.renderTemplate(this.template, d);
    }

    /** @description Displays the chat message */
    async display() {
        this.chat = await ChatMessage.implementation.create(this.chatData);
        return this;
    }
}