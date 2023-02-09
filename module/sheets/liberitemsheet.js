/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Items}
 */
 export class LiberItemSheet extends ItemSheet{
    get template(){
        console.log(`Liber | Récupération du fichier html ${this.item.type}-sheet.`);
        return `systems/liber/templates/sheets/${this.item.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);
        return data;
    }

    activateListeners(html){
        super.activateListeners(html);
        html.find('.generer2').click(this._onGenerator2.bind(this));
    }

    _onGenerator2(event){
        let type=this.document.type;
        let arme = ["Dague","poignard","Masse d'arme","Hachette","Javelot","Lance courte","Épée courte","Épée","Sabre","Gourdin","Rapière","Espadon","Hache de bataille","Hallebarde","Baton","Masse lourde","Fléaux d'armes","Lance lourde","Épée à deux main","Faux de guerre","Fronde","Javelot","Arbalète de poing","Arbalète","Arc","Arc long","Épée courte"]
        let armure =["Bouclier","Bouclier rond (vicking)","Grand bouclier","Tenue","Gantelet de protection","Pantalon","Cuirasse","Epaulette","Plastron","Armet","Casque","Chapeau","Armure","Epaulière","Brassard"]
        let objet=["Talisman","Orbe","Amulette","Pendentif","Bague","Bracelet","couronne","Ceinture"]
        let nom=["d'espérance","flamboyant(e)","de fer","de cuivre","de bronze","de cuir","du mage","poupre","rose","de soie","de l'ordre du dragon","de l'ordre du temple","de Vharung","ancien(ne)","rouillé(e)","usé(e)","du soleil","de la secte de weithra","lumineux(se)","d'acier"]
        let effetarmure=["+5 en charisme","+5 en sagacité","Permet de rejouer un tour supplémentaire (unique)","Si un effet touche l'armure, sur un jet de chance, l'ennemi est propulsé en arrière et subit 1d4 de dégats","Donne +2 d'armure face à la magie","Soigne 1d4 par coup subit","Annule les 20 premiers point de dégat (unique)","inflige des dégats de foudre (1d4)","inflige des dégats de poison (1d4)","inflige des dégats de feu (1d4)","diminue les coups subit en physique de moitié","diminue les coups magiques de moitié","augmente la chance de 10%","augmente le social de 5%","augmente le physique de 5%","augmente le mental de 5%","diminue le coup magique de 1 psy","restaure 1 psy par tour","augmente la réussite critique de 5% (une seul utilisation)"]
        let effetarme=["+5 en force","+5 en agilité","Créature liés - 6 PV","berserk : Uniquement en mode offensif, double les dégâts au combat, non cumulable avec d'autres sorts de boost - perd 3 PV par tour","Accumule la moitié des dégats infligé, cette accumulation peut être libéré sur un ennemi à tous moments.","A chaque personne tué avec cette arme, vous pouvez invoquer un squelette","Récupère 1d4 de PV par attaque réussite","inflige des dégats de foudre (1d4)","inflige des dégats de poison (1d4)","inflige des dégats de feu (1d4)","augmente les chances de réussite d'attaque de 5%","augmente les chances de réussite de défense de 5%","Sur un test de physique raté, l'ennemi est assommé pour 1d4 tour","restaure 1 psy par tour","augmente la réussite critique de 5% (une seul utilisation)"]
        let effetobjet=["Bloque le temps (unique)","+5 en mémoire","+5 en astuce","Permet de rejouer un tour supplémentaire (unique)","Donne +2 d'armure face à la magie","Soigne 1d4 par coup subit","Annule les 20 premiers point de dégat (unique)","augmente la chance de 10%","augmente le social de 5%","augmente le physique de 5%","augmente le mental de 5%","diminue le coup magique de 1 psy","restaure 1 psy par tour","augmente la réussite critique de 5% (un seul utilisation)"]
        let item_type=''
        if(type=='objet'){
            item_type= objet[Math.floor(Math.random()*objet.length)];
        }else if(type=='arme'){
            item_type= arme[Math.floor(Math.random()*arme.length)];
        }else if(type=='armure'){
            item_type= armure[Math.floor(Math.random()*armure.length)];
        }
        let point=0;
        let item_nom= nom[Math.floor(Math.random()*nom.length)];
        if(item_nom=="acier"){point=point+1;}
        if(item_nom=="ancienne" || item_nom=="rouillé" || item_nom=="usée"){point=point-2;}
        if(item_nom=="de cuivre" || item_nom=="de bronze" || item_nom=="de cuir"){point=point-1;}
        if(item_nom=="de soie"){point=0;} 
        let restriction=""; let item_effet='';
        if(point >2){
            restriction=". Pas pour les dragons, troubadour, voleur ou mage."
        }else if(point<0){point=0;} 
        if(type=="arme"){
            item_effet= effetarme[Math.floor(Math.random()*effetarme.length)];
        }else if(type=="armure"){
            item_effet= effetarmure[Math.floor(Math.random()*effetarmure.length)];
            item_effet+=" - protection : "+point+" d'armure "+restriction;
        }else {
            item_effet= effetobjet[Math.floor(Math.random()*effetobjet.length)];
        }
        let cout=Math.floor(Math.random()*10)*100;
        let poids=Math.floor(Math.random()*10);
        this.document.update({'name':item_type+' '+item_nom,'system.description':item_effet+' '+restriction,'system.valeur':cout,'system.poids':poids})

    }
}