import ConsumibleType from "../../../types/consumibleType";
import HeroeType from "../../../types/heroeType";

export default class InventoryModel{

    getUserInventory = async():Promise<HeroeType[]|ConsumibleType[]>=>{
        return []
    }
}