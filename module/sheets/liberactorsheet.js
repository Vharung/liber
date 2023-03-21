import { liber } from "./config.js";
/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
 export class LiberActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["Liber", "sheet", "actor"],
          width: 1224,
          height: 800,
          dragDrop: [{dragSelector: ".draggable", dropSelector: null}],
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    get template() {
        if(this.actor.type=='pnj' || this.actor.type=='personnage'){
            return `systems/liber/templates/sheets/personnage-sheet.html`;
        }else {
            return `systems/liber/templates/sheets/${this.actor.type}-sheet.html`;
        }
    }

    getData(){
        const data = super.getData();
        var poidsactor='';
        data.dtypes = ["String", "Number", "Boolean"];
        data.config=liber
        console.log(data); 
        if (this.actor.type == 'personnage' || this.actor.type == 'pnj' || this.actor.type == 'monstre') {
            this._prepareCharacterItems(data);
        }
        if (this.actor.type == 'personnage' || this.actor.type == 'pnj' ) {
            this._onEncom();this._onStat();
        }
        return data;
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
          if (i.type === 'arme') {
            arme.push(i);
          }
          else if (i.type === 'armure') {
            armure.push(i);
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

        html.find('.maindroite, .maingauche, .armor, .desequi').click(this._onArmor.bind(this));
        html.find('.attribut').click(this._onAttr.bind(this));
        html.find('.resetbonus, .resetmalus').click(this._onRestAttr.bind(this));
        
        //Jet de des
        html.find('.jetdedes, .jetdedegat, .attaque, .attaques').click(this._onRoll.bind(this)); 
        
        //generateur
        html.find('.ficheperso').click(this._onGenerator.bind(this));

        //monstre level up
        if(this.actor.type=="monstre"){
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

        html.find('.addsort').click(ev => {
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
            const tab=$(ev.currentTarget).data('tab');
            html.find('.items a').removeClass('acti');
            html.find('.items li').removeClass('active');
             if(tab=='' || tab=='tous'){
                html.find('.items li').addClass('active');
                html.find('.items a.tous').addClass('acti');
            }else if(tab=='armes'){
                $('.items a.armes').addClass("acti");
                $('.items li.armes').addClass("active");
            }else if(tab=='armures'){
                $('.items a.armures').addClass("acti");
                $('.items li.armures').addClass("active");
            }else if(tab=='objets'){
                $('.items a.objets').addClass("acti");
                $('.items li.objets').addClass("active");
            }
        }); 


        //Avantage
        var avant=html.find('.avant').val();
        var desan=html.find('.desan').val();
        var insoin=html.find('.insoin').val();
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

        //Posture
        let postures=html.find('.postures').val();
        if(postures=="focus"){
            html.find('.focus').css("opacity", "1");
        }else if(postures=="offensif"){
            html.find('.offensif').css("opacity", "1");
                    
        }else if(postures=="defensif"){
            html.find('.defensif').css("opacity", "1");
            
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
        html.find('.encours').val(total);
        html.find('.barenc').css({"width":pourcentage+"%"});
        var autre=html.find('.clanliste option:selected').val()
        var autres=html.find('.religionliste option:selected').val()
        if(autre==game.i18n.localize("liber.avantrace79") && autres==game.i18n.localize("liber.avantrace79")){
            html.find('.bucketmagie').css({"display":"none"});
        }
        var hp= html.find('.hp').val();
        if(hp<=0){
            html.find('.autres').css({"background":"url(systems/liber/css/parchemin-sang.jpg)",'background-size': 'cover'});
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
        if(race==game.i18n.localize("liber.avantrace61")){
            max=175;
        }
        if(phys<(parseInt(forc)+parseInt(agil))){
            html.find('.force').css({"background":"red"});    
            html.find('.agilite').css({"background":"red"});    
        }
        if(soci<(parseInt(char)+parseInt(saga))){
            html.find('.charisme').css({"background":"red"});    
            html.find('.sagacite').css({"background":"red"})
        }
        if(ment<(parseInt(astu)+parseInt(memo))){
            html.find('.ast').css({"background":"red"});    
            html.find('.memoire').css({"background":"red"})
        }
        if((parseInt(phys)+parseInt(soci)+parseInt(ment))>max){
            html.find('.physique').css({"background":"red"});    
            html.find('.social').css({"background":"red"})
            html.find('.mental').css({"background":"red"})
        }

        //cacher clan
        const races = {
            [game.i18n.localize('liber.avantrace60')]: [".humain", ".demon", ".drauch"],
            [game.i18n.localize('liber.avantrace92')]: [".humain", ".demon", ".drauch"],
            [game.i18n.localize('liber.avantrace61')]: [".dragon", ".demon", ".drauch"],
            [game.i18n.localize('liber.avantrace62')]: [".dragon", ".humain", ".drauch"],
            [game.i18n.localize('liber.avantrace63')]: [".dragon", ".humain", ".demon"],
            [game.i18n.localize('liber.avantrace64')]: [".dragon", ".demon", ".drauch", ".humain", ".religionliste .all"]
        };

        const raceElements = races[race];
        if (raceElements) {
            raceElements.forEach(element => {
                html.find(element).css({"display": "none"});
            });
        }
        //cacher metier
        const clan = html.find('.clanliste option:selected').val();

        if (clan === game.i18n.localize("liber.avantrace56")) {
          html.find('.guerrier').css("display", "block");
        }else if (clan === game.i18n.localize("liber.avantrace58")) {
          html.find('.croiser').css("display", "block");
        }else {
          html.find('.classique').css("display", "block");  
        }   
        






        
    }

    addDragAndDropListeners() {
        const html = this.element;
        const items = html.find('.sheet-body li');
        const stat=html.find('.stat2 label');



        // Ajouter l'événement de drag sur chaque item
        items.each((index, item) => {
            $(item).attr('draggable', true);
            const itemId = $(item).data('item-id'); // Récupérer l'ID de l'item à partir de l'élément
            $(item).on('dragstart', (event) => {
                event.originalEvent.dataTransfer.setData('text/plain', $(event.currentTarget).data('item-id'));
            });
            $(item).on('dragend', (event) => {
                this.addDragAndDropListeners();// Réinitialiser les écouteurs de glisser-déposer
            });
        });

        // Ajouter l'événement de drag sur chaque item
        stat.each((index, item) => {
            $(item).attr('draggable', true);
            $(item).on('dragstart', (event) => {
                event.originalEvent.dataTransfer.setData('text/plain', $(event.currentTarget).data('name'));
            });
            $(item).on('dragend', (event) => {
                this.addDragAndDropListeners(); // Réinitialiser les écouteurs de glisser-déposer
            });
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
 
    _onRoll(event){ //lancer de dés
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
        var bonuspost=0;
        var critique=5;
        var succes="";
        var degats=0;

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
            if(posture=="Focus"){bonuspost=5;}
            else if(posture=="Offensif"){critique=10;}
            if(bonus==""){bonus=0;}
            if(malus==""){malus=0;}
            let inforesult=parseInt(maxstat)+parseInt(bonus)+bonuspost+parseInt(malus);
            if(inforesult>95){inforesult=95;}
            else if(inforesult<5){inforesult=5;}
            let r = new Roll("1d100");
            roll=r.evaluate({"async": false});
            let retour=r.result; 
            if(retour>95){//lang
                succes="<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec critique</h4>";
                degats=0;
            }else if(retour<=critique){
                succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite critique</h4>";
                degats=2;
            }else if(retour<=inforesult){
                succes="<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite</h4>";
                degats=1;
            }else{
                succes="<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec</h4>";
                degats=0;
            }
            if(degats>0 && type=="auto"){
                if(qarme=="attaques"){
                    if(degats==2){
                        monJetDeDes='('+this.actor.system.degatd+')*'+degats;
                    }else{
                        monJetDeDes=this.actor.system.degatd;
                    }
                    var nam = this.actor.system.armed;
                }else{
                    if(degats==2){
                        var monJetDeDes='('+this.actor.system.degatg+')*'+degats;
                    }else{
                        var monJetDeDes=this.actor.system.degatg;
                    }
                    var nam = this.actor.system.armeg;
                }
            }
            texte = '<span style="flex:auto"><p class="resultatp">Jet de ' + name + " : " + inforesult +'/100</p>'+succes
            if(name=="physique"){
                let {armed,degatd,desd,imgd,armeg,degatg,desg,imgg} = this.actor.system.armeuse;
                if(armed){
                    button+='<button class="roll-damage" style="cursor:pointer;margin-bottom: 5px;" data-name="'+armed+'" data-actorid="'+
                this.actor._id+'" data-dice="'+degatd+'" data-img="'+imgd
                +'" data-desc="'+desd+'" data-type="jetdedegat">Utiliser '+armed+'</button>';
                }
                if(armeg){
                    button+='<button class="roll-damage" style="cursor:pointer" data-name="'+armeg+'" data-actorid="'+
                this.actor._id+'" data-dice="'+degatg+'" data-img="'+imgg
                +'" data-desc="'+desg+'" data-type="jetdedegat">Utiliser '+armeg+'</button>';
                }
                

            }
            texte+=button+'</span>';
            //info Tchat    
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
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
                game.user.targets.forEach(i => {
                    console.log(i)
                    nom=i.document.name;
                    hp = i.document._actor.system.hp.value;
                    var armor=i.document.actor.system.protection
                    var armormag=i.document.actor.system.protectionmagique;
                    var perce=["Dague","Masse d'arme","Masse Lourd","Arbalète"]
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
                texte = '<span style="flex:auto"><p class="resultatp"><img src="'+img+'"  width="24" height="24"/>&nbsp;Utilise ' + name + '<p>'+info;
        
                //info Tchat    
                roll.toMessage({
                    speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                    flavor: texte
                });  
            }
            
        } 
        
    
    // Mort de la cible
        if(hp==0 && type=="auto") {
            var tuer=['Vient de tuer ','A massacrer ','A occis ',"N'a pas eu de pitier pour ","A oté la vie de ","A trucidé "];
            var d=Math. round(Math.random() * tuer.length);
            texte = "<span style='flex:auto'><p class='resultatp'>"+tuer[d]+"&nbsp; <span style='text-transform:uppercase;font-weight: bold;'> "+nom+"</span></span></span>";
            let chatData = {
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
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
        var critique=5;
        if(posture=="Focus"){
            bonuspost=5;
        }else if(posture=="Offensif"){
            critique=10;
        }
        if(bonus==undefined){
            bonus=0;
        }
        if(classe=="Corbeau"){
            var inforesult=parseInt(physique)+parseInt(bonus)+bonuspost+parseInt(malus);
        }else if(classe=="Troubadour"){
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
        if(posture=="Focus"){
           cout=parseInt(cout)-1; 
        }
        if(cout<0){
            cout=0;
        }
        if(classe=="Corbeau"){
            hp=parseInt(hp)-parseInt(cout);
        }else{
            if(psy<cout){
                console.log('sort lancer :'+psy+'<'+cout)
                var diff= parseInt(cout)-parseInt(psy)
                hp=parseInt(hp)-parseInt(diff);
                psy=0;
                insoin= parseInt(insoin)+parseInt(diff);            
            }else {
                console.log('sort lancer :'+psy+'-'+cout)
                psy = parseInt(psy)-parseInt(cout)
            }
        }
        
        let button ='';
        if(dice){
            button='<button class="roll-damage" style="cursor:pointer" data-name="'+name+'" data-actorid="'+this.actor._id+'" data-dice="'+dice+'" data-img="'+img+'" data-desc="'+desc+'" data-type="jetdedegat">Lancer les dès</button>'
        }
        this.actor.update({"system.insoin": insoin,"system.hp.value": hp,"system.psy.value": psy});
        const texte = '<span style="flex:auto"><p class="infosort"><span class="resultatp" style="cursor:pointer"><img src="'+img+'"  width="24" height="24"/>&nbsp;' + name  +' : '+ inforesult +'/100</span><span class="desctchat">'+desc+'</span></p>'+succes+
        button+'</span>';
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
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
            var cost='Cout : '+cout+' Psy';
        }else{
            var cost='Cout : '+cout+' écu'
        }
        var portrait='<img src="icons/svg/mystery-man.svg" width="36" height="36" class="chat-portrait-message-portrait-generic" style="border: 2px solid rgb(255, 255, 255);">';
        const texte = '<span style="flex:auto"><p class="infosort"><span class="resultatp" style="cursor:pointer"><img src="'+img+'"  width="24" height="24"/>&nbsp;' + name  +'</span><span class="desctchat" style="display:block;">'+desc+'<span style="text-align:right; float:right; margin-top:25px">'+cost+'</span></span></p></span>';
        let chatData = {
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: texte
        };
        ChatMessage.create(chatData, {});
    }

    _onSleep(event){
        let { talent, heure, jour, repos, level, psy: { value: psy, max: psymax }, hp: { value: hp, max: hpmax }, insoin } = this.actor.system;
        let d = 0, hpadd = 0, psyadd = 0, j = 0;

        if (jour === game.i18n.localize("liber.jour")) {
          heure = parseInt(heure) * 24;
          j = Math.floor(parseInt(heure) / 3);
        }

        switch (repos) {
          case game.i18n.localize("liber.rapide"):
            d = Math.round(Math.random() * 4);
            hpadd = ((d + parseInt(level)) * parseInt(heure)) * j / 8;
            psyadd = Math.floor((parseInt(level) * parseInt(heure)) / 2);
            break;

          case game.i18n.localize("liber.calme"):
            d = Math.round(Math.random() * 6);
            hpadd = ((d + parseInt(level)) * parseInt(heure)) * j / 8;
            psyadd = Math.floor(parseInt(level) * parseInt(heure));
            if (talent === "Bon dormeur") {
              hpadd = parseInt(hpadd) + 6;
              psyadd = parseInt(psyadd) + 3;
            }
            break;

          case game.i18n.localize("liber.calme2"):
            d = Math.round(Math.random() * 6);
            insoin = 0;
            hpadd = (d + parseInt(level)) * parseInt(heure);
            psyadd = Math.floor(parseInt(level) * parseInt(heure));
            if (talent === "Bon dormeur") {
              hpadd = parseInt(hpadd) + 6;
              psyadd = parseInt(psyadd) + 3;
            }
            break;

          case game.i18n.localize("liber.intensif"):
            d = Math.round(Math.random() * 8);
            insoin = 0;
            hpadd = ((2 * d) + parseInt(level)) * parseInt(heure);
            psyadd = Math.floor(parseInt(level) * parseInt(heure));
            if (talent === "Bon dormeur") {
              hpadd = parseInt(hpadd) + 6;
              psyadd = parseInt(psyadd) + 3;
            }
            break;

          default:
            break;
        }

        hpadd = Math.min(hpadd, parseInt(hpmax) - parseInt(hp));
        hp = parseInt(hpadd) + parseInt(hp);

        if (hp > hpmax) {hp = hpmax;}

        psyadd = Math.min(psyadd, parseInt(psymax) - parseInt(psy));
        psy = parseInt(psy) + parseInt(psyadd);

        if (psy > psymax) {psy = psymax;}

        if (hpmax === hp && insoin > 0) {
          hp = parseInt(hpmax) - parseInt(insoin);
          hpadd = parseInt(hpadd) - parseInt(insoin);
        }

        this.actor.update({ "system.insoin": insoin, "system.hp.value": hp, "system.psy.value": psy });

        const texte = '<span style="flex:auto"><p class="resultatp">' + game.i18n.localize("liber.repos") + ' ' + repos + ' +' + hpadd + 'hp / +' + psyadd + 'psy </p></span>';
        const chatData = {
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: texte
        };
        ChatMessage.create(chatData, {});
    }

    _onPosture(event){
        const POSTURE_MESSAGES = {
          focus: game.i18n.localize("liber.lang88"),
          offensif: game.i18n.localize("liber.lang86"),
          defensif: game.i18n.localize("liber.lang87"),
          aucune: game.i18n.localize("liber.lang89"),
        };

        const postures = event.target.dataset["posture"];
        const texte = `<span style="flex:auto"><p class="resultatp">${POSTURE_MESSAGES[postures]}</p></span>`;

        const chatData = {
          speaker: ChatMessage.getSpeaker({ actor: this.actor }),
          content: texte,
        };
        ChatMessage.create(chatData, {});
        this.actor.update({"system.posture": postures});
    }

    _onGenerator(event){
        //variable
        var race = this.actor.system.race;
        var sexe = this.actor.system.sexe;
        var clan = this.actor.system.clan;
        var reli = this.actor.system.religion;
        var meti = this.actor.system.metier;

        var avantagerace="";
        var armureperso=this.actor.system.protection;

        var hp=0; var psy=0; var phy=0; var forc=0; var agil=0; var soc=0; var saga=0; var char=0; var men=0; var astu=0; var memo=0; 
        var cpt0 =0;var cpt1 =0;var cpt2 =0;var cpt3 =0;var cpt4 =0;var cpt5 =0;var cpt6 =0;var cpt7 =0;var cpt8 =0;var cpt9 =0;var cpt10 =0;var cpt11 =0;var cpt12 =0;var cpt13 =0;var cpt14 =0;var cpt15 =0;var cpt16 =0;var cpt17 =0;var cpt18 =0;var cpt19 =0;var cpt20 =0;var cpt21 =0;var cpt22 =0;var cpt23 =0;var cpt24 =0;var cpt25 =0;var cpt26 =0;var cpt27 =0;var cpt28 =0;var cpt29 =0;var cpt30 =0;var cpt31 =0;var cpt32 =0;var cpt33 =0;var cpt34 =0;var cpt35 =0;var cpt36 =0;var cpt37 =0;var cpt38 =0;var cpt39 =0;var cpt40 =0;var cpt41 =0;var cpt42 =0;var cpt43 =0;var cpt44 =0;var cpt45 =0;var cpt46 =0;var cpt47 =0;var cpt48 =0;var cpt49 =0;var cpt50 =0;var cpt51 =0;var cpt52 =0;var cpt53 =0;var cpt54 =0;var cpt55 =0;var cpt56 =0;var cpt57 =0;var cpt58 =0;

        //nom
        if(race==game.i18n.localize("liber.avantrace60") || race==game.i18n.localize("liber.avantrace92") ){
            var list =["","","","dova","pey","nig","key","bod","iroo","lex","blo","roo","daka","zul","zaa","zey","zoo","paa","ral","tur","tey","tel","daco","too","ook","roo","goo","pol","mel","nax","dao","paar","krey","vha","rung","ynon","kryn","bor","fax","soo","jey","aata","aatu","aati","thur","löng","yook","diir","ooko","aka","ack","apa","eaat","yata","uru","moo","bla","reb","pot","taa","rook","creedo","berk","dooit"];
            var pair1=list[Math.floor(Math.random()*list.length)];
            var pair2=list[Math.floor(Math.random()*list.length)];
            var pair3=list[Math.floor(Math.random()*list.length)];
            var pair4=list[Math.floor(Math.random()*list.length)];
            var name=pair1+pair2+" "+pair3+pair4;
        }else if(race==game.i18n.localize("liber.avantrace61") || race==game.i18n.localize("liber.avantrace65")){
            if(sexe=="Female"){
                var list =["Emma","Jade","Louise","Alice","Lina","Chloé","Rose","Léa","Mila","Ambre","Mia","Anna","Julia","Inès","Léna","Juliette","Zoé","Manon","Agathe","Lou","Lola","Camille","Nina","Jeanne","Inaya","Romy","Éva","Romane","Léonie","Iris","Lucie","Luna","Adèle","Sarah","Louna","Charlotte","Margaux","Olivia","Sofia","Charlie","Victoria","Victoire","Nour","Margot","Mya","Giulia","Clémence","Alix","Aya","Clara","Éléna","Capucine","Lana","Lya","Lyna","Lyana","Théa","Léana","Anaïs","Gabrielle","Emy","Yasmine","Mathilde","Maëlys","Alicia","Lilou","Apolline","Roxane","Lise","Assia","Élise","Lily","Maria","Maya","Valentine","Héloïse","Marie","Noémie","Elsa","Lisa","Lila","Alya","Thaïs","Ilyana","Célia","Candice","Livia","Zélie","Salomé","Constance","Soline","Emmy","Maëlle","Éléna","Maryam","Amelia","Joy","Océane","Maïssa","Arya","Alice","Yumi","Lindsey","Mégumi","Elise","Louise","Valérie","Elodie","Adelaide","Stéphanie","Béatrice","Colombe","Eva","Laura","Bathide","Eloise","Françoise","Mylène","Maryline","Armande","Irene","Elvira","Iseult","Marie","Thérese","Jeanne","Genieve","Cunégonde","Charlotte","Aline","Geogette","Mariane","Helene","Elsa","Sonia","Lena"]

            }else {
                var list =["Gabriel","Léo","Raphaël","Arthur","Louis","Lucas","Adam","Jules","Hugo","Maël","Liam","Noah","Paul","Ethan","Tiago","Sacha","Gabin","Nathan","Mohamed","Aaron","Tom","Éden","Théo","Noé","Léon","Martin","Mathis","Nolan","Victor","Timéo","Enzo","Marius","Axel","Antoine","Robin","Isaac","Naël","Amir","Valentin","Rayan","Augustin","Ayden","Clément","Eliott","Samuel","Marceau","Baptiste","Gaspard","Maxence","Yanis","Malo","Ibrahim","Sohan","Maxime","Évan","Nino","Mathéo","Simon","Lyam","Alexandre","Imran","Naïm","Kaïs","Camille","Thomas","Milo","Ismaël","Côme","Owen","Lenny","Soan","Ilyan","Kylian","Noa","Oscar","Ilyes","Léandre","Pablo","Diego","Mathys","Joseph","Ayoub","Youssef","Wassim","Noam","Adem","William","Ali","Basile","Charles","Thiago","Antonin","Logan","Adrien","Marin","Jean","Charly","Esteban","Noham","Elio","André","Richard","Pierre","Paul","Louis","Mickael","Jacques","Mathieu","Damien","Vincent","Stéphane","Etienne","Ronald","Thomas","Bastien","Drake","Georges","Gabriel","Lenny","Eizo","Charles","Hector","Henry","Alex","Tristan","Hugues","Max","Léon","Thibault","Carle","Antoine","Jean","Edouard","Philippe","Nicolas","Gregoire","Guy","Alain","Alphone","Michel","Sébastien","Juste","Justinien","Thirion","Luc"]
            }
            var list2=["Abomond","Aguerel","Albelart","Alberiou","Albilieu","Albillot","Andichanteau","Andiret","Angegnes","Astalart","Aubellevé","Barallevé","Bécharel","Belelli","Bizesseau","Bougailles","Bougairelli","Brichameur","Bronet","Caffazin","Cardaidieu","Castennes","Chabaveron","Chanagnon","Chanton","Clarisseau","Duraleilles","Durallot","Estiechanteau","Estiere","Ginelenet","Ginenteau","Guille","Kerganteau","Larmariou","Larmaze","Lignivès","Limognon","Machellevé","Macheseul","Mairdieu","Massoullon","Pegné","Pelleleilles","Pellelle","Polatillon","Raleilles","Rambullot","Rauges","Ravisseau","Roffignes","Roquellon","Sarragnory","Sarrane","Subliffet","Vassemières","Vellot","Vernire","Crochet","Valone","Parker","Onile","Pasteur","Labrocante","Vincente","Auditoré","Laporte","Blanchart","Giroux","Lesourd","Houillons","Castagné","Delasaintecroix","Macon","Chaumont","Lucent","Hover","Packard","Curie","Lyon","Lallemand","Langlais","Lecure","Macdonald","Dupont","Lafontaine","Boucher","Boureau","Godspeak","Pierre","Solitaire","Beauregard","Charmant","Marechal","Dufour","Leroux","Lemoine","Lombart","Lefourbe","Boulanger","Petit","Blanc","Chevalier","Leroy","Lebrun","Silver","Delarue","Notigame","Forest","Tonneau","Does","Martin","Deschamps","Dupuis","Macalisteur","Leloup","Bouquin","Lafleur","","Dugrenier","Lacroix","Lecomte","Poulain","Dumas"]
            var pair1=list[Math.floor(Math.random()*list.length)];
            var pair2=list2[Math.floor(Math.random()*list2.length)];
            var name=pair1+" "+pair2;
        }else if(race==game.i18n.localize("liber.avantrace62")){
            var list =["Alastor","Azazel","Appolyon","Asmodée","Astaroth","Abrahel","Botis","Bifrons","Caym","Eligos","Flauros","Gusoyn","Ipos","Lilith","Marbas","Moloch","Malack","Naberius","Paimon","Raum","Samigina","Titivillus","Valefor"]
            var pair1=list[Math.floor(Math.random()*list.length)];
            var name=pair1;
        }else if(race==game.i18n.localize("liber.avantrace63")){
            var list =["Azog","Bolg","Golfimbul","Grishnákh","Shagrat","Snaga","Gothmog","Gotar","Gor","Galimus","Karl","Rack"]
            if(sexe=="Female"){
                var list2 =["la brute","la dure","la séduisante","la puissante","la sournoise","la forte","la brute","","la sanguinaire"]

            }else {
                var list2 =["le dur","le sourd","le fort","le puissant","le fourbe","le sournois","le rock","le brute","","le sanguinaire"]
            }

            var pair1=list[Math.floor(Math.random()*list.length)];
            var pair2=list2[Math.floor(Math.random()*list2.length)];
            var name=pair1+" "+pair2;
        }else if(race==game.i18n.localize("liber.avantrace92") || race==game.i18n.localize("liber.avantrace66") || race==game.i18n.localize("liber.avantrace67") || race==game.i18n.localize("liber.avantrace68")){
            if(sexe=="Female"){
                var list =["Aerin","Aglari","Amandil","Amarië","Anardil : amie du soleil","Arafinwë : royale","Arachné","Aranwë","Arcadia","Ardamírë","Aredhel","Ardamir : Joyaux du monde","Argadil :","Ariarhen","Arminas","Artaher : noble dame","Artanis : noble femme","Arwen","Ashana","Astal : la vaillante","Athelleen : guerrière des flammes","Baliena","Barmahir","Belwen","Brindal","Caliawen : la lumineuse","Carafinwë : L’habile","Castamir : joyaux","Celebrían : reine d’argent","Celeanar : soleil d’argent","Circë : magicienne","Ciryandil : amie des navires","Dairiun","Danica","Danywen","Daenara","Dhaunare","Dralsa","Diningal","Eärendil : amie de la mer","Earwen : jeune fille de la mer","Eilinel","Elendë : ami des elfes/des étoiles","Elemmacil : étoile épée","Elbereth : étoile-reine","Eledhwen : au teint d’elfe","Elemire : étoile joyaux","Elwë : à la robe grise","Enetari : étoile-reine","Elenwë","Elentir : qui scrute les étoile","Elessar : pierre elfique","Elerinna : couronnée d’étoiles","Elwing (pluie d’étoiles)","Emeldiz","Endaria","Estë : repos","Eänwen : jeune fille de la mer","Eldalótë : fleur elfique","Eönwë","Eressëa : la solitaire","Estrid : la mystique","Falathar : esprit du feu","Fëanturi : maîtresse des esprits","Fíriel : femme mortelle","Finduilas","Galadriel","Galata","Galdor","Glingal : la flamme suspendue","Glóredhel","Gilestel : étoile de l’espoir","Gilgalad : étoile rayonnante","Glorfindel : tête d’or","Heldaria","Idril","Ilmarë","Indis","Irwaen","Imarune","Isil : la lune","Itarillë : petite étincelle","Izilbêth","Kardryar : la puissante","Kementari : reine de la terre","Lalwendë : jeune fille rieuse","Lalaith : rire","Laurelin : le chant d’or","Limstella","Linaewen : lac des oiseaux","Lindorië","Luinil : étoile à la lumière bleue","Lúthien","Macalaure : qui forge l’or","Mahal","Maeglin : œil vif","Manîthil : esprit de lune","Melian","Míriel","Mormegil : l’épée noire","Morwën : noire forêt","Nandil : Reine du lac","Nennvial : lac du crépuscule","Nerdanel","Nessa","Nerwen","Nenwende : fille masculine","Nienor/Nior (deuil)","Níniel : fille aux larmes","Ninquelotë : fleur blanche","Ñolofinwë : sagesse","Númendil : amie de l’ouest","Oilossë : neige toujours blanche","Oromë : musicienne","Olórin","Olwë","Ondolindë : chant de pierre","Qorwyn : la maléfique","Rathlóriel : lit d’or","Rían","Rúmil : la savante","Serindë : la brodeuse","Silana","Siltiama : colère de feu","Sirthaal : ce qui est caché","Thuringwethil : femme secrète","Tintallë : la lumière","Tinúviel : fille du Crépuscule","Unyen","Vairë : la tisseuse","Valandil","Vàna","Varda : la très haute","Virani : reine","Volanarë : celle qui devine","Voronwë : l’inébranlable","Wilwarin : le papillon","Wondrel","Yarayn","Yavana : dispensatrice des fruits","Ylengil","Yndreth","Yndris"]

            }else {
                var list =["Adanedhel : homme-elfe","Adûnakhôr : seigneur de l’Ouest","Aeglos : pointe de Neige","Aegnor : feu cruel","Aerandir vagabond des mers","Argawaen taché de sang","Aldaron seigneur des arbres","Anario : soleil","Arcadio","Aranrùth : la colère du roi","Ancalagon","Anfauglith : poussière d’agonie","Atanatar : pére des hommes","Astaldo : le vaillant","Aulendil : ami d’aulë","Aulendur : serviteur","Balan","Baragund","Belegund","Bëor","Boromir : Joyau Loyal","Bregolas","Bronweg","Bruithwir","Calimehtar : guérrier de lumière","Calimmacil : épée de lumière","Calion : le lumineux","Calywen","Carcharoth : les mâchoires sanglantes","Castamir : joyaux","Celeborn : arbre d’argent","Ciryaher : seigneur des navires","Ciryandil : ami des navires","Ciryatan : constructeur de navire","Círyon","Círdan : le bâtisseur","Cirth : les runes","Cuthalion : arc de fer","Daeron","Dagnir : le tourmenteur","Deldúwath : horreur des Ombres de la Nuit","Denethor","Dimrost : les marches de la pluie","Dovahkiin : enfant des dragons","Duinhir : Seigneur de la rivière","Eärendur : serviteur de la mer","Eldacar : heaume","Eldarion :","Elendur : serviteur des étoiles","Elendil : ami des elfes/ étoiles","Elrond : voûte étoilée","Elros (écume d’étoile)","Eöl","Erchamion : le manchot","Falastur : seigneur des côtes","Fantur : maitre","Faramir : Joyau Suffisant","Fëanor[o] : l’esprit du feu","Felagund : seigneur des cavernes","Finwë","Fírimar : mortels","Gondolin : le roc caché","Gorthol : heaume de terreur","Gundor","Gurthang : le fer de la mort","Gwindor","Helevorn : verre noir","Herendil : ami de la fortune","Herumor : seigneur noir","Herunúmes : seigneur de l’ouest","Hyamendacil : vainqueur du sud","Imlach","Ingwë","Irmo","Isil : éclat argenté","Isildur","Lastalaica : celui qui écoute","Legolas : vertes feuilles","Lenwë","Lómelindi : chanteur de crépuscule","Lómion : fils du crépuscule","Lorgan","Lórindol : tête d’or","Maedhros","Mahtan","Mardil : ami du roi","Maglor","Magor","Meneldil","Narmacil : épée de feu","Nandor : ceux qui font demi-tour","Nómin : le sage","Ohtar : guerrier","Ostoher : seigneur de la citadelle","Radagast","Radhruin","Ragnor","Rána : le voyageur","Palantir : qui regarde au loin et partout","Pelendul : serviteur de la cité","Rauros : grondement d’écume","Rorhirrim : prince à cheval","Rómendacil : vainqueur de l’est","Russandol : tête de cuivre","Saeros","Salmar","Saruman : homme habile","Sauron : le détesté","Seregon : sang de pierre","Silmarien","Siriondil : ami de sirion","Sindar : manteau gris","Súlimo : celui qui respire","Tarannon : don royal","Targen","Terendul : grand ténébreux","Turindo : maitre de son coeur","Tauron : seigneur des forêts","Turucàno : seigneur et maitre","Tyeplerinquar : poigne d’argent","Telchar","Telemnar","Teleri : les derniers","Thalion : inébranlable fort","Thalos","Thorondor : Roi des aigles","Tilion","Tulkas : le plus grand pour la force et la vaillance","Turambar : maître du destin","Uldor","Ulmo : celui qui aime la pluie","Ulwarth","Umarth : mauvais sort","Urthel","Urulóki : serpent de feu","Valar : les puissants","Valacar : Heaume de puissance","Valaraukar : démons de la terreur","Vanyar : blond","Vása : le dévoreur","Vorondil : ami véritable"]
            }
            var pair1=list[Math.floor(Math.random()*list.length)];
            var name=pair1;
        }else if(race==game.i18n.localize("liber.avantrace69")){
            var list=["Bodruith","Fangluin l’Ancien","Naugladur","Telchar","Anar","Balin","Bifur","Bofur","Bombur","Borin","Burin","Dáin","Dís","Dori","Durin","Dwalin","Farin","Fíli","Fimbulfambi","Flói","Frár","Frerin","Frór","Fundin","Gandalf","Gimli","Glóin","Grór","Hannar","Kíli","Lofar","Lóni","Mîm","Náin","Náli","Nar","Nár","Narfi","Narvi","Nori","Oi","Óin","Ori","Thorin","Thráin","Thrór","Thrym","Azaghâl","Gamil","Zirak","Ibun","Khîm"]
            var pair1=list[Math.floor(Math.random()*list.length)];
            var name=pair1;
        }else if(race==game.i18n.localize("liber.avantrace76")){
            var list=["Akasha","Alucard","Alucard","Angel","Armand","Baron","Tarquin","Bloodscream","Dio","Claudia","Comtesse","Michael","Alice","Carlisle","Edward","Emmett","Esmée","Darla","David","Walter","Dracula","Dracula","Drusilla","Frankenpen","Deacon","Gabrielle","Grand","Jasper","Rosalie","Jane","Jessica","Jubilé","Kain","Harmony","Khayman","Hannibal","Lestat","Louis","MaelLe","Marceline","Marius","MonaMorbius","Nicolas","NosferatuLa","Pandora","Katherine","Raziel","Rüdiger","Damon","Stefan","Selene","Soma","Spike","Bella","Theodora","Vampi","Vampirella","Seras","Victoria","Lucy","Zara la vampire"]
            var pair1=list[Math.floor(Math.random()*list.length)];
            var name=pair1;
        }else {
            var list=["Aegnor","Aerandir","Ainaros","Amarië","Amdír","Amras","Amrod","Amroth","Anairë","Angrod","Annael","Aranel","Aranwë","Aredhel","Argon","Arminas","Arwen","Auredhir","Ausir","Beleg","Bronweg","Bruithwir","Caranthir","Celeborn ","Celebrían","Celebrimbor","Celebrindal","Celegorm","Círdan","Curufin","Curufinwë","Cúthalion","Daeron","Daurin","Denethor","Eärendil","Eärwen","Ecthelio","Edrahil","Egalmoth","Egnor","Elemmakil","Elfrith","Elladan et Elrohir","Elu Thingol","Elmo","Elrond","Eltas","Eluchíl","Eluréd","Elurín","Elwë","Elwing","Enel","Enelyë","Enerdhil","Eöl","Ereinion","Erellont","Erestor","Evranin","Evromord","Faelivrin","Falathar","Fëanor","Felagund","Finarfin","Findis","Finduilas","Finrod","Finwë","Galadhon","Galadriel ","Galathil","Galdor","Galion","Galweg","Gelmir","Gereth","Gil-estel","Gilfanon","Gil-galad","Gilmith","Glorfindel","Gwindor","Haldir","Hendor","Heorrenda","Idril","Ilverin","Imin","Iminyë","Indis","Ingil","Inglorion","Ingwë Ingweron","Írimë","Ithilbor","Ivárë","Lalwen","Legolas ","Lenwë","Lindir","Lindo","Lómion","Lúthien","Mablon","Mablung","Maedhros","Maeglin","Maglor","Mahtan","Meleth","Melinir","Meril-i-Turinqi","Míriel","Mithrellas"]
            var pair1=list[Math.floor(Math.random()*list.length)];
            var name=pair1;
        }

        //race
        if(race==game.i18n.localize("liber.avantrace60")){
            if(armureperso<2){
                armureperso=2; 
            }
            cpt27=-10;avantagerace=game.i18n.localize("liber.avantrace1");
        }else if(race==game.i18n.localize("liber.avantrace92")){
            cpt1=5;cpt27=5;avantagerace=game.i18n.localize("liber.avantrace0");
        }else if(race==game.i18n.localize("liber.avantrace61")){
            avantagerace=game.i18n.localize("liber.avantrace2");cpt28=5;
        }else if(race==game.i18n.localize("liber.avantrace62")){
            avantagerace=game.i18n.localize("liber.avantrace3");cpt39=10;
        }else if(race==game.i18n.localize("liber.avantrace63")){
            avantagerace=game.i18n.localize("liber.avantrace4");
            if(armureperso<2){
                armureperso=2;
            }
        }else if(race==game.i18n.localize("liber.avantrace64")){
             cpt27=-20;
            avantagerace=game.i18n.localize("liber.avantrace5");
        }else if(race==game.i18n.localize("liber.avantrace65")){
             cpt28=5;
            avantagerace=game.i18n.localize("liber.avantrace6");
        }else if(race==game.i18n.localize("liber.avantrace10a")){
             cpt1=5;cpt3=5;avantagerace=game.i18n.localize("liber.avantrace7");
        }else if(race==game.i18n.localize("liber.avantrace66")){
             cpt1=5;cpt18=5;avantagerace=game.i18n.localize("liber.avantrace8");
        }else if(race==game.i18n.localize("liber.avantrace67")){
             cpt10=10;avantagerace=game.i18n.localize("liber.avantrace9");
        }else if(race==game.i18n.localize("liber.avantrace68")){
             cpt1=5;
            avantagerace=game.i18n.localize("liber.avantrace10");
        }else if(race==game.i18n.localize("liber.avantrace69")){
             cpt37=5;cpt40=5;avantagerace=game.i18n.localize("liber.avantrace11");
        }else if(race==game.i18n.localize("liber.avantrace70")){
             cpt1=5;cpt27=5;avantagerace=game.i18n.localize("liber.avantrace12");
        }else if(race==game.i18n.localize("liber.avantrace71")){
             cpt46=5;cpt28=5;avantagerace=game.i18n.localize("liber.avantrace13");
        }else if(race==game.i18n.localize("liber.avantrace72")){
            avantagerace=game.i18n.localize("liber.avantrace14");
        }else if(race==game.i18n.localize("liber.avantrace73")){
             cpt18=5;avantagerace=game.i18n.localize("liber.avantrace15");
        }else if(race==game.i18n.localize("liber.avantrace74")){
            avantagerace=game.i18n.localize("liber.avantrace16");
        }else if(race==game.i18n.localize("liber.avantrace75")){
            avantagerace=game.i18n.localize("liber.avantrace17");
        }else if(race==game.i18n.localize("liber.avantrace76")){
             cpt15=5;avantagerace=game.i18n.localize("liber.avantrace18");
        }else if(race==game.i18n.localize("liber.avantrace77")){
             cpt38=-10;avantagerace=game.i18n.localize("liber.avantrace19");
        }else {
            avantagerace="";
        }

        //clan

        //metier
        if(clan==game.i18n.localize("liber.avantrace58")){
            hp=22;psy= 9;phy=65;forc=40;agil=20;soc=45;saga=20;char=25;men=65;astu=25;memo=40;cpt12=cpt12+5;cpt7=cpt7+5;cpt20=cpt20+10;cpt34=cpt34+5;cpt23=cpt23+10;
        }else if(clan==game.i18n.localize("liber.avantrace56") && race==game.i18n.localize("liber.avantrace61")){
            hp=29;psy= 0;phy=75;forc=65;agil=10;soc=40;saga=10;char=30;men=60;astu=10;memo=50;cpt24=cpt24+5;cpt7=cpt7+5;cpt39=cpt39+10;cpt46=cpt46+5;cpt49=cpt49+5;
            if(cpt28<5){cpt28=5;}
       }else if(clan==game.i18n.localize("liber.avantrace56")){
            hp=29;psy= 0;phy=75;forc=65;agil=10;soc=35;saga=5;char=30;men=60;astu=10;memo=50;cpt24=cpt24+5;cpt7=cpt7+5;cpt39=cpt39+10;cpt46=cpt46+5;cpt49=cpt49+5;
       }else if(meti==game.i18n.localize("liber.metier1")){
            hp=5;psy= 0;phy=10;forc=5;agil=5;soc=10;saga=5;char=5;men=10;astu=5;memo=5;
       }else if(meti==game.i18n.localize("liber.metier2")){
            hp=23;psy= 3;phy=70;forc=50;agil=20;soc=60;saga=50;char=10;men=40;astu=30;memo=10;cpt7=cpt7+5;cpt6=cpt6+5;cpt13=cpt13+5;cpt18=cpt18+10;cpt40=cpt40+5;
        }else if(meti==game.i18n.localize("liber.metier3")){
            hp=23;psy=5;phy=70;forc=40;agil=30;soc=40;saga=10;char=30;men=60;astu=30;memo=30;cpt24=cpt24+5;cpt22=cpt22+10;cpt45=cpt45+5;cpt29=cpt29+5;
        }else if(meti==game.i18n.localize("liber.metier4")){
            hp=23;psy= 6;phy=70;forc=50;agil=20;soc=35;saga=20;char=15;men=65;astu=40;memo=25;cpt7=cpt7+5;cpt12=cpt12+10;cpt37=cpt37+5;
        }else if(meti==game.i18n.localize("liber.metier5")){
            hp=23;psy= 5;phy=70;forc=55;agil=15;soc=50;saga=20;char=30;men=50;astu=25;memo=25;cpt34=cpt34+10;cpt7=cpt7+5;cpt14=cpt14+5;cpt12=cpt12+5;
        }else if(meti==game.i18n.localize("liber.metier6")){
            hp=23;psy= 6;phy=70;forc=40;agil=30;soc=40;saga=10;char=30;men=60;astu=10;memo=50;cpt7=cpt7+5;cpt23=cpt23+10;cpt12=cpt12+5;cpt39=cpt39+5;cpt20=cpt20+10;
        }else if(meti==game.i18n.localize("liber.metier7")){
            hp=22;psy= 8;phy=65;forc=30;agil=35;soc=45;saga=40;char=5;men=60;astu=40;memo=20;cpt7=cpt7+5;cpt30=cpt30+5;cpt46=cpt46+5;cpt45=cpt45+5;
        }else if(meti==game.i18n.localize("liber.metier8")){
            hp=22;psy= 7;phy=65;forc=30;agil=35;soc=50;saga=25;char=25;men=55;astu=30;memo=25;cpt0=cpt0+5;cpt18=cpt18+5;cpt8=cpt8+5;cpt52=cpt52+5;cpt46=cpt46+5;cpt31=cpt31+10;
        }else if(meti==game.i18n.localize("liber.metier9")){
            hp=22;psy= 6;phy=65;forc=30;agil=35;soc=55;saga=30;char=25;men=50;astu=25;memo=25;cpt6=cpt6+10;cpt43=cpt43+5;cpt19=cpt19+5;cpt42=cpt42+5;cpt40=cpt40+5;
        }else if(meti==game.i18n.localize("liber.metier10")){
            hp=22;psy= 8;phy=65;forc=15;agil=50;soc=45;saga=40;char=5;men=60;astu=40;memo=20;cpt8=cpt8+5;cpt10=cpt10+5;cpt22=cpt22+10;cpt30=cpt30+5;
        }else if(meti==game.i18n.localize("liber.metier11")){
            hp=22;psy= 6;phy=65;forc=30;agil=35;soc=55;saga=30;char=25;men=50;astu=25;memo=25;cpt0=cpt0+5;cpt8=cpt8+10;cpt18=cpt18+10;cpt31=cpt31+5;
        }else if(meti==game.i18n.localize("liber.metier12")){
            hp=13;psy= 17;phy=40;forc=10;agil=30;soc=70;saga=40;char=30;men=60;astu=30;memo=30;cpt0=cpt0+15;cpt19=cpt19+10;cpt22=cpt22+5;cpt18=cpt18+5;cpt30=cpt30+5;
        }else if(meti==game.i18n.localize("liber.metier13")){
            hp=13;psy= 18;phy=40;forc=20;agil=20;soc=65;saga=20;char=45;men=65;astu=20;memo=45;cpt3=cpt3+5;cpt11=cpt11+10;cpt50=cpt50+5;
        }else if(meti==game.i18n.localize("liber.metier14")){
            hp=12;psy= 20;phy=35;forc=5;agil=30;soc=65;saga=35;char=30;men=70;astu=30;memo=40;cpt2=cpt2+5;cpt50=cpt50+5;cpt54=cpt54+10;cpt17=cpt17+5;
        }else if(meti==game.i18n.localize("liber.metier15")){
            hp=10;psy= 22;phy=30;forc=5;agil=25;soc=70;saga=40;char=30;men=70;astu=30;memo=40;cpt11=cpt11+5;cpt20=cpt20+10;cpt51=cpt51+10;
        }else if(meti==game.i18n.localize("liber.metier16")){
            hp=8;psy= 25;phy=25;forc=5;agil=20;soc=70;saga=60;char=10;men=75;astu=60;memo=15;cpt15=cpt15+5;cpt47=cpt47+10;cpt50=cpt50+5;
        }
        if(race==game.i18n.localize("liber.avantrace61") && clan!=game.i18n.localize("liber.avantrace56") && clan!=game.i18n.localize("liber.avantrace58")){
            soc=soc+5;char=char+5;
        }

        //histoire
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
        
        //caractère
        var demeure = [game.i18n.localize("liber.caract1"),game.i18n.localize("liber.caract2"),game.i18n.localize("liber.caract3"),game.i18n.localize("liber.caract4"),game.i18n.localize("liber.caract5"),game.i18n.localize("liber.caract6"),game.i18n.localize("liber.caract7"),game.i18n.localize("liber.caract8"),game.i18n.localize("liber.caract9"),game.i18n.localize("liber.caract10"),game.i18n.localize("liber.caract11"),game.i18n.localize("liber.caract12")];
        var proximite=[game.i18n.localize("liber.caract13"),game.i18n.localize("liber.caract14"),game.i18n.localize("liber.caract15")];
        var lieu=[game.i18n.localize("liber.caract16"),game.i18n.localize("liber.caract17"),game.i18n.localize("liber.caract18"),game.i18n.localize("liber.caract19"),game.i18n.localize("liber.caract20"),game.i18n.localize("liber.caract21"),game.i18n.localize("liber.caract22"),game.i18n.localize("liber.caract23"),game.i18n.localize("liber.caract24"),game.i18n.localize("liber.caract25"),game.i18n.localize("liber.caract26"),game.i18n.localize("liber.caract27"),game.i18n.localize("liber.caract28"),game.i18n.localize("liber.caract29"),game.i18n.localize("liber.caract30"),game.i18n.localize("liber.caract31"),game.i18n.localize("liber.caract32"),game.i18n.localize("liber.caract33"),game.i18n.localize("liber.caract34")];
        var resident = demeure[Math.floor(Math.random()*demeure.length)]+" "+proximite[Math.floor(Math.random()*proximite.length)]+" "+lieu[Math.floor(Math.random()*lieu.length)];
        
        var famille = ["Crochet","Valone","Parker","Onile","Pasteur","Labrocante","Vincente","Auditoré","Laporte","Blanchart","Giroux","Lesourd","Houillons","Castagné","Delasaintecroix","Macon","Chaumont","Lucent","Hover","Packard","Curie","Lyon","Lallemand","Langlais","Lecure","Macdonald","Dupont","Lafontaine","Boucher","Boureau","Godspeak","Pierre","Solitaire","Beauregard","Charmant","Marechal","Dufour","Leroux","Lemoine","Lombart","Lefourbe","Boulanger","Petit","Blanc","Chevalier","Leroy","Lebrun","Silver","Delarue","Notigame","Forest","Tonneau","Does","Martin","Deschamps","Dupuis","Macalisteur","Leloup","Bouquin","Lafleur","","Dugrenier","Lacroix","Lecomte","Poulain","Dumas"];
        var titre=[game.i18n.localize("liber.caract35"),game.i18n.localize("liber.caract36"),game.i18n.localize("liber.caract37"),game.i18n.localize("liber.caract38"),game.i18n.localize("liber.caract39"),game.i18n.localize("liber.caract40"),game.i18n.localize("liber.caract41"),game.i18n.localize("liber.caract42"),game.i18n.localize("liber.caract43"),game.i18n.localize("liber.caract44"),game.i18n.localize("liber.caract45"),game.i18n.localize("liber.caract46"),game.i18n.localize("liber.caract47"),game.i18n.localize("liber.caract48"),game.i18n.localize("liber.caract49"),game.i18n.localize("liber.caract50")];
        var sang = titre[Math.floor(Math.random()*titre.length)]+" de la famille "+famille[Math.floor(Math.random()*famille.length)];
        
        var rang=[game.i18n.localize("liber.caract51"),game.i18n.localize("liber.caract52"),game.i18n.localize("liber.caract53"),game.i18n.localize("liber.caract54"),game.i18n.localize("liber.caract55"),game.i18n.localize("liber.caract56"),game.i18n.localize("liber.caract57"),game.i18n.localize("liber.caract58"),game.i18n.localize("liber.caract59")]
        var organisation=[game.i18n.localize("liber.caract60"),game.i18n.localize("liber.caract61"),game.i18n.localize("liber.caract62"),game.i18n.localize("liber.caract63"),game.i18n.localize("liber.caract64"),game.i18n.localize("liber.caract65"),game.i18n.localize("liber.caract66"),game.i18n.localize("liber.caract67"),game.i18n.localize("liber.caract68"),game.i18n.localize("liber.caract69"),game.i18n.localize("liber.caract70"),game.i18n.localize("liber.caract71"),game.i18n.localize("liber.caract72"),game.i18n.localize("liber.caract73"),game.i18n.localize("liber.caract74"),game.i18n.localize("liber.caract75"),game.i18n.localize("liber.caract76"),game.i18n.localize("liber.caract77"),game.i18n.localize("liber.caract78"),game.i18n.localize("liber.caract79")]
        var politique=rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
        
        var intret=[game.i18n.localize("liber.caract80"),game.i18n.localize("liber.caract81"),game.i18n.localize("liber.caract82"),game.i18n.localize("liber.caract83"),game.i18n.localize("liber.caract84"),game.i18n.localize("liber.caract85"),game.i18n.localize("liber.caract86"),game.i18n.localize("liber.caract87"),game.i18n.localize("liber.caract88"),game.i18n.localize("liber.caract89"),game.i18n.localize("liber.caract90"),game.i18n.localize("liber.caract91"),game.i18n.localize("liber.caract92"),game.i18n.localize("liber.caract93"),game.i18n.localize("liber.caract94"),game.i18n.localize("liber.caract95"),game.i18n.localize("liber.caract96"),game.i18n.localize("liber.caract97"),game.i18n.localize("liber.caract98"),game.i18n.localize("liber.caract99"),game.i18n.localize("liber.caract100"),game.i18n.localize("liber.caract101"),game.i18n.localize("liber.caract102")]
        var groupe=intret[Math.floor(Math.random()*intret.length)]

        var pertes=[game.i18n.localize("liber.caract103"),game.i18n.localize("liber.caract104"),game.i18n.localize("liber.caract105"),game.i18n.localize("liber.caract106"),game.i18n.localize("liber.caract107"),game.i18n.localize("liber.caract108"),game.i18n.localize("liber.caract109"),game.i18n.localize("liber.caract110"),game.i18n.localize("liber.caract111"),game.i18n.localize("liber.caract112"),game.i18n.localize("liber.caract113"),game.i18n.localize("liber.caract114"),game.i18n.localize("liber.caract115"),game.i18n.localize("liber.caract116"),game.i18n.localize("liber.caract117"),game.i18n.localize("liber.caract118")]
        var dc=pertes[Math.floor(Math.random()*pertes.length)]

        var valeur=[game.i18n.localize("liber.caract119"),game.i18n.localize("liber.caract120"),game.i18n.localize("liber.caract121"),game.i18n.localize("liber.caract122"),game.i18n.localize("liber.caract123"),game.i18n.localize("liber.caract124"),game.i18n.localize("liber.caract125"),game.i18n.localize("liber.caract126"),game.i18n.localize("liber.caract127"),game.i18n.localize("liber.caract128"),game.i18n.localize("liber.caract129"),game.i18n.localize("liber.caract130"),game.i18n.localize("liber.caract131")]
        var moral=valeur[Math.floor(Math.random()*valeur.length)]

        var race=[game.i18n.localize("liber.caract132"),game.i18n.localize("liber.caract133"),game.i18n.localize("liber.caract134"),game.i18n.localize("liber.caract135"),game.i18n.localize("liber.caract136"),game.i18n.localize("liber.caract137")]
        var rang=[game.i18n.localize("liber.caract138"),game.i18n.localize("liber.caract139"),game.i18n.localize("liber.caract140"),game.i18n.localize("liber.caract141"),game.i18n.localize("liber.caract142"),game.i18n.localize("liber.caract143"),game.i18n.localize("liber.caract144"),game.i18n.localize("liber.caract145")]
        var organisation=[game.i18n.localize("liber.caract146"),game.i18n.localize("liber.caract147"),game.i18n.localize("liber.caract148"),game.i18n.localize("liber.caract149"),game.i18n.localize("liber.caract150"),game.i18n.localize("liber.caract151"),game.i18n.localize("liber.caract152"),game.i18n.localize("liber.caract153"),game.i18n.localize("liber.caract154"),game.i18n.localize("liber.caract155"),game.i18n.localize("liber.caract156"),game.i18n.localize("liber.caract157"),game.i18n.localize("liber.caract158"),game.i18n.localize("liber.caract159"),game.i18n.localize("liber.caract160"),game.i18n.localize("liber.caract161"),game.i18n.localize("liber.caract162"),game.i18n.localize("liber.caract163"),game.i18n.localize("liber.caract164"),game.i18n.localize("liber.caract165")];
        var amour=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
        
        var ami=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];

        var haine=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];

        var profession=[game.i18n.localize("liber.caract166"),game.i18n.localize("liber.caract167"),game.i18n.localize("liber.caract168"),game.i18n.localize("liber.caract169"),game.i18n.localize("liber.caract170"),game.i18n.localize("liber.caract171"),game.i18n.localize("liber.caract172"),game.i18n.localize("liber.caract173"),game.i18n.localize("liber.caract174"),game.i18n.localize("liber.caract175"),game.i18n.localize("liber.caract176"),game.i18n.localize("liber.caract177"),game.i18n.localize("liber.caract178"),game.i18n.localize("liber.caract179"),game.i18n.localize("liber.caract180"),game.i18n.localize("liber.caract181"),game.i18n.localize("liber.caract182"),game.i18n.localize("liber.caract183"),game.i18n.localize("liber.caract184"),game.i18n.localize("liber.caract185"),game.i18n.localize("liber.caract186"),game.i18n.localize("liber.caract187"),game.i18n.localize("liber.caract188"),game.i18n.localize("liber.caract189"),game.i18n.localize("liber.caract190"),game.i18n.localize("liber.caract191"),game.i18n.localize("liber.caract192"),game.i18n.localize("liber.caract193"),game.i18n.localize("liber.caract194"),game.i18n.localize("liber.caract195"),game.i18n.localize("liber.caract196"),game.i18n.localize("liber.caract197"),game.i18n.localize("liber.caract198"),game.i18n.localize("liber.caract199"),game.i18n.localize("liber.caract200"),game.i18n.localize("liber.caract201"),game.i18n.localize("liber.caract202"),game.i18n.localize("liber.caract203")]
        var metier1=profession[Math.floor(Math.random()*profession.length)]

        var metier2=profession[Math.floor(Math.random()*profession.length)]

        var loisir=[game.i18n.localize("liber.caract204"),game.i18n.localize("liber.caract205"),game.i18n.localize("liber.caract206"),game.i18n.localize("liber.caract207"),game.i18n.localize("liber.caract208"),game.i18n.localize("liber.caract209"),game.i18n.localize("liber.caract210"),game.i18n.localize("liber.caract211"),game.i18n.localize("liber.caract212"),game.i18n.localize("liber.caract213"),game.i18n.localize("liber.caract214"),game.i18n.localize("liber.caract215"),game.i18n.localize("liber.caract216"),game.i18n.localize("liber.caract217"),game.i18n.localize("liber.caract218"),game.i18n.localize("liber.caract219"),game.i18n.localize("liber.caract220"),game.i18n.localize("liber.caract221"),game.i18n.localize("liber.caract222"),game.i18n.localize("liber.caract223"),game.i18n.localize("liber.caract224")]
        var metier3=loisir[Math.floor(Math.random()*loisir.length)]

        var caracterelist=[game.i18n.localize("liber.caract225"),game.i18n.localize("liber.caract226"),game.i18n.localize("liber.caract227"),game.i18n.localize("liber.caract228"),game.i18n.localize("liber.caract229"),game.i18n.localize("liber.caract230"),game.i18n.localize("liber.caract231"),game.i18n.localize("liber.caract232"),game.i18n.localize("liber.caract233"),game.i18n.localize("liber.caract234"),game.i18n.localize("liber.caract235"),game.i18n.localize("liber.caract236"),game.i18n.localize("liber.caract237")]
        var caractere=caracterelist[Math.floor(Math.random()*caracterelist.length)]

        var personnalitelist=[game.i18n.localize("liber.caract238"),game.i18n.localize("liber.caract239"),game.i18n.localize("liber.caract240"),game.i18n.localize("liber.caract241"),game.i18n.localize("liber.caract242"),game.i18n.localize("liber.caract243"),game.i18n.localize("liber.caract244"),game.i18n.localize("liber.caract245"),game.i18n.localize("liber.caract246"),game.i18n.localize("liber.caract247"),game.i18n.localize("liber.caract248"),game.i18n.localize("liber.caract249"),game.i18n.localize("liber.caract250"),game.i18n.localize("liber.caract251"),game.i18n.localize("liber.caract252"),game.i18n.localize("liber.caract253"),game.i18n.localize("liber.caract254"),game.i18n.localize("liber.caract255")]
        var personnalite=personnalitelist[Math.floor(Math.random()*personnalitelist.length)]

        var visionlist=[game.i18n.localize("liber.caract256"),game.i18n.localize("liber.caract257"),game.i18n.localize("liber.caract258"),game.i18n.localize("liber.caract259"),game.i18n.localize("liber.caract260"),game.i18n.localize("liber.caract261"),game.i18n.localize("liber.caract262"),game.i18n.localize("liber.caract263"),game.i18n.localize("liber.caract264"),game.i18n.localize("liber.caract265"),game.i18n.localize("liber.caract266"),game.i18n.localize("liber.caract267"),game.i18n.localize("liber.caract268"),game.i18n.localize("liber.caract269"),game.i18n.localize("liber.avantrace62")]
        var vision="Rempli de "+visionlist[Math.floor(Math.random()*visionlist.length)]

        var objectiflist=[game.i18n.localize("liber.caract270"),game.i18n.localize("liber.caract271"),game.i18n.localize("liber.caract275"),game.i18n.localize("liber.caract273"),game.i18n.localize("liber.caract274"),game.i18n.localize("liber.caract275"),game.i18n.localize("liber.caract276"),game.i18n.localize("liber.caract277"),game.i18n.localize("liber.caract278")]
        var objectif=objectiflist[Math.floor(Math.random()*objectiflist.length)]

        var racunelist=[game.i18n.localize("liber.oui"),game.i18n.localize("liber.non"),game.i18n.localize("liber.bof")]
        var racune=racunelist[Math.floor(Math.random()*racunelist.length)]

        var tarelist=[game.i18n.localize("liber.caract279"),game.i18n.localize("liber.caract280"),game.i18n.localize("liber.caract281"),game.i18n.localize("liber.caract282"),game.i18n.localize("liber.caract283"),game.i18n.localize("liber.caract284"),game.i18n.localize("liber.caract285"),game.i18n.localize("liber.caract286"),game.i18n.localize("liber.caract287"),game.i18n.localize("liber.caract288"),game.i18n.localize("liber.caract289"),game.i18n.localize("liber.caract290"),game.i18n.localize("liber.caract291"),game.i18n.localize("liber.caract292"),game.i18n.localize("liber.caract293"),game.i18n.localize("liber.caract294"),game.i18n.localize("liber.caract295"),game.i18n.localize("liber.caract296"),game.i18n.localize("liber.caract297"),game.i18n.localize("liber.caract298"),game.i18n.localize("liber.caract299"),game.i18n.localize("liber.caract300"),game.i18n.localize("liber.caract301"),game.i18n.localize("liber.caract302"),game.i18n.localize("liber.caract303"),game.i18n.localize("liber.caract304"),game.i18n.localize("liber.caract305"),game.i18n.localize("liber.caract306"),game.i18n.localize("liber.caract307"),game.i18n.localize("liber.caract308"),game.i18n.localize("liber.caract309"),game.i18n.localize("liber.caract310"),game.i18n.localize("liber.caract311"),game.i18n.localize("liber.caract312"),game.i18n.localize("liber.caract313"),game.i18n.localize("liber.caract314"),game.i18n.localize("liber.caract315"),game.i18n.localize("liber.caract316"),game.i18n.localize("liber.caract317"),game.i18n.localize("liber.caract318"),game.i18n.localize("liber.caract319"),game.i18n.localize("liber.caract320"),game.i18n.localize("liber.caract321"),game.i18n.localize("liber.caract322"),game.i18n.localize("liber.caract323"),game.i18n.localize("liber.caract324"),game.i18n.localize("liber.caract325"),game.i18n.localize("liber.caract326"),game.i18n.localize("liber.caract327"),game.i18n.localize("liber.caract328"),game.i18n.localize("liber.caract329"),game.i18n.localize("liber.caract330"),game.i18n.localize("liber.caract331"),game.i18n.localize("liber.caract332"),game.i18n.localize("liber.caract333"),game.i18n.localize("liber.caract334"),game.i18n.localize("liber.caract335"),game.i18n.localize("liber.caract336"),game.i18n.localize("liber.caract337"),game.i18n.localize("liber.caract338"),game.i18n.localize("liber.caract339"),game.i18n.localize("liber.caract340"),game.i18n.localize("liber.caract341"),game.i18n.localize("liber.caract342"),game.i18n.localize("liber.caract343"),game.i18n.localize("liber.caract344"),game.i18n.localize("liber.caract345"),game.i18n.localize("liber.caract346"),game.i18n.localize("liber.caract347"),game.i18n.localize("liber.caract348"),game.i18n.localize("liber.caract349"),game.i18n.localize("liber.caract350"),game.i18n.localize("liber.caract351"),game.i18n.localize("liber.caract352"),game.i18n.localize("liber.caract353"),game.i18n.localize("liber.caract354"),game.i18n.localize("liber.caract355"),game.i18n.localize("liber.caract356"),game.i18n.localize("liber.caract357"),game.i18n.localize("liber.caract358"),game.i18n.localize("liber.caract359"),game.i18n.localize("liber.caract360"),game.i18n.localize("liber.caract361"),game.i18n.localize("liber.caract362"),game.i18n.localize("liber.caract363"),game.i18n.localize("liber.caract364"),game.i18n.localize("liber.caract36"),game.i18n.localize("liber.caract366"),game.i18n.localize("liber.caract367"),game.i18n.localize("liber.caract368"),game.i18n.localize("liber.caract369"),game.i18n.localize("liber.caract370"),game.i18n.localize("liber.caract371"),game.i18n.localize("liber.caract372"),game.i18n.localize("liber.caract373"),game.i18n.localize("liber.caract374"),game.i18n.localize("liber.caract375"),game.i18n.localize("liber.caract376"),game.i18n.localize("liber.caract377"),game.i18n.localize("liber.caract378"),game.i18n.localize("liber.caract379"),game.i18n.localize("liber.caract380"),game.i18n.localize("liber.caract381"),game.i18n.localize("liber.caract382"),game.i18n.localize("liber.caract383"),game.i18n.localize("liber.caract384"),game.i18n.localize("liber.caract385"),game.i18n.localize("liber.caract386"),game.i18n.localize("liber.caract387"),game.i18n.localize("liber.caract388"),game.i18n.localize("liber.caract389"),game.i18n.localize("liber.caract390"),game.i18n.localize("liber.caract391"),game.i18n.localize("liber.caract392"),game.i18n.localize("liber.caract393"),game.i18n.localize("liber.caract394"),game.i18n.localize("liber.caract395"),game.i18n.localize("liber.caract396"),game.i18n.localize("liber.caract397"),game.i18n.localize("liber.caract398"),game.i18n.localize("liber.caract399"),game.i18n.localize("liber.caract400"),game.i18n.localize("liber.caract401"),game.i18n.localize("liber.caract402"),game.i18n.localize("liber.caract403"),game.i18n.localize("liber.caract404"),game.i18n.localize("liber.caract405"),game.i18n.localize("liber.caract406"),game.i18n.localize("liber.caract407"),game.i18n.localize("liber.caract408"),game.i18n.localize("liber.caract409"),game.i18n.localize("liber.caract410"),game.i18n.localize("liber.caract411"),game.i18n.localize("liber.caract412"),game.i18n.localize("liber.caract413"),game.i18n.localize("liber.caract414"),game.i18n.localize("liber.caract415"),game.i18n.localize("liber.caract416"),game.i18n.localize("liber.caract417"),game.i18n.localize("liber.caract418"),game.i18n.localize("liber.caract419"),game.i18n.localize("liber.caract420"),game.i18n.localize("liber.caract421"),game.i18n.localize("liber.caract422"),game.i18n.localize("liber.caract423"),game.i18n.localize("liber.caract424"),game.i18n.localize("liber.caract425"),game.i18n.localize("liber.caract426"),game.i18n.localize("liber.caract427"),game.i18n.localize("liber.caract428"),game.i18n.localize("liber.caract429"),game.i18n.localize("liber.caract430"),game.i18n.localize("liber.caract431")]
        var tare=tarelist[Math.floor(Math.random()*tarelist.length)]

        var obsessionlist=[game.i18n.localize("liber.oui"),game.i18n.localize("liber.non"),game.i18n.localize("liber.bof")]
        var obsession=obsessionlist[Math.floor(Math.random()*obsessionlist.length)]

        var distinguelist=[game.i18n.localize("liber.oui"),game.i18n.localize("liber.non"),game.i18n.localize("liber.bof")]
        var distingue=distinguelist[Math.floor(Math.random()*distinguelist.length)]
        
        //var encombrement=(parseInt(forc) + parseInt(cpt37)) /2 + 20;

        //update
        this.actor.update({'name': name,'system.histoire': textgen,'system.bonusrace': avantagerace,'system.protection' : armureperso,'system.hp.max': hp,'system.hp.value': hp,'system.psy.max': psy,'system.psy.value': psy,'system.ability.physique':phy,'system.ability.force':forc,'system.ability.agilite':agil,'system.ability.social':soc,'system.ability.sagacite':saga,'system.ability.charisme':char,'system.ability.mental':men,'system.ability.ast':astu,'system.ability.memoire':memo,'system.caracteristique.acrobatie':cpt0,'system.caracteristique.agilites':cpt1,'system.caracteristique.alchimie':cpt2,'system.caracteristique.apprentissage':cpt3,'system.caracteristique.hast':cpt4,'system.caracteristique.cc':cpt5,'system.caracteristique.lancer':cpt6,'system.caracteristique.melee':cpt7,'system.caracteristique.tir':cpt8,'system.caracteristique.art':cpt9,'system.caracteristique.assassinat':cpt10,'system.caracteristique.baton':cpt11,'system.caracteristique.bouclier':cpt12,'system.caracteristique.bricolage':cpt13,'system.caracteristique.presence':cpt14,'system.caracteristique.chercher':cpt15,'system.caracteristique.commander':cpt16,'system.caracteristique.concentration':cpt17,'system.caracteristique.nature':cpt18,'system.caracteristique.peuples':cpt19,'system.caracteristique.religions':cpt20,'system.caracteristique.geographique':cpt21,'system.caracteristique.rue':cpt22,'system.caracteristique.heretiques':cpt23,'system.caracteristique.combat':cpt24,'system.caracteristique.commerce':cpt25,'system.caracteristique.crochetage':cpt26,'system.caracteristique.discretion':cpt27,'system.caracteristique.dexterite':cpt28,'system.caracteristique.detection':cpt29,'system.caracteristique.dissimulation':cpt30,'system.caracteristique.dressage':cpt31,'system.caracteristique.ennemi':cpt32,'system.caracteristique.equilibre':cpt33,'system.caracteristique.equitation':cpt34,'system.caracteristique.escroquerie':cpt35,'system.caracteristique.esquiver':cpt36,'system.caracteristique.puissance':cpt37,'system.caracteristique.astuce':cpt38,'system.caracteristique.peur':cpt39,'system.caracteristique.joueur':cpt40,'system.caracteristique.maitrise':cpt41,'system.caracteristique.natation':cpt42,'system.caracteristique.navigation':cpt43,'system.caracteristique.orientation':cpt44,'system.caracteristique.persuasion':cpt45,'system.caracteristique.pister':cpt46,'system.caracteristique.prophetie':cpt47,'system.caracteristique.secours':cpt48,'system.caracteristique.resistance':cpt49,'system.caracteristique.psychologue':cpt50,'system.caracteristique.medecine':cpt51,'system.caracteristique.survie':cpt52,'system.caracteristique.tueur':cpt53,'system.caracteristique.objet':cpt54,'system.caracteristique.veterinaire':cpt55,'system.caracteristique.vigilance':cpt56,'system.caracteristique.vise':cpt57,'system.caractere.residence': resident,'system.caractere.sang': sang,'system.caractere.politique': politique,'system.caractere.interets': groupe,'system.caractere.deces': dc,'system.caractere.moral': moral,'system.caractere.amour': amour,'system.caractere.amitie': ami,'system.caractere.haine': haine,'system.caractere.principale': metier1,'system.caractere.secondaire': metier2,'system.caractere.passion': metier3,'system.caractere.caract': caractere,'system.caractere.personnalite': personnalite,'system.caractere.perception': vision,'system.caractere.objectif': objectif,'system.caractere.rancunier': racune,'system.caractere.tare': tare,'system.caractere.obsession': obsession,'system.caractere.distingue': distingue});
    }
    
    _onArmor(event){
        const equipe=event.target.dataset["equip"];
        const listedemain =['Rapière','Bâton','Espadon','Hallebarde','Fléaux d\'arme','Epée à deux main','Masse d\'arme','Hache de bataille','Faux de Guerre','Lance Lourde']
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
              equipe === DROITE ? (armeg = "", degatg = "", desg = "", imgg = "") : (equipe === GAUCHE ? (armed = "", degatd = "", desd = "", imgd = "") : null);
            }
          }

          equipe === DROITE
            ? ((armed = name), (degatd = degat), (desd = des), (imgd = img))
            : equipe === GAUCHE
            ? ((armeg = name), (degatg = degat), (desg = des), (imgg = img))
            : equipe === "ddroite"
            ? ((armed = ''), (degatd = ''), (desd = ''), (imgd = ''))
            : equipe === "dgauche"
            ? ((armeg = ''), (degatg = ''), (desg = ''), (imgg = ''))
            : null;
        }else {
            if(equipe=== 'armure'){
                arm=name; ard=des; ari=img;
            }else if(equipe=== 'darmure'){
                arm=''; ard=''; ari='';
            }
        }

        if(race==game.i18n.localize("liber.avantrace60")){
            armor = 2;
        }
        if(armed=="Bouclier"){armor=armor+1;}
        else if(armed=="Grand Bouclier"){armor=armor+2;} 
        if(armeg=="Bouclier"){armor=armor+1;}
        else if(armeg=="Grand Bouclier"){armor=armor+2;}
        if(arm=="Bouclier"){armor=armor+1;} 
        else if(arm=="Cuir souple"){armor=armor+1;}
        else if(arm=="Grand Bouclier"){armor=armor+2;} 
        else if(arm=="Cuir rigide"){armor=armor+2;} 
        else if(arm=="Cote de maille"){armor=armor+3;}
        else if(arm=="Armure de plaques"){armor=armor+4;}     
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
        let itemData= this.actor.items.filter(i=>i.name == "Attaque");   
        var iditem= itemData[0].id;
        var dgt = itemData[0].data.system.degats;
        itemData[0].DegatLvl();

        this.actor.update({'system.hp.max': pv,'system.hp.value': pv,'system.psy.max': ps,'system.psy.value': ps,'system.protection': ar,'system.level': lvl});

    }

    _onCouv(event){
        let idn=event.target.dataset["lettre"];  //recupére l'id du bouton
        let etats=['a','b','c','d','e','f','g','h','i','j','k','l','m','n'];
        var active=[this.actor.system.etat.a, this.actor.system.etat.b, this.actor.system.etat.c, this.actor.system.etat.d, this.actor.system.etat.e, this.actor.system.etat.f, this.actor.system.etat.g, this.actor.system.etat.h, this.actor.system.etat.i, this.actor.system.etat.j, this.actor.system.etat.k, this.actor.system.etat.l, this.actor.system.etat.m, this.actor.system.etat.n]
        let lists=['Endormi','Etourdi','Aveugle','Sourd','Réduit au silence','Apeuré','Brûlant','Gelé','Invisible','Béni','Empoisonné','Saignement','Inconscient','Mort']
        let icon=['sleep','daze','blind','deaf','silenced','terror','fire','frozen','invisible','angel','poison','blood','unconscious','dead']
        let effet=this.actor.effects;
        var ids=null;
        let etat=active[idn];
        var etre='Est'
        if(etat==0.5){
            this.actor.createEmbeddedDocuments("ActiveEffect", [
              {label: lists[idn], icon: 'icons/svg/'+icon[idn]+'.svg', flags: { core: { statusId: icon[idn] } } }
            ]);
            this.actor.update({[`system.etat.${etats[idn]}`]:1});
        }else {
            
            effet.forEach(function(item, index, array) {
                if(item.label==lists[idn]){
                    ids=item.id;
                }
            });            
            this.actor.deleteEmbeddedDocuments("ActiveEffect", [ids]);
            this.actor.update({[`system.etat.${etats[idn]}`]:0.5});
            etre="N'est plus";
        }

        var texte = "<span style='flex:auto'><p class='resultatp'>"+etre+" &nbsp; <span style='text-transform:uppercase;font-weight: bold;'> "+lists[idn]+"</span></span></span>";
        let chatData = {
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
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
        //console.log(name)
        if(name=="malus"){
            this.actor.update({"system.malus":0});
        }else if(name=="bonus"){
            this.actor.update({"system.bonus":0});  
        }   
    }

    _onEncom(){
        const compt = this.actor.system.talent
        const faible = this.actor.system.faiblesse
        let forc=this.actor.system.ability.force;
        let puis=this.actor.system.caracteristique.puissance
        if(forc==''){forc=0}
        if(puis==''){puis=0}
        var enc=(parseInt(forc)+ parseInt(puis)) /2 + 35;
        //console.log('Encombrement:'+enc)
        if(compt=="Mulet"){
            enc=parseInt(enc)+10
        }
        if(faible=="Faible"){
            enc=parseInt(enc)-10
        }
        this.actor.update({"system.encombrement.max":enc});
    }

    async _onStat(event){
        let race=this.actor.system.race;
        let phys=this.actor.system.ability.physique;
        let forc=this.actor.system.ability.force;
        let agil=this.actor.system.ability.agilite;
        let soci=this.actor.system.ability.social;
        let char=this.actor.system.ability.charisme;
        let saga=this.actor.system.ability.sagacite;
        let ment=this.actor.system.ability.mental;
        let astu=this.actor.system.ability.astuce;
        let memo=this.actor.system.ability.memoire;
        let level=this.actor.system.level;
        let clan=this.actor.system.clan;
        let reli=this.actor.system.religion;
        let psy=this.actor.system.psy.max;
        let psyvalue=this.actor.system.psy.value;
        var hp=this.actor.system.hp.value;
        let compt=this.actor.system.talent
        let faible=this.actor.system.faiblesse
        var hpmax=this.actor.system.hp.max;
        var metier=this.actor.system.metier
        var resultat=35+(parseInt(level)*15);
        if(level==''){
            level=1;
        }

        if(race==game.i18n.localize("liber.avantrace61")){
            var reste=175-(parseInt(phys)+parseInt(soci)+parseInt(ment)); 
        }else{
            var reste=170-(parseInt(phys)+parseInt(soci)+parseInt(ment)); 
        }
        if(phys==''){let phys=10}
        if(forc==''){let force=5}
        if(agil==''){let agilite=5}
        if(soci==''){let social=10}
        if(char==''){let charisme=5}
        if(saga==''){let sagacite=5}
        if(ment==''){let mental=10}
        if(astu==''){let astuce=5}
        if(memo==''){let physique=5}
        var cpt0=this.actor.system.caracteristique.acrobatie;var cpt1=this.actor.system.caracteristique.agilites;var cpt2=this.actor.system.caracteristique.alchimie;var cpt3=this.actor.system.caracteristique.apprentissage;var cpt4=this.actor.system.caracteristique.hast;var cpt5=this.actor.system.caracteristique.cc;var cpt6=this.actor.system.caracteristique.lancer;var cpt7=this.actor.system.caracteristique.melee;var cpt8=this.actor.system.caracteristique.tir;var cpt9=this.actor.system.caracteristique.art;var cpt10=this.actor.system.caracteristique.assassinat;var cpt11=this.actor.system.caracteristique.baton;var cpt12=this.actor.system.caracteristique.bouclier;var cpt13=this.actor.system.caracteristique.bricolage;var cpt14=this.actor.system.caracteristique.presence;var cpt15=this.actor.system.caracteristique.chercher;var cpt16=this.actor.system.caracteristique.commander;var cpt17=this.actor.system.caracteristique.concentration;var cpt18=this.actor.system.caracteristique.nature;var cpt19=this.actor.system.caracteristique.peuples;var cpt20=this.actor.system.caracteristique.religions;var cpt21=this.actor.system.caracteristique.geographique;var cpt22=this.actor.system.caracteristique.rue;var cpt23=this.actor.system.caracteristique.heretiques;var cpt24=this.actor.system.caracteristique.combat;var cpt25=this.actor.system.caracteristique.commerce;var cpt26=this.actor.system.caracteristique.crochetage;var cpt27=this.actor.system.caracteristique.discretion;var cpt28=this.actor.system.caracteristique.dexterite;var cpt29=this.actor.system.caracteristique.detection;var cpt30=this.actor.system.caracteristique.dissimulation;var cpt31=this.actor.system.caracteristique.dressage;var cpt32=this.actor.system.caracteristique.ennemi;var cpt33=this.actor.system.caracteristique.equilibre;var cpt34=this.actor.system.caracteristique.equitation;var cpt35=this.actor.system.caracteristique.escroquerie;var cpt36=this.actor.system.caracteristique.esquiver;var cpt37=this.actor.system.caracteristique.puissance;var cpt38=this.actor.system.caracteristique.astuce;var cpt39=this.actor.system.caracteristique.peur;var cpt40=this.actor.system.caracteristique.joueur;var cpt41=this.actor.system.caracteristique.maitrise;var cpt42=this.actor.system.caracteristique.natation;var cpt43=this.actor.system.caracteristique.navigation;var cpt44=this.actor.system.caracteristique.orientation;var cpt45=this.actor.system.caracteristique.persuasion;var cpt46=this.actor.system.caracteristique.pister;var cpt47=this.actor.system.caracteristique.prophetie;var cpt48=this.actor.system.caracteristique.secours;var cpt49=this.actor.system.caracteristique.resistance;var cpt50=this.actor.system.caracteristique.psychologue;var cpt51=this.actor.system.caracteristique.medecine;var cpt52=this.actor.system.caracteristique.survie;var cpt53=this.actor.system.caracteristique.tueur;var cpt54=this.actor.system.caracteristique.objet;
        var cpts=[cpt0,cpt1,cpt2,cpt3,cpt4,cpt5,cpt6,cpt7,cpt8,cpt9,cpt10,cpt11,cpt12,cpt13,cpt14,cpt15,cpt16,cpt17,cpt18,cpt19,cpt20,cpt21,cpt22,cpt23,cpt24,cpt25,cpt26,cpt27,cpt28,cpt29,cpt30,cpt31,cpt32,cpt33,cpt34,cpt35,cpt36,cpt37,cpt38,cpt39,cpt40,cpt41,cpt42,cpt43,cpt44,cpt45,cpt46,cpt47,cpt48,cpt49,cpt50,cpt51,cpt52,cpt53,cpt54]
        
        switch(race) {
          case game.i18n.localize("liber.avantrace60"):
            resultat -= 20;
            break;
          case game.i18n.localize("liber.avantrace92"):
            resultat -= 25;
            break;
          case game.i18n.localize("liber.avantrace39"):
            resultat += 15;
            cpt39 = Math.max(cpt39, 10);
            break;
          case game.i18n.localize("liber.avantrace61"):
            resultat += 15;
            cpt28 = Math.max(cpt28, 5);
            break;
          case game.i18n.localize("liber.avantrace62"):
            resultat += 10;
            break;
          case game.i18n.localize("liber.avantrace63"):
            break;
          case game.i18n.localize("liber.avantrace64"):
            resultat -= 40;
            break;
          case game.i18n.localize("liber.avantrace65"):
            resultat += 15;
            cpt28 = Math.max(cpt28, 5);
            break;
          case game.i18n.localize("liber.avantrace66"):
            resultat += 20;
            cpt1 = Math.max(cpt1, 5);
            cpt18 = Math.max(cpt18, 5);
            break;
          case game.i18n.localize("liber.avantrace67"):
            resultat += 20;
            cpt10 = Math.max(cpt10, 10);
            break;
          case game.i18n.localize("liber.avantrace68"):
            resultat += 15;
            cpt1 = Math.max(cpt1, 5);
            cpt3 = Math.max(cpt3, 5);
            break;
          case game.i18n.localize("liber.avantrace69"):
            resultat += 20;
            cpt37 = Math.max(cpt37, 5);
            cpt40 = Math.max(cpt40, 5);
            break;
          case game.i18n.localize("liber.avantrace70"):
            resultat += 25;
            cpt1 = Math.max(cpt1, 5);
            cpt27 = Math.max(cpt27, 5);
            break;
          case game.i18n.localize("liber.avantrace71"):
            resultat += 20;
            cpt46 = Math.max(cpt46, 5);
            cpt28 = Math.max(cpt28, 5);
            break;
          case game.i18n.localize("liber.avantrace73"):
            resultat += 5;
            cpt18 = Math.max(cpt18, 5);
            break;
          case game.i18n.localize("liber.avantrace76"):
            resultat += 5;
            cpt15 = Math.max(cpt15, 5);
            break;
          case game.i18n.localize("liber.avantrace77"):
            resultat -= 30;
            break;
          case game.i18n.localize("liber.avantrace91"):
            resultat += 15;
            cpt1 = Math.max(cpt1, 5);
            break;
          default:
            break;
        }

        for (var i = 0; i < 55; i++) {
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
        
        //Stat base
        let b_psy = Math.round((parseInt(ment) + parseInt(soci)/2 - parseInt(phys) + 5) / 4 + 2);
        let b_nb = Math.round(parseInt(b_psy) / 4) + 1 + parseInt(level);
        let b_cout = Math.round((parseInt(b_psy) - parseInt(b_nb)) / 2) + 3;
        if (compt === "Aura") {
            b_psy += 5;
        }

        //Stat actuel
        let PVmin = Math.round(parseInt(phys) / 3);
        if (compt === "Vigoureux") {
            PVmin += 5;
        }
        if (faible === "Prisonnier") {
            PVmin -= 5;
        }
        const PSYmin = b_psy;
        let cout = 0;
        if (clan === game.i18n.localize("liber.avantrace56")) {
            cout = parseInt(level) + 1;
        } else {
            cout = Math.round((parseInt(psy) - parseInt(b_nb)) / 2) + 3;
        }

        //calcul cout et nb sort
        let xcout = Math.floor((parseInt(psy) - parseInt(b_nb)) / 2 + 3); //cout sort
        if (clan !== game.i18n.localize("liber.avantrace56")) {
            xcout = level;
        }

        const listsort = this.actor.sort;
        const nbsorts = listsort.length;
        const calsort = parseInt(b_nb) - parseInt(nbsorts);
        let color1 = 'color:white;';
        let color2 = 'color:white;';
        let apsy = '';
        let apsymax = '';
        let ahp = '';
        let ahpmax = '';
        if (calsort < 0) {
            color1 = 'color:red';
        }

        //Verif stat
        if (hpmax < PVmin && this.actor.type === "personnage" && hpmax !== 0) {
            hpmax = PVmin;
        }
        if (psy < PSYmin && this.actor.type === "personnage" && psy !== 0 && clan !== game.i18n.localize("liber.avantrace56")) {
            psy = PSYmin;
        }

        const pointxp = (parseInt(level) - 1) * 3;
        const xp = parseInt(pointxp) + parseInt(PVmin) + parseInt(PSYmin);
        const calcultotxp = parseInt(hpmax) + parseInt(psy);
        if (calcultotxp > xp && this.actor.type === "personnage") {
            apsy = 'background:red';
            apsymax = 'background:red';
            ahp = 'background:red';
            ahpmax = 'background:red';
        }
        if (parseInt(hp) > parseInt(hpmax)) {
            hp = hpmax;
            console.log('egal');
        }
        if (parseInt(psyvalue) > parseInt(psy)) {
            psyvalue = psy;
        }

        //Insoignable
        const insoin = this.actor.system.insoin;
        if (hpmax === hp && insoin > 0) {
            hp = parseInt(hpmax) - parseInt(insoin);
        }

        let mag1 = 'aucun';let mag2 = 'aucun';let all = 0;
        const raceMagMap = {
          [game.i18n.localize('liber.avantrace56')]: 'corbeau',
          [game.i18n.localize('liber.metier12')]: 'troubadour',
          [game.i18n.localize('liber.avantrace61')]: 'humain',
          [game.i18n.localize('liber.avantrace39')]: 'demon',
          [game.i18n.localize('liber.avantrace62')]: 'demon',
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
          [game.i18n.localize('liber.avantrace51')]: 'telekenesie',
          [game.i18n.localize('liber.avantrace52')]: 'terre',
          [game.i18n.localize('liber.avantrace53')]: 'ultime',
          [game.i18n.localize('liber.avantrace54')]: 'vie',
          [game.i18n.localize('liber.avantrace55')]: 'ombre',
          [game.i18n.localize('liber.avantrace59')]: 'constellation',
          [game.i18n.localize('liber.avantrace78')]: 'autre'
        };

        const reliMagMap = {
          [game.i18n.localize('liber.avantrace56')]: 'rune',
          [game.i18n.localize('liber.avantrace80')]: 'vharung',
          [game.i18n.localize('liber.avantrace81')]: 'nouvelordre',
          [game.i18n.localize('liber.avantrace82')]: 'croise',
          [game.i18n.localize('liber.avantrace83')]: 'lumiere',
          [game.i18n.localize('liber.avantrace84')]: 'ombre',
          [game.i18n.localize('liber.avantrace85')]: 'waetra',
          [game.i18n.localize('liber.avantrace90')]: 'rune'
        };

        if (raceMagMap[race]) {
          mag1 = raceMagMap[race];

        } else if (clan && clan !== 'undefined' && raceMagMap[clan]) {
          mag1 = raceMagMap[clan];
        }

        if (reliMagMap[reli]) {
          mag2 = reliMagMap[reli];
        }
        //activer les effets
        const effets = this.actor.effects.filter(item => item.label !== '').map(item => item.label);
        const lists = ['Endormi','Etourdi','Aveugle','Sourd','Réduit au silence','Apeuré','Brûlant','Gelé','Invisible','Béni','Empoisonné','Saignement','Inconscient','Mort'];
        const active = lists.map(list => effets.includes(list) ? 1 : 0.5);

        //liste des sorts possible
        const pack = game.packs.get('liber.magie');
        const tables = await pack.getDocuments();
        const listem = tables.filter(value =>
            value.system.classe == mag1 ||
            value.system.classe == mag2 ||
            mag1 == game.i18n.localize("liber.avantrace78")
        ).filter(value =>
            parseInt(value.system.cout) <= cout || cout == "X"
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
        this.actor.update({"system.level":level,"system.etat.a":active[0],"system.etat.b":active[1],"system.etat.c":active[2],"system.etat.d":active[3],"system.etat.e":active[4],"system.etat.f":active[5],"system.etat.g":active[6],"system.etat.h":active[7],"system.etat.i":active[8],"system.etat.j":active[9],"system.etat.k":active[10],"system.etat.l":active[11],"system.etat.m":active[12],"system.etat.n":active[13],"system.reste":reste,'system.listemag.liste':listem,'system.listemag.img1':mag1,'system.listemag.img2':mag2,'system.alert.psy':apsy,'system.alert.psymax':apsymax,'system.alert.hp':ahp,'system.alert.hpmax':ahp,'system.hp.max':hpmax,'system.hp.value':hp,'system.psy.max':psy,'system.psy.value':psyvalue,"system.restant":resultat,'system.maxsort':calsort,'system.coutmax':cout,'system.alert.maxsort':color1,'system.alert.coutmax':color2,'system.caracteristique.acrobatie':cpts[0],'system.caracteristique.agilites':cpts[1],'system.caracteristique.alchimie':cpts[2],'system.caracteristique.apprentissage':cpts[3],'system.caracteristique.hast':cpts[4],'system.caracteristique.cc':cpts[5],'system.caracteristique.lancer':cpts[6],'system.caracteristique.melee':cpts[7],'system.caracteristique.tir':cpts[8],'system.caracteristique.art':cpts[9],'system.caracteristique.assassinat':cpts[10],'system.caracteristique.baton':cpts[11],'system.caracteristique.bouclier':cpts[12],'system.caracteristique.bricolage':cpts[13],'system.caracteristique.presence':cpts[14],'system.caracteristique.chercher':cpts[15],'system.caracteristique.commander':cpts[16],'system.caracteristique.concentration':cpts[17],'system.caracteristique.nature':cpts[18],'system.caracteristique.peuples':cpts[19],'system.caracteristique.religions':cpts[20],'system.caracteristique.geographique':cpts[21],'system.caracteristique.rue':cpts[22],'system.caracteristique.heretiques':cpts[23],'system.caracteristique.combat':cpts[24],'system.caracteristique.commerce':cpts[25],'system.caracteristique.crochetage':cpts[26],'system.caracteristique.discretion':cpts[27],'system.caracteristique.dexterite':cpts[28],'system.caracteristique.detection':cpts[29],'system.caracteristique.dissimulation':cpts[30],'system.caracteristique.dressage':cpts[31],'system.caracteristique.ennemi':cpts[32],'system.caracteristique.equilibre':cpts[33],'system.caracteristique.equitation':cpts[34],'system.caracteristique.escroquerie':cpts[35],'system.caracteristique.esquiver':cpts[36],'system.caracteristique.puissance':cpts[37],'system.caracteristique.astuce':cpts[38],'system.caracteristique.peur':cpts[39],'system.caracteristique.joueur':cpts[40],'system.caracteristique.maitrise':cpts[41],'system.caracteristique.natation':cpts[42],'system.caracteristique.navigation':cpts[43],'system.caracteristique.orientation':cpts[44],'system.caracteristique.persuasion':cpts[45],'system.caracteristique.pister':cpts[46],'system.caracteristique.prophetie':cpts[47],'system.caracteristique.secours':cpts[48],'system.caracteristique.resistance':cpts[49],'system.caracteristique.psychologue':cpts[50],'system.caracteristique.medecine':cpts[51],'system.caracteristique.survie':cpts[52],'system.caracteristique.tueur':cpts[53],'system.caracteristique.objet':cpts[54],'system.caracteristique.veterinaire':cpts[55],'system.caracteristique.vigilance':cpts[56],'system.caracteristique.vise':cpts[57]});
        
    }


    async _onRandom(event){
        let listem=[]
        let type=event.target.dataset["type"]
        console.log(type)
        if(type=='objet'){
             const pack = game.packs.get('liber.objet');
            const tables = await pack.getDocuments();
            $.each( tables, function( key, value ) {
                listem.push({'name':value.name,'img':value.img,'description':value.system.description,'poids':value.system.poids,'valeur':value.system.valeur})
            });
            let qt=Math.floor(Math.random() * 10) + 1;
            let nbobj=Math.floor(Math.random()*9)+1;
            for (var i = nbobj; i >= 0; i--) {
                let r=Math.floor(Math.random()*listem.length)
                this.actor.createEmbeddedDocuments('Item', [{ name: listem[r].name, type:'objet','img':listem[r].img, 'system.description' : listem[r].description, 'system.poids' : listem[r].poids, 'system.quantite' : qt, 'system.valeur' : listem[r].valeur}], { renderSheet: false });
            }
        }else if(type=='arme'){
            const pack = game.packs.get('liber.arme');
            const tables = await pack.getDocuments();
            $.each( tables, function( key, value ) {
                listem.push({'name':value.name,'img':value.img,'description':value.system.description,'degat':value.system.degats,'poids':value.system.poids,'portee':value.system.portee,'valeur':value.system.valeur})
            });
            let r=Math.floor(Math.random()*listem.length)
            this.actor.createEmbeddedDocuments('Item', [{ name: listem[r].name, type:'arme','img':listem[r].img, 'system.description' : listem[r].description, 'system.degats' : listem[r].degat,'system.poids' : listem[r].poids,'system.quantite' : 1, 'system.portee' : listem[r].portee, 'system.valeur' : listem[r].valeur}], { renderSheet: false }) 
        }else if(type=='armure'){
            const pack = game.packs.get('liber.armure');
            const tables = await pack.getDocuments();
            $.each( tables, function( key, value ) {
                listem.push({'name':value.name,'img':value.img,'description':value.system.description,'protection':value.system.protection,'poids':value.system.poids,'valeur':value.system.valeur})
            });
            let r=Math.floor(Math.random()*listem.length)
            this.actor.createEmbeddedDocuments('Item', [{ name: listem[r].name, type:'armure','img':listem[r].img, 'system.description' : listem[r].description, 'system.protection' : listem[r].protection,'system.poids' : listem[r].poids,'system.quantite' : 1, 'system.valeur' : listem[r].valeur}], { renderSheet: false }) 
        }
       

    }

    _onSecondary(event){
        let tab=event.target.dataset["tab"];
        this.actor.update({"system.secondary":tab});
    }

}
