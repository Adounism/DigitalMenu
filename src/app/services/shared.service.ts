import { Injectable } from '@angular/core';
import { Card } from '../model/card';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  totalPrice: number = 0;
  cardListFood: any[] = [];
  optionsliste: any[] = [];
  cardListOptions: Card[] = [];

  constructor() {}

  addToCard(food: any) {
    let cartItem: any = {};
    cartItem['food'] = food;
    cartItem['quantity'] = 1;
    cartItem['options'] = [];
    let currentCartFood = this.cardListFood.find((c:any)=>c['food']===food)
    this.totalPriceCalcul();
    if (currentCartFood) {
      currentCartFood["quantity"]+=1;
      this.cardListFood = [...this.cardListFood.filter((c:any)=>c['food']!==food),currentCartFood]
    }else{
      this.cardListFood.push(cartItem);
    }

  }

  removeToCard(food: any) {
    const index = this.cardListFood.indexOf(food);
    if (index > -1) {
      // this.totalPrice = - (food.price / 100);
      this.cardListFood.splice(index, 1);
      this.totalPriceCalcul();

      // this.toTalPriceCalcul(this.cardListFood);
    }
  }


  updateCardList(food: any) {
    food.quantity = 1;
    this.totalPrice = food.quantity * (food.price / 100);
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

  incrementFoodQuantity(food: any) {
    food.quantity = food.quantity + 1;
    this.totalPriceCalcul();
  }

  decrementQuantity(food: any) {
    if (food.quantity > 1) {
      food.quantity = food.quantity - 1;

      this.totalPriceCalcul();
    }
  }

  addOptionsToFood(foodId: number, options: any) {
    const sharedCardFood = this.cardListFood.find((x) => x.id == foodId);
    sharedCardFood['options'] = options;
    let index = this.cardListFood.indexOf(sharedCardFood);
    this.cardListFood[index]['options'] = options;
    this.totalPrice = this.totalPrice + options.price / 100;
    this.totalPriceCalcul();
  }

  removeOptionsToFood(foodId: number, options: any) {
    const sharedCardFood = this.cardListFood.find((x) => x.id == foodId);
    const optionsListe = sharedCardFood['options'];
    const index = optionsListe.indexOf(options, 0);

    if (index > -1) {
      this.cardListFood[index]['options'].splice(index, 1);
      this.totalPrice = this.totalPrice - options.price / 100;
      this.totalPriceCalcul();
    }
  }

  clearSharedData() {
    this.cardListFood = [];
    this.totalPrice = 0;
  }

  totalPriceCalcul() {
    let tPrice = 0;
    this.cardListFood.forEach((element: any) => {

      tPrice = tPrice + element.quantity * (element['food']['price'] / 100);
      if (element && element.options) {
          element.options.forEach((op:any) =>{
          tPrice = tPrice + (op.price / 100);
          console.log(tPrice);

        })

        // for (let opt of element['options']) {
        //   console.log(opt);

        //   tPrice = tPrice + (opt.price / 100);
        // }
      }
    });

    // console.log(tPrice);


    return tPrice;
  }

  findFood(foodId: number) {
    // const sharedCardFood = this.cardListFood.find((x) => x.id == foodId);
    // debugger
    // this.getFoodOptions(sharedCardFood);
  }

  getFoodOptions(food: any) {
    let optId: string[] = [];
    food.options.forEach((element: any) => {
      optId.push('api/options/' + element.id);
    });
    console.log(optId);
  }

  saveFoodInListe(id: any) {
    let optId = [];
    optId.push('api/options/' + id);
    console.log(optId);
  }

  //NEW METHODE FOR FOOD OPTIONS
  addOptions(foodId: number, options: any) {
    // let option: string = '/api/food_options/' + options['id'];
    let currentCartFood = this.cardListFood.find(
      (f: any) => f['food']?.['id'] == foodId
    );
    if (currentCartFood) {
      if (currentCartFood['options'].includes(options)) {
        currentCartFood['options'] = [
          ...currentCartFood['options'].filter((o: any) => o !== options),
        ];
      } else {
        currentCartFood['options'].push(options);
      }
    }
    console.log(currentCartFood);
  }

  addInListeOptions(commande: any) {
    const foodOption = commande;
    console.log(foodOption);

    let options = [];
    options.push('api/options/' + commande);
  }
}
