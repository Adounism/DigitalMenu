import { Component, OnInit, ViewChild } from '@angular/core';
import { IonCheckbox, NavController } from '@ionic/angular';
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
  BaseUrl= environment.ressoursseUrl;


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
  constructor(private service:HttpServices, private sharedservice:SharedService, public navCtrl: NavController) {
    this.getAllCategories();

  }

  ngOnInit() {
    // this.activeItem = this.navItems[0];
    this.cardListFood =  this.sharedservice.cardListFood;
    console.log(this.cardListFood);


  }

  ionViewWillEnter() {
    console.log("Hello");
    this.cardListFood = this.sharedservice.cardListFood;

    console.log(this.cardListFood);

    this.cardListFood.forEach(element=>{

      this.cardFoodId = element.id;
    });


  }

  ionViewWillUnload() {
    console.log("Hello");
    this.chekFoodInCard();
  }

  setActive(item: any) {
    this.activeItem = item;
    this.currentCategory =  item;
    console.log(this.currentCategory);
    this.getFoodInCategory(this.currentCategory.name);

  }

  getAllCategories(){
    this.service.getCategory().subscribe(data=>{
      this.categoryListe = data;
      console.log(this.categoryListe[0]);
      this.activeItem = this.categoryListe[0];
      this.getFoodInCategory(this.categoryListe[0].name);


    });
  }

  chekFoodInCard(){

    this.cardListFood = this.sharedservice.cardListFood;

    console.log(this.cardListFood);

    this.cardListFood.forEach(element=>{

      this.cardFoodId = element.id;
    });

  }

  getFoodInCategory(name:string){
    this.service.getFoodInCategorys(name).subscribe(data=>{
      this.foodInCategoryListe = data;
      console.log(this.foodInCategoryListe);

    })
  }

  showDetailPage(id:number){
    this.navCtrl.navigateForward(['/food-detail/'+id ]);
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


    incrementQuantity(food:any){
      this.sharedservice.incrementFoodQuantity(food);
    }

    decrementQuantity(food:any){
      this.sharedservice.decrementQuantity(food);

    }



}
