import CardModel from "./model/cardModel";

const test = new CardModel()
test.getHeroe("650f38ee7aaeb67f7dfc712e").then((response)=>{
    console.log(response)
})