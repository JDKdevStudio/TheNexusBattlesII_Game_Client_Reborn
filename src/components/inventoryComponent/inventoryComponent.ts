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