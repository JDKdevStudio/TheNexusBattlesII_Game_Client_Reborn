import $ from "jquery";

export default class InventoryView {
    private inventoryElement: JQuery<HTMLDivElement> = $(`
    <div class="card-body">
        <div class="container-fluid selection">
            <div class="row justify-content-center" id="cardlist">
            </div>
        </div>
    </div>
    <div class="card-footer">
        <div class="row justify-content-right">
            <div class="col-12">
                <button type="button" class="btn btn-nexus float-end" id="ready-button">Estoy listo!</button>
                <p><b>Héroe: 0/1<br>Armas: 0/8 | Armaduras: 0/4 | Ítems: 0/4 | Épicas: 0/14</b></p>
            </div>
        </div>
    </div>
    `)

    render = (node: JQuery<HTMLElement>): void => {
        node.append(this.inventoryElement)
    }

    getInventoryList = ():JQuery<HTMLElement>=>{
        return this.inventoryElement.find("#cardlist")
    }
}