export const Model = {};

Model.Metiers = {
    "personnalise" :{ 
        "ability":{"agilite":5,"astuce":5,"charisme":5,"force":5,"memoire":5,"mental":10,"physique":10,"sagacite":5,"social":10},
        "hp":5,"hpmax":5,"psy":0,"psymax":0,"competences":{}
    },
    "aventurier":{
        "ability":{"agilite":20,"astuce":30,"charisme":10,"force":50,"memoire":10,"mental":40,"physique":70,"sagacite":50,"social":60},
        "hp":23,"hpmax":23,"psy":3,"psymax":3,
        "competences":{"melee":5,"lancer":5,"bricolage":5,"nature":10,"joueur":5}
    },
    "mercenaire":{
        "ability":{"agilite":30,"astuce":30,"charisme":30,"force":40,"memoire":30,"mental":60,"physique":70,"sagacite":10,"social":40},
        "hp":23,"hpmax":23,"psy":5,"psymax":5,
        "competences":{"combat":5,"rue":10,"detection":5,"persuasion":5}
    },
    "soldat":{
        "ability":{"agilite":20,"astuce":40,"charisme":15,"force":50,"memoire":25,"mental":65,"physique":70,"sagacite":20,"social":35},
        "hp":23,"hpmax":23,"psy":6,"psymax":6,
        "competences":{"melee":5,"bouclier":10,"force":5}
    },
    "chevalier":{
        "ability":{"agilite":15,"astuce":25,"charisme":30,"force":55,"memoire":25,"mental":50,"physique":70,"sagacite":20,"social":50},
        "hp":23,"hpmax":23,"psy":5,"psymax":5,
        "competences":{"equitation":10,"melee":5,"presence":5,"bouclier":5}
    },
    "inquisiteur":{
        "ability":{"agilite":30,"astuce":10,"charisme":30,"force":40,"memoire":50,"mental":60,"physique":70,"sagacite":10,"social":40},
        "hp":23,"hpmax":23,"psy":6,"psymax":6,
        "competences":{"peur":5,"heretiques":10,"bouclier":5,"melee":5,"religions":10}
    },
    "chasseurDePrime":{
        "ability":{"agilite":35,"astuce":40,"charisme":5,"force":30,"memoire":20,"mental":60,"physique":65,"sagacite":40,"social":45},
        "hp":22,"hpmax":22,"psy":8,"psymax":8,
        "competences":{"melee":5,"lancer":5,"bricolage":5,"nature":10,"joueur":5}
    },
    "chasseur":{
        "ability":{"agilite":35,"astuce":30,"charisme":25,"force":30,"memoire":25,"mental":55,"physique":65,"sagacite":25,"social":50},
        "hp":22,"hpmax":22,"psy":7,"psymax":7,
        "competences":{"acrobatie":5,"nature":5,"tir":5,"survie":5,"pister":5,"dressage":10}
    },
    "pecheur":{
        "ability":{"agilite":35,"astuce":25,"charisme":25,"force":30,"memoire":25,"mental":50,"physique":65,"sagacite":30,"social":55},
        "hp":22,"hpmax":22,"psy":6,"psymax":6,
        "competences":{"lancer":10,"navigation":5,"peuples":5,"natation":5,"joueur":5}
    },
    "assassinvoleur":{
        "ability":{"agilite":50,"astuce":40,"charisme":5,"force":15,"memoire":20,"mental":60,"physique":65,"sagacite":40,"social":45},
        "hp":22,"hpmax":22,"psy":8,"psymax":8,
        "competences":{"tir":5,"assassinat":5,"rue":10,"dissimulation":5}
    },
    "archer":{
        "ability":{"agilite":35,"astuce":25,"charisme":25,"force":30,"memoire":25,"mental":50,"physique":65,"sagacite":30,"social":55},
        "hp":22,"hpmax":22,"psy":6,"psymax":6,
        "competences":{"tir":10,"nature":5,"vise":5,"dressage":5}
    },
    "troubadour":{
        "ability":{"agilite":45, "astuce":15, "charisme":30, "force":15, "memoire":25, "mental":40, "physique":60, "sagacite":40, "social":70},
        "hp":20,"hpmax":20,"psy":7,"psymax":7,
        "competences":{ "acrobatie":15, "art":10, "rue":5, "nature":5, "dissimulation":5 }
    },
    "erudit":{
        "ability":{"agilite":20, "astuce":20, "charisme":45, "force":20, "memoire":45, "mental":65, "physique":40, "sagacite":20, "social":65},
        "hp":13,"hpmax":13,"psy":18,"psymax":18,
        "competences":{ "apprentissage":5, "baton":10, "psychologue":5 }
    },
    "magicien":{
        "ability":{"agilite":30, "astuce":30, "charisme":30, "force":5, "memoire":40, "mental":70, "physique":35, "sagacite":35, "social":65},
        "hp":12,"hpmax":12,"psy":20,"psymax":20,
        "competences":{ "alchimie":5, "psychologue":5, "objet":10, "concentration":5 }
    },
    "clerc":{
        "ability":{"agilite":25, "astuce":30, "charisme":30, "force":5, "memoire":40, "mental":70, "physique":30, "sagacite":40, "social":70},
        "hp":10,"hpmax":10,"psy":22,"psymax":22,
        "competences":{ "baton":5, "religions":10, "medecine":10 }
    },
    "oracle":{
        "ability":{"agilite":20, "astuce":60, "charisme":10, "force":5, "memoire":15, "mental":75, "physique":25, "sagacite":60, "social":70},
        "hp":8,"hpmax":8,"psy":25,"psymax":25,
        "competences":{ "chercher":5, "prophetie":10, "psychologue":5 }
    },
    "pirate":{
        "ability":{"agilite":30, "astuce":35, "charisme":30, "force":40, "memoire":15, "mental":50, "physique":70, "sagacite":20, "social":50},
        "hp":23,"hpmax":23,"psy":5,"psymax":5,"competences":{ "navigation":10, "melee":5, "vise":5, "peur":5, "discretion":5 }
    },
    "guerrier":{
        "ability":{"agilite":10, "astuce":10, "charisme":30, "force":65, "memoire":50, "mental":60, "physique":75, "sagacite":5, "social":35},
        "hp":29,"hpmax":29,"psy":0,"psymax":0,"competences":{ "combat":5, "melee":5, "peur":10, "pister":5, "resistance":5 }
    },
    "croise":{
        "ability":{"agilite":20, "astuce":25, "charisme":20, "force":45, "memoire":40, "mental":65, "physique":65, "sagacite":20, "social":40},
        "hp":22,"hpmax":22,"psy":8,"psymax":8,"competences":{ "melee":5, "bouclier":5, "heretiques":10, "equitation":5, "religions":10 }
    }
};

Model.race={
    "dragon":{
        "armor":2,"discretion":-10,"ajoutpoint":-20
    },
    "humain":{
        "psychologue":5,"dexterite":5,"ajoutpoint":30
    },
    "demon":{
        "peur":10,"ajoutpoint":10
    },
    "drauch":{
        "armor":2,"ajoutpoint":0
    },
    "rocailleux":{
        "discretion":-20,"ajoutpoint":-40
    },
    "semihumain":{
        "dexterite":5,"ajoutpoint":15
    },
    "elfe":{
        "agilites":5,"apprentissage":5,"ajoutpoint":30
    },
    "elfesylvain":{
        "agilites":5,"nature":5,"ajoutpoint":20
    },
    "elfenoir":{
        "assassinat":10,"ajoutpoint":20
    },
    "elfedesang": {
        "agilites":5,"ajoutpoint":15
    },
    "nain":{
        "puissance":5,"joueur":5,"ajoutpoint":20
    },
    "hommechat":{
        "agilites":5,"discretion":5,"ajoutpoint":25
    },
    "hommechien":{
        "pister":5,"puissance":5,"ajoutpoint":20
    },
    "hommearbre":{
        "nature":5,"ajoutpoint":5
    },
    "vampire":{
        "chercher":5,"ajoutpoint":5
    },
    "orc":{
        "astuce":-10,"ajoutpoint":-30
    },
    "centaure":{
        "equitation":10,"ajoutpoint":10
    },
    "kobolt":{
        "agilites":5,"discretion":5,"ajoutpoint":25
    }
}

Model.multiplicateurs = {
  "acrobatie": 1, "agilites": 3, "art": 1, "assassinat": 2, "baton": 2,
  "bouclier": 2, "bricolage": 1, "presence": 3, "chercher": 1, "commander": 2,
  "concentration": 3, "nature": 1, "peuples": 1, "religions": 1, "geographique": 1,
  "rue": 1, "heretiques": 1, "combat": 3, "commerce": 2, "crochetage": 1,
  "discretion": 2, "dexterite": 3, "detection": 2, "dissimulation": 3, "dressage": 1,
  "ennemi": 1, "equilibre": 1, "equitation": 1, "escroquerie": 1, "esquiver": 1,
  "puissance": 3, "astuce": 3, "peur": 1, "joueur": 1, "maitrise": 3,
  "natation": 1, "navigation": 1, "orientation": 1, "persuasion": 3, "pister": 1,
  "prophetie": 3, "secours": 1, "resistance": 1, "psychologue": 3, "medecine": 3,
  "survie": 2, "tueur": 1, "objet": 1, "veterinaire": 1, "vigilance": 3,
  "vise": 2, "alchimie": 2, "apprentissage": 3, "lancer": 3, "melee": 3, "tir": 3, "hast": 3,"cc":3
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
    "centaure":{
        "female":["Aria","Briseis","Callista","Daphne","Elysia","Fauna","Galatea","Helene","Ianthe","Jocasta","Kaia","Lyra","Melaina","Nyssa","Ophelia","Phaedra","Rhea","Selene","Thalia","Xanthe"],
        "male":["Asterion","Brontes","Calchas","Diodorus","Eurytion","Faunus","Galad","Heracles","Icarus","Jareth","Kyros","Lycus","Myron","Orion","Phaedrus","Rastus","Silvanus","Thalassius","Urion","Xanthus"],
        "famille": ["Briseroc","Boisvert","CœurdeFeu","Feuillargent","Galoporage","Gardeclair","Pierrefoudre","Chantétoile","CoureurdesBois","Gardelune","Flèchedor","Ombresylve","Lanceciel","Brillecime","Gardeforêt","Sabreaube","Étoileféroce","Chasselumière","Ventargent","Coursombre"]
    },
    "autre":"Personnage"
}