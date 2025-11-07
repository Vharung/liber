export const Model = {};

Model.Metiers = {
  "personnalise": {"ability": {  "physique": 10,  "force": 5,  "agilite": 5,  "social": 10,  "charisme": 5,  "sagacite": 5,  "mental": 10,  "astuce": 5,  "memoire": 5},"hpmax": 0,"psymax": 0,"nb": 0,"cout": 0,
  "competences": {}},
  "guerrier": {"ability": {  "physique": 75,  "force": 65,  "agilite": 10,  "social": 40,  "charisme": 30,  "sagacite": 10,  "mental": 55,  "astuce": 10,  "memoire": 45},"hpmax": 40,"psymax": 0,"nb": 4,"cout": 1,
  "competences": {  "observation": 5,  "combat": 5}},
  "chevalier": {"ability": {  "physique": 70,  "force": 55,  "agilite": 15,  "social": 50,  "charisme": 40,  "sagacite": 10,  "mental": 50,  "astuce": 20,  "memoire": 30},"hpmax": 28,"psymax": 8,"nb": 6,"cout": 3,
  "competences": {  "connaissances": 5,  "melee": 5}},
  "croise": {"ability": {  "physique": 70,  "force": 50,  "agilite": 20,  "social": 40,  "charisme": 20,  "sagacite": 20,  "mental": 60,  "astuce": 30,  "memoire": 30},"hpmax": 25,"psymax": 10,"nb": 5,"cout": 3,
  "competences": {  "endurance": 5,  "hast": 5}},
  "soldat": {"ability": {  "physique": 70,  "force": 60,  "agilite": 10,  "social": 45,  "charisme": 20,  "sagacite": 25,  "mental": 55,  "astuce": 35,  "memoire": 20},"hpmax": 29,"psymax": 8,"nb": 5,"cout": 3,
  "competences": {  "survie": 5,  "tir": 5}},
  "mercenaire": {"ability": {  "physique": 65,  "force": 45,  "agilite": 20,  "social": 55,  "charisme": 15,  "sagacite": 40,  "mental": 50,  "astuce": 30,  "memoire": 20},"hpmax": 27,"psymax": 8,"nb": 6,"cout": 3,
  "competences": {  "discretion": 5,  "cc": 5}},
  "pirate": {"ability": {  "physique": 65,  "force": 40,  "agilite": 25,  "social": 50,  "charisme": 20,  "sagacite": 30,  "mental": 55,  "astuce": 40,  "memoire": 15},"hpmax": 27,"psymax": 8,"nb": 7,"cout": 3,
  "competences": {  "tromperie": 10,  "visee": 5}},
  "chasseurdeprime": {"ability": {  "physique": 65,  "force": 40,  "agilite": 25,  "social": 45,  "charisme": 20,  "sagacite": 25,  "mental": 60,  "astuce": 30,  "memoire": 30},"hpmax": 28,"psymax": 9,"nb": 3,"cout": 5,
  "competences": {  "negociation": 10,  "melee": 5}},
  "assassinvoleur": {"ability": {  "physique": 60,  "force": 20,  "agilite": 40,  "social": 45,  "charisme": 15,  "sagacite": 30,  "mental": 65,  "astuce": 35,  "memoire": 30},"hpmax": 25,"psymax": 11,"nb": 5,"cout": 4,
  "competences": {  "assassinat": 5,  "alchimie": 5, "tromperie":10}},
  "inquisiteur": {"ability": {  "physique": 50,  "force": 25,  "agilite": 25,  "social": 50,  "charisme": 30,  "sagacite": 20,  "mental": 70,  "astuce": 30,  "memoire": 40},"hpmax": 20,"psymax": 14,"nb": 5,"cout": 5,
  "competences": {  "connaissances": 5,  "charisme": 5}},
  "druide": {"ability": {  "physique": 50,  "force": 20,  "agilite": 30,  "social": 50,  "charisme": 10,  "sagacite": 40,  "mental": 70,  "astuce": 25,  "memoire": 45},"hpmax": 20,"psymax": 14,"nb": 5,"cout": 5,
  "competences": {  "equitation": 10,  "survie": 5,"medecine":5}},
  "clerc": {"ability": {  "physique": 50,  "force": 15,  "agilite": 35,  "social": 50,  "charisme": 20,  "sagacite": 30,  "mental": 70,  "astuce": 20,  "memoire": 50},"hpmax": 21,"psymax": 14,"nb": 6,"cout": 5,
  "competences": {  "medecine": 10,"erudition":5}},
  "troubadour": {"ability": {  "physique": 45,  "force": 15,  "agilite": 30,  "social": 70,  "charisme": 40,  "sagacite": 30,  "mental": 55,  "astuce": 25,  "memoire": 30},"hpmax": 18,"psymax": 14,"nb": 7,"cout": 5,
  "competences": {  "mobilite": 10,  "negociation": 5}},
  "erudit": {"ability": {  "physique": 40,  "force": 10,  "agilite": 30,  "social": 60,  "charisme": 30,  "sagacite": 30,  "mental": 70,  "astuce": 20,  "memoire": 50},"hpmax": 13,"psymax": 18,"nb": 8,"cout": 5,
  "competences": {  "connaissances": 5,  "erudition": 5}},
  "magicien": {"ability": {  "physique": 40,  "force": 15,  "agilite": 25,  "social": 60,  "charisme": 40,  "sagacite": 20,  "mental": 70,  "astuce": 30,  "memoire": 40},"hpmax": 13,"psymax": 20,"nb": 6,"cout": 6,
  "competences": {  "erudition": 5,  "alchimie": 5,  "objet": 5}},
  "oracle": {"ability": {  "physique": 25,  "force": 10,  "agilite": 15,  "social": 75,  "charisme": 30,  "sagacite": 45,  "mental": 70,  "astuce": 25,  "memoire": 45},"hpmax": 8,"psymax": 28,"nb": 8,"cout": 8,
  "competences": {  "prophetie": 10,"negociation":5,"medecine": 5,  "objet": 5}}
}

/*mentales:"",connaissances:"",erudition:"",observation:"",alchimie:"",prophetie:"",
        physiques:"",mobilite:"",discretion:"",dexterite:"",survie:"",endurance:"",force:"",equitation:"",
        sociales:"",charisme:"",negociation:"",tromperie:"",
        techniques:"",medecine:"",objet:"",assassinat:"",bouclier:"",tueur:"",
        combats:"",combat:"",hast:"",cc:"",lancer:"",melee:"",tir:"",visee:""*/

Model.race={//v3
    "dragon":{
            "discretion":-5,"negociation":5,"ajoutpoint":-5,"armor":2
    },
    "humain":{
        "charisme":5,"dexterite":5,"ajoutpoint":25
    },
    "semihumain":{
        "charisme":5,"ajoutpoint":15
    },
    "demon":{
        "tromperie":5,"survie":10,"ajoutpoint":25
    },
    "drauch":{
        "armor":2,"tromperie":5,"ajoutpoint":5,"armor":2
    },
    "kobolt":{
        "agilites":5,"discretion":5,"ajoutpoint":10
    },
    "rocailleux":{
        "ajoutpoint":0
    },
    "elfe":{
        "mobilite":5,"charisme":5,"ajoutpoint":25
    },
    "elfesylvain":{
        "mobilite":5,"tir":5,"ajoutpoint":25
    },
    "elfenoir":{
        "mobilite":5,"cc":5,"ajoutpoint":25
    },
    "elfedesang": {
        "mobilite":5,"force":5,"ajoutpoint":25
    },
    "nain":{
        "force":5,"dexterite":5,"ajoutpoint":25
    },
    "hommechat":{
        "observation":5,"discretion":5,"tromperie":5,"ajoutpoint":25
    },
    "hommechien":{
        "observation":10,"negociation":5,"ajoutpoint":25
    },
    "hommearbre":{
        "connaissances":10,"ajoutpoint":20
    },
    "hommerat":{
        "negociation":-5,"ajoutpoint":-5
    },
    "hommeoiseau":{
        "negociation":5,"ajoutpoint":5
    },
    "etredepsy":{
        "ajoutpoint":0
    },
    "vampire":{
        "discretion":10,"tromperie":5,"assassinat":10,"ajoutpoint":45
    },
    "gobelin":{
        "mobilite":10,"tromperie":5,"ajoutpoint":25
    },
    "orc":{
        "force":10,"discretion":-5,"connaissances":-5,"ajoutpoint":10
    },
    "celeste":{
        "ajoutpoint":0
    },
    "centaure":{
        "ajoutpoint":0
    },
    "autre":{
        "ajoutpoint":0
    }
}

Model.multiplicateurs = {
  "connaissances":2,"erudition":3,"observation":2,"alchimie":1,"prophetie":1,"mobilite":2,"discretion":2,
  "dexterite":2,"survie":2,"endurance":2,"force":3,"equitation":1,"charisme":3,"negociation":1,"tromperie":1,
  "medecine":1,"objet":1,"combat":3,"hast":3,"cc":3,"lancer":3,"melee":3,"tir":3,"visee":3,
  "assassinat":2,"bouclier":2,"tueur":1
};

Model.hero= [
  "Liber.Character.Histoire.Hero.Guerrier",
  "Liber.Character.Histoire.Hero.Magicienne",
  "Liber.Character.Histoire.Hero.Voleur",
  "Liber.Character.Histoire.Hero.Pretresse"
]
Model.mentor= [
  "Liber.Character.Histoire.Mentor.VieuxSage",
  "Liber.Character.Histoire.Mentor.EpritMystique",
  "Liber.Character.Histoire.Mentor.DieuDeguise",
  "Liber.Character.Histoire.Mentor.AncienChevalier"
]
Model.enemy= [
  "Liber.Character.Histoire.Ennemi.RoiTyrannique",
  "Liber.Character.Histoire.Ennemi.DragonAncestral",
  "Liber.Character.Histoire.Ennemi.DemonCache",
  "Liber.Character.Histoire.Ennemi.SorcierNoir"
]
Model.reward= [
  "Liber.Character.Histoire.Recompense.ArtefactMagique",
  "Liber.Character.Histoire.Recompense.ConnaissanceOubliee",
  "Liber.Character.Histoire.Recompense.PierrePouvoir",
  "Liber.Character.Histoire.Recompense.SceptreDivin"
]
Model.actionPreparatrice= [
  "Liber.Character.Histoire.ActionPreparatrice.MessageMystere",
  "Liber.Character.Histoire.ActionPreparatrice.VillageEnFlamme",
  "Liber.Character.Histoire.ActionPreparatrice.DisparitionAmi",
  "Liber.Character.Histoire.ActionPreparatrice.VisionTroublante"
]
Model.actionReponse= [
  "Liber.Character.Histoire.ActionReponse.Vengeance",
  "Liber.Character.Histoire.ActionReponse.EnqueteMystere",
  "Liber.Character.Histoire.ActionReponse.SauverQuelquUn",
  "Liber.Character.Histoire.ActionReponse.ComprendrePouvoir"
]

Model.interets= [
    "Liber.Character.Histoire.interet.interet1",
    "Liber.Character.Histoire.interet.interet2",
    "Liber.Character.Histoire.interet.interet3",
    "Liber.Character.Histoire.interet.interet4",
    "Liber.Character.Histoire.interet.interet5",
    "Liber.Character.Histoire.interet.interet6"
]
Model.deces= [
    "Liber.Character.Histoire.deces.deces1",
    "Liber.Character.Histoire.deces.deces2",
    "Liber.Character.Histoire.deces.deces3",
    "Liber.Character.Histoire.deces.deces4",
    "Liber.Character.Histoire.deces.deces5",
    "Liber.Character.Histoire.deces.deces6"
]
Model.amour= [
    "Liber.Character.Histoire.amour.amour1",
    "Liber.Character.Histoire.amour.amour2",
    "Liber.Character.Histoire.amour.amour3",
    "Liber.Character.Histoire.amour.amour4",
    "Liber.Character.Histoire.amour.amour5",
    "Liber.Character.Histoire.amour.amour6"
]
Model.amitie= [
    "Liber.Character.Histoire.amitie.amitie1",
    "Liber.Character.Histoire.amitie.amitie2",
    "Liber.Character.Histoire.amitie.amitie3",
    "Liber.Character.Histoire.amitie.amitie4",
    "Liber.Character.Histoire.amitie.amitie5",
    "Liber.Character.Histoire.amitie.amitie6"
]
Model.haine= [
    "Liber.Character.Histoire.haine.haine1",
    "Liber.Character.Histoire.haine.haine2",
    "Liber.Character.Histoire.haine.haine3",
    "Liber.Character.Histoire.haine.haine4",
    "Liber.Character.Histoire.haine.haine5",
    "Liber.Character.Histoire.haine.haine6"
]
Model.principale= [
    "Liber.Character.Histoire.principale.principale1",
    "Liber.Character.Histoire.principale.principale2",
    "Liber.Character.Histoire.principale.principale3",
    "Liber.Character.Histoire.principale.principale4",
    "Liber.Character.Histoire.principale.principale5",
    "Liber.Character.Histoire.principale.principale6"
]
Model.passion= [
    "Liber.Character.Histoire.passion.passion1",
    "Liber.Character.Histoire.passion.passion2",
    "Liber.Character.Histoire.passion.passion3",
    "Liber.Character.Histoire.passion.passion4",
    "Liber.Character.Histoire.passion.passion5",
    "Liber.Character.Histoire.passion.passion6"
]
Model.personnalite= [
    "Liber.Character.Histoire.personnalite.personnalite1",
    "Liber.Character.Histoire.personnalite.personnalite2",
    "Liber.Character.Histoire.personnalite.personnalite3",
    "Liber.Character.Histoire.personnalite.personnalite4",
    "Liber.Character.Histoire.personnalite.personnalite5",
    "Liber.Character.Histoire.personnalite.personnalite6"
]
Model.perception= [
    "Liber.Character.Histoire.perception.perception1",
    "Liber.Character.Histoire.perception.perception2",
    "Liber.Character.Histoire.perception.perception3",
    "Liber.Character.Histoire.perception.perception4",
    "Liber.Character.Histoire.perception.perception5",
    "Liber.Character.Histoire.perception.perception6"
]
Model.rancunier= [
    "Liber.Character.Histoire.rancunier.rancunier1",
    "Liber.Character.Histoire.rancunier.rancunier2",
    "Liber.Character.Histoire.rancunier.rancunier3",
    "Liber.Character.Histoire.rancunier.rancunier4",
    "Liber.Character.Histoire.rancunier.rancunier5",
    "Liber.Character.Histoire.rancunier.rancunier6"
]
Model.tare = Array.from({ length: 136 }, (_, i) => 
    `Liber.Character.Histoire.tare.tare${i + 1}`
);
Model.distingue= [
    "Liber.Character.Histoire.distingue.distingue1",
    "Liber.Character.Histoire.distingue.distingue2",
    "Liber.Character.Histoire.distingue.distingue3",
    "Liber.Character.Histoire.distingue.distingue4",
    "Liber.Character.Histoire.distingue.distingue5",
    "Liber.Character.Histoire.distingue.distingue6"
]

Model.names ={
    "dragon": ["dova", "pey", "nig", "key", "bod", "iroo", "lex", "blo", "roo", "daka", "zul", "zaa", "zey", "zoo", "paa", "ral", "tur", "tey", "tel", "daco", "too", "ook", "roo", "goo", "pol", "mel", "nax", "dao", "paar", "krey", "vha", "rung", "ynon", "kryn", "bor", "fax", "soo", "jey", "aata", "aatu", "aati", "thur", "löng", "yook", "diir", "ooko", "aka", "ack", "apa", "eaat", "yata", "uru", "moo", "bla", "reb", "pot", "taa", "rook", "creedo", "berk", "dooit"],
    "humain": {
        "female":  ["Emma", "Jade", "Louise", "Alice", "Lina", "Chloé", "Rose", "Léa", "Mila", "Ambre", "Mia", "Anna", "Julia", "Inès", "Léna", "Juliette", "Zoé", "Manon", "Agathe", "Lou", "Lola", "Camille", "Nina", "Jeanne", "Inaya", "Romy", "Éva", "Romane", "Léonie", "Iris", "Lucie", "Luna", "Adèle", "Sarah", "Louna", "Charlotte", "Margaux", "Olivia", "Sofia", "Charlie", "Victoria", "Victoire", "Nour", "Margot", "Mya", "Giulia", "Clémence", "Alix", "Aya", "Clara", "Éléna", "Capucine", "Lana", "Lya", "Lyna", "Lyana", "Théa", "Léana", "Anaïs", "Gabrielle", "Emy", "Yasmine", "Mathilde", "Maëlys", "Alicia", "Lilou", "Apolline", "Roxane", "Lise", "Assia", "Élise", "Lily", "Maria", "Maya", "Valentine", "Héloïse", "Marie", "Noémie", "Elsa", "Lisa", "Lila", "Alya", "Thaïs", "Ilyana", "Célia", "Candice", "Livia", "Zélie", "Salomé", "export constance", "Soline", "Emmy", "Maëlle", "Éléna", "Maryam", "Amelia", "Joy", "Océane", "Maïssa", "Arya", "Alice", "Yumi", "Lindsey", "Mégumi", "Elise", "Louise", "Valérie", "Elodie", "Adelaide", "Stéphanie", "Béatrice", "Colombe", "Eva", "Laura", "Bathide", "Eloise", "Françoise", "Mylène", "Maryline", "Armande", "Irene", "Elvira", "Iseult", "Marie", "Thérese", "Jeanne", "Genieve", "Cunégonde", "Charlotte", "Aline", "Geogette", "Mariane", "Helene", "Elsa", "Sonia", "Lena"],
        "male": ["Gabriel","Léo","Raphaël","Arthur","Louis","Lucas","Adam","Jules","Hugo","Maël","Liam","Noah","Paul","Ethan","Tiago","Sacha","Gabin","Nathan","Mohamed","Aaron","Tom","Éden","Théo","Noé","Léon","Martin","Mathis","Nolan","Victor","Timéo","Enzo","Marius","Axel","Antoine","Robin","Isaac","Naël","Amir","Valentin","Rayan","Augustin","Ayden","Clément","Eliott","Samuel","Marceau","Baptiste","Gaspard","Maxence","Yanis","Malo","Ibrahim","Sohan","Maxime","Évan","Nino","Mathéo","Simon","Lyam","Alexandre","Imran","Naïm","Kaïs","Camille","Thomas","Milo","Ismaël","Côme","Owen","Lenny","Soan","Ilyan","Kylian","Noa","Oscar","Ilyes","Léandre","Pablo","Diego","Mathys","Joseph","Ayoub","Youssef","Wassim","Noam","Adem","William","Ali","Basile","Charles","Thiago","Antonin","Logan","Adrien","Marin","Jean","Charly","Esteban","Noham","Elio","André","Richard","Pierre","Paul","Louis","Mickael","Jacques","Mathieu","Damien","Vincent","Stéphane","Etienne","Ronald","Thomas","Bastien","Drake","Georges","Gabriel","Lenny","Eizo","Charles","Hector","Henry","Alex","Tristan","Hugues","Max","Léon","Thibault","Carle","Antoine","Jean","Edouard","Philippe","Nicolas","Gregoire","Guy","Alain","Alphone","Michel","Sébastien","Juste","Justinien","Thirion","Luc"],
        "famille" :["Abomond","Aguerel","Albelart","Alberiou","Albilieu","Albillot","Andichanteau","Andiret","Angegnes","Astalart","Aubellevé","Barallevé","Bécharel","Belelli","Bizesseau","Bougailles","Bougairelli","Brichameur","Bronet","Caffazin","Cardaidieu","Castennes","Chabaveron","Chanagnon","Chanton","Clarisseau","Duraleilles","Durallot","Estiechanteau","Estiere","Ginelenet","Ginenteau","Guille","Kerganteau","Larmariou","Larmaze","Lignivès","Limognon","Machellevé","Macheseul","Mairdieu","Massoullon","Pegné","Pelleleilles","Pellelle","Polatillon","Raleilles","Rambullot","Rauges","Ravisseau","Roffignes","Roquellon","Sarragnory","Sarrane","Subliffet","Vassemières","Vellot","Vernire","Crochet","Valone","Parker","Onile","Pasteur","Labrocante","Vincente","Auditoré","Laporte","Blanchart","Giroux","Lesourd","Houillons","Castagné","Delasaintecroix","Macon","Chaumont","Lucent","Hover","Packard","Curie","Lyon","Lallemand","Langlais","Lecure","Macdonald","Dupont","Lafontaine","Boucher","Boureau","Godspeak","Pierre","Solitaire","Beauregard","Charmant","Marechal","Dufour","Leroux","Lemoine","Lombart","Lefourbe","Boulanger","Petit","Blanc","Chevalier","Leroy","Lebrun","Silver","Delarue","Notigame","Forest","Tonneau","Does","Martin","Deschamps","Dupuis","Macalisteur","Leloup","Bouquin","Lafleur","","Dugrenier","Lacroix","Lecomte","Poulain","Dumas"]
    },
    "demon": ["Alastor","Azazel","Appolyon","Asmodée","Astaroth","Abrahel","Botis","Bifrons","Caym","Eligos","Flauros","Gusoyn","Ipos","Lilith","Marbas","Moloch","Malack","Naberius","Paimon","Raum","Samigina","Titivillus","Valefor"],
    "drauch": ["Gorthak","Drakhul","Bouldar","Grimforge","Durakar","Thraugrim","Stonewrath","Ironfist","Brimstone","Boulderback","Grimgar","Dreadrock","Krakthar","Boulderbane","Stonemauler"],
    "rocailleux":["Galetar","Terrock","Géodar","Brèche","Montagneux","Granitard","Rocmur","Pierreux","Terran","Silexar","Rocharde","Morain","Carrière","Schisteur","Tuffar"],
    "semihumain":["Thalorien","Elowyn","Aldric","Lysandra","Finnian","Isolde","Eldrin","Seraphina","Caelum","Elara","Darian","Meridia","Aldwyn","Liriel","Cedric"],
    "elfe": {
        "female": ["Aerin","Aglari","Amandil","Amarië","Anardil","Arafinwë","Arachné","Aranwë","Arcadia","Ardamírë","Aredhel","Ardamir","Argadil :","Ariarhen","Arminas","Artaher","Artanis","Arwen","Ashana","Astal",                "Athelleen","Baliena","Barmahir","Belwen","Brindal","Caliawen","Carafinwë","Castamir","Celebrían","Celeanar","Circë","Ciryandil","Dairiun","Danica","Danywen","Daenara","Dhaunare","Dralsa","Diningal","Eärendil","Earwen","Eilinel","Elendë","Elemmacil","Elbereth","Eledhwen","Elemire","Elwë","Enetari","Elenwë","Elentir","Elessar","Elerinna","Elwing","Emeldiz","Endaria","Estë","Eänwen","Eldalótë","Eönwë","Eressëa","Estrid","Falathar","Fëanturi","Fíriel","Finduilas","Galadriel","Galata","Galdor","Glingal","Glóredhel","Gilestel","Gilgalad","Glorfindel","Heldaria","Idril","Ilmarë","Indis","Irwaen","Imarune","Isil","Itarillë","Izilbêth","Kardryar","Kementari","Lalwendë","Lalaith","Laurelin","Limstella","Linaewen","Lindorië","Luinil","Lúthien","Macalaure","Mahal","Maeglin","Manîthil","Melian","Míriel","Mormegil","Morwën","Nandil","Nennvial","Nerdanel","Nessa","Nerwen","Nenwende","Nienor","Níniel","Ninquelotë","Ñolofinwë","Númendil","Oilossë","Oromë","Olórin","Olwë","Ondolindë","Qorwyn","Rathlóriel","Rían","Rúmil","Serindë","Silana","Siltiama","Sirthaal","Thuringwethil","Tintallë","Tinúviel","Unyen","Vairë","Valandil","Vàna","Varda","Virani","Volanarë","Voronwë","Wilwarin","Wondrel","Yarayn","Yavana","Ylengil","Yndreth","Yndris"],
        "male": ["Adanedhel","Adûnakhôr","Aeglos","Aegnor","Aerandir","Argawaen","Aldaron","Anario","Arcadio","Aranrùth","Ancalagon","Anfauglith","Atanatar","Astaldo","Aulendil","Aulendur","Balan","Baragund","Belegund","Bëor","Boromir","Bregolas","Bronweg","Bruithwir","Calimehtar","Calimmacil","Calion","Calywen","Carcharoth","Castamir","Celeborn","Ciryaher","Ciryandil","Ciryatan","Círyon","Círdan","Cirth","Cuthalion","Daeron","Dagnir","Deldúwath","Denethor","Dimrost","Dovahkiin","Duinhir","Eärendur","Eldacar","Eldarion :","Elendur","Elendil","Elrond","Elros","Eöl","Erchamion","Falastur","Fantur","Faramir","Fëanor[o]","Felagund","Finwë","Fírimar","Gondolin","Gorthol","Gundor","Gurthang","Gwindor","Helevorn","Herendil","Herumor","Herunúmes","Hyamendacil","Imlach","Ingwë","Irmo","Isil","Isildur","Lastalaica","Legolas","Lenwë","Lómelindi","Lómion","Lorgan","Lórindol","Maedhros","Mahtan","Mardil","Maglor","Magor","Meneldil","Narmacil","Nandor","Nómin","Ohtar","Ostoher","Radagast","Radhruin","Ragnor","Rána","Palantir","Pelendul","Rauros","Rorhirrim","Rómendacil","Russandol","Saeros","Salmar","Saruman","Sauron","Seregon","Silmarien","Siriondil","Sindar","Súlimo","Tarannon","Targen","Terendul","Turindo","Tauron","Turucàno","Tyeplerinquar","Telchar","Telemnar","Teleri","Thalion","Thalos","Thorondor","Tilion","Tulkas","Turambar","Uldor","Ulmo","Ulwarth","Umarth","Urthel","Urulóki","Valar","Valacar","Valaraukar","Vanyar","Vása","Vorondil"],
        "famille" :["Aeglos","Alata","Amarth","Anárion","Angrod","Aranel","Aranwë","Arda","Ardal","Avari","Belar","Beldir","Belost","Caradhras","Celebrimbor","Cormar","Cúthalion","Daeron","Elanor","Elbereth","Eldacar","Elendil","Elfhelm","Elrohir","Elrond","Elu","Eluchíl","Eärendil","Eöl","Faelivrin","Finarfin","Finrod","Finwë","Galathil","Galadriel","Gil-galad","Gimli","Gwindor","Hador","Haldir","Ilu","Ingwë","Irmo","Isil","Isildur","Ithil","Khamûl","Legolas","Lindon","Lórien","Maedhros","Mandos","Míriel","Nargothrond","Nenya","Noldor","Oromë","Sauron","Sindarin","Telperion","Thranduil","Turgon","Vanyar","Varda"]
    }, 
    "elfesylvain":["Thalassin","Elowyn","Alderan","Lysandra","Sylvain","Elara","Faeril","Celeborn","Aerendil","Linariel","Eldarin","Galadriel","Thranduil","Nymphaea","Faelan"],
    "elfenoir":["Drakendel","Népharys","Sombrael","Nocturna","Umbraël","Obskuris","Nébuloth","Ténébris","Ombredor","Nuitombre","Umbrath","Skathros","Éclipsin","Sombredane","Noctis"],
    "elfedesang":["Thalorien","Liadrin","Kael'thas","Lor'themar","Aethas","Sylvanas","Vereesa","Rommath","Anasterian","Felendren","Lanthalas","Halduron","Aelthalyste","Lyalia","Theron"],
    "nain": ["Bodruith","Fangluin l’Ancien","Naugladur","Telchar","Anar","Balin","Bifur","Bofur","Bombur","Borin","Burin","Dáin","Dís","Dori","Durin","Dwalin","Farin","Fíli","Fimbulfambi","Flói","Frár","Frerin","Frór","Fundin","Gandalf","Gimli","Glóin","Grór","Hannar","Kíli","Lofar","Lóni","Mîm","Náin","Náli","Nar","Nár","Narfi","Narvi","Nori","Oi","Óin","Ori","Thorin","Thráin","Thrór","Thrym","Azaghâl","Gamil","Zirak","Ibun","Khîm"],
    "hommechat":{
        "female":["Griffette", "Féline", "Patounes", "Crocette", "Moustache", "Grisette", "Tigresse", "Veloura", "Panthera", "Sphynxie"],
        "male":["Griffe", "Félin", "Pattes", "Croc", "Moustaches", "Grisou", "Tigre", "Velours", "Panther", "Sphynx"],
        "famille" :["Dendesabre", "Miaulon", "Patedevelour", "Denlongue", "Pelage", "Patte", "Ronron", "Lion", "Gracieux", "Tetefine"]
    },
    "hommechien":{
        "female":["Fangie", "Crocotte", "Patoune", "Truffette", "Oreille", "Rexie", "Loyale", "Fidèle", "Bergera", "Wolfa"],
        "male":["Fang", "Croc", "Patte", "Truffe", "Oreilles", "Rex", "Loyal", "Fidèle", "Berger", "Wolf"],
        "famille" :["Abboy", "Royal", "Rex", "Loyal", "Berger", "Nez", "Wouf", "Cani", "Médor", "Loup"]
    },
    "hommeoiseau":{
        "female":["Plumette", "Ailette", "Bequette", "Griffette", "Corbette", "Merlette", "Aiglette", "Hibouette", "Alouettine", "Piafette"],
        "male":["Plume", "Aile", "Bec", "Griffes", "Corbeau", "Merle", "Aigle", "Hibou", "Alouette", "Piaf"],
        "famille" :["Merle", "Noir", "Colombe", "Tache", "Hibou", "Longaile", "Becjaune", "Chant", "Moineau", "Rougegorge"]
    },
    "hommearbre":{
        "female":["Écorcette", "Branchette", "Feuillet", "Sèveta", "Chênette", "Hêtresse", "Sapinette", "Charmelle", "Acacette", "Cèdrelle"],
        "male":["Écorce", "Branches", "Feuilles", "Sève", "Chêne", "Hêtre", "Sapin", "Charme", "Acacia", "Cèdre"],
        "famille" :["Dur", "Branchu", "Dubois", "Labranche", "Aurore", "Resineux", "Résitant", "Charnu", "Enfleur", "Calme"]
    },
    "hommerat":{
        "female":["Rongeuse", "Queuelette", "Moustachette", "Grise", "Fouinette", "Ratapoulette", "Grisette", "Rongeurette", "Rouillotte", "Fripouillette"],
        "male":["Rongeur", "Queue", "Moustaches", "Gris", "Fouine", "Ratapoil", "Grisou", "Rongeur", "Rouille", "Fripouille"],
        "famille" :["Dentlongue", "Poilu", "Rouille", "Oreillefine", "Fouine", "Rat", "Bleu", "Pattegris", "Rouillard", "Malin"]
    },
    "etredepsy":{
        "female":["Espritine", "Mentalie", "Astralie", "Chamanette", "Sagette", "Méditante", "Fantôme", "Visionna", "Rêveuse", "Alchimie"],
        "male":["Esprit", "Mental", "Astral", "Chaman", "Sage", "Méditant", "Fantom", "Vision", "Rêveur", "Alchim"],
        "famille" : ["Mystère", "Énigme", "Illusion", "Visionnaire", "Orbe", "Flux", "Transe", "Médium", "Psychique", "Spectre"]
    },
    "vampire": ["Akasha","Alucard","Alucard","Angel","Armand","Baron","Tarquin","Bloodscream","Dio","Claudia","Comtesse","Michael","Alice","Carlisle","Edward","Emmett","Esmée","Darla","David","Walter","Dracula","Dracula","Drusilla","Frankenpen","Deacon","Gabrielle","Grand","Jasper","Rosalie","Jane","Jessica","Jubilé","Kain","Harmony","Khayman","Hannibal","Lestat","Louis","MaelLe","Marceline","Marius","MonaMorbius","Nicolas","NosferatuLa","Pandora","Katherine","Raziel","Rüdiger","Damon","Stefan","Selene","Soma","Spike","Bella","Theodora","Vampi","Vampirella","Seras","Victoria","Lucy","Zara la vampire"],
    "orc": {
        "female": ["la brute","la dure","la séduisante","la puissante","la sournoise","la forte","la brute","","la sanguinaire"],
        "male": ["le dur","le sourd","le fort","le puissant","le fourbe","le sournois","le rock","le brute","","le sanguinaire"],
        "famille" :["Azog","Bolg","Golfimbul","Grishnákh","Shagrat","Snaga","Gothmog","Gotar","Gor","Galimus","Karl","Rack"]
    },    
    "celeste":{
        "female":['Ariel','Azrael','Cassiel','Gabriel','Haniel','Jophiel','Metatron','Michael','Raguel','Raphael','Raziel','Sachiel','Samael','Sandalphon','Uriel','Zadkiel','Chamuel','Jeremiel','Barachiel','Phanuel'],
        "male":['Gabriel','Raphael','Uriel','Ariel','Azrael','Metatron','Chamuel','Zadkiel','Jophiel','Haniel','Raziel','Sariel','Barachiel','Cassiel','Sachiel','Raguel','Remiel','Jeremiel','Phanuel'],
        "famille": ["Seraphim","Chérubin","Thrones","Dominations","Vertues","Powers","Principautés","Archanges","Anges","Nephilim","Malakim","Guardians","Dominions","Purifiers","Messengers","Hosts","Apostles","Elohim","Grigori","Erelim","Ophanim","Seraphiel","Raphael","Michael","Gabriel","Uriel","Metatron","Zadkiel","Jophiel","Haniel","Raziel","Sariel","Barachiel","Cassiel","Sachiel","Raguel","Remiel","Jeremiel","Phanuel","Ariel","Azrael","Chamuel","Zaphkiel","Baradiel","Barbiel","Camael","Castiel","Gadreel","Hadraniel","Hashmal","Hesediel","Imamiah","Ithuriel","Jegudiel","Jophiel","Kushiel","Maltiel","Mendrion","Nanael","Nuriel","Omael","Ophaniel","Puriel","Qaphsiel","Quabriel","Rachmiel","Radueriel","Ramiel","Raziel","Rikbiel","Rosier","Sandalphon","Sarakiel","Semeliel","Shamsiel","Shemhazai","Simiel","Sophiel","Tabris","Tzaphqiel","Tzadkiel","Uriel","Zachariel","Zadkiel","Zagzagel","Zaphkiel","Zerachiel"]
    },
    "kobolt":["Snik","Grik","Znok","Drek","Snag","Zog","Grok","Snark","Grik","Thokk"],
    "gobelin":["Snik","Grik","Znok","Drek","Snag","Zog","Grok","Snark","Grik","Thokk"],
    "centaure":{
        "female":["Aria","Briseis","Callista","Daphne","Elysia","Fauna","Galatea","Helene","Ianthe","Jocasta","Kaia","Lyra","Melaina","Nyssa","Ophelia","Phaedra","Rhea","Selene","Thalia","Xanthe"],
        "male":["Asterion","Brontes","Calchas","Diodorus","Eurytion","Faunus","Galad","Heracles","Icarus","Jareth","Kyros","Lycus","Myron","Orion","Phaedrus","Rastus","Silvanus","Thalassius","Urion","Xanthus"],
        "famille": ["Briseroc","Boisvert","CœurdeFeu","Feuillargent","Galoporage","Gardeclair","Pierrefoudre","Chantétoile","CoureurdesBois","Gardelune","Flèchedor","Ombresylve","Lanceciel","Brillecime","Gardeforêt","Sabreaube","Étoileféroce","Chasselumière","Ventargent","Coursombre"]
    },
    "autre":"Personnage"
}