import CardComponent from "../../components/cardComponent/cardComponent"
import { CardStatusHandler } from "../../components/cardComponent/enum/cardStatusEnum";
import { InventoryToDeckType } from "../../components/inventoryComponent/types/inventoryToDeckType";
import ConsumibleType from "../../types/consumibleType";
import HeroeType from "../../types/heroeType";
import { GameViewHandler } from "../viewHandlers/gameViewHandler";

export default class InventoryManager{
    currentGameCards:Map<string,CardComponent>;
    deckStoredCards:string[];
    cardRepository:Map<string,HeroeType|ConsumibleType>;
    heroInitial:HeroeType;
    heroInitialID:string;

    constructor(private dialog: GameViewHandler) {}

    setFromInventory(deckStoredCards:Map<string,HeroeType|ConsumibleType>,fromInventory:InventoryToDeckType){
        this.cardRepository = deckStoredCards;
        this.deckStoredCards = fromInventory.consumibles;
        this.heroInitial =  this.cardRepository.get(fromInventory.heroe) as HeroeType;
        this.heroInitialID = fromInventory.heroe;
    }

    insertNewCardToActive():void{
        const fromDeck:string|undefined = this.deckStoredCards.shift();
        if(fromDeck != undefined){
            const currentCard = new CardComponent($("#deckGameplay"),CardStatusHandler.GameConsumible,{} as ConsumibleType,true,this.dialog);
            this.currentGameCards.set(fromDeck,currentCard);
        }
    }

    deleteCardFromActive(id:string):void{
        //TODO: BUSCA EL NODO, LO ELIMINA DEL DOM Y ELIMINA EL REGISTRO DEL MAPA
        this.currentGameCards.delete(id);
    }

    getLocalHeroData():HeroeType{
        return this.heroInitial;
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