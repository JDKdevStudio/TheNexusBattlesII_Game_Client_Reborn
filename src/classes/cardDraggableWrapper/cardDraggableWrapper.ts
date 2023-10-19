import CardComponent from "../../components/cardComponent/cardComponent";
import ConsumibleType from "../../types/consumibleType";

export default class CardDraggableWrapper{
    private cardComponent:CardComponent
    private consumibleData?:ConsumibleType
    private handleOnDrop:(data:ConsumibleType)=>void 

    constructor(cardComponent:CardComponent,isDraggableHandler:boolean,consumibleData?:ConsumibleType,handleOnDrop?:(data:ConsumibleType)=>void){
        this.cardComponent=cardComponent
        this.consumibleData=consumibleData
        this.init(isDraggableHandler)
        if(handleOnDrop != undefined)
        this.handleOnDrop = handleOnDrop;
    }

    init=(isDraggableHandler:boolean):void=>{
        if (isDraggableHandler) {
            this.cardComponent.controller.getCardNode().attr('draggable','true')
            this.cardComponent.controller.getCardNode().on("dragstart",(ev:JQuery.DragStartEvent)=>this.onDragFunction(ev))
        }else{
            this.cardComponent.controller.getCardNode().on('dragover',function(ev:JQuery.DragOverEvent){
                ev.preventDefault()
            })
            this.cardComponent.controller.getCardNode().on('drop',(ev:JQuery.DropEvent)=>this.onDropFunction(ev))
        }
    }

    onDragFunction=(ev:JQuery.DragStartEvent):void=>{
        const objectSerialized:string = JSON.stringify(this.consumibleData)
        ev.originalEvent?.dataTransfer?.setData("text/plain",objectSerialized)
    }

    onDropFunction=(ev:JQuery.DropEvent):void=>{
        const cardData:ConsumibleType=JSON.parse(ev.originalEvent!.dataTransfer!.getData("text/plain"));
        this.handleOnDrop(cardData);
    }
}