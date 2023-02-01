import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonCheckbox, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpServices } from '../services/http-services.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {

  primary ="rgba(36,39,46,255)";
  @ViewChild('myCheckbox')
  myCheckbox!: IonCheckbox;
  navListItem!: HTMLElement[];
  classList!:any;
  categoryListe:any
  currentCategory:any;
  foodInCategoryListe:any[] =[];
  ingredientInFood:any;
  checkboxValue:any;
  cardListFood:any[] =[];
  tailleCard:any;
  foodSelectedListe:any[] =[];
  selectedFood:any;
  quantity=0;
  cardFoodId:any;
  loading:any;
  totatDessertPrice:number= 0;
  optionsSelectedListe:any[]=[];
  cardListe:any[]=[];
  foodInCategory:any[]=[];
  tableId:any;
  showModal:boolean = false;
  totalPrice:number = 0;
  searchText:any;
  BaseUrl= environment.ressoursseUrl;
  imageEncoding:string = "";
  @ViewChild('modal', { static: false }) modal!: ModalController;

  navItems: any[] = [
    {
      iconClass: 'fast-food-outline',
      label: 'Food'
    },
    {
      iconClass: 'fast-food-outline',
      label: 'Food'
    },
    {
      iconClass: 'fast-food-outline',
      label: 'Food'
    },
    {
      iconClass: 'fast-food-outline',
      label: 'Food'
    }
  ];

  activeItem: any;
  constructor(private service:HttpServices, private sharedservice:SharedService,
     public navCtrl: NavController,
     private loadingCtrl: LoadingController,
     public toastController: ToastController,
     private router: Router,
     private modalController: ModalController) {
    this.getAllCategories();

  }

  ngOnInit() {
    // this.activeItem = this.navItems[0];
    // this.cardListFood =  this.sharedservice.cardListFood;
    this.cardListe = this.sharedservice.cardListFood;
    this.totalPrice = this.sharedservice.totalPrice;
    console.log(this.cardListFood);


  }

  ionViewWillEnter() {
    this.cardListFood = this.sharedservice.cardListFood;


    console.log(this.cardListFood);



    this.sharedservice.cardListFood.forEach(element=>{



      this.cardFoodId = element.id;
      console.log("Hellooo" ,this.cardFoodId);
    });


  }

  ionViewWillUnload() {

  }

  setActive(item: any) {
    this.activeItem = item;
    this.currentCategory =  item;

    this.getFoodInCategory(this.currentCategory.id);

  }

  getAllCategories(){
    this.service.getCategory().subscribe(data=>{
      this.categoryListe = data;
      this.categoryListe.reverse();
      console.log(this.categoryListe[0]);
      this.activeItem = this.categoryListe[0];
      this.getFoodInCategory(this.categoryListe[0].name);


    });
  }


  getFoodInCategory(id:string){
    this.foodInCategoryListe = [];
    this.service.getFoodInCategorys(id).subscribe(data=>{

      this.removeCharacter(data);
      this.foodInCategoryListe = data;

    })
  }

  showDetailPage(id:number){
    // this.navCtrl.navigateForward(['/food-detail/'+id ]);
    // this.router.navigate()
  }


  optionsChecked(opt:any){
    if (this.checkboxValue) {
      console.log('Checkbox sélectionné');
      console.log(opt);
      this.foodSelectedListe.push(opt);


    } else {
     const index=  this.foodSelectedListe.indexOf(opt, 0);
      if(index > -1){
        this.foodSelectedListe.splice(index, 1);
      }
      console.log('Checkbox désélectionné');
    }

  }



    updateCardList(food: any) {
      this.sharedservice.updateCardList(food);
      this.cardListFood = this.sharedservice.cardListFood;
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
       this.service.makeOrdering(order).then(data=>{


        this.showModal = true;
        this.showLoading();
       }).catch(error=>{

        this.loadingCtrl.dismiss();
        let message =  error.error.message;
        let color = 'warning'
        this.presentToast(message, color);
       }).finally(()=>{
        this.loadingCtrl.dismiss();


       })

      });


    }

    removeCharacter(data:any){

      this.imageEncoding = data.image
      // this.imageEncoding = encodeURIComponent(this.BaseUrl + data["image"].trim());
      console.log(this.imageEncoding);

      return this.imageEncoding;
    }

    async presentToast( message:string, color:string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        color: color
      });
      toast.present();
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

      async showLoading() {
        this.loading = await this.loadingCtrl.create({
         message: 'Un instant votre commnande est cours...',
         duration: 3000,
       });

       this.loading.present();
     }

     clearSearch(event:any){

      this.getFoodInCategory(this.activeItem.name);

     }

     searchFood(event:any){
      this.foodInCategoryListe = [];
      console.log(this.searchText);

      if(event.target.value != ""){

        this.service.searchFood(event.target.value).subscribe(data=>{
          console.log(data);
          this.foodInCategoryListe = data;

        })
      }else{
        this.getFoodInCategory(this.activeItem.name);
      }
     }

     incrementQuantity(food:any){
      this.sharedservice.incrementFoodQuantity(food)
      this.totalPrice = this.sharedservice.totalPrice;
    }

    decrementQuantity(food:any){
      this.sharedservice.decrementQuantity(food);
      this.totalPrice = this.sharedservice.totalPrice;
    }


    removeFoodToCard(food:any){
      this.sharedservice.removeToCard(food);
      this.totalPrice = this.sharedservice.totalPrice;
    }


}
