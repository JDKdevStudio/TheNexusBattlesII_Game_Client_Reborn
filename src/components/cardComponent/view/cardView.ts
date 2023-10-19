import $ from "jquery";
import HeroeType from "../../../types/heroeType";
import ConsumibleType from "../../../types/consumibleType";
import CardComponent from "../cardComponent";
import "../../../assets/icons/upgrade.svg"
import "../../../assets/icons/skip.svg"
import "../../../assets/icons/attack.svg"

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
    <div class="card cardComponent-small">
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
            <a id = "btnUpgrade"><svg width="16px" height="16px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M256 29.816l-231 154v106.368l231-154 231 154V183.816zm0 128.043L105 259.783v90.283l151-101.925 151 101.925v-90.283zm0 112l-87 58.725v67.6l87-58 87 58v-67.6zm0 89.957l-87 58v64.368l87-58 87 58v-64.368z"/></svg></a>
            <a id = "btnSkip"><svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="white" fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 0110.535-5.096l-9.131 9.131A6.472 6.472 0 011.5 8zm2.465 5.096a6.5 6.5 0 009.131-9.131l-9.131 9.131z" clip-rule="evenodd"/></svg></a>
            <a id = "btnAttack"><svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 2a1 1 0 0 1 2 0v2.062A8.004 8.004 0 0 1 19.938 11H22a1 1 0 0 1 0 2h-2.062A8.004 8.004 0 0 1 13 19.938V22a1 1 0 0 1-2 0v-2.062A8.004 8.004 0 0 1 4.062 13H2a1 1 0 0 1 0-2h2.062A8.004 8.004 0 0 1 11 4.062V2zm7 10a6 6 0 1 0-12 0 6 6 0 0 0 12 0zm-3 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="white"/></svg></a>
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