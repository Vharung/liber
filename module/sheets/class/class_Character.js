import {names, items0, items1, items2, items3, items4, metiers, races, clans, demeure, proximite, lieu, famille,titre,rang, organisation, intret, pertes, expece, valeur, prof, loisir, caracterelist, personnalitelist, visionlist, objectiflist, ouinon, tarelist} from "./const.js";

// Classe pour gérer le personnage
export class Character {
  constructor(sexe, race, talent, faiblesse, clan, religion, profession) {
    this.sexe = sexe;
    this.race = race;
    this.talent = talent;
    this.faiblesse = faiblesse;
    this.clan = clan;
    this.religion = religion;
    this.profession = profession;  
    this.baseUrl = 'systems/liber/assets/avatar/';  // Chemin de base pour les avatars 
  }

  // Méthode pour générer les caractéristiques du personnage
  characterName(sexe, raceLabel) {
    let race = Object.keys(names).find(key => game.i18n.localize(key) === raceLabel);
  // Vérifier si la race est trouvée
    if (!race) {
        console.error("Race not found for label: ", raceLabel);
        return "";
    }
  	let nameList = names[race];
    let name = "";
    // Vérifier si la race a des noms spécifiques pour les sexes ou si les noms sont neutres
    if (nameList.hasOwnProperty('Female') && nameList.hasOwnProperty('Male')) {
      // Sélectionner un nom au hasard pour le sexe approprié
      if(sexe=="sex0"){sexe='Male';}
      name = nameList[sexe][Math.floor(Math.random() * nameList[sexe].length)];
    } 
    if (nameList.hasOwnProperty('Famille')){
      // Sélectionner un nom au hasard pour le sexe approprié
      name =name+" "+nameList['Famille'][Math.floor(Math.random() * nameList['Famille'].length)];
    } else {
      // Sélectionner un nom au hasard dans la liste neutre
      if(race=="r0"){
      	name = nameList[Math.floor(Math.random() * nameList.length)]+nameList[Math.floor(Math.random() * nameList.length)];
      	name = name.charAt(0).toUpperCase() + name.slice(1);
      }else {
      	name = nameList[Math.floor(Math.random() * nameList.length)];
      }
      
    }
    return name;
  }

  characterStory(sexe, race) {
  	let age = Math.floor((Math.random() * 34) + 16);
  	let nomville=game.i18n.localize(items0[Math.floor(Math.random()*items0.length)]);
    let evenement = game.i18n.localize(items1[Math.floor(Math.random()*items1.length)]);
    let tonchoix=game.i18n.localize(items2[Math.floor(Math.random()*items2.length)]);
    let motivation  = game.i18n.localize(items3[Math.floor(Math.random()*items3.length)]);
    let signeastro = game.i18n.localize(items4[Math.floor(Math.random()*items4.length)]);
    let textgen =game.i18n.localize("liber.lang77")+' '+age+' '+game.i18n.localize("liber.lang78")+' '+nomville+'. '+game.i18n.localize("liber.lang79")+' '+evenement+", "+motivation+' '+game.i18n.localize("liber.lang80")+' '+tonchoix+'. '+game.i18n.localize("liber.lang82")+' '+signeastro;
    return textgen;
  }

  characterStat(race,clan,religion,professionLabel){
    let profession = Object.keys(metiers).find(key => game.i18n.localize(key) === professionLabel);
  	const metierStats = metiers[profession];
	  if (profession) {
	    return metierStats;
	  } else {
	    console.error("Métier non trouvé : ", profession);
	    return null;
	  }
  }


  characterRace(raceLabel){
    let race = Object.keys(races).find(key => game.i18n.localize(key) === raceLabel);
    const raceStats = races[race];
    return raceStats;
  }

  characterClan(clanLabel) {
    if (!clanLabel) {
        console.error("L'objet clans n'est pas défini.");
        return [null,null,0];
    }
    let clan = Object.keys(clans).find(key => game.i18n.localize(key) === clanLabel);
    if (!clan) {
        console.error("Clan : "+clan+", introuvable pour le label donné.");
        return [null,null,0];
    }

    const clanStats = clans[clan];
    return clanStats;
  }
  
  characterCaract(){
  	const resident = game.i18n.localize(demeure[Math.floor(Math.random()*demeure.length)])+" "+game.i18n.localize(proximite[Math.floor(Math.random()*proximite.length)])+" "+game.i18n.localize(lieu[Math.floor(Math.random()*lieu.length)]);
    const sang = game.i18n.localize(titre[Math.floor(Math.random()*titre.length)])+" de la famille "+game.i18n.localize(famille[Math.floor(Math.random()*famille.length)]);
    const politique=game.i18n.localize(rang[Math.floor(Math.random()*rang.length)])+" "+game.i18n.localize(organisation[Math.floor(Math.random()*organisation.length)]);
    const groupe=game.i18n.localize(intret[Math.floor(Math.random()*intret.length)]);
    const dc=game.i18n.localize(pertes[Math.floor(Math.random()*pertes.length)]);
    const moral=game.i18n.localize(valeur[Math.floor(Math.random()*valeur.length)]);
    const amour=game.i18n.localize(expece[Math.floor(Math.random()*expece.length)])+" "+game.i18n.localize(rang[Math.floor(Math.random()*rang.length)])+" "+game.i18n.localize(organisation[Math.floor(Math.random()*organisation.length)]);
    const ami=game.i18n.localize(expece[Math.floor(Math.random()*expece.length)])+" "+game.i18n.localize(rang[Math.floor(Math.random()*rang.length)])+" "+game.i18n.localize(organisation[Math.floor(Math.random()*organisation.length)]);
    const haine=game.i18n.localize(expece[Math.floor(Math.random()*expece.length)])+" "+game.i18n.localize(rang[Math.floor(Math.random()*rang.length)])+" "+game.i18n.localize(organisation[Math.floor(Math.random()*organisation.length)]);
    const metier1=game.i18n.localize(prof[Math.floor(Math.random()*prof.length)]);
    const metier2=game.i18n.localize(prof[Math.floor(Math.random()*prof.length)]);
    const metier3=game.i18n.localize(loisir[Math.floor(Math.random()*loisir.length)]);
    const caractere=game.i18n.localize(caracterelist[Math.floor(Math.random()*caracterelist.length)]);
    const personnalite=game.i18n.localize(personnalitelist[Math.floor(Math.random()*personnalitelist.length)]);
    const vision="Rempli de "+game.i18n.localize(visionlist[Math.floor(Math.random()*visionlist.length)]);
    const objectif=game.i18n.localize(objectiflist[Math.floor(Math.random()*objectiflist.length)]);
    const racune=game.i18n.localize(ouinon[Math.floor(Math.random()*ouinon.length)]);
    const tare=game.i18n.localize(tarelist[Math.floor(Math.random()*tarelist.length)]);
    const obsession=game.i18n.localize(ouinon[Math.floor(Math.random()*ouinon.length)]);
    const distingue=game.i18n.localize(ouinon[Math.floor(Math.random()*ouinon.length)]);
    return {resident,sang,politique,groupe,dc,moral,amour,ami,haine,metier1,metier2,metier3,caractere,personnalite,vision,objectif,racune,tare,obsession,distingue};
  }

  // Méthode pour déterminer le chemin du dossier en fonction de la race
   async AvatarPath(raceLabel, sexe) {
        let race = Object.keys(races).find(key => game.i18n.localize(key) === raceLabel);
        const raceMap = {
            'r0': 'dragon/',
            'r21': 'elfe/',
            'r1': 'humain/',
            'r2': 'demon/',
            'r3': 'drauch/',
            'r4': 'rocailleux/',
            'r5': 'semihumain/',
            'r6': 'elfe/',
            'r7': 'eflesylvain/',
            'r8': 'elfenoir/',
            'r9': 'elfedesang/',
            'r10': 'nain/',
            'r11': 'hommechat/',
            'r12': 'hommechien/',
            'r13': 'hommeoiseau/',
            'r14': 'hommearbre/',
            'r15': 'hommerat/',
            'r16': 'etredepsy/',
            'r17': 'vampire/',
            'r18': 'orc/',
            'r21': 'kobold/',
            'r19': 'celeste/',
            'r20': 'centaure/',
            'r22': 'default/',
        };


        let raceKey = raceMap[race];
        sexe = sexe.toLowerCase();
        if (sexe === 'sex2') {
            raceKey += 'femmes/';
        } else {  // 'male' ou tout autre chose
            raceKey += 'hommes/';
        }
        if(raceMap[race]=='default/'){
          let avatarUrl = this.baseUrl + raceKey+'avatar1.jpg';
          console.log('Chemin de l\'image défault sélectionnée :', avatarUrl);
          return avatarUrl
        }else {
          try {
              const files = await this.fetchAvatars(raceKey);
              if (files.length === 0) {
                  throw new Error('Aucun fichier trouvé');
              }
              let avatarIndex = Math.floor(Math.random() * files.length);
              let randomImagePath = files[avatarIndex];
              let basePath = this.baseUrl + raceKey;
              let avatarUrl = basePath + randomImagePath;
              console.log('Chemin de l\'image sélectionnée : ', avatarUrl);
              return avatarUrl;
          } catch (error) {
              console.error('Erreur :', error);
              return null;
          }
        }
    }

    // Méthode simulée pour obtenir les fichiers d'un dossier (devrait être remplacée par une implémentation réelle)
    async fetchAvatars(directory) {
        // Simuler une requête asynchrone pour obtenir la liste des avatars
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(['avatar1.jpg', 'avatar2.jpg', 'avatar3.jpg', 'avatar4.jpg', 'avatar5.jpg', 'avatar6.jpg', 'avatar7.jpg', 'avatar8.jpg', 'avatar9.jpg', 'avatar10.jpg']);  // Simuler les noms de fichiers
            }, 1000);
        });
    }

}