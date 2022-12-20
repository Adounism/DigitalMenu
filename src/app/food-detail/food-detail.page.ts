import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { FoodPage } from '../food/food.page';
import { HttpServices } from '../services/http-services.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {

  primary ="rgba(36,39,46,255)";
  params!: Object;
  pushPage: any;
  currentFoods:any;
  currentFoodId!:number;
  foodIngredients:any[] = [];
  foodsOptions:any[] = [];
  checkboxValue:any;
  totatDessertPrice:number= 0;
  optionsSelectedListe:any[]=[];
  BaseUrl= environment.ressoursseUrl;
  constructor(private services : HttpServices, private router:ActivatedRoute, public navCtrl: NavController) {
    this.currentFoodId = router.snapshot.params['id'];
    this.pushPage = FoodPage;
    this.params = { id: 42 };
   }

  ngOnInit() {
    this.getCurrentFoodData();
  }


  getCurrentFoodData(){
    this.services.getfindFoodsInCategorys(this.currentFoodId).subscribe(data=>{
      this.currentFoods = data;
      console.log(this.currentFoods.name);

    });
  }

  getAllOptions(){
    this.services.getAllOptions().subscribe(data=>{
      this.foodsOptions = data;
    });
  }


  addToCard(){
    // {
    // "itable": "string",
    // "foodOrders": [
    //   {
    //     "food": "string",
    //     "quantity": 0,
    //     "options": [
    //       "string"
    //     ]
    //   }
    // ]
    // }
    console.log(this.optionsSelectedListe);

  }

  issueAnOrder(){

  }

  optionsChecked(opt:any){
    if (this.checkboxValue) {
      console.log('Checkbox sélectionné');
      console.log(opt);
      this.optionsSelectedListe.push(opt);
      this.totatDessertPrice = +  opt.price;


    } else {
     const index=  this.optionsSelectedListe.indexOf(opt, 0);
      if(index > -1){
        this.optionsSelectedListe.splice(index, 1);
        this.totatDessertPrice = this.totatDessertPrice - opt.price;

      }
      console.log('Checkbox désélectionné');
    }

  }

  showFoodPge(){
    this.navCtrl.navigateForward(['/food']);
  }

  incrementQuantity(quantity:number){
    return quantity = +1;
  }

}
