/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Items}
 */
 export class LiberItemSheet extends ItemSheet{
    get template(){
        console.log(`Liber | Récupération du fichier html ${this.item.type}-sheet.`);
        
        //let typ=TYPES.Item[this.item.type] //corrige
        return `systems/liber/templates/sheets/${this.item.type}-sheet.html`;// voir en anglais
        //return `systems/liber/templates/sheets/${typ}-sheet.html`;
    }

    async getData() {
        const context = super.getData();
        context.dtypes = ["String", "Number", "Boolean"];
        context.listValues = {
                monstres:{}        
        };
        if (this.item.type === game.i18n.localize("TYPES.Item.outil")) {

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
            let pv=html.find('.j_pv').val();
            let nb=html.find('.j_nb').val();
            
            let monsterInfo = this.object.system.listem;
            console.log(monsterInfo)
            for(let j=0;j<10;j++){
                let ids=html.find('.m'+j+' .m_name option:selected').val();
                 // Utilisation de l'identifiant pour obtenir les informations du monstre .monstres[ids];
                //let name = monsterInfo.name;
                let img=html.find('.m'+j+' .m_name option:selected').data('img');
                let hp=html.find('.m'+j+' .m_name option:selected').data('hp');
                let dg=html.find('.m'+j+' .m_name option:selected').data('dg');
                let ar=html.find('.m'+j+' .m_name option:selected').data('ar');
                let id=html.find('.m'+j+' .m_name option:selected').data('id');
                let lvl=html.find('.m'+j+' input.m_lvl').val();
console.log("ids:", ids);
console.log("name:", name);
console.log("img:", img);
console.log("hp:", hp);
console.log("dg:", dg);
console.log("ar:", ar);
console.log("id:", id);
console.log("lvl:", lvl);
                let dgt=0;
                //degat en fonction du level
                hp=parseInt(hp)+(3*(lvl-1));

                //armure
                if(ar==undefined||ar==""){ar=0;}
                ar=ar+(lvl-1);
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
                /*if(dg!=0){
                    let dgm=dg.split('+');
                    if(dgm[1]==undefined){dgm[1]=0}
                    let dgm2=dgm[0].split('d');
                    dgt=parseInt(dgm2[0])*(parseInt(dgm2[1])/2)+parseInt(dgm[1])
                }  
                html.find('.m'+j+' .m_pv').val(hp);
                html.find('.m'+j+' .m_degat').val(dgt);
                html.find('.m'+j+' .m_ar').val(ar);   
                html.find('.m'+j+' .m_id').val(id); */          
            }

            /*//Récupération des données
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
 */
        }      
    }

    _onGenerator2(event){//Fr
        let type=this.document.type;
        let arme = ['liber.arme9','liber.arme10','liber.arme11','liber.arme12','liber.arme13','liber.arme14','liber.arme15','liber.arme16','liber.arme17','liber.arme18','liber.arme19','liber.arme20','liber.arme0','liber.arme21','liber.arme4','liber.arme22','liber.arme1','liber.arme3','liber.arme23','liber.arme5','liber.arme24','liber.arme8','liber.arme25','liber.arme26','liber.arme27','liber.arme28','liber.arme29','liber.arme30','liber.arme31','liber.arme32','liber.arme33']
        let armure =["Tenue","Pantalon","Cuirasse","Epaulette","Plastron","Armet","Casque","Chapeau","Armure","Epaulière","Brassard"]
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