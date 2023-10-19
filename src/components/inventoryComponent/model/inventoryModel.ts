import ConsumibleType from "../../../types/consumibleType";
import HeroeType from "../../../types/heroeType";
import CardComponent from "../../cardComponent/cardComponent";
import { InventorySelectionType } from "../types/inventorySelectionType";
import { InventoryType } from "../types/inventoryType";
import Cookies from "js-cookie";

export default class InventoryModel {
  inventoryCardsInView: CardComponent[] = []
  inventoryCardMap: Map<string, HeroeType | ConsumibleType> = new Map<string, HeroeType | ConsumibleType>
  inventorySelectionData: InventorySelectionType = { heroe: [], armas: [], armaduras: [], items: [], epicas: [], epicasHeroe: [] }

  getUserInventory = async (): Promise<InventoryType[]> => {
      let headersList = {
        "Authorization": Cookies.get("access_token")!
       }
       
       let response = await fetch("https://webserver.thenexusbattles2.cloud/ver-inventario", { 
         method: "GET",
         headers: headersList
       });
       if (response.status==200) {
         const parsedResponse:InventoryType[] = JSON.parse(await response.text())
         return parsedResponse
       }
  
      const parsedResponse: InventoryType[] = JSON.parse(sample_response)
      return parsedResponse


  }

  getCard = async (data: string): Promise<HeroeType | ConsumibleType> => {
    const apiUrl = `https://cards.thenexusbattles2.cloud/api/cartas/${data}`;
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


const sample_response = `
[
    {
      "id": 25,
      "user": "Administrador",
      "id_carta": "650f38ee7aaeb67f7dfc712e",
      "quantity": 4,
      "type": "Heroes"
    },
    {
      "id": 26,
      "user": "Administrador",
      "id_carta": "652ef8533d80adc828993dbb",
      "quantity": 4,
      "type": "Heroes"
    },
    {
        "id": 27,
        "user": "Administrador",
        "id_carta": "650f38ee7aaeb67f7dfc712f",
        "quantity": 4,
        "type": "Heroes"
      },
      {
        "id": 28,
        "user": "Administrador",
        "id_carta": "650f390b7aaeb67f7dfc7134",
        "quantity": 4,
        "type": "Armas"
      },
      {
        "id": 29,
        "user": "Administrador",
        "id_carta": "650f390b7aaeb67f7dfc7140",
        "quantity": 4,
        "type": "Armaduras"
      },
      {
        "id": 30,
        "user": "Administrador",
        "id_carta": "650f390b7aaeb67f7dfc7146",
        "quantity": 4,
        "type": "Items"
      },
      {
        "id": 31,
        "user": "Administrador",
        "id_carta": "650f390b7aaeb67f7dfc714b",
        "quantity": 6,
        "type": "Epicas"
      },
      {
        "id": 31,
        "user": "Administrador",
        "id_carta": "650f390b7aaeb67f7dfc714e",
        "quantity": 6,
        "type": "Epicas"
      }
  ]
`