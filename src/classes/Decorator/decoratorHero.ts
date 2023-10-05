import HeroeType from "../../types/heroeType";
import HeroDecoratorBase from "./decoratorBase";

export default class HeroDecorator extends HeroDecoratorBase{
    private turnsRemaining:number = 0;
    private debugID = "";
    constructor(heroProperties: HeroeType, previousDecorator: HeroDecoratorBase,turnsRemaining:number,a:string) {
        super(heroProperties,previousDecorator);
        this.turnsRemaining = turnsRemaining;
        this.debugID = a;
    }

    override getPoder(): number {
        let myPreValue = this.previousDecorator != undefined  ? this.previousDecorator.getPoder() : 0;
        let myLocalValue = this.turnsRemaining == -1 || this.turnsRemaining > 0 ? this.heroProperties.poder : 0;
        return myLocalValue + myPreValue;
    }

    override getVida(): number {
        let myPreValue = this.previousDecorator != undefined  ? this.previousDecorator.getVida() : 0;
        let myLocalValue = this.turnsRemaining == -1 || this.turnsRemaining > 0 ? this.heroProperties.vida : 0;
        return myLocalValue + myPreValue;
    }

    override getDefensa(): number {
        let myPreValue = this.previousDecorator != undefined  ? this.previousDecorator.getDefensa() : 0;
        let myLocalValue = this.turnsRemaining == -1 || this.turnsRemaining > 0 ? this.heroProperties.defensa : 0;
        return myLocalValue + myPreValue;
    }

    override getAtaque(): number {
        let myPreValue = this.previousDecorator != undefined  ? this.previousDecorator.getAtaque() : 0;
        let myLocalValue = this.turnsRemaining == -1 || this.turnsRemaining > 0 ? this.heroProperties.ataqueBase : 0;
        return myLocalValue + myPreValue;
    }

    override getDano(): number {
        let myPreValue = this.previousDecorator != undefined  ? this.previousDecorator.getDano() : 0;
        let myLocalValue = this.turnsRemaining == -1 || this.turnsRemaining > 0 ? this.heroProperties.daño : 0;
        return myLocalValue + myPreValue;
    }

    override reduceTurnsRemaining():void{
        this.turnsRemaining = this.turnsRemaining > 0 && this.turnsRemaining != -1 ? this.turnsRemaining - 1 : 0;
        if(this.previousDecorator != undefined) this.previousDecorator.reduceTurnsRemaining();
    }
}