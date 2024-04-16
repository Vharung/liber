export class NameGenerator {
    constructor() {
        this.defaultNames =["Aegnor","Aerandir","Ainaros","Amarië","Amdír","Amras","Amrod","Amroth","Anairë","Angrod","Annael","Aranel","Aranwë","Aredhel","Argon","Arminas","Arwen","Auredhir","Ausir","Beleg","Bronweg","Bruithwir","Caranthir","Celeborn ","Celebrían","Celebrimbor","Celebrindal","Celegorm","Círdan","Curufin","Curufinwë","Cúthalion","Daeron","Daurin","Denethor","Eärendil","Eärwen","Ecthelio","Edrahil","Egalmoth","Egnor","Elemmakil","Elfrith","Elladan et Elrohir","Elu Thingol","Elmo","Elrond","Eltas","Eluchíl","Eluréd","Elurín","Elwë","Elwing","Enel","Enelyë","Enerdhil","Eöl","Ereinion","Erellont","Erestor","Evranin","Evromord","Faelivrin","Falathar","Fëanor","Felagund","Finarfin","Findis","Finduilas","Finrod","Finwë","Galadhon","Galadriel ","Galathil","Galdor","Galion","Galweg","Gelmir","Gereth","Gil-estel","Gilfanon","Gil-galad","Gilmith","Glorfindel","Gwindor","Haldir","Hendor","Heorrenda","Idril","Ilverin","Imin","Iminyë","Indis","Ingil","Inglorion","Ingwë Ingweron","Írimë","Ithilbor","Ivárë","Lalwen","Legolas ","Lenwë","Lindir","Lindo","Lómion","Lúthien","Mablon","Mablung","Maedhros","Maeglin","Maglor","Mahtan","Meleth","Melinir","Meril-i-Turinqi","Míriel","Mithrellas"]
         // Votre liste de noms par défaut
        this.nom = noms
    }

    generateRandomName(race, sexe) {
        let name = "";

        if (this.nom.hasOwnProperty(race)) {
            if (Array.isArray(this.nom[race])) {
                const list = this.nom[race];
                const pair1 = list[Math.floor(Math.random() * list.length)];
                const pair2 = list[Math.floor(Math.random() * list.length)];
                name = pair1 + pair2;
            } else if (typeof this.nom[race] === 'object' && this.nom[race].hasOwnProperty(sexe)) {
                const list = this.nom[race][sexe];
                const famille = this.nom[race]["Famille"];
                const pair1 = list[Math.floor(Math.random() * list.length)];
                const pair2 = famille[Math.floor(Math.random() * list.length)];
                name = pair1+" "+pair2;
            }else {
                // Si la race n'est pas trouvée, utilisez la liste de noms par défaut
                const defaultList = this.defaultNames;
                const pair1 = defaultList[Math.floor(Math.random() * defaultList.length)];
                const pair2 = defaultList[Math.floor(Math.random() * defaultList.length)];
                name = pair1 + pair2;
            }
        }

        return name;
    }
}
