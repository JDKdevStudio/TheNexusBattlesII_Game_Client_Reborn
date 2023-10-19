import $ from "jquery";
import { InventorySelectionType } from "../types/inventorySelectionType";

export default class InventoryView {
    private inventoryElement: JQuery<HTMLDivElement> = $(`
        <div class="selection">
            <div class="row justify-content-center" id="cardlist">
            </div>
        </div>
    `);

    private footerElement: JQuery<HTMLDivElement> = $(`
    <div class="card-footer">
            <div class="d-flex flex-row justify-content-between align-items-center">
            <p class="h6"><b id="footer-info">Héroes: 0/1 | Armas: 0/2 | Armaduras: 0/1 | Ítems: 0/1 | Épicas: 0/5 | Épicas Héroe: 0/4</b></p>
            <button type="button" class="btn btn-nexus" id="ready-button">Estoy listo!</button>
            </div>
    </div>
`);

    render = (node: JQuery<HTMLElement>): void => {
        node.append(this.inventoryElement)
        node.parent().append(this.footerElement)
    }

    updateFooterActions=(a:InventorySelectionType):void=>{
        this.footerElement.find("#footer-info").text(`Héroes: ${a.heroe.length}/1 | Armas: ${a.armas.length}/2 | Armaduras: ${a.armaduras.length}/1 | Ítems: ${a.items.length}/1 | Épicas: ${a.epicas.length}/5 | Épicas Héroe: ${a.epicasHeroe.length}/4`)
    }

    getInventoryList = ():JQuery<HTMLElement>=>{
        return this.inventoryElement.find("#cardlist")
    }

    addActionButtonListener = (func:Function):void=>{
        this.footerElement.find("#ready-button").on("click",()=>func())
    }

    deleteRenderFooter(){
        this.footerElement.remove();
    }
}