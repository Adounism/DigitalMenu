import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpServices } from '../services/http-services.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {

  primary ="rgba(36,39,46,255)";
  navListItem!: HTMLElement[];
  classList!:any;
  categoryListe:any
  currentCategory:any;
  foodInCategoryListe:any[] =[];
  ingredientInFood:any;


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
  constructor(private service:HttpServices, public navCtrl: NavController) {
    this.getAllCategories();

  }

  ngOnInit() {
    this.activeItem = this.navItems[0];
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
}
