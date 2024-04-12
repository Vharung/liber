export class Character {
    constructor() {
        this.resident = this.generateResident();
        this.sang = this.generateSang();
        this.politique = this.generatePolitique();
        this.groupe = this.generateGroupe();
        this.dc = this.generateDc();
        this.moral = this.generateMoral();
        this.amour = this.generateAmour();
        this.ami = this.generateAmi();
        this.haine = this.generateHaine();
        this.metier1 = this.generateMetier1();
        this.metier2 = this.generateMetier2();
        this.loisir = this.generateLoisir();
        this.caract = this.generateCaractere();
        this.perso = this.generatePerso();
        this.vision = this.generateVision();
        this.objectif = this.generateObjectif();
        this.racune = this.generateRacune();
        this.tare = this.generateTare();
        this.obession = this.generateObession();
        this.disting = this.generateDisting();

    }

    getRandomItem(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    generateResident() {
        let demeure = [game.i18n.localize("liber.caract1"),game.i18n.localize("liber.caract2"),game.i18n.localize("liber.caract3"),game.i18n.localize("liber.caract4"),game.i18n.localize("liber.caract5"),game.i18n.localize("liber.caract6"),game.i18n.localize("liber.caract7"),game.i18n.localize("liber.caract8"),game.i18n.localize("liber.caract9"),game.i18n.localize("liber.caract10"),game.i18n.localize("liber.caract11"),game.i18n.localize("liber.caract12")];
        let proximite=[game.i18n.localize("liber.caract13"),game.i18n.localize("liber.caract14"),game.i18n.localize("liber.caract15")];
        let lieu=[game.i18n.localize("liber.caract16"),game.i18n.localize("liber.caract17"),game.i18n.localize("liber.caract18"),game.i18n.localize("liber.caract19"),game.i18n.localize("liber.caract20"),game.i18n.localize("liber.caract21"),game.i18n.localize("liber.caract22"),game.i18n.localize("liber.caract23"),game.i18n.localize("liber.caract24"),game.i18n.localize("liber.caract25"),game.i18n.localize("liber.caract26"),game.i18n.localize("liber.caract27"),game.i18n.localize("liber.caract28"),game.i18n.localize("liber.caract29"),game.i18n.localize("liber.caract30"),game.i18n.localize("liber.caract31"),game.i18n.localize("liber.caract32"),game.i18n.localize("liber.caract33"),game.i18n.localize("liber.caract34")];
        return `${this.getRandomItem(demeure)} ${this.getRandomItem(proximite)} ${this.getRandomItem(lieu)}`;
    }

    generateSang() {
        let famille = ["Crochet","Valone","Parker","Onile","Pasteur","Labrocante","Vincente","Auditoré","Laporte","Blanchart","Giroux","Lesourd","Houillons","Castagné","Delasaintecroix","Macon","Chaumont","Lucent","Hover","Packard","Curie","Lyon","Lallemand","Langlais","Lecure","Macdonald","Dupont","Lafontaine","Boucher","Boureau","Godspeak","Pierre","Solitaire","Beauregard","Charmant","Marechal","Dufour","Leroux","Lemoine","Lombart","Lefourbe","Boulanger","Petit","Blanc","Chevalier","Leroy","Lebrun","Silver","Delarue","Notigame","Forest","Tonneau","Does","Martin","Deschamps","Dupuis","Macalisteur","Leloup","Bouquin","Lafleur","","Dugrenier","Lacroix","Lecomte","Poulain","Dumas"];
        let titre=[game.i18n.localize("liber.caract35"),game.i18n.localize("liber.caract36"),game.i18n.localize("liber.caract37"),game.i18n.localize("liber.caract38"),game.i18n.localize("liber.caract39"),game.i18n.localize("liber.caract40"),game.i18n.localize("liber.caract41"),game.i18n.localize("liber.caract42"),game.i18n.localize("liber.caract43"),game.i18n.localize("liber.caract44"),game.i18n.localize("liber.caract45"),game.i18n.localize("liber.caract46"),game.i18n.localize("liber.caract47"),game.i18n.localize("liber.caract48"),game.i18n.localize("liber.caract49"),game.i18n.localize("liber.caract50")];
        return `${this.getRandomItem(titre)} de la famille ${this.getRandomItem(famille)}`;
    }

    generatePolitique() {
        let rang=[game.i18n.localize("liber.caract51"),game.i18n.localize("liber.caract52"),game.i18n.localize("liber.caract53"),game.i18n.localize("liber.caract54"),game.i18n.localize("liber.caract55"),game.i18n.localize("liber.caract56"),game.i18n.localize("liber.caract57"),game.i18n.localize("liber.caract58"),game.i18n.localize("liber.caract59")]
        let organisation=[game.i18n.localize("liber.caract60"),game.i18n.localize("liber.caract61"),game.i18n.localize("liber.caract62"),game.i18n.localize("liber.caract63"),game.i18n.localize("liber.caract64"),game.i18n.localize("liber.caract65"),game.i18n.localize("liber.caract66"),game.i18n.localize("liber.caract67"),game.i18n.localize("liber.caract68"),game.i18n.localize("liber.caract69"),game.i18n.localize("liber.caract70"),game.i18n.localize("liber.caract71"),game.i18n.localize("liber.caract72"),game.i18n.localize("liber.caract73"),game.i18n.localize("liber.caract74"),game.i18n.localize("liber.caract75"),game.i18n.localize("liber.caract76"),game.i18n.localize("liber.caract77"),game.i18n.localize("liber.caract78"),game.i18n.localize("liber.caract79")]
        return `${this.getRandomItem(rang)} ${this.getRandomItem(organisation)}`;
    }

    generateGroupe() {
        let intret=[game.i18n.localize("liber.caract80"),game.i18n.localize("liber.caract81"),game.i18n.localize("liber.caract82"),game.i18n.localize("liber.caract83"),game.i18n.localize("liber.caract84"),game.i18n.localize("liber.caract85"),game.i18n.localize("liber.caract86"),game.i18n.localize("liber.caract87"),game.i18n.localize("liber.caract88"),game.i18n.localize("liber.caract89"),game.i18n.localize("liber.caract90"),game.i18n.localize("liber.caract91"),game.i18n.localize("liber.caract92"),game.i18n.localize("liber.caract93"),game.i18n.localize("liber.caract94"),game.i18n.localize("liber.caract95"),game.i18n.localize("liber.caract96"),game.i18n.localize("liber.caract97"),game.i18n.localize("liber.caract98"),game.i18n.localize("liber.caract99"),game.i18n.localize("liber.caract100"),game.i18n.localize("liber.caract101"),game.i18n.localize("liber.caract102")]
        return this.getRandomItem(intret);
    }

    generateDc() {
        let pertes=[game.i18n.localize("liber.caract103"),game.i18n.localize("liber.caract104"),game.i18n.localize("liber.caract105"),game.i18n.localize("liber.caract106"),game.i18n.localize("liber.caract107"),game.i18n.localize("liber.caract108"),game.i18n.localize("liber.caract109"),game.i18n.localize("liber.caract110"),game.i18n.localize("liber.caract111"),game.i18n.localize("liber.caract112"),game.i18n.localize("liber.caract113"),game.i18n.localize("liber.caract114"),game.i18n.localize("liber.caract115"),game.i18n.localize("liber.caract116"),game.i18n.localize("liber.caract117"),game.i18n.localize("liber.caract118")]
        return this.getRandomItem(pertes);
    }

    generateMoral() {
        let valeur=[game.i18n.localize("liber.caract119"),game.i18n.localize("liber.caract120"),game.i18n.localize("liber.caract121"),game.i18n.localize("liber.caract122"),game.i18n.localize("liber.caract123"),game.i18n.localize("liber.caract124"),game.i18n.localize("liber.caract125"),game.i18n.localize("liber.caract126"),game.i18n.localize("liber.caract127"),game.i18n.localize("liber.caract128"),game.i18n.localize("liber.caract129"),game.i18n.localize("liber.caract130"),game.i18n.localize("liber.caract131")]
        return this.getRandomItem(valeur);
    }

    generateAmour() {
        let race=[game.i18n.localize("liber.caract132"),game.i18n.localize("liber.caract133"),game.i18n.localize("liber.caract134"),game.i18n.localize("liber.caract135"),game.i18n.localize("liber.caract136"),game.i18n.localize("liber.caract137")]
        let rang=[game.i18n.localize("liber.caract138"),game.i18n.localize("liber.caract139"),game.i18n.localize("liber.caract140"),game.i18n.localize("liber.caract141"),game.i18n.localize("liber.caract142"),game.i18n.localize("liber.caract143"),game.i18n.localize("liber.caract144"),game.i18n.localize("liber.caract145")]
        let organisation=[game.i18n.localize("liber.caract146"),game.i18n.localize("liber.caract147"),game.i18n.localize("liber.caract148"),game.i18n.localize("liber.caract149"),game.i18n.localize("liber.caract150"),game.i18n.localize("liber.caract151"),game.i18n.localize("liber.caract152"),game.i18n.localize("liber.caract153"),game.i18n.localize("liber.caract154"),game.i18n.localize("liber.caract155"),game.i18n.localize("liber.caract156"),game.i18n.localize("liber.caract157"),game.i18n.localize("liber.caract158"),game.i18n.localize("liber.caract159"),game.i18n.localize("liber.caract160"),game.i18n.localize("liber.caract161"),game.i18n.localize("liber.caract162"),game.i18n.localize("liber.caract163"),game.i18n.localize("liber.caract164"),game.i18n.localize("liber.caract165")];
        return `${this.getRandomItem(race)} ${this.getRandomItem(rang)} ${this.getRandomItem(organisation)}`;
    }

    generateAmi() {
        let race=[game.i18n.localize("liber.caract132"),game.i18n.localize("liber.caract133"),game.i18n.localize("liber.caract134"),game.i18n.localize("liber.caract135"),game.i18n.localize("liber.caract136"),game.i18n.localize("liber.caract137")]
        let rang=[game.i18n.localize("liber.caract138"),game.i18n.localize("liber.caract139"),game.i18n.localize("liber.caract140"),game.i18n.localize("liber.caract141"),game.i18n.localize("liber.caract142"),game.i18n.localize("liber.caract143"),game.i18n.localize("liber.caract144"),game.i18n.localize("liber.caract145")]
        let organisation=[game.i18n.localize("liber.caract146"),game.i18n.localize("liber.caract147"),game.i18n.localize("liber.caract148"),game.i18n.localize("liber.caract149"),game.i18n.localize("liber.caract150"),game.i18n.localize("liber.caract151"),game.i18n.localize("liber.caract152"),game.i18n.localize("liber.caract153"),game.i18n.localize("liber.caract154"),game.i18n.localize("liber.caract155"),game.i18n.localize("liber.caract156"),game.i18n.localize("liber.caract157"),game.i18n.localize("liber.caract158"),game.i18n.localize("liber.caract159"),game.i18n.localize("liber.caract160"),game.i18n.localize("liber.caract161"),game.i18n.localize("liber.caract162"),game.i18n.localize("liber.caract163"),game.i18n.localize("liber.caract164"),game.i18n.localize("liber.caract165")];
        return `${this.getRandomItem(race)} ${this.getRandomItem(rang)} ${this.getRandomItem(organisation)}`;
    }

    generateHaine() {
        let race=[game.i18n.localize("liber.caract132"),game.i18n.localize("liber.caract133"),game.i18n.localize("liber.caract134"),game.i18n.localize("liber.caract135"),game.i18n.localize("liber.caract136"),game.i18n.localize("liber.caract137")]
        let rang=[game.i18n.localize("liber.caract138"),game.i18n.localize("liber.caract139"),game.i18n.localize("liber.caract140"),game.i18n.localize("liber.caract141"),game.i18n.localize("liber.caract142"),game.i18n.localize("liber.caract143"),game.i18n.localize("liber.caract144"),game.i18n.localize("liber.caract145")]
        let organisation=[game.i18n.localize("liber.caract146"),game.i18n.localize("liber.caract147"),game.i18n.localize("liber.caract148"),game.i18n.localize("liber.caract149"),game.i18n.localize("liber.caract150"),game.i18n.localize("liber.caract151"),game.i18n.localize("liber.caract152"),game.i18n.localize("liber.caract153"),game.i18n.localize("liber.caract154"),game.i18n.localize("liber.caract155"),game.i18n.localize("liber.caract156"),game.i18n.localize("liber.caract157"),game.i18n.localize("liber.caract158"),game.i18n.localize("liber.caract159"),game.i18n.localize("liber.caract160"),game.i18n.localize("liber.caract161"),game.i18n.localize("liber.caract162"),game.i18n.localize("liber.caract163"),game.i18n.localize("liber.caract164"),game.i18n.localize("liber.caract165")];
        return `${this.getRandomItem(race)} ${this.getRandomItem(rang)} ${this.getRandomItem(organisation)}`;
    }

    generateMetier1() {
        let profession=[game.i18n.localize("liber.caract166"),game.i18n.localize("liber.caract167"),game.i18n.localize("liber.caract168"),game.i18n.localize("liber.caract169"),game.i18n.localize("liber.caract170"),game.i18n.localize("liber.caract171"),game.i18n.localize("liber.caract172"),game.i18n.localize("liber.caract173"),game.i18n.localize("liber.caract174"),game.i18n.localize("liber.caract175"),game.i18n.localize("liber.caract176"),game.i18n.localize("liber.caract177"),game.i18n.localize("liber.caract178"),game.i18n.localize("liber.caract179"),game.i18n.localize("liber.caract180"),game.i18n.localize("liber.caract181"),game.i18n.localize("liber.caract182"),game.i18n.localize("liber.caract183"),game.i18n.localize("liber.caract184"),game.i18n.localize("liber.caract185"),game.i18n.localize("liber.caract186"),game.i18n.localize("liber.caract187"),game.i18n.localize("liber.caract188"),game.i18n.localize("liber.caract189"),game.i18n.localize("liber.caract190"),game.i18n.localize("liber.caract191"),game.i18n.localize("liber.caract192"),game.i18n.localize("liber.caract193"),game.i18n.localize("liber.caract194"),game.i18n.localize("liber.caract195"),game.i18n.localize("liber.caract196"),game.i18n.localize("liber.caract197"),game.i18n.localize("liber.caract198"),game.i18n.localize("liber.caract199"),game.i18n.localize("liber.caract200"),game.i18n.localize("liber.caract201"),game.i18n.localize("liber.caract202"),game.i18n.localize("liber.caract203")]
        return this.getRandomItem(profession);
    }

    generateMetier2() {
        let profession=[game.i18n.localize("liber.caract166"),game.i18n.localize("liber.caract167"),game.i18n.localize("liber.caract168"),game.i18n.localize("liber.caract169"),game.i18n.localize("liber.caract170"),game.i18n.localize("liber.caract171"),game.i18n.localize("liber.caract172"),game.i18n.localize("liber.caract173"),game.i18n.localize("liber.caract174"),game.i18n.localize("liber.caract175"),game.i18n.localize("liber.caract176"),game.i18n.localize("liber.caract177"),game.i18n.localize("liber.caract178"),game.i18n.localize("liber.caract179"),game.i18n.localize("liber.caract180"),game.i18n.localize("liber.caract181"),game.i18n.localize("liber.caract182"),game.i18n.localize("liber.caract183"),game.i18n.localize("liber.caract184"),game.i18n.localize("liber.caract185"),game.i18n.localize("liber.caract186"),game.i18n.localize("liber.caract187"),game.i18n.localize("liber.caract188"),game.i18n.localize("liber.caract189"),game.i18n.localize("liber.caract190"),game.i18n.localize("liber.caract191"),game.i18n.localize("liber.caract192"),game.i18n.localize("liber.caract193"),game.i18n.localize("liber.caract194"),game.i18n.localize("liber.caract195"),game.i18n.localize("liber.caract196"),game.i18n.localize("liber.caract197"),game.i18n.localize("liber.caract198"),game.i18n.localize("liber.caract199"),game.i18n.localize("liber.caract200"),game.i18n.localize("liber.caract201"),game.i18n.localize("liber.caract202"),game.i18n.localize("liber.caract203")]
        return this.getRandomItem(profession);
    }

    generateLoisir() {
        let loisir=[game.i18n.localize("liber.caract204"),game.i18n.localize("liber.caract205"),game.i18n.localize("liber.caract206"),game.i18n.localize("liber.caract207"),game.i18n.localize("liber.caract208"),game.i18n.localize("liber.caract209"),game.i18n.localize("liber.caract210"),game.i18n.localize("liber.caract211"),game.i18n.localize("liber.caract212"),game.i18n.localize("liber.caract213"),game.i18n.localize("liber.caract214"),game.i18n.localize("liber.caract215"),game.i18n.localize("liber.caract216"),game.i18n.localize("liber.caract217"),game.i18n.localize("liber.caract218"),game.i18n.localize("liber.caract219"),game.i18n.localize("liber.caract220"),game.i18n.localize("liber.caract221"),game.i18n.localize("liber.caract222"),game.i18n.localize("liber.caract223"),game.i18n.localize("liber.caract224")]
        return this.getRandomItem(loisir);
    }

    generateCaractere() {
        let caracterelist=[game.i18n.localize("liber.caract225"),game.i18n.localize("liber.caract226"),game.i18n.localize("liber.caract227"),game.i18n.localize("liber.caract228"),game.i18n.localize("liber.caract229"),game.i18n.localize("liber.caract230"),game.i18n.localize("liber.caract231"),game.i18n.localize("liber.caract232"),game.i18n.localize("liber.caract233"),game.i18n.localize("liber.caract234"),game.i18n.localize("liber.caract235"),game.i18n.localize("liber.caract236"),game.i18n.localize("liber.caract237")]
        return this.getRandomItem(caracterelist);
    }
    generatePerso() {
        let personnalitelist=[game.i18n.localize("liber.caract238"),game.i18n.localize("liber.caract239"),game.i18n.localize("liber.caract240"),game.i18n.localize("liber.caract241"),game.i18n.localize("liber.caract242"),game.i18n.localize("liber.caract243"),game.i18n.localize("liber.caract244"),game.i18n.localize("liber.caract245"),game.i18n.localize("liber.caract246"),game.i18n.localize("liber.caract247"),game.i18n.localize("liber.caract248"),game.i18n.localize("liber.caract249"),game.i18n.localize("liber.caract250"),game.i18n.localize("liber.caract251"),game.i18n.localize("liber.caract252"),game.i18n.localize("liber.caract253"),game.i18n.localize("liber.caract254"),game.i18n.localize("liber.caract255")]
        return this.getRandomItem(personnalitelist);
    }

    generateVision() {
        let visionlist=[game.i18n.localize("liber.caract256"),game.i18n.localize("liber.caract257"),game.i18n.localize("liber.caract258"),game.i18n.localize("liber.caract259"),game.i18n.localize("liber.caract260"),game.i18n.localize("liber.caract261"),game.i18n.localize("liber.caract262"),game.i18n.localize("liber.caract263"),game.i18n.localize("liber.caract264"),game.i18n.localize("liber.caract265"),game.i18n.localize("liber.caract266"),game.i18n.localize("liber.caract267"),game.i18n.localize("liber.caract268"),game.i18n.localize("liber.caract269"),game.i18n.localize("liber.avantrace62")]
        return this.getRandomItem(visionlist);
    }
    generateObjectif() {
        let objectiflist=[game.i18n.localize("liber.caract270"),game.i18n.localize("liber.caract271"),game.i18n.localize("liber.caract275"),game.i18n.localize("liber.caract273"),game.i18n.localize("liber.caract274"),game.i18n.localize("liber.caract275"),game.i18n.localize("liber.caract276"),game.i18n.localize("liber.caract277"),game.i18n.localize("liber.caract278")]
        return this.getRandomItem(objectiflist);
    }
    generateRacune() {
        let racunelist=[game.i18n.localize("liber.oui"),game.i18n.localize("liber.non"),game.i18n.localize("liber.bof")]
        return this.getRandomItem(racunelist);
    }
    generateTare() {
        let tarelist=[game.i18n.localize("liber.caract279"),game.i18n.localize("liber.caract280"),game.i18n.localize("liber.caract281"),game.i18n.localize("liber.caract282"),game.i18n.localize("liber.caract283"),game.i18n.localize("liber.caract284"),game.i18n.localize("liber.caract285"),game.i18n.localize("liber.caract286"),game.i18n.localize("liber.caract287"),game.i18n.localize("liber.caract288"),game.i18n.localize("liber.caract289"),game.i18n.localize("liber.caract290"),game.i18n.localize("liber.caract291"),game.i18n.localize("liber.caract292"),game.i18n.localize("liber.caract293"),game.i18n.localize("liber.caract294"),game.i18n.localize("liber.caract295"),game.i18n.localize("liber.caract296"),game.i18n.localize("liber.caract297"),game.i18n.localize("liber.caract298"),game.i18n.localize("liber.caract299"),game.i18n.localize("liber.caract300"),game.i18n.localize("liber.caract301"),game.i18n.localize("liber.caract302"),game.i18n.localize("liber.caract303"),game.i18n.localize("liber.caract304"),game.i18n.localize("liber.caract305"),game.i18n.localize("liber.caract306"),game.i18n.localize("liber.caract307"),game.i18n.localize("liber.caract308"),game.i18n.localize("liber.caract309"),game.i18n.localize("liber.caract310"),game.i18n.localize("liber.caract311"),game.i18n.localize("liber.caract312"),game.i18n.localize("liber.caract313"),game.i18n.localize("liber.caract314"),game.i18n.localize("liber.caract315"),game.i18n.localize("liber.caract316"),game.i18n.localize("liber.caract317"),game.i18n.localize("liber.caract318"),game.i18n.localize("liber.caract319"),game.i18n.localize("liber.caract320"),game.i18n.localize("liber.caract321"),game.i18n.localize("liber.caract322"),game.i18n.localize("liber.caract323"),game.i18n.localize("liber.caract324"),game.i18n.localize("liber.caract325"),game.i18n.localize("liber.caract326"),game.i18n.localize("liber.caract327"),game.i18n.localize("liber.caract328"),game.i18n.localize("liber.caract329"),game.i18n.localize("liber.caract330"),game.i18n.localize("liber.caract331"),game.i18n.localize("liber.caract332"),game.i18n.localize("liber.caract333"),game.i18n.localize("liber.caract334"),game.i18n.localize("liber.caract335"),game.i18n.localize("liber.caract336"),game.i18n.localize("liber.caract337"),game.i18n.localize("liber.caract338"),game.i18n.localize("liber.caract339"),game.i18n.localize("liber.caract340"),game.i18n.localize("liber.caract341"),game.i18n.localize("liber.caract342"),game.i18n.localize("liber.caract343"),game.i18n.localize("liber.caract344"),game.i18n.localize("liber.caract345"),game.i18n.localize("liber.caract346"),game.i18n.localize("liber.caract347"),game.i18n.localize("liber.caract348"),game.i18n.localize("liber.caract349"),game.i18n.localize("liber.caract350"),game.i18n.localize("liber.caract351"),game.i18n.localize("liber.caract352"),game.i18n.localize("liber.caract353"),game.i18n.localize("liber.caract354"),game.i18n.localize("liber.caract355"),game.i18n.localize("liber.caract356"),game.i18n.localize("liber.caract357"),game.i18n.localize("liber.caract358"),game.i18n.localize("liber.caract359"),game.i18n.localize("liber.caract360"),game.i18n.localize("liber.caract361"),game.i18n.localize("liber.caract362"),game.i18n.localize("liber.caract363"),game.i18n.localize("liber.caract364"),game.i18n.localize("liber.caract36"),game.i18n.localize("liber.caract366"),game.i18n.localize("liber.caract367"),game.i18n.localize("liber.caract368"),game.i18n.localize("liber.caract369"),game.i18n.localize("liber.caract370"),game.i18n.localize("liber.caract371"),game.i18n.localize("liber.caract372"),game.i18n.localize("liber.caract373"),game.i18n.localize("liber.caract374"),game.i18n.localize("liber.caract375"),game.i18n.localize("liber.caract376"),game.i18n.localize("liber.caract377"),game.i18n.localize("liber.caract378"),game.i18n.localize("liber.caract379"),game.i18n.localize("liber.caract380"),game.i18n.localize("liber.caract381"),game.i18n.localize("liber.caract382"),game.i18n.localize("liber.caract383"),game.i18n.localize("liber.caract384"),game.i18n.localize("liber.caract385"),game.i18n.localize("liber.caract386"),game.i18n.localize("liber.caract387"),game.i18n.localize("liber.caract388"),game.i18n.localize("liber.caract389"),game.i18n.localize("liber.caract390"),game.i18n.localize("liber.caract391"),game.i18n.localize("liber.caract392"),game.i18n.localize("liber.caract393"),game.i18n.localize("liber.caract394"),game.i18n.localize("liber.caract395"),game.i18n.localize("liber.caract396"),game.i18n.localize("liber.caract397"),game.i18n.localize("liber.caract398"),game.i18n.localize("liber.caract399"),game.i18n.localize("liber.caract400"),game.i18n.localize("liber.caract401"),game.i18n.localize("liber.caract402"),game.i18n.localize("liber.caract403"),game.i18n.localize("liber.caract404"),game.i18n.localize("liber.caract405"),game.i18n.localize("liber.caract406"),game.i18n.localize("liber.caract407"),game.i18n.localize("liber.caract408"),game.i18n.localize("liber.caract409"),game.i18n.localize("liber.caract410"),game.i18n.localize("liber.caract411"),game.i18n.localize("liber.caract412"),game.i18n.localize("liber.caract413"),game.i18n.localize("liber.caract414"),game.i18n.localize("liber.caract415"),game.i18n.localize("liber.caract416"),game.i18n.localize("liber.caract417"),game.i18n.localize("liber.caract418"),game.i18n.localize("liber.caract419"),game.i18n.localize("liber.caract420"),game.i18n.localize("liber.caract421"),game.i18n.localize("liber.caract422"),game.i18n.localize("liber.caract423"),game.i18n.localize("liber.caract424"),game.i18n.localize("liber.caract425"),game.i18n.localize("liber.caract426"),game.i18n.localize("liber.caract427"),game.i18n.localize("liber.caract428"),game.i18n.localize("liber.caract429"),game.i18n.localize("liber.caract430"),game.i18n.localize("liber.caract431")]
        return this.getRandomItem(tarelist);
    }
    generateObession() {
        let obsessionlist=[game.i18n.localize("liber.oui"),game.i18n.localize("liber.non"),game.i18n.localize("liber.bof")]
        return this.getRandomItem(obsessionlist);
    }
    generateDisting() {
        let distinguelist=[game.i18n.localize("liber.oui"),game.i18n.localize("liber.non"),game.i18n.localize("liber.bof")]
        return this.getRandomItem(distinguelist);
    }
}
