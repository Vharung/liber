export class SortsPossibles {
    constructor(mag0, mag1, mag2, mag3, mag4, mag5, metier, reli, clan, cout) {
        this.mag0 = mag0 || 'aucun';
        this.mag1 = mag1 || 'aucun';
        this.mag2 = mag2 || 'aucun';
        this.mag3 = mag3 || 'aucun';
        this.mag4 = mag4 || 'aucun';
        this.mag5 = mag5 || 'aucun';
        this.metier = metier;
        this.reli = reli;
        this.clan = clan;
        this.cout = cout;
    }

    async getListeSorts() {
        const pack = game.packs.get('liber.magie');
        const tables = await pack.getDocuments();
        let listem;
        if (this.mag1 === 'autre' || this.mag2 === 'autre') {
            listem = tables.filter(value =>
                value.system.cout === "X" || parseInt(value.system.cout) <= this.cout
            ).map(value => ({
                'name': value.name,
                'img': value.img,
                'cible': value.system.cible,
                'classe': value.system.classe,
                'cout': value.system.cout,
                'degat': value.system.degats,
                'description': value.system.description,
                'duree': value.system.duree
            })).sort((a, b) => a.cout - b.cout);
        } else {
            listem = tables.filter(value =>
                value.system.classe === this.mag0 ||
                value.system.classe === this.mag1 ||
                value.system.classe === this.mag2 ||
                value.system.classe === this.mag3 ||
                value.system.classe === this.mag4 ||
                value.system.classe === this.mag5 ||
                this.mag1 === game.i18n.localize("liber.avantrace78")
            ).filter(value =>
                value.system.cout === "X" || parseInt(value.system.cout) <= this.cout
            ).map(value => ({
                'name': value.name,
                'img': value.img,
                'cible': value.system.cible,
                'classe': value.system.classe,
                'cout': value.system.cout,
                'degat': value.system.degats,
                'description': value.system.description,
                'duree': value.system.duree
            })).sort((a, b) => a.cout - b.cout);
        }
        return listem;
    }
}
