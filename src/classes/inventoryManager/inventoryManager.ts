import CardComponent from "../../components/cardComponent/cardComponent"
import { CardOwner } from "../../components/cardComponent/enum/cardOwnerEnum";
import { CardStatusHandler } from "../../components/cardComponent/enum/cardStatusEnum";
import { InventoryToDeckType } from "../../components/inventoryComponent/types/inventoryToDeckType";
import ConsumibleType from "../../types/consumibleType";
import HeroeType from "../../types/heroeType";
import CardDraggableWrapper from "../cardDraggableWrapper/cardDraggableWrapper";
import { GameViewHandler } from "../viewHandlers/gameViewHandler";
import $ from "jquery";

export default class InventoryManager{
    currentGameCards:Map<string,CardComponent>;
    deckStoredCards:Array<string> = [];
    cardRepository:Map<string,HeroeType|ConsumibleType>;
    nodeConsumableControl:Map<JQuery<HTMLElement>,boolean>;

    private heroInitial:HeroeType;
    heroInitialID:string;
    
    updateDeckNumber:(ammount:string)=>void;

    constructor(private dialog: GameViewHandler,updateDeckNumber:(ammount:string)=>void) {
        this.updateDeckNumber = updateDeckNumber;
        this.currentGameCards = new Map<string,CardComponent>();
    }

    setFromInventory(deckStoredCards:Map<string,HeroeType|ConsumibleType>,fromInventory:InventoryToDeckType){
        this.cardRepository = deckStoredCards;
        this.deckStoredCards = fromInventory.consumibles;
        this.heroInitial =  this.cardRepository.get(fromInventory.heroe) as HeroeType;
        this.heroInitialID = fromInventory.heroe;
        this.updateDeckWithRemainingCards();
    }

    initializeFirstCards():void{
        for(let i = 0; i < 3; i ++) this.insertNewCardToActive();
    }

    insertNewCardToActive():void{
        const fromDeck:string|undefined = this.deckStoredCards.shift();

        if(fromDeck != undefined){
            const currentCard = new CardComponent($("#deckGameplay"),CardStatusHandler.GameConsumible,this.cardRepository.get(fromDeck) as ConsumibleType,CardOwner.Consumible,this.dialog);
            new CardDraggableWrapper(currentCard,true,this.cardRepository.get(fromDeck) as ConsumibleType);
            this.currentGameCards.set(fromDeck,currentCard);
        }
        this.updateDeckWithRemainingCards();
    }

    deleteCardFromActive(cardComponent:CardComponent):void{
        console.log(cardComponent.controller.getCardNode());
   
        this.updateDeckWithRemainingCards();
    }

    getLocalHeroData():HeroeType{
        return this.heroInitial;
    }

    updateDeckWithRemainingCards():void{
        this.updateDeckNumber(this.deckStoredCards.length.toString());
    }

    async getCardDataByID(id:string):Promise<HeroeType|ConsumibleType>{
        if(this.cardRepository.has(id)){
            return new Promise((resolve,_)=>{
                resolve(this.cardRepository.get(id) as HeroeType|ConsumibleType);
            }); 
        }else{
            const apiUrl = `https://cards.thenexusbattles2.cloud/api/cartas/${id}`;
            try {
              const response = await fetch(apiUrl);
              if (!response.ok) {
                throw new Error('No se pudo obtener el héroe');
              }
              return await (response.json() as Promise<HeroeType | ConsumibleType>);
            } catch (error) {
              throw error;
            }
        }
    }
} 