export class LiberActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["Liber", "sheet", "actor"],
          //template: "systems/liber/templates/actor/personnage-sheet.html",
          width: 1210,
          height: 800,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    get template() {
        console.log(`Liber | Récupération du fichier html ${this.actor.data.type}-sheet.`);
        return `systems/liber/templates/sheets/${this.actor.data.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        var poidsactor='';
        data.dtypes = ["String", "Number", "Boolean"];
        //console.log(data);        
		if (this.actor.data.type == 'personnage' || this.actor.data.type == 'pnj' || this.actor.data.type == 'monstre') {
			this._prepareCharacterItems(data);
		}
        return data;
    }
   
	_prepareCharacterItems(sheetData) {
        const actorData = sheetData.actor;

        // Initialize containers.
        const inventaire = [];
        const sort = [];
        const argent = [];
        
        // Iterate through items, allocating to containers
        // let totalWeight = 0;
        for (let i of sheetData.items) {
          let item = i.data;
          i.img = i.img || DEFAULT_TOKEN;
          if (i.type === 'arme') {
            inventaire.push(i);
          }
          else if (i.type === 'armure') {
            inventaire.push(i);
          }
          else if (i.type === 'objet') {
            inventaire.push(i);
          }
          else if (i.type === 'magie') {
            sort.push(i);
          }
          else if (i.type === 'argent') {
            argent.push(i);
          }
        }

        // Assign and return
        actorData.inventaire = inventaire;
        actorData.sort = sort;
        actorData.argent = argent;
    }


    activateListeners(html){
        super.activateListeners(html);
        //edition items
        html.find('.item-edit').click(this._onItemEdit.bind(this));

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            let d = Dialog.confirm({
                title: game.i18n.localize("liber.suppr"),
                content: "<p>"+game.i18n.localize("liber.confirsuppr")+ item.name + "'.</p>",
                yes: () => item.delete(),
                no: () => { },
                defaultYes: false
            });
            //item.delete();
            li.slideUp(200, () => this.render(false));
        });



        //Choix race 
        html.find('.racechoix').on('click',function(){
            for(i=0;i<58;i++){
                html.find('.cpt'+i).val(0);
            } 
            var avantagerace="";
            var raceliste=html.find('.raceliste').val();
            if(raceliste==game.i18n.localize("liber.avantrace60")){
                html.find('.cpt27').val(-10);
                var armureperso= html.find('.armureperso').val();
                if(armureperso<2){
                   html.find('.armureperso').val(2); 
                }
                var avantagerace=game.i18n.localize("liber.avantrace1");
            }else if(raceliste==game.i18n.localize("liber.avantrace61")){
                var avantagerace=game.i18n.localize("liber.avantrace2");
                html.find('.cpt28').val(5);
            }else if(raceliste==game.i18n.localize("liber.avantrace62")){
                var avantagerace=game.i18n.localize("liber.avantrace3");
                html.find('.cpt39').val(10);
            }else if(raceliste==game.i18n.localize("liber.avantrace63")){
                var avantagerace=game.i18n.localize("liber.avantrace4");
                if(armureperso<2){
                   html.find('.armureperso').val(2); 
                }
            }else if(raceliste==game.i18n.localize("liber.avantrace64")){
                html.find('.cpt27').val(-20);
                var avantagerace=game.i18n.localize("liber.avantrace5");
            }else if(raceliste==game.i18n.localize("liber.avantrace64")){
                html.find('.cpt28').val(5);
                var avantagerace=game.i18n.localize("liber.avantrace6");
            }else if(raceliste==game.i18n.localize("liber.avantrace65")){
                html.find('.cpt1').val(5);
                html.find('.cpt3').val(5);
                var avantagerace=game.i18n.localize("liber.avantrace7");
            }else if(raceliste==game.i18n.localize("liber.avantrace66")){
                html.find('.cpt1').val(5);
                html.find('.cpt18').val(5);
                var avantagerace=game.i18n.localize("liber.avantrace8");
            }else if(raceliste==game.i18n.localize("liber.avantrace67")){
                html.find('.cpt10').val(10);
                var avantagerace=game.i18n.localize("liber.avantrace9");
            }else if(raceliste==game.i18n.localize("liber.avantrace68")){
                html.find('.cpt1').val(5);
                var avantagerace=game.i18n.localize("liber.avantrace10");
            }else if(raceliste==game.i18n.localize("liber.avantrace69")){
                html.find('.cpt37').val(5);
                html.find('.cpt40').val(5);
                var avantagerace=game.i18n.localize("liber.avantrace11");
            }else if(raceliste==game.i18n.localize("liber.avantrace70")){
                html.find('.cpt1').val(5);
                html.find('.cpt27').val(5);
                var avantagerace=game.i18n.localize("liber.avantrace12");
            }else if(raceliste==game.i18n.localize("liber.avantrace71")){
                html.find('.cpt46').val(5);
                html.find('.cpt28').val(5);
                var avantagerace=game.i18n.localize("liber.avantrace13");
            }else if(raceliste==game.i18n.localize("liber.avantrace72")){
                var avantagerace=game.i18n.localize("liber.avantrace14");
            }else if(raceliste==game.i18n.localize("liber.avantrace73")){
                html.find('.cpt18').val(5);
                var avantagerace=game.i18n.localize("liber.avantrace15");
            }else if(raceliste==game.i18n.localize("liber.avantrace74")){
                var avantagerace=game.i18n.localize("liber.avantrace16");
            }else if(raceliste==game.i18n.localize("liber.avantrace75")){
                var avantagerace=game.i18n.localize("liber.avantrace17");
            }else if(raceliste==game.i18n.localize("liber.avantrace76")){
                html.find('.cpt15').val(5);
                var avantagerace=game.i18n.localize("liber.avantrace18");
            }else if(raceliste==game.i18n.localize("liber.avantrace77")){
                html.find('.cpt38').val(-10);
                var avantagerace=game.i18n.localize("liber.avantrace19");
            }else {
                var avantagerace="";
            }
            html.find('.race').val(raceliste);
            html.find('.avantagerace').val(avantagerace);
        });
        
        html.find( ".compt input" ).each(function() {
              var valor= $( this ).val();
              if(valor==0){
                $( this ).css({"background":"transparent","color": "#fff"});
              }else if(valor>0){
                $( this ).css({"background":"#56853b","color": "white"});
              }else if(valor<0){
                $( this ).css({"background":"#a51b1b","color": "white"});
              }
            });

        html.find('.clanchoix').on('click',function(){ 
            var avantagerace=html.find('.avantagerace').val();
            var clanliste=html.find('.clanliste').val();
            html.find('.clan').val(clanliste);
            if(clanliste==game.i18n.localize("liber.avantrace40")){
                avantagerace+=game.i18n.localize("liber.avantrace20");
            }else if(clanliste==game.i18n.localize("liber.avantrace41")){
                avantagerace+=game.i18n.localize("liber.avantrace21");
            }else if(clanliste==game.i18n.localize("liber.avantrace42")){
                avantagerace+=game.i18n.localize("liber.avantrace22");
            }else if(clanliste==game.i18n.localize("liber.avantrace43")){
                avantagerace+=game.i18n.localize("liber.avantrace23");
            }else if(clanliste==game.i18n.localize("liber.avantrace44")){
                avantagerace+=game.i18n.localize("liber.avantrace24");
            }else if(clanliste==game.i18n.localize("liber.avantrace45")){
                avantagerace+=game.i18n.localize("liber.avantrace25");
            }else if(clanliste==game.i18n.localize("liber.avantrace46")){
                avantagerace+=game.i18n.localize("liber.avantrace26");
            }else if(clanliste==game.i18n.localize("liber.avantrace47")){
                avantagerace+=game.i18n.localize("liber.avantrace27");
            }else if(clanliste==game.i18n.localize("liber.avantrace48")){
                avantagerace+=game.i18n.localize("liber.avantrace28");
            }else if(clanliste==game.i18n.localize("liber.avantrace49")){
                avantagerace+=game.i18n.localize("liber.avantrace29");
            }else if(clanliste==game.i18n.localize("liber.avantrace50")){
                avantagerace+=game.i18n.localize("liber.avantrace30");
            }else if(clanliste==game.i18n.localize("liber.avantrace51")){
                avantagerace+=game.i18n.localize("liber.avantrace31");
            }else if(clanliste==game.i18n.localize("liber.avantrace52")){
                avantagerace+=game.i18n.localize("liber.avantrace32");
            }else if(clanliste==game.i18n.localize("liber.avantrace53")){
                avantagerace+=game.i18n.localize("liber.avantrace33");
            }else if(clanliste==game.i18n.localize("liber.avantrace54")){
                avantagerace+=game.i18n.localize("liber.avantrace34");
            }else if(clanliste==game.i18n.localize("liber.avantrace55")){
                avantagerace+=game.i18n.localize("liber.avantrace35");
            }else if(clanliste==game.i18n.localize("liber.avantrace56")){
                avantagerace+=game.i18n.localize("liber.avantrace36");
            }else if(clanliste==game.i18n.localize("liber.avantrace57")){
                avantagerace+="";
            }
            html.find('.avantagerace').val(avantagerace);
        });
        
        //choix culte
        html.find('.religionchoix').on('click',function(){ 
            var clanliste=html.find('.religionlist').val();
            html.find('.religion').val(clanliste);
        });

        //generateur d'histoire
        html.find('.generator').on('click',function(){
            var age = Math.floor((Math.random() * 34) + 16);
            var items0=[game.i18n.localize("liber.lang1"),game.i18n.localize("liber.lang2"),game.i18n.localize("liber.lang3"),game.i18n.localize("liber.lang4"),game.i18n.localize("liber.lang5"),game.i18n.localize("liber.lang6"),game.i18n.localize("liber.lang7"),game.i18n.localize("liber.lang8"),game.i18n.localize("liber.lang9"),game.i18n.localize("liber.lang10"),game.i18n.localize("liber.lang11"),game.i18n.localize("liber.lang12"),game.i18n.localize("liber.lang13"),game.i18n.localize("liber.lang14"),game.i18n.localize("liber.lang15"),game.i18n.localize("liber.lang16"),game.i18n.localize("liber.lang17"),game.i18n.localize("liber.lang18"),game.i18n.localize("liber.lang19")];
            var items1=[game.i18n.localize("liber.lang20"),game.i18n.localize("liber.lang21"),game.i18n.localize("liber.lang22"),game.i18n.localize("liber.lang23"),game.i18n.localize("liber.lang24"),game.i18n.localize("liber.lang25"),game.i18n.localize("liber.lang26"),game.i18n.localize("liber.lang27"),game.i18n.localize("liber.lang28"),game.i18n.localize("liber.lang29"),game.i18n.localize("liber.lang30"),game.i18n.localize("liber.lang31"),game.i18n.localize("liber.lang32"),game.i18n.localize("liber.lang33")];
            var items2=[game.i18n.localize("liber.lang34"),game.i18n.localize("liber.lang35"),game.i18n.localize("liber.lang36"),game.i18n.localize("liber.lang37"),game.i18n.localize("liber.lang38"),game.i18n.localize("liber.lang39"),game.i18n.localize("liber.lang40"),game.i18n.localize("liber.lang41"),game.i18n.localize("liber.lang42"),game.i18n.localize("liber.lang43"),game.i18n.localize("liber.lang44"),game.i18n.localize("liber.lang45"),game.i18n.localize("liber.lang46"),game.i18n.localize("liber.lang47")];
            var items3=[game.i18n.localize("liber.lang48"),game.i18n.localize("liber.lang49"),game.i18n.localize("liber.lang50"),game.i18n.localize("liber.lang51"),game.i18n.localize("liber.lang52"),game.i18n.localize("liber.lang53"),game.i18n.localize("liber.lang54"),game.i18n.localize("liber.lang55"),game.i18n.localize("liber.lang56"),game.i18n.localize("liber.lang57"),game.i18n.localize("liber.lang58"),game.i18n.localize("liber.lang59"),game.i18n.localize("liber.lang60"),game.i18n.localize("liber.lang61"),game.i18n.localize("liber.lang62")];
            var items4=[game.i18n.localize("liber.lang63"),game.i18n.localize("liber.lang64"),game.i18n.localize("liber.lang65"),game.i18n.localize("liber.lang66"),game.i18n.localize("liber.lang67"),game.i18n.localize("liber.lang68"),game.i18n.localize("liber.lang69"),game.i18n.localize("liber.lang70"),game.i18n.localize("liber.lang71"),game.i18n.localize("liber.lang72"),game.i18n.localize("liber.lang73"),game.i18n.localize("liber.lang74"),game.i18n.localize("liber.lang75"),game.i18n.localize("liber.lang76")]
            var nomville=items0[Math.floor(Math.random()*items0.length)];
            var evenement = items1[Math.floor(Math.random()*items1.length)];
            var tonchoix=items2[Math.floor(Math.random()*items2.length)];
            var motivation  = items3[Math.floor(Math.random()*items3.length)];
            var signeastro = items4[Math.floor(Math.random()*items4.length)];
            var textgen =game.i18n.localize("liber.lang77")+' '+age+' '+game.i18n.localize("liber.lang78")+' '+nomville+'. '+game.i18n.localize("liber.lang79")+' '+evenement+", "+motivation+' '+game.i18n.localize("liber.lang80")+' '+tonchoix+'. '+game.i18n.localize("liber.lang82")+' '+signeastro;
            html.find('.histoire').val(textgen);
        });

        //Ajout talent et faiblesse
        html.find('.choixtalent').on('click',function(){
            var talentliste=html.find('.talentliste').val();
            html.find('.talent').val(talentliste);
        });
        html.find('.choixfaiblesse').on('click',function(){
            var faiblesseliste=html.find('.faiblesseliste').val();
            html.find('.faiblesse').val(faiblesseliste);
        });

        //caractere aléatoire
        html.find('.caractergen').on('click',function(){ //lang
            var demeure = ["Maison","Hotel","Chez un ami","demeure","Sous un pont","Sur un Bateau","Ferme","Auberge","Commerce / Négociation","Forge","Villa","Cabane"];
            var proximite=["Dans l'enceinte","près","au abord"];
            var lieu=["de Ralich","d'Aelath","de Dwaliwyr","d'Yie","de Nydiag","de Weitha","de Crilanydd","de Cem","de Coalith","de Natura","de Vivaqua","de Limenido","d'Eraliwin","d'Atlantide","de Galerrakath","d'Oklata","d'Ile mystérieuse","d'un petit village","de MacooThur"];
            var resident = demeure[Math.floor(Math.random()*demeure.length)]+" "+proximite[Math.floor(Math.random()*proximite.length)]+" "+lieu[Math.floor(Math.random()*lieu.length)];
            html.find('.residence').val(resident);
            var famille = ["Crochet","Valone","Parker","Onile","Pasteur","Labrocante","Vincente","Auditoré","Laporte","Blanchart","Giroux","Lesourd","Houillons","Castagné","Delasaintecroix","Macon","Chaumont","Lucent","Hover","Packard","Curie","Lyon","Lallemand","Langlais","Lecure","Macdonald","Dupont","Lafontaine","Boucher","Boureau","Godspeak","Pierre","Solitaire","Beauregard","Charmant","Marechal","Dufour","Leroux","Lemoine","Lombart","Lefourbe","Boulanger","Petit","Blanc","Chevalier","Leroy","Lebrun","Silver","Delarue","Notigame","Forest","Tonneau","Does","Martin","Deschamps","Dupuis","Macalisteur","Leloup","Bouquin","Lafleur","","Dugrenier","Lacroix","Lecomte","Poulain","Dumas"];
            var titre=["Gueux","Batard","Noble","Bourgeois","Chatelin","Conte","Duc","Paysan","Forgeron","Artisan","Commercant","Chevalier","Aventurier","Héritier","Fils(fille) cadé(e)","Fils(fille) ainé(e)"];
            var sang = titre[Math.floor(Math.random()*titre.length)]+" de la famille "+famille[Math.floor(Math.random()*famille.length)];
            html.find('.sang').val(sang);       
            var rang=["Subordonné","Chef","Dirigeant","Membre","Adepte","Affilié","Cotisant","Participant","Soutien"]
            var organisation=["de la secte de weithra","de la secte de Baphomet","de la secte de PolKridac","du Nouvel Ordre","du culte Vharung","du culte weithra","du commité des pecheurs","du commité des chasseurs","du commité des commerçants","du commité des voyageurs","du commité des aubergistes","du commité des artistes","de la guilde des voleurs","de la guilde des magiciens","de la guilde des guerriers","de la guilde des aventuriers","de la guilde des tueurs de monstres","de la guilde des assassins","de la bande de bandits","de la bande de pirates"]
            var politique=rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.secte').val(politique);
            var intret=["Secte de weithra","Secte de Baphomet","secte de PolKridac","Nouvelle Ordre","Culte Vharung","Culte weithra","Comité des pecheurs","Comité des chasseurs","Comité des commerçants","Comité des voyageurs","Comité des aubergistes","Comité des artistes","Guilde des artsistes","Guilde des voleurs","Guilde des magiciens","Guilde des guerriers","Guilde des aventuriers","Guilde des tueurs de monstres","Guilde des assassins","Guile de la fête","Guilde des joueurs de cartes","Association sportive"]
            var groupe=intret[Math.floor(Math.random()*intret.length)]
            html.find('.interet').val(groupe);
            var pertes=["mère","père","frère","soeur","ami(e)","amant(e)","personne","mentor","disciple","chef de son groupe","oncle","cousin","neveu","fiancé(e)","enfant","compagnon d'armes","rival(e)"]
            var dc=pertes[Math.floor(Math.random()*pertes.length)]
            html.find('.proche').val(dc);
            var valeur=["Aucun","Ethique","Verteux","Stoïcisme","Social","Humaniste","Questionnement","Droit","Juste","Corrompu","Egoiste","Individualiste","Communautaire"]
            var moral=valeur[Math.floor(Math.random()*valeur.length)]
            html.find('.moral').val(moral);
            var race=["Humain(e)","Dragon(e)","Humain(e)","Dragon(e)","Humain(e)","Dragon(e)","Humain(e)","Dragon(e)","Humain(e)","Dragon(e)","Humain(e)","Dragon(e)","Démon(e)","Démon(e)","Semi-humain(e)","Semi-humain(e)","Semi-humain(e)",game.i18n.localize("liber.avantrace77"),game.i18n.localize("liber.avantrace65"),"Nain(e)"]
            var rang=["subordonné","chef","dirigeant","membre","adepte","affilié","cotisant","participant","soutien"]
            var organisation=["de la secte de weithra","de la secte de Baphomet","de la secte de PolKridac","du Nouvel Ordre","du culte Vharung","du culte weithra","du commité des pecheurs","du commité des chasseurs","du commité des commerçants","du commité des voyageurs","du commité des aubergistes","du commité des artistes","de la guilde des voleurs","de la guilde des magiciens","de la guilde des guerriers","de la guilde des aventuriers","de la guilde des tueurs de monstres","de la guilde des assassins","de la bande de bandits","de la bande de pirates"];
            var amour=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.amour').val(amour)
            var ami=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.amitie').val(ami);
            var haine=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.haine').val(haine);
            var profession=["Voleur","Chevalier","Artisan","Assassin","Garde","Boulanger","Charcutier","Boucher","Cordonnier","Chasseur","Pecheur","Prêtre","Vagabon","Navigateur","Aubergiste","Charlatant","Alchimiste","Commerçant","Sculpteur","Peintre","Romancier","Diplomate","Noble","Notaire","Bourreau","Colporteur","Bahutier","Bûcheron","Forgeron","Chatelin","Agriculteur","Potier","Eleveur","Cuisinier","Livreur","Convoilleur","Soldat","Chasseur de prime"]
            var metier=profession[Math.floor(Math.random()*profession.length)]
            html.find('.principale').val(metier);
            var metier=profession[Math.floor(Math.random()*profession.length)]
            html.find('.secondaire').val(metier);
            var loisir=["Chasse","Tricot","Crochet","Broderie","Peinture","Poésie","Chant","Acrobatie","Danse","Manger","Promenade","Peche","Equitation","Carte","Jeux d'argent","Coureur de jupon","Vol","Jardiner","Lecture","Dessin","Poterie"]
            var metier=loisir[Math.floor(Math.random()*loisir.length)]
            html.find('.passion').val(metier);
            var caracterelist=["Social","Individualiste","Altruiste","Fidéle","Infidel","Egoïsme","Générosité","Compassion","Fraternel","Dévoué","Croyant","Vaniteux","Forcené"]
            var caractere=caracterelist[Math.floor(Math.random()*caracterelist.length)]
            html.find('.caractere').val(caractere);
            var personnalitelist=["Compléxé(e)","Débrouillard","Assisté(e)","Maniaque","Bordelique","Patient","Impatient","Supersticieux","Rationnel","Emotif","Apathique","Flégmatique","Précieux","Bourru","Colérique","Sérieux","Mélancolique","Sanguin"]
            var personnalite=personnalitelist[Math.floor(Math.random()*personnalitelist.length)]
            html.find('.personnalite').val(personnalite);
            var visionlist=["barbare","danger","découverte","connaissance","richesse","impie",game.i18n.localize("liber.avantrace62"),"coeur à prendre","monstre","gibier","mystère","bandit","secte","croyance"]
            var vision="Rempli de "+visionlist[Math.floor(Math.random()*visionlist.length)]
            html.find('.monde').val(vision);
            var objectiflist=["Devenir riche","Liberer de leur servitude","Aider sa communauté","Aider la nature","Convertir le monde à sa foi","Recherche spirituel","Tuer les hérétiques","Tuer les autres race","Recherche de connaissance"]
            var objectif=objectiflist[Math.floor(Math.random()*objectiflist.length)]
            html.find('.objectif').val(objectif);
            var racunelist=["oui","non","Dépend de la situation"]
            var racune=racunelist[Math.floor(Math.random()*racunelist.length)]
            html.find('.rancunier').val(racune);
            var tarelist=["Ablutophobie – Peur de se baigner. Cette phobie est plus une peur de la noyade qu'une peur de l'eau.","Acarophobie – Peur des parasites de la peau, des acariens.","Achluophobie – Peur de l'obscurité et du noir.","Achmophobie / Aichmophobie – Peur des aiguilles et des objets pointus (ciseaux, couteaux, seringues par exemple).","Acrophobie – Peur des hauteurs ; s'accompagne souvent de vertiges.","Administrativophobie – Peur des relations avec l'administration et des courriers administratifs.","Anasthesiaphobie - Peur de l'anesthésie.","Aérodromophobie – Peur de l'avion, des voyages en avion.","Aérophobie – Peur de l'air et du vent.","Agoraphobie – Peur des espaces publics et, par extension, de la foule ; plus généralement, des espaces où la fuite est rendue difficile (foule, mais aussi lieux déserts).","Algophobie – Peur de la douleur.","Alopophobie – Peur des chauves.","Amatophobie – Phobie de la poussière.","Amaxophobie – Peur de la conduite.","Anginophobie – Peur de l’étouffement, notamment par des angines de poitrine.","Angrophobie – Peur de se mettre en colère en public.","Ankylophobie – Peur de l'immobilité.","Anthelmophobie – Peur des vers.","Anthropophobie – Peur des gens ou d'être en leur compagnie, une forme de phobie sociale.","Anuptaphobie – Peur du célibat.","Apéirophobie – Peur de l'infini.","Apopathodiaphulatophobie – Peur d'être constipé ou de la constipation en elle-même.","Apopathophobie – Peur d'aller à la selle.","Aquaphobie – Peur de l’eau.","Arithmophobie – Peur des chiffres.","Asthénophobie – Peur de s'évanouir","Astraphobie – Peur du tonnerre.","Athazagoraphobie – Peur d'être oublié ou ignoré.","Atychiphobie – Peur de l’échec.","Automysophobie – Peur d'être sale, de sentir mauvais.","Autophobie – Peur de la solitude.","Aviophobie – Peur de prendre l'avion.","Bacillophobie – Peur des bacilles, des bactéries,.","Basophobie – Peur de marcher.","Bélénophobie – Peur des aiguilles (cf. achmophobie).","Blemmophobie – Peur du regard des autres.","Borbophobie – Peur des gargouillements.","Brontophobie – Peur du tonnerre.","Cancérophobie – Peur du cancer.","Cardiophobie – Peur du cœur ou peur d'un développement d'une maladie cardiovasculaire.","Carpophobie - Peur des fruits","Catapédaphobie – Peur de grimper en hauteur.","Cherophobie – Peur de la gaieté.","Chorophobie – Peur de danser.","Claustrophobie – Peur des espaces confinés.","Climacophobie – Peur d'utiliser des escaliers, surtout de les descendre.","Coemetiriophobie - Peur des cimetières.","Coulrophobie – Peur des clowns.","Cyclophobie – Peur de monter sur une bicyclette ou tout autre véhicule à deux roues.","Dentophobie – Peur du dentiste.","Dysmorphophobie / Dysmorphophie – Peur des anomalies physiques.","Ecclesiophobie – Peur des églises[réf. souhaitée].","Émétophobie – Peur de vomir.","Epistaxiophobie – Peur des saignements de nez.","Éreutophobie (ou l'érythrophobie)– Peur de rougir en public.","Fumiphobie – Peur de la fumée (tabac par exemple)","Géphyrophobie – Peur des ponts (ou de traverser les ponts).","Gérascophobie – Peur de vieillir.","Germophobie – Peur des germes.","Glossophobie – Peur de parler en public.","Graphophobie – Peur de l'écriture (fait d'écrire).","Gymnophobie – Peur de la nudité.","Halitophobie – Peur d'avoir mauvaise haleine.","Haptophobie (ou Aphenphosmophobie) – Peur d'être touché.","Hématophobie – Peur du contact et de la vue du sang.","Hylophobie – Peur des forêts.","Hypégiaphobie – Peur des responsabilités.","Ithyphallophobie / Medorthophobie – Peur de voir des pénis en érection.","Katagélophobie – Peur du ridicule.","Kénophobie – Peur de l'obscurité.","Kéraunophobie - Crainte morbide de la foudre et des orages.","Kopophobie – Peur d'être fatigué, ou de la fatigue elle-même.","Laxophobie – Peur d’être pris de diarrhées impérieuses en public, en dehors de chez soi, et de ne pas arriver à se retenir.","Leucosélophobie – Peur de la page blanche (blocage de l'écrivain) .","Lilapsophobie - Peur des tornades.","Maskaphobie – Peur des masques.","Mégalophobie – Peur des grands objets, des grands bâtiments (Gratte-ciel ou navires de croisière par exemple)","Musicophobie – Peur de la musique.","Mycophobie – Peur des champignons.","Mysophobie – Peur de la saleté, de la contamination par les microbes.","Nanopabulophobie – Peur des nains de jardin à brouette.","Nanophobie – Peur des nains.","Nécrophobie – Peur des cadavres.","Nélophobie – peur du verre (également Hyalophobie).","Néphobie – peur de l'inédit.","Néphrophobie – peur des maladie du rein (également Lithophobie).","Neurasthénophobie – peur de la tristesse.","Névrophobie – peur des crises de nerf (également Hystérophobie).","Nicophobie – peur des cigarettes.","Nomophobie – Peur d'être séparé de son téléphone portable. Cette phobie désignerait aussi la peur excessive des lois.","Nosocomephobie – Peur des hôpitaux, cliniques et centres de soin en général.","Nosophobie – Peur de la maladie, d'être malade.","Notaphobie – peur des factures (également Votaphobie).","Nourinophobie – peur des cochons (également Suidéphobie).","Nudophobie – peur ou réprobation de la nudité humaine.","Nulophobie – peur de la cité.","Numérophobie – peur des numéros.","Numismatophobie – peur des monnaies.","Ochlophobie – Peur de la foule.","Odontophobie – Peur du chirurgien-dentiste / des actes médicaux ou chirurgicaux en bouche.","Ombilicophobie - Peur du nombril, ne supporte pas d'y toucher ou de le voir","Paraskevidékatriaphobie – Peur des vendredis ","Pantophobie – Peur de tout","Pédiophobie – Peur des poupées","Pédophobie - Peur des enfants.","Phagophobie – Peur de s'étouffer avec des aliments.","Phasmophobie – Peur des fantômes.","Philophobie - Peur de tomber amoureux.","Philématophobie - Peur d'embrasser.","Protophiphouphobie - Peur de manquer de protéines ","Phobie de type sang-injection-blessure – Sous-type de phobies spécifiques classifié dans le DSM-IV.","Phobie sociale – Peur des ou de certaines situations sociales.","Phobophobie – Peur d'avoir peur (d'être surpris).","Pogonophobie – Aversion envers les barbes / phobie des poils du menton et des joues.","Podophobie – Peur des pieds","Psychopathophobie – Peur de devenir fou.","Pyrophobie – Peur du feu.","Scatophobie – Peur des excréments.","Scopophobie – Peur du regard des autres.","Sélénophobie – Peur de la lune.","Sidérodromophobie – Peur de voyager en train.","Spectrophobie – Peur des miroirs (des reflets).","Spitophobie - Peur de la salive","Stasophobie – Peur d'avoir à rester debout.","Taphophobie – Peur des tombes ou d'être enterré vivant.","Téléphonophobie – Peur de répondre au téléphone.","Tératophobie – Peur des monstres.","Thalassophobie – Peur de la mer.","Thanatophobie – Peur de la mort.","Théophobie – Peur de Dieu.","Tokophobie – Peur d'accoucher.","Trichophobie – Peur des poils et de la pilosité.","Trypophobie – Peur des trous.","Xénoglossophobie : Peur des langues étrangères.","Ailurophobie – Peur des chats.","Alektorophobie – Peur des poulets.","Anthelmophobie – Peur des vers.","Apiphobie – Peur des abeilles ; par extension, peur des insectes possédant un dard ou pouvant piquer.","Arachnophobie – Peur des araignées.","Chiroptophobie – Peur des chauves-souris","Cuniculophobie – Peur des lapins.","Cynophobie – Peur des chiens.","Entomophobie – Peur des insectes.","Héliciphobie - Peur des escargots et des limaces.","Herpétophobie – Peur des reptiles ou amphibiens.","Hippophobie – Peur des chevaux, des équidés.","Ichthyophobie – Peur des poissons.","Musophobie – Peur des souris ou rats.","Myrmécophobie – Peur des fourmis.","Octophobie- Peur des poulpes/pieuvres.","Ophiophobie – Peur des serpents.","Ornithophobie – Peur des oiseaux.","Squalophobie – Peur des requins."]
            var tare=tarelist[Math.floor(Math.random()*tarelist.length)]
            html.find('.tare').val(tare);
            var obsessionlist=["oui","non","Dépend de la situation"]
            var obsession=obsessionlist[Math.floor(Math.random()*obsessionlist.length)]
            html.find('.obsession').val(obsession);
            var distinguelist=["oui","non","Dépend de la situation"]
            var distingue=distinguelist[Math.floor(Math.random()*distinguelist.length)]
            html.find('.distingue').val(distingue);
        });

        //point restant
        var espece=html.find('.race').val();
        var phys=parseInt(html.find('.phys').val());
        var forc=parseInt(html.find('.forc').val());
        var agil=parseInt(html.find('.agil').val());
        var soci=parseInt(html.find('.soci').val());
        var char=parseInt(html.find('.char').val());
        var saga=parseInt(html.find('.saga').val());
        var ment=parseInt(html.find('.mental').val());
        var astu=parseInt(html.find('.astu').val());
        var memo=parseInt(html.find('.memo').val());
        var reste=170-(phys+soci+ment);
        if(espece==game.i18n.localize("liber.avantrace61")){
            if(soci<5){
                html.find('.soci').val(5);
                soci=5;
            }
            reste=reste+5;
        }
        html.find('.pointrestant').val(reste);
        if(phys<(forc+agil)){
            alert(game.i18n.localize("liber.alert1"))
        }
        if(soci<(char+saga)){
            alert(game.i18n.localize("liber.alert2"))
        }
        if(ment<(astu+memo)){
            alert(game.i18n.localize("liber.alert3"))
        }

        //calcul point capacité
        var level = parseInt(html.find('.niveau').val());
        var resultat=35+(level*15);
        if(espece==game.i18n.localize("liber.avantrace60")){
            resultat=resultat-20;
        }else if(espece==game.i18n.localize("liber.avantrace61") || espece=='Semi-humain'){
            resultat=resultat+15;
            var cap28=parseInt(html.find('.cpt28').val());
            if(cap28<5){
                html.find('.cpt28').val(5);
            }
        }else if(espece==game.i18n.localize("liber.avantrace64")){
            resultat=resultat-40;
        }else if(espece==game.i18n.localize("liber.avantrace62")){
            resultat=resultat+10;
        }else if(espece==game.i18n.localize("liber.avantrace68")){
            resultat=resultat+30;
            var cap28=parseInt(html.find('.cpt1').val());
            if(cap28<5){html.find('.cpt1').val(5);}
            var cap29=parseInt(html.find('.cpt3').val());
            if(cap29<5){html.find('.cpt3').val(5);}
        }else if(espece==game.i18n.localize("liber.avantrace66")){
            resultat=resultat+20;
            var cap28=parseInt(html.find('.cpt1').val());
            if(cap28<5){html.find('.cpt1').val(5);}
            var cap29=parseInt(html.find('.cpt18').val());
            if(cap29<5){html.find('.cpt18').val(5);}
        }else if(espece==game.i18n.localize("liber.avantrace67")){
            resultat=resultat+20;
            var cap28=parseInt(html.find('.cpt10').val());
            if(cap28<10){html.find('.cpt10').val(10);}
        }else if(espece==game.i18n.localize("liber.avantrace68")){
            resultat=resultat+15;
             var cap28=parseInt(html.find('.cpt1').val());
            if(cap28<5){html.find('.cpt1').val(5);}
        }else if(espece==game.i18n.localize("liber.avantrace69")){
            resultat=resultat+20;
            var cap28=parseInt(html.find('.cpt37').val());
            if(cap28<5){html.find('.cpt37').val(5);}
            var cap29=parseInt(html.find('.cpt40').val());
            if(cap29<5){html.find('.cpt40').val(5);}
        }else if(espece==game.i18n.localize("liber.avantrace70")){
            resultat=resultat+25;
            var cap28=parseInt(html.find('.cpt1').val());
            if(cap28<5){html.find('.cpt1').val(5);}
            var cap29=parseInt(html.find('.cpt27').val());
            if(cap29<5){html.find('.cpt27').val(5);}
        }else if(espece==game.i18n.localize("liber.avantrace71")){
            resultat=resultat+20;
            var cap28=parseInt(html.find('.cpt46').val());
            if(cap28<5){html.find('.cpt46').val(5);}
            var cap29=parseInt(html.find('.cpt28').val());
            if(cap29<5){html.find('.cpt28').val(5);}
        }else if(espece==game.i18n.localize("liber.avantrace73")){
            resultat=resultat+5;
            var cap29=parseInt(html.find('.cpt18').val());
            if(cap29<5){html.find('.cpt18').val(5);}
        }else if(espece==game.i18n.localize("liber.avantrace76")){
            resultat=resultat+5;
            var cap29=parseInt(html.find('.cpt15').val());
            if(cap29<5){html.find('.cpt15').val(5);}
        }else if(espece==game.i18n.localize("liber.avantrace77")){
            resultat=resultat-30;
        }
        for(i=0;i<58;i++){
            var ajout=parseInt(html.find('.cpt'+i).val());
            if(ajout>20){
                html.find('.cpt'+i).val(20);
                ajout=20;
            }
            if(i==1 || i==3 || i==4 || i==5 || i==6 || i==7 || i==8 || i==14 || i==17 || i==24 || i==28 || i==30 || i==37 || i==38 || i==41 || i==45 || i==47 || i==50 || i==51 || i==56){
                var muti=3;
            }else if(i==2 || i==10 || i==11 || i==12 || i==16 || i==25 || i==27 || i==29 || i==52 || i==57){
                var muti=2;
            }else{
                var muti=1;
            }
            resultat=resultat-(ajout*muti);
        }

        html.find('.restant').val(resultat);

        //calcul cout et nb sort
        var psy=parseInt(html.find('.psymax').val());
        var X=Math.round((parseInt(ment)+(parseInt(soci)/2)-parseInt(phys)+5)/4+2);
        var psylevel = psy - X        
        var Y=Math.round(X/4)+1;
        var maxcout=Y-1+level
        var Z=Math.floor((parseInt(X)-parseInt(Y))/2+3+(parseInt(psylevel)));
        var PVmin=Math.round(parseInt(phys)/3);
        //var PSYmin=Math.round((parseInt(X)-parseInt(Y))/2+3);
        var PSYmin=X;
        html.find('.maxsort').val(maxcout);
        html.find('.coutmax').val(Z);
        var hpmax=parseInt(html.find('.hpmax').val());
        var psymax=parseInt(html.find('.psymax').val());
        if(hpmax<PVmin){
           html.find('.hpmax').val(PVmin);
        }if(hpmax<PVmin){
           html.find('.hpmax').val(PVmin);
        }
        if(psymax<PSYmin){
           html.find('.psymax').val(PSYmin);
        }
        var pointxp=(level-1)*3;
        var calcultotxp=hpmax-PVmin+psymax-PSYmin;
        if(calcultotxp>pointxp && this.actor.data.type=="personnage"){
            alert(game.i18n.localize("liber.alert"));
        }

        //test des capacités acrives
        $( ".tableaucreation input" ).each(function( index ) {
          var valor= $( this ).val();
          if(valor>0){
            $( this ).css({"background":"#56853b","color": "white"});
          }else if(valor<0){
            $( this ).css({"background":"#a51b1b","color": "white"});
          }
        });
        //Magie lancer un sort
        html.find('.item-lancer').on('click',function(){
            let monJetDeDes = "1d100";
            let mental = html.find('.mental').val();
            let bonus = html.find('.bonusactor').val();
            let malus = html.find('.malussactor').val();
            let posture = html.find('.postures').val();
            var cout =  $(this).data('cout');
            const name = $(this).data('name');
            const nom = html.find('.nomperso').val();
            var psy = html.find('.psy').val();
            var hp = html.find('.hp').val();
            var insoi = html.find('.insoin').val();

            var bonuspost=0;
            var critique=5;
            if(posture=="Focus"){
                bonuspost=5;
            }else if(posture="Offensif"){
                critique=10;
            }
            if(bonus==undefined){
            	bonus=0;
            }
            let inforesult=parseInt(mental)+parseInt(bonus)+bonuspost+parseInt(malus);
            if(inforesult>95){
            inforesult=95;
            }else if(inforesult<5){
            inforesult=5;
            }
            let r = new Roll("1d100");
            var roll=r.evaluate({"async": false});
            let retour=r.result; 
            var succes="";
            if(retour>95){
                succes="<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("liber.lang82")+"</h4>";
            }else if(retour<=critique){
                succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("liber.lang83")+"</h4>";
            }else if(retour<=inforesult){
                succes="<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("liber.lang84")+"</h4>";
            }else{
                succes="<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("liber.lang85")+"</h4>";
            }
            if(posture=="Focus"){
               cout=parseInt(cout)-1; 
            }
            if(cout<0){
                cout=0;
            }
            if(psy<cout){
                var diff= parseInt(cout)-parseInt(psy)
                hp=parseInt(hp)-parseInt(diff);
                psy=0;
                insoi= parseInt(insoi)+parseInt(diff);
                html.find('.insoin').val(insoi);
                html.find('.hp').val(hp);
            }else {
                psy = parseInt(psy)-parseInt(cout)
            }
            html.find('.psy').val(psy);
            const texte = "Lance " + name + " : 1d100 - " + inforesult + succes;
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ alias: nom }),
                flavor: texte
            });
        });


        //Avantage
        var avant=html.find('.avant').val();
        var desan=html.find('.desan').val();
        if(avant>0){
            html.find('.avant').css("opacity", "1");
        }else {
            html.find('.avant').css("opacity", "0.5");
        }
        if(desan>0){
            html.find('.desan').css("opacity", "1");
        }else {
            html.find('.desan').css("opacity", "0.5");
        }

        //Insoignable
        var insoin=html.find('.insoin').val();
        var hp=html.find('.hp').val();
        var hpmax=html.find('.hpmax').val();
        if(hpmax==hp && insoin>0){
            hp=parseInt(hpmax)-parseInt(insoin);
            html.find('.hp').val(hp);
        }

        //Posture
        var postures=html.find('.postures').val();
        $('.offensif').on('click',function(){
            let messageTable = game.i18n.localize("liber.lang86");
            let chatData = {
                user: game.user._id,
                speaker: ChatMessage.getSpeaker(),
                content: messageTable
            };
            ChatMessage.create(chatData, {});
        });
        $('.defensif').on('click',function(){
             let messageTable = game.i18n.localize("liber.lang87");
            let chatData = {
                user: game.user._id,
                speaker: ChatMessage.getSpeaker(),
                content: messageTable
            };
            ChatMessage.create(chatData, {});
        });
        $('.focus').on('click',function(){
            let messageTable = game.i18n.localize("liber.lang88");
            let chatData = {
                user: game.user._id,
                speaker: ChatMessage.getSpeaker(),
                content: messageTable
            };
            ChatMessage.create(chatData, {});
        }); 
        if(postures=="Focus"){
            html.find('.focus').css("opacity", "1");
        }else if(postures=="Offensif"){
            html.find('.offensif').css("opacity", "1");
                    
        }else if(postures=="Défensif"){
            html.find('.defensif').css("opacity", "1");
            
        }else{
            html.find('.aucune').css("opacity", "1");
            
        }
        $('.aucune').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".postures").val("Aucune");

        });
        $('.focus').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".postures").val("Focus");
        });
        $('.offensif').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".postures").val("Offensif");
        });
        $('.defensif').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".postures").val("Défensif");
        });

        //Etat
        var etats=['inconsient','invisible','blesse','mort','empoisonné','prie','attache','fort','faible','concentre','brule','mordu','aucun']
        var actoretat=html.find('.etats').val();
        for (var i = 0; i <= 13; i++) {
            if(actoretat==etats[i]){
                html.find('.etat'+i).css("opacity", "1");
            }
        }
        $('.etat0').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('inconsient');
        });
        $('.etat1').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('invisible');
        });
        $('.etat2').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('blesse');
        });
        $('.etat3').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('mort');
        });
        $('.etat4').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('empoisonné');
        });
        $('.etat5').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('prie');
        });
        $('.etat6').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('attache');
        });
        $('.etat7').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('fort');
        });
        $('.etat8').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('faible');
        });
        $('.etat9').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('concentre');
        });
        $('.etat10').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('brule');
        });
        $('.etat11').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('mordu');
        });
        $('.etat12').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('aucun');
        });


        //Poids encombrement
        var poids=[];
        var quantite=[];
        var total=0;
        html.find( ".item-poids" ).each(function( index ) {
            if($( this ).text()!="Pds"){
                poids.push($( this ).text());
            }
        });
        html.find( ".item-qty" ).each(function( index ) {
            if($( this ).text()!="Qte"){
                quantite.push($( this ).text());
            }
        });
        for (var i = 1;i < poids.length ; i++) {
           total=total+parseFloat(poids[i])*parseFloat(quantite[i]);
        }
        var enc=html.find('.enc').val();
        var enc=parseFloat(enc);
        var pourcentage= total*100/enc;
        
        if(pourcentage<50){
            html.find('.barenc').css({"background":'green'})
        }else if(pourcentage<75){
            html.find('.barenc').css({"background":'orange'})
        }else if(pourcentage<100){
            html.find('.barenc').css({"background":'red'})
        }else if(pourcentage<120){
            html.find('.barenc').css({"background":'#660000'})
        }else{
            html.find('.barenc').css({"background":'black'})
        }
        if(pourcentage>100){
            pourcentage=100;
        }
        html.find('.encours').val(total);
        html.find('.barenc').css({"width":pourcentage+"%"});

        //Equipé
        var listedemain =['Rapière','Bâton','Espadon','Hallebarde','Fléaux d\'arme','Epée à deux main','Masse d\'arme','Hache de bataille','Faux de Guerre','Lance Lourde']//lang
        $('.maindroite').on('click',function(){
            var objetaequipe=$(this).attr("name");
            var degat=$(this).attr("degat");
            var maing= html.find(".maingaucequi").val();
            for (var i = listedemain.length - 1; i >= 0; i--) {
                if(objetaequipe==listedemain[i] || maing == listedemain[i]){
                    html.find(".maingaucequi").val('-');
                    html.find(".degatg").val('-');
                }
            }
            html.find(".maindroiequi").val(objetaequipe);
            html.find(".degatd").val(degat);
            
            
        });
        $('.maingauche').on('click',function(){
            var objetaequipe=$(this).attr("name");
            var degat=$(this).attr("degat");
            var maind= html.find(".maindroiequi").val();
            for (var i = listedemain.length - 1; i >= 0; i--) {
                if(objetaequipe==listedemain[i] || maind == listedemain[i]){
                    html.find(".maindroiequi").val('-');
                    html.find(".degatd").val('-');
                }
            }
            html.find(".maingaucequi").val(objetaequipe);
            html.find(".degatg").val(degat);

        });
        $('.armor').on('click',function(){
            var objetaequipe=$(this).attr("name");
            html.find(".armurequi").val(objetaequipe);
        });

        //desquipe
        $('.mainddes').on('click',function(){
            html.find(".maindroiequi").val('');
            html.find(".degatd").val('');
        });
        $('.maingdes').on('click',function(){
            html.find(".maingaucequi").val('');
            html.find(".degatg").val('');
        });
        $('.armordes').on('click',function(){
            html.find(".armurequi").val('');
        });

        //Ajout Bonus
        $('.attribut').on('click',function(){
            var bonusactor=$(this).attr('name');
            html.find(".bonusactor").val(bonusactor);            
        });

        //Reset Bonus
        $('.resetbonus').on('click',function(){
            html.find(".bonusactor").val('0');            
        });
        $('.resetmalus').on('click',function(){
            html.find(".malussactor").val('0');            
        });

        //Jet de des
        html.find('.jetdedes').click(this._onRoll.bind(this)); 
        html.find('.jetdedegat').click(this._onRoll2.bind(this)); 

        //monstre level up
        $('.levelup').on('click',function(){
            var lvl=html.find('.lvl').val();
            var pv=html.find('.hpmax').val();
            var ps=html.find('.psymax').val();
            pv=parseInt(pv)+3;
            ps=parseInt(ps)+3;

            html.find('.hpmax').val(pv);
            html.find('.psymax').val(ps);
            var bonus=0;
            if(lvl<=3){
                bonus=1;
            }else {
                bonus=0;
            }
            var ar=html.find('.protection').val();
            if(ar==undefined||ar==""){
                ar=0;
            }
            ar=parseInt(ar)+(parseInt(bonus));
            
            html.find('.protection').val(ar);

            var degat=html.find('.degat').val();
            var fixe = degat.split('+');
            var number=fixe[1];
            if(number==undefined||number==""){
                number=0;
            }
            if(lvl<=5){
                number=parseInt(number)+1;
            }
            html.find('.degat').val(fixe[0]+'+'+number);
            lvl++;
            html.find('.lvl').val(lvl);
        });

    }


    getItemFromEvent = (ev) => {
        const parent = $(ev.currentTarget).parents(".item");
        //return this.actor.getOwnedItem(parent.data("itemId"));
        return this.actor.items.get(parent.data("itemId"));
    }

    _onItemEdit(event){
        const item = this.getItemFromEvent(event);
        item.sheet.render(true);
    }

    //lancer de dés
    _onRoll(event){
        let monJetDeDes = event.target.dataset["dice"];
        let maxstat = event.target.dataset["attdice"];
        //let bonus = event.target.dataset["actionvalue"];
        //let malus = event.target.dataset["malus"];
        //let posture = event.target.dataset["posture"];
        let bonus =this.actor.data.data.bonus;
        let malus =this.actor.data.data.malus;
        let posture =this.actor.data.data.posture;
        const name = event.target.dataset["name"];
        const jetdeDesFormule = monJetDeDes.replace("d", "d100");
        var bonuspost=0;
        var critique=5;
        if(posture=="Focus"){
            bonuspost=5;
        }else if(posture=="Offensif"){
            critique=10;
        }

        if(bonus==""){bonus=0;}
        if(malus==""){malus=0;}
       let inforesult=parseInt(maxstat)+parseInt(bonus)+bonuspost+parseInt(malus);
       if(inforesult>95){
        inforesult=95;
       }else if(inforesult<5){
        inforesult=5;
       }
        let r = new Roll("1d100");
        var roll=r.evaluate({"async": false});
        let retour=r.result; 
        var succes="";
        if(retour>95){//lang
            succes="<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec critique</h4>";
        }else if(retour<=critique){
            succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite critique</h4>";
        }else if(retour<=inforesult){
            succes="<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite</h4>";
        }else{
            succes="<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec</h4>";
        }

        const texte = "Jet de " + name + " : " + jetdeDesFormule +" - " + inforesult +succes;
        //roll.roll().toMessage({
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: texte
        });
    }
    _onRoll2(event){

        let monJetDeDes = event.target.dataset["dice"];
        const name = event.target.dataset["name"];
        let r = new Roll(monJetDeDes);
        var roll=r.evaluate({"async": false});
        const texte = "Utilise " + name + " : " + monJetDeDes;
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: texte
        });
    }
    _onMagiesort(event){
        let monJetDeDes = "1d100";
        let maxstat = event.target.dataset["attdice"];
        let bonus = event.target.dataset["actionvalue"];
        let malus = event.target.dataset["malus"];
        let posture = event.target.dataset["posture"];
        let cout =  event.target.dataset["cout"];
        const name = event.target.dataset["name"];
        var bonuspost=0;
        var critique=5;
        if(posture=="Focus"){
            bonuspost=5;
        }else if(posture="Offensif"){
            critique=10;
        }
        let inforesult=parseInt(maxstat)+parseInt(bonus)+bonuspost+parseInt(malus);
        if(inforesult>95){
        inforesult=95;
        }else if(inforesult<5){
        inforesult=5;
        }
        let r = new Roll("1d100");
        var roll=r.evaluate({"async": false});
        let retour=r.result; 
        var succes="";
        if(retour>95){
            succes="<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("liber.lang82")+"</h4>";
        }else if(retour<critique){
            succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("liber.lang83")+"</h4>";
        }else if(retour<=inforesult){
            succes="<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("liber.lang84")+"</h4>";
        }else{
            succes="<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("liber.lang85")+"</h4>";
        }

        const texte = "Lance " + name + " : 1d100 - " + inforesult + succes;

        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: texte
        });
    }
}