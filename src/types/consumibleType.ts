import CartaType from "./cartaType";
import EfectoType from "./efectoType";

export default interface ConsumibleType extends CartaType{
    efecto:EfectoType
    efectoHeroe:EfectoType|undefined
}