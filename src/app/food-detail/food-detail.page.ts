import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonModal,
  LoadingController,
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
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
  slideOpts = {
    initialSlide: 0,
    slidePerView: 3.5,
    autoplay: true,
    speed: 400,
  };

  videoUrl = 'https://youtu.be/UeeR0bK7jRY';

  primary = 'rgba(36,39,46,255)';
  params!: Object;
  pushPage: any;
  currentFoods: any;
  currentFoodId!: number;
  foodIngredients: any[] = [];
  foodsOptions: any[] = [];
  checkboxValue: any;
  totatDessertPrice: number = 0;
  optionsSelectedListe: any[] = [];
  cardListe: any[] = [];
  foodInCategory: any[] = [];
  tableId: any;
  takeaway:any;
  showModal: boolean = false;
  totalPrice: number = 0;
  loading: any;
  BaseUrl = environment.ressoursseUrl;
  disable = true;
  city:any;
  latitude :any;
  longitude:any;
  optionInCard: any = [];
  firstName:any;
  lastName:any;
  contact:any;

  @ViewChild('modal', { static: false }) modal!: ModalController;
  constructor(
    private services: HttpServices,
    router: ActivatedRoute,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private sharedService: SharedService,
    public toastController: ToastController,
    private route: Router,
    private modalController: ModalController
  ) {
    this.currentFoodId = router.snapshot.params['id'];
    this.pushPage = FoodPage;
    this.params = { id: 42 };
  }

  ngOnInit() {
    this.getCurrentFoodData();
    this.tableId = localStorage.getItem('table');
    this.takeaway = localStorage.getItem('takeaway');
    this.city = localStorage.getItem('city');
    this.latitude = localStorage.getItem('latitude');
    this.longitude = localStorage.getItem('longitude');
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.contact =  localStorage.getItem('contact');
    console.log(this.tableId);

    if(!this.tableId){
      this.tableId = null;
    }


  }

  ionViewWillEnter() {
    this.cardListe = this.sharedService.cardListFood;
    this.totalPrice = this.sharedService.totalPrice;
  }

  async getCurrentFoodData() {
    // this.currentFoods = this.sharedService.cardListFood.find(x => x.id == this.currentFoodId);

    // console.log(this.currentFoodId);

    await this.services
      .getfindFoodsInCategorys(this.currentFoodId)
      .subscribe((data) => {
        this.currentFoods = data;


        this.getAllFoodIncategory(data.category?.name);
        this.getAllOptions();
      });
  }

  getAllOptions() {
    this.services.getAllOptions().subscribe((data) => {
      this.foodsOptions = data;
    });
  }

  addToCard() {
    this.disable = false;

    this.sharedService.addToCard(this.currentFoods);
    this.cardListe = this.sharedService.cardListFood;
    this.totalPrice = this.sharedService.totalPrice;
    let message = 'Article ajouter au panier.';
    let color = 'success';

    this.presentToast(message, color);
    this.totalPrice = this.sharedService.totalPriceCalcul();

  }

  issueAnOrder() {}

  optionsChecked(opt: any) {
    if (this.cardListe.length > 0) {
      this.disable = false;
      this.cardListe = this.sharedService.cardListFood;
      this.sharedService.addOptions(this.currentFoodId, opt);
      this.cardListe = this.sharedService.cardListFood;
      this.getAllCardOptions(this.cardListe);
      this.totalPrice = this.sharedService.totalPriceCalcul();

      if (this.checkboxValue) {
        this.totatDessertPrice = +opt.price;
      } else {
        this.sharedService.removeOptionsToFood(this.currentFoodId, opt);
      }
    } else {
      this.disable = true;
    }
  }

  async playVideo() {
    const videoModal = await this.modalController.create({
      component: 'videoModal',
      componentProps: { videoUrl: this.videoUrl },
    });
    return await videoModal.present();
  }

  closeVideo() {
    this.modalController.dismiss();
  }

  showFoodPge() {
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

  incrementQuantity(food: any) {
    this.sharedService.incrementFoodQuantity(food);
    this.totalPrice = this.sharedService.totalPriceCalcul();
  }

  decrementQuantity(food: any) {
    this.sharedService.decrementQuantity(food);
    this.totalPrice = this.sharedService.totalPriceCalcul();
  }

  removeFoodToCard(food: any) {
    this.sharedService.removeToCard(food);
    this.totalPrice = this.sharedService.totalPriceCalcul();
  }

  getAllFoodIncategory(category: string) {
    this.services.getFoodInCategorys(category).subscribe((data) => {
      this.foodInCategory = data;
    });
  }

  getAllCardOptions(card: any) {
    console.log(card.options);
  }

  orderFoods() {
    this.showLoading();
    let tid = this.tableId === undefined ? this.tableId : this.takeaway;
    console.log(tid);
    let order:any;

    if(this.tableId){

      order = {
        itable: 'api/tables/' + this.tableId,
        foodOrders: this.cardListe.map((c: any) => ({
          food: 'api/food/' + parseInt(c['food']?.['id']),
          quantity: c.quantity,
          options: c.options.map((o: any) => '/api/food_options/' + o.id),
        })),
      };
    }else if(this.latitude){

       order = {
        // itable: 'api/tables/' + this.tableId,
        foodOrders: this.cardListe.map((c: any) => ({
          food: 'api/food/' + parseInt(c['food']?.['id']),
          quantity: c.quantity,
          options: c.options.map((o: any) => '/api/food_options/' + o.id),
        })),
      adresse: {
        "city":this.city,
        "latitude":this.latitude,
        "longitude":this.longitude,
        client:{
          "firstName":this.firstName,
          "lastName":this.lastName,
          "contact":this.contact

        }
      }
      };
    }else{

      order = {
        // itable: 'api/tables/' + this.tableId,
        foodOrders: this.cardListe.map((c: any) => ({
          food: 'api/food/' + parseInt(c['food']?.['id']),
          quantity: c.quantity,
          options: c.options.map((o: any) => '/api/food_options/' + o.id),
        })),
      };
    }

    this.services
      .makeOrdering(order)
      .then((data) => {
        this.loadingCtrl.dismiss();
        console.log(data);

        if(data.active){

          this.showModal = true;

        }

        this.redirectTime();
      })
      .catch((error) => {
        this.loadingCtrl.dismiss();
        let message = error.error.message;
        let color = 'warning';
        this.presentToast(message, color);
      })
      .finally(() => {
        this.loadingCtrl.dismiss();
        this.sharedService.clearSharedData();
        localStorage.clear();
        localStorage.removeItem('table');
      });
  }

  redirectTime() {
    setTimeout(() => {
      this.route.navigate(['/home']);
    }, 10000);
  }

  addoption(option: any) {
    let options = [];

    options.push('api/options/' + option.id);

  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      color: color,
    });
    toast.present();
  }

  showDetailPage(id: number) {
    this.navCtrl.navigateForward(['/food-detail/' + id]);
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


    await this.modal.dismiss();
  }
}
