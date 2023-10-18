import ConsumibleType from "../../../types/consumibleType";
import HeroeType from "../../../types/heroeType";
import { InventoryType } from "../types/inventoryType";

export default class InventoryModel {
    inventoryCardMap: Map<string, HeroeType | ConsumibleType> = new Map<string, HeroeType | ConsumibleType>
    inventorySelectedCardMap:Map<string,number> = new Map<string,number>

    getUserInventory = async (): Promise<InventoryType[]> => {
        //Falta logica del fetch a la api inventory
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
      "id": 26,
      "user": "Administrador",
      "id_carta": "650f38ee7aaeb67f7dfc712e",
      "quantity": 2,
      "type": "Heroes"
    },
    {
        "id": 27,
        "user": "Administrador",
        "id_carta": "650f38ee7aaeb67f7dfc712f",
        "quantity": 2,
        "type": "Heroes"
      },
      {
        "id": 28,
        "user": "Administrador",
        "id_carta": "650f390b7aaeb67f7dfc7134",
        "quantity": 2,
        "type": "Armas"
      }
  ]
`