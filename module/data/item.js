import {CLAN, CULTE, TYPE, CHOIX} from "./constants.js"; // Import de la constante METIERS

/** Modèle de données pour un objet */
export default class LiberItemData extends foundry.abstract.DataModel {
  static defineSchema() {
  	const fields = foundry.data.fields;
    return {
      name:new fields.StringField({ required: true, initial: "Nouvel Objet" }),
      biography: new fields.HTMLField({ required: false, blank: true, initial: "", textSearch: true }),
      quantity: new fields.NumberField({ required: true, min: 0, initial: 1 }),
      degat: new fields.StringField({ required: true, initial: "" }),
      porter: new fields.StringField({ required: true, initial:"0" }),
      rayon: new fields.NumberField({ required: true, min: 0, initial: 0 }),
      poids: new fields.NumberField({ required: true, min: 0, initial: 0 }),
      valeur: new fields.NumberField({ required: true, min: 0, initial: 0 }),
      protec: new fields.NumberField({ required: true, min: 0, initial: 0 }),
      equip: new fields.HTMLField({ required: false, initial: "" }),
      consommable: new fields.StringField({
            required: true,
            initial: CHOIX.NO, // Valeur par défaut
            choices: {
                [CHOIX.NO]: game.i18n.localize("Liber.Labels.No"),
                [CHOIX.YES]: game.i18n.localize("Liber.Labels.Yes")
            }
        }),
      doublemain: new fields.StringField({
            required: true,
            initial: CHOIX.NO, // Valeur par défaut
            choices: {
                [CHOIX.NO]: game.i18n.localize("Liber.Labels.No"),
                [CHOIX.YES]: game.i18n.localize("Liber.Labels.Yes")
            }
        }),
      class: new fields.StringField({ initial: ""}),
      cible: new fields.StringField({ initial: "" }),
      duree: new fields.StringField({ initial: "" }),
      style: new fields.StringField({
        required: true,
        initial: TYPE.CC,
        choices:{
          [TYPE.CC]:game.i18n.localize("Liber.Items.Types.cc"),
          [TYPE.MELEE]:game.i18n.localize("Liber.Items.Types.melee"),
          [TYPE.LANCE]:game.i18n.localize("Liber.Items.Types.lance"),
          [TYPE.HAST]:game.i18n.localize("Liber.Items.Types.hast"),
          [TYPE.TIR]:game.i18n.localize("Liber.Items.Types.tir"),
          [TYPE.VISEE]:game.i18n.localize("Liber.Items.Types.visee")
        }

      }),
      school: new fields.StringField({
          required: true,
          initial: CLAN.NONE, // Valeur par défaut
          choices: {
            [CLAN.NONE]:game.i18n.localize("Liber.Magic.aucune"),
            [CLAN.DRAUCH]: game.i18n.localize("Liber.Magic.drauch"),
            [CLAN.DEMON_CLAN]: game.i18n.localize("Liber.Magic.demonclan"),
            [CLAN.RALICH]: game.i18n.localize("Liber.Magic.ralich"),
            [CLAN.AELATH]: game.i18n.localize("Liber.Magic.aelath"),
            [CLAN.DWALIWYR]: game.i18n.localize("Liber.Magic.dwaliwyr"),
            [CLAN.YIE]: game.i18n.localize("Liber.Magic.yie"),
            [CLAN.NYDIAG]: game.i18n.localize("Liber.Magic.nydiag"),
            [CLAN.WEITHA]: game.i18n.localize("Liber.Magic.weitha"),
            [CLAN.CRILANYDD]: game.i18n.localize("Liber.Magic.crilanydd"),
            [CLAN.CEM]: game.i18n.localize("Liber.Magic.cem"),
            [CLAN.COALITH]: game.i18n.localize("Liber.Magic.coalith"),
            [CLAN.NATURA]: game.i18n.localize("Liber.Magic.natura"),
            [CLAN.VIVAQUA]: game.i18n.localize("Liber.Magic.vivaqua"),
            [CLAN.LIMENIDO]: game.i18n.localize("Liber.Magic.limenido"),
            [CLAN.ERALIWIN]: game.i18n.localize("Liber.Magic.eraliwin"),
            [CLAN.ATLANTIDE]: game.i18n.localize("Liber.Magic.atlantide"),
            [CLAN.GALERRAKATH]: game.i18n.localize("Liber.Magic.galerrakath"),
            [CLAN.ATAKANAX]: game.i18n.localize("Liber.Magic.atakanax"),
            [CLAN.CORBEAU]: game.i18n.localize("Liber.Magic.corbeau"),
            [CLAN.OKLATA]: game.i18n.localize("Liber.Magic.oklata"),
            [CLAN.NOMADE]: game.i18n.localize("Liber.Magic.nomade"),
            [CLAN.TROUBADOUR]: game.i18n.localize("Liber.Magic.troubadour"),
            [CULTE.NONE]:game.i18n.localize("Liber.Magic.aucune"),
            [CULTE.VHARUNG]: game.i18n.localize("Liber.Magic.vharung"),
            [CULTE.NOUVEL_ORDRE]: game.i18n.localize("Liber.Magic.nouvelordre"),
            [CULTE.CROISES]: game.i18n.localize("Liber.Magic.croises"),
            [CULTE.LUMIERE_CELESTE]: game.i18n.localize("Liber.Magic.lumiereceleste"),
            [CULTE.WAETRA]: game.i18n.localize("Liber.Magic.waetra"),
            [CULTE.DEMONS_ANCIENS]: game.i18n.localize("Liber.Magic.demonsanciens"),
            [CULTE.BAPHOMET]: game.i18n.localize("Liber.Magic.baphomet"),
            [CULTE.MARRUNAS]: game.i18n.localize("Liber.Magic.marrunas"),
            [CULTE.VAUDOU]: game.i18n.localize("Liber.Magic.vaudou"),
            [CULTE.RUNES]: game.i18n.localize("Liber.Magic.runes"),
            [CULTE.NUMISMATOMANCIE]: game.i18n.localize("Liber.Magic.numismatomancie"),
            [CULTE.DIEUXSOMBRES]: game.i18n.localize("Liber.Magic.dieuxsombres")
          }
      })
    };
  }
}

        