import {names, items0, items1, items2, items3, items4, metiers, races, clans, demeure, proximite, lieu, famille,titre,rang, organisation, intret, pertes, expece, valeur, prof, loisir, caracterelist, personnalitelist, visionlist, objectiflist, ouinon, tarelist} from "./const.js";
 export class CaracteristiqueModifier {
  constructor(valeursCpts, breed, newperso, ment, soci, phys, level, compt, faible, clan, listsort, hpmax, psyvalue, hp, psy, type, insoin,race) {
    this.valeursCpts = valeursCpts; // Tableau des caractéristiques initiales
    this.breed = breed; // Informations sur la race, qui doit avoir la méthode `hasOwnProperty`
    this.newperso = newperso; // Nouveau personnage qui peut générer des informations de clan
    this.ment = ment; // Mental
    this.soci = soci; // Social
    this.phys = phys; // Physique
    this.level = level; // Niveau
    this.compt = compt; // Compétence
    this.faible = faible; // Faiblesse
    this.clan = clan; // Clan
    this.listsort = listsort; // Liste des sorts
    this.hpmax = hpmax;
    this.psyvalue = psyvalue;
    this.hp = hp;
    this.psy = psy;
    this.type = type;
    this.insoin = insoin;
    this.race = race;
  }

  modifier() {
    // Stat base
    let b_psy = Math.round((parseInt(this.ment) + parseInt(this.soci)/2 - parseInt(this.phys) + 5) / 4 + 2);
    let b_nb = Math.round(parseInt(b_psy) / 4) + 1 + parseInt(this.level);
    let b_cout = Math.round((parseInt(b_psy) - parseInt(b_nb)) / 2) + 3;
    if(b_cout<0){b_cout=0}
    if (this.compt === "t6") {//bug potentielle
        b_psy += 5;
    }

    // Stat actuel
    let PVmin = Math.round(parseInt(this.phys) / 3);
    if (this.compt === "t37") {//bug potentielle
        PVmin += 5;
    }
    if (this.faible === "f14") {//bug potentielle
        PVmin -= 5;
    }
    let PSYmin = b_psy;
    let cout = 0;
    if (this.clan === "c18") {
        cout = parseInt(this.level); // corbeau
        b_nb = parseInt(this.level) + 2;
    } else {
        cout = b_cout + (this.psy - b_psy);
    }
    if(cout<0) cout=0;
    const listsort = this.listsort; 
    const nbsorts = listsort.length;
    let calsort = parseInt(b_nb) - parseInt(nbsorts);
    if (this.compt == "t23") {
        calsort = parseInt(calsort) + 1;
    }
    let color1 = 'color:white;';
    let color2 = 'color:white;';
    let apsy = '';
    let apsymax = '';
    let ahp = '';
    let ahpmax = '';
    if (calsort < 0) {
        color1 = 'color:red';
    }

    // Verif stat 
    let hpmax = this.hpmax;
    let psyvalue = this.psyvalue;
    let hp = this.hp;
    let psy = this.psy;

    if (hpmax < PVmin && this.type === game.i18n.localize("TYPES.Actor.personnage") && hpmax !== 0) {
        hpmax = PVmin;
    }
    if (psy < PSYmin && this.type === game.i18n.localize("TYPES.Actor.personnage") && psy !== 0 && this.clan !== "c18") {
        psy = PSYmin;
    }
    console.log(hpmax)
    console.log(this.race)

    if(this.race=='r16'){
        PSYmin=parseInt(PVmin) + parseInt(PSYmin)
        PVmin==0;
        psy=parseInt(hpmax) + parseInt(psy);
        hpmax=0;
    }
    console.log(hpmax)
    const pointxp = (parseInt(this.level) - 1) * 3;
    const xp = parseInt(pointxp) + parseInt(PVmin) + parseInt(PSYmin);
    const calcultotxp = parseInt(hpmax) + parseInt(psy);console.log(psy)
    console.log(calcultotxp+">"+xp)
    if (calcultotxp > xp && this.type === game.i18n.localize("TYPES.Actor.personnage")) {
        apsy = 'background:red';
        apsymax = 'background:red';
        ahp = 'background:red';
        ahpmax = 'background:red';
    }
    if (parseInt(hp) > parseInt(hpmax)) {
        hp = hpmax;
    }
    if (parseInt(psyvalue) > parseInt(psy)) {
        psyvalue = psy;
    }

    // Insoignable
    const insoin = this.insoin;
    /*const hpinsoin=parseInt(hpmax) + parseInt(insoin)
    if (hpmax < hpinsoin) {
        hp = parseInt(hpmax) - parseInt(insoin);
    }*/
    if (hp >= hpmax && insoin > 0) {
      hp = parseInt(hpmax) - parseInt(insoin);
      hpadd = parseInt(hpadd) - parseInt(insoin);
    }


    return { 
      hpmax: hpmax,
      hp: hp,
      psy: psy,
      psyvalue: psyvalue,
      color1: color1,
      color2: color2,
      apsy: apsy,
      apsymax: apsymax,
      ahp: ahp,
      ahpmax: ahpmax,
      calsort: calsort,
      cout:cout
    };
  }
}
