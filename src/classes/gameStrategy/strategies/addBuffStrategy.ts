import ConsumibleType from "../../../types/consumibleType";
import HeroeType from "../../../types/heroeType";
import GameStrategyInterface from "../interface/gameStrategyInterface";

export default class AddBuffStrategy implements GameStrategyInterface{
    strategyExecutable(data: ConsumibleType,registerDecorator:(data:HeroeType,validTurns:number)=>void,check:boolean) {
        
        let _efecto = check == false ? data.efecto : data.efectoHeroe;
        
        let tmpDecor = {
            poder: 0,
            vida: 0,
            defensa: 0,
            ataqueBase: 0,
            ataqueRnd: 0,
            daño: 0
        } as HeroeType;

        switch(_efecto?.estadistica){
            case "Ataque":
                tmpDecor.ataqueBase = _efecto.valorafectado;
                break;
            case "Defensa":
                tmpDecor.defensa = _efecto.valorafectado;
                break;
            case "Daño":
                tmpDecor.daño = _efecto.valorafectado;
                break;
            case "Vida":
                tmpDecor.vida = _efecto.valorafectado;
            break;
            case "Poder":
                tmpDecor.poder = _efecto.valorafectado;
            break;
        }
        registerDecorator(tmpDecor,Number(_efecto?.turnosvalidos));
    }
}