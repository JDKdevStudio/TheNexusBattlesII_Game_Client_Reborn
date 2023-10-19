import CardDraggableWrapper from "../classes/cardDraggableWrapper/cardDraggableWrapper";
import CardComponent from "../components/cardComponent/cardComponent";
import { CardStatusHandler } from "../components/cardComponent/enum/cardStatusEnum";
import ConsumibleType from "../types/consumibleType";
import HeroeType from "../types/heroeType";
import $ from "jquery"

const dataSample:HeroeType = JSON.parse(`
{
    "_id": "650f38ee7aaeb67f7dfc712e",
    "ataqueBase": 10,
    "ataqueRnd": 6,
    "clase": "Guerrero",
    "coleccion": "Heroes",
    "daño": 4,
    "defensa": 11,
    "descripcion": "Un titán blindado que marcha imparable, aplastando a sus enemigos.",
    "descuento": 15,
    "estado": true,
    "icono": "https://img.icons8.com/fluency/48/armored-helmet.png",
    "imagen": "1697634115114051321_248.webp",
    "nombre": "Guerrero Tanque",
    "poder": 1,
    "precio": 50000,
    "stock": 0,
    "tipo": "Tanque",
    "vida": 24
  }
`)

const consumibleSample:ConsumibleType = JSON.parse(`
{
    "_id": "650f390b7aaeb67f7dfc7134",
    "clase": "Guerrero",
    "coleccion": "Armas",
    "descripcion": "Espada de una mano. Aumenta el ataque en +1. Versátil y letal en combate, perfecta para movimientos rápidos y precisos",
    "descuento": 15,
    "efecto": {
      "estadistica": "Ataque",
      "id_estrategia": 0,
      "turnosValidos": -1,
      "valorAfectado": 1
    },
    "efectoHeroe": null,
    "estado": true,
    "icono": "",
    "imagen": "1697601658051183131_802.webp",
    "nombre": "Espada de una mano",
    "precio": 65000,
    "stock": 0,
    "tipo": "Tanque"
  }
`)

const testCard = new CardComponent($("body"),CardStatusHandler.GameHeroe,dataSample,false)
const ConsumibleCard = new CardComponent($("body"),CardStatusHandler.GameConsumible,consumibleSample,false)


const wrapReceptorCard = new CardDraggableWrapper(testCard,false)
const wrapDraggableCard = new CardDraggableWrapper(ConsumibleCard,true,consumibleSample)