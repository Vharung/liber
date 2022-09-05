/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
 export class LiberActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["Liber", "sheet", "actor"],
          width: 1210,
          height: 800,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    get template() {
        console.log(`Liber | Récupération du fichier html ${this.actor.type}-sheet.`);
        return `systems/liber/templates/sheets/${this.actor.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        var poidsactor='';
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);        
        if (this.actor.type == 'personnage' || this.actor.type == 'pnj' || this.actor.type == 'monstre') {
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
        
        // let totalWeight = 0;
        for (let i of sheetData.items) {
          let item = i.items;
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
            li.slideUp(200, () => this.render(false));
        });

        html.find('.item-create').click(ev => {
            event.preventDefault();
            const dataType=$(ev.currentTarget).data('type');
            const name = `New ${dataType.capitalize()}`;
            this.actor.createEmbeddedDocuments('Item', [{ name: name, type: dataType }], { renderSheet: true })
        }); 

        html.find('.item-desc').on('click',function(){
           var hauteur= $(this).parent().parent().css("height");
           if(hauteur=='30px'){
                $(this).parent().parent().css({"height":"auto"});
            }else{
                $(this).parent().parent().css({"height":"30px"});
            }
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

        //generateur
        html.find('.ficheperso').click(this._onGenerator.bind(this));
        /*html.find('.racechoix').click(this._onAvantageRace.bind(this));
        html.find('.clanchoix').click(this._onAvantageRace.bind(this));
        html.find('.namegenerator').click(this._onName.bind(this));
        html.find('.generator').click(this._onStory2.bind(this));
        html.find('.caractergen').click(this._onStory.bind(this));
        html.find('.metierchoix').click(this._onJob.bind(this));*/

        //point restant
        if(this.actor.type=="personnage"){
            var espece=html.find('.raceliste').val();
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
            html.find('.pointrestant').val(reste);
            if(phys<(forc+agil)){
                //alert(game.i18n.localize("liber.alert1"))
                html.find('.forc').css({"background":"red","color": "white"});
                html.find('.agil').css({"background":"red","color": "white"});
            }
            if(soci<(char+saga)){
                //alert(game.i18n.localize("liber.alert2"))
                html.find('.char').css({"background":"red","color": "white"});
                html.find('.saga').css({"background":"red","color": "white"});
            }
            if(ment<(astu+memo)){
                //alert(game.i18n.localize("liber.alert3"))
                html.find('.astu').css({"background":"red","color": "white"});
                html.find('.memo').css({"background":"red","color": "white"});
            }

            //calcul point capacité
            var level = parseInt(html.find('.niveau').val());
            var resultat=35+(level*15);

            //config joueur 
            var clan=html.find('.clanliste').val();
            if(clan==game.i18n.localize("liber.avantrace56") || clan==game.i18n.localize("liber.avantrace58")){
                html.find('.metierliste').css({"display":"none"});
                html.find('.metiertitre').css({"display":"none"});
            }

            if(espece==game.i18n.localize("liber.avantrace60")){
                resultat=resultat-20;
                html.find('.demon').css({"display":"none"})
                html.find('.humain').css({"display":"none"})
                html.find('.drauch').css({"display":"none"})
            }else if(espece==game.i18n.localize("liber.avantrace61") ){
                resultat=resultat+15;
                var cap28=parseInt(html.find('.cpt28').val());
                if(cap28<5){
                    html.find('.cpt28').val(5);
                }
                html.find('.demon').css({"display":"none"})
                html.find('.dragon').css({"display":"none"})
                html.find('.drauch').css({"display":"none"})
                html.find('.vharung').css({"display":"none"})
                html.find('.vaudou').css({"display":"none"})
            }else if(espece==game.i18n.localize("liber.avantrace62")){
                resultat=resultat+10;
                html.find('.dragon').css({"display":"none"})
                html.find('.humain').css({"display":"none"})
                html.find('.drauch').css({"display":"none"})
            }else if(espece==game.i18n.localize("liber.avantrace63")){
                html.find('.demon').css({"display":"none"})
                html.find('.dragon').css({"display":"none"})
                html.find('.corbeau').css({"display":"none"})
                html.find('.humain').css({"display":"none"})
                html.find('.vharung').css({"display":"none"})
                html.find('.cercle').css({"display":"none"})
            }else if(espece==game.i18n.localize("liber.avantrace64")){
                resultat=resultat-40;
                html.find('.demon').css({"display":"none"})
                html.find('.dragon').css({"display":"none"})
                html.find('.corbeau').css({"display":"none"})
                html.find('.humain').css({"display":"none"})
                html.find('.drauch').css({"display":"none"})
                html.find('.autre').css({"display":"none"})
                html.find('.aucun').css({"display":"none"}) 
                html.find('.vharung').css({"display":"none"})
                html.find('.cercle').css({"display":"none"})
                html.find('.vaudou').css({"display":"none"})
                html.find('.runes').css({"display":"none"})
            }else if(espece==game.i18n.localize("liber.avantrace65")){
                resultat=resultat+15;
                var cap28=parseInt(html.find('.cpt28').val());
                if(cap28<5){
                    html.find('.cpt28').val(5);
                }
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
            var corbeau=this.actor.system.clan;
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
            
            if(hpmax<PVmin && this.actor.type=="personnage" && hpmax!=0){
               html.find('.hpmax').val(PVmin);
            }
            if(psymax<PSYmin && this.actor.type=="personnage" && psymax!=0 && corbeau !=game.i18n.localize("liber.avantrace56")){
               html.find('.psymax').val(PSYmin);
            }
            var pointxp=(level-1)*3;
            var calcultotxp=hpmax-PVmin+psymax-PSYmin;
            if(calcultotxp>pointxp && this.actor.type=="personnage" ){
                //alert(game.i18n.localize("liber.alert"));
                html.find('.psy').css({"background":"red","color": "white"});
                html.find('.psymax').css({"background":"red","color": "white"});
                html.find('.hp').css({"background":"red","color": "white"});
                html.find('.hpmax').css({"background":"red","color": "white"});
            }
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
        html.find('.item-lancer').click(this._onSpell.bind(this));
        html.find('.item-info').click(this._onInfo.bind(this));

        //Se reposer
        html.find('.reposer').click(this._onSleep.bind(this));

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
        html.find('.offensif').click(this._onPosture.bind(this));
        html.find('.defensif').click(this._onPosture.bind(this));
        html.find('.focus').click(this._onPosture.bind(this));
        html.find('.aucune').click(this._onPosture.bind(this));
        html.find('.chnget').click(this._onCouv.bind(this));


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
        html.find('.desequi').click('click',function(){
            var equipe=$(this).attr('data-equip');
            var race=html.find('.race').val();
            var maing=html.find('.maingaucequi').val();
            var maind=html.find('.maindroiequi').val();
            var protection=html.find('.armurequi').val();
            if(equipe=="dgauche"){
                html.find('.maingaucequi').val('');
                html.find('.degatg').val('');
                maing='';
            }else if(equipe=="ddroite"){
                html.find('.maindroiequi').val('');
                html.find('.degatd').val('');
                maind='';
            }else if(equipe=="darmure"){
                html.find('.armurequi').val('');
                protection='';
            }
            
            var armure = 0;
            if(race==game.i18n.localize("liber.avantrace60")){
                armure = 2;
            }

            
            if(maind=="Bouclier"){armure=armure+1;}
            else if(maind=="Grand Bouclier"){armure=armure+2;} 

            if(maing=="Bouclier"){armure=armure+1;}
            else if(maing=="Grand Bouclier"){armure=armure+2;}

            if(protection=="Bouclier"){armure=armure+1;} 
            else if(protection=="Cuir souple"){armure=armure+1;}
            else if(protection=="Grand Bouclier"){armure=armure+2;} 
            else if(protection=="Cuir rigide"){armure=armure+2;} 
            else if(protection=="Cote de maille"){armure=armure+3;}
            else if(protection=="Armure de plaques"){armure=armure+4;}     
            console.log(armure)
            html.find('.armureperso').val(armure);
        });
        html.find('.maindroite').click(this._onArmor.bind(this));
        html.find('.maingauche').click(this._onArmor.bind(this));
        html.find('.armor').click(this._onArmor.bind(this));
        html.find('.attribut').click(this._onAttr.bind(this));
        html.find('.resetbonus').click(this._onRestAttr.bind(this));
        html.find('.resetmalus').click(this._onRestAttr.bind(this));

        //Jet de des
        html.find('.jetdedes').click(this._onRoll.bind(this)); 
        html.find('.jetdedegat').click(this._onRoll2.bind(this));

        

        //monstre level up
        if(this.actor.type=="monstre"){
            html.find('.levelup').click(this._onLevelUp.bind(this)); 
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

    //lancer de dés
    _onRoll(event){
        let monJetDeDes = event.target.dataset["dice"];
        let maxstat = event.target.dataset["attdice"];
        let bonus =this.actor.system.bonus;
        let malus =this.actor.system.malus;
        let posture =this.actor.system.posture;
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

        const texte = '<span style="flex:auto"><p class="resultatp">Jet de ' + name + " : " + inforesult +'/100</p>'+succes+'</span>'
        //+'<button class="jetdedegat" type="text" data-name="Arme" data-dice="1d6">Arme</button>';
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: texte
        });
    }

    _onRoll2(event){
        let monJetDeDes = event.target.dataset["dice"];
        const name = event.target.dataset["name"];
        var img=event.target.dataset["img"];
        var desc=event.target.dataset["desc"];
        if(desc==""){
            var info='';
        }else {
            var info='</span><span class="desctchat" style="display:block;">'+desc+'</span>';
        }
        let r = new Roll(monJetDeDes);
        var roll=r.evaluate({"async": false});
        const texte = '<span style="flex:auto"><p class="resultatp"><img src="'+img+'"  width="24" height="24"/>&nbsp;Utilise ' + name + '<p>'+info;
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: texte
        });
    }

    _onSpell(event){
        let mental =this.actor.system.mental;
        let bonus =this.actor.system.bonus;
        let malus =this.actor.system.malus;
        let posture =this.actor.system.posture;
        var cout=event.target.dataset["cout"];
        var name=event.target.dataset["name"];
        var desc=event.target.dataset["desc"];
        var img=event.target.dataset["img"];
        var psy=this.actor.system.psy.value;
        var hp=this.actor.system.hp.value;
        var insoin=this.actor.system.insoin;
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
            console.log('sort lancer :'+psy+'<'+cout)
            var diff= parseInt(cout)-parseInt(psy)
            hp=parseInt(hp)-parseInt(diff);
            psy=0;
            insoin= parseInt(insoin)+parseInt(diff);            
        }else {
            console.log('sort lancer :'+psy+'-'+cout)
            psy = parseInt(psy)-parseInt(cout)
        }
        this.actor.update({"system.insoin": insoin,"system.hp.value": hp,"system.psy.value": psy});
        const texte = '<span style="flex:auto"><p class="infosort"><span class="resultatp" style="cursor:pointer"><img src="'+img+'"  width="24" height="24"/>&nbsp;' + name  +' : '+ inforesult +'/100</span><span class="desctchat">'+desc+'</span></p>'+succes+'</span>';
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),//bug
            flavor: texte
        });
    }

    _onInfo(event){
        var name=event.target.dataset["name"];
        var desc=event.target.dataset["desc"];
        var img=event.target.dataset["img"];
        var cout=event.target.dataset["cout"];
        var type=event.target.dataset["type"];
        if(type=="sort"){
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

    _onSleep(event){//A verifier
        let heure =this.actor.system.heure;
        let jourliste =this.actor.system.jour;
        let typerepos =this.actor.system.repos;
        let level =this.actor.system.level;
        var psy=this.actor.system.psy.value;
        var psymax=this.actor.system.psy.max;
        var hp=this.actor.system.hp.value;
        var hpmax=this.actor.system.hp.max;
        var insoin=this.actor.system.insoin;
        var d=0;var hpadd=0;var psyadd=0;var j=0
        if(jourliste==game.i18n.localize("liber.jour")){
            heure=parseInt(heure)*24;
            j=Math.floor(parseInt(heure)/3)
        }
        if(typerepos==game.i18n.localize("liber.rapide")){
            d=Math. round(Math.random() * 4);
            hpadd=((d+parseInt(level))*parseInt(heure))*j/8;
            psyadd=Math.floor((parseInt(level)*parseInt(heure))/2);
        }else if(typerepos==game.i18n.localize("liber.calme")){
            d=Math. round(Math.random() * 6);
            hpadd=((d+parseInt(level))*parseInt(heure))*j/8;
            psyadd=Math.floor(parseInt(level)*parseInt(heure));
        }else if(typerepos==game.i18n.localize("liber.calme2")){
            d=Math. round(Math.random() * 6);insoin=0;
            hpadd=(d+parseInt(level))*parseInt(heure);
            psyadd=Math.floor(parseInt(level)*parseInt(heure));
        }else if(typerepos==game.i18n.localize("liber.intensif")){
            d=Math. round(Math.random() * 8);insoin=0;
            hpadd=((2*d)+parseInt(level))*parseInt(heure);
            psyadd=Math.floor(parseInt(level)*parseInt(heure));
        }    
        var diff=parseInt(hpmax)-parseInt(hp);
        if(hpadd>diff){
            hpadd=diff;
        }
        hp=parseInt(hpadd)+parseInt(hp)
        if(hp>hpmax){
            hp=hpmax;
        }
        var diff=parseInt(psymax)-parseInt(psy);
        if(psyadd>diff){
            psyadd=diff;
        }
        psy=parseInt(psy)+parseInt(psyadd);
        if(psy>psymax){
            psy=psymax;
        }
        if(hpmax==hp && insoin>0){
            hp=parseInt(hpmax)-parseInt(insoin);
            hpadd=parseInt(hpadd)-parseInt(insoin);console.log(hpadd)
        }
        this.actor.update({"system.insoin": insoin});
        this.actor.update({"system.hp.value": hp});
        this.actor.update({"system.psy.value": psy});

        
        let texte ='<span style="flex:auto"><p class="resultatp">'+game.i18n.localize("liber.repos") +' '+ typerepos+' +'+hpadd+'hp'+' / +'+psyadd+'psy </p></span>';
        let chatData = {
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: texte
        };
        ChatMessage.create(chatData, {});
    }

    _onPosture(event){
        var postures=event.target.dataset["post"];
        var texte = '';
        if(postures=="Focus"){
            texte = '<span style="flex:auto"><p class="resultatp">'+ game.i18n.localize("liber.lang88")+'</p></span>';
        }else if(postures=="Offensif"){
            texte = '<span style="flex:auto"><p class="resultatp">'+ game.i18n.localize("liber.lang86")+'</p></span>';           
        }else if(postures=="Défensif"){
            texte = '<span style="flex:auto"><p class="resultatp">'+ game.i18n.localize("liber.lang87")+'</p></span>';
        }else{
            texte = '<span style="flex:auto"><p class="resultatp">'+ game.i18n.localize("liber.lang89")+'</p></span>';
        }
        let chatData = {
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: texte
        };
        ChatMessage.create(chatData, {});
        this.actor.update({"system.posture": postures});
    }
    _onGenerator(event){

        console.log('generator')
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
        if(race==game.i18n.localize("liber.avantrace60")){
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
        }else {
            if(sexe=="Female"){
                var name="Janes Dow";
            }else{
                var name="John Dow";
            }
        }

        //race
        if(race==game.i18n.localize("liber.avantrace60")){
            if(armureperso<2){
                armureperso=2; 
            }
            cpt27=-10;avantagerace=game.i18n.localize("liber.avantrace1");
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
        }else if(race==game.i18n.localize("liber.avantrace64")){
             cpt28=5;
            avantagerace=game.i18n.localize("liber.avantrace6");
        }else if(race==game.i18n.localize("liber.avantrace65")){
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
            hp=22;psy= 10;phy=65;forc=40;agil=20;soc=50;saga=25;char=25;men=65;astu=25;memo=40;cpt12=cpt12+5;cpt7=cpt7+5;cpt20=cpt20+10;cpt34=cpt34+5;cpt23=cpt23+10;
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
        
        console.log(hp)
        //update
        this.actor.update({'name': name,'system.histoire': textgen,'system.bonusrace': avantagerace,'system.protection' : armureperso,'system.hp.max': hp,'system.hp.value': hp,'system.psy.max': psy,'system.psy.value': psy,'system.physique':phy,'system.force':forc,'system.agilite':agil,'system.social':soc,'system.sagacite':saga,'system.charisme':char,'system.mental':men,'system.ast':astu,'system.memoire':memo,'system.caracteristique.acrobatie':cpt0,'system.caracteristique.agilites':cpt1,'system.caracteristique.alchimie':cpt2,'system.caracteristique.apprentissage':cpt3,'system.caracteristique.hast':cpt4,'system.caracteristique.cc':cpt5,'system.caracteristique.lancer':cpt6,'system.caracteristique.melee':cpt7,'system.caracteristique.tir':cpt8,'system.caracteristique.art':cpt9,'system.caracteristique.assassinat':cpt10,'system.caracteristique.baton':cpt11,'system.caracteristique.bouclier':cpt12,'system.caracteristique.bricolage':cpt13,'system.caracteristique.presence':cpt14,'system.caracteristique.chercher':cpt15,'system.caracteristique.commander':cpt16,'system.caracteristique.concentration':cpt17,'system.caracteristique.nature':cpt18,'system.caracteristique.peuples':cpt19,'system.caracteristique.religions':cpt20,'system.caracteristique.geographique':cpt21,'system.caracteristique.rue':cpt22,'system.caracteristique.heretiques':cpt23,'system.caracteristique.combat':cpt24,'system.caracteristique.commerce':cpt25,'system.caracteristique.crochetage':cpt26,'system.caracteristique.discretion':cpt27,'system.caracteristique.dexterite':cpt28,'system.caracteristique.detection':cpt29,'system.caracteristique.dissimulation':cpt30,'system.caracteristique.dressage':cpt31,'system.caracteristique.ennemi':cpt32,'system.caracteristique.equilibre':cpt33,'system.caracteristique.equitation':cpt34,'system.caracteristique.escroquerie':cpt35,'system.caracteristique.esquiver':cpt36,'system.caracteristique.puissance':cpt37,'system.caracteristique.astuce':cpt38,'system.caracteristique.peur':cpt39,'system.caracteristique.joueur':cpt40,'system.caracteristique.maitrise':cpt41,'system.caracteristique.natation':cpt42,'system.caracteristique.navigation':cpt43,'system.caracteristique.orientation':cpt44,'system.caracteristique.persuasion':cpt45,'system.caracteristique.pister':cpt46,'system.caracteristique.prophetie':cpt47,'system.caracteristique.secours':cpt48,'system.caracteristique.resistance':cpt49,'system.caracteristique.psychologue':cpt50,'system.caracteristique.medecine':cpt51,'system.caracteristique.survie':cpt52,'system.caracteristique.tueur':cpt53,'system.caracteristique.objet':cpt54,'system.caracteristique.veterinaire':cpt55,'system.caracteristique.vigilance':cpt56,'system.caracteristique.vise':cpt57,'system.caractere.residence': resident,'system.caractere.sang': sang,'system.caractere.politique': politique,'system.caractere.interets': groupe,'system.caractere.deces': dc,'system.caractere.moral': moral,'system.caractere.amour': amour,'system.caractere.amitie': ami,'system.caractere.haine': haine,'system.caractere.principale': metier1,'system.caractere.secondaire': metier2,'system.caractere.passion': metier3,'system.caractere.caract': caractere,'system.caractere.personnalite': personnalite,'system.caractere.perception': vision,'system.caractere.objectif': objectif,'system.caractere.rancunier': racune,'system.caractere.tare': tare,'system.caractere.obsession': obsession,'system.caractere.distingue': distingue});
    }
    


    _onArmor(event){
        var equipe=event.target.dataset["equip"];
        var protection= this.actor.system.protection;
        var armor= this.actor.system.armure;
        var maind= this.actor.system.armed;
        var maing= this.actor.system.armeg;
        var img= event.target.dataset["img"];
        var des= event.target.dataset["des"];
        var race = this.actor.system.race;
        var objetaequipe=event.target.dataset["name"];
        var degat=event.target.dataset["degat"];
        if(equipe=="droite"||equipe=="gauche"){
            var listedemain =['Rapière','Bâton','Espadon','Hallebarde','Fléaux d\'arme','Epée à deux main','Masse d\'arme','Hache de bataille','Faux de Guerre','Lance Lourde']//lang
            for (var i = listedemain.length - 1; i >= 0; i--) {
                if(objetaequipe==listedemain[i] || maind == listedemain[i]){
                    this.actor.update({'system.armed': '','system.degatd': '','system.armeg': '','system.degatg': ''});
                }
            }
            if(equipe=="droite"){
                this.actor.update({'system.armed': objetaequipe,'system.degatd': degat,'system.imgd': img,'system.desd': des});
                maind=objetaequipe;
            }else if(equipe=="gauche"){
                this.actor.update({'system.armeg': objetaequipe,'system.degatg': degat,'system.imgg': img,'system.desg': des});
                maing=objetaequipe;
            }
        }else if(equipe=="armure"){
            this.actor.update({'system.armure': objetaequipe});
            armor=objetaequipe;
        } 

        var armure = 0;
        if(race==game.i18n.localize("liber.avantrace60")){
            armure = 2;
        }
        if(maind=="Bouclier"){armure=armure+1;}
        else if(maind=="Grand Bouclier"){armure=armure+2;} 
        if(maing=="Bouclier"){armure=armure+1;}
        else if(maing=="Grand Bouclier"){armure=armure+2;}
        if(armor=="Bouclier"){armure=armure+1;} 
        else if(armor=="Cuir souple"){armure=armure+1;}
        else if(armor=="Grand Bouclier"){armure=armure+2;} 
        else if(armor=="Cuir rigide"){armure=armure+2;} 
        else if(armor=="Cote de maille"){armure=armure+3;}
        else if(armor=="Armure de plaques"){armure=armure+4;}     
        this.actor.update({'system.protection': armure}); 
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
        var dgt = itemData[0].data.system.degat;
        itemData[0].DegatLvl();

        this.actor.update({'system.hp.max': pv,'system.hp.value': pv,'system.psy.max': ps,'system.psy.value': ps,'system.protection': ar,'system.level': lvl});

    }

    _onCouv(event){
        var etats=['a','b','c','d','e','f','g','h','i','j','k','l','m','n'];
        var chnget=event.target.dataset["etat"];console.log('etats'+etats[chnget])
        var et=etats[chnget];
        if(et=='a'){
            var etat=this.actor.system.etat.a;
            if(etat==1){
                this.actor.update({"system.etat.a":0.5});    
            }else {
                this.actor.update({"system.etat.a":1});      
            }
        }else if(et=='b'){
            var etat=this.actor.system.etat.b;
            if(etat==1){
                this.actor.update({"system.etat.b":0.5});    
            }else {
                this.actor.update({"system.etat.b":1});      
            }
        }else if(et=='c'){
            var etat=this.actor.system.etat.c;
            if(etat==1){
                this.actor.update({"system.etat.c":0.5});    
            }else {
                this.actor.update({"system.etat.c":1});      
            }
        }else if(et=='d'){
            var etat=this.actor.system.etat.d;
            if(etat==1){
                this.actor.update({"system.etat.d":0.5});    
            }else {
                this.actor.update({"system.etat.d":1});      
            }
        }else if(et=='e'){
            var etat=this.actor.system.etat.e;
            if(etat==1){
                this.actor.update({"system.etat.e":0.5});    
            }else {
                this.actor.update({"system.etat.e":1});      
            }
        }else if(et=='f'){
            var etat=this.actor.system.etat.f;
            if(etat==1){
                this.actor.update({"system.etat.f":0.5});    
            }else {
                this.actor.update({"system.etat.f":1});      
            }
        }else if(et=='g'){
            var etat=this.actor.system.etat.g;
            if(etat==1){
                this.actor.update({"system.etat.g":0.5});    
            }else {
                this.actor.update({"system.etat.g":1});      
            }
        }else if(et=='h'){
            var etat=this.actor.system.etat.h;
            if(etat==1){
                this.actor.update({"system.etat.h":0.5});    
            }else {
                this.actor.update({"system.etat.h":1});      
            }
        }else if(et=='i'){
            var etat=this.actor.system.etat.i;
            if(etat==1){
                this.actor.update({"system.etat.i":0.5});    
            }else {
                this.actor.update({"system.etat.i":1});      
            }
        }else if(et=='j'){
            var etat=this.actor.system.etat.j;
            if(etat==1){
                this.actor.update({"system.etat.j":0.5});    
            }else {
                this.actor.update({"system.etat.j":1});      
            }
        }else if(et=='k'){
            var etat=this.actor.system.etat.k;
            if(etat==1){
                this.actor.update({"system.etat.k":0.5});    
            }else {
                this.actor.update({"system.etat.k":1});      
            }
        }else if(et=='l'){
            var etat=this.actor.system.etat.l;
            if(etat==1){
                this.actor.update({"system.etat.l":0.5});    
            }else {
                this.actor.update({"system.etat.l":1});      
            }
        }else if(et=='m'){
            var etat=this.actor.system.etat.m;
            if(etat==1){
                this.actor.update({"system.etat.m":0.5});    
            }else {
                this.actor.update({"system.etat.m":1});      
            }
        }else if(et=='n'){
            var etat=this.actor.system.etat.n;
            if(etat==1){
                this.actor.update({"system.etat.n":0.5});    
            }else {
                this.actor.update({"system.etat.n":1});      
            }
        }
    }

    _onAttr(event){
        var val=event.target.dataset["val"];
        this.actor.update({"system.bonus":val}); 
    }

    _onRestAttr(event){
        var name=event.target.dataset["name"];
        console.log(name)
        if(name=="malus"){
            this.actor.update({"system.malus":0});
        }else if(name=="bonus"){
            this.actor.update({"system.bonus":0});  
        }   
    }
}
