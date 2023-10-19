import gameStrategyInterface from "../interface/gameStrategyInterface";

export default class StrategyContext{
    strategy:gameStrategyInterface;

    constructor(){}

    setStrategy(newStrategy:gameStrategyInterface):void{
        this.strategy = newStrategy;
    }

    executeStrategy(data:any):void{
        this.strategy.strategyExecutable(data);
    }
}