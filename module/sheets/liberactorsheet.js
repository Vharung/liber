import { liber } from "./class/config.js";
import { Character } from "./class/class_Character.js";
import { CaracteristiqueModifier } from "./class/class_Caracteristique.js";
import { SortsPossibles } from "./class/class_Sortspossibles.js";
import {names, armes, items0, items1, items2, items3, items4, metiers, races, clans, demeure, proximite, lieu, famille,titre,rang, organisation, intret, pertes, expece, valeur, prof, loisir, caracterelist, personnalitelist, visionlist, objectiflist, ouinon, tarelist} from "./class/const.js";
import {range} from "./class/list.js";

/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */


export class LiberActorSheet extends ActorSheet {
    /** 
     
@override*/
    static get defaultOptions() {
        console.log('defaults')
        return foundry.utils.mergeObject(super.defaultOptions, {
          classes: ["Liber", "sheet", "actor"],
          width: 640,
          height: 880,
          dragDrop: [{dragSelector: ".draggable", dropSelector: null},{dragSelector: ".ability", dropSelector: null}],
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    get template() {
        console.log('templates')
        if(this.actor.type==game.i18n.localize("TYPES.Actor.pnj") || this.actor.type==game.i18n.localize("TYPES.Actor.personnage")){
            return `systems/liber/templates/sheets/personnage-sheet.html`;
        }else {
            return `systems/liber/templates/sheets/monstre-sheet.html`;
        }
    }
    async getData(options) {
        // Récupération des données de la méthode parente
        const context = await super.getData(options);
        
        var poidsactor='';
        // Initialisation des propriétés supplémentaires
        context.dtypes = ["String", "Number", "Boolean"];
        context.config = liber;
        context.listValues = {
                clan:{},
                dure:range.dure,
                faiblesse: {},
                magie:range.magie,
                temps: range.temps,
                metier: {},
                race: range.race,
                religion: {},
                sex: range.sex,
                talent: range.talent,
                temps:range.temps                
            };
        /*ajout clan et magie dispo*/
        const race=context.actor.system.race;
        const clan=context.actor.system.clan; 
        const relig=context.actor.system.religion; 
        const racess = {
            ['r0']: ["dragon","all"],
            ['r21']: ["dragon","all"],
            ['r1']: ["humain","all"],
            ['r2']: ["demon","all"],
            ['r3']: ["drauch","all"],
            ['r4']: ["aucun"],
            ['r19']:["aucun"]
        };
        console.log()
        const raceElements = racess[race];
        if (raceElements) {
            raceElements.forEach(element => {
                for (let key in range.religion ) {
                    if (range.religion[key].classe === element && clan!=='c17') {
                        context.listValues.religion[key] = range.religion[key];
                    }
                }
                for (let key in range.clan) {
                    if (range.clan[key].classe === element) {
                        context.listValues.clan[key] = range.clan[key];
                    }
                }
            });
        }else{
            context.listValues.religion = {...range.religion};
            context.listValues.clan = {...range.clan};
        }
        /*ajout metier*/
        
        if(clan=='c18'){
            for (let key in range.metier) {
                if (range.metier[key].classe === 'guerrier') {
                    context.listValues.metier[key] = range.metier[key];
                }
            }
        }else if(relig=='r2'){
            for (let key in range.metier) {
                if (range.metier[key].classe === 'croiser') {
                    context.listValues.metier[key] = range.metier[key];
                }
            }
        } else {
            for (let key in range.metier) {
                if (range.metier[key].classe !== 'croiser' && range.metier[key].classe !== 'guerrier') {
                    context.listValues.metier[key] = range.metier[key];
                }
            }
        }
        //faiblesse des celestes
        for (let key in range.faiblesse) {
            if(race=='r19'){
                if(key=='f11'){
                    context.listValues.faiblesse[key] = range.faiblesse[key].label ;
                }
            }else {
                context.listValues.faiblesse[key] = range.faiblesse[key].label ;
            }
        }
        if (this.actor.type == game.i18n.localize("TYPES.Actor.personnage") || this.actor.type == game.i18n.localize("TYPES.Actor.pnj") || this.actor.type == game.i18n.localize("TYPES.Actor.monstre")) {
            this._prepareCharacterItems(context);await this._onEncom();
        }
        if (this.actor.type == game.i18n.localize("TYPES.Actor.personnage") || this.actor.type == game.i18n.localize("TYPES.Actor.pnj") ) {
           this._onStat();//await suppr
        }
        console.log(context);
        return context;
    }

   
    _prepareCharacterItems(sheetData) {
        const actorData = sheetData.actor;
        // Initialize containers.
        const arme = [];
        const armure = [];
        const inventaire = [];
        const sort = [];
        const argent = [];

        for (let i of sheetData.items) {
          let item = i.items;
          i.img = i.img || DEFAULT_TOKEN;
          if (i.type === game.i18n.localize("TYPES.Item.arme") ){
            arme.push(i);
          }
          else if (i.type === game.i18n.localize("TYPES.Item.armure")) {
            armure.push(i);
          }
          else if (i.type === game.i18n.localize("TYPES.Item.objet")) {
            inventaire.push(i);
          }
          else if (i.type === game.i18n.localize("TYPES.Item.magie")) {
            sort.push(i);
          }
          else if (i.type === game.i18n.localize("TYPES.Item.argent")) {
            argent.push(i);
          }
        }
        sort.sort((a, b) => a.system.cout - b.system.cout);
        inventaire.sort(function (a, b) {if (a.name < b.name) {return -1;} else {return 1;}});
        arme.sort(function (a, b) {if (a.name < b.name) {return -1;} else {return 1;}});
        armure.sort(function (a, b) {if (a.name < b.name) {return -1;} else {return 1;}});
       
        // Assign and return
        actorData.inventaire = inventaire;
        actorData.sort = sort;
        actorData.argent = argent;
        actorData.armure = armure;
        actorData.arme = arme;
    }


    activateListeners(html){
        super.activateListeners(html);
        //this.addDragAndDropListeners();

        html.find('.maindroite, .maingauche, .armor, .desequi').click(this._onArmor.bind(this));
        //html.find('.attribut').click(this._onAttr.bind(this));
        html.on('click', '.attribut', this._onAttr.bind(this));
        html.find('.resetbonus, .resetmalus').click(this._onRestAttr.bind(this));
       

        //Jet de des
        html.find('.jetdedes, .jetdedegat, .attaque, .attaques').click(this._onRoll.bind(this));
       
        //generateur
        html.find('.ficheperso').click(this._onGenerator.bind(this));

        //monstre level up
        if(this.actor.type==game.i18n.localize("TYPES.Actor.monstre")){
            html.find('.levelup').click(this._onLevelUp.bind(this));
        }

        //Magie lancer un sort
        html.find('.item-lancer').click(this._onSpell.bind(this));
        html.find('.item-info').click(this._onInfo.bind(this));
        html.find('.item-random').click(this._onRandom.bind(this));

        //Se reposer
        html.find('.reposer').click(this._onSleep.bind(this));

        html.find('.posture').click(this._onPosture.bind(this));
        html.find('.chnget').click(this._onCouv.bind(this));
        //html.find('.item-filter ').click(this._onSecondary.bind(this));

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
            li.slideUp(200, () => this.render(false));
        });

        html.find('.item-create').click(ev => {
            event.preventDefault();
            const dataType=$(ev.currentTarget).data('type');
            const name = `New ${dataType.capitalize()}`;
            this.actor.createEmbeddedDocuments('Item', [{ name: name, type: dataType }], { renderSheet: true })
        });

        html.find('.addsort').click(ev => {//bug
            event.preventDefault();
            const name=html.find('.magieslistes option:selected').val()
            const img=html.find('.magieslistes option:selected').data('img')
            const description=html.find('.magieslistes option:selected').data('description');
            const cout=html.find('.magieslistes option:selected').data('cout');
            const classe=html.find('.magieslistes option:selected').data('classe');
            const cible=html.find('.magieslistes option:selected').data('cible');
            const degat=html.find('.magieslistes option:selected').data('degat');
            const duree=html.find('.magieslistes option:selected').data('duree');
            this.actor.createEmbeddedDocuments('Item', [{ name: name,img: img, type: 'magie', 'system.description' : description, 'system.classe' : classe, 'system.cible' : cible, 'system.cout' : cout, 'system.duree' : duree }], { renderSheet: false })
        });

        //title talent et faiblesse
        let ttitle=this.actor.system.talent;
        ttitle=range.talent[ttitle].title;
        html.find('.talent').attr('title',ttitle);

        let ftitle=this.actor.system.faiblesse;
        ftitle=range.faiblesse[ftitle].title;
        html.find('.faiblesse').attr('title',ftitle);

        /*var ttitle=html.find('.talentliste option:selected').attr('title');
        var ftitle=html.find('.faiblesseliste option:selected').attr('title');
        html.find('.talent').attr('title',ttitle);
        html.find('.faiblesse').attr('title',ftitle);*/

        let compe='';
        html.find(".compt").each(function() {
            var input = $(this).find("input");
            var span = $(this).find('a').html();
            var valor = parseInt(input.val());
            
            if (valor === 0) {
                input.css({"background":"transparent","color": "#fff"});
            } else if (valor > 0) {
                input.css({"background":"#56853b","color": "white"});
                compe += '<div class="resume"><a class="attribut" data-val="'+valor+'" title="span"><span>'+valor+'</span> '+span+'</a></div>';
            } else if (valor < 0) {
                input.css({"background":"#a51b1b","color": "white"});
                compe += '<div class="resume"><a class="attribut" data-val="'+valor+'" title="span"><span>'+valor+'</span> '+span+'</a></div>';
            }
        });
        html.find(".competences").html(compe);

        //test des capacités acrives
        $( ".tableaucreation input" ).each(function( index ) {
          var valor= $( this ).val();
          if(valor>0){
            $( this ).css({"background":"#56853b","color": "white"});
          }else if(valor<0){
            $( this ).css({"background":"#a51b1b","color": "white"});
          }
        });

        html.find('.item-filter').click(ev => {

            const tab=$(ev.currentTarget).data('tab');console.log(tab)
            html.find('.items li').removeClass('active');
             if(tab=='' || tab=='tous'){
                html.find('.items li').addClass('active');
            }else if(tab=='armes'){
                $('.items li.armes').addClass("active");
            }else if(tab=='armures'){
                $('.items li.armures').addClass("active");
            }else if(tab=='objets'){
                $('.items li.objets').addClass("active");
            }
        });


        //Avantage
        var avant=html.find('.avant').val();
        var desan=html.find('.desan').val();
        var insoin=html.find('.insoin').val();
        var fatigue=html.find('.fatig').val();
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
        if(insoin>0){
            html.find('.insoin').css("opacity", "1");
        }else {
            html.find('.insoin').css("opacity", "0.5");
        }
        if(fatigue>0){
            html.find('.fatig').css("opacity", "1");
        }else {
            html.find('.fatig').css("opacity", "0.5");
        }

        //Posture
        let postures=html.find('.postures').val();
        if(postures=="focus"){
            html.find('.focus').css("opacity", "1");
        }else if(postures=="offensif"){
            html.find('.offensif').css("opacity", "1");
                   
        }else if(postures=="defensif"){
            html.find('.defensif').css("opacity", "1");
           
        }else if(postures=="presage"){
            html.find('.presage').css("opacity", "1");
           
        }else{
            html.find('.aucune').css("opacity", "1");
           
        }
        
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
        for (var i = 0;i < poids.length ; i++) {
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
        this.actor.update({'system.encombrement.value': total});
        html.find('.barenc').css({"width":pourcentage+"%"});
        var autre=html.find('.clanliste option:selected').val()
        var autres=html.find('.religionliste option:selected').val()
        if(autre=="c20" && autres=="r14"){
            html.find('.bucketmagie').css({"display":"none"});
        }
        var hp= html.find('.hp').val();


        // Vérifier si les points de vie sont égaux à 0
        if (hp <= 0) {
            // Appliquer le style CSS pour le fond lorsque les points de vie sont égaux à 0

                $('#LiberActorSheet-Actor-'+this.actor._id).css('background', 'linear-gradient(230deg, rgba(190,25,25,1) 0%, rgba(25,25,25,1) 100%)');

        } else {
            // Réinitialiser les styles CSS lorsque les points de vie sont supérieurs à 0

                $('#LiberActorSheet-Actor-'+this.actor._id).css('background', 'linear-gradient(218deg, #2a2b2c 0%, #120304 100%)');

        }



        //test stat
        let phys=html.find('.physiqueValue').val();
        let forc=html.find('.forceValue').val();
        let agil=html.find('.agiliteValue').val();
        let soci=html.find('.socialValue').val();
        let char=html.find('.charismeValue').val();
        let saga=html.find('.sagaciteValue').val();
        let ment=html.find('.mentalValue').val();
        let astu=html.find('.astValue').val();
        let memo=html.find('.memoireValue').val();
        let race=html.find('.race').val();
        let max=170;
        /*if(race==game.i18n.localize("liber.avantrace61")){
            max=175;
        }*/
        if(this.actor.type!==game.i18n.localize("TYPES.Actor.monstre")){
            if((parseInt(phys)+parseInt(soci)+parseInt(ment))>max){
                html.find('.physique').css({"border":"red solid 1px"});    
                html.find('.social').css({"border":"red solid 1px"})
                html.find('.mental').css({"border":"red solid 1px"})
            }
            if(phys<(parseInt(forc)+parseInt(agil))){
                html.find('.force').css({"border":"red solid 1px"});    
                html.find('.agilite').css({"border":"red solid 1px"});    
            }
            if(soci<(parseInt(char)+parseInt(saga))){
                html.find('.charisme').css({"border":"red solid 1px"});    
                html.find('.sagacite').css({"border":"red solid 1px"})
            }
            if(ment<(parseInt(astu)+parseInt(memo))){
                html.find('.ast').css({"border":"red solid 1px"});    
                html.find('.memoire').css({"border":"red solid 1px"})
            }
        }
       
        let j=0;
        html.find( ".religionliste option" ).each(function( index ) {
            if ( $( this ).val() == game.i18n.localize('liber.avantrace85')) {
                if(j>0){
                   $( this ).css({"display":'none'});
                }
                j++;
            }
        });

        //const clan = html.find('.clanliste option:selected').val();
        //const race=this.actor.system.race; 
        const clan=this.actor.system.clan; 
        const reli=this.actor.system.religion; 
        console.log(race)
        if(race=='r4'){
            html.find('.magi').css("display", "none");
            html.find('.magieslistes').css("display", "none");
        }
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
 
    _onRoll(event){ 
        //lancer de dés
        //déclaration des variables
        var monJetDeDes = event.target.dataset["dice"];
        var name = event.target.dataset["name"];
        let type=event.target.dataset["type"];
        var texte='';
        var roll=null;
    
        //var compétence
        let bonus =this.actor.system.bonus;
        let malus =this.actor.system.malus;
        let posture =this.actor.system.posture;
        let maxstat = event.target.dataset["attdice"];
        let fatigue = this.actor.system.fatigue;
        var bonuspost=0;
        var critique=5;
        var succes="";
        var degats=0;
        let addfat=0;
        let encours=this.actor.system.encombrement.value;
        let encmax=this.actor.system.encombrement.max;
        let encdif=0;
        const listedemain =armes.mains;

        //var degat
        var img=event.target.dataset["img"];
        var desc=event.target.dataset["desc"];
        let qarme=event.target.dataset["name"];

        //var automatisation
        let statphy = this.actor.system.ability.physique;
        var hp=null;
        var nom='';let button='';
   
        //Jet de dès  compétences
        if(type=="jetdedes" || type=="auto"){
            if(type=="auto"){name='Physique';maxstat=this.actor.system.ability.physique;}
            if(posture=="focus"){bonuspost=5;}
            else if(posture=="offensif"){critique=10;}
            if(bonus==""){bonus=0;}
            if(malus==""){malus=0;}
            if(name=='physique' || name=='force' || name=='agilite'){
                if(this.actor.type==game.i18n.localize("TYPES.Actor.monstre")){
                    addfat=0
                }else {
                    if(encours>encmax){
                        encdif=Math.floor(parseInt(encours)-parseInt(encmax));
                    }
                    addfat=5*parseInt(fatigue)+encdif
                }
            }
            let inforesult=parseInt(maxstat)+parseInt(bonus)+bonuspost+parseInt(malus)-parseInt(addfat);
            if(inforesult>95){inforesult=95;}
            else if(inforesult<5){inforesult=5;}
            let r = new Roll("1d100");
            roll=r.evaluate({"async": false});
            let retour=r.result;

            if(retour>95){
                succes="<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("echecri")+"</h4>";
                degats=0;
            }else if(retour<=critique){
                succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("reusicri")+"</h4>";
                degats=2;
            }else if(retour<=inforesult){
                succes="<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("reussite")+"</h4>";
                degats=1;
            }else{
                succes="<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("Echec")+"</h4>";
                degats=0;
            }

            if(degats>0 && type=="auto"){

                if(qarme=="attaques"){
                    if(degats==2){
                        monJetDeDes='('+this.actor.system.armeuse.degatd+')*'+degats;
                    }else{
                        monJetDeDes=this.actor.system.armeuse.degatd;
                    }
                    var nam = this.actor.system.armeuse.armed;
                }else{
                    if(degats==2){
                        monJetDeDes='('+this.actor.system.armeuse.degatg+')*'+degats;
                    }else{
                        monJetDeDes=this.actor.system.armeuse.degatg;
                    }
                    var nam = this.actor.system.armeuse.armeg;
                }
            }
            texte = '<span style="flex:auto"><p class="resultatp">Jet de ' + name + " : " + inforesult +'/100</p>'+succes
            if(name=="physique"){
                let {armed,degatd,desd,imgd,armeg,degatg,desg,imgg} = this.actor.system.armeuse;
                for (let i = listedemain.length - 1; i >= 0; i--) {
                    if(armed.includes(listedemain[i]) || armeg.includes(listedemain[i])){
                        button+='<button class="addfats" style="cursor:pointer;margin-bottom: 5px;" data-actorid="'+ this.actor._id+'">'+game.i18n.localize("addptfatigue")+'</button>';///FR
                    }
                }
            
                if(armed){
                    button+='<button class="roll-damage" style="cursor:pointer;margin-bottom: 5px;" data-name="'+armed+'" data-actorid="'+
                this.actor._id+'" data-dice="'+degatd+'" data-img="'+imgd
                +'" data-desc="'+desd+'" data-type="jetdedegat">'+game.i18n.localize("use")+' '+armed+'</button>';
                }
                if(armeg){
                    button+='<button class="roll-damage" style="cursor:pointer" data-name="'+armeg+'" data-actorid="'+
                this.actor._id+'" data-dice="'+degatg+'" data-img="'+imgg
                +'" data-desc="'+desg+'" data-type="jetdedegat">'+game.i18n.localize("use")+' '+armeg+'</button>';
                }
               
               

            }
            texte+=button+'</span>';
            //info Tchat    
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this }),
                flavor: texte
            });

        }
       
        //Jet de dégât
        if(type=="jetdedegat" || type=="auto"){
            if(desc==""){var info='';}
            else {var info='</span><span class="desctchat" style="display:block;">'+desc+'</span>';}
            if(degats>0 || type=="jetdedegat"){
                let r = new Roll(monJetDeDes);
                roll=r.evaluate({"async": false});  
            }
            if(type=="auto"){
                let {armed,degatd,desd,imgd,armeg,degatg,desg,imgg} = this.actor.system.armeuse;
                for (let i = listedemain.length - 1; i >= 0; i--) {
                    if(armed.includes(listedemain[i]) || armeg.includes(listedemain[i])){
                        fatigue++;
                        this.actor.update({'system.fatigue': fatigue});
                    }
                }
                game.user.targets.forEach(i => {
                    nom=i.document.name;
                    hp = i.document._actor.system.hp.value;
                    var armor=i.document.actor.system.protection
                    var armormag=i.document.actor.system.protectionmagique;
                    var perce=["Dague","Masse d'arme","Masse Lourd","Arbalète"]//Fr
                    var passe=0;
                    for (var j = perce.length - 1; j >= 0; j--) {
                        if(nam==perce[j]){
                            passe=1
                        }
                    }
                    if(passe==0){
                        var degat=parseInt(roll.total)-parseInt(armor)-parseInt(armormag)
                    }else{
                        var degat=parseInt(roll.total)-parseInt(armormag)
                    }  

                    if(degat>0){
                        hp=parseInt(hp)-degat;
                        if(hp<=0){
                            console.log(i)
                            hp=0;//mort automatique
                            i.actor.createEmbeddedDocuments("ActiveEffect", [
                              {label: 'Mort', icon: 'icons/svg/skull.svg', flags: { core: { statusId: 'dead' } } }
                            ]);
                            console.log(i)

                        }
                        i.actor.update({'system.hp.value': hp});
                    }
                })  

            }
            if(degats>0 || type=="jetdedegat"){
                texte = '<span style="flex:auto"><p class="resultatp"><img src="'+img+'"  width="24" height="24"/>&nbsp;'+game.i18n.localize("use")+' ' + name + '<p>'+info;//Fr
       
                //info Tchat    
                roll.toMessage({
                    speaker: ChatMessage.getSpeaker({ actor: this }),
                    flavor: texte
                });  
            }
           
        }
       
   
        // Mort de la cible
        if(hp==0 && type=="auto") {
            var tuer=[game.i18n.localize("mort0"),game.i18n.localize("mort1")game.i18n.localize("mort2")game.i18n.localize("mort3"),game.i18n.localize("mort4"),game.i18n.localize("mort5")];//Fr
            var d=Math. round(Math.random() * tuer.length);
            texte = "<span style='flex:auto'><p class='resultatp'>"+tuer[d]+"&nbsp; <span style='text-transform:uppercase;font-weight: bold;'> "+nom+"</span></span></span>";
            let chatData = {
                speaker: ChatMessage.getSpeaker({ actor: this }),
                content: texte
            };
            ChatMessage.create(chatData, {});
        }
    }
   
    _onSpell(event){
        let mental =this.actor.system.ability.mental;
        let physique =this.actor.system.ability.physique;
        let social =this.actor.system.ability.social;
        let bonus =this.actor.system.bonus;
        let malus =this.actor.system.malus;
        let posture =this.actor.system.posture;
        let classe=event.target.dataset["class"];
        var cout=event.target.dataset["cout"];
        var name=event.target.dataset["name"];
        var desc=event.target.dataset["desc"];
        var img=event.target.dataset["img"];
        var dice=event.target.dataset["dice"];
        var psy=this.actor.system.psy.value;
        var hp=this.actor.system.hp.value;
        var insoin=this.actor.system.insoin;
        var bonuspost=0;
        var critique=5
        if(posture=="focus"){
            bonuspost=5;
        }else if(posture=="offensif"){
            critique=10;
        }

        if(bonus==undefined){
            bonus=0;
        }
        if(classe=="Corbeau"){//bug potentielle
            var inforesult=parseInt(physique)+parseInt(bonus)+bonuspost+parseInt(malus);
        }else if(classe=="Troubadour"){//bug potentielle
            var inforesult=parseInt(social)+parseInt(bonus)+bonuspost+parseInt(malus);
        }else {
            var inforesult=parseInt(mental)+parseInt(bonus)+bonuspost+parseInt(malus);
        }

        if(inforesult>95){
        inforesult=95;
        }else if(inforesult<5){
        inforesult=5;
        }
        let r = new Roll("1d100");
        var roll=r.evaluate({"async": false});
        let retour=r.result;
        var succes="";
        var degat=0;
        if(retour>95){
            succes="<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("liber.lang82")+"</h4>";degat=0;
        }else if(retour<=critique){
            succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("liber.lang83")+"</h4>";degat=2;
        }else if(retour<=inforesult){
            succes="<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("liber.lang84")+"</h4>";degat=1;
        }else{
            succes="<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("liber.lang85")+"</h4>";degat=0;
        }
        if(posture=="focus"){
           cout=parseInt(cout)-1;
        }
        if(cout<0){
            cout=0;
        }
        cout=parseInt(cout);psy=parseInt(psy);
        if(cout<psy){
            console.log('sort lancer :'+psy+'-'+cout)//bug
            psy = parseInt(psy)-parseInt(cout)
        }else{
            console.log('sort lancer insoin :'+psy+'<'+cout)//bug
            var diff= parseInt(cout)-parseInt(psy)
            hp=parseInt(hp)-parseInt(diff);
            psy=0;
            insoin= parseInt(insoin)+parseInt(diff);            
        }
       
       
        let button ='';
        if(dice){
            button='<button class="roll-damage" style="cursor:pointer" data-name="'+name+'" data-actorid="'+this.actor._id+'" data-dice="'+dice+'" data-img="'+img+'" data-desc="'+desc+'" data-type="jetdedegat">Lancer les dès</button>'
        }
        this.actor.update({"system.insoin": insoin,"system.hp.value": hp,"system.psy.value": psy});
        const texte = '<span style="flex:auto"><p class="infosort"><span class="resultatp" style="cursor:pointer"><img src="'+img+'"  width="24" height="24"/>&nbsp;' + name  +' : '+ inforesult +'/100</span><span class="desctchat">'+desc+'</span></p>'+succes+
        button+'</span>';
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this }),
            flavor: texte
        });
    }

    _onInfo(event){
        var name=event.target.dataset["name"];
        console.log(name)
        var desc=event.target.dataset["desc"];
        var img=event.target.dataset["img"];
        var cout=event.target.dataset["cout"];
        var type=event.target.dataset["type"];
        if(type=="magie"){
            var cost=game.i18n.localize("liber.cout")' : '+cout+' Psy';
        }else{
            var cost=game.i18n.localize("liber.cout")' : '+cout+' écu'
        }
        var portrait='<img src="icons/svg/mystery-man.svg" width="36" height="36" class="chat-portrait-message-portrait-generic" style="border: 2px solid rgb(255, 255, 255);">';
        const texte = '<span style="flex:auto"><p class="infosort"><span class="resultatp" style="cursor:pointer"><img src="'+img+'"  width="24" height="24"/>&nbsp;' + name  +'</span><span class="desctchat" style="display:block;">'+desc+'<span style="text-align:right; float:right; margin-top:25px">'+cost+'</span></span></p></span>';
        let chatData = {
            speaker: ChatMessage.getSpeaker({ actor: this }),
            content: texte
        };
        ChatMessage.create(chatData, {});
    }

    _onSleep(event){
        let { talent, heure, jour, repos, level, psy: { value: psy, max: psymax }, hp: { value: hp, max: hpmax }, insoin, fatigue } = this.actor.system;
        let d = 0, hpadd = 0, psyadd = 0, j = 0, fatadd = 0;
        if (jour === game.i18n.localize("liber.jour")) {
          heure = parseInt(heure) * 24;
          j = Math.floor(parseInt(heure) / 3);
        }
        switch (repos) {
          case game.i18n.localize("liber.rapide"):
            d = Math.round(Math.random() * 4);
            hpadd = ((d + parseInt(level)) * parseInt(heure)) / 8;
            psyadd = Math.floor((parseInt(level) * parseInt(heure)) / 2);
            break;

          case game.i18n.localize("liber.calme"):
            d = Math.round(Math.random() * 6);
            hpadd = ((d + parseInt(level)) * parseInt(heure)) / 8;
            psyadd = Math.floor(parseInt(level) * parseInt(heure));
            fatadd = Math.floor(1 * parseInt(heure));
            if (talent === "t8") {
              hpadd = parseInt(hpadd) + 6;
              psyadd = parseInt(psyadd) + 3;
              fatadd = parseInt(fatadd) + 1;
            }
            break;

          case game.i18n.localize("liber.calme2"):
            d = Math.round(Math.random() * 6);
            insoin = 0;
            hpadd = (d + parseInt(level)) * parseInt(heure);
            psyadd = Math.floor(parseInt(level) * parseInt(heure));
            fatadd = Math.floor(2 * parseInt(heure));
            if (talent === "t8") {
              hpadd = parseInt(hpadd) + 6;
              psyadd = parseInt(psyadd) + 3;
              fatadd = parseInt(fatadd) + 1;

            }
            break;

          case game.i18n.localize("liber.intensif"):
            d = Math.round(Math.random() * 8);
            insoin = 0;
            hpadd = ((2 * d) + parseInt(level)) * parseInt(heure);
            psyadd = Math.floor(parseInt(level) * parseInt(heure));
            fatadd = Math.floor(3 * parseInt(heure));
            if (talent === "t8") {
              hpadd = parseInt(hpadd) + 6;
              psyadd = parseInt(psyadd) + 3;
              fatadd = parseInt(fatadd) + 1;
            }
            break;

          default:
            break;
        }
        console.log(hpadd)
        hpadd = Math.min(hpadd, parseInt(hpmax) - parseInt(hp));
        hp = parseInt(hpadd) + parseInt(hp);
        fatigue=parseInt(fatigue)-fatadd
        if (hp > hpmax) {hp = hpmax;}

        psyadd = Math.min(psyadd, parseInt(psymax) - parseInt(psy));
        psy = parseInt(psy) + parseInt(psyadd);

        if (psy > psymax) {psy = psymax;}
        if (fatigue < 0) {fatigue = 0;}

        if (hpmax === hp && insoin > 0) {
          hp = parseInt(hpmax) - parseInt(insoin);
          hpadd = parseInt(hpadd) - parseInt(insoin);
        }
        this.actor.update({ "system.insoin": insoin, "system.hp.value": hp, "system.psy.value": psy, "system.fatigue": fatigue });

        const texte = '<span style="flex:auto"><p class="resultatp">' + game.i18n.localize("liber.repos") + ' ' + repos + ' +' + hpadd + 'hp / +' + psyadd + 'psy </p></span>';
        const chatData = {
            speaker: ChatMessage.getSpeaker({ actor: this }),
            content: texte
        };
        ChatMessage.create(chatData, {});
    }

    _onPosture(event){
        const POSTURE_MESSAGES = {
          focus: game.i18n.localize("liber.lang88"),
          offensif: game.i18n.localize("liber.lang86"),
          defensif: game.i18n.localize("liber.lang87"),
          presage: game.i18n.localize("liber.lang90"),
          aucune: game.i18n.localize("liber.lang89"),
        };

        const postures = event.target.dataset["posture"];
        const texte = `<span style="flex:auto"><p class="resultatp">${POSTURE_MESSAGES[postures]}</p></span>`;

        const chatData = {
          speaker: ChatMessage.getSpeaker({ actor: this}),
          content: texte,
        };
        console.log('chat')
        ChatMessage.create(chatData, {});
        this.actor.update({"system.posture": postures});
    }

    async _onGenerator(event){
        //intitialisation 
        let hp=3; let psy=0; let phy=10; let forc=5; let agil=5; let soc=10; let saga=5; let char=5; let men=10; let astu=5; let memo=5; let armureperso =0;
        
        //Variable
        let sexe = this.actor.system.sexe;
        let race = this.actor.system.race;
        let talent = this.actor.system.talent;
        let faiblesse = this.actor.system.faiblesse;
        let clan = this.actor.system.clan;
        let religion = this.actor.system.religion;
        let profession = this.actor.system.metier;
        let restant = this.actor.system.restant;
        let avantagerace='';
        

        if (!sexe) sexe=game.i18n.localize("liber.sex1");
        if (!race) race=game.i18n.localize("liber.avantrace60");
        if (!talent) talent=game.i18n.localize("liber.title58");
        if (!faiblesse) faiblesse=game.i18n.localize("liber.title58");
        if (!clan) clan = game.i18n.localize("liber.avantrace40");
        if (!religion) religion = game.i18n.localize("liber.avantrace84");
        if (!profession) profession = game.i18n.localize("liber.metier1");

        const newperso = new Character(sexe, talent, faiblesse, race, clan, religion, profession);
        let name = newperso.characterName(sexe, race); 
        const img = await newperso.AvatarPath(race, sexe);console.log(img)
        let histoire = newperso.characterStory(sexe, race);
        let stat = newperso.characterStat(race,clan,religion,profession);
        let breed = newperso.characterRace(race);

        // Initialisation des clés cpt0 à cpt57 avec une valeur par défaut de 0
        const valeursCpts = {};
        for (let i = 0; i <= 57; i++) {
            valeursCpts[`cpt${i}`] = 0;
        }

        // Vérification de l'existence de breed[1] et mise à jour des valeurs si nécessaire
        if (breed[1] !== null) {
            for (let key in breed[1]) {
                if (breed[1].hasOwnProperty(key)) {
                    // Vérifier si la clé correspond au format 'cpt' suivi d'un nombre entre 0 et 57
                    if (/^cpt[0-5]?[0-9]$/.test(key) && parseInt(key.substring(3)) <= 57) {
                        valeursCpts[key] = breed[1][key];
                    }
                }else {
                    valeursCpts[key]=0;
                }
            }
        }

        for (let i = 0; i <= 57; i++) {
            const cptKey = `cpt${i}`;
            if (stat[cptKey]) {
                valeursCpts[cptKey] = (valeursCpts[cptKey] || 0) + stat[cptKey];
            }
        }
        console.log(clan);
        let royal=newperso.characterClan(clan);
        if(race==game.i18n.localize("liber.avantrace77a")){
            avantagerace=game.i18n.localize(breed[2]);
        }else {
            avantagerace=game.i18n.localize(breed[2]) + game.i18n.localize(royal[1]) ;
        }
            
        let characterData = newperso.characterCaract();
        let updates = {'name': name,'img': img,'system.histoire': histoire,'system.bonusrace': avantagerace,'system.protection' : breed[0],'system.hp.max': stat['hp'],'system.hp.value': stat['hp'],'system.psy.max': stat['psy'],'system.psy.value': stat['psy'],'system.ability.physique':stat['phy'],'system.ability.force':stat['forc'],'system.ability.agilite':stat['agil'],'system.ability.social':stat['soc'],'system.ability.sagacite':stat['saga'],'system.ability.charisme':stat['char'],'system.ability.mental':stat['men'],'system.ability.ast':stat['astu'],'system.ability.memoire':stat['memo'],'system.caracteristique.acrobatie':valeursCpts['cpt0'],'system.caracteristique.agilites':valeursCpts['cpt1'],'system.caracteristique.alchimie':valeursCpts['cpt2'],'system.caracteristique.apprentissage':valeursCpts['cpt3'],'system.caracteristique.hast':valeursCpts['cpt4'],'system.caracteristique.cc':valeursCpts['cpt5'],'system.caracteristique.lancer':valeursCpts['cpt6'],'system.caracteristique.melee':valeursCpts['cpt7'],'system.caracteristique.tir':valeursCpts['cpt8'],'system.caracteristique.art':valeursCpts['cpt9'],'system.caracteristique.assassinat':valeursCpts['cpt10'],'system.caracteristique.baton':valeursCpts['cpt11'],'system.caracteristique.bouclier':valeursCpts['cpt12'],'system.caracteristique.bricolage':valeursCpts['cpt13'],'system.caracteristique.presence':valeursCpts['cpt14'],'system.caracteristique.chercher':valeursCpts['cpt15'],'system.caracteristique.commander':valeursCpts['cpt16'],'system.caracteristique.concentration':valeursCpts['cpt17'],'system.caracteristique.nature':valeursCpts['cpt18'],'system.caracteristique.peuples':valeursCpts['cpt19'],'system.caracteristique.religions':valeursCpts['cpt20'],'system.caracteristique.geographique':valeursCpts['cpt21'],'system.caracteristique.rue':valeursCpts['cpt22'],'system.caracteristique.heretiques':valeursCpts['cpt23'],'system.caracteristique.combat':valeursCpts['cpt24'],'system.caracteristique.commerce':valeursCpts['cpt25'],'system.caracteristique.crochetage':valeursCpts['cpt26'],'system.caracteristique.discretion':valeursCpts['cpt27'],'system.caracteristique.dexterite':valeursCpts['cpt28'],'system.caracteristique.detection':valeursCpts['cpt29'],'system.caracteristique.dissimulation':valeursCpts['cpt30'],'system.caracteristique.dressage':valeursCpts['cpt31'],'system.caracteristique.ennemi':valeursCpts['cpt32'],'system.caracteristique.equilibre':valeursCpts['cpt33'],'system.caracteristique.equitation':valeursCpts['cpt34'],'system.caracteristique.escroquerie':valeursCpts['cpt35'],'system.caracteristique.esquiver':valeursCpts['cpt36'],'system.caracteristique.puissance':valeursCpts['cpt37'],'system.caracteristique.astuce':valeursCpts['cpt38'],'system.caracteristique.peur':valeursCpts['cpt39'],'system.caracteristique.joueur':valeursCpts['cpt40'],'system.caracteristique.maitrise':valeursCpts['cpt41'],'system.caracteristique.natation':valeursCpts['cpt42'],'system.caracteristique.navigation':valeursCpts['cpt43'],'system.caracteristique.orientation':valeursCpts['cpt44'],'system.caracteristique.persuasion':valeursCpts['cpt45'],'system.caracteristique.pister':valeursCpts['cpt46'],'system.caracteristique.prophetie':valeursCpts['cpt47'],'system.caracteristique.secours':valeursCpts['cpt48'],'system.caracteristique.resistance':valeursCpts['cpt49'],'system.caracteristique.psychologue':valeursCpts['cpt50'],'system.caracteristique.medecine':valeursCpts['cpt51'],'system.caracteristique.survie':valeursCpts['cpt52'],'system.caracteristique.tueur':valeursCpts['cpt53'],'system.caracteristique.objet':valeursCpts['cpt54'],'system.caracteristique.veterinaire':valeursCpts['cpt55'],'system.caracteristique.vigilance':valeursCpts['cpt56'],'system.caracteristique.vise':valeursCpts['cpt57'],'system.caractere.residence' : characterData['resident'],'system.caractere.sang' : characterData['sang'],'system.caractere.politique' : characterData['politique'],'system.caractere.interets' : characterData['groupe'],'system.caractere.deces' : characterData['dc'],'system.caractere.moral' : characterData['moral'],'system.caractere.amour' : characterData['amour'],'system.caractere.amitie' : characterData['ami'],'system.caractere.haine' : characterData['haine'],'system.caractere.principale' : characterData['metier1'],'system.caractere.secondaire' : characterData['metier2'],'system.caractere.passion' : characterData['metier3'],'system.caractere.caract' : characterData['caractere'],'system.caractere.personnalite' : characterData['personnalite'],'system.caractere.perception' : characterData['vision'],'system.caractere.objectif' : characterData['objectif'],'system.caractere.rancunier' : characterData['racune'],'system.caractere.tare' : characterData['tare'],'system.caractere.obsession' : characterData['obsession'],'system.caractere.distingue' : characterData['distingue']};        
        this.actor.update(updates);
    }
   
    _onArmor(event){
        const equipe=event.target.dataset["equip"];
        const listedemain =armes.mains;
        let { protection,race} = this.actor.system;
        let { armure,desa,imga,armed,degatd,desd,imgd,armeg,degatg,desg,imgg} = this.actor.system.armeuse;
        const { img, des, name, degat } = event.target.dataset;
        let armor = 0;
        let arm=armure; let ard=desa; let ari=imga;
        const DROITE = "droite";const GAUCHE = "gauche";


        if (equipe === DROITE || equipe === GAUCHE || equipe === "ddroite" || equipe === "dgauche") {
          for (let i = listedemain.length - 1; i >= 0; i--) {
              const nameInListedemain = name && name.includes(listedemain[i]);
              const armedInListedemain = armed && armed.includes(listedemain[i]);
              const armegInListedemain = armeg && armeg.includes(listedemain[i]);

              if (nameInListedemain || armedInListedemain || armegInListedemain) {
                if (equipe === DROITE) {
                  armeg = "";
                  degatg = "";
                  desg = "";
                  imgg = "";
                } else if (equipe === GAUCHE) {
                  armed = "";
                  degatd = "";
                  desd = "";
                  imgd = "";
                }
              }
            }
            if (equipe === DROITE) {
              armed = name;
              degatd = degat;
              desd = des;
              imgd = img;
            } else if (equipe === GAUCHE) {
              armeg = name;
              degatg = degat;
              desg = des;
              imgg = img;
            } else if (equipe === "ddroite") {
              armed = "";
              degatd = "";
              desd = "";
              imgd = "";
            } else if (equipe === "dgauche") {
              armeg = "";
              degatg = "";
              desg = "";
              imgg = "";
            }
        }else {
            if(equipe=== 'armure'){
                arm=name; ard=des; ari=img;
            }else if(equipe=== 'darmure'){
                arm=''; ard=''; ari='';
            }
        }
        if(race=="r0"){
            armor = 2;
        }
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
        this.actor.update({'system.protection': armor,'system.armeuse.armure': arm,'system.armeuse.desa': ard,'system.armeuse.imga': ari,'system.armeuse.armed': armed,'system.armeuse.degatd': degatd,'system.armeuse.imgd': imgd,'system.armeuse.desd': desd,'system.armeuse.armeg': armeg,'system.armeuse.degatg': degatg,'system.armeuse.imgg': imgg,'system.armeuse.desg': desg});
    }

    _onLevelUp(event){
        var lvl=this.actor.system.level;
        var pv=this.actor.system.hp.max;
        var ps=this.actor.system.psy.max;
        var ar=this.actor.system.protection;
        console.log(ar)
        pv=parseInt(pv)+3;
        ps=parseInt(ps)+3;
        var bonus=0;
        if(ar==undefined||ar==""){
            ar=0;
        }
        ar++;
        if(ar>8){
            ar=8;
        }
        lvl++;
        let itemData= this.actor.items.filter(i=>i.name == game.i18n.localize("liber.attack"));  
        var iditem= itemData[0].id;
        var dgt = itemData[0].data.system.degats;
        itemData[0].DegatLvl();

        this.actor.update({'system.hp.max': pv,'system.hp.value': pv,'system.psy.max': ps,'system.psy.value': ps,'system.protection': ar,'system.level': lvl});
    }

    async _onCouv(event){//bug
        let idn=event.target.dataset["lettre"];
        let effet=this.actor.effects;
        let lists=[game.i18n.localize("liber.etat0"),game.i18n.localize("liber.etat1"),game.i18n.localize("liber.etat2"),game.i18n.localize("liber.etat3"),game.i18n.localize("liber.etat4"),game.i18n.localize("liber.etat5"),game.i18n.localize("liber.etat6"),game.i18n.localize("liber.etat7"),game.i18n.localize("liber.etat8"),game.i18n.localize("liber.etat9"),game.i18n.localize("liber.etat10"),game.i18n.localize("liber.etat11"),game.i18n.localize("liber.etat12"),game.i18n.localize("liber.etat3")]
        var nomRecherche=lists[idn];
        var estPresent = effet.some(function(element) {
            return element.name === nomRecherche;
        });
        var etre='Est';
        if (estPresent) {
            var effetAChercher = this.actor.effects.find(function(effect) {
                return effect.name === nomRecherche;
            });
            var idEffet = effetAChercher._id;

        // Suppression de l'effet en utilisant l'ID
            this.actor.deleteEmbeddedDocuments("ActiveEffect", [idEffet])
            etre="N'est plus";
        } else {
            this.actor.createEmbeddedDocuments("ActiveEffect", [{name: nomRecherche}]);
        }
        var texte = "<span style='flex:auto'><p class='resultatp'>"+etre+" &nbsp; <span style='text-transform:uppercase;font-weight: bold;'> "+lists[idn]+"</span></span></span>";
        let chatData = {
            speaker: ChatMessage.getSpeaker({ actor: this }),
            content: texte
        };
        ChatMessage.create(chatData, {});        
    }

    _onAttr(event){
        var val=event.target.dataset["val"];
        this.actor.update({"system.bonus":val});
    }

    _onRestAttr(event){
        var name=event.target.dataset["name"];
        if(name=="malus"){
            this.actor.update({"system.malus":0});
        }else if(name=="bonus"){
            this.actor.update({"system.bonus":0});  
        }  
    }

    _onEncom(){
        const type=this.actor.system.race;
        const compt = this.actor.system.talent
        const faible = this.actor.system.faiblesse
        let forc=this.actor.system.ability.force;
        let puis=this.actor.system.caracteristique.puissance;
        let enc=0;
        let ajout=0;
        if(type==game.i18n.localize("liber.avantrace77b")){
            ajout=20;
            return
        }else if(type==game.i18n.localize("liber.taille0")){//bug potentielle mettre en liste
            this.actor.update({"system.encombrement.max":enc});
            return
        }else if(type==game.i18n.localize("liber.taille1")){
            ajout=10;
        }else if(type==game.i18n.localize("liber.taille2")){
            ajout=30;
        }else if(type==game.i18n.localize("liber.taille3")){
            ajout=100;
        }else if(type==game.i18n.localize("liber.taille4")){
            ajout=1000;
        }else{
            ajout=35;
        }
        if(forc==''){forc=0}
        if(puis==''){puis=0}
        enc=(parseInt(forc)+ parseInt(puis)) /2 + ajout;
        if(compt=="t24"){//bug potentielle
            enc=parseInt(enc)+10
        }
        if(faible=="f4"){
            enc=parseInt(enc)-10
        }
        this.actor.update({"system.encombrement.max":enc});
    }

    async _onStat(event){//a tester
        // Récupérer les informations du personnage depuis les propriétés de la classe
        let sexe = this.actor.system.sexe;
        let race = this.actor.system.race;
        let talent = this.actor.system.talent;
        let faiblesse = this.actor.system.faiblesse;
        let clan = this.actor.system.clan;
        let religion = this.actor.system.religion;
        let profession = this.actor.system.metier;
        let restant = this.actor.system.restant;
        let abilities = this.actor.system.ability;
        let level = this.actor.system.level;
        let hpmax = this.actor.system.hp.max;
        let psyvalue = this.actor.system.psy.value;
        let hp = this.actor.system.hp.value;
        let psy = this.actor.system.psy.max;
        let cpt0=this.actor.system.caracteristique.acrobatie;let cpt1=this.actor.system.caracteristique.agilites;let cpt2=this.actor.system.caracteristique.alchimie;let cpt3=this.actor.system.caracteristique.apprentissage;let cpt4=this.actor.system.caracteristique.hast;let cpt5=this.actor.system.caracteristique.cc;let cpt6=this.actor.system.caracteristique.lancer;let cpt7=this.actor.system.caracteristique.melee;let cpt8=this.actor.system.caracteristique.tir;let cpt9=this.actor.system.caracteristique.art;let cpt10=this.actor.system.caracteristique.assassinat;let cpt11=this.actor.system.caracteristique.baton;let cpt12=this.actor.system.caracteristique.bouclier;let cpt13=this.actor.system.caracteristique.bricolage;let cpt14=this.actor.system.caracteristique.presence;let cpt15=this.actor.system.caracteristique.chercher;let cpt16=this.actor.system.caracteristique.commander;let cpt17=this.actor.system.caracteristique.concentration;let cpt18=this.actor.system.caracteristique.nature;let cpt19=this.actor.system.caracteristique.peuples;let cpt20=this.actor.system.caracteristique.religions;let cpt21=this.actor.system.caracteristique.geographique;let cpt22=this.actor.system.caracteristique.rue;let cpt23=this.actor.system.caracteristique.heretiques;let cpt24=this.actor.system.caracteristique.combat;let cpt25=this.actor.system.caracteristique.commerce;let cpt26=this.actor.system.caracteristique.crochetage;let cpt27=this.actor.system.caracteristique.discretion;let cpt28=this.actor.system.caracteristique.dexterite;let cpt29=this.actor.system.caracteristique.detection;let cpt30=this.actor.system.caracteristique.dissimulation;let cpt31=this.actor.system.caracteristique.dressage;let cpt32=this.actor.system.caracteristique.ennemi;let cpt33=this.actor.system.caracteristique.equilibre;let cpt34=this.actor.system.caracteristique.equitation;let cpt35=this.actor.system.caracteristique.escroquerie;let cpt36=this.actor.system.caracteristique.esquiver;
        let cpt37=this.actor.system.caracteristique.puissance;let cpt38=this.actor.system.caracteristique.astuce;let cpt39=this.actor.system.caracteristique.peur;let cpt40=this.actor.system.caracteristique.joueur;let cpt41=this.actor.system.caracteristique.maitrise;let cpt42=this.actor.system.caracteristique.natation;let cpt43=this.actor.system.caracteristique.navigation;let cpt44=this.actor.system.caracteristique.orientation;let cpt45=this.actor.system.caracteristique.persuasion;let cpt46=this.actor.system.caracteristique.pister;let cpt47=this.actor.system.caracteristique.prophetie;let cpt48=this.actor.system.caracteristique.secours;let cpt49=this.actor.system.caracteristique.resistance;let cpt50=this.actor.system.caracteristique.psychologue;let cpt51=this.actor.system.caracteristique.medecine;let cpt52=this.actor.system.caracteristique.survie;let cpt53=this.actor.system.caracteristique.tueur;let cpt54=this.actor.system.caracteristique.objet;let cpt55=this.actor.system.caracteristique.veterinaire;let cpt56=this.actor.system.caracteristique.vigilance;let cpt57=this.actor.system.caracteristique.vise;

        let reste=170-(parseInt(abilities.physique)+parseInt(abilities.social)+parseInt(abilities.mental));
        let resultat=35+(parseInt(level)*15);
        // Initialiser les valeurs par défaut
        if (!sexe) sexe=game.i18n.localize("liber.sex1");
        if (!race) race=game.i18n.localize("liber.avantrace60");
        if (!talent) talent=game.i18n.localize("liber.title58");
        if (!faiblesse) faiblesse=game.i18n.localize("liber.title58");
        if (!clan) clan = game.i18n.localize("liber.avantrace40");
        if (!religion) religion = game.i18n.localize("liber.avantrace81");
        if (!profession) profession = game.i18n.localize("liber.metier1");
        if (!level) level = 1;if (!psy) psy = 0;
        if(!abilities.physique) abilities.physique=10;
        if(!abilities.force) abilities.force=5;
        if(!abilities.agilite) abilities.agilite=5;
        if(!abilities.social) abilities.social=10;
        if(!abilities.charisme) abilities.charisme=5;
        if(!abilities.sagacite) abilities.sagacite=5;
        if(!abilities.mental) abilities.mental=10;
        if(!abilities.ast) abilities.astuce=5;
        if(!abilities.memoire) abilities.memoire=5;
        let mag0 = 'aucun';let mag1 = 'aucun';let mag2 = 'aucun';;let mag3 = 'aucun';let mag4 = 'aucun';let mag5 = 'aucun';let all = 0;

        const raceMagMap = {//bug potentielle
          [game.i18n.localize('liber.avantrace56')]: 'corbeau',
          [game.i18n.localize('liber.metier12')]: 'troubadour',
          [game.i18n.localize('liber.avantrace57')]: 'humain',
          [game.i18n.localize('liber.avantrace39')]: 'demon',
          [game.i18n.localize('liber.avantrace40')]: 'air',
          [game.i18n.localize('liber.avantrace41')]: 'eau',
          [game.i18n.localize('liber.avantrace42')]: 'esprit',
          [game.i18n.localize('liber.avantrace43')]: 'feu',
          [game.i18n.localize('liber.avantrace44')]: 'foudre',
          [game.i18n.localize('liber.avantrace45')]: 'glace',
          [game.i18n.localize('liber.avantrace46')]: 'illusion',
          [game.i18n.localize('liber.avantrace47')]: 'invocation',
          [game.i18n.localize('liber.avantrace48')]: 'mort',
          [game.i18n.localize('liber.avantrace49')]: 'nature',
          [game.i18n.localize('liber.avantrace50')]: 'poison',
          [game.i18n.localize('liber.avantrace51')]: 'telekinesie',
          [game.i18n.localize('liber.avantrace52')]: 'terre',
          [game.i18n.localize('liber.avantrace53')]: 'ultime',
          [game.i18n.localize('liber.avantrace54')]: 'vie',
          [game.i18n.localize('liber.avantrace55')]: 'ombre',
          [game.i18n.localize('liber.avantrace59')]: 'constellation',
          [game.i18n.localize('liber.avantrace78')]: 'autre'
        };
        const reliMagMap = {
          [game.i18n.localize('liber.avantrace80')]: 'vharung',
          [game.i18n.localize('liber.avantrace81')]: 'nouvelordre',
          [game.i18n.localize('liber.avantrace82')]: 'croise',
          [game.i18n.localize('liber.avantrace83')]: 'lumiere',
          [game.i18n.localize('liber.avantrace84')]: 'ombre',
          [game.i18n.localize('liber.avantrace85')]: 'waetra',
          [game.i18n.localize('liber.caract63b')]: 'cercle',
          [game.i18n.localize('liber.avantrace90')]: 'rune',
          [game.i18n.localize('liber.avantrace86')]: 'ancien',
          [game.i18n.localize('liber.avantrace87')]: 'baphomet',
          [game.i18n.localize('liber.avantrace89')]: 'vaudou',
          [game.i18n.localize('liber.avantrace95')]: 'monnaie',
          [game.i18n.localize('liber.avantrace78')]: 'autre'
        };

        if(clan==game.i18n.localize('liber.avantrace91')){
            mag1 = "illusion";
            mag2 = "feu";
        }else if(race==game.i18n.localize('liber.avantrace77a')){
            mag0 = "lumiere";
            mag1 = "croise";
            mag2 = "humain";
            mag3 = "nouvelordre";
            mag4 = "vharung";
            mag5 = "vie";
        } else if (clan && clan !== 'undefined' && raceMagMap[clan]) {
          mag1 = raceMagMap[clan];
        }
       

        if(profession==game.i18n.localize('liber.metier12')){
           mag1= 'troubadour'
        }
        if (reliMagMap[religion]) {
          mag2 = reliMagMap[religion];
        }
        if(clan==game.i18n.localize('liber.avantrace59')){
           mag2= '';
           
        }
        
        const newperso = new Character(sexe, talent, faiblesse, race, clan, religion, profession);
        const valeursCpts = {};
        let cpts=[cpt0,cpt1,cpt2,cpt3,cpt4,cpt5,cpt6,cpt7,cpt8,cpt9,cpt10,cpt11,cpt12,cpt13,cpt14,cpt15,cpt16,cpt17,cpt18,cpt19,cpt20,cpt21,cpt22,cpt23,cpt24,cpt25,cpt26,cpt27,cpt28,cpt29,cpt30,cpt31,cpt32,cpt33,cpt34,cpt35,cpt36,cpt37,cpt38,cpt39,cpt40,cpt41,cpt42,cpt43,cpt44,cpt45,cpt46,cpt47,cpt48,cpt49,cpt50,cpt51,cpt52,cpt53,cpt54,cpt55,cpt56,cpt57]
        for (let i = 0; i < cpts.length; i++) {
            valeursCpts[`cpt${i}`] = cpts[i];
            var ajout = cpts[i];
            if (ajout > 20) {
                ajout = 20;
                cpts[i] = 20;
            }
            var muti = 1;
                if ([1, 3, 4, 5, 6, 7, 8, 14, 17, 24, 28, 30, 37, 38, 41, 45, 47, 50, 51, 56].includes(i)) {
                muti = 3;
            } else if ([2, 10, 11, 12, 16, 25, 27, 29, 52, 57].includes(i)) {
                muti = 2;
            }
            resultat -= ajout * muti;
        }

        console.log(clan);
        let breed=newperso.characterRace(race);
        if (breed[1] !== null) {
            for (let key in breed[1]) {
                if (breed[1].hasOwnProperty(key)) {
                    // Vérifier si la clé correspond au format 'cpt' suivi d'un nombre entre 0 et 57
                    if (/^cpt[0-5]?[0-9]$/.test(key) && parseInt(key.substring(3)) <= 57) {
                       if(valeursCpts[key] < breed[1][key]){
                            valeursCpts[key] = breed[1][key];
                       }
                    }
                }
            }
        }
        let royal=newperso.characterClan(clan);
        resultat=resultat+royal[2]+breed[3];
        let caractModif = new CaracteristiqueModifier(
            valeursCpts, // Tableau des caractéristiques initiales
            breed, // Informations sur la race
            newperso, // Nouveau personnage
            abilities.mental, abilities.social, abilities.physique, level, talent, faiblesse, clan, this.actor.sort, hpmax, psyvalue, hp, psy, this.actor.type, this.actor.system.insoin// Variables nécessaires pour le calcul
        );

        // Appel de la méthode modifier() pour effectuer les calculs
        let resultatModif = caractModif.modifier();

        let sortsPossibles = new SortsPossibles(mag0, mag1, mag2, mag3, mag4, mag5, profession, religion, clan, resultatModif.cout);
        // Appel de la méthode getListeSorts() pour obtenir la liste des sorts possibles
        let listeSort =await sortsPossibles.getListeSorts()

        //specialité céleste corbeau et croiser
        if(race==game.i18n.localize('liber.avantrace77a')){
            faiblesse=game.i18n.localize('liber.title07');//actor.system.faiblesse
        }else if(clan==game.i18n.localize('liber.avantrace56')){ 
            profession=game.i18n.localize('liber.avantrace93');//actor.system.metier
        }else if(religion==game.i18n.localize('liber.avantrace58')){ 
            profession=game.i18n.localize('liber.avantrace94');
        } 
        //encombrement
        if(abilities.force==''){abilities.force=0}
        if(cpt37==''){cpt37=0}
        var enc=(parseInt(abilities.force)+ parseInt(cpt37)) /2 + 35;
        if(talent=="t24"){
            enc=parseInt(enc)+10
        }
        if(faiblesse=="f4"){
            enc=parseInt(enc)-10
        }

        //activer les effets
        const effets = this.actor.effects.filter(item => item.name !== '').map(item => item.name);
        const lists=[game.i18n.localize("liber.etat0"),game.i18n.localize("liber.etat1"),game.i18n.localize("liber.etat2"),game.i18n.localize("liber.etat3"),game.i18n.localize("liber.etat4"),game.i18n.localize("liber.etat5"),game.i18n.localize("liber.etat6"),game.i18n.localize("liber.etat7"),game.i18n.localize("liber.etat8"),game.i18n.localize("liber.etat9"),game.i18n.localize("liber.etat10"),game.i18n.localize("liber.etat11"),game.i18n.localize("liber.etat12"),game.i18n.localize("liber.etat3")];
        const active = lists.map(list => effets.includes(list) ? 1 : 0.5);
        /*console.log("system.encombrement.max"+enc+
        "system.faiblesse"+faiblesse+
        "system.metier"+profession+
        "system.level"+level+
        "system.etat.a"+active[0]+
        "system.etat.b"+active[1]+
        "system.etat.c"+active[2]+
        "system.etat.d"+active[3]+
        "system.etat.e"+active[4]+
        "system.etat.f"+active[5]+
        "system.etat.g"+active[6]+
        "system.etat.h"+active[7]+
        "system.etat.i"+active[8]+
        "system.etat.j"+active[9]+
        "system.etat.k"+active[10]+
        "system.etat.l"+active[11]+
        "system.etat.m"+active[12]+
        "system.etat.n"+active[13]+
        "system.reste"+reste+
        'system.listemag.liste'+sortsPossibles+
        'system.listemag.img1'+mag1+
        'system.listemag.img2'+mag2+
        'system.alert.psy'+resultatModif.apsy+
        'system.alert.psymax'+resultatModif.apsymax+
        'system.alert.hp'+resultatModif.ahp+
        'system.alert.hpmax'+resultatModif.ahp+
        'system.hp.max'+hpmax+
        'system.hp.value'+hp+
        'system.psy.max'+psy+
        'system.psy.value'+psyvalue+
        "system.restant"+resultat+
        'system.maxsort'+resultatModif.calsort+
        'system.coutmax'+resultatModif.cout+
        'system.alert.maxsort'+resultatModif.color1+
        'system.alert.coutmax'+resultatModif.color2+
        'system.caracteristique.acrobatie'+valeursCpts['cpt0']+'system.caracteristique.agilites'+valeursCpts['cpt1']+'system.caracteristique.alchimie'+valeursCpts['cpt2']+'system.caracteristique.apprentissage'+valeursCpts['cpt3']+'system.caracteristique.hast'+valeursCpts['cpt4']+'system.caracteristique.cc'+valeursCpts['cpt5']+'system.caracteristique.lancer'+valeursCpts['cpt6']+'system.caracteristique.melee'+valeursCpts['cpt7']+'system.caracteristique.tir'+valeursCpts['cpt8']+'system.caracteristique.art'+valeursCpts['cpt9']+'system.caracteristique.assassinat'+valeursCpts['cpt10']+'system.caracteristique.baton'+valeursCpts['cpt11']+'system.caracteristique.bouclier'+valeursCpts['cpt12']+'system.caracteristique.bricolage'+valeursCpts['cpt13']+'system.caracteristique.presence'+valeursCpts['cpt14']+'system.caracteristique.chercher'+valeursCpts['cpt15']+'system.caracteristique.commander'+valeursCpts['cpt16']+'system.caracteristique.concentration'+valeursCpts['cpt17']+'system.caracteristique.nature'+valeursCpts['cpt18']+'system.caracteristique.peuples'+valeursCpts['cpt19']+'system.caracteristique.religions'+valeursCpts['cpt20']+'system.caracteristique.geographique'+valeursCpts['cpt21']+'system.caracteristique.rue'+valeursCpts['cpt22']+'system.caracteristique.heretiques'+valeursCpts['cpt23']+'system.caracteristique.combat'+valeursCpts['cpt24']+'system.caracteristique.commerce'+valeursCpts['cpt25']+'system.caracteristique.crochetage'+valeursCpts['cpt26']+'system.caracteristique.discretion'+valeursCpts['cpt27']+'system.caracteristique.dexterite'+valeursCpts['cpt28']+'system.caracteristique.detection'+valeursCpts['cpt29']+'system.caracteristique.dissimulation'+valeursCpts['cpt30']+'system.caracteristique.dressage'+valeursCpts['cpt31']+'system.caracteristique.ennemi'+valeursCpts['cpt32']+'system.caracteristique.equilibre'+valeursCpts['cpt33']+'system.caracteristique.equitation'+valeursCpts['cpt34']+'system.caracteristique.escroquerie'+valeursCpts['cpt35']+'system.caracteristique.esquiver'+valeursCpts['cpt36']+'system.caracteristique.puissance'+valeursCpts['cpt37']+'system.caracteristique.astuce'+valeursCpts['cpt38']+'system.caracteristique.peur'+valeursCpts['cpt39']+'system.caracteristique.joueur'+valeursCpts['cpt40']+'system.caracteristique.maitrise'+valeursCpts['cpt41']+'system.caracteristique.natation'+valeursCpts['cpt42']+'system.caracteristique.navigation'+valeursCpts['cpt43']+'system.caracteristique.orientation'+valeursCpts['cpt44']+'system.caracteristique.persuasion'+valeursCpts['cpt45']+'system.caracteristique.pister'+valeursCpts['cpt46']+'system.caracteristique.prophetie'+valeursCpts['cpt47']+'system.caracteristique.secours'+valeursCpts['cpt48']+'system.caracteristique.resistance'+valeursCpts['cpt49']+'system.caracteristique.psychologue'+valeursCpts['cpt50']+'system.caracteristique.medecine'+valeursCpts['cpt51']+'system.caracteristique.survie'+valeursCpts['cpt52']+'system.caracteristique.tueur'+valeursCpts['cpt53']+'system.caracteristique.objet'+valeursCpts['cpt54']+'system.caracteristique.veterinaire'+valeursCpts['cpt55']+'system.caracteristique.vigilance'+valeursCpts['cpt56']+'system.caracteristique.vise'+valeursCpts['cpt57']);*/
        this.actor.update({"system.encombrement.max":enc,"system.faiblesse":faiblesse,"system.metier":profession,"system.level":level,"system.etat.a":active[0],"system.etat.b":active[1],"system.etat.c":active[2],"system.etat.d":active[3],"system.etat.e":active[4],"system.etat.f":active[5],"system.etat.g":active[6],"system.etat.h":active[7],"system.etat.i":active[8],"system.etat.j":active[9],"system.etat.k":active[10],"system.etat.l":active[11],"system.etat.m":active[12],"system.etat.n":active[13],"system.reste":reste,"system.listemag.liste":listeSort,"system.listemag.img1":mag1,"system.listemag.img2":mag2,"system.alert.psy":resultatModif.apsy,"system.alert.psymax":resultatModif.apsymax,"system.alert.hp":resultatModif.ahp,"system.alert.hpmax":resultatModif.ahp,"system.hp.max":hpmax,"system.hp.value":resultatModif.hp,"system.psy.max":psy,"system.psy.value":psyvalue,"system.restant":resultat,"system.maxsort":resultatModif.calsort,"system.coutmax":resultatModif.cout,"system.alert.maxsort":resultatModif.color1,"system.alert.coutmax":resultatModif.color2,"system.caracteristique.acrobatie":valeursCpts["cpt0"],"system.caracteristique.agilites":valeursCpts["cpt1"],"system.caracteristique.alchimie":valeursCpts["cpt2"],"system.caracteristique.apprentissage":valeursCpts["cpt3"],"system.caracteristique.hast":valeursCpts["cpt4"],"system.caracteristique.cc":valeursCpts["cpt5"],"system.caracteristique.lancer":valeursCpts["cpt6"],"system.caracteristique.melee":valeursCpts["cpt7"],"system.caracteristique.tir":valeursCpts["cpt8"],"system.caracteristique.art":valeursCpts["cpt9"],"system.caracteristique.assassinat":valeursCpts["cpt10"],"system.caracteristique.baton":valeursCpts["cpt11"],"system.caracteristique.bouclier":valeursCpts["cpt12"],"system.caracteristique.bricolage":valeursCpts["cpt13"],"system.caracteristique.presence":valeursCpts["cpt14"],"system.caracteristique.chercher":valeursCpts["cpt15"],"system.caracteristique.commander":valeursCpts["cpt16"],"system.caracteristique.concentration":valeursCpts["cpt17"],"system.caracteristique.nature":valeursCpts["cpt18"],"system.caracteristique.peuples":valeursCpts["cpt19"],"system.caracteristique.religions":valeursCpts["cpt20"],"system.caracteristique.geographique":valeursCpts["cpt21"],"system.caracteristique.rue":valeursCpts["cpt22"],"system.caracteristique.heretiques":valeursCpts["cpt23"],"system.caracteristique.combat":valeursCpts["cpt24"],"system.caracteristique.commerce":valeursCpts["cpt25"],"system.caracteristique.crochetage":valeursCpts["cpt26"],"system.caracteristique.discretion":valeursCpts["cpt27"],"system.caracteristique.dexterite":valeursCpts["cpt28"],"system.caracteristique.detection":valeursCpts["cpt29"],"system.caracteristique.dissimulation":valeursCpts["cpt30"],"system.caracteristique.dressage":valeursCpts["cpt31"],"system.caracteristique.ennemi":valeursCpts["cpt32"],"system.caracteristique.equilibre":valeursCpts["cpt33"],"system.caracteristique.equitation":valeursCpts["cpt34"],"system.caracteristique.escroquerie":valeursCpts["cpt35"],"system.caracteristique.esquiver":valeursCpts["cpt36"],"system.caracteristique.puissance":valeursCpts["cpt37"],"system.caracteristique.astuce":valeursCpts["cpt38"],"system.caracteristique.peur":valeursCpts["cpt39"],"system.caracteristique.joueur":valeursCpts["cpt40"],"system.caracteristique.maitrise":valeursCpts["cpt41"],"system.caracteristique.natation":valeursCpts["cpt42"],"system.caracteristique.navigation":valeursCpts["cpt43"],"system.caracteristique.orientation":valeursCpts["cpt44"],"system.caracteristique.persuasion":valeursCpts["cpt45"],"system.caracteristique.pister":valeursCpts["cpt46"],"system.caracteristique.prophetie":valeursCpts["cpt47"],"system.caracteristique.secours":valeursCpts["cpt48"],"system.caracteristique.resistance":valeursCpts["cpt49"],"system.caracteristique.psychologue":valeursCpts["cpt50"],"system.caracteristique.medecine":valeursCpts["cpt51"],"system.caracteristique.survie":valeursCpts["cpt52"],"system.caracteristique.tueur":valeursCpts["cpt53"],"system.caracteristique.objet":valeursCpts["cpt54"],"system.caracteristique.veterinaire":valeursCpts["cpt55"],"system.caracteristique.vigilance":valeursCpts["cpt56"],"system.caracteristique.vise":valeursCpts["cpt57"]});
       
    }


    async _onRandom(event){
        let listem=[]
        let type=event.target.dataset["type"]
        let itemsToAdd = []; // Liste pour stocker les objets à ajouter
        let addedItems = new Set(); // Set pour garder une trace des objets déjà ajoutés

        if (type === 'objet') {
            const pack = game.packs.get('liber.objet');
            const tables = await pack.getDocuments();
            $.each(tables, function(key, value) {
                listem.push({
                    'name': value.name,
                    'img': value.img,
                    'description': value.system.description,
                    'poids': value.system.poids,
                    'valeur': value.system.valeur
                });
            });

            let nbobj = Math.floor(Math.random() * 9) + 1;
            for (let i = nbobj; i >= 0; i--) {
                let qt = Math.floor(Math.random() * 10) + 1;
                let r;
                let itemName;

                do {
                    r = Math.floor(Math.random() * listem.length);
                    itemName = listem[r].name;
                } while (addedItems.has(itemName)); // Réessayer si l'objet a déjà été ajouté

                addedItems.add(itemName); // Marquer cet objet comme ajouté
                itemsToAdd.push({
                    name: itemName,
                    type: 'objet',
                    img: listem[r].img,
                    'system.description': listem[r].description,
                    'system.poids': listem[r].poids,
                    'system.quantite': qt,
                    'system.valeur': listem[r].valeur
                });
            }
        } else if (type === 'arme') {
            const pack = game.packs.get('liber.arme');
            const tables = await pack.getDocuments();
            $.each(tables, function(key, value) {
                listem.push({
                    'name': value.name,
                    'img': value.img,
                    'description': value.system.description,
                    'degat': value.system.degats,
                    'poids': value.system.poids,
                    'portee': value.system.portee,
                    'valeur': value.system.valeur
                });
            });
            let r = Math.floor(Math.random() * listem.length);
            itemsToAdd.push({
                name: listem[r].name,
                type: 'arme',
                img: listem[r].img,
                'system.description': listem[r].description,
                'system.degats': listem[r].degat,
                'system.poids': listem[r].poids,
                'system.quantite': 1,
                'system.portee': listem[r].portee,
                'system.valeur': listem[r].valeur
            });
        } else if (type === 'armure') {
            const pack = game.packs.get('liber.armure');
            const tables = await pack.getDocuments();
            $.each(tables, function(key, value) {
                listem.push({
                    'name': value.name,
                    'img': value.img,
                    'description': value.system.description,
                    'protection': value.system.protection,
                    'poids': value.system.poids,
                    'valeur': value.system.valeur
                });
            });
            let r = Math.floor(Math.random() * listem.length);
            itemsToAdd.push({
                name: listem[r].name,
                type: 'armure',
                img: listem[r].img,
                'system.description': listem[r].description,
                'system.protection': listem[r].protection,
                'system.poids': listem[r].poids,
                'system.quantite': 1,
                'system.valeur': listem[r].valeur
            });
        }

        // Ajoutez tous les objets à l'acteur en une seule fois
        this.actor.createEmbeddedDocuments('Item', itemsToAdd, { renderSheet: false });
    }

    _onSecondary(event){
        let tab=event.target.dataset["tab"];
        this.actor.update({"system.secondary":tab});
    }

    /** @override */
    _onDragStart(event) {
        const li = event.currentTarget;
        if ( event.target.classList.contains("content-link") ) return;

        // Create drag data
        let dragData;

        if ( li.dataset.type == "jetdedes") {
          dragData = { "type": "ability", "name": li.dataset.name, "item": li.dataset.itemId, "dice": li.dataset.dice, "attDice": li.dataset.attdice,"idactor":this.actor._id  }
        }

        // Owned Items
        else if ( li.dataset.itemId ) {
          const item = this.actor.items.get(li.dataset.itemId);
          dragData = item.toDragData();
        }

        // Active Effect
        if ( li.dataset.effectId ) {
          const effect = this.actor.effects.get(li.dataset.effectId);
          dragData = effect.toDragData();
        }

        if ( !dragData ) return;

        // Set data transfer
        event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
      }
}