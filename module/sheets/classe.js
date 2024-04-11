class Caractere {
    constructor(actor) {
        this.actor = actor;
        this.race = actor.system.race;
        this.sexe = actor.system.sexe;
        this.clan = actor.system.clan;
        this.reli = actor.system.religion;
        this.meti = actor.system.metier;
        this.avantageRace = "";
        this.armurePerso = actor.system.protection;

        this.hp = 0; this.psy = 0; this.phy = 0; this.forc = 0; this.agil = 0; this.soc = 0; this.saga = 0; this.char = 0; this.men = 0; this.astu = 0; this.memo = 0;
        this.cpt = new Array(59).fill(0);
    }

    genererNom() {
        let name = "";
        // Génération de nom en fonction de la race
        if (this.race === game.i18n.localize("liber.avantrace60") || this.race === game.i18n.localize("liber.avantrace63") || this.race === game.i18n.localize("liber.avantrace92")) {
            // Génération de nom spécifique
            var list =["","","","dova","pey","nig","key","bod","iroo","lex","blo","roo","daka","zul","zaa","zey","zoo","paa","ral","tur","tey","tel","daco","too","ook","roo","goo","pol","mel","nax","dao","paar","krey","vha","rung","ynon","kryn","bor","fax","soo","jey","aata","aatu","aati","thur","löng","yook","diir","ooko","aka","ack","apa","eaat","yata","uru","moo","bla","reb","pot","taa","rook","creedo","berk","dooit"];
            var pair1=list[Math.floor(Math.random()*list.length)];
            var pair2=list[Math.floor(Math.random()*list.length)];
            var pair3=list[Math.floor(Math.random()*list.length)];
            var pair4=list[Math.floor(Math.random()*list.length)];
            var name=pair1+pair2+" "+pair3+pair4;
        } else if (this.race === game.i18n.localize("liber.avantrace61") || this.race === game.i18n.localize("liber.avantrace65")) {
            // Génération de nom spécifique
            if(sexe=="Female"){
                var list =["Emma","Jade","Louise","Alice","Lina","Chloé","Rose","Léa","Mila","Ambre","Mia","Anna","Julia","Inès","Léna","Juliette","Zoé","Manon","Agathe","Lou","Lola","Camille","Nina","Jeanne","Inaya","Romy","Éva","Romane","Léonie","Iris","Lucie","Luna","Adèle","Sarah","Louna","Charlotte","Margaux","Olivia","Sofia","Charlie","Victoria","Victoire","Nour","Margot","Mya","Giulia","Clémence","Alix","Aya","Clara","Éléna","Capucine","Lana","Lya","Lyna","Lyana","Théa","Léana","Anaïs","Gabrielle","Emy","Yasmine","Mathilde","Maëlys","Alicia","Lilou","Apolline","Roxane","Lise","Assia","Élise","Lily","Maria","Maya","Valentine","Héloïse","Marie","Noémie","Elsa","Lisa","Lila","Alya","Thaïs","Ilyana","Célia","Candice","Livia","Zélie","Salomé","Constance","Soline","Emmy","Maëlle","Éléna","Maryam","Amelia","Joy","Océane","Maïssa","Arya","Alice","Yumi","Lindsey","Mégumi","Elise","Louise","Valérie","Elodie","Adelaide","Stéphanie","Béatrice","Colombe","Eva","Laura","Bathide","Eloise","Françoise","Mylène","Maryline","Armande","Irene","Elvira","Iseult","Marie","Thérese","Jeanne","Genieve","Cunégonde","Charlotte","Aline","Geogette","Mariane","Helene","Elsa","Sonia","Lena"]

            }else {
                var list =["Gabriel","Léo","Raphaël","Arthur","Louis","Lucas","Adam","Jules","Hugo","Maël","Liam","Noah","Paul","Ethan","Tiago","Sacha","Gabin","Nathan","Mohamed","Aaron","Tom","Éden","Théo","Noé","Léon","Martin","Mathis","Nolan","Victor","Timéo","Enzo","Marius","Axel","Antoine","Robin","Isaac","Naël","Amir","Valentin","Rayan","Augustin","Ayden","Clément","Eliott","Samuel","Marceau","Baptiste","Gaspard","Maxence","Yanis","Malo","Ibrahim","Sohan","Maxime","Évan","Nino","Mathéo","Simon","Lyam","Alexandre","Imran","Naïm","Kaïs","Camille","Thomas","Milo","Ismaël","Côme","Owen","Lenny","Soan","Ilyan","Kylian","Noa","Oscar","Ilyes","Léandre","Pablo","Diego","Mathys","Joseph","Ayoub","Youssef","Wassim","Noam","Adem","William","Ali","Basile","Charles","Thiago","Antonin","Logan","Adrien","Marin","Jean","Charly","Esteban","Noham","Elio","André","Richard","Pierre","Paul","Louis","Mickael","Jacques","Mathieu","Damien","Vincent","Stéphane","Etienne","Ronald","Thomas","Bastien","Drake","Georges","Gabriel","Lenny","Eizo","Charles","Hector","Henry","Alex","Tristan","Hugues","Max","Léon","Thibault","Carle","Antoine","Jean","Edouard","Philippe","Nicolas","Gregoire","Guy","Alain","Alphone","Michel","Sébastien","Juste","Justinien","Thirion","Luc"]
            }
            var list2=["Abomond","Aguerel","Albelart","Alberiou","Albilieu","Albillot","Andichanteau","Andiret","Angegnes","Astalart","Aubellevé","Barallevé","Bécharel","Belelli","Bizesseau","Bougailles","Bougairelli","Brichameur","Bronet","Caffazin","Cardaidieu","Castennes","Chabaveron","Chanagnon","Chanton","Clarisseau","Duraleilles","Durallot","Estiechanteau","Estiere","Ginelenet","Ginenteau","Guille","Kerganteau","Larmariou","Larmaze","Lignivès","Limognon","Machellevé","Macheseul","Mairdieu","Massoullon","Pegné","Pelleleilles","Pellelle","Polatillon","Raleilles","Rambullot","Rauges","Ravisseau","Roffignes","Roquellon","Sarragnory","Sarrane","Subliffet","Vassemières","Vellot","Vernire","Crochet","Valone","Parker","Onile","Pasteur","Labrocante","Vincente","Auditoré","Laporte","Blanchart","Giroux","Lesourd","Houillons","Castagné","Delasaintecroix","Macon","Chaumont","Lucent","Hover","Packard","Curie","Lyon","Lallemand","Langlais","Lecure","Macdonald","Dupont","Lafontaine","Boucher","Boureau","Godspeak","Pierre","Solitaire","Beauregard","Charmant","Marechal","Dufour","Leroux","Lemoine","Lombart","Lefourbe","Boulanger","Petit","Blanc","Chevalier","Leroy","Lebrun","Silver","Delarue","Notigame","Forest","Tonneau","Does","Martin","Deschamps","Dupuis","Macalisteur","Leloup","Bouquin","Lafleur","","Dugrenier","Lacroix","Lecomte","Poulain","Dumas"]
            var pair1=list[Math.floor(Math.random()*list.length)];
            var pair2=list2[Math.floor(Math.random()*list2.length)];
            var name=pair1+" "+pair2;
        }else if(this.race==game.i18n.localize("liber.avantthis.race61") || this.race==game.i18n.localize("liber.avantthis.race65")){
            if(sexe=="Female"){
                var list =["Emma","Jade","Louise","Alice","Lina","Chloé","Rose","Léa","Mila","Ambre","Mia","Anna","Julia","Inès","Léna","Juliette","Zoé","Manon","Agathe","Lou","Lola","Camille","Nina","Jeanne","Inaya","Romy","Éva","Romane","Léonie","Iris","Lucie","Luna","Adèle","Sarah","Louna","Charlotte","Margaux","Olivia","Sofia","Charlie","Victoria","Victoire","Nour","Margot","Mya","Giulia","Clémence","Alix","Aya","Clara","Éléna","Capucine","Lana","Lya","Lyna","Lyana","Théa","Léana","Anaïs","Gabrielle","Emy","Yasmine","Mathilde","Maëlys","Alicia","Lilou","Apolline","Roxane","Lise","Assia","Élise","Lily","Maria","Maya","Valentine","Héloïse","Marie","Noémie","Elsa","Lisa","Lila","Alya","Thaïs","Ilyana","Célia","Candice","Livia","Zélie","Salomé","Constance","Soline","Emmy","Maëlle","Éléna","Maryam","Amelia","Joy","Océane","Maïssa","Arya","Alice","Yumi","Lindsey","Mégumi","Elise","Louise","Valérie","Elodie","Adelaide","Stéphanie","Béatrice","Colombe","Eva","Laura","Bathide","Eloise","Françoise","Mylène","Maryline","Armande","Irene","Elvira","Iseult","Marie","Thérese","Jeanne","Genieve","Cunégonde","Charlotte","Aline","Geogette","Mariane","Helene","Elsa","Sonia","Lena"]

            }else {
                var list =["Gabriel","Léo","Raphaël","Arthur","Louis","Lucas","Adam","Jules","Hugo","Maël","Liam","Noah","Paul","Ethan","Tiago","Sacha","Gabin","Nathan","Mohamed","Aaron","Tom","Éden","Théo","Noé","Léon","Martin","Mathis","Nolan","Victor","Timéo","Enzo","Marius","Axel","Antoine","Robin","Isaac","Naël","Amir","Valentin","Rayan","Augustin","Ayden","Clément","Eliott","Samuel","Marceau","Baptiste","Gaspard","Maxence","Yanis","Malo","Ibrahim","Sohan","Maxime","Évan","Nino","Mathéo","Simon","Lyam","Alexandre","Imran","Naïm","Kaïs","Camille","Thomas","Milo","Ismaël","Côme","Owen","Lenny","Soan","Ilyan","Kylian","Noa","Oscar","Ilyes","Léandre","Pablo","Diego","Mathys","Joseph","Ayoub","Youssef","Wassim","Noam","Adem","William","Ali","Basile","Charles","Thiago","Antonin","Logan","Adrien","Marin","Jean","Charly","Esteban","Noham","Elio","André","Richard","Pierre","Paul","Louis","Mickael","Jacques","Mathieu","Damien","Vincent","Stéphane","Etienne","Ronald","Thomas","Bastien","Drake","Georges","Gabriel","Lenny","Eizo","Charles","Hector","Henry","Alex","Tristan","Hugues","Max","Léon","Thibault","Carle","Antoine","Jean","Edouard","Philippe","Nicolas","Gregoire","Guy","Alain","Alphone","Michel","Sébastien","Juste","Justinien","Thirion","Luc"]
            }
            var list2=["Abomond","Aguerel","Albelart","Alberiou","Albilieu","Albillot","Andichanteau","Andiret","Angegnes","Astalart","Aubellevé","Barallevé","Bécharel","Belelli","Bizesseau","Bougailles","Bougairelli","Brichameur","Bronet","Caffazin","Cardaidieu","Castennes","Chabaveron","Chanagnon","Chanton","Clarisseau","Duraleilles","Durallot","Estiechanteau","Estiere","Ginelenet","Ginenteau","Guille","Kerganteau","Larmariou","Larmaze","Lignivès","Limognon","Machellevé","Macheseul","Mairdieu","Massoullon","Pegné","Pelleleilles","Pellelle","Polatillon","Raleilles","Rambullot","Rauges","Ravisseau","Roffignes","Roquellon","Sarragnory","Sarrane","Subliffet","Vassemières","Vellot","Vernire","Crochet","Valone","Parker","Onile","Pasteur","Labrocante","Vincente","Auditoré","Laporte","Blanchart","Giroux","Lesourd","Houillons","Castagné","Delasaintecroix","Macon","Chaumont","Lucent","Hover","Packard","Curie","Lyon","Lallemand","Langlais","Lecure","Macdonald","Dupont","Lafontaine","Boucher","Boureau","Godspeak","Pierre","Solitaire","Beauregard","Charmant","Marechal","Dufour","Leroux","Lemoine","Lombart","Lefourbe","Boulanger","Petit","Blanc","Chevalier","Leroy","Lebrun","Silver","Delarue","Notigame","Forest","Tonneau","Does","Martin","Deschamps","Dupuis","Macalisteur","Leloup","Bouquin","Lafleur","","Dugrenier","Lacroix","Lecomte","Poulain","Dumas"]
            var pair1=list[Math.floor(Math.random()*list.length)];
            var pair2=list2[Math.floor(Math.random()*list2.length)];
            var name=pair1+" "+pair2;
        }else if(this.race==game.i18n.localize("liber.avantthis.race62")){
            var list =["Alastor","Azazel","Appolyon","Asmodée","Astaroth","Abrahel","Botis","Bifrons","Caym","Eligos","Flauros","Gusoyn","Ipos","Lilith","Marbas","Moloch","Malack","Naberius","Paimon","Raum","Samigina","Titivillus","Valefor"]
            var pair1=list[Math.floor(Math.random()*list.length)];
            var name=pair1;
        }else if(this.race==game.i18n.localize("liber.avantthis.race77")){
            var list =["Azog","Bolg","Golfimbul","Grishnákh","Shagrat","Snaga","Gothmog","Gotar","Gor","Galimus","Karl","Rack"]
            if(sexe=="Female"){
                var list2 =["la brute","la dure","la séduisante","la puissante","la sournoise","la forte","la brute","","la sanguinaire"]

            }else {
                var list2 =["le dur","le sourd","le fort","le puissant","le fourbe","le sournois","le rock","le brute","","le sanguinaire"]
            }

            var pair1=list[Math.floor(Math.random()*list.length)];
            var pair2=list2[Math.floor(Math.random()*list2.length)];
            var name=pair1+" "+pair2;
        }else if(this.race==game.i18n.localize("liber.avantthis.race10a") || this.race==game.i18n.localize("liber.avantthis.race66") || this.race==game.i18n.localize("liber.avantthis.race67") || this.race==game.i18n.localize("liber.avantthis.race68")){
            if(sexe=="Female"){
                var list =["Aerin","Aglari","Amandil","Amarië","Anardil : amie du soleil","Arafinwë : royale","Arachné","Aranwë","Arcadia","Ardamírë","Aredhel","Ardamir : Joyaux du monde","Argadil :","Ariarhen","Arminas","Artaher : noble dame","Artanis : noble femme","Arwen","Ashana","Astal : la vaillante","Athelleen : guerrière des flammes","Baliena","Barmahir","Belwen","Brindal","Caliawen : la lumineuse","Carafinwë : L’habile","Castamir : joyaux","Celebrían : reine d’argent","Celeanar : soleil d’argent","Circë : magicienne","Ciryandil : amie des navires","Dairiun","Danica","Danywen","Daenara","Dhaunare","Dralsa","Diningal","Eärendil : amie de la mer","Earwen : jeune fille de la mer","Eilinel","Elendë : ami des elfes/des étoiles","Elemmacil : étoile épée","Elbereth : étoile-reine","Eledhwen : au teint d’elfe","Elemire : étoile joyaux","Elwë : à la robe grise","Enetari : étoile-reine","Elenwë","Elentir : qui scrute les étoile","Elessar : pierre elfique","Elerinna : couronnée d’étoiles","Elwing (pluie d’étoiles)","Emeldiz","Endaria","Estë : repos","Eänwen : jeune fille de la mer","Eldalótë : fleur elfique","Eönwë","Eressëa : la solitaire","Estrid : la mystique","Falathar : esprit du feu","Fëanturi : maîtresse des esprits","Fíriel : femme mortelle","Finduilas","Galadriel","Galata","Galdor","Glingal : la flamme suspendue","Glóredhel","Gilestel : étoile de l’espoir","Gilgalad : étoile rayonnante","Glorfindel : tête d’or","Heldaria","Idril","Ilmarë","Indis","Irwaen","Imarune","Isil : la lune","Itarillë : petite étincelle","Izilbêth","Kardryar : la puissante","Kementari : reine de la terre","Lalwendë : jeune fille rieuse","Lalaith : rire","Laurelin : le chant d’or","Limstella","Linaewen : lac des oiseaux","Lindorië","Luinil : étoile à la lumière bleue","Lúthien","Macalaure : qui forge l’or","Mahal","Maeglin : œil vif","Manîthil : esprit de lune","Melian","Míriel","Mormegil : l’épée noire","Morwën : noire forêt","Nandil : Reine du lac","Nennvial : lac du crépuscule","Nerdanel","Nessa","Nerwen","Nenwende : fille masculine","Nienor/Nior (deuil)","Níniel : fille aux larmes","Ninquelotë : fleur blanche","Ñolofinwë : sagesse","Númendil : amie de l’ouest","Oilossë : neige toujours blanche","Oromë : musicienne","Olórin","Olwë","Ondolindë : chant de pierre","Qorwyn : la maléfique","Rathlóriel : lit d’or","Rían","Rúmil : la savante","Serindë : la brodeuse","Silana","Siltiama : colère de feu","Sirthaal : ce qui est caché","Thuringwethil : femme secrète","Tintallë : la lumière","Tinúviel : fille du Crépuscule","Unyen","Vairë : la tisseuse","Valandil","Vàna","Varda : la très haute","Virani : reine","Volanarë : celle qui devine","Voronwë : l’inébranlable","Wilwarin : le papillon","Wondrel","Yarayn","Yavana : dispensatrice des fruits","Ylengil","Yndreth","Yndris"]

            }else {
                var list =["Adanedhel : homme-elfe","Adûnakhôr : seigneur de l’Ouest","Aeglos : pointe de Neige","Aegnor : feu cruel","Aerandir vagabond des mers","Argawaen taché de sang","Aldaron seigneur des arbres","Anario : soleil","Arcadio","Aranrùth : la colère du roi","Ancalagon","Anfauglith : poussière d’agonie","Atanatar : pére des hommes","Astaldo : le vaillant","Aulendil : ami d’aulë","Aulendur : serviteur","Balan","Baragund","Belegund","Bëor","Boromir : Joyau Loyal","Bregolas","Bronweg","Bruithwir","Calimehtar : guérrier de lumière","Calimmacil : épée de lumière","Calion : le lumineux","Calywen","Carcharoth : les mâchoires sanglantes","Castamir : joyaux","Celeborn : arbre d’argent","Ciryaher : seigneur des navires","Ciryandil : ami des navires","Ciryatan : constructeur de navire","Círyon","Círdan : le bâtisseur","Cirth : les runes","Cuthalion : arc de fer","Daeron","Dagnir : le tourmenteur","Deldúwath : horreur des Ombres de la Nuit","Denethor","Dimrost : les marches de la pluie","Dovahkiin : enfant des dragons","Duinhir : Seigneur de la rivière","Eärendur : serviteur de la mer","Eldacar : heaume","Eldarion :","Elendur : serviteur des étoiles","Elendil : ami des elfes/ étoiles","Elrond : voûte étoilée","Elros (écume d’étoile)","Eöl","Erchamion : le manchot","Falastur : seigneur des côtes","Fantur : maitre","Faramir : Joyau Suffisant","Fëanor[o] : l’esprit du feu","Felagund : seigneur des cavernes","Finwë","Fírimar : mortels","Gondolin : le roc caché","Gorthol : heaume de terreur","Gundor","Gurthang : le fer de la mort","Gwindor","Helevorn : verre noir","Herendil : ami de la fortune","Herumor : seigneur noir","Herunúmes : seigneur de l’ouest","Hyamendacil : vainqueur du sud","Imlach","Ingwë","Irmo","Isil : éclat argenté","Isildur","Lastalaica : celui qui écoute","Legolas : vertes feuilles","Lenwë","Lómelindi : chanteur de crépuscule","Lómion : fils du crépuscule","Lorgan","Lórindol : tête d’or","Maedhros","Mahtan","Mardil : ami du roi","Maglor","Magor","Meneldil","Narmacil : épée de feu","Nandor : ceux qui font demi-tour","Nómin : le sage","Ohtar : guerrier","Ostoher : seigneur de la citadelle","Radagast","Radhruin","Ragnor","Rána : le voyageur","Palantir : qui regarde au loin et partout","Pelendul : serviteur de la cité","Rauros : grondement d’écume","Rorhirrim : prince à cheval","Rómendacil : vainqueur de l’est","Russandol : tête de cuivre","Saeros","Salmar","Saruman : homme habile","Sauron : le détesté","Seregon : sang de pierre","Silmarien","Siriondil : ami de sirion","Sindar : manteau gris","Súlimo : celui qui respire","Tarannon : don royal","Targen","Terendul : grand ténébreux","Turindo : maitre de son coeur","Tauron : seigneur des forêts","Turucàno : seigneur et maitre","Tyeplerinquar : poigne d’argent","Telchar","Telemnar","Teleri : les derniers","Thalion : inébranlable fort","Thalos","Thorondor : Roi des aigles","Tilion","Tulkas : le plus grand pour la force et la vaillance","Turambar : maître du destin","Uldor","Ulmo : celui qui aime la pluie","Ulwarth","Umarth : mauvais sort","Urthel","Urulóki : serpent de feu","Valar : les puissants","Valacar : Heaume de puissance","Valaraukar : démons de la terreur","Vanyar : blond","Vása : le dévoreur","Vorondil : ami véritable"]
            }
            var pair1=list[Math.floor(Math.random()*list.length)];
            var name=pair1;
        }else if(this.race==game.i18n.localize("liber.avantthis.race69")){
            var list=["Bodruith","Fangluin l’Ancien","Naugladur","Telchar","Anar","Balin","Bifur","Bofur","Bombur","Borin","Burin","Dáin","Dís","Dori","Durin","Dwalin","Farin","Fíli","Fimbulfambi","Flói","Frár","Frerin","Frór","Fundin","Gandalf","Gimli","Glóin","Grór","Hannar","Kíli","Lofar","Lóni","Mîm","Náin","Náli","Nar","Nár","Narfi","Narvi","Nori","Oi","Óin","Ori","Thorin","Thráin","Thrór","Thrym","Azaghâl","Gamil","Zirak","Ibun","Khîm"]
            var pair1=list[Math.floor(Math.random()*list.length)];
            var name=pair1;
        }else if(this.race==game.i18n.localize("liber.avantthis.race76")){
            var list=["Akasha","Alucard","Alucard","Angel","Armand","Baron","Tarquin","Bloodscream","Dio","Claudia","Comtesse","Michael","Alice","Carlisle","Edward","Emmett","Esmée","Darla","David","Walter","Dracula","Dracula","Drusilla","Frankenpen","Deacon","Gabrielle","Grand","Jasper","Rosalie","Jane","Jessica","Jubilé","Kain","Harmony","Khayman","Hannibal","Lestat","Louis","MaelLe","Marceline","Marius","MonaMorbius","Nicolas","NosferatuLa","Pandora","Katherine","Raziel","Rüdiger","Damon","Stefan","Selene","Soma","Spike","Bella","Theodora","Vampi","Vampirella","Seras","Victoria","Lucy","Zara la vampire"]
            var pair1=list[Math.floor(Math.random()*list.length)];
            var name=pair1;
        }else if(this.race==game.i18n.localize("liber.avantthis.race77a")){
            if(sexe=="Female"){
                var list =['Ariel','Azrael','Cassiel','Gabriel','Haniel','Jophiel','Metatron','Michael','Raguel','Raphael','Raziel','Sachiel','Samael','Sandalphon','Uriel','Zadkiel','Chamuel','Jeremiel','Barachiel','Phanuel']

            }else {
                var list =['Gabriel','Raphael','Uriel','Ariel','Azrael','Metatron','Chamuel','Zadkiel','Jophiel','Haniel','Raziel','Sariel','Barachiel','Cassiel','Sachiel','Raguel','Remiel','Jeremiel','Phanuel']
            }
            var pair1=list[Math.floor(Math.random()*list.length)];
            var name=pair1;
        }else {
            var list=["Aegnor","Aerandir","Ainaros","Amarië","Amdír","Amras","Amrod","Amroth","Anairë","Angrod","Annael","Aranel","Aranwë","Aredhel","Argon","Arminas","Arwen","Auredhir","Ausir","Beleg","Bronweg","Bruithwir","Caranthir","Celeborn ","Celebrían","Celebrimbor","Celebrindal","Celegorm","Círdan","Curufin","Curufinwë","Cúthalion","Daeron","Daurin","Denethor","Eärendil","Eärwen","Ecthelio","Edrahil","Egalmoth","Egnor","Elemmakil","Elfrith","Elladan et Elrohir","Elu Thingol","Elmo","Elrond","Eltas","Eluchíl","Eluréd","Elurín","Elwë","Elwing","Enel","Enelyë","Enerdhil","Eöl","Ereinion","Erellont","Erestor","Evranin","Evromord","Faelivrin","Falathar","Fëanor","Felagund","Finarfin","Findis","Finduilas","Finrod","Finwë","Galadhon","Galadriel ","Galathil","Galdor","Galion","Galweg","Gelmir","Gereth","Gil-estel","Gilfanon","Gil-galad","Gilmith","Glorfindel","Gwindor","Haldir","Hendor","Heorrenda","Idril","Ilverin","Imin","Iminyë","Indis","Ingil","Inglorion","Ingwë Ingweron","Írimë","Ithilbor","Ivárë","Lalwen","Legolas ","Lenwë","Lindir","Lindo","Lómion","Lúthien","Mablon","Mablung","Maedhros","Maeglin","Maglor","Mahtan","Meleth","Melinir","Meril-i-Turinqi","Míriel","Mithrellas"]
            var pair1=list[Math.floor(Math.random()*list.length)];
            var name=pair1;
        }
        return name;
    }

    attribuerAvantageRace() {
        const race = this.actor.system.race;

        if (race === game.i18n.localize("liber.avantrace60")) {
            if (this.armurePerso < 2) {
                this.armurePerso = 2;
            }
            this.cpt27 = -10;
            this.avantageRace = game.i18n.localize("liber.avantrace1");
        } else if (race === game.i18n.localize("liber.avantrace92")) {
            this.cpt1 = 5;
            this.cpt27 = 5;
            this.avantageRace = game.i18n.localize("liber.avantrace0");
        } else if (race === game.i18n.localize("liber.avantrace61")) {
            this.avantageRace = game.i18n.localize("liber.avantrace2");
            this.cpt28 = 5;
            this.cpt50 = 5;
        } else if (race === game.i18n.localize("liber.avantrace62")) {
            this.avantageRace = game.i18n.localize("liber.avantrace3");
            this.cpt39 = 10;
        } else if (race === game.i18n.localize("liber.avantrace63")) {
            this.avantageRace = game.i18n.localize("liber.avantrace4");
            if (this.armurePerso < 2) {
                this.armurePerso = 2;
            }
        } else if (race === game.i18n.localize("liber.avantrace64")) {
            this.cpt27 = -20;
            this.avantageRace = game.i18n.localize("liber.avantrace5");
        } else if (race === game.i18n.localize("liber.avantrace65")) {
            this.cpt28 = 5;
            this.avantageRace = game.i18n.localize("liber.avantrace6");
        } else if (race === game.i18n.localize("liber.avantrace10a")) {
            this.cpt1 = 5;
            this.cpt3 = 5;
            this.avantageRace = game.i18n.localize("liber.avantrace7");
        } else if (race === game.i18n.localize("liber.avantrace66")) {
            this.cpt1 = 5;
            this.cpt18 = 5;
            this.avantageRace = game.i18n.localize("liber.avantrace8");
        } else if (race === game.i18n.localize("liber.avantrace67")) {
            this.cpt10 = 10;
            this.avantageRace = game.i18n.localize("liber.avantrace9");
        } else if (race === game.i18n.localize("liber.avantrace68")) {
            this.cpt1 = 5;
            this.avantageRace = game.i18n.localize("liber.avantrace10");
        } else if (race === game.i18n.localize("liber.avantrace69")) {
            this.cpt37 = 5;
            this.cpt40 = 5;
            this.avantageRace = game.i18n.localize("liber.avantrace11");
        } else if (race === game.i18n.localize("liber.avantrace70")) {
            this.cpt1 = 5;
            this.cpt27 = 5;
            this.avantageRace = game.i18n.localize("liber.avantrace12");
        } else if (race === game.i18n.localize("liber.avantrace71")) {
            this.cpt46 = 5;
            this.cpt28 = 5;
            this.avantageRace = game.i18n.localize("liber.avantrace13");
        } else if (race === game.i18n.localize("liber.avantrace72")) {
            this.avantageRace = game.i18n.localize("liber.avantrace14");
        } else if (race === game.i18n.localize("liber.avantrace73")) {
            this.cpt18 = 5;
            this.avantageRace = game.i18n.localize("liber.avantrace15");
        } else if (race === game.i18n.localize("liber.avantrace74")) {
            this.avantageRace = game.i18n.localize("liber.avantrace16");
        } else if (race === game.i18n.localize("liber.avantrace75")) {
            this.avantageRace = game.i18n.localize("liber.avantrace17");
        } else if (race === game.i18n.localize("liber.avantrace76")) {
            this.cpt15 = 5;
            this.avantageRace = game.i18n.localize("liber.avantrace18");
        } else if (race === game.i18n.localize("liber.avantrace77")) {
            this.cpt38 = -10;
            this.avantageRace = game.i18n.localize("liber.avantrace19");
        } else if (race === game.i18n.localize("liber.avantrace77a")) {
            this.cpt38 = -10;
            this.avantageRace = game.i18n.localize("liber.avantrace19a");
        } else {
            this.avantageRace = "";
        }
    }

    attribuerAvantageClan() {
        const clan = this.actor.system.clan;
        const reli = this.actor.system.reli;

        if (clan === game.i18n.localize("liber.avantrace40")) {
            this.avantageRace += game.i18n.localize("liber.avantrace20");
        } else if (clan === game.i18n.localize("liber.avantrace41")) {
            this.avantageRace += game.i18n.localize("liber.avantrace21");
        } else if (clan === game.i18n.localize("liber.avantrace42")) {
            this.avantageRace += game.i18n.localize("liber.avantrace22");
        } else if (clan === game.i18n.localize("liber.avantrace43")) {
            this.avantageRace += game.i18n.localize("liber.avantrace23");
        } else if (clan === game.i18n.localize("liber.avantrace44")) {
            this.avantageRace += game.i18n.localize("liber.avantrace24");
        } else if (clan === game.i18n.localize("liber.avantrace45")) {
            this.avantageRace += game.i18n.localize("liber.avantrace25");
        } else if (clan === game.i18n.localize("liber.avantrace46")) {
            this.avantageRace += game.i18n.localize("liber.avantrace26");
        } else if (clan === game.i18n.localize("liber.avantrace47")) {
            this.avantageRace += game.i18n.localize("liber.avantrace27");
        } else if (clan === game.i18n.localize("liber.avantrace48")) {
            this.avantageRace += game.i18n.localize("liber.avantrace28");
        } else if (clan === game.i18n.localize("liber.avantrace49")) {
            this.avantageRace += game.i18n.localize("liber.avantrace29");
        } else if (clan === game.i18n.localize("liber.avantrace50")) {
            this.avantageRace += game.i18n.localize("liber.avantrace30");
        } else if (clan === game.i18n.localize("liber.avantrace51")) {
            this.avantageRace += game.i18n.localize("liber.avantrace31");
        } else if (clan === game.i18n.localize("liber.avantrace52")) {
            this.avantageRace += game.i18n.localize("liber.avantrace32");
        } else if (clan === game.i18n.localize("liber.avantrace53")) {
            this.avantageRace += game.i18n.localize("liber.avantrace33");
        } else if (clan === game.i18n.localize("liber.avantrace54")) {
            this.avantageRace += game.i18n.localize("liber.avantrace34");
        } else if (clan === game.i18n.localize("liber.avantrace55")) {
            this.avantageRace += game.i18n.localize("liber.avantrace35");
        } else if (clan === game.i18n.localize("liber.avantrace56")) {
            this.avantageRace += game.i18n.localize("liber.avantrace36");
        } else if (reli === game.i18n.localize("liber.avantrace82")) {
            this.avantageRace += game.i18n.localize("liber.avantrace36b");
        } else if (reli === game.i18n.localize("liber.avantrace59")) {
            this.avantageRace += game.i18n.localize("liber.avantrace59b");
        }
    }
    attribuerAvantageMetier() {
        const meti = this.actor.system.metier;
        const reli = this.actor.system.reli;
        const clan = this.actor.system.clan;
        const race = this.actor.system.race;

        if(reli==game.i18n.localize("liber.avantrace82")){
            hp=22;psy= 8;phy=65;forc=45;agil=20;soc=40;saga=20;char=20;men=65;astu=25;memo=40;cpt12=cpt12+5;cpt7=cpt7+5;cpt20=cpt20+10;cpt34=cpt34+5;cpt23=cpt23+10;
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
            hp=20;psy= 7;phy=60;forc=15;agil=45;soc=70;saga=40;char=30;men=40;astu=15;memo=25;cpt0=cpt0+15;cpt19=cpt19+10;cpt22=cpt22+5;cpt18=cpt18+5;cpt30=cpt30+5;
        }else if(meti==game.i18n.localize("liber.metier13")){
            hp=13;psy= 18;phy=40;forc=20;agil=20;soc=65;saga=20;char=45;men=65;astu=20;memo=45;cpt3=cpt3+5;cpt11=cpt11+10;cpt50=cpt50+5;
        }else if(meti==game.i18n.localize("liber.metier14")){
            hp=12;psy= 20;phy=35;forc=5;agil=30;soc=65;saga=35;char=30;men=70;astu=30;memo=40;cpt2=cpt2+5;cpt50=cpt50+5;cpt54=cpt54+10;cpt17=cpt17+5;
        }else if(meti==game.i18n.localize("liber.metier15")){
            hp=10;psy= 22;phy=30;forc=5;agil=25;soc=70;saga=40;char=30;men=70;astu=30;memo=40;cpt11=cpt11+5;cpt20=cpt20+10;cpt51=cpt51+10;
        }else if(meti==game.i18n.localize("liber.metier16")){
            hp=8;psy= 25;phy=25;forc=5;agil=20;soc=70;saga=60;char=10;men=75;astu=60;memo=15;cpt15=cpt15+5;cpt47=cpt47+10;cpt50=cpt50+5;
        }else if(meti==game.i18n.localize("liber.metier17")){
            hp=23;psy= 5;phy=70;forc=40;agil=20;soc=50;saga=20;char=30;men=50;astu=35;memo=15;cpt43=cpt43+10;cpt7=cpt7+5;cpt57=cpt57+5;cpt27=cpt27+5;cpt39=cpt39+5;
        }
    }
}
/*
    const personnage = new Personnage({
    system: {
        metier: game.i18n.localize("liber.metier2"),
        reli: game.i18n.localize("liber.avantrace82"),
        clan: game.i18n.localize("liber.avantrace56"),
        race: game.i18n.localize("liber.avantrace61")
    }
});
*/