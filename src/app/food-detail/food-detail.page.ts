import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
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
  loading:any;
  BaseUrl= environment.ressoursseUrl;
  disable = true;
  @ViewChild('modal', { static: false }) modal!: ModalController;
  constructor(private services : HttpServices,  router:ActivatedRoute,
    private loadingCtrl: LoadingController,
     public navCtrl: NavController, private sharedService:SharedService,
     public toastController: ToastController,
     private route: Router,
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

  ionViewWillEnter() {
    this.cardListe = this.sharedService.cardListFood;
    this.totalPrice = this.sharedService.totalPrice;

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
    this.disable = false;

    this.sharedService.addToCard(this.currentFoods);
    this.cardListe = this.sharedService.cardListFood;
    this.totalPrice = this.sharedService.totalPrice;
    let message =  "Article ajouter au panier.";
    let color = 'success'
    this.presentToast(message, color);
    console.log(this.optionsSelectedListe);

  }

  issueAnOrder(){

  }

  optionsChecked(opt:any){
    if(this.cardListe.length > 0){

      this.disable = false;
      if (this.checkboxValue) {

        this.cardListe = this.sharedService.cardListFood;



        this.sharedService.addOptionsToFood(this.currentFoodId, this.optionsSelectedListe )

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
    }else{
      this.disable = true;
    }


  }

  showFoodPge(){
    // this.navCtrl.navigateBack(['/food']);
    this.navCtrl.back();
  }

  async showLoading() {
     this.loading = await this.loadingCtrl.create({
      message: 'Un instant votre commnande est cours...',
      duration: 3000,
    });

    this.loading.present();
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

    this.showLoading();
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
        "itable": "api/tables/"+this.tableId,
        "foodOrders" : [
          {
            "food": "api/food/"+ parseInt(food.id),
            "quantity": food.quantity,
            "options":options
          }
        ]

      }
     this.services.makeOrdering(order).then(data=>{


      this.loadingCtrl.dismiss();
      this.showModal = true;
      this.redirectTime();


     }).catch(error=>{

      this.loadingCtrl.dismiss();
      let message =  error.error.message;
      let color = 'warning'
      this.presentToast(message, color);
     }).finally(()=>{

      this.loadingCtrl.dismiss();
      this.sharedService.clearSharedData();
      localStorage.removeItem("table");

     });

    });


  }

  redirectTime(){
    setTimeout(() => {
   this.route.navigate(["/home"]);
  }, 10000);

  }

  async presentToast( message:string, color:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }



  showDetailPage(id:number){
    this.navCtrl.navigateForward(['/food-detail/'+id ]);
  }

  // async openModal() {

  //   const modal = await this.modalController.create({
  //     component: ModalPage,
  //     cssClass: "example-modal",

  //       componentProps: {
  //       // You can define the modal content here as an object
  //       modalContent: {
  //         title: 'Modal Title',
  //         message: 'Modal Message'
  //       }
  //     }
  //   });
  //   return await modal.present();
  // }


  async closeModal() {
    console.log("hello");

    await this.modal.dismiss();
  }



}
