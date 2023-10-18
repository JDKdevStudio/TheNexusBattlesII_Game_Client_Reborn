import CardComponent from "../cardComponent/cardComponent";
import { CardStatusHandler } from "../cardComponent/enum/cardStatusEnum";
import InventoryController from "./controller/inventoryController";
import $ from "jquery";


const test = new InventoryController()
test.init($("#game-view"))
const cardContainer:JQuery<HTMLElement> = test.cardRender()
console.log(cardContainer)
const card1 = new CardComponent(test.cardRender(),CardStatusHandler.InventoryHeroe,"650f38ee7aaeb67f7dfc712e",true)
const card2 = new CardComponent(test.cardRender(),CardStatusHandler.InventoryConsumible,"650f390b7aaeb67f7dfc7134",true)
const card3 = new CardComponent(test.cardRender(),CardStatusHandler.InventoryConsumible,"650f390b7aaeb67f7dfc7134",true)
const card4 = new CardComponent(test.cardRender(),CardStatusHandler.InventoryConsumible,"650f390b7aaeb67f7dfc7134",true)
const card5 = new CardComponent(test.cardRender(),CardStatusHandler.InventoryConsumible,"650f390b7aaeb67f7dfc7134",true)
const card6 = new CardComponent(test.cardRender(),CardStatusHandler.InventoryConsumible,"650f390b7aaeb67f7dfc7134",true)





card1.controller.getCardNode().addClass("col-2 card-col")
card2.controller.getCardNode().addClass("col-2 card-col")
card3.controller.getCardNode().addClass("col-2 card-col")
card4.controller.getCardNode().addClass("col-2 card-col")
card5.controller.getCardNode().addClass("col-2 card-col")
card6.controller.getCardNode().addClass("col-2 card-col")



card1.controller.getCardNode().on("click", function(){
    alert("The paragraph was clicked.");
  });