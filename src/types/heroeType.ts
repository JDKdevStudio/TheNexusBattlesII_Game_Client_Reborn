import CartaType from "./cartaType";

export default interface HeroeType extends CartaType {
    poder: number,
    vida: number,
    defensa: number,
    ataqueBase: number,
    ataqueRnd: number,
    daño: number
}