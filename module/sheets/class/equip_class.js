/*arme et equipement*/
export class EquipementManager {
    constructor(actor) {
        this.actor = actor;
        this.listeArmes = armes;
        this.equipes = {
            DROITE: ["droite", "ddroite"],
            GAUCHE: ["gauche", "dgauche"]
        };
        this.equipesArmes = {
            droite: ['armed', 'degatd', 'imgd', 'desd'],
            gauche: ['armeg', 'degatg', 'imgg', 'desg']
        };
    }

    _clearArme(equipe) {
        this.equipesArmes[equipe].forEach(attr => {
            this.actor.system.armeuse[attr] = "";
        });
    }

    _equipArme(equipe, name, degat, img, des) {
        const attrs = this.equipesArmes[equipe];
        attrs.forEach((attr, index) => {
            this.actor.system.armeuse[attr] = index === 0 ? name : index === 1 ? degat : index === 2 ? img : des;
        });
    }

    _checkArmeInListe(arme) {
        return this.listeArmes.some(listedArme => arme.includes(listedArme));
    }

    _isEquipe(equipe) {
        return Object.values(this.equipes).flat().includes(equipe);
    }

    _getArmorFromRace() {
        return this.actor.system.race === "r0" ? 2 : 0;
    }

    _updateProtection(armor) {
        this.actor.update({'system.protection': armor});
    }

    _updateArmeAttributes(equipe, name, degat, img, des) {
        if (this._isEquipe(equipe)) {
            if (this._checkArmeInListe(name)) {
                const equipeName = equipe === "DROITE" ? "droite" : "gauche";
                this._clearArme(equipeName === "droite" ? "gauche" : "droite");
                this._equipArme(equipeName, name, degat, img, des);
            } else {
                this._clearArme(equipe);
            }
        }
    }

    _updateArmureAttributes(equipe, name, des, img) {
        if (equipe === 'armure') {
            this.actor.system.armeuse.arm = name;
            this.actor.system.armeuse.desa = des;
            this.actor.system.armeuse.imga = img;
        } else if (equipe === 'darmure') {
            this.actor.system.armeuse.arm = "";
            this.actor.system.armeuse.desa = "";
            this.actor.system.armeuse.imga = "";
        }
    }

    _calculateArmor(armed, armeg, arm) {
        let armor = this._getArmorFromRace();//big potentiel
        if(armed==game.i18n.localize('liber.arme13')){armor=armor+1;}
        else if(armed==game.i18n.localize('liber.arme34')){armor=armor+2;}
        if(armeg==game.i18n.localize('liber.arme13')){armor=armor+1;}
        else if(armeg==game.i18n.localize('liber.arme34')){armor=armor+2;}
        if(arm==game.i18n.localize('liber.arme13')){armor=armor+1;}
        else if(arm==game.i18n.localize('liber.arme35')){armor=armor+1;}
        else if(arm==game.i18n.localize('liber.arme34')){armor=armor+2;}
        else if(arm==game.i18n.localize('liber.arme36')){armor=armor+2;}
        else if(arm==game.i18n.localize('liber.arme37')){armor=armor+3;}
        else if(arm==game.i18n.localize('liber.arme38')){armor=armor+4;} 
        return armor;
    }

    updateEquipment(event) {
        const equipe = event.target.dataset["equip"];
        let { armure } = this.actor.system;
        let { armed, degatd, imgd, desd, armeg, degatg, imgg, desg } = this.actor.system.armeuse;
        const { img, des, name, degat } = event.target.dataset;
        let armor = 0;

        if (this._isEquipe(equipe)) {
            this._updateArmeAttributes(equipe, name, degat, img, des);
        } else {
            this._updateArmureAttributes(equipe, name, des, img);
        }

        armor = this._calculateArmor(armed, armeg, armure);
        this._updateProtection(armor);
    }
}