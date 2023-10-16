import ConsumibleType from "../../../types/consumibleType";
import HeroeType from "../../../types/heroeType";

export default class CardModel {
    getHeroe = async (data: string | HeroeType): Promise<HeroeType> => {
        if (typeof data != "string") {
            return data
        }
        const apiUrl = `https://cards.thenexusbattles2.cloud/api/cartas/${data}`;
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

    getConsumible = async (data: string | ConsumibleType): Promise<ConsumibleType> => {
        if (typeof data != "string") {
            return data
        }
        const apiUrl = `https://cards.thenexusbattles2.cloud/api/cartas/${data}`;
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