import {Race } from "./class/race_class.js";
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
