import CardComponent from "../../components/cardComponent/cardComponent"
import { CardStatusHandler } from "../../components/cardComponent/enum/cardStatusEnum";
import ConsumibleType from "../../types/consumibleType";
import HeroeType from "../../types/heroeType";
import Component from "../gameMediator/componentClass"
import Mediator from "../gameMediator/mediatorInterface";
import { GameViewHandler } from "../viewHandlers/gameViewHandler";

export default class InventoryManager extends Component{
    currentGameCards:Map<string,CardComponent>;
    deckStoredCards:string[];
    cardRepository:Map<string,HeroeType|ConsumibleType>;

    constructor(dialog: Mediator) {
        super(dialog);
    }

    setFromInventory(deckStoredCards:string[], cardRepository:Map<string,HeroeType|ConsumibleType>){
        this.deckStoredCards = deckStoredCards;
        this.cardRepository = cardRepository;
    }

    insertNewCardToActive():void{
        const fromDeck:string|undefined = this.deckStoredCards.shift();
        if(fromDeck != undefined){
            const currentCard = new CardComponent($("#deckGameplay"),CardStatusHandler.GameConsumible,fromDeck,true,
                this.dialog.notify(this,"createGameCards",{}) as unknown as GameViewHandler);
            this.currentGameCards.set(fromDeck,currentCard);
        }
    }

    deleteCardFromActive(id:string):void{
        //TODO: BUSCA EL NODO, LO ELIMINA DEL DOM Y ELIMINA EL REGISTRO DEL MAPA
        this.currentGameCards.delete(id);
    }
} 