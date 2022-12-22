import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  totalPrice:number = 0;
  cardListFood:any[] =[];
  constructor() { }



  addToCard(food:any){
    food.quantity = 1;
    this.totalPrice = + food.price;
    this.cardListFood.push(food);
  }


  removeToCard(food:any){

    const index = this.cardListFood.indexOf(food);
    if (index > -1) {
      this.totalPrice = - food.price;
      this.cardListFood.splice(index, 1);
    }
  }


  updateCardList(food: any) {
    food.quantity = 1;
    this.totalPrice = food.quantity *food.price;
    const index = this.cardListFood.indexOf(food);
    if (index > -1) {
      this.cardListFood.splice(index, 1);
      // this.tailleCard = this.cardListFood.length;
    } else {

      food.quantity = 1;
      this.cardListFood.push(food);
      // this.tailleCard = this.cardListFood.length;
    }
  }

  incrementFoodQuantity(food:any){
    food.quantity  = food.quantity +1;
    this.totalPrice = food.quantity * food.price;
    console.log(this.totalPrice);
  }

  decrementQuantity(food:any){

    if(food.quantity > 1){

      food.quantity  = food.quantity -1;
      this.totalPrice = food.quantity * food.price;
    }

  }

  addOptionsToFood(foodId:number, options:any){
    const sharedCardFood = this.cardListFood.find(x => x.id == foodId);
    sharedCardFood["options"] = options;
    let index = this.cardListFood.indexOf(sharedCardFood);
    this.cardListFood[index]["options"] = options;
    this.totalPrice = + options.price;


  }

  removeOptionsToFood(foodId:number, options:any){
    const sharedCardFood = this.cardListFood.find(x => x.id == foodId);
    const optionsListe = sharedCardFood["options"];
    const index=  optionsListe.indexOf(options, 0);
    if(index > -1){
      this.cardListFood[index]["options"].splice(index, 1);
      this.totalPrice = -options.price;
    }
  }




}
