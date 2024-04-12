export class CharacterGenerator {
    constructor() {
        this.age = Math.floor((Math.random() * 34) + 16);
        this.items = [];
        this.initializeItems();
    }

    initializeItems() {
        for (let i = 1; i <= 5; i++) {
            let items = [];
            for (let j = 1; j <= 20; j++) {
                items.push(game.i18n.localize(`liber.lang${20 * (i - 1) + j}`));
            }
            this.items.push(items);
        }
    }

    getRandomItem(listIndex) {
        return this.items[listIndex][Math.floor(Math.random() * this.items[listIndex].length)];
    }

    generateText() {
        let nomville = this.getRandomItem(0);
        let evenement = this.getRandomItem(1);
        let tonchoix = this.getRandomItem(2);
        let motivation = this.getRandomItem(3);
        let signeastro = this.getRandomItem(4);

        return `${game.i18n.localize("liber.lang77")} ${this.age} ${game.i18n.localize("liber.lang78")} ${nomville}. ${game.i18n.localize("liber.lang79")} ${evenement}, ${motivation} ${game.i18n.localize("liber.lang80")} ${tonchoix}. ${game.i18n.localize("liber.lang82")} ${signeastro}`;
    }
}