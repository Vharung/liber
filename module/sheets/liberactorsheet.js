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
        console.log(data);        
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
        /*html.find('.religionchoix').on('click',function(){ 
            var clanliste=html.find('.religionlist').val();
            html.find('.religion').val(clanliste);
        });*/

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
        /*html.find('.choixtalent').on('click',function(){
            var talentliste=html.find('.talentliste').val();
            html.find('.talent').val(talentliste);
        });
        html.find('.choixfaiblesse').on('click',function(){
            var faiblesseliste=html.find('.faiblesseliste').val();
            html.find('.faiblesse').val(faiblesseliste);
        });*/

        //caractere aléatoire
        html.find('.caractergen').on('click',function(){ //lang
            var demeure = [game.i18n.localize("liber.caract1"),game.i18n.localize("liber.caract2"),game.i18n.localize("liber.caract3"),game.i18n.localize("liber.caract4"),game.i18n.localize("liber.caract5"),game.i18n.localize("liber.caract6"),game.i18n.localize("liber.caract7"),game.i18n.localize("liber.caract8"),game.i18n.localize("liber.caract9"),game.i18n.localize("liber.caract10"),game.i18n.localize("liber.caract11"),game.i18n.localize("liber.caract12")];
            var proximite=[game.i18n.localize("liber.caract13"),game.i18n.localize("liber.caract14"),game.i18n.localize("liber.caract15")];
            var lieu=[game.i18n.localize("liber.caract16"),game.i18n.localize("liber.caract17"),game.i18n.localize("liber.caract18"),game.i18n.localize("liber.caract19"),game.i18n.localize("liber.caract20"),game.i18n.localize("liber.caract21"),game.i18n.localize("liber.caract22"),game.i18n.localize("liber.caract23"),game.i18n.localize("liber.caract24"),game.i18n.localize("liber.caract25"),game.i18n.localize("liber.caract26"),game.i18n.localize("liber.caract27"),game.i18n.localize("liber.caract28"),game.i18n.localize("liber.caract29"),game.i18n.localize("liber.caract30"),game.i18n.localize("liber.caract31"),game.i18n.localize("liber.caract32"),game.i18n.localize("liber.caract33"),game.i18n.localize("liber.caract34")];
            var resident = demeure[Math.floor(Math.random()*demeure.length)]+" "+proximite[Math.floor(Math.random()*proximite.length)]+" "+lieu[Math.floor(Math.random()*lieu.length)];
            html.find('.residence').val(resident);
            var famille = ["Crochet","Valone","Parker","Onile","Pasteur","Labrocante","Vincente","Auditoré","Laporte","Blanchart","Giroux","Lesourd","Houillons","Castagné","Delasaintecroix","Macon","Chaumont","Lucent","Hover","Packard","Curie","Lyon","Lallemand","Langlais","Lecure","Macdonald","Dupont","Lafontaine","Boucher","Boureau","Godspeak","Pierre","Solitaire","Beauregard","Charmant","Marechal","Dufour","Leroux","Lemoine","Lombart","Lefourbe","Boulanger","Petit","Blanc","Chevalier","Leroy","Lebrun","Silver","Delarue","Notigame","Forest","Tonneau","Does","Martin","Deschamps","Dupuis","Macalisteur","Leloup","Bouquin","Lafleur","","Dugrenier","Lacroix","Lecomte","Poulain","Dumas"];
            var titre=[game.i18n.localize("liber.caract35"),game.i18n.localize("liber.caract36"),game.i18n.localize("liber.caract37"),game.i18n.localize("liber.caract38"),game.i18n.localize("liber.caract39"),game.i18n.localize("liber.caract40"),game.i18n.localize("liber.caract41"),game.i18n.localize("liber.caract42"),game.i18n.localize("liber.caract43"),game.i18n.localize("liber.caract44"),game.i18n.localize("liber.caract45"),game.i18n.localize("liber.caract46"),game.i18n.localize("liber.caract47"),game.i18n.localize("liber.caract48"),game.i18n.localize("liber.caract49"),game.i18n.localize("liber.caract50")];
            var sang = titre[Math.floor(Math.random()*titre.length)]+" de la famille "+famille[Math.floor(Math.random()*famille.length)];
            html.find('.sang').val(sang);       
            var rang=[game.i18n.localize("liber.caract51"),game.i18n.localize("liber.caract52"),game.i18n.localize("liber.caract53"),game.i18n.localize("liber.caract54"),game.i18n.localize("liber.caract55"),game.i18n.localize("liber.caract56"),game.i18n.localize("liber.caract57"),game.i18n.localize("liber.caract58"),game.i18n.localize("liber.caract59")]
            var organisation=[game.i18n.localize("liber.caract60"),game.i18n.localize("liber.caract61"),game.i18n.localize("liber.caract62"),game.i18n.localize("liber.caract63"),game.i18n.localize("liber.caract64"),game.i18n.localize("liber.caract65"),game.i18n.localize("liber.caract66"),game.i18n.localize("liber.caract67"),game.i18n.localize("liber.caract68"),game.i18n.localize("liber.caract69"),game.i18n.localize("liber.caract70"),game.i18n.localize("liber.caract71"),game.i18n.localize("liber.caract72"),game.i18n.localize("liber.caract73"),game.i18n.localize("liber.caract74"),game.i18n.localize("liber.caract75"),game.i18n.localize("liber.caract76"),game.i18n.localize("liber.caract77"),game.i18n.localize("liber.caract78"),game.i18n.localize("liber.caract79")]
            var politique=rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.secte').val(politique);
            var intret=[game.i18n.localize("liber.caract80"),game.i18n.localize("liber.caract81"),game.i18n.localize("liber.caract82"),game.i18n.localize("liber.caract83"),game.i18n.localize("liber.caract84"),game.i18n.localize("liber.caract85"),game.i18n.localize("liber.caract86"),game.i18n.localize("liber.caract87"),game.i18n.localize("liber.caract88"),game.i18n.localize("liber.caract89"),game.i18n.localize("liber.caract90"),game.i18n.localize("liber.caract91"),game.i18n.localize("liber.caract92"),game.i18n.localize("liber.caract93"),game.i18n.localize("liber.caract94"),game.i18n.localize("liber.caract95"),game.i18n.localize("liber.caract96"),game.i18n.localize("liber.caract97"),game.i18n.localize("liber.caract98"),game.i18n.localize("liber.caract99"),game.i18n.localize("liber.caract100"),game.i18n.localize("liber.caract101"),game.i18n.localize("liber.caract102")]
            var groupe=intret[Math.floor(Math.random()*intret.length)]
            html.find('.interet').val(groupe);
            var pertes=[game.i18n.localize("liber.caract103"),game.i18n.localize("liber.caract104"),game.i18n.localize("liber.caract105"),game.i18n.localize("liber.caract106"),game.i18n.localize("liber.caract107"),game.i18n.localize("liber.caract108"),game.i18n.localize("liber.caract109"),game.i18n.localize("liber.caract110"),game.i18n.localize("liber.caract111"),game.i18n.localize("liber.caract112"),game.i18n.localize("liber.caract113"),game.i18n.localize("liber.caract114"),game.i18n.localize("liber.caract115"),game.i18n.localize("liber.caract116"),game.i18n.localize("liber.caract117"),game.i18n.localize("liber.caract118")]
            var dc=pertes[Math.floor(Math.random()*pertes.length)]
            html.find('.proche').val(dc);
            var valeur=[game.i18n.localize("liber.caract119"),game.i18n.localize("liber.caract120"),game.i18n.localize("liber.caract121"),game.i18n.localize("liber.caract122"),game.i18n.localize("liber.caract123"),game.i18n.localize("liber.caract124"),game.i18n.localize("liber.caract125"),game.i18n.localize("liber.caract126"),game.i18n.localize("liber.caract127"),game.i18n.localize("liber.caract128"),game.i18n.localize("liber.caract129"),game.i18n.localize("liber.caract130"),game.i18n.localize("liber.caract131")]
            var moral=valeur[Math.floor(Math.random()*valeur.length)]
            html.find('.moral').val(moral);
            var race=[game.i18n.localize("liber.caract132"),game.i18n.localize("liber.caract133"),game.i18n.localize("liber.caract134"),game.i18n.localize("liber.caract135"),game.i18n.localize("liber.caract136"),game.i18n.localize("liber.caract137")]
            var rang=[game.i18n.localize("liber.caract138"),game.i18n.localize("liber.caract139"),game.i18n.localize("liber.caract140"),game.i18n.localize("liber.caract141"),game.i18n.localize("liber.caract142"),game.i18n.localize("liber.caract143"),game.i18n.localize("liber.caract144"),game.i18n.localize("liber.caract145")]
            var organisation=[game.i18n.localize("liber.caract146"),game.i18n.localize("liber.caract147"),game.i18n.localize("liber.caract148"),game.i18n.localize("liber.caract149"),game.i18n.localize("liber.caract150"),game.i18n.localize("liber.caract151"),game.i18n.localize("liber.caract152"),game.i18n.localize("liber.caract153"),game.i18n.localize("liber.caract154"),game.i18n.localize("liber.caract155"),game.i18n.localize("liber.caract156"),game.i18n.localize("liber.caract157"),game.i18n.localize("liber.caract158"),game.i18n.localize("liber.caract159"),game.i18n.localize("liber.caract160"),game.i18n.localize("liber.caract161"),game.i18n.localize("liber.caract162"),game.i18n.localize("liber.caract163"),game.i18n.localize("liber.caract164"),game.i18n.localize("liber.caract165")];
            var amour=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.amour').val(amour)
            var ami=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.amitie').val(ami);
            var haine=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.haine').val(haine);
            var profession=[game.i18n.localize("liber.caract166"),game.i18n.localize("liber.caract167"),game.i18n.localize("liber.caract168"),game.i18n.localize("liber.caract169"),game.i18n.localize("liber.caract170"),game.i18n.localize("liber.caract171"),game.i18n.localize("liber.caract172"),game.i18n.localize("liber.caract173"),game.i18n.localize("liber.caract174"),game.i18n.localize("liber.caract175"),game.i18n.localize("liber.caract176"),game.i18n.localize("liber.caract177"),game.i18n.localize("liber.caract178"),game.i18n.localize("liber.caract179"),game.i18n.localize("liber.caract180"),game.i18n.localize("liber.caract181"),game.i18n.localize("liber.caract182"),game.i18n.localize("liber.caract183"),game.i18n.localize("liber.caract184"),game.i18n.localize("liber.caract185"),game.i18n.localize("liber.caract186"),game.i18n.localize("liber.caract187"),game.i18n.localize("liber.caract188"),game.i18n.localize("liber.caract189"),game.i18n.localize("liber.caract190"),game.i18n.localize("liber.caract191"),game.i18n.localize("liber.caract192"),game.i18n.localize("liber.caract193"),game.i18n.localize("liber.caract194"),game.i18n.localize("liber.caract195"),game.i18n.localize("liber.caract196"),game.i18n.localize("liber.caract197"),game.i18n.localize("liber.caract198"),game.i18n.localize("liber.caract199"),game.i18n.localize("liber.caract200"),game.i18n.localize("liber.caract201"),game.i18n.localize("liber.caract202"),game.i18n.localize("liber.caract203")]
            var metier=profession[Math.floor(Math.random()*profession.length)]
            html.find('.principale').val(metier);
            var metier=profession[Math.floor(Math.random()*profession.length)]
            html.find('.secondaire').val(metier);
            var loisir=[game.i18n.localize("liber.caract204"),game.i18n.localize("liber.caract205"),game.i18n.localize("liber.caract206"),game.i18n.localize("liber.caract207"),game.i18n.localize("liber.caract208"),game.i18n.localize("liber.caract209"),game.i18n.localize("liber.caract210"),game.i18n.localize("liber.caract211"),game.i18n.localize("liber.caract212"),game.i18n.localize("liber.caract213"),game.i18n.localize("liber.caract214"),game.i18n.localize("liber.caract215"),game.i18n.localize("liber.caract216"),game.i18n.localize("liber.caract217"),game.i18n.localize("liber.caract218"),game.i18n.localize("liber.caract219"),game.i18n.localize("liber.caract220"),game.i18n.localize("liber.caract221"),game.i18n.localize("liber.caract222"),game.i18n.localize("liber.caract223"),game.i18n.localize("liber.caract224")]
            var metier=loisir[Math.floor(Math.random()*loisir.length)]
            html.find('.passion').val(metier);
            var caracterelist=[game.i18n.localize("liber.caract225"),game.i18n.localize("liber.caract226"),game.i18n.localize("liber.caract227"),game.i18n.localize("liber.caract228"),game.i18n.localize("liber.caract229"),game.i18n.localize("liber.caract230"),game.i18n.localize("liber.caract231"),game.i18n.localize("liber.caract232"),game.i18n.localize("liber.caract233"),game.i18n.localize("liber.caract234"),game.i18n.localize("liber.caract235"),game.i18n.localize("liber.caract236"),game.i18n.localize("liber.caract237")]
            var caractere=caracterelist[Math.floor(Math.random()*caracterelist.length)]
            html.find('.caractere').val(caractere);
            var personnalitelist=[game.i18n.localize("liber.caract238"),game.i18n.localize("liber.caract239"),game.i18n.localize("liber.caract240"),game.i18n.localize("liber.caract241"),game.i18n.localize("liber.caract242"),game.i18n.localize("liber.caract243"),game.i18n.localize("liber.caract244"),game.i18n.localize("liber.caract245"),game.i18n.localize("liber.caract246"),game.i18n.localize("liber.caract247"),game.i18n.localize("liber.caract248"),game.i18n.localize("liber.caract249"),game.i18n.localize("liber.caract250"),game.i18n.localize("liber.caract251"),game.i18n.localize("liber.caract252"),game.i18n.localize("liber.caract253"),game.i18n.localize("liber.caract254"),game.i18n.localize("liber.caract255")]
            var personnalite=personnalitelist[Math.floor(Math.random()*personnalitelist.length)]
            html.find('.personnalite').val(personnalite);
            var visionlist=[game.i18n.localize("liber.caract256"),game.i18n.localize("liber.caract257"),game.i18n.localize("liber.caract258"),game.i18n.localize("liber.caract259"),game.i18n.localize("liber.caract260"),game.i18n.localize("liber.caract261"),game.i18n.localize("liber.caract262"),game.i18n.localize("liber.caract263"),game.i18n.localize("liber.caract264"),game.i18n.localize("liber.caract265"),game.i18n.localize("liber.caract266"),game.i18n.localize("liber.caract267"),game.i18n.localize("liber.caract268"),game.i18n.localize("liber.caract269"),game.i18n.localize("liber.avantrace62")]
            var vision="Rempli de "+visionlist[Math.floor(Math.random()*visionlist.length)]
            html.find('.monde').val(vision);
            var objectiflist=[game.i18n.localize("liber.caract270"),game.i18n.localize("liber.caract271"),game.i18n.localize("liber.caract275"),game.i18n.localize("liber.caract273"),game.i18n.localize("liber.caract274"),game.i18n.localize("liber.caract275"),game.i18n.localize("liber.caract276"),game.i18n.localize("liber.caract277"),game.i18n.localize("liber.caract278")]
            var objectif=objectiflist[Math.floor(Math.random()*objectiflist.length)]
            html.find('.objectif').val(objectif);
            var racunelist=[game.i18n.localize("liber.oui"),game.i18n.localize("liber.non"),game.i18n.localize("liber.bof")]
            var racune=racunelist[Math.floor(Math.random()*racunelist.length)]
            html.find('.rancunier').val(racune);
            var tarelist=[game.i18n.localize("liber.caract279"),game.i18n.localize("liber.caract280"),game.i18n.localize("liber.caract281"),game.i18n.localize("liber.caract282"),game.i18n.localize("liber.caract283"),game.i18n.localize("liber.caract284"),game.i18n.localize("liber.caract285"),game.i18n.localize("liber.caract286"),game.i18n.localize("liber.caract287"),game.i18n.localize("liber.caract288"),game.i18n.localize("liber.caract289"),game.i18n.localize("liber.caract290"),game.i18n.localize("liber.caract291"),game.i18n.localize("liber.caract292"),game.i18n.localize("liber.caract293"),game.i18n.localize("liber.caract294"),game.i18n.localize("liber.caract295"),game.i18n.localize("liber.caract296"),game.i18n.localize("liber.caract297"),game.i18n.localize("liber.caract298"),game.i18n.localize("liber.caract299"),game.i18n.localize("liber.caract300"),game.i18n.localize("liber.caract301"),game.i18n.localize("liber.caract302"),game.i18n.localize("liber.caract303"),game.i18n.localize("liber.caract304"),game.i18n.localize("liber.caract305"),game.i18n.localize("liber.caract306"),game.i18n.localize("liber.caract307"),game.i18n.localize("liber.caract308"),game.i18n.localize("liber.caract309"),game.i18n.localize("liber.caract310"),game.i18n.localize("liber.caract311"),game.i18n.localize("liber.caract312"),game.i18n.localize("liber.caract313"),game.i18n.localize("liber.caract314"),game.i18n.localize("liber.caract315"),game.i18n.localize("liber.caract316"),game.i18n.localize("liber.caract317"),game.i18n.localize("liber.caract318"),game.i18n.localize("liber.caract319"),game.i18n.localize("liber.caract320"),game.i18n.localize("liber.caract321"),game.i18n.localize("liber.caract322"),game.i18n.localize("liber.caract323"),game.i18n.localize("liber.caract324"),game.i18n.localize("liber.caract325"),game.i18n.localize("liber.caract326"),game.i18n.localize("liber.caract327"),game.i18n.localize("liber.caract328"),game.i18n.localize("liber.caract329"),game.i18n.localize("liber.caract330"),game.i18n.localize("liber.caract331"),game.i18n.localize("liber.caract332"),game.i18n.localize("liber.caract333"),game.i18n.localize("liber.caract334"),game.i18n.localize("liber.caract335"),game.i18n.localize("liber.caract336"),game.i18n.localize("liber.caract337"),game.i18n.localize("liber.caract338"),game.i18n.localize("liber.caract339"),game.i18n.localize("liber.caract340"),game.i18n.localize("liber.caract341"),game.i18n.localize("liber.caract342"),game.i18n.localize("liber.caract343"),game.i18n.localize("liber.caract344"),game.i18n.localize("liber.caract345"),game.i18n.localize("liber.caract346"),game.i18n.localize("liber.caract347"),game.i18n.localize("liber.caract348"),game.i18n.localize("liber.caract349"),game.i18n.localize("liber.caract350"),game.i18n.localize("liber.caract351"),game.i18n.localize("liber.caract352"),game.i18n.localize("liber.caract353"),game.i18n.localize("liber.caract354"),game.i18n.localize("liber.caract355"),game.i18n.localize("liber.caract356"),game.i18n.localize("liber.caract357"),game.i18n.localize("liber.caract358"),game.i18n.localize("liber.caract359"),game.i18n.localize("liber.caract360"),game.i18n.localize("liber.caract361"),game.i18n.localize("liber.caract362"),game.i18n.localize("liber.caract363"),game.i18n.localize("liber.caract364"),game.i18n.localize("liber.caract36"),game.i18n.localize("liber.caract366"),game.i18n.localize("liber.caract367"),game.i18n.localize("liber.caract368"),game.i18n.localize("liber.caract369"),game.i18n.localize("liber.caract370"),game.i18n.localize("liber.caract371"),game.i18n.localize("liber.caract372"),game.i18n.localize("liber.caract373"),game.i18n.localize("liber.caract374"),game.i18n.localize("liber.caract375"),game.i18n.localize("liber.caract376"),game.i18n.localize("liber.caract377"),game.i18n.localize("liber.caract378"),game.i18n.localize("liber.caract379"),game.i18n.localize("liber.caract380"),game.i18n.localize("liber.caract381"),game.i18n.localize("liber.caract382"),game.i18n.localize("liber.caract383"),game.i18n.localize("liber.caract384"),game.i18n.localize("liber.caract385"),game.i18n.localize("liber.caract386"),game.i18n.localize("liber.caract387"),game.i18n.localize("liber.caract388"),game.i18n.localize("liber.caract389"),game.i18n.localize("liber.caract390"),game.i18n.localize("liber.caract391"),game.i18n.localize("liber.caract392"),game.i18n.localize("liber.caract393"),game.i18n.localize("liber.caract394"),game.i18n.localize("liber.caract395"),game.i18n.localize("liber.caract396"),game.i18n.localize("liber.caract397"),game.i18n.localize("liber.caract398"),game.i18n.localize("liber.caract399"),game.i18n.localize("liber.caract400"),game.i18n.localize("liber.caract401"),game.i18n.localize("liber.caract402"),game.i18n.localize("liber.caract403"),game.i18n.localize("liber.caract404"),game.i18n.localize("liber.caract405"),game.i18n.localize("liber.caract406"),game.i18n.localize("liber.caract407"),game.i18n.localize("liber.caract408"),game.i18n.localize("liber.caract409"),game.i18n.localize("liber.caract410"),game.i18n.localize("liber.caract411"),game.i18n.localize("liber.caract412"),game.i18n.localize("liber.caract413"),game.i18n.localize("liber.caract414"),game.i18n.localize("liber.caract415"),game.i18n.localize("liber.caract416"),game.i18n.localize("liber.caract417"),game.i18n.localize("liber.caract418"),game.i18n.localize("liber.caract419"),game.i18n.localize("liber.caract420"),game.i18n.localize("liber.caract421"),game.i18n.localize("liber.caract422"),game.i18n.localize("liber.caract423"),game.i18n.localize("liber.caract424"),game.i18n.localize("liber.caract425"),game.i18n.localize("liber.caract426"),game.i18n.localize("liber.caract427"),game.i18n.localize("liber.caract428"),game.i18n.localize("liber.caract429"),game.i18n.localize("liber.caract430"),game.i18n.localize("liber.caract431")]
            var tare=tarelist[Math.floor(Math.random()*tarelist.length)]
            html.find('.tare').val(tare);
            var obsessionlist=[game.i18n.localize("liber.oui"),game.i18n.localize("liber.non"),game.i18n.localize("liber.bof")]
            var obsession=obsessionlist[Math.floor(Math.random()*obsessionlist.length)]
            html.find('.obsession').val(obsession);
            var distinguelist=[game.i18n.localize("liber.oui"),game.i18n.localize("liber.non"),game.i18n.localize("liber.bof")]
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

        
        //Stat base
        var b_psy=Math.round((parseInt(ment)+(parseInt(soci)/2)-parseInt(phys)+5)/4+2);
        var b_nb=Math.round(parseInt(b_psy)/4)+1+parseInt(level);
        var b_cout=Math.round((parseInt(b_psy)-parseInt(b_nb))/2)+3;

        //stat actuel
        var psy=parseInt(html.find('.psymax').val());
        var PVmin=Math.round(parseInt(phys)/3);
        var PSYmin=b_psy;
        var cout=Math.round((parseInt(psy)-parseInt(b_nb))/2)+3;
        //calcul cout et nb sort
        var xcout=Math.floor((parseInt(psy)-parseInt(b_nb))/2+3);//cout sort        
        var corbeau=this.actor.data.data.clan;
        if(corbeau !=game.i18n.localize("liber.avantrace56")){
            xcout=level;
        }

        var listsort=this.actor.sort;
        var nbsorts=listsort.length;
        var calsort=parseInt(b_nb)-parseInt(nbsorts);
        html.find('.maxsort').val(calsort);
        html.find('.coutmax').val(cout);
        if(calsort<0){
            //alert(game.i18n.localize("liber.alert4"));
            html.find('.maxsort').css({color:"red"});
        }else{
            html.find('.maxsort').css({color:"white"});
        }
        var hpmax=parseInt(html.find('.hpmax').val());
        var psymax=parseInt(html.find('.psymax').val());
        
        if(hpmax<PVmin && this.actor.data.type=="personnage" && hpmax!=0){
           html.find('.hpmax').val(PVmin);
        }
        if(psymax<PSYmin && this.actor.data.type=="personnage" && psymax!=0 && corbeau !=game.i18n.localize("liber.avantrace56")){
           html.find('.psymax').val(PSYmin);
        }
        var pointxp=(level-1)*3;
        var calcultotxp=hpmax-PVmin+psymax-PSYmin;
        if(calcultotxp>pointxp && this.actor.data.type=="personnage" ){
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