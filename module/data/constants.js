export const EMPHASE = {
    DEPHASE2:"dephase2",
    DEPHASE1:"dephase1",
    NONE: "none",
    EMPHASE1: "emphase1",
    EMPHASE2: "emphase2"
};
export const MORAL = {
    GOOD2:"good2",
    GOOD1:"good1",
    NONE: "none",
    BAD1: "bad1",
    BAD2: "bad2"
};
export const DUREE = {
    DAY:"day",
    HOUR:"hour"
};
export const REPOS = {
    FAST:"fast",
    QUIET:"quiet",
    GOOD:"good",
    INTENS:"intens"
};
export const SEXE = {
    MALE:"male",
    FEMALE:"female",
    AUTRE:"Autre"
};
export const TAILLE = {
    MINI:"mini",
    SMART:"petit",
    MIDDLE:"moyen",
    TALL:"grand",
    BIG:"geant"
};
export const MAGIE = {
    NONE:"none"
};
// Définition des compétences
export const COMPETENCES = Object.fromEntries(
    //v2
    /*Object.keys({
        acrobatie: "", agilites: "", alchimie: "", apprentissage: "", hast: "", cc: "", lancer: "", melee: "", tir: "",
        art: "", assassinat: "", baton: "", bouclier: "", bricolage: "", presence: "", chercher: "", commander: "",
        concentration: "", nature: "", peuples: "", religions: "", geographique: "", rue: "", heretiques: "",
        combat: "", commerce: "", crochetage: "", discretion: "", dexterite: "", detection: "", dissimulation: "",
        dressage: "", ennemi: "", equilibre: "", equitation: "", escroquerie: "", esquiver: "", puissance: "",
        astuce: "", peur: "", joueur: "", maitrise: "", natation: "", navigation: "", orientation: "", persuasion: "",
        pister: "", prophetie: "", secours: "", resistance: "", psychologue: "", medecine: "", survie: "", tueur: "",
        objet: "", veterinaire: "", vigilance: "", vise: ""
    }).map(attr => [attr, `Liber.Character.Competences.${attr}`])*/
    Object.keys({
        mentales:"",connaissances:"",erudition:"",observation:"",alchimie:"",prophetie:"",
        physiques:"",mobilite:"",discretion:"",dexterite:"",survie:"",endurance:"",force:"",equitation:"",
        sociales:"",charisme:"",negociation:"",tromperie:"",
        techniques:"",medecine:"",objet:"",assassinat:"",bouclier:"",tueur:"",
        combats:"",combat:"",hast:"",cc:"",lancer:"",melee:"",tir:"",visee:""
    }).map(attr => [attr, `Liber.Character.Competences.${attr}`])
);
export const CLAN = {
    NONE:"aucune",
    NOMADE: "nomade",
    AELATH: "aelath",
    ATAKANAX: "atakanax",
    ATLANTIDE: "atlantide",
    CEM: "cem",
    COALITH: "coalith",
    CORBEAU: "corbeau",
    CRILANYDD: "crilanydd",
    DEMON_CLAN: "demonclan",
    DRAUCH: "drauch",
    DWALIWYR: "dwaliwyr",
    ERALIWIN: "eraliwin",
    GALERRAKATH: "galerrakath",
    LIMENIDO: "limenido",
    NATURA: "natura",
    NYDIAG: "nydiag",
    OKLATA: "oklata",
    RALICH: "ralich",
    TROUBADOUR:"troubadour",
    VIVAQUA: "vivaqua",
    WEITHA: "weitha",
    YIE: "yie",    
    OTHER:"other"
};
export const CULTE ={
    NONE:"aucune",
    DEMONS_ANCIENS: "demonsanciens",
    MARRUNAS: "marrunas",
    BAPHOMET: "baphomet",
    LUMIERE_CELESTE: "lumiereceleste",
    VHARUNG: "vharung",
    WAETRA: "waetra",
    CROISES: "croises",
    DIEUXSOMBRES: "dieuxsombres",
    NOUVEL_ORDRE: "nouvelordre",
    VAUDOU: "vaudou",
    NUMISMATOMANCIE: "numismatomancie",
    RUNES: "runes",
    OTHER:"other"
}
export const CARACTERE = {
    INTERETS: "interets",
    DECES: "deces",
    AMOUR: "amour",
    AMITIE: "amitie",
    HAINE: "haine",
    PRINCIPALE: "principale",
    PASSION: "passion",
    PERSONNALITE: "personnalite",
    PERCEPTION: "perception",
    RANCUNIER: "rancunier",
    TARE: "tare",
    DISTINGUE: "distingue"
};
export const RACES = {
    NONE:"aucune",
    DRAGON: "dragon",
    HUMAIN: "humain",
    SEMI_HUMAIN: "semihumain",
    DEMON: "demon",
    DRAUCH: "drauch",
    KOBOLT:"kobolt",
    ROCAILLEUX: "rocailleux",   
    ELFE: "elfe",
    ELFE_SYLVAIN: "elfesylvain",
    ELFE_NOIR: "elfenoir",
    ELFE_DE_SANG: "elfedesang",
    NAIN: "nain",
    HOMME_CHAT: "hommechat",
    HOMME_CHIEN: "hommechien",
    HOMME_OISEAU: "hommeoiseau",
    HOMME_ARBRE: "hommearbre",
    HOMME_RAT: "hommerat",
    ETRE_DE_PSY: "etredepsy",
    VAMPIRE: "vampire",
    GOBELIN: "gobelin",
    ORC: "orc",
    CELESTE: "celeste",
    CENTAURE: "centaure",
    AUTRE: "autre"
};
export const TALENTS = {//v3
    AGILITESANSARMURE: "agilitesansarmure",
    ALCHIMISTE: "alchimiste",
    AMBIDEXTRIE: "ambidextrie",
    APPRENTI: "apprenti",
    ARMELIEE: "armeliee",
    ATTAQUANT: "attaquant",
    AURA: "aura",
    BIBLIOTHECAIRE: "bibliothecaire",
    BONDORMEUR: "bondormeur",
    CHANCEUX: "chanceux",
    COMBATMONTE: "combatmonte",
    CONTREATTAQUE: "contreattaque",
    CONVERSION: "conversion",
    DEFENSEUR: "defenseur",
    DEMOLISSEUR: "demolisseur",
    EMPOISONNEUR: "empoisonneur",
    ENQUETEUR: "enqueteur",
    FINGOURMET: "fingourmet",
    FORGERON: "forgeron",
    INITIATIVE: "initiative",
    IMMUNITAIRE: "immunitaire",
    LACHE: "lache",
    LUTTEUR: "lutteur",
    MEMOIREARCANIQUE: "memoirearcanique",
    MULET: "mulet",
    OPPORTUNISTE: "opportuniste",
    ORATEUR: "orateur",
    PERTURBATIONAURAS: "perturbationauras",
    PIEDLEGER: "piedleger",
    RUSE: "ruse",
    SOIGNEUR: "soigneur",
    SOURNOISERIE: "sournoiserie",
    SPECIALISATIONMAGIECLAN: "specialisationmagieclan",
    SPECIALISATIONMARTIAL: "specialisationmartial",
    TENACE: "tenace",
    TIRLOINTAIN: "tirlointain",
    VALEUREUX: "valeureux",
    VIGOUREUX: "vigoureux",
    ABORDAGE: "abordage",
    PILLAGE: "pillage",
    EVASION: "evasion"
};

export const FAIBLESSES = {//v3
    AMNESIE: "amnesie",
    BALOURD: "balourd",
    DISTRAIT: "distrait",
    ESCLAVAGISTE: "esclavagiste",
    FAIBLE: "faible",
    INFECTE: "infecte",
    HESITATION: "hesitation",
    MALCHANCEUX: "malchanceux",
    MALADROIT: "maladroit",
    NEGLIGENT: "negligent",
    NOBLEDECHU: "nobledechu",
    PACIFISTE: "pacifiste",
    PEUREUX: "peureux",
    PIEDLOURD: "piedlourd",
    PRISONNIER: "prisonnier",
    RONFLEUR: "ronfleur",
    TRAITRE: "traitre",
    SUICIDAIRE: "suicidaire",
    ALCOOLIQUE: "alcoolique",
    EGOCENTRIQUE: "egocentrique",
    CLEPTOMANE: "cleptomane",
    IVRE: "ivre",
    AUTORITE: "autorite",
    CLAUSTROPHOBE: "claustrophobe",
    DEPENDANT: "dependant",
    INSOMNIAQUE: "insomniaque",
    INTOLERANT: "intolerant",
    MANIAQUE: "maniaque",
    MUET: "muet",
    SOURD: "sourd",
    PARANOIAQUE: "paranoiaque",
    PHOTOPHOBE: "photophobe",
    PYROMANE: "pyromane",
    SOLITAIRE: "solitaire"
};
export const METIERS = { //v3
    PERSONNALISE: "personnalise",
    GUERRIER: "guerrier",
    CHEVALIER: "chevalier",
    CROISE: "croise",
    SOLDAT: "soldat",
    MERCENAIRE: "mercenaire",
    PIRATE: "pirate",
    CHASSEUR_DE_PRIME: "chasseurdeprime",
    ASSASSIN_VOLEUR: "assassinvoleur",
    INQUISITEUR: "inquisiteur",
    DRUIDE:"druide",
    CLERC: "clerc",
    TROUBADOUR: "troubadour",
    ERUDIT: "erudit",
    MAGICIEN: "magicien",
    ORACLE: "oracle"
};
export const TYPE={
    CC:"cc",
    MELEE:"melee",
    LANCE:"lance",
    HAST:"hast",
    TIR:"tir",
    VISEE:"visee"
}
export const CHOIX={
    NO:"no",
    YES:"yes"
}
