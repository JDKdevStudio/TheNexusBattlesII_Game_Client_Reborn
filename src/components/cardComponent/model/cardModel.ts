import ConsumibleType from "../../../types/consumibleType";
import HeroeType from "../../../types/heroeType";

export default class CardModel {
    getHeroe = async (id: string): Promise<HeroeType> => {
        const apiUrl = `https://cards.thenexusbattles2.cloud/api/cartas/${id}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('No se pudo obtener el héroe'); 
            }
            return await (response.json() as Promise<HeroeType>);
        } catch (error) {
            throw error;
        }
    }

     getConsumible = async (id: string): Promise<ConsumibleType> => {
        const apiUrl = `https://cards.thenexusbattles2.cloud/api/cartas/${id}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('No se pudo obtener el héroe'); 
            }
            return await (response.json() as Promise<ConsumibleType>);
        } catch (error) {
            throw error;
        }
    }
}