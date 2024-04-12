import { liber } from "./config.js";
import { Race } from "./class/race_class.js";
import { Clan } from "./class/clan_class.js";
import { Reli } from "./class/reli_class.js";
import { Metier } from "./class/metier_class.js";
import { NameGenerator } from "./class/nom_class.js";
import { CharacterGenerator } from "./class/generator_class.js";
import { Character } from "./class/character_class.js";
import { EquipementManager } from "./class/equip_class.js";
export const races = [
    new Race(game.i18n.localize("liber.avantrace60"), 2, {cpt27:-10},game.i18n.localize("liber.avantrace1"),-20),
    new Race(game.i18n.localize("liber.avantrace92"),null,{cpt1:5,cpt27:5},game.i18n.localize("liber.avantrace0"),25),
    new Race(game.i18n.localize("liber.avantrace61"),null,{cpt28:5,cpt50:5},game.i18n.localize("liber.avantrace2"),30),
    new Race(game.i18n.localize("liber.avantrace62"),null,{cpt39:10},game.i18n.localize("liber.avantrace3"),10),
    new Race(game.i18n.localize("liber.avantrace63"),2,null,game.i18n.localize("liber.avantrace4"),0),
    new Race(game.i18n.localize("liber.avantrace64"),null,{cpt27:-20},game.i18n.localize("liber.avantrace5"),-40),
    new Race(game.i18n.localize("liber.avantrace65"),null,{cpt28:5},game.i18n.localize("liber.avantrace6"),15),
    new Race(game.i18n.localize("liber.avantrace10a"),null,{cpt1:5,cpt3:5},game.i18n.localize("liber.avantrace7"),30),
    new Race(game.i18n.localize("liber.avantrace66"),null,{cpt1:5,cpt18:5},game.i18n.localize("liber.avantrace8"),20),
    new Race(game.i18n.localize("liber.avantrace67"),null,{cpt10:10},game.i18n.localize("liber.avantrace9"),20),
    new Race(game.i18n.localize("liber.avantrace68"),null,{cpt1:5},game.i18n.localize("liber.avantrace10"),-15),
    new Race(game.i18n.localize("liber.avantrace69"),null,{cpt37:5,cpt40:5},game.i18n.localize("liber.avantrace11"),20),
    new Race(game.i18n.localize("liber.avantrace70"),null,{cpt1:5,cpt27:5},game.i18n.localize("liber.avantrace12"),25),
    new Race(game.i18n.localize("liber.avantrace71"),null,{cpt46:5,cpt28:5},game.i18n.localize("liber.avantrace13"),20),
    new Race(game.i18n.localize("liber.avantrace72"),null,null,game.i18n.localize("liber.avantrace14"),0),
    new Race(game.i18n.localize("liber.avantrace73"),null,{cpt18:5},game.i18n.localize("liber.avantrace15"),5),
    new Race(game.i18n.localize("liber.avantrace74"),null,null,game.i18n.localize("liber.avantrace16"),0),
    new Race(game.i18n.localize("liber.avantrace75"),null,null,game.i18n.localize("liber.avantrace17"),5),
    new Race(game.i18n.localize("liber.avantrace76"),null,{cpt15:5},game.i18n.localize("liber.avantrace18"),5),
    new Race(game.i18n.localize("liber.avantrace77"),null,{cpt38:-10},game.i18n.localize("liber.avantrace19"),-30),
    new Race(game.i18n.localize("liber.avantrace77a"),null,{cpt38:-10},game.i18n.localize("liber.avantrace19a"),0)
];


export const clans = [
    new Clan(game.i18n.localize("liber.avantrace40"), game.i18n.localize("liber.avantrace20")),
    new Clan(game.i18n.localize("liber.avantrace41"), game.i18n.localize("liber.avantrace21")),
    new Clan(game.i18n.localize("liber.avantrace42"), game.i18n.localize("liber.avantrace22")),
    new Clan(game.i18n.localize("liber.avantrace43"), game.i18n.localize("liber.avantrace23")),
    new Clan(game.i18n.localize("liber.avantrace44"), game.i18n.localize("liber.avantrace24")),
    new Clan(game.i18n.localize("liber.avantrace45"), game.i18n.localize("liber.avantrace25")),
    new Clan(game.i18n.localize("liber.avantrace46"), game.i18n.localize("liber.avantrace26")),
    new Clan(game.i18n.localize("liber.avantrace47"), game.i18n.localize("liber.avantrace27")),
    new Clan(game.i18n.localize("liber.avantrace48"), game.i18n.localize("liber.avantrace28")),
    new Clan(game.i18n.localize("liber.avantrace49"), game.i18n.localize("liber.avantrace29")),
    new Clan(game.i18n.localize("liber.avantrace50"), game.i18n.localize("liber.avantrace30")),
    new Clan(game.i18n.localize("liber.avantrace51"), game.i18n.localize("liber.avantrace31")),
    new Clan(game.i18n.localize("liber.avantrace52"), game.i18n.localize("liber.avantrace32")),
    new Clan(game.i18n.localize("liber.avantrace53"), game.i18n.localize("liber.avantrace33")),
    new Clan(game.i18n.localize("liber.avantrace54"), game.i18n.localize("liber.avantrace34")),
    new Clan(game.i18n.localize("liber.avantrace55"), game.i18n.localize("liber.avantrace35")),
    new Clan(game.i18n.localize("liber.avantrace56"), game.i18n.localize("liber.avantrace36"))
];

export const reli = [
    new Reli(game.i18n.localize("liber.avantrace82"), game.i18n.localize("liber.avantrace36b")),
    new Reli(game.i18n.localize("liber.avantrace59"), game.i18n.localize("liber.avantrace59b"))
];

export const metiers = [
    new Metier(game.i18n.localize("liber.metier1"), { hp: 5, psy: 0, phy: 10, forc: 5, agil: 5, soc: 10, saga: 5, char: 5, men: 10, astu: 5, memo: 5 }),
    new Metier(game.i18n.localize("liber.metier2"), { hp: 23, psy:  3, phy: 70, forc: 50, agil: 20, soc: 60, saga: 50, char: 10, men: 40, astu: 30, memo: 10, cpt7: cpt7+5, cpt6: cpt6+5, cpt13: cpt13+5, cpt18: cpt18+10, cpt40: cpt40+5}),
    new Metier(game.i18n.localize("liber.metier3"), { hp: 23, psy: 5, phy: 70, forc: 40, agil: 30, soc: 40, saga: 10, char: 30, men: 60, astu: 30, memo: 30, cpt24: cpt24+5, cpt22: cpt22+10, cpt45: cpt45+5, cpt29: cpt29+5}),
    new Metier(game.i18n.localize("liber.metier4"), { hp: 23, psy:  6, phy: 70, forc: 50, agil: 20, soc: 35, saga: 20, char: 15, men: 65, astu: 40, memo: 25, cpt7: cpt7+5, cpt12: cpt12+10, cpt37: cpt37+5}),
    new Metier(game.i18n.localize("liber.metier5"), { hp: 23, psy:  5, phy: 70, forc: 55, agil: 15, soc: 50, saga: 20, char: 30, men: 50, astu: 25, memo: 25, cpt34: cpt34+10, cpt7: cpt7+5, cpt14: cpt14+5, cpt12: cpt12+5}),
    new Metier(game.i18n.localize("liber.metier6"), { hp: 23, psy:  6, phy: 70, forc: 40, agil: 30, soc: 40, saga: 10, char: 30, men: 60, astu: 10, memo: 50, cpt7: cpt7+5, cpt23: cpt23+10, cpt12: cpt12+5, cpt39: cpt39+5, cpt20: cpt20+10}),
    new Metier(game.i18n.localize("liber.metier7"), { hp: 22, psy:  8, phy: 65, forc: 30, agil: 35, soc: 45, saga: 40, char: 5, men: 60, astu: 40, memo: 20, cpt7: cpt7+5, cpt30: cpt30+5, cpt46: cpt46+5, cpt45: cpt45+5}),
    new Metier(game.i18n.localize("liber.metier8"), { hp: 22, psy:  7, phy: 65, forc: 30, agil: 35, soc: 50, saga: 25, char: 25, men: 55, astu: 30, memo: 25, cpt0: cpt0+5, cpt18: cpt18+5, cpt8: cpt8+5, cpt52: cpt52+5, cpt46: cpt46+5, cpt31: cpt31+10}),
    new Metier(game.i18n.localize("liber.metier9"), { hp: 22, psy:  6, phy: 65, forc: 30, agil: 35, soc: 55, saga: 30, char: 25, men: 50, astu: 25, memo: 25, cpt6: cpt6+10, cpt43: cpt43+5, cpt19: cpt19+5, cpt42: cpt42+5, cpt40: cpt40+5}),
    new Metier(game.i18n.localize("liber.metier10"), { hp: 22, psy:  8, phy: 65, forc: 15, agil: 50, soc: 45, saga: 40, char: 5, men: 60, astu: 40, memo: 20, cpt8: cpt8+5, cpt10: cpt10+5, cpt22: cpt22+10, cpt30: cpt30+5}),
    new Metier(game.i18n.localize("liber.metier11"), { hp: 22, psy:  6, phy: 65, forc: 30, agil: 35, soc: 55, saga: 30, char: 25, men: 50, astu: 25, memo: 25, cpt0: cpt0+5, cpt8: cpt8+10, cpt18: cpt18+10, cpt31: cpt31+5}),
    new Metier(game.i18n.localize("liber.metier12"), { hp: 20, psy:  7, phy: 60, forc: 15, agil: 45, soc: 70, saga: 40, char: 30, men: 40, astu: 15, memo: 25, cpt0: cpt0+15, cpt19: cpt19+10, cpt22: cpt22+5, cpt18: cpt18+5, cpt30: cpt30+5}),
    new Metier(game.i18n.localize("liber.metier13"), { hp: 13, psy:  18, phy: 40, forc: 20, agil: 20, soc: 65, saga: 20, char: 45, men: 65, astu: 20, memo: 45, cpt3: cpt3+5, cpt11: cpt11+10, cpt50: cpt50+5}),
    new Metier(game.i18n.localize("liber.metier14"), { hp: 12, psy:  20, phy: 35, forc: 5, agil: 30, soc: 65, saga: 35, char: 30, men: 70, astu: 30, memo: 40, cpt2: cpt2+5, cpt50: cpt50+5, cpt54: cpt54+10, cpt17: cpt17+5}),
    new Metier(game.i18n.localize("liber.metier15"), { hp: 10, psy:  22, phy: 30, forc: 5, agil: 25, soc: 70, saga: 40, char: 30, men: 70, astu: 30, memo: 40, cpt11: cpt11+5, cpt20: cpt20+10, cpt51: cpt51+10}),
    new Metier(game.i18n.localize("liber.metier16"), { hp: 8, psy:  25, phy: 25, forc: 5, agil: 20, soc: 70, saga: 60, char: 10, men: 75, astu: 60, memo: 15, cpt15: cpt15+5, cpt47: cpt47+10, cpt50: cpt50+5}),
    new Metier(game.i18n.localize("liber.metier17"), { hp: 23, psy:  5, phy: 70, forc: 40, agil: 20, soc: 50, saga: 20, char: 30, men: 50, astu: 35, memo: 15, cpt43: cpt43+10, cpt7: cpt7+5, cpt57: cpt57+5, cpt27: cpt27+5, cpt39: cpt39+5}),
    new Metier(game.i18n.localize("liber.avantrace93"), {hp: 29, psy:  0, phy: 75, forc: 65, agil: 10, soc: 35, saga: 5, char: 30, men: 60, astu: 10, memo: 50, cpt24: cpt24+5, cpt7: cpt7+5, cpt39: cpt39+10, cpt46: cpt46+5, cpt49: cpt49+5}),
    new Metier(game.i18n.localize("liber.avantrace94"), {hp: 22, psy:  8, phy: 65, forc: 45, agil: 20, soc: 40, saga: 20, char: 20, men: 65, astu: 25, memo: 40, cpt12: cpt12+5, cpt7: cpt7+5, cpt20: cpt20+10, cpt34: cpt34+5, cpt23: cpt23+10})
];

export const raceMagMap = {
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
export const reliMagMap = {
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

export const noms ={
    "liber.avantrace60": ["dova", "pey", "nig", "key", "bod", "iroo", "lex", "blo", "roo", "daka", "zul", "zaa", "zey", "zoo", "paa", "ral", "tur", "tey", "tel", "daco", "too", "ook", "roo", "goo", "pol", "mel", "nax", "dao", "paar", "krey", "vha", "rung", "ynon", "kryn", "bor", "fax", "soo", "jey", "aata", "aatu", "aati", "thur", "löng", "yook", "diir", "ooko", "aka", "ack", "apa", "eaat", "yata", "uru", "moo", "bla", "reb", "pot", "taa", "rook", "creedo", "berk", "dooit"],
    "liber.avantrace61": {
        "Female":  ["Emma", "Jade", "Louise", "Alice", "Lina", "Chloé", "Rose", "Léa", "Mila", "Ambre", "Mia", "Anna", "Julia", "Inès", "Léna", "Juliette", "Zoé", "Manon", "Agathe", "Lou", "Lola", "Camille", "Nina", "Jeanne", "Inaya", "Romy", "Éva", "Romane", "Léonie", "Iris", "Lucie", "Luna", "Adèle", "Sarah", "Louna", "Charlotte", "Margaux", "Olivia", "Sofia", "Charlie", "Victoria", "Victoire", "Nour", "Margot", "Mya", "Giulia", "Clémence", "Alix", "Aya", "Clara", "Éléna", "Capucine", "Lana", "Lya", "Lyna", "Lyana", "Théa", "Léana", "Anaïs", "Gabrielle", "Emy", "Yasmine", "Mathilde", "Maëlys", "Alicia", "Lilou", "Apolline", "Roxane", "Lise", "Assia", "Élise", "Lily", "Maria", "Maya", "Valentine", "Héloïse", "Marie", "Noémie", "Elsa", "Lisa", "Lila", "Alya", "Thaïs", "Ilyana", "Célia", "Candice", "Livia", "Zélie", "Salomé", "Constance", "Soline", "Emmy", "Maëlle", "Éléna", "Maryam", "Amelia", "Joy", "Océane", "Maïssa", "Arya", "Alice", "Yumi", "Lindsey", "Mégumi", "Elise", "Louise", "Valérie", "Elodie", "Adelaide", "Stéphanie", "Béatrice", "Colombe", "Eva", "Laura", "Bathide", "Eloise", "Françoise", "Mylène", "Maryline", "Armande", "Irene", "Elvira", "Iseult", "Marie", "Thérese", "Jeanne", "Genieve", "Cunégonde", "Charlotte", "Aline", "Geogette", "Mariane", "Helene", "Elsa", "Sonia", "Lena"],
        "Male": ["Gabriel","Léo","Raphaël","Arthur","Louis","Lucas","Adam","Jules","Hugo","Maël","Liam","Noah","Paul","Ethan","Tiago","Sacha","Gabin","Nathan","Mohamed","Aaron","Tom","Éden","Théo","Noé","Léon","Martin","Mathis","Nolan","Victor","Timéo","Enzo","Marius","Axel","Antoine","Robin","Isaac","Naël","Amir","Valentin","Rayan","Augustin","Ayden","Clément","Eliott","Samuel","Marceau","Baptiste","Gaspard","Maxence","Yanis","Malo","Ibrahim","Sohan","Maxime","Évan","Nino","Mathéo","Simon","Lyam","Alexandre","Imran","Naïm","Kaïs","Camille","Thomas","Milo","Ismaël","Côme","Owen","Lenny","Soan","Ilyan","Kylian","Noa","Oscar","Ilyes","Léandre","Pablo","Diego","Mathys","Joseph","Ayoub","Youssef","Wassim","Noam","Adem","William","Ali","Basile","Charles","Thiago","Antonin","Logan","Adrien","Marin","Jean","Charly","Esteban","Noham","Elio","André","Richard","Pierre","Paul","Louis","Mickael","Jacques","Mathieu","Damien","Vincent","Stéphane","Etienne","Ronald","Thomas","Bastien","Drake","Georges","Gabriel","Lenny","Eizo","Charles","Hector","Henry","Alex","Tristan","Hugues","Max","Léon","Thibault","Carle","Antoine","Jean","Edouard","Philippe","Nicolas","Gregoire","Guy","Alain","Alphone","Michel","Sébastien","Juste","Justinien","Thirion","Luc"],
        "Famille" :["Abomond","Aguerel","Albelart","Alberiou","Albilieu","Albillot","Andichanteau","Andiret","Angegnes","Astalart","Aubellevé","Barallevé","Bécharel","Belelli","Bizesseau","Bougailles","Bougairelli","Brichameur","Bronet","Caffazin","Cardaidieu","Castennes","Chabaveron","Chanagnon","Chanton","Clarisseau","Duraleilles","Durallot","Estiechanteau","Estiere","Ginelenet","Ginenteau","Guille","Kerganteau","Larmariou","Larmaze","Lignivès","Limognon","Machellevé","Macheseul","Mairdieu","Massoullon","Pegné","Pelleleilles","Pellelle","Polatillon","Raleilles","Rambullot","Rauges","Ravisseau","Roffignes","Roquellon","Sarragnory","Sarrane","Subliffet","Vassemières","Vellot","Vernire","Crochet","Valone","Parker","Onile","Pasteur","Labrocante","Vincente","Auditoré","Laporte","Blanchart","Giroux","Lesourd","Houillons","Castagné","Delasaintecroix","Macon","Chaumont","Lucent","Hover","Packard","Curie","Lyon","Lallemand","Langlais","Lecure","Macdonald","Dupont","Lafontaine","Boucher","Boureau","Godspeak","Pierre","Solitaire","Beauregard","Charmant","Marechal","Dufour","Leroux","Lemoine","Lombart","Lefourbe","Boulanger","Petit","Blanc","Chevalier","Leroy","Lebrun","Silver","Delarue","Notigame","Forest","Tonneau","Does","Martin","Deschamps","Dupuis","Macalisteur","Leloup","Bouquin","Lafleur","","Dugrenier","Lacroix","Lecomte","Poulain","Dumas"]
    },
    "liber.avantrace62": ["Alastor","Azazel","Appolyon","Asmodée","Astaroth","Abrahel","Botis","Bifrons","Caym","Eligos","Flauros","Gusoyn","Ipos","Lilith","Marbas","Moloch","Malack","Naberius","Paimon","Raum","Samigina","Titivillus","Valefor"],
    "liber.avantrace77": {
        "Female": ["la brute","la dure","la séduisante","la puissante","la sournoise","la forte","la brute","","la sanguinaire"],
        "Male": ["le dur","le sourd","le fort","le puissant","le fourbe","le sournois","le rock","le brute","","le sanguinaire"],
        "Famille" :["Azog","Bolg","Golfimbul","Grishnákh","Shagrat","Snaga","Gothmog","Gotar","Gor","Galimus","Karl","Rack"]
    },  
    "liber.avantrace10a": {
        "Female": ["Aerin","Aglari","Amandil","Amarië","Anardil","Arafinwë","Arachné","Aranwë","Arcadia","Ardamírë","Aredhel","Ardamir","Argadil :","Ariarhen","Arminas","Artaher","Artanis","Arwen","Ashana","Astal",                "Athelleen","Baliena","Barmahir","Belwen","Brindal","Caliawen","Carafinwë","Castamir","Celebrían","Celeanar","Circë","Ciryandil","Dairiun","Danica","Danywen","Daenara","Dhaunare","Dralsa","Diningal","Eärendil","Earwen","Eilinel","Elendë","Elemmacil","Elbereth","Eledhwen","Elemire","Elwë","Enetari","Elenwë","Elentir","Elessar","Elerinna","Elwing","Emeldiz","Endaria","Estë","Eänwen","Eldalótë","Eönwë","Eressëa","Estrid","Falathar","Fëanturi","Fíriel","Finduilas","Galadriel","Galata","Galdor","Glingal","Glóredhel","Gilestel","Gilgalad","Glorfindel","Heldaria","Idril","Ilmarë","Indis","Irwaen","Imarune","Isil","Itarillë","Izilbêth","Kardryar","Kementari","Lalwendë","Lalaith","Laurelin","Limstella","Linaewen","Lindorië","Luinil","Lúthien","Macalaure","Mahal","Maeglin","Manîthil","Melian","Míriel","Mormegil","Morwën","Nandil","Nennvial","Nerdanel","Nessa","Nerwen","Nenwende","Nienor","Níniel","Ninquelotë","Ñolofinwë","Númendil","Oilossë","Oromë","Olórin","Olwë","Ondolindë","Qorwyn","Rathlóriel","Rían","Rúmil","Serindë","Silana","Siltiama","Sirthaal","Thuringwethil","Tintallë","Tinúviel","Unyen","Vairë","Valandil","Vàna","Varda","Virani","Volanarë","Voronwë","Wilwarin","Wondrel","Yarayn","Yavana","Ylengil","Yndreth","Yndris"],
        "Male": ["Adanedhel","Adûnakhôr","Aeglos","Aegnor","Aerandir","Argawaen","Aldaron","Anario","Arcadio","Aranrùth","Ancalagon","Anfauglith","Atanatar","Astaldo","Aulendil","Aulendur","Balan","Baragund","Belegund","Bëor","Boromir","Bregolas","Bronweg","Bruithwir","Calimehtar","Calimmacil","Calion","Calywen","Carcharoth","Castamir","Celeborn","Ciryaher","Ciryandil","Ciryatan","Círyon","Círdan","Cirth","Cuthalion","Daeron","Dagnir","Deldúwath","Denethor","Dimrost","Dovahkiin","Duinhir","Eärendur","Eldacar","Eldarion :","Elendur","Elendil","Elrond","Elros","Eöl","Erchamion","Falastur","Fantur","Faramir","Fëanor[o]","Felagund","Finwë","Fírimar","Gondolin","Gorthol","Gundor","Gurthang","Gwindor","Helevorn","Herendil","Herumor","Herunúmes","Hyamendacil","Imlach","Ingwë","Irmo","Isil","Isildur","Lastalaica","Legolas","Lenwë","Lómelindi","Lómion","Lorgan","Lórindol","Maedhros","Mahtan","Mardil","Maglor","Magor","Meneldil","Narmacil","Nandor","Nómin","Ohtar","Ostoher","Radagast","Radhruin","Ragnor","Rána","Palantir","Pelendul","Rauros","Rorhirrim","Rómendacil","Russandol","Saeros","Salmar","Saruman","Sauron","Seregon","Silmarien","Siriondil","Sindar","Súlimo","Tarannon","Targen","Terendul","Turindo","Tauron","Turucàno","Tyeplerinquar","Telchar","Telemnar","Teleri","Thalion","Thalos","Thorondor","Tilion","Tulkas","Turambar","Uldor","Ulmo","Ulwarth","Umarth","Urthel","Urulóki","Valar","Valacar","Valaraukar","Vanyar","Vása","Vorondil"],
        "Famille" :["Aeglos","Alata","Amarth","Anárion","Angrod","Aranel","Aranwë","Arda","Ardal","Avari","Belar","Beldir","Belost","Caradhras","Celebrimbor","Cormar","Cúthalion","Daeron","Elanor","Elbereth","Eldacar","Elendil","Elfhelm","Elrohir","Elrond","Elu","Eluchíl","Eärendil","Eöl","Faelivrin","Finarfin","Finrod","Finwë","Galathil","Galadriel","Gil-galad","Gimli","Gwindor","Hador","Haldir","Ilu","Ingwë","Irmo","Isil","Isildur","Ithil","Khamûl","Legolas","Lindon","Lórien","Maedhros","Mandos","Míriel","Nargothrond","Nenya","Noldor","Oromë","Sauron","Sindarin","Telperion","Thranduil","Turgon","Vanyar","Varda"]
    }, 
    "liber.avantrace69": ["Bodruith","Fangluin l’Ancien","Naugladur","Telchar","Anar","Balin","Bifur","Bofur","Bombur","Borin","Burin","Dáin","Dís","Dori","Durin","Dwalin","Farin","Fíli","Fimbulfambi","Flói","Frár","Frerin","Frór","Fundin","Gandalf","Gimli","Glóin","Grór","Hannar","Kíli","Lofar","Lóni","Mîm","Náin","Náli","Nar","Nár","Narfi","Narvi","Nori","Oi","Óin","Ori","Thorin","Thráin","Thrór","Thrym","Azaghâl","Gamil","Zirak","Ibun","Khîm"],
    "liber.avantrace76": ["Akasha","Alucard","Alucard","Angel","Armand","Baron","Tarquin","Bloodscream","Dio","Claudia","Comtesse","Michael","Alice","Carlisle","Edward","Emmett","Esmée","Darla","David","Walter","Dracula","Dracula","Drusilla","Frankenpen","Deacon","Gabrielle","Grand","Jasper","Rosalie","Jane","Jessica","Jubilé","Kain","Harmony","Khayman","Hannibal","Lestat","Louis","MaelLe","Marceline","Marius","MonaMorbius","Nicolas","NosferatuLa","Pandora","Katherine","Raziel","Rüdiger","Damon","Stefan","Selene","Soma","Spike","Bella","Theodora","Vampi","Vampirella","Seras","Victoria","Lucy","Zara la vampire"],
    "liber.avantrace77a":{
        "Female":['Ariel','Azrael','Cassiel','Gabriel','Haniel','Jophiel','Metatron','Michael','Raguel','Raphael','Raziel','Sachiel','Samael','Sandalphon','Uriel','Zadkiel','Chamuel','Jeremiel','Barachiel','Phanuel'],
        "Male":['Gabriel','Raphael','Uriel','Ariel','Azrael','Metatron','Chamuel','Zadkiel','Jophiel','Haniel','Raziel','Sariel','Barachiel','Cassiel','Sachiel','Raguel','Remiel','Jeremiel','Phanuel'],
        "Famille": ["Seraphim","Chérubin","Thrones","Dominations","Vertues","Powers","Principautés","Archanges","Anges","Nephilim","Malakim","Guardians","Dominions","Purifiers","Messengers","Hosts","Apostles","Elohim","Grigori","Erelim","Ophanim","Seraphiel","Raphael","Michael","Gabriel","Uriel","Metatron","Zadkiel","Jophiel","Haniel","Raziel","Sariel","Barachiel","Cassiel","Sachiel","Raguel","Remiel","Jeremiel","Phanuel","Ariel","Azrael","Chamuel","Zaphkiel","Baradiel","Barbiel","Camael","Castiel","Gadreel","Hadraniel","Hashmal","Hesediel","Imamiah","Ithuriel","Jegudiel","Jophiel","Kushiel","Maltiel","Mendrion","Nanael","Nuriel","Omael","Ophaniel","Puriel","Qaphsiel","Quabriel","Rachmiel","Radueriel","Ramiel","Raziel","Rikbiel","Rosier","Sandalphon","Sarakiel","Semeliel","Shamsiel","Shemhazai","Simiel","Sophiel","Tabris","Tzaphqiel","Tzadkiel","Uriel","Zachariel","Zadkiel","Zagzagel","Zaphkiel","Zerachiel"]
    }
}

export const armes=['Bâton', 'Espadon', 'Hallebarde', 'Fléaux d\'arme', 'Epée à deux main', 'Masse d\'arme', 'Hache de bataille', 'Faux de Guerre', 'Lance Lourde']

export const character = new Character();
/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */



export class LiberActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["Liber", "sheet", "actor"],
          width: 1225,
          height: 820,
          dragDrop: [{dragSelector: ".draggable", dropSelector: null},{dragSelector: ".ability", dropSelector: null}],
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
        //this.addDragAndDropListeners();

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

        //title talent et faiblesse
        var ttitle=html.find('.talentliste option:selected').attr('title');
        var ftitle=html.find('.faiblesseliste option:selected').attr('title');
        html.find('.talent').attr('title',ttitle);
        html.find('.faiblesse').attr('title',ftitle);

       
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
        //html.find('.encours').val(total);
        this.actor.update({'system.encombrement.value': total});
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
        /*if(race==game.i18n.localize("liber.avantrace61")){
            max=175;
        }*/
       
        if((parseInt(phys)+parseInt(soci)+parseInt(ment))>max){
            html.find('.physique').css({"background":"red"});    
            html.find('.social').css({"background":"red"})
            html.find('.mental').css({"background":"red"})
        }
        if(this.actor.type!="monstre"){
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
        }
       

        //cacher clan
        const racess = {
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
        const reli = html.find('.religionliste option:selected').val();
        html.find('.classique').css("display", "none");
        html.find('.guerrier').css("display", "none");
        html.find('.croiser').css("display", "none");
       
        if (clan === game.i18n.localize("liber.avantrace56")) {
          html.find('.guerrier').css("display", "block");
          html.find('.religionliste option').css("display", "none");
          html.find('.religionliste option.aucun').css("display", "block");
        }else if (reli === game.i18n.localize("liber.avantrace82")) {
          html.find('.croiser').css("display", "block");
        }else {
          html.find('.classique').css("display", "block");  
        }  
        if(race==game.i18n.localize('liber.avantrace64')){
            html.find('.magi').css("display", "none");
            html.find('.religionliste').css("display", "none");
        }  else if(race==game.i18n.localize('liber.avantrace77a')){
            html.find('.faiblesseliste').val(game.i18n.localize('liber.title07'));
            this.actor.update({'system.faiblesse': game.i18n.localize('liber.title07')});
        }
        if(clan==game.i18n.localize('liber.avantrace59')){
            html.find('.religionliste').css("display", "none");
        } else if(clan==game.i18n.localize('liber.avantrace56')){ 
            html.find('.metier').val(game.i18n.localize('liber.avantrace93'));
            this.actor.update({'system.metier': game.i18n.localize('liber.avantrace93')});
        }else if(clan==game.i18n.localize('liber.avantrace58')){ 
            html.find('.metier').val(game.i18n.localize('liber.avantrace94'));
            this.actor.update({'system.metier': game.i18n.localize('liber.avantrace94')});
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
        let fatigue = this.actor.system.fatigue;
        var bonuspost=0;
        var critique=5;
        var succes="";
        var degats=0;
        let addfat=0;
        let encours=this.actor.system.encombrement.value;
        let encmax=this.actor.system.encombrement.max;
        let encdif=0;
        const listedemain =armes;

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
                if(this.actor.type=="monstre"){
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
                        button+='<button class="addfats" style="cursor:pointer;margin-bottom: 5px;" data-actorid="'+ this.actor._id+'">Ajouter un point de fatigue</button>';
                    }
                }
               
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
                    speaker: ChatMessage.getSpeaker({ actor: this }),
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
            var cost='Cout : '+cout+' Psy';
        }else{
            var cost='Cout : '+cout+' écu'
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
            hpadd = ((d + parseInt(level)) * parseInt(heure)) * j / 8;
            psyadd = Math.floor((parseInt(level) * parseInt(heure)) / 2);
            break;

          case game.i18n.localize("liber.calme"):
            d = Math.round(Math.random() * 6);
            hpadd = ((d + parseInt(level)) * parseInt(heure)) * j / 8;
            psyadd = Math.floor(parseInt(level) * parseInt(heure));
            fatadd = Math.floor(1 * parseInt(heure));
            if (talent === "Bon dormeur") {
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
            if (talent === "Bon dormeur") {
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
            if (talent === "Bon dormeur") {
              hpadd = parseInt(hpadd) + 6;
              psyadd = parseInt(psyadd) + 3;
              fatadd = parseInt(fatadd) + 1;
            }
            break;

          default:
            break;
        }

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
        
        // Exemple d'utilisation :
        const nameGenerator = new NameGenerator();
        const name = nameGenerator.generateRandomName(race, sexe);
        console.log(name); // Affiche un nom aléatoire pour une femme de la race spécifiée


        let breed = races.find(race => breed.name === race);
        let updatedCpts = {}; // Utilisez un objet pour stocker les caractéristiques mises à jour

        if (breed) {
            if (breed.armor && armureperso < breed.armor) {
                armureperso = breed.armor;
            }
            if (breed.modifiers) {
                for (let key in breed.modifiers) {
                    if (breed.modifiers.hasOwnProperty(key)) {
                        eval(key + " = " + breed.modifiers[key]);
                        updatedCpts[key] = breed.modifiers[key]; // Ajouter la caractéristique mise à jour à l'objet
                    }
                }
            }
            avantagerace += breed.avantrace;
        }
        
        // Code pour vérifier le clan
        let group = clans.find(clan => group.name === clan);
        if (group) {
            let modifier = group.modifier;
            // Utilisez la variable "modifier" comme valeur de l'input
            avantagerace+= modifier;
        }

        let culte = clans.find(clan => culte.name === reli);
        if (culte) {
            let modifier = culte.modifier;
            // Utilisez la variable "modifier" comme valeur de l'input
            avantagerace+= modifier;
        }


        // Code pour vérifier le métier
        let boulot = metiers.find(metier => metier.name === metier);
        if (boulot) {
            // Mettez ici le code pour appliquer les modifications du métier
            let stats = boulot.stats;

            // Décomposition de l'objet stats pour accéder à ses propriétés individuelles
            let { hp, psy, phy, forc, agil, soc, saga, char, men, astu, memo,
                cpt0, cpt1, cpt2, cpt3, cpt4, cpt5, cpt6, cpt7, cpt8, cpt9, cpt10,
                cpt11, cpt12, cpt13, cpt14, cpt15, cpt16, cpt17, cpt18, cpt19, cpt20,
                cpt21, cpt22, cpt23, cpt24, cpt25, cpt26, cpt27, cpt28, cpt29, cpt30,
                cpt31, cpt32, cpt33, cpt34, cpt35, cpt36, cpt37, cpt38, cpt39, cpt40,
                cpt41, cpt42, cpt43, cpt44, cpt45, cpt46, cpt47, cpt48, cpt49, cpt50,
                cpt51, cpt52, cpt53, cpt54, cpt55, cpt56, cpt57
            } = stats;
        }

        
        //mise à jours
        let updates = {
            'name': name,
            'system.histoire': textgen,
            'system.bonusrace': avantagerace,
            'system.protection': armureperso,
            'system.hp.max': hp,
            'system.hp.value': hp,
            'system.psy.max': psy,
            'system.psy.value': psy,
            'system.ability.physique': phy,
            'system.ability.force': forc,
            'system.ability.agilite': agil,
            'system.ability.social': soc,
            'system.ability.sagacite': saga,
            'system.ability.charisme': char,
            'system.ability.mental': men,
            'system.ability.ast': astu,
            'system.ability.memoire': memo,
            'system.caractere.residence': resident,
            'system.caractere.sang': sang,
            'system.caractere.politique': politique,
            'system.caractere.interets': groupe,
            'system.caractere.deces': dc,
            'system.caractere.moral': moral,
            'system.caractere.amour': amour,
            'system.caractere.amitie': ami,
            'system.caractere.haine': haine,
            'system.caractere.principale': metier1,
            'system.caractere.secondaire': metier2,
            'system.caractere.passion': passion,
            'system.caractere.caract': caractere,
            'system.caractere.personnalite': personnalite,
            'system.caractere.perception': vision,
            'system.caractere.objectif': objectif,
            'system.caractere.rancunier': racune,
            'system.caractere.tare': tare,
            'system.caractere.obsession': obsession,
            'system.caractere.distingue': distingue
        };
        for (let key in updatedCpts) {
            updates['system.caracteristique.' + key] = updatedCpts[key];
        }
        await this.actor.update({updates});
    }
   
    _onArmor(event){
        const equipementManager = new EquipementManager(this.actor);
        equipementManager.updateEquipment(event);
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

    async _onCouv(event){//bug
        let idn=event.target.dataset["lettre"];
        let effet=this.actor.effects;
        let lists=['Endormi','Etourdi','Aveugle','Sourd','Réduit au silence','Apeuré','Brûlant','Gelé','Invisible','Béni','Empoisonné','Saignement','Inconscient','Mort']
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
        //console.log(name)
        if(name=="malus"){
            this.actor.update({"system.malus":0});
        }else if(name=="bonus"){
            this.actor.update({"system.bonus":0});  
        }  
    }

    _onEncom(){
        console.log('_onEncom')
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
        console.log('_onStat')
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
        if(psy=='' || psy==undefined){psy=0;}
       
        var reste=170-(parseInt(phys)+parseInt(soci)+parseInt(ment));
       
        if(phys==''){let phys=10}
        if(forc==''){let force=5}
        if(agil==''){let agilite=5}
        if(soci==''){let social=10}
        if(char==''){let charisme=5}
        if(saga==''){let sagacite=5}
        if(ment==''){let mental=10}
        if(astu==''){let astuce=5}
        if(memo==''){let physique=5}
        var cpt0=this.actor.system.caracteristique.acrobatie;var cpt1=this.actor.system.caracteristique.agilites;var cpt2=this.actor.system.caracteristique.alchimie;var cpt3=this.actor.system.caracteristique.apprentissage;var cpt4=this.actor.system.caracteristique.hast;var cpt5=this.actor.system.caracteristique.cc;var cpt6=this.actor.system.caracteristique.lancer;var cpt7=this.actor.system.caracteristique.melee;var cpt8=this.actor.system.caracteristique.tir;var cpt9=this.actor.system.caracteristique.art;var cpt10=this.actor.system.caracteristique.assassinat;var cpt11=this.actor.system.caracteristique.baton;var cpt12=this.actor.system.caracteristique.bouclier;var cpt13=this.actor.system.caracteristique.bricolage;var cpt14=this.actor.system.caracteristique.presence;var cpt15=this.actor.system.caracteristique.chercher;var cpt16=this.actor.system.caracteristique.commander;var cpt17=this.actor.system.caracteristique.concentration;var cpt18=this.actor.system.caracteristique.nature;var cpt19=this.actor.system.caracteristique.peuples;var cpt20=this.actor.system.caracteristique.religions;var cpt21=this.actor.system.caracteristique.geographique;var cpt22=this.actor.system.caracteristique.rue;var cpt23=this.actor.system.caracteristique.heretiques;var cpt24=this.actor.system.caracteristique.combat;var cpt25=this.actor.system.caracteristique.commerce;var cpt26=this.actor.system.caracteristique.crochetage;var cpt27=this.actor.system.caracteristique.discretion;var cpt28=this.actor.system.caracteristique.dexterite;var cpt29=this.actor.system.caracteristique.detection;var cpt30=this.actor.system.caracteristique.dissimulation;var cpt31=this.actor.system.caracteristique.dressage;var cpt32=this.actor.system.caracteristique.ennemi;var cpt33=this.actor.system.caracteristique.equilibre;var cpt34=this.actor.system.caracteristique.equitation;var cpt35=this.actor.system.caracteristique.escroquerie;var cpt36=this.actor.system.caracteristique.esquiver;var cpt37=this.actor.system.caracteristique.puissance;var cpt38=this.actor.system.caracteristique.astuce;var cpt39=this.actor.system.caracteristique.peur;var cpt40=this.actor.system.caracteristique.joueur;var cpt41=this.actor.system.caracteristique.maitrise;var cpt42=this.actor.system.caracteristique.natation;var cpt43=this.actor.system.caracteristique.navigation;var cpt44=this.actor.system.caracteristique.orientation;var cpt45=this.actor.system.caracteristique.persuasion;var cpt46=this.actor.system.caracteristique.pister;var cpt47=this.actor.system.caracteristique.prophetie;var cpt48=this.actor.system.caracteristique.secours;var cpt49=this.actor.system.caracteristique.resistance;var cpt50=this.actor.system.caracteristique.psychologue;var cpt51=this.actor.system.caracteristique.medecine;var cpt52=this.actor.system.caracteristique.survie;var cpt53=this.actor.system.caracteristique.tueur;var cpt54=this.actor.system.caracteristique.objet;var cpt55=this.actor.system.caracteristique.veterinaire;var cpt56=this.actor.system.caracteristique.vigilance;var cpt57=this.actor.system.caracteristique.vise;
        
        let raceWithResult = races.find(race => race.result === result);
        resultat=resultat+raceWithResult;
        
        let breed = races.find(race => breed.name === race);
        let updatedCpts = {}; // Utilisez un objet pour stocker les caractéristiques mises à jour

        if (breed) {
            // Vérifiez et mettez à jour l'armure si nécessaire
            if (breed.armor && armureperso < breed.armor) {
                armureperso = breed.armor;
            }

            // Mettez à jour les caractéristiques en fonction des modificateurs
            for (let key in breed.modifiers) {
                if (breed.modifiers.hasOwnProperty(key)) {
                    let modifierValue = breed.modifiers[key];
                    // Assurez-vous que la valeur du modificateur est supérieure à celle actuelle
                    if (eval(key) < modifierValue) {
                        eval(key + " = " + modifierValue);
                    }
                }
            }
        }

        

        switch(clan) {
            case game.i18n.localize("liber.avantrace51"):
                if(cpt29<5){cpt29=10}
                resultat += 20;
                break;
            case game.i18n.localize("liber.avantrace53"):
                if(cpt19<10){cpt19=10}
                if(cpt20<10){cpt20=10}
                resultat+=20;
                break;
            case game.i18n.localize("liber.avantrace55"):
                if(race==game.i18n.localize("liber.avantrace67")){
                    if(cpt10<15){cpt10=15}
                }else {
                    if(cpt10<5){cpt10=5}
                }
                if(race==game.i18n.localize("liber.avantrace70")){
                    if(cpt27<10){cpt27=10}
                }else {
                    if(cpt27<5){cpt27=5}
                }
                resultat+=20;
                break;
            default:
                break;
        }
        var cpts=[cpt0,cpt1,cpt2,cpt3,cpt4,cpt5,cpt6,cpt7,cpt8,cpt9,cpt10,cpt11,cpt12,cpt13,cpt14,cpt15,cpt16,cpt17,cpt18,cpt19,cpt20,cpt21,cpt22,cpt23,cpt24,cpt25,cpt26,cpt27,cpt28,cpt29,cpt30,cpt31,cpt32,cpt33,cpt34,cpt35,cpt36,cpt37,cpt38,cpt39,cpt40,cpt41,cpt42,cpt43,cpt44,cpt45,cpt46,cpt47,cpt48,cpt49,cpt50,cpt51,cpt52,cpt53,cpt54,cpt55,cpt56,cpt57]

        for (var i = 0; i < 58; i++) {
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
            cout = parseInt(level);//corbeau
            b_nb=parseInt(level)+2;
        } else {
            cout = b_cout + (psy - b_psy);
           
        }

        //calcul cout et nb sort
        /*let xcout = Math.floor((parseInt(psy) - parseInt(b_nb)) / 2 + 3); //cout sort
        if (clan !== game.i18n.localize("liber.avantrace56")) {
            xcout = level;
        }*/

        const listsort = this.actor.sort;
        const nbsorts = listsort.length;
        let calsort = parseInt(b_nb) - parseInt(nbsorts);
        if(compt==game.i18n.localize("liber.title81")){
            calsort=parseInt(calsort)+1;
        }
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

        let mag0 = 'aucun';let mag1 = 'aucun';let mag2 = 'aucun';;let mag3 = 'aucun';let mag4 = 'aucun';let mag5 = 'aucun';let all = 0;
        

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
       

        if(metier==game.i18n.localize('liber.metier12')){
           mag1= 'troubadour'
        }
        if (reliMagMap[reli]) {
          mag2 = reliMagMap[reli];
        }
        if(clan==game.i18n.localize('liber.avantrace59')){
           mag2= '';
           
        }
        //activer les effets
        const effets = this.actor.effects.filter(item => item.name !== '').map(item => item.name);
        const lists = ['Endormi','Etourdi','Aveugle','Sourd','Réduit au silence','Apeuré','Brûlant','Gelé','Invisible','Béni','Empoisonné','Saignement','Inconscient','Mort'];
        const active = lists.map(list => effets.includes(list) ? 1 : 0.5);

        //liste des sorts possible

        const pack = game.packs.get('liber.magie');
        const tables = await pack.getDocuments();
        let listem;
        if(mag1=='autre' || mag2=='autre'){
            console.log('mag all')
            listem = tables.filter(value =>
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
        }else{
            listem = tables.filter(value =>
                value.system.classe == mag0 ||
                value.system.classe == mag1 ||
                value.system.classe == mag2 ||
                value.system.classe == mag3 ||
                value.system.classe == mag4 ||
                value.system.classe == mag5 ||
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
        }
        console.log(listem)
        //console.log(pack)
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

      /** @override */
    _onDragStart(event) {
        const li = event.currentTarget;
        if ( event.target.classList.contains("content-link") ) return;

        // Create drag data
        let dragData;

        if ( li.dataset.type == "jetdedes") {
          dragData = { "type": "ability", "name": li.dataset.name, "item": li.dataset.itemId, "dice": li.dataset.dice, "attDice": li.dataset.attdice }
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