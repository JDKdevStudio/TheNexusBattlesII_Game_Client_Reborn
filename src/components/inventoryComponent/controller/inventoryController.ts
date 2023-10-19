import ConsumibleType from "../../../types/consumibleType";
import HeroeType from "../../../types/heroeType";
import CardComponent from "../../cardComponent/cardComponent";
import { CardOwner } from "../../cardComponent/enum/cardOwnerEnum";
import { CardStatusHandler } from "../../cardComponent/enum/cardStatusEnum";
import ModalGeneral from "../../modalGeneral/modalGeneral";
import InventoryModel from "../model/inventoryModel";
import { InventorySelectionType } from "../types/inventorySelectionType";
import { InventoryToDeckType } from "../types/inventoryToDeckType";
import { InventoryType } from "../types/inventoryType";
import InventoryView from "../view/inventoryView";

export default class InventoryController {
    functionBreaker:(args:any)=>void;
    constructor(private readonly view: InventoryView = new InventoryView(), private readonly model: InventoryModel = new InventoryModel()) { }

    init = (node: JQuery<HTMLElement>,sendControllerDataToMediator:(args:any)=>void): void => {
        this.view.addActionButtonListener(this.inventoryToGame)
        this.view.render(node)
        this.functionBreaker = sendControllerDataToMediator;
        this.inventoryRender()
    }


    private inventoryRender = async (): Promise<void> => {
        const response = await this.model.getUserInventory();
        await Promise.all(response.map(async (item: InventoryType) => {
            const cardType = item.type === "Heroes" ? CardStatusHandler.InventoryHeroe : CardStatusHandler.InventoryConsumible;
            for (let index = 0; index < item.quantity; index++) {
                await this.cardRender(cardType, item.id_carta);
            }
        }));
    };

    private cardRender = async (cardType: CardStatusHandler, cardId: string): Promise<void> => {
        if (!this.model.inventoryCardMap.has(cardId)) {
            const cardData = await this.model.getCard(cardId);
            this.model.inventoryCardMap.set(cardId, cardData);
        }
        const cardData = this.model.inventoryCardMap.get(cardId)!;
        const card = new CardComponent(this.view.getInventoryList(), cardType, cardData, CardOwner.Consumible);
        const cardNode = card.controller.getCardNode();
        cardNode.addClass("col-2 card-col");
        cardNode.on("click", () => this.validateCardSelection(card, cardData));
        this.model.inventoryCardsInView.push(card)
    };

    private validateCardSelection = (cardObject: CardComponent, cardData: HeroeType | ConsumibleType): void => {
        //Primero validar que ya haya un héroe seleccionado
        if (!this.checkHeroeSelection(cardData.coleccion)) { return }
        //Validar que la carta seleccionada sea de la clase y del tipo del héroe (a menos que sea épica)
        if (!this.checkCardTypeOfHeroe(cardData.coleccion, cardData.clase, cardData.tipo)) { return }
        //Ahora un object para manejar las selecciones según el tipo de carta que se clickea
        const cardSelectionHandler: { [key: string]: () => void } = {
            "Heroes": () => {
                const cardSelected = cardObject.controller.getCardSelection()
                if (cardSelected) { return this.resetSelection() }
                if (this.isCardMaxSelection(this.model.inventorySelectionData.heroe, cardSelected, 1, cardData.coleccion)) { return }
                //De lo contrario, cambiar el estado de la carta y actualizar el mapa de selección
                this.updateCardSelection(cardObject.controller.setCardSelection(), this.model.inventorySelectionData.heroe, cardData._id)
            },
            "Armas": () => {
                const cardSelected = cardObject.controller.getCardSelection()
                if (this.isCardMaxSelection(this.model.inventorySelectionData.armas, cardSelected, 2, cardData.coleccion)) { return }
                //De lo contrario, cambiar el estado de la carta y actualizar el mapa de selección
                this.updateCardSelection(cardObject.controller.setCardSelection(), this.model.inventorySelectionData.armas, cardData._id)
            },
            "Armaduras": () => {
                const cardSelected = cardObject.controller.getCardSelection()
                if (this.isCardMaxSelection(this.model.inventorySelectionData.armaduras, cardSelected, 1, cardData.coleccion)) { return }
                //De lo contrario, cambiar el estado de la carta y actualizar el mapa de selección
                this.updateCardSelection(cardObject.controller.setCardSelection(), this.model.inventorySelectionData.armaduras, cardData._id)
            },
            "Items": () => {
                const cardSelected = cardObject.controller.getCardSelection()
                if (this.isCardMaxSelection(this.model.inventorySelectionData.items, cardSelected, 1, cardData.coleccion)) { return }
                //De lo contrario, cambiar el estado de la carta y actualizar el mapa de selección
                this.updateCardSelection(cardObject.controller.setCardSelection(), this.model.inventorySelectionData.items, cardData._id)
            },
            "Epicas": () => {
                const cardSelected = cardObject.controller.getCardSelection()
                const heroeData = this.model.inventoryCardMap.get(this.model.inventorySelectionData.heroe[0])!
                if (heroeData.clase == cardData.clase && heroeData.tipo == cardData.tipo) {
                    if (this.isCardMaxSelection(this.model.inventorySelectionData.epicasHeroe, cardSelected, 4, cardData.coleccion + " Héroe")) { return }
                    this.updateCardSelection(cardObject.controller.setCardSelection(), this.model.inventorySelectionData.epicasHeroe, cardData._id)
                } else {
                    if (this.isCardMaxSelection(this.model.inventorySelectionData.epicas, cardSelected, 5, cardData.coleccion)) { return }
                    this.updateCardSelection(cardObject.controller.setCardSelection(), this.model.inventorySelectionData.epicas, cardData._id)
                }
            }
        }
        cardSelectionHandler[cardData.coleccion]()
    }

    private checkHeroeSelection = (cardCollection: string): boolean => {
        if (this.model.inventorySelectionData.heroe.length == 0 && cardCollection != "Heroes") {
            const modal = new ModalGeneral("Error Inventario", "Primero debes seleccionar un héroe para elegir otras cartas")
            modal.toggleModal()
            return false
        }
        return true
    }

    private checkCardTypeOfHeroe = (cardCollection: string, cardClass: string, cardType: string): boolean => {
        if (cardCollection == "Heroes" || cardCollection == "Epicas") { return true }
        const heroeData = this.model.inventoryCardMap.get(this.model.inventorySelectionData.heroe[0])!
        if (heroeData.clase != cardClass || heroeData.tipo != cardType) {
            const modal = new ModalGeneral("Error Inventario", "La carta que intentas seleccionar no coincide con el con la clase y el tipo de tu héroe elegido")
            modal.toggleModal()
            return false
        }
        return true
    }

    private isCardMaxSelection = (cardArray: string[], isCardSelected: boolean, maxCardSelection: number, cardType: string): boolean => {
        //Validar que no exceda el máximo de selecciones posibles
        if (cardArray.length == maxCardSelection && !isCardSelected) {
            const modal = new ModalGeneral("Error Inventario", `"Ya seleccionaste el máximo de ${cardType} posibles"`)
            modal.toggleModal()
            return true
        }
        return false
    }

    private updateCardSelection = (cardSelection: boolean, cardArray: string[], cardId: string): void => {
        if (cardSelection) {
            cardArray.push(cardId)
            this.view.updateFooterActions(this.model.inventorySelectionData)
        } else {
            cardArray.splice(cardArray.indexOf(cardId), 1)
            this.view.updateFooterActions(this.model.inventorySelectionData)
        }
    }

    private resetSelection = (): void => {
        this.model.inventoryCardsInView.map((card: CardComponent) => {
            if (card.controller.getCardSelection()) { card.controller.setCardSelection() }
        })
        const resetData = { armaduras: [], armas: [], epicas: [], epicasHeroe: [], heroe: [], items: [] }
        this.model.inventorySelectionData = resetData
        this.view.updateFooterActions(resetData)
    }

    private multiplyCardArrays = (array: string[], veces: number): string[] => {
        const newArray = array.flatMap(elemento => Array(veces).fill(elemento));
        return newArray;
    }

    private inventoryToGame = (): void => {
        const scd: InventorySelectionType = this.model.inventorySelectionData //SelectedCardData
        if (scd.heroe.length != 1 || scd.armas.length != 2 || scd.armaduras.length != 1 || scd.items.length != 1 || scd.epicas.length != 5 || scd.epicasHeroe.length != 4) {
            const modal = new ModalGeneral("Error Inventario", "Aún te falta seleccionar cartas para iniciar la partida")
            return modal.toggleModal()
        }
        const deckGenerated: InventoryToDeckType = { heroe: this.model.inventorySelectionData.heroe[0], consumibles: [] }
        //función para duplicar elementos
        deckGenerated.consumibles = [
            ...this.multiplyCardArrays(scd.armas, 4),
            ...this.multiplyCardArrays(scd.armaduras, 4),
            ...this.multiplyCardArrays(scd.items, 4),
            ...this.multiplyCardArrays(scd.epicas, 2),
            ...scd.epicasHeroe
        ]
        //shuffle consumibles
        const currentSeconds = new Date().getSeconds();
        deckGenerated.consumibles.sort(() => Math.floor(Math.random() * currentSeconds - 0.5));
        
        this.functionBreaker({
            cardDictionary: this.model.inventoryCardMap,
            cardDeck: deckGenerated
        });
        this.view.deleteRenderFooter();
        //Integración a la stateMachine/InventoryManager here--->
    }
}