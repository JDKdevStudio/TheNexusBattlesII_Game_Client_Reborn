import { InventoryType } from "../types/inventoryType";

export default class InventoryModel{

    getUserInventory = async():Promise<InventoryType[]>=>{
        //Falta logica del fetch a la api inventory
        const parsedResponse:InventoryType[] = JSON.parse(sample_response)
        return parsedResponse
    }
}


const sample_response = `
[
    {
      "id": 26,
      "user": "Administrador",
      "id_carta": "64e5830a09a1f203598f1801",
      "quantity": 1,
      "type": "Items"
    },
  ]
`