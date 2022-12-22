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


  checkboxChanged(event: any) {
    console.log(this.myCheckbox.checked);
    // console.log(event.target.value);
    const food = event.target.value;
    food.quantity = 0;

    console.log(food);


    if(this.myCheckbox.checked){
      this.cardListFood.push(event.target.value);


    }else{
      const index=  this.cardListFood.indexOf(event.target.value, 0);
      if(index > -1){
        this.cardListFood.splice(index, 1);
      }
      console.log(this.cardListFood);

    }


  }


    // Method to handle the ionChange event
    handleCheckboxChange(event:any) {
      // Get the selected food from the event
      this.selectedFood = event.target.value;
      console.log(this.selectedFood);

      // If the checkbox is checked, add the selected food to the cardListFood array
      if (event.detail.checked) {
        this.cardListFood.push(this.selectedFood);
        console.log(this.cardListFood);
      }
      // If the checkbox is not checked, remove the selected food from the cardListFood array
      else {
        const index = this.cardListFood.indexOf(this.selectedFood);
        if (index > -1) {
          this.cardListFood.splice(index, 1);
          console.log(this.cardListFood);
        }
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
