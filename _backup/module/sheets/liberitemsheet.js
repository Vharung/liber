/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Items}
 */
 export class LiberItemSheet extends ItemSheet{
    get template(){
        console.log(`Liber | Récupération du fichier html ${this.item.type}-sheet.`);
        if(this.item.type=='outil'){
            this._onAidemonstre();
        }
        return `systems/liber/templates/sheets/${this.item.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);
        return data;
    }

    activateListeners(html){
        super.activateListeners(html);
        html.find('.generer2').click(this._onGenerator2.bind(this));
        html.find('.tresorg').click(this._onGenerator.bind(this));
        html.find('.m_add').click(this._onAddactor.bind(this));

        if(this.item.type=="outil"){
            let pv=html.find('.j_pv').val();
            let nb=html.find('.j_nb').val();
            for(let j=0;j<10;j++){
                let name=html.find('.m'+j+' .m_name option:selected').val();
                let img=html.find('.m'+j+' .m_name option:selected').data('img');
                let hp=html.find('.m'+j+' .m_name option:selected').data('hp');
                let dg=html.find('.m'+j+' .m_name option:selected').data('dg');
                let ar=html.find('.m'+j+' .m_name option:selected').data('ar');
                let id=html.find('.m'+j+' .m_name option:selected').data('id');
                let lvl=html.find('.m'+j+' input.m_lvl').val();
                
                let dgt=0;
                /*degat en fonction du level*/
                hp=parseInt(hp)+(3*(lvl-1));

                /* armure*/
                if(ar==undefined||ar==""){ar=0;}
                ar=ar+(lvl-1);
                if(ar>8){ar=8;} 

                /*Degat en fonction du niveau*/
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
                    dg=nb+'d'+type+'+'+number;
                }
                
                /*calcul dg moyen*/
                if(dg!=0){
                    let dgm=dg.split('+');
                    if(dgm[1]==undefined){dgm[1]=0}
                    let dgm2=dgm[0].split('d');
                    dgt=parseInt(dgm2[0])*(parseInt(dgm2[1])/2)+parseInt(dgm[1])
                }  
                html.find('.m'+j+' .m_pv').val(hp);
                html.find('.m'+j+' .m_degat').val(dgt);
                html.find('.m'+j+' .m_ar').val(ar);   
                html.find('.m'+j+' .m_id').val(id);            
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

            /*calcul de defaite*/
            let dpt=0;
            for (var i = list_dg.length - 1; i >= 0; i--) {
                if(list_dg[i]>0){
                    
                    let d=list_dg[i]-3;
                    if(d<1){d=1}
                    dpt=dpt+(d*list_nb[i]);
                }
                
            }
            let defaite=Math.round(pv/(dpt/nb)); //tour pour la defaite

            /*cacul de réussite*/
            let tpvm=0;
            for (var i = list_dg.length - 1; i >= 0; i--) {
                tpvm=tpvm+((list_pv[i]+list_ar[i])*list_nb[i]);
            }
            let dgj=nb*5;
            let reussite=Math.ceil(tpvm/dgj) //tour de reussite

            /*calcul difficulte*/
            let difficulty=reussite-defaite;

            let niveau='';
            let css='';
            if(difficulty > 25){
                niveau='Très difficile';css='#000000';
            }else if(difficulty > 15){
                niveau='Difficile';css='#8B0000';
            }else if(difficulty > 5){
                niveau='Dur';css='#FF0000';
            }else if(difficulty > -5){
                niveau='Moyen';css='#FFA500';
            }else if(difficulty > -15){
                niveau='Facile';css='#FFFF00';
            }else {
                niveau='Très facile';css='#00FF00';
            }
            html.find('.difficulty').val(niveau);
            html.find('.difficulty').css({"background":css,'color':'white'})

        }
        
    }

    _onGenerator2(event){
        let type=this.document.type;
        let arme = ["Dague","poignard","Masse d'arme","Hachette","Javelot","Lance courte","Épée courte","Épée","Sabre","Gourdin","Rapière","Espadon","Hache de bataille","Hallebarde","Baton","Masse lourde","Fléaux d'armes","Lance lourde","Épée à deux main","Faux de guerre","Fronde","Javelot","Arbalète de poing","Arbalète","Arc","Arc long","Épée courte"]
        let armure =["Bouclier","Bouclier rond (vicking)","Grand bouclier","Tenue","Gantelet de protection","Pantalon","Cuirasse","Epaulette","Plastron","Armet","Casque","Chapeau","Armure","Epaulière","Brassard"]
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
        const tabl = await pack.getDocuments();
        const listm = tabl.map(value => ({
            'id':value.id,
            'name': value.name,
            'img': value.img,
            'hp': value.system.hp.max,
            'dg': value.system.armeuse.degatg,
            'ar': value.system.protection
        }));
        listm.sort(function (a, b) {if (a.name < b.name) {return -1;} else {return 1;}});
        this.item.update({'system.listem':listm})
        
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