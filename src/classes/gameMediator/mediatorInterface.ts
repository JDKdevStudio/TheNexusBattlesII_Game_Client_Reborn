import Component from "./componentClass";

export default interface Mediator{
    notify(sender:Component, event:string,args:any):void;
}