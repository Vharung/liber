export class LiberItemSheet extends ItemSheet{
    get template(){
        console.log(`Liber | Récupération du fichier html ${this.item.type}-sheet.`);

        return `systems/liber/templates/sheets/${this.item.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);

        return data;
    }
}