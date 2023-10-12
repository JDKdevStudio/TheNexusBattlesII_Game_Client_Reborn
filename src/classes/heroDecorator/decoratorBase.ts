import HeroeType from "../../types/heroeType";
import HeroDecoratorInterface from "./decoratorInterface";

export default class HeroDecoratorBase implements HeroDecoratorInterface{
    heroProperties: HeroeType;
    previousDecorator: HeroDecoratorBase|undefined;

    constructor(heroProperties: HeroeType, previousDecorator: HeroDecoratorBase|undefined = undefined) {
        this.heroProperties = heroProperties;
        this.previousDecorator = previousDecorator;
    }

    reduceTurnsRemaining(): void {}

    getPoder(): number {
        return this.heroProperties.poder;
    }

    getVida(): number {
        return this.heroProperties.vida;
    }

    getDefensa(): number {
        return this.heroProperties.defensa;
    }

    getAtaque(): number {
        return this.heroProperties.ataqueBase;
    }

    getDano(): number {
        return this.heroProperties.daño;
    }
}