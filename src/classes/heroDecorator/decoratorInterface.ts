import HeroeType from "../../types/heroeType";
import HeroDecoratorBase from "./decoratorBase";

export default interface HeroDecoratorInterface{
    heroProperties:HeroeType;
    previousDecorator: HeroDecoratorBase|undefined;
    
    getPoder():number;
    getVida():number;
    getDefensa():number;
    getAtaque():number;
    getDano():number;
    reduceTurnsRemaining():void
}