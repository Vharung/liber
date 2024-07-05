/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Items}
 */
 export class LiberItemSheet extends ItemSheet{
    get template(){
        console.log(`Liber | Récupération du fichier html ${this.item.type}-sheet.`);
        
        //let typ=TYPES.Item[this.item.type] //corrige
        return `systems/liber/templates/sheets/${this.item.type}-sheet.hbs`;// voir en anglais
        //return `systems/liber/templates/sheets/${typ}-sheet.html`;
    }

    async getData() {
        const context = super.getData();
        context.dtypes = ["String", "Number", "Boolean"];
        context.listValues = {
                monstres:{}        
        };
        if (this.item.type === "outil") {

            context.listValues.monstres = await this._onAidemonstre();
        }

        console.log(context);
        return context;
    }

    activateListeners(html){
        super.activateListeners(html);
        html.find('.generer2').click(this._onGenerator2.bind(this));
        html.find('.tresorg').click(this._onGenerator.bind(this));
        html.find('.m_add').click(this._onAddactor.bind(this));
        if(this.item.type==game.i18n.localize("TYPES.Item.outil")){
            //Mettre a jour en fonction du select
            html.find('select').change(this._chargeMonster.bind(this));
            
            //récupération des info sur les joueurs
            let pv=html.find('.j_pv').val();
            let nb=html.find('.j_nb').val();
            
            //recupération des info sur les monstres
            for(let j=0;j<10;j++){
                /*let nb=html.find('.m'+j+' .m_nb').val();
                let ids=html.find('.m'+j+' .m_name option:selected').val();
                let lvl=html.find('.m'+j+' .m_lvl').val();
                let dg=html.find('.m'+j+' .m_degat').val();
                let hp=html.find('.m'+j+' .m_pv').val();
                let ar=html.find('.m'+j+' .m_ar').val();*/
                let ids = this.item.system.monstres[`monstre${j}`].m_id;
                let hp = this.item.system.monstres[`monstre${j}`].m_hp;
                let dg = this.item.system.monstres[`monstre${j}`].m_dg;
                let ar = this.item.system.monstres[`monstre${j}`].m_ar;
                let lvl = this.item.system.monstres[`monstre${j}`].m_level;
                console.log(ids)
                console.log(hp)
                console.log(dg)
                console.log(ar)
                console.log(lvl)

                let dgt=0;
                //degat en fonction du level
                hp=parseInt(hp)+(3*(lvl-1));

                //armure
                if(ar==undefined||ar==""){ar=0;}
                ar=parseInt(ar)+(lvl-1);
                if(ar>8){ar=8;} 

                //Degat en fonction du niveau
                for (let i=1; i < lvl; i++) {
                    let dgt=dg;
                    let fixe = dgt.split('+');
                    let des=fixe[0].split('d');
                    let number=fixe[1];
                    let nb=des[0];
                    let type=des[1];
                    if(number==undefined||number==""){number=0;}
                    let limite=4;
                    if(number<limite){number++;}
                    else {
                        number=3;
                        if(nb<limite){nb++;}
                        else{
                          nb=3;
                          if(type==4){
                            type=6
                          }else if(type==6){
                            type=8
                          }else if(type==8){
                            type=10
                          }else if(type==10){
                            type=12
                          }else if(type==12){
                            type=20
                          }else if(type==20){
                            type=100
                          }else if(type==100){
                            if(nb<limite){
                              nb++;
                            }
                          }
                        }
                        
                    }
                }
                
                //calcul dg moyen
                if(dg!=0){
                    let dgm=dg.split('+');
                    if(dgm[1]==undefined){dgm[1]=0}
                    let dgm2=dgm[0].split('d');
                    dgt=parseInt(dgm2[0])*(parseInt(dgm2[1])/2)+parseInt(dgm[1])
                }  
                html.find('.m'+j+' .m_pv').val(hp);
                html.find('.m'+j+' .m_degat').val(dgt);
                html.find('.m'+j+' .m_ar').val(ar);   
                html.find('.m'+j+' .m_id').val(ids);           
            }

            //Récupération des données
            let list_nb=[];
            let list_dg=[];
            let list_pv=[];
            let list_ar=[]
            html.find( "li .m_nb" ).each(function() {
                let valor= parseInt($( this ).val());
                list_nb.push(valor);
            });
            html.find( "li .m_degat" ).each(function() {
                let valor= parseInt($( this ).val());
                list_dg.push(valor);

            });
            html.find( "li .m_pv" ).each(function() {
                let valor= parseInt($( this ).val());
                list_pv.push(valor);
            });
            html.find( "li .m_ar" ).each(function() {
                let valor= parseInt($( this ).val());
                list_ar.push(valor);

            });

            //calcul de defaite
            let dpt=0;
            for (var i = list_dg.length - 1; i >= 0; i--) {
                if(list_dg[i]>0){
                    
                    let d=list_dg[i]-3;
                    if(d<1){d=1}
                    dpt=dpt+(d*list_nb[i]);
                }
                
            }
            let defaite=Math.round(pv/(dpt/nb)); //tour pour la defaite

            //cacul de réussite
            let tpvm=0;
            for (var i = list_dg.length - 1; i >= 0; i--) {
                tpvm=tpvm+((list_pv[i]+list_ar[i])*list_nb[i]);
            }
            let dgj=nb*5;
            let reussite=Math.ceil(tpvm/dgj) //tour de reussite

            //calcul difficulte
            let difficulty=reussite-defaite;
            console.log(difficulty)
            let niveau='';
            let css='';
            if(difficulty > 25){
                niveau=game.i18n.localize("liber.easy0");css='#000000';
            }else if(difficulty > 15){
                niveau=game.i18n.localize("liber.easy1");css='#8B0000';
            }else if(difficulty > 5){
                niveau=game.i18n.localize("liber.easy2");css='#FF0000';
            }else if(difficulty > -5){
                niveau=game.i18n.localize("liber.easy3");css='#FFA500';
            }else if(difficulty > -15){
                niveau=game.i18n.localize("liber.easy4");css='#FFFF00';
            }else {
                niveau=game.i18n.localize("liber.easy5");css='#00FF00';
            }
            html.find('.difficulty').val(niveau);
            html.find('.difficulty').css({"background":css,'color':'white'})
 
        }      
    }

    _onGenerator2(event){//a tester
        let type=this.document.type;
        let arme = ['liber.arme9','liber.arme10','liber.arme11','liber.arme12','liber.arme13','liber.arme14','liber.arme15','liber.arme16','liber.arme17','liber.arme18','liber.arme19','liber.arme20','liber.arme0','liber.arme21','liber.arme4','liber.arme22','liber.arme1','liber.arme3','liber.arme23','liber.arme5','liber.arme24','liber.arme8','liber.arme25','liber.arme26','liber.arme27','liber.arme28','liber.arme29','liber.arme30','liber.arme31','liber.arme32','liber.arme33']
        let armure = ['liber.armure1', 'liber.armure2', 'liber.armure3', 'liber.armure4', 'liber.armure5', 'liber.armure6', 'liber.armure7', 'liber.armure8', 'liber.armure9', 'liber.armure10', 'liber.armure11'];
        let objet = ['liber.objet1', 'liber.objet2', 'liber.objet3', 'liber.objet4', 'liber.objet5', 'liber.objet6', 'liber.objet7', 'liber.objet8'];
        let nom = ['liber.nom1', 'liber.nom2', 'liber.nom3', 'liber.nom4', 'liber.nom5', 'liber.nom6', 'liber.nom7', 'liber.nom8', 'liber.nom9', 'liber.nom10', 'liber.nom11', 'liber.nom12', 'liber.nom13', 'liber.nom14', 'liber.nom15', 'liber.nom16', 'liber.nom17', 'liber.nom18', 'liber.nom19', 'liber.nom20'];
        let effetarmure = ['liber.effetarmure1', 'liber.effetarmure2', 'liber.effetarmure3', 'liber.effetarmure4', 'liber.effetarmure5', 'liber.effetarmure6', 'liber.effetarmure7', 'liber.effetarmure8', 'liber.effetarmure9', 'liber.effetarmure10', 'liber.effetarmure11', 'liber.effetarmure12', 'liber.effetarmure13', 'liber.effetarmure14', 'liber.effetarmure15', 'liber.effetarmure16', 'liber.effetarmure17', 'liber.effetarmure18', 'liber.effetarmure19'];
        let effetarme = ['liber.effetarme1', 'liber.effetarme2', 'liber.effetarme3', 'liber.effetarme4', 'liber.effetarme5', 'liber.effetarme6', 'liber.effetarme7', 'liber.effetarme8', 'liber.effetarme9', 'liber.effetarme10', 'liber.effetarme11', 'liber.effetarme12', 'liber.effetarme13', 'liber.effetarme14', 'liber.effetarme15'];
        let effetobjet = ['liber.effetobjet1', 'liber.effetobjet2', 'liber.effetobjet3', 'liber.effetobjet4', 'liber.effetobjet5', 'liber.effetobjet6', 'liber.effetobjet7', 'liber.effetobjet8', 'liber.effetobjet9', 'liber.effetobjet10', 'liber.effetobjet11', 'liber.effetobjet12', 'liber.effetobjet13', 'liber.effetobjet14'];
        let item_type=''
        if(type==game.i18n.localize("TYPES.Item.objet")){
            item_type= game.i18n.localize(objet[Math.floor(Math.random()*objet.length)]);
        }else if(type==game.i18n.localize("TYPES.Item.arme")){
            item_type= game.i18n.localize(arme[Math.floor(Math.random()*arme.length)]);
        }else if(type==game.i18n.localize("TYPES.Item.armure")){
            item_type= game.i18n.localize(armure[Math.floor(Math.random()*armure.length)]);
        }
        let point=0;
        let item_nom= game.i18n.localize(nom[Math.floor(Math.random()*nom.length)]);
        if(item_nom == game.i18n.localize("liber.nom20")) {point = point + 1;}
        if(item_nom == game.i18n.localize("liber.nom14") || item_nom == game.i18n.localize("liber.nom15") || item_nom == game.i18n.localize("liber.nom16")) {point = point - 2;}
        if(item_nom == game.i18n.localize("liber.nom4") || item_nom == game.i18n.localize("liber.nom5") || item_nom == game.i18n.localize("liber.nom6")) {point = point - 1;}
        if(item_nom == game.i18n.localize("liber.nom10")) {point = 0;} 

        let restriction = ""; 
        let item_effet = '';

        if(point > 2) {
            restriction = game.i18n.localize("liber.typerestriction");
        } else if(point < 0) {
            point = 0;
        }

        if(type==game.i18n.localize("TYPES.Item.arme")) {
            item_effet = game.i18n.localize(effetarme[Math.floor(Math.random() * effetarme.length)]);
        } else if(type==game.i18n.localize("TYPES.Item.armure")) {
            item_effet = game.i18n.localize(effetarmure[Math.floor(Math.random() * effetarmure.length)]);
            item_effet += " - " + game.i18n.localize("liber.typeprotection") + point + " " + game.i18n.localize("liber.typedarmure") + " " + restriction;
        } else {
            item_effet = game.i18n.localize(effetobjet[Math.floor(Math.random() * effetobjet.length)]);
        }
        let cout=Math.floor(Math.random()*10)*100;
        let poids=Math.floor(Math.random()*10);
        this.document.update({'name':item_type+' '+item_nom,'system.description':item_effet+' '+restriction,'system.valeur':cout,'system.poids':poids})

    }

    async _onGenerator(event){
        let listem=[]
        let listo=[];
        let pack = game.packs.get('liber.objet');
        let tables = await pack.getDocuments();
        $.each( tables, function( key, value ) {
            listem.push({'name':value.name,'img':value.img,'description':value.system.description,'poids':value.system.poids,'valeur':value.system.valeur})
        });
        let qt=Math.floor(Math.random() * 10) + 1;
        let nbobj=Math.floor(Math.random()*9)+1;
        for (var i = nbobj; i >= 0; i--) {
            let r=Math.floor(Math.random()*listem.length)
            listo.push({'name':value.name,'img':value.img,'description':value.system.description,'poids':value.system.poids,'valeur':value.system.valeur})
        }
        pack = game.packs.get('liber.arme');
        tables = await pack.getDocuments();
        $.each( tables, function( key, value ) {
            listem.push({'name':value.name,'img':value.img,'description':value.system.description,'degat':value.system.degats,'poids':value.system.poids,'portee':value.system.portee,'valeur':value.system.valeur})
        });
        let r=Math.floor(Math.random()*listem.length)
        listeo.push({'name':value.name,'img':value.img,'description':value.system.description,'degat':value.system.degats,'poids':value.system.poids,'portee':value.system.portee,'valeur':value.system.valeur})
        
        pack = game.packs.get('liber.armure');
        tables = await pack.getDocuments();
        $.each( tables, function( key, value ) {
            listem.push({'name':value.name,'img':value.img,'description':value.system.description,'protection':value.system.protection,'poids':value.system.poids,'valeur':value.system.valeur})
        });
        r=Math.floor(Math.random()*listem.length)
        listeo.push({'name':value.name,'img':value.img,'description':value.system.description,'protection':value.system.protection,'poids':value.system.poids,'valeur':value.system.valeur})

    }

    async _onAidemonstre(event){
       const pack = game.packs.get('liber.monstre');
        const tables = await pack.getDocuments();
        let listem;
        let idCounter = 1;

        listem = tables.reduce((acc, value) => {
            acc[`id${idCounter++}`] = {
                'name': value.name,
                'id': value.id,
                'img': value.img,
                'hp': value.system.hp.max,
                'dg': value.system.armeuse.degatg,
                'ar': value.system.protection
            };
            return acc;
        }, {});

        // Convertir les entrées de l'objet listem en tableau
        const sortedListem = Object.entries(listem);

        // Trier le tableau en fonction de la propriété name
        sortedListem.sort((a, b) => {
            const nameA = a[1].name.toUpperCase();
            const nameB = b[1].name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        // Convertir le tableau trié en objet
        const sortedListemObject = sortedListem.reduce((acc, [key, value], index) => {
            acc[`id${index + 1}`] = value;
            return acc;
        }, {});
        this.item.update({ 'system.listem': sortedListemObject });
        return sortedListemObject;       
    }

    _chargeMonster(event) {
        let listem = this.item.system.listem;
        let id = $(event.currentTarget).attr('id').slice(1);
        let ids = $(event.currentTarget).val();
        let idf= "";
        let hp = 0;
        let dg = 0;
        let ar = 0;
        let lvl = 1;
        console.log(ids)//retour empty string
        console.log(hp)
        console.log(dg)
        console.log(ar)
        console.log(lvl)
        if(ids) {
            idf= listem[ids].id;
            hp = listem[ids].hp;
            dg = listem[ids].dg;
            ar = listem[ids].ar;
            lvl = 1;
        }
        console.log(ids)
        console.log(hp)
        console.log(dg)
        console.log(ar)
        console.log(lvl)
        let updateData = {};
        updateData[`system.monstres.monstre${id}.m_id`] = idf;
        updateData[`system.monstres.monstre${id}.m_hp`] = hp;
        updateData[`system.monstres.monstre${id}.m_dg`] = dg;
        updateData[`system.monstres.monstre${id}.m_ar`] = ar;
        updateData[`system.monstres.monstre${id}.m_level`] = lvl;
        this.item.update(updateData);
    }

    async _onAddactor(event){
        const nb=event.target.dataset["nb"];
        const id = $('.m'+nb+' .m_id').val();
        const qt = parseInt($('.m'+nb+' .m_nb').val());
        
        const pack = game.packs.get('liber.monstre');
        const tables = await pack.getDocuments();
        
        const listem2 = tables.filter(value =>
            value.id == id
        )
        for (var i = qt; i > 0; i--) {
           let actor = await Actor.create(listem2);
        }        
    }
        
    
}