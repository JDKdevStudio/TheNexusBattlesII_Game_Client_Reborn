import $ from "jquery";
import HeroeType from "../../../types/heroeType";
import ConsumibleType from "../../../types/consumibleType";
import CardComponent from "../cardComponent";

export default class CardView {

    private cardElement: JQuery<HTMLDivElement> = $(`
    <div class="card cardComponent">
        <!--Sección: título de la carta-->
        <div class="container-fluid cardComponent-section cardComponent-text text-center" id="cardTitle"></div>
        <!--Sección: imagen de la carta-->
        <div class="container-fluid cardComponent-section">
            <img class="cardComponent-image" style="height: 100px;">
            <img class="cardComponent-icon">
        </div>
    </div>
    `)

    render = (node: JQuery<HTMLElement>, componentBreaker?: CardComponent): void => {
        node.append(this.cardElement);
        if (componentBreaker != undefined){
            $("#btnSkip").on("click",() => {
                console.log("Clicked on skip!")
                componentBreaker.notifyTurnSkip();
            });
        }
    }

    renderCardHeader = (cardData: HeroeType | ConsumibleType): void => {
        this.cardElement.find("#cardTitle").text(cardData.nombre.toString())
        this.cardElement.find(".cardComponent-image").attr("src", `https://cards.thenexusbattles2.cloud/assets/${cardData.imagen}`)
        this.cardElement.find(".cardComponent-icon").attr("src", cardData.icono)
    }

    renderCardDesc = (desc: string): void => {
        this.cardElement.append(`
        <!--Sección: descripción de la carta-->
        <div class="container-fluid cardComponent-section cardComponent-desc-text">
        ${desc}
        </div>
        `)
    }

    renderHeroeLifeBar = (life: number): void => {
        this.cardElement.append(`
        <!--Sección: barra de vida-->
        <div class="container-fluid cardComponent-lifebar">
            <span style="z-index: 1; font-size: xx-small;">${life}</span>
            <span class="cardComponent-lifebar-progress"></span>
        </div>
        `)
    }

    renderHeroeStats = (cardData: HeroeType): void => {
        this.cardElement.append(`
        <!--Sección: Estadísticas tipo héroe-->
        <div class="container-fluid cardComponent-section">
            <div class="cardComponent-heroe-section">
                <span class="cardComponent-heroe-text">Ataque: <span>${cardData.ataqueBase}</span></span>
                <span class="cardComponent-heroe-text">Daño: ${cardData.daño}</span>
            </div>
            <div class="cardComponent-heroe-section">
                <span class="cardComponent-heroe-text">Poder: ${cardData.poder}</span>
                <span class="cardComponent-heroe-text">Defensa: ${cardData.defensa}</span>
            </div>
        </div>
        `)
    }

    renderHeroeButtons = (): void => {
        this.cardElement.append(`
        <!--Sección: Botónes de interacción héroe-->
        <div class="cardComponent-section">
            <span class="cardComponent-heroe-text">Daño efectivo: 12</span>
            <img src="../assets/icons/upgrade.svg">
            <button type="button" class="btn" id = "btnSkip"><img src="../assets/icons/skip.svg"></button>
            <img src="../assets/icons/attack.svg">
        </div>
        `);
    }
}