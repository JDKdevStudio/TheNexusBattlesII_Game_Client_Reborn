import GameStrategyInterface from "../interface/gameStrategyInterface";

export default class StrategyContext{
    strategy:GameStrategyInterface;

    constructor(){}

    setStrategy(newStrategy:GameStrategyInterface):void{
        this.strategy = newStrategy;
    }

    executeStrategy(data:any,registerDecorator:any):void{
        this.strategy.strategyExecutable(data,registerDecorator);
    }
}