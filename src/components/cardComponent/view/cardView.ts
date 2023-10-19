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
            <img class="cardComponent-image" style="height: 120px;">
            <img class="cardComponent-icon">
        </div>
    </div>
    `)

    private smallCardElement:JQuery<HTMLDivElement>=$(`
    <div class="card cardComponent-small grow">
    <!--Sección: título de la carta-->
    <div class="container-fluid cardComponent-section-small cardComponent-text-small text-center" id="cardTitle"></div>
    <!--Sección: imagen de la carta-->
    <div class="container-fluid cardComponent-section-small">
        <img class="cardComponent-image" style="height: 120px;">
        <img class="cardComponent-icon">
    </div>
</div>
    `)

    get getCardElement() { return this.cardElement }
    get getSmallCardElement() { return this.smallCardElement }
    //Renders
    render = (node: JQuery<HTMLElement>,nodeToRender:JQuery<HTMLElement>, componentBreaker?: CardComponent): void => {
        node.append(nodeToRender);
        if (componentBreaker != undefined) {
            $("#btnSkip").on("click", () => {
                console.log("Clicked on skip!")
                componentBreaker.notifyTurnSkip();
            });

            $("#btnAttack").on("click", () => {
                console.log("En Guardia!")
                componentBreaker.notifyAttackButtonPressed();
            });
        }
    }

    renderCardHeader = (node:JQuery<HTMLElement>,cardData: HeroeType | ConsumibleType): void => {
        node.find("#cardTitle").text(cardData.nombre.toString())
        node.find(".cardComponent-image").attr("src", `https://cards.thenexusbattles2.cloud/assets/${cardData.imagen}`)
        node.find(".cardComponent-icon").attr("src", cardData.icono)
    }

    renderCardDesc = (desc: string): void => {
        this.cardElement.append(`
        <!--Sección: descripción de la carta-->
        <div class="container-fluid cardComponent-section cardComponent-desc-text">
        ${desc}
        </div>
        `)
    }

    renderSmallCardDesc = (desc: string): void => {
        this.smallCardElement.append(`
        <!--Sección: descripción de la carta-->
        <div class="container-fluid cardComponent-section-small cardComponent-desc-text-small">
        ${desc}
        </div>
        `)
    }

    renderHeroeLifeBar = (life: number): void => {
        this.cardElement.append(`
        <!--Sección: barra de vida-->
        <div class="container-fluid cardComponent-lifebar">
            <span style="z-index: 1; font-size: xx-small;" id="vida-stat">${life}</span>
            <span class="cardComponent-lifebar-progress" id="vida-bar-stat"></span>
        </div>
        `)
    }

    renderHeroeStats = (cardData: HeroeType): void => {
        this.cardElement.append(`
        <!--Sección: Estadísticas tipo héroe-->
        <div class="container-fluid cardComponent-section">
            <div class="cardComponent-heroe-section">
                <span class="cardComponent-heroe-text">Ataque: <span id="ataque-stat">${cardData.ataqueBase}</span></span>
                <span class="cardComponent-heroe-text">Daño: <span id="daño-stat">${cardData.daño}</span></span>
            </div>
            <div class="cardComponent-heroe-section">
                <span class="cardComponent-heroe-text">Poder: <span id="poder-stat">${cardData.poder}</span></span>
                <span class="cardComponent-heroe-text">Defensa: <span id="defensa-stat">${cardData.defensa}</span></span>
            </div>
        </div>
        `)
    }

    renderHeroeActionBar = (): void => {
        this.cardElement.append(`
        <!--Sección: Botónes de interacción héroe-->
        <div class="cardComponent-section" id="card-actions">
            <span class="cardComponent-heroe-text">Daño efectivo: <span id="daño-efectivo-stat">12</span></span>
        </div>
        `);
    }

    renderHeroeButtons = (): void => {
        this.cardElement.find("#card-actions").append(`
            <a id = "btnUpgrade"><img src="../assets/icons/upgrade.svg"></a>
            <a id = "btnSkip"><img src="../assets/icons/skip.svg"></a>
            <a id = "btnAttack"><img src="../assets/icons/attack.svg"></a>
            `);
    }

    //Updates
    updatePlayerName = (name: string): void => {
        this.cardElement.find("#cardTitle").text(name)
    }

    getToUpdateStats = (stat: string): JQuery<HTMLElement> => {
        return this.cardElement.find(`#${stat}-stat`)
    }
}