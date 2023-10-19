import ConsumibleType from "../../../types/consumibleType";
import HeroeType from "../../../types/heroeType";
import GameStrategyInterface from "../interface/gameStrategyInterface";

export default class AddBuffStrategy implements GameStrategyInterface{
    strategyExecutable(data: ConsumibleType,registerDecorator:()=>void) {
        let tmpDecor = {} as HeroeType;
        switch(data.efecto.estadistica){
            case "Ataque":
                tmpDecor.ataqueBase = data.efecto.valorAfectado;
                break;
            case "Defensa":
                tmpDecor.defensa = data.efecto.valorAfectado;
                break;
            case "Daño":
                tmpDecor.daño = data.efecto.valorAfectado;
                break;
            case "Vida":
                tmpDecor.vida = data.efecto.valorAfectado;
            break;
            case "Poder":
                tmpDecor.poder = data.efecto.valorAfectado;
            break;
        }
        registerDecorator();
    }
}