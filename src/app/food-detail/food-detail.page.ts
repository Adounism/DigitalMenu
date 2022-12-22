import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal, ModalController, NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { FoodPage } from '../food/food.page';
import { ModalPage } from '../modal/modal.page';
import { HttpServices } from '../services/http-services.service';
import { SharedService } from '../services/shared.service';


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
  cardListe:any[]=[];
  foodInCategory:any[]=[];
  tableId:any;
  showModal:boolean = false;
  totalPrice:number = 0;
  BaseUrl= environment.ressoursseUrl;
  @ViewChild('modal', { static: false }) modal!: ModalController;
  constructor(private services : HttpServices,  router:ActivatedRoute,
     public navCtrl: NavController, private sharedService:SharedService,
     private modalController: ModalController) {
    this.currentFoodId = router.snapshot.params['id'];
    this.pushPage = FoodPage;
    this.params = { id: 42 };
   }

  ngOnInit() {
    this.getCurrentFoodData();
    this.tableId = localStorage.getItem("table");
    console.log(this.tableId);

  }


 async getCurrentFoodData(){
    console.log(this.currentFoodId);

    // this.currentFoods = this.sharedService.cardListFood.find(x => x.id == this.currentFoodId);

    // console.log(this.currentFoodId);


    await this.services.getfindFoodsInCategorys(this.currentFoodId).subscribe(data=>{
      this.currentFoods = data;
      this.getAllFoodIncategory(data.category?.name);

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

    this.sharedService.addToCard(this.currentFoods);
    this.cardListe = this.sharedService.cardListFood;
    this.totalPrice = this.sharedService.totalPrice;
    console.log(this.optionsSelectedListe);

  }

  issueAnOrder(){

  }

  optionsChecked(opt:any){
    if (this.checkboxValue) {

      this.cardListe = this.sharedService.cardListFood;
      this.sharedService.addOptionsToFood(this.currentFoodId, this.optionsSelectedListe )
      console.log();

      this.optionsSelectedListe.push(opt);
      this.totatDessertPrice = +  opt.price;


    } else {
      this.sharedService.removeOptionsToFood(this.currentFoodId, opt)
    //  const index=  this.optionsSelectedListe.indexOf(opt, 0);
    //   if(index > -1){
    //     this.optionsSelectedListe.splice(index, 1);
    //     this.totatDessertPrice = this.totatDessertPrice - opt.price;

    //   }
      console.log('Checkbox désélectionné');
    }

  }

  showFoodPge(){
    this.navCtrl.navigateForward(['/food']);
  }

  incrementQuantity(food:any){
    this.sharedService.incrementFoodQuantity(food)
    this.totalPrice = this.sharedService.totalPrice;
  }

  decrementQuantity(food:any){
    this.sharedService.decrementQuantity(food);
    this.totalPrice = this.sharedService.totalPrice;
  }


  removeFoodToCard(food:any){
    this.sharedService.removeToCard(food);
    this.totalPrice = this.sharedService.totalPrice;
  }

  getAllFoodIncategory(category:string){
    this.services.getFoodInCategorys(category).subscribe(data=>{
      this.foodInCategory= data;
      console.log(this.foodInCategory);

    })
  }

  orderFoods(){
    this.cardListe.forEach(food => {


      this.totalPrice = + food.price;
      let options = [];
      let optionsInFood= food.options;
      if(food.options){

        for(let opt of optionsInFood){
          options.push("api/options/"+opt.id);

        }
      }
    let order :any =  {
        // "itable": "api/tables/"+this.tableId,
        "foodOrders" : [
          {
            "food": "api/food/"+ parseInt(food.id),
            "quantity": food.quantity,
            "options":options
          }
        ]

      }


    console.log(order);
     this.services.makeOrdering(order).then(data=>{

      this.showModal = true;

     }).catch(error=>{

     })

    });


  }


  showDetailPage(id:number){
    this.navCtrl.navigateForward(['/food-detail/'+id ]);
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: 'example-modal',

      componentProps: {
        modal: 'modal'
        }
    });
    return await modal.present();
  }


  async closeModal() {
    await this.modal.dismiss();
    }



}
