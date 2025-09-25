import {CHOIX, EMPHASE, MORAL, DUREE, REPOS, SEXE, MAGIE, COMPETENCES, CLAN, CULTE, CARACTERE, RACES, TALENTS, FAIBLESSES, METIERS, TAILLE} from "./constants.js"; // Import de la constante METIERS


/** Modèle de données pour un personnage */
export default class LiberCharacterData extends foundry.abstract.DataModel {
    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        let apprentissageLevels = {};
        for (let i = 0; i <= 100; i++) {
            apprentissageLevels["level"+i] = new fields.NumberField({ required: true, min: 0, max: 20, initial: 0 });
        }

        return {
            insoin:new fields.NumberField({ required: true, min: 0,initial: 0 }),
            avant:new fields.NumberField({ required: true, min: 0,initial: 0 }),
            desan:new fields.NumberField({ required: true, min: 0,initial: 0 }),
            fatig:new fields.NumberField({ required: true, min: 0,initial: 0 }),
            etat:new fields.SchemaField({
                Asleep: new fields.NumberField({ required: true, min: 0.5, max: 1,initial: 0.5 }),
                Stunned: new fields.NumberField({ required: true, min: 0.5, max: 1,initial: 0.5 }),
                Blind: new fields.NumberField({ required: true, min: 0.5, max: 1,initial: 0.5 }),
                Deaf: new fields.NumberField({ required: true, min: 0.5, max: 1,initial: 0.5 }),
                Silenced: new fields.NumberField({ required: true, min: 0.5, max: 1,initial: 0.5 }),
                Frightened: new fields.NumberField({ required: true, min: 0.5, max: 1,initial: 0.5 }),
                Burning: new fields.NumberField({ required: true, min: 0.5, max: 1,initial: 0.5 }),
                Frozen: new fields.NumberField({ required: true, min: 0.5, max: 1,initial: 0.5 }),
                Invisible: new fields.NumberField({ required: true, min: 0.5, max: 1,initial: 0.5 }),
                Bleeding: new fields.NumberField({ required: true, min: 0.5, max: 1,initial: 0.5 }),
                Poisoned: new fields.NumberField({ required: true, min: 0.5, max: 1,initial: 0.5 }),
                Blessed: new fields.NumberField({ required: true, min: 0.5, max: 1,initial: 0.5 }),
                Unconscious: new fields.NumberField({ required: true, min: 0.5, max: 1,initial: 0.5 }),
                Dead: new fields.NumberField({ required: true, min: 0.5, max: 1,initial: 0.5 })
            }),
            /*hp: new fields.NumberField({ required: true, initial: 3 }),
            hpmax: new fields.NumberField({ required: true, initial: 3 }),*/
             hp: new fields.SchemaField({
              value: new fields.NumberField({ required: true, initial: 10 }),
              max: new fields.NumberField({ required: true, initial: 10 })
            }),
            psy: new fields.SchemaField({
              value: new fields.NumberField({ required: true, initial: 10 }),
              max: new fields.NumberField({ required: true, initial: 10 })
            }),
            /*psy: new fields.NumberField({ required: true, initial: 3 }),
            psymax: new fields.NumberField({ required: true, initial: 3 }),*/
            niveau: new fields.NumberField({ required: true, initial: 1 }),
            armure: new fields.NumberField({ required: true, initial: 0 }),
            protec: new fields.NumberField({ required: true, initial: 0 }),
             emphase: new fields.StringField({
                required: true,
                initial: EMPHASE.NONE, // Valeur par défaut
                choices: {
                    [EMPHASE.DEPHASE2]: game.i18n.localize("Liber.Character.Phase.Dephase2"),
                    [EMPHASE.DEPHASE1]: game.i18n.localize("Liber.Character.Phase.Dephase1"),
                    [EMPHASE.NONE]: game.i18n.localize("Liber.Character.Phase.None"),
                    [EMPHASE.EMPHASE1]: game.i18n.localize("Liber.Character.Phase.Emphase1"),
                    [EMPHASE.EMPHASE2]: game.i18n.localize("Liber.Character.Phase.Emphase2")
                }
            }),
            ability:new fields.SchemaField({
                physique: new fields.NumberField({ required: true, min: 10, max: 95, initial: 10,nullable:false}),
                force: new fields.NumberField({ required: true, min: 5, max: 90, initial: 5,nullable:false}),
                agilite: new fields.NumberField({ required: true, min: 5, max: 90, initial: 5,nullable:false}),
                social: new fields.NumberField({ required: true, min: 10, max: 95, initial: 10,nullable:false}),
                sagacite: new fields.NumberField({ required: true, min: 5, max: 90, initial: 5,nullable:false}),
                charisme: new fields.NumberField({ required: true, min: 5, max: 90, initial: 5,nullable:false}),
                mental: new fields.NumberField({ required: true, min: 10, max: 95, initial: 10,nullable:false}),
                astuce: new fields.NumberField({ required: true, min: 5, max: 90, initial: 5,nullable:false}),
                memoire: new fields.NumberField({ required: true, min: 5, max: 90, initial: 5,nullable:false})
            }),
            malus:new fields.NumberField({ required: true, initial: 0 }),
            bonus:new fields.NumberField({ required: true, initial: 0 }),
            biography: new fields.HTMLField({ required: false, blank: true, initial: "", textSearch: true }),
            moral: new fields.StringField({
                required: true,
                initial: MORAL.NONE, // Valeur par défaut
                choices: {
                    [MORAL.GOOD2]: game.i18n.localize("Liber.Character.Moral.Good2"),
                    [MORAL.GOOD1]: game.i18n.localize("Liber.Character.Moral.Good1"),
                    [MORAL.NONE]: game.i18n.localize("Liber.Character.Moral.None"),
                    [MORAL.BAD1]: game.i18n.localize("Liber.Character.Moral.Bad1"),
                    [MORAL.BAD2]: game.i18n.localize("Liber.Character.Moral.Bad2")
                }
            }),
            time:new fields.NumberField({ required: true, initial: 0 }),
            duree: new fields.StringField({
                required: true,
                initial: DUREE.HOUR, // Valeur par défaut
                choices: {
                    [DUREE.DAY]: { label: "Liber.Character.Repos.Day" },
                    [DUREE.HOUR]: { label: "Liber.Character.Repos.Hour" }
                }
            }),
            repos: new fields.StringField({
                required: true,
                initial: REPOS.FAST, // Valeur par défaut
                choices: {
                    [REPOS.FAST]: { label: "Liber.Character.Repos.Fast" },
                    [REPOS.QUIET]: { label: "Liber.Character.Repos.Quiet" },
                    [REPOS.GOOD]: { label: "Liber.Character.Repos.Good" },
                    [REPOS.INTENS]: { label: "Liber.Character.Repos.Intens" }
                }
            }),
            competences: new fields.SchemaField(
                Object.fromEntries(
                    Object.keys(COMPETENCES).map(key => [
                        key,
                        new fields.NumberField({ required: true, min: -20, max: 20, initial: 0, label: COMPETENCES[key] })
                    ])
                )
            ),
            enc:new fields.NumberField({ required: true, initial: 0 }),
            encmax:new fields.NumberField({ required: true, initial: 0 }),
            ecu:new fields.NumberField({ required: true, initial: 0 }),
            /*magie: new fields.StringField({//potentielement anemer à disparaitre
                required: true,
                initial: MAGIE.NONE,
                choices: {
                    [MAGIE.NONE]: game.i18n.localize("Liber.Magic.aucune"),
                }
            }),*/
            cout:new fields.NumberField({ required: true, initial: 0 ,readonly:true}),
            max:new fields.NumberField({ required: true, initial: 0 ,readonly:true}),
            /** Traits de caractère (Chaque trait est un champ séparé) */
            caractere: new fields.SchemaField({
                [CARACTERE.INTERETS]: new fields.StringField({required: false, initial: "" }),
                [CARACTERE.DECES]: new fields.StringField({required: false, initial: "" }),
                [CARACTERE.AMOUR]: new fields.StringField({required: false, initial: "" }),
                [CARACTERE.AMITIE]: new fields.StringField({required: false, initial: "" }),
                [CARACTERE.HAINE]: new fields.StringField({required: false, initial: "" }),
                [CARACTERE.PRINCIPALE]: new fields.StringField({required: false, initial: "" }),
                [CARACTERE.PASSION]: new fields.StringField({required: false, initial: "" }),
                [CARACTERE.PERSONNALITE]: new fields.StringField({required: false, initial: "" }),
                [CARACTERE.PERCEPTION]: new fields.StringField({required: false, initial: "" }),
                [CARACTERE.RANCUNIER]: new fields.StringField({required: false, initial: "" }),
                [CARACTERE.TARE]: new fields.StringField({required: false, initial: "" }),
                [CARACTERE.DISTINGUE]: new fields.StringField({required: false, initial: "" })
            }),
            sex: new fields.StringField({
                required: true,
                initial: SEXE.MALE, // Valeur par défaut
                choices: {
                    [SEXE.MALE]: game.i18n.localize("Liber.Character.Sex.Male"),
                    [SEXE.FEMALE]: game.i18n.localize("Liber.Character.Sex.Female"),
                    [SEXE.AUTRE]: game.i18n.localize("Liber.Character.Sex.Other")
                }
            }),
            race: new fields.StringField({
                required: true,
                initial: RACES.DRAGON, // Valeur par défaut
                choices: {
                    [RACES.DRAGON]: game.i18n.localize("Liber.Race.Dragon"),
                    [RACES.HUMAIN]: game.i18n.localize("Liber.Race.Humain"),
                    [RACES.SEMI_HUMAIN]: game.i18n.localize("Liber.Race.Semihumain"),
                    [RACES.DEMON]: game.i18n.localize("Liber.Race.Demon"),
                    [RACES.DRAUCH]: game.i18n.localize("Liber.Race.Drauch"),
                    [RACES.KOBOLT]: game.i18n.localize("Liber.Race.Kobolt"),
                    [RACES.ROCAILLEUX]: game.i18n.localize("Liber.Race.Rocailleux"),
                    [RACES.ELFE]: game.i18n.localize("Liber.Race.Elfe"),
                    [RACES.ELFE_SYLVAIN]: game.i18n.localize("Liber.Race.Elfesylvain"),
                    [RACES.ELFE_NOIR]: game.i18n.localize("Liber.Race.Elfenoir"),
                    [RACES.ELFE_DE_SANG]: game.i18n.localize("Liber.Race.Elfedesang"),
                    [RACES.NAIN]: game.i18n.localize("Liber.Race.Nain"),
                    [RACES.HOMME_CHAT]: game.i18n.localize("Liber.Race.Hommechat"),
                    [RACES.HOMME_CHIEN]: game.i18n.localize("Liber.Race.Hommechien"),
                    [RACES.HOMME_OISEAU]: game.i18n.localize("Liber.Race.Hommeoiseau"),
                    [RACES.HOMME_ARBRE]: game.i18n.localize("Liber.Race.Hommearbre"),
                    [RACES.HOMME_RAT]: game.i18n.localize("Liber.Race.Hommerat"),
                    [RACES.ETRE_DE_PSY]: game.i18n.localize("Liber.Race.Etredepsy"),
                    [RACES.VAMPIRE]: game.i18n.localize("Liber.Race.Vampire"),
                    [RACES.GOBELIN]: game.i18n.localize("Liber.Race.Gobelin"),
                    [RACES.ORC]: game.i18n.localize("Liber.Race.Orc"),
                    [RACES.CELESTE]: game.i18n.localize("Liber.Race.Celeste"),
                    [RACES.CENTAURE]: game.i18n.localize("Liber.Race.Centaure"),     
                    [RACES.AUTRE]: game.i18n.localize("Liber.Race.Autre"),
                }
            }),
            talent: new fields.StringField({
                required: false,
                initial: TALENTS.AGILITE_SANS_ARMURE, // Valeur par défaut
                choices: Object.fromEntries(
                    Object.entries(TALENTS).map(([key, value]) => [
                        value, {
                            label: `Liber.Talent.${key.toLowerCase()}`, // 🔹 Clé de traduction du nom en minuscule
                            tooltip: `Liber.Talent.Description.${key.toLowerCase()}` // 🔹 Clé de traduction de la description en minuscule
                        }
                    ])
                )
            }),
            faiblesse: new fields.StringField({
                required: false,
                  initial: FAIBLESSES.AMNESIE, // Valeur par défaut
                  choices: Object.fromEntries(
                    Object.entries(FAIBLESSES).map(([key, value]) => [
                      value, {
                        label: `Liber.Faiblesse.${key.toLowerCase()}`, // 🔹 Clé de traduction du nom
                        tooltip: `Liber.Faiblesse.Description.${key.toLowerCase()}` // 🔹 Clé de traduction de la description
                      }
                    ])
                  )
            }),
            clan: new fields.StringField({
                required: true,
                initial: CLAN.NONE, // Valeur par défaut
                choices: {
                    [CLAN.NONE]:game.i18n.localize("Liber.Magic.aucune"),
                    [CLAN.NOMADE]: game.i18n.localize("Liber.Magic.nomade"),
                    [CLAN.AELATH]: game.i18n.localize("Liber.Magic.aelath"),
                    [CLAN.ATAKANAX]: game.i18n.localize("Liber.Magic.atakanax"),
                    [CLAN.ATLANTIDE]: game.i18n.localize("Liber.Magic.atlantide"),
                    [CLAN.CEM]: game.i18n.localize("Liber.Magic.cem"),
                    [CLAN.COALITH]: game.i18n.localize("Liber.Magic.coalith"),
                    [CLAN.CORBEAU]: game.i18n.localize("Liber.Magic.corbeau"),
                    [CLAN.CRILANYDD]: game.i18n.localize("Liber.Magic.crilanydd"),
                    [CLAN.DEMON_CLAN]: game.i18n.localize("Liber.Magic.demonclan"),
                    [CLAN.DRAUCH]: game.i18n.localize("Liber.Magic.drauch"),
                    [CLAN.DWALIWYR]: game.i18n.localize("Liber.Magic.dwaliwyr"),
                    [CLAN.ERALIWIN]: game.i18n.localize("Liber.Magic.eraliwin"),
                    [CLAN.GALERRAKATH]: game.i18n.localize("Liber.Magic.galerrakath"),
                    [CLAN.LIMENIDO]: game.i18n.localize("Liber.Magic.limenido"),
                    [CLAN.NATURA]: game.i18n.localize("Liber.Magic.natura"),
                    [CLAN.NYDIAG]: game.i18n.localize("Liber.Magic.nydiag"),
                    [CLAN.OKLATA]: game.i18n.localize("Liber.Magic.oklata"),
                    [CLAN.RALICH]: game.i18n.localize("Liber.Magic.ralich"),
                    [CLAN.TROUBADOUR]: game.i18n.localize("Liber.Magic.troubadour"),
                    [CLAN.VIVAQUA]: game.i18n.localize("Liber.Magic.vivaqua"),
                    [CLAN.WEITHA]: game.i18n.localize("Liber.Magic.weitha"),
                    [CLAN.YIE]: game.i18n.localize("Liber.Magic.yie"),
                    [CLAN.OTHER]: game.i18n.localize("Liber.Magic.autre"),

                    [CULTE.NONE]:game.i18n.localize("Liber.Magic.aucune"),
                    [CULTE.DEMONS_ANCIENS]: game.i18n.localize("Liber.Magic.demonsanciens"),
                    [CULTE.MARRUNAS]: game.i18n.localize("Liber.Magic.marrunas"),
                    [CULTE.BAPHOMET]: game.i18n.localize("Liber.Magic.baphomet"),
                    [CULTE.LUMIERE_CELESTE]: game.i18n.localize("Liber.Magic.lumiereceleste"),
                    [CULTE.VHARUNG]: game.i18n.localize("Liber.Magic.vharung"),
                    [CULTE.WAETRA]: game.i18n.localize("Liber.Magic.waetra"),
                    [CULTE.CROISES]: game.i18n.localize("Liber.Magic.croises"),
                    [CULTE.DIEUXSOMBRES]: game.i18n.localize("Liber.Magic.dieuxsombres"),
                    [CULTE.NOUVEL_ORDRE]: game.i18n.localize("Liber.Magic.nouvelordre"),
                    [CULTE.VAUDOU]: game.i18n.localize("Liber.Magic.vaudou"),
                    [CULTE.NUMISMATOMANCIE]: game.i18n.localize("Liber.Magic.numismatomancie"),
                    [CULTE.RUNES]: game.i18n.localize("Liber.Magic.runes"),
                    [CULTE.OTHER]: game.i18n.localize("Liber.Magic.autre")
                }
        }),
            culte: new fields.StringField({
                required: true,
                initial: CULTE.NONE, // Valeur par défaut
                choices: {
                    [CULTE.NONE]:game.i18n.localize("Liber.Magic.aucune"),
                    [CULTE.DEMONS_ANCIENS]: game.i18n.localize("Liber.Magic.demonsanciens"),
                    [CULTE.MARRUNAS]: game.i18n.localize("Liber.Magic.marrunas"),
                    [CULTE.BAPHOMET]: game.i18n.localize("Liber.Magic.baphomet"),
                    [CULTE.LUMIERE_CELESTE]: game.i18n.localize("Liber.Magic.lumiereceleste"),
                    [CULTE.VHARUNG]: game.i18n.localize("Liber.Magic.vharung"),
                    [CULTE.WAETRA]: game.i18n.localize("Liber.Magic.waetra"),
                    [CULTE.CROISES]: game.i18n.localize("Liber.Magic.croises"),
                    [CULTE.DIEUXSOMBRES]: game.i18n.localize("Liber.Magic.dieuxsombres"),
                    [CULTE.NOUVEL_ORDRE]: game.i18n.localize("Liber.Magic.nouvelordre"),
                    [CULTE.VAUDOU]: game.i18n.localize("Liber.Magic.vaudou"),
                    [CULTE.NUMISMATOMANCIE]: game.i18n.localize("Liber.Magic.numismatomancie"),
                    [CULTE.RUNES]: game.i18n.localize("Liber.Magic.runes"),
                    [CULTE.OTHER]: game.i18n.localize("Liber.Magic.autre"),

                    [CLAN.NONE]:game.i18n.localize("Liber.Magic.aucune"),
                    [CLAN.NOMADE]: game.i18n.localize("Liber.Magic.nomade"),
                    [CLAN.AELATH]: game.i18n.localize("Liber.Magic.aelath"),
                    [CLAN.ATAKANAX]: game.i18n.localize("Liber.Magic.atakanax"),
                    [CLAN.ATLANTIDE]: game.i18n.localize("Liber.Magic.atlantide"),
                    [CLAN.CEM]: game.i18n.localize("Liber.Magic.cem"),
                    [CLAN.COALITH]: game.i18n.localize("Liber.Magic.coalith"),
                    [CLAN.CORBEAU]: game.i18n.localize("Liber.Magic.corbeau"),
                    [CLAN.CRILANYDD]: game.i18n.localize("Liber.Magic.crilanydd"),
                    [CLAN.DEMON_CLAN]: game.i18n.localize("Liber.Magic.demonclan"),
                    [CLAN.DRAUCH]: game.i18n.localize("Liber.Magic.drauch"),
                    [CLAN.DWALIWYR]: game.i18n.localize("Liber.Magic.dwaliwyr"),
                    [CLAN.ERALIWIN]: game.i18n.localize("Liber.Magic.eraliwin"),
                    [CLAN.GALERRAKATH]: game.i18n.localize("Liber.Magic.galerrakath"),
                    [CLAN.LIMENIDO]: game.i18n.localize("Liber.Magic.limenido"),
                    [CLAN.NATURA]: game.i18n.localize("Liber.Magic.natura"),
                    [CLAN.NYDIAG]: game.i18n.localize("Liber.Magic.nydiag"),
                    [CLAN.OKLATA]: game.i18n.localize("Liber.Magic.oklata"),
                    [CLAN.RALICH]: game.i18n.localize("Liber.Magic.ralich"),
                    [CLAN.TROUBADOUR]: game.i18n.localize("Liber.Magic.troubadour"),
                    [CLAN.VIVAQUA]: game.i18n.localize("Liber.Magic.vivaqua"),
                    [CLAN.WEITHA]: game.i18n.localize("Liber.Magic.weitha"),
                    [CLAN.YIE]: game.i18n.localize("Liber.Magic.yie"),
                    [CLAN.OTHER]: game.i18n.localize("Liber.Magic.autre")
                }
            }),
            metier: new fields.StringField({
                required: true,
                initial: METIERS.PERSONNALISE, // Valeur par défaut
                choices: {
                    [METIERS.PERSONNALISE]: game.i18n.localize("Liber.Metier.personnalise"),
                    [METIERS.GUERRIER]: game.i18n.localize("Liber.Metier.guerrier"),
                    [METIERS.CHEVALIER]: game.i18n.localize("Liber.Metier.chevalier"),
                    [METIERS.CROISE]: game.i18n.localize("Liber.Metier.croise"),
                    [METIERS.SOLDAT]: game.i18n.localize("Liber.Metier.soldat"),
                    [METIERS.MERCENAIRE]: game.i18n.localize("Liber.Metier.mercenaire"),
                    [METIERS.PIRATE]: game.i18n.localize("Liber.Metier.pirate"),
                    [METIERS.CHASSEUR_DE_PRIME]: game.i18n.localize("Liber.Metier.chasseurdeprime"),
                    [METIERS.ASSASSIN_VOLEUR]: game.i18n.localize("Liber.Metier.assassinvoleur"),
                    [METIERS.INQUISITEUR]: game.i18n.localize("Liber.Metier.inquisiteur"),
                    [METIERS.DRUIDE]: game.i18n.localize("Liber.Metier.druide"),
                    [METIERS.CLERC]: game.i18n.localize("Liber.Metier.clerc"),
                    [METIERS.TROUBADOUR]: game.i18n.localize("Liber.Metier.troubadour"),
                    [METIERS.ERUDIT]: game.i18n.localize("Liber.Metier.erudit"),
                    [METIERS.MAGICIEN]: game.i18n.localize("Liber.Metier.magicien"),
                    [METIERS.ORACLE]: game.i18n.localize("Liber.Metier.oracle")
                }
            }),
            restant:new fields.NumberField({ required: true, initial: 0 ,readonly:true}),
            reste:new fields.NumberField({ required: true, initial: 0 ,readonly:true}),
            base:new fields.NumberField({ required: true, initial: 25 ,readonly:true}),
            taille: new fields.StringField({
                required: true,
                initial: TAILLE.MIDDLE, // Valeur par défaut
                choices: {
                    [TAILLE.MINI]: game.i18n.localize("Liber.Character.Taille.Mini"),
                    [TAILLE.SMART]: game.i18n.localize("Liber.Character.Taille.Smart"),
                    [TAILLE.MIDDLE]: game.i18n.localize("Liber.Character.Taille.Middle"),
                    [TAILLE.TALL]: game.i18n.localize("Liber.Character.Taille.Tall"),
                    [TAILLE.BIG]: game.i18n.localize("Liber.Character.Taille.Big")
                }
            }),
            forme:new fields.StringField({ required: true, initial: "Créature" }),
            geo:new fields.StringField({ required: true, initial: "systems/liber-chronicles/assets/monstre/carte/map1.webp" }),
            posture:new fields.StringField({ required: true, initial: "aucune" }),
            probleme:new fields.StringField({ required: true, initial: "" }),
            inventory: new fields.StringField({required: true, initial: "all"}),
            ronfleur: new fields.StringField({
                gmonly:true,
                label:game.i18n.localize("Liber.Character.Ronfleur"),
                required: true,
                initial: CHOIX.NO, // Valeur par défaut
                choices: {
                    [CHOIX.NO]: game.i18n.localize("Liber.Labels.No"),
                    [CHOIX.YES]: game.i18n.localize("Liber.Labels.Yes")
                }
            }),
            traite: new fields.StringField({
                gmOnly:true,
                label:game.i18n.localize("Liber.Character.Traite"),
                required: true,
                initial: CHOIX.NO, // Valeur par défaut
                choices: {
                    [CHOIX.NO]: game.i18n.localize("Liber.Labels.No"),
                    [CHOIX.YES]: game.i18n.localize("Liber.Labels.Yes")
                }
            }),
            apprentissage: new fields.SchemaField(apprentissageLevels),
            alert: new fields.SchemaField({  
                hp: new fields.StringField({ required: true, initial: "" }),
                psy: new fields.StringField({ required: true, initial: "" })
            })

        };
    }
    static LOCALIZATION_PREFIXES = ["Liber.Character"];
}
     